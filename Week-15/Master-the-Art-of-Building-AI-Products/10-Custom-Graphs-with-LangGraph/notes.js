/**
 * ======================================================================
 * PERSONAL ASSISTANT — WEB SEARCH + CALENDAR (HINGLISH VERSION)
 * ======================================================================
 *
 * ARCHITECTURE OVERVIEW
 * ─────────────────────
 *
 *   USER INPUT
 *       │
 *       ▼
 *  ┌───────────┐
 *  │ __start__ │
 *  └─────┬─────┘
 *        │
 *        ▼
 *  ┌───────────┐   ← LLM decide karta hai: direct answer de ya tool call kare
 *  │    llm    │◄─────────────────────────┐
 *  └─────┬─────┘                          │
 *        │                                │
 *        ▼  shouldContinue()              │
 *   ┌────┴──────────┐                     │
 *   │               │                     │
 *   ▼               ▼                     │
 * [tools]        [__end__]                │
 *   │                                     │
 *   ├──► TavilySearch        → Live web search (Internet se latest info)
 *   ├──► get-calendar-events → Calendar stub (Demo events)
 *   │                                     │
 *   └─────────────────────────────────────┘
 *       (ToolMessage state.messages mein append hota hai,
 *        phir wapas llm node pe jata hai)
 *
 * ======================================================================
 * YEH KAISE KAAM KARTA HAI? (EXAMPLE)
 * ======================================================================
 *
 *  User: "Aaj meri koi meeting hai aur AI ki latest news kya hai?"
 *
 *  [1] llm node — LLM user message dekhta hai
 *      → Dono tools call karne ka decision leta hai
 *      → AIMessage return karta hai tool_calls array ke saath
 *
 *  [2] shouldContinue → 'tools' node pe bhejta hai
 *
 *  [3] tools node (ToolNode) dono tools run karta hai:
 *      → TavilySearch internet se latest AI news fetch karta hai
 *      → calendarEvents aaj ki stub events return karta hai
 *      → Do ToolMessages state.messages mein append hote hain
 *
 *  [4] Graph wapas llm node pe loop karta hai
 *      → LLM dono results padhta hai, final reply banata hai
 *      → AIMessage return karta hai tool_calls ke bina
 *
 *  [5] shouldContinue → __end__ pe bhejta hai
 *
 *  [6] Final message terminal par print hota hai
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. TavilySearch                                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Prebuilt LangChain tool jo Tavily search API se web    │
 * │          results laata hai, LLM ke liye pre-cleaned form mein.  │
 * │                                                                 │
 * │ Options:                                                        │
 * │   maxResults → har query se kitne results laane hain            │
 * │   topic      → 'general' (general search) ya 'news' (news)      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const search = new TavilySearch({                             │
 * │     apiKey:     process.env.TAVILY_API_KEY,                     │
 * │     maxResults: 3,                                              │
 * │     topic:      'general',                                      │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. tool() — custom tool definition                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek async function ko LangChain tool mein wrap karta hai│
 * │          jise LLM name se call kar sakta hai via tool_calls.    │
 * │                                                                 │
 * │ Rules:                                                          │
 * │   - STRING return karna hai (objects ke liye JSON.stringify)    │
 * │   - Kabhi throw mat karo — error string return karo             │
 * │   - Har Zod field mein .describe() lagao — LLM unhe padhti hai │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const meraTool = tool(                                        │
 * │     async ({ query }) => JSON.stringify({ result: '...' }),     │
 * │     {                                                           │
 * │       name:        'mera-tool',                                 │
 * │       description: 'Jab user X ke baare mein puche to call karo',│
 * │       schema: z.object({                                        │
 * │         query: z.string().describe('search query'),             │
 * │       }),                                                       │
 * │     }                                                           │
 * │   );                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. ToolNode                                                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Prebuilt node jo last AIMessage se tool_calls padhta   │
 * │          hai, har matching tool ko execute karta hai, aur       │
 * │          ToolMessage results state.messages mein append karta   │
 * │          hai. Prebuilt aur custom tools dono ke saath kaam      │
 * │          karta hai.                                             │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const tools    = [search, calendarEvents];                    │
 * │   const toolNode = new ToolNode(tools);                         │
 * │   graph.addNode('tools', toolNode);                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. shouldContinue (conditional edge)                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Har llm node run ke baad call hone wala routing        │
 * │          function. 'tools' pe bhejta hai agar LLM ne tool_calls │
 * │          ki hain, warna end kar deta hai.                       │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   function shouldContinue(state) {                              │
 * │     const last = state.messages.at(-1) as AIMessage;            │
 * │     return last.tool_calls?.length ? 'tools' : '__end__';       │
 * │   }                                                             │
 * │   graph.addConditionalEdges('llm', shouldContinue, {            │
 * │     tools: 'tools', __end__: END,                               │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. MemorySaver + thread_id                                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Poora graph state .invoke() calls ke beech persist     │
 * │          karta hai taake LLM conversation history yaad rakhe.   │
 * │          thread_id session scope karta hai — change karo to     │
 * │          fresh session start karo.                              │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const app = graph.compile({ checkpointer: new MemorySaver() })│
 * │   const config = { configurable: { thread_id: '1' } };          │
 * │   await app.invoke(input, config);                              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. printGraph() — visual debugging                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Compiled graph ko PNG mein export karta hai Mermaid    │
 * │          use karke. File open karo to verify nodes aur edges    │
 * │          sahi hain before running full agent.                   │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   async function printGraph(agent, path) {                      │
 * │     const g   = await agent.getGraph();                         │
 * │     const img = await g.drawMermaidPng();                       │
 * │     writeFileSync(path, new Uint8Array(await img.arrayBuffer()));│
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * User: "Aaj kya meetings hain aur AI mein latest kya chal raha hai?"
 * 
 * [llm] LLM sochta hai:
 *   - Calendar events chahiye → calendarEvents tool
 *   - Latest AI news chahiye → TavilySearch tool
 *   
 *   Returns AIMessage with tool_calls:
 *   [
 *     { name: 'get-calendar-events', args: { query: 'today' } },
 *     { name: 'tavily_search', args: { query: 'latest AI news 2026' } }
 *   ]
 *
 * [tools] ToolNode dono tools execute karta hai:
 *   
 *   calendarEvents returns:
 *   [{"title":"Meeting with Sujoy","date":"9th Aug 2025","time":"2 PM","location":"Gmeet"}]
 *   
 *   TavilySearch returns:
 *   [{"title":"AI Breakthrough 2026","content":"New model beats humans..."}]
 *
 * [llm] LLM dono results padhta hai aur final reply banata hai:
 *   "Aaj 2 PM ko Sujoy ke saath meeting hai Gmeet par.
 *    Latest AI news mein kaha ja raha hai ki naye models humans se better perform kar rahe hain."
 *
 * [END] User ko final reply milta hai
 *
 * ======================================================================
 */

// ======================================================================
// SECTION 1: IMPORTS
// ======================================================================
import { writeFileSync } from 'node:fs';
import readline from 'node:readline/promises';
import { tool } from '@langchain/core/tools';
import { ChatGroq } from '@langchain/groq';
import { END, MemorySaver, MessagesAnnotation, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import type { AIMessage } from '@langchain/core/messages';
import { TavilySearch } from '@langchain/tavily';
import z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

// ======================================================================
// SECTION 2: TOOLS
// ======================================================================

// Tavily web search — prebuilt tool, kuch wrap karne ki zaroorat nahi
// maxResults: 3 rakh rahe hain taake context lean rahe
const search = new TavilySearch({
    apiKey: process.env.TAVILY_API_KEY,
    maxResults: 3,
    topic: 'general',
});

// Custom calendar tool — abhi stub data return karta hai
// TODO: Actual Google Calendar API se replace karna hai
const calendarEvents = tool(
    async ({ query }) => {
        // Abhi sirf demo data return kar rahe hain
        return JSON.stringify([
            {
                title: 'Sujoy ke saath meeting',
                date: '9 Aug 2025',
                time: '2 PM',
                location: 'Google Meet',
            },
            {
                title: 'Design team standup',
                date: '9 Aug 2025',
                time: '10 AM',
                location: 'Office',
            },
        ]);
    },
    {
        name: 'get-calendar-events',
        description: 'Calendar events dhondo search query ke hisaab se.',
        schema: z.object({
            query: z.string().describe('Calendar events ke liye search query. Jaise "aaj", "kal", "aglae hafte"'),
        }),
    }
);

const tools = [search, calendarEvents];

// ======================================================================
// SECTION 3: MODEL
// ======================================================================
//
// bindTools() tool schemas inject karta hai taake LLM ko pata ho ki
// kaunse tools exist karte hain aur wo tool_calls generate kar sake.

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile', // valid Groq model with tool-calling support
    temperature: 0,
}).bindTools(tools);

// ======================================================================
// SECTION 4: GRAPH NODES
// ======================================================================

// llm node — poori message history LLM ko bhejta hai
// AIMessage return karta hai text ke saath (done) ya tool_calls ke saath (tools chahiye)
async function callModel(state: typeof MessagesAnnotation.State) {
    console.log('\n🤔 LLM soch raha hai...');
    const response = await llm.invoke(state.messages);
    return { messages: [response] };
}

// tools node — ToolNode tool_calls execute karta hai, ToolMessages append karta hai
const toolNode = new ToolNode(tools);

// conditional edge — har llm node run ke baad decide karta hai kahan jana hai
function shouldContinue(state: typeof MessagesAnnotation.State) {
    const last = state.messages[state.messages.length - 1] as AIMessage;
    const hasToolCalls = last.tool_calls?.length > 0;
    
    if (hasToolCalls) {
        console.log(`   🔧 Tool calls detect: ${last.tool_calls?.length} tool(s) execute honge`);
        return 'tools';
    } else {
        console.log('   ✅ Sab ho gaya, final answer de raha hai');
        return '__end__';
    }
}

// ======================================================================
// SECTION 5: BUILD + COMPILE GRAPH
// ======================================================================
//
// Wiring: __start__ → llm → (shouldContinue) → tools → llm → __end__

const app = new StateGraph(MessagesAnnotation)
    .addNode('llm', callModel)
    .addNode('tools', toolNode)
    .addEdge('__start__', 'llm')
    .addEdge('tools', 'llm')          // tools run hone ke baad wapas llm pe loop
    .addConditionalEdges('llm', shouldContinue, {
        __end__: END,
        tools: 'tools',
    })
    .compile({ checkpointer: new MemorySaver() });

// ======================================================================
// SECTION 6: GRAPH VISUALIZER
// ======================================================================
//
// Graph ko PNG mein save karta hai visual debugging ke liye.
// graph.png open karo verify karne ke liye ki nodes aur edges sahi hain.

async function printGraph(agent: typeof app, outputPath: string) {
    try {
        const graph = await agent.getGraph();
        const image = await graph.drawMermaidPng();
        const buffer = await image.arrayBuffer();
        writeFileSync(outputPath, new Uint8Array(buffer));
        console.log(`📊 Graph saved to ${outputPath} — open karo structure dekhne ke liye`);
    } catch (err) {
        console.log('⚠️  Graph image generate nahi ho saka (optional feature hai)');
    }
}

// ======================================================================
// SECTION 7: MAIN LOOP
// ======================================================================

async function main() {
    // thread_id memory scope karta hai — change karo fresh session start karne ke liye
    const config = { configurable: { thread_id: '1' } };

    // Optional: Graph image save karo
    await printGraph(app, './graph.png');

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    console.log('\n' + '='.repeat(60));
    console.log('🤖 PERSONAL ASSISTANT — WEB SEARCH + CALENDAR');
    console.log('='.repeat(60));
    console.log('\n📋 YEH KYA KAR SAKTA HAI:');
    console.log('  🌐 Web search via Tavily (Internet se latest info)');
    console.log('  📅 Calendar event lookup (Demo events abhi)');
    console.log('  🧠 Context yaad rakhta hai baat-cheet ke across');
    console.log('\n💬 EXAMPLES:');
    console.log('  • "Aaj meri koi meeting hai?"');
    console.log('  • "AI ki latest news kya hai?"');
    console.log('  • "Kal kya meetings hain aur weather kaisa rahega?"');
    console.log('  • "Meeting schedule karo Sujoy ke saath" (abhi stub hai)');
    console.log('\n/bye type karo exit ke liye.\n');

    while (true) {
        const userInput = await rl.question('👤 Aap: ');

        if (userInput.trim() === '/bye') {
            console.log('\n👋 Alvida! Shukriya!\n');
            break;
        }
        if (!userInput.trim()) continue;

        console.log('\n⏳ Processing...');

        try {
            const result = await app.invoke(
                { messages: [{ role: 'user', content: userInput }] },
                config,
            );

            const last = result.messages[result.messages.length - 1];
            console.log('\n🤖 Assistant:', last.content, '\n');
        } catch (err) {
            console.error('❌ Error:', err);
        }
    }

    rl.close();
}

// ======================================================================
// SECTION 8: ERROR HANDLING & START
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
console.log('🚀 STARTING PERSONAL ASSISTANT');
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