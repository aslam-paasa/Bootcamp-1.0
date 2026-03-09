/**
 * ======================================================================
 * REACT AGENT — WITH MEMORY, WEB SEARCH + CALENDAR (HINGLISH VERSION)
 * ======================================================================
 *
 * REACT AGENT KYA HAI?
 * ──────────────────────
 * ReAct = Reason + Act (Socho + Karo)
 *
 * Normal agent:   Question → Direct Answer
 * ReAct agent:    Question → Socho → Tool Use Karo → Result Dekho → Phir Socho → Answer Do
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │  [1] REASON  → LLM question ke baare mein sochta hai         │
 *   │  [2] ACT     → Agar external data chahiye to tool call karta hai│
 *   │  [3] OBSERVE → Tool ka result padhta hai                      │
 *   │  [4] REPEAT  → Agar aur steps chahiye to dobara sochta hai   │
 *   │  [5] ANSWER  → Jab enough info collect ho jaye to final reply │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * ARCHITECTURE OVERVIEW
 * ======================================================================
 *
 *   HumanMessage (user query)
 *       │
 *       ▼
 *  ┌──────────────────────────────────────────────┐
 *  │             createReactAgent                 │
 *  │                                              │
 *  │   ┌───────────┐    tool_calls?               │
 *  │   │   agent   │─────────────────┐            │
 *  │   │   (LLM)   │◄────────────────┤            │
 *  │   └───────────┘   tool results  │            │
 *  │         │                       │            │
 *  │         ▼ no tool_calls    ┌────┴──────────┐ │
 *  │     [__end__]              │  tools node   │ │
 *  │                            │ TavilySearch  │ │
 *  │                            │ calendarEvents│ │
 *  │                            └───────────────┘ │
 *  └──────────────────────────────────────────────┘
 *       │
 *       ▼
 *   Final AIMessage content (user ko final jawab)
 *
 * ======================================================================
 * EXECUTION FLOW EXAMPLE (HINGLISH MEIN)
 * ======================================================================
 *
 *  User: "Kal meri koi meeting hai aur Tokyo mein weather kaisa hai?"
 *
 *  [1] agent node — LLM system prompt + user message padhta hai
 *      → Dono tools call karne ka decision leta hai
 *      → AIMessage return karta hai tool_calls array ke saath
 *
 *  [2] tools node dono tools run karta hai:
 *      → calendarEvents stub events JSON return karta hai
 *      → TavilySearch live Tokyo weather fetch karta hai
 *      → Do ToolMessages state.messages mein append hote hain
 *
 *  [3] agent node wapas loop hota hai
 *      → LLM dono tool results padhta hai
 *      → Combined final reply banata hai
 *      → AIMessage return karta hai tool_calls ke bina
 *
 *  [4] Graph __end__ tak pahunchta hai
 *      → result.messages.at(-1).content terminal par print hota hai
 *
 *  Agli turn par: MemorySaver full history restore kar deta hai thread_id se
 *
 * ======================================================================
 * createReactAgent vs Manual StateGraph
 * ======================================================================
 *
 *  ┌─────────────────────┬──────────────────┬──────────────────────┐
 *  │                     │ createReactAgent  │ Manual StateGraph    │
 *  ├─────────────────────┼──────────────────┼──────────────────────┤
 *  │ Setup               │ 3 lines          │ 20+ lines            │
 *  │ Nodes/edges         │ Auto-generated   │ Aap define karte ho  │
 *  │ Tool execution loop │ Built-in         │ Aap likhna padta hai │
 *  │ Customisation       │ Limited          │ Full control          │
 *  │ Best for            │ Quick prototypes │ Production systems    │
 *  └─────────────────────┴──────────────────┴──────────────────────┘
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. createReactAgent()                                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Prebuilt LangGraph factory jo poora ReAct loop         │
 * │          automatically wire karta hai (agent node + tools node  │
 * │          + edges). Manual StateGraph banane ke barabar hai,     │
 * │          lekin ek hi call mein sab ho jata hai.                 │
 * │                                                                 │
 * │ Options:                                                        │
 * │   llm          → reasoning ke liye model                        │
 * │   tools        → array of tools agent call kar sakta hai       │
 * │   checkpointer → MemorySaver multi-turn conversation ke liye    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const agent = createReactAgent({                              │
 * │     llm:         model,                                         │
 * │     tools:       [search, calendarEvents],                      │
 * │     checkpointer: new MemorySaver(),                            │
 * │   });                                                           │
 * │                                                                 │
 * │   const result = await agent.invoke(                            │
 * │     { messages: [{ role: "user", content: "..." }] },           │
 * │     { configurable: { thread_id: "1" } },                       │
 * │   );                                                            │
 * │   console.log(result.messages.at(-1).content);                  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. MemorySaver + thread_id                                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: MemorySaver poori message history ko turns ke beech    │
 * │          persist karta hai taake agent conversation ke purane   │
 * │          parts yaad rakh sake.                                  │
 * │                                                                 │
 * │ thread_id: Ek session ke saare turns ek saath group karta hai.  │
 * │            Naya session start karne ke liye thread_id change    │
 * │            karo.                                                │
 * │                                                                 │
 * │ MemorySaver ke bina: har invoke() fresh start se shuru hota hai │
 * │ MemorySaver ke saath: full history har turn restore hoti hai    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const agent = createReactAgent({                              │
 * │     checkpointer: new MemorySaver(),                            │
 * │     ...                                                         │
 * │   });                                                           │
 * │   await agent.invoke(input, { configurable: { thread_id: "1" }})│
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. System prompt with dynamic datetime                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: LLM ke paas built-in clock nahi hota. System message   │
 * │          mein current datetime inject karna zaroori hai taake   │
 * │          "aaj", "kal", "aglae hafte" sahi se resolve ho sake.   │
 * │                                                                 │
 * │ new Date().toUTCString() → "Mon, 03 Mar 2026 14:00:00 GMT"      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   { role: "system", content:                                    │
 * │     `Tum ek personal assistant ho.                              │
 * │      Jo info tumhare paas nahi hai, uske liye tools use karo.   │
 * │      Current date and time: ${new Date().toUTCString()}` }      │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. tool() — custom tool definition                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek async function ko LangChain tool mein wrap karta hai│
 * │          jise LLM name se call kar sakta hai via tool_calls.    │
 * │                                                                 │
 * │ Rules:                                                          │
 * │   - STRING return karna hai (objects ke liye JSON.stringify)    │
 * │   - Kabhi throw mat karo — error string return karo taake LLM   │
 * │     user ko problem bata sake                                   │
 * │   - Har Zod field mein .describe() lagao — LLM unhe padhti hai │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const meraTool = tool(                                        │
 * │     async ({ query }) => JSON.stringify({ result: "..." }),     │
 * │     {                                                           │
 * │       name:        "mera-tool",                                 │
 * │       description: "Jab user X ke baare mein puche to call karo",│
 * │       schema: z.object({                                        │
 * │         query: z.string().describe("search query"),             │
 * │       }),                                                       │
 * │     }                                                           │
 * │   );                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. result.messages — final answer read karna                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: agent.invoke() full message history return karta hai.  │
 * │          Last item hamesha final AIMessage hota hai.            │
 * │                                                                 │
 * │ Full history example:                                           │
 * │   messages[0] → SystemMessage  (system prompt)                  │
 * │   messages[1] → HumanMessage   (user query)                     │
 * │   messages[2] → AIMessage      tool_calls: [TavilySearch]       │
 * │   messages[3] → ToolMessage    raw search results               │
 * │   messages[4] → AIMessage      final answer  ← ye use karo     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const result = await agent.invoke({ messages: [...] }, config)│
 * │   console.log(result.messages.at(-1).content);                  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. printGraph() — visual debugging (optional)                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Compiled agent graph ko PNG mein export karta hai      │
 * │          Mermaid use karke. File open karo verify karne ke liye │
 * │          ki nodes aur edges sahi hain before running full agent.│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   async function printGraph(agent, outputPath) {                │
 * │     const graph  = agent.getGraph();                            │
 * │     const image  = await graph.drawMermaidPng();                │
 * │     const buffer = await image.arrayBuffer();                   │
 * │     writeFileSync(outputPath, new Uint8Array(buffer));          │
 * │     console.log(`Graph saved to ${outputPath}`);                │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * User: "Kal kya meetings hain aur Tokyo mein weather kaisa hai?"
 * 
 * [agent] LLM sochta hai:
 *   - Calendar events chahiye → calendarEvents tool
 *   - Tokyo weather chahiye → TavilySearch tool
 *   
 *   Returns AIMessage with tool_calls:
 *   [
 *     { name: 'get-calendar-events', args: { query: 'tomorrow' } },
 *     { name: 'tavily_search', args: { query: 'Tokyo weather 2026-03-04' } }
 *   ]
 *
 * [tools] ToolNode dono tools execute karta hai:
 *   
 *   calendarEvents returns:
 *   {"events":[{"title":"Meeting with John","date":"4 March 2026","time":"2PM",...}]}
 *   
 *   TavilySearch returns:
 *   [{"title":"Tokyo Weather","content":"Sunny, 18°C, light winds..."}]
 *
 * [agent] LLM dono results padhta hai aur final reply banata hai:
 *   "Kal 2PM ko John ke saath meeting hai. Tokyo mein mausam sunny rahega, 18°C."
 *
 * [END] User ko final reply milta hai
 *
 * ======================================================================
 */

// ======================================================================
// SECTION 1: IMPORTS
// ======================================================================
import { writeFileSync } from "node:fs";
import readline from "node:readline/promises";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGroq } from "@langchain/groq";
import { TavilySearch } from "@langchain/tavily";
import { tool } from "@langchain/core/tools";
import { MemorySaver } from "@langchain/langgraph";
import z from "zod";
import dotenv from "dotenv";

dotenv.config();

// ======================================================================
// SECTION 2: MODEL
// ======================================================================
//
// llama-3.3-70b-versatile tool-calling support karta hai — ReAct ke liye required.
// temperature: 0 deta hai deterministic, consistent tool argument generation.

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0,
});

// ======================================================================
// SECTION 3: TOOLS
// ======================================================================

// Prebuilt Tavily web search — real-time results deta hai LLMs ke liye pre-cleaned.
// maxResults: 5 rakh rahe hain context size aur completeness ka balance.
const search = new TavilySearch({
    apiKey: process.env.TAVILY_API_KEY,
    maxResults: 5,
    topic: "general",
});

// Custom calendar tool — abhi stub data return karta hai.
// TODO: Real Google Calendar API se replace karna hai (tools.ts ki tarah).
const calendarEvents = tool(
    async ({ query }) => {
        // Demo data — asli implementation mein Google Calendar API call hogi
        return JSON.stringify({
            events: [
                {
                    title: "John ke saath meeting",
                    date: "4 March, 2026",
                    time: "2PM",
                    location: "Google Meet",
                },
                {
                    title: "Jane ke saath meeting",
                    date: "5 March, 2026",
                    time: "3PM",
                    location: "Zoom",
                },
            ],
        });
    },
    {
        name: "get-calendar-events",
        description: "Calendar events dhondo search query ke hisaab se.",
        schema: z.object({
            query: z.string().describe("Calendar events ke liye search query. Jaise 'aaj', 'kal', 'aglae hafte'"),
        }),
    }
);

// ======================================================================
// SECTION 4: AGENT
// ======================================================================
//
// createReactAgent automatically poora ReAct loop build kar deta hai:
//   agent node → (tool_calls?) → tools node → agent node → ... → __end__
//
// checkpointer multi-turn memory enable karta hai — full message history
// save aur restore hoti hai turns ke beech thread_id use karke.

const agent = createReactAgent({
    llm: model,
    tools: [search, calendarEvents],
    checkpointer: new MemorySaver(),
});

// ======================================================================
// SECTION 5: GRAPH VISUALIZER (optional)
// ======================================================================
//
// Graph ko PNG mein save karne ke liye main() mein call uncomment karo.
// Agent ki node/edge structure visually verify karne ke liye useful hai.

async function printGraph(outputPath: string) {
    try {
        const graph = agent.getGraph();
        const image = await graph.drawMermaidPng();
        const buffer = await image.arrayBuffer();
        writeFileSync(outputPath, new Uint8Array(buffer));
        console.log(`📊 Graph saved to ${outputPath} — open karo structure dekhne ke liye`);
    } catch (err) {
        console.log('⚠️  Graph image generate nahi ho saka (optional feature hai)');
    }
}

// ======================================================================
// SECTION 6: MAIN LOOP
// ======================================================================

async function main() {
    // Debugging ke liye graph image save karna ho to ye uncomment karo:
    // await printGraph("./react-graph.png");

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    // thread_id memory scope karta hai — same ID ke saath saare turns history share karte hain
    // Naya session start karne ke liye thread_id change karo
    const config = { configurable: { thread_id: "1" } };

    console.log("\n" + "=".repeat(60));
    console.log("🤖 REACT AGENT — WEB SEARCH + CALENDAR");
    console.log("=".repeat(60));
    console.log("\n📋 YEH KYA KAR SAKTA HAI:");
    console.log("  🌐 Web search via Tavily (Internet se latest info)");
    console.log("  📅 Calendar event lookup (Demo events abhi)");
    console.log("  🧠 Context yaad rakhta hai baat-cheet ke across");
    console.log("\n💬 EXAMPLES:");
    console.log('  • "Aaj meri koi meeting hai?"');
    console.log('  • "Kal kya meetings hain aur Delhi mein weather kaisa hai?"');
    console.log('  • "AI ki latest news kya hai?"');
    console.log('  • "Meeting schedule karo Sujoy ke saath kal 3pm"');
    console.log("\n'bye' type karo exit ke liye.\n");

    while (true) {
        const userQuery = await rl.question("👤 Aap: ");

        if (userQuery.trim() === "bye") {
            console.log("\n👋 Alvida! Shukriya!\n");
            break;
        }
        if (!userQuery.trim()) continue;

        console.log("\n⏳ Processing...");

        try {
            const result = await agent.invoke(
                {
                    messages: [
                        {
                            role: "system",
                            // Current datetime inject karo taake LLM
                            // "aaj", "kal", "aglae hafte" sahi se resolve kar sake
                            content: `Tum ek personal assistant ho.
Jo information tumhare paas nahi hai, uske liye diye gaye tools use karo.
Current date and time: ${new Date().toUTCString()}`,
                        },
                        {
                            role: "user",
                            content: userQuery,
                        },
                    ],
                },
                config,
            );

            console.log(`\n🤖 Assistant: ${result.messages[result.messages.length - 1].content}\n`);
        } catch (err) {
            console.error("❌ Error:", err);
        }
    }

    rl.close();
}

// ======================================================================
// SECTION 7: ERROR HANDLING & START
// ======================================================================
process.on('unhandledRejection', (error) => {
    console.error('\n❌ Unhandled rejection:', error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('\n❌ Uncaught exception:', error);
    process.exit(1);
});

console.log('\n' + '🌟'.repeat(20));
console.log('🚀 REACT AGENT START HO RAHA HAI');
console.log('🌟'.repeat(20));

// Check for required API keys
if (!process.env.GROQ_API_KEY) {
    console.error('\n❌ ERROR: GROQ_API_KEY nahi mila!');
    console.error('   .env file mein GROQ_API_KEY set karo.\n');
    process.exit(1);
}

if (!process.env.TAVILY_API_KEY) {
    console.error('\n❌ ERROR: TAVILY_API_KEY nahi mila!');
    console.error('   .env file mein TAVILY_API_KEY set karo.\n');
    process.exit(1);
}

main().catch((err) => {
    console.error('\n❌ Fatal error:', err);
    process.exit(1);
});