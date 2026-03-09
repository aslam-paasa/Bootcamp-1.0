/**
 * ======================================================================
 * REFLEXION PATTERN RESEARCH AGENT - COMPLETE IMPLEMENTATION (HINGLISH VERSION)
 * ======================================================================
 * 
 * ██████╗ ███████╗███████╗██╗     ███████╗██╗  ██╗██╗ ██████╗ ███╗   ██╗
 * ██╔══██╗██╔════╝██╔════╝██║     ██╔════╝██║  ██║██║██╔═══██╗████╗  ██║
 * ██████╔╝█████╗  █████╗  ██║     █████╗  ███████║██║██║   ██║██╔██╗ ██║
 * ██╔══██╗██╔══╝  ██╔══╝  ██║     ██╔══╝  ██╔══██║██║██║   ██║██║╚██╗██║
 * ██║  ██║███████╗██║     ███████╗███████╗██║  ██║██║╚██████╔╝██║ ╚████║
 * ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 * 
 * ==================== REFLEXION KYA HAI? ==============================
 * 
 * Reflexion = Reflection + MEMORY (Yaani Sochna + Yaad Rakhna)
 * 
 * Simple Definition (Hinglish Mein):
 * ──────────────────────────────────────────────────────────────────
 * 1. AI answer dene ki koshish karta hai
 * 2. AI ko feedback milta hai (tools se ya khud se)
 * 3. AI lessons ko memory mein save karta hai
 * 4. AI un lessons ko agle attempts mein use karta hai
 * 5. Jab tak success nahi hota, repeat karo
 * 
 * REFLECTION AUR REFLEXION MEIN FARAK:
 * ──────────────────────────────────────────────────────────────────
 * 
 * REFLECTION:                      REFLEXION:
 * ┌──────────────────┐             ┌──────────────────┐
 * │ "Mujhe apna      │             │ "Mujhe apna      │
 * │  answer check    │             │  answer check    │
 * │  karna hai aur   │             │  karna hai,      │
 * │  abhi theek      │             │  YAAD RAKHNA hai │
 * │  kar dena hai"   │             │  ki maine kya    │
 * └──────────────────┘             │  galat kiya tha, │
 *         ↓                        │  aur use future  │
 *    Ek baar theek karega          │  mein use karun" │
 *    Future mein wahi              └──────────────────┘
 *    galti dobara kar                 ↓
 *    sakta hai                    Hamesha seekhta rahega
 *                                 Har baar smarter hota jayega
 * 
 * REFLEXION KYON ZAROORI HAI?
 * ──────────────────────────────────────────────────────────────────
 * 
 * PROBLEM: AI wahi galtiyan repeat karta hai
 * Memory ke bina, AI:
 *   ❌ Ek hi error multiple baar karega
 *   ❌ Bhool jayega ki kaunsi approach kaam nahi aayi
 *   ❌ Waste karega time galat approaches mein
 *   ❌ Kabhi improve nahi karega
 * 
 * SOLUTION: Experience se seekho
 * Jaise insaan apni galtiyon se seekhta hai, AI bhi:
 *   ✓ Yaad rakhega ki kya galat hua
 *   ✓ Wahi errors repeat nahi karega
 *   ✓ Har try ke saath smarter hoga
 *   ✓ Knowledge build karega over time
 * 
 * ==================== VISUAL DATA FLOW ===============================
 * 
 *                            MEMORY (Yaad)
 *                        (State.iteration)
 *                              ▲
 *                              │ (increase)
 *                              │
 *    ┌─────────────────────────────────────────────────────┐
 *    │                                                     │
 *    ▼                                                     │
 * ┌──────────┐     ┌──────────────┐     ┌──────────────┐  │
 * │ ACTOR    │────▶│ SEARCH       │────▶│ REVISOR      │──┘
 * │responder │     │ executor     │     │ (Sudhaarne    │
 * │(Pehla    │     │ (Search      │     │  Wala)       │
 * │  Attempt)│     │   Karne Wala)│     └───────┬──────┘
 * └──────────┘     └──────────────┘             │
 *      │                                         │
 *      │                                         │
 *      ▼                                         ▼
 * ┌─────────────────────────────────────────────────────┐
 * │                    STATE FLOW                        │
 * │                    (Data Kaise Badalta Hai)          │
 * ├─────────────────────────────────────────────────────┤
 * │                                                      │
 * │ [ROUND 1 - Pehla Chakkar]                           │
 * │ User: "JavaScript 2025 mein kya naya hai?"          │
 * │   ↓                                                 │
 * │ responder: Answer banata hai + critique + search queries│
 * │   ↓                                                 │
 * │ state.messages ← AIMessage(response)               │
 * │   ↓                                                 │
 * │ searchExecutor: Tavily searches execute karta hai  │
 * │   ↓                                                 │
 * │ state.messages ← HumanMessage(searchResults)       │
 * │   ↓                                                 │
 * │ revisor: Search results use karke answer improve karta hai│
 * │   ↓                                                 │
 * │ state.messages ← AIMessage(revised)                │
 * │ state.iteration = 1 (Pehla round complete)         │
 * │   ↓                                                 │
 * │ [ROUND 2 - Doosra Chakkar (agar iteration < MAX)   │
 * │   ↓                                                 │
 * │ searchExecutor: Naye queries use karta hai revisor se│
 * │   ↓                                                 │
 * │ revisor: Aur improve karta hai answer              │
 * │   ↓                                                 │
 * │ state.iteration = 2                                 │
 * │   ↓                                                 │
 * │ [END] Final answer user tak                          │
 * │                                                      │
 * └─────────────────────────────────────────────────────┘
 * 
 * ==================== DETAILED EXECUTION PIPELINE (Hinglish) ==========
 * 
 * [USER: "JavaScript 2025 mein kya naya hai?"]
 *    ↓
 * [STATE INITIAL]
 * {
 *   messages: [HumanMessage("JavaScript 2025 mein kya naya hai?")],
 *   iteration: 0
 * }
 *    ↓
 * [NODE: responder]  (PEHLA ACTOR)
 *    ├─ STATE SE PADHA: messages[0] (user query)
 *    ├─ LLM CALL with structured output
 *    │   INPUT: 
 *    │   │  System: "Tum ek expert researcher ho..."
 *    │   │  Human: "JavaScript 2025 mein kya naya hai?"
 *    │   │  System: "Reflect karo... Structured output mein do."
 *    │   │
 *    │   OUTPUT (JSON):
 *    │   {
 *    │     "answer": "JavaScript 2025 mein pattern matching aayega...",
 *    │     "reflection": {
 *    │       "missing": "Specific TC39 proposals aur dates chahiye",
 *    │       "superfluous": "Generic JS history hata di"
 *    │     },
 *    │     "searchQueries": [
 *    │       "TC39 proposals finished 2025",
 *    │       "JavaScript new features 2025 release date"
 *    │     ]
 *    │   }
 *    │
 *    └─ STATE MEIN LIKHA: 
 *       messages[] ← AIMessage(JSON string)
 *       iteration: 0 (abhi increment nahi hua)
 *    ↓
 * [EDGE: responder → searchExecutor]
 *    ↓
 * [NODE: searchExecutor]
 *    ├─ STATE SE PADHA: 
 *    │   lastMessage = AIMessage jisme searchQueries hain
 *    │   parsed = JSON.parse(lastMessage.content)
 *    │
 *    ├─ EXECUTE TOOL: tavilySearch.batch(queries)
 *    │   QUERY 1: "TC39 proposals finished 2025"
 *    │   └─ Tavily return karta hai:
 *    │      [
 *    │        {
 *    │          title: "Finished Proposals - TC39",
 *    │          content: "ECMAScript 2025 includes: ...",
 *    │          url: "https://tc39.es/proposals/finished"
 *    │        },
 *    │        {
 *    │          title: "JavaScript 2025 New Features",
 *    │          content: "Pattern matching stage 4 pe pahunch gaya...",
 *    │          url: "https://example.com/js2025"
 *    │        }
 *    │      ]
 *    │
 *    │   QUERY 2: "JavaScript new features 2025 release date"
 *    │   └─ Tavily return karta hai:
 *    │      [
 *    │        {
 *    │          title: "ECMAScript 2025 Release",
 *    │          content: "Expected June 2025 publication...",
 *    │          url: "https://ecma-international.org/..."
 *    │        }
 *    │      ]
 *    │
 *    ├─ CLEAN RESULTS:
 *    │   [
 *    │     {
 *    │       query: "TC39 proposals finished 2025",
 *    │       content: "ECMAScript 2025 includes: ...",
 *    │       url: "https://tc39.es/proposals/finished"
 *    │     },
 *    │     {
 *    │       query: "TC39 proposals finished 2025", 
 *    │       content: "Pattern matching stage 4 pe pahunch gaya...",
 *    │       url: "https://example.com/js2025"
 *    │     },
 *    │     {
 *    │       query: "JavaScript new features 2025 release date",
 *    │       content: "Expected June 2025 publication...",
 *    │       url: "https://ecma-international.org/..."
 *    │     }
 *    │   ]
 *    │
 *    └─ STATE MEIN LIKHA:
 *       messages[] ← HumanMessage(JSON.stringify({searchResults: cleanedResults}))
 *    ↓
 * [EDGE: searchExecutor → revisor]
 *    ↓
 * [NODE: revisor] (DOOSRA ACTOR with MEMORY)
 *    ├─ STATE SE PADHA:
 *    │   • messages[0]: original user query
 *    │   • messages[1]: first AIMessage (initial answer)
 *    │   • messages[2]: HumanMessage with searchResults
 *    │   • iteration: 0
 *    │
 *    ├─ LLM CALL with structured output
 *    │   INPUT:
 *    │   │  System: "Tum expert researcher ho... Search results use karo..."
 *    │   │  [Poori conversation history]
 *    │   │  System: "Reflect karo... Structured output mein do."
 *    │   │
 *    │   PROCESS:
 *    │   │  1. Original critique padhta hai: "Specific TC39 proposals chahiye"
 *    │   │  2. Search results review karta hai jisme TC39 data hai
 *    │   │  3. Improved answer banata hai citations ke saath
 *    │   │  4. Naya reflection banata hai agle round ke liye
 *    │   │
 *    │   OUTPUT (JSON):
 *    │   {
 *    │     "answer": "JavaScript 2025 mein kai major features aa rahe hain based on TC39 proposals [1]. Pattern matching syntax simplify karega conditional logic ko [2]. ECMAScript 2025 specification June 2025 tak aane ki ummeed hai [3].\n\nReferences:\n- [1] https://tc39.es/proposals/finished\n- [2] https://example.com/js2025\n- [3] https://ecma-international.org/...",
 *    │     "reflection": {
 *    │       "missing": "Real-world adoption examples chahiye",
 *    │       "superfluous": "Generic browser support hata diya"
 *    │     },
 *    │     "searchQueries": [
 *    │       "JavaScript 2025 features adoption rate",
 *    │       "browsers supporting pattern matching 2025"
 *    │     ]
 *    │   }
 *    │
 *    └─ STATE MEIN LIKHA:
 *       messages[] ← AIMessage(JSON string)
 *       iteration: 1 (INCREMENT - MEMORY UPDATE!)
 *    ↓
 * [CONDITIONAL EDGE: revisor → ?]
 *    ├─ STATE SE PADHA: iteration = 1
 *    ├─ CHECK: MAX_ITERATIONS = 2
 *    ├─ 1 < 2 → TRUE
 *    └─ DECISION: wapas searchExecutor ke paas doosre round ke liye
 *    ↓
 * [NODE: searchExecutor (Round 2 - Doosra Chakkar)]
 *    ├─ STATE SE PADHA: lastMessage mein naye searchQueries hain
 *    ├─ EXECUTE NEW SEARCHES:
 *    │   "JavaScript 2025 features adoption rate"
 *    │   "browsers supporting pattern matching 2025"
 *    └─ LIKHA: new HumanMessage with results
 *    ↓
 * [NODE: revisor (Round 2 - Doosra Chakkar)]
 *    ├─ PADHA: round 2 search results bhi hain
 *    ├─ CREATE EVEN BETTER ANSWER adoption data ke saath
 *    ├─ LIKHA: AIMessage with final answer
 *    └─ iteration: 2
 *    ↓
 * [CONDITIONAL EDGE: revisor → ?]
 *    ├─ iteration = 2
 *    ├─ CHECK: 2 >= 2 → TRUE
 *    └─ DECISION: route to __end__
 *    ↓
 * [END] Final state user ko return karo
 */

// ======================================================================
// SECTION 1: IMPORTS - Jo Libraries Use Karenge
// ======================================================================
import readline from 'node:readline/promises';
import { StateGraph, Annotation, MessagesAnnotation } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearch } from '@langchain/tavily';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import z from 'zod';

// ======================================================================
// SECTION 2: MODEL INITIALIZATION - Agent ka "Dimag"
// ======================================================================

/**
 * ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗     
 * ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║     
 * ██╔████╔██║██║   ██║██║  ██║█████╗  ██║     
 * ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║     
 * ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
 * ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
 * 
 * MODEL CONFIGURATION:
 * ──────────────────────────────────────────────────────────────────
 * GPT-5 Nano use kar rahe hain (hypothetical future model)
 * Ye fast, efficient model hai research tasks ke liye
 * 
 * STRUCTURED OUTPUT KYON ZAROORI HAI?
 * ──────────────────────────────────────────────────────────────────
 * .withStructuredOutput(schema) forces LLM ko:
 * 1. Valid JSON return karne ke liye jo schema se match kare
 * 2. Saare required fields include karne ke liye (answer, reflection, searchQueries)
 * 3. Consistent format follow karne ke liye across all responses
 * 
 * Ye CRITICAL hai Reflexion ke liye kyunki:
 * - Hume parseable reflections chahiye jo improvement guide karein
 * - Search queries reliably extract hone chahiye
 * - Citations ke saath answer format consistent hona chahiye
 */

export const llm = new ChatOpenAI({
    model: 'gpt-4',  // Production mein GPT-4 use karenge
    temperature: 0.7,  // Thoda creativity research ke liye, but zyada random nahi
});

// ======================================================================
// SECTION 3: STATE DEFINITION - Reflexion System ki "Memory"
// ======================================================================

/**
 * ███████╗████████╗ █████╗ ████████╗███████╗
 * ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
 * ███████╗   ██║   ███████║   ██║   █████╗  
 * ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  
 * ███████║   ██║   ██║  ██║   ██║   ███████╗
 * ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
 * 
 * REFLEXION STATE KO KYA KHAS BANATA HAI?
 * ──────────────────────────────────────────────────────────────────
 * Normal state: Sirf messages[] hota hai
 * Reflexion state: messages[] + iteration COUNTER
 * 
 * Iteration counter hi MEMORY hai:
 * - Track karta hai ki kitne improvement cycles ho chuke hain
 * - Infinite loops se bachata hai (MAX_ITERATIONS = 2)
 * - Conditional routing enable karta hai experience ke based pe
 * - Har increment represent karta hai "past mistakes se seekhna"
 * 
 * STATE KAISE BADALTA HAI:
 * ──────────────────────────────────────────────────────────────────
 * 
 * ROUND 0 (Shuruat):
 * {
 *   messages: [HumanMessage(query)],
 *   iteration: 0  // Fresh start, abhi koi memory nahi
 * }
 * 
 * ROUND 1 (Pehle responder ke baad):
 * {
 *   messages: [
 *     HumanMessage(query),
 *     AIMessage(answer1)  // Contains reflection & searchQueries
 *   ],
 *   iteration: 0  // Abhi increment nahi hua
 * }
 * 
 * ROUND 1 (searchExecutor ke baad):
 * {
 *   messages: [
 *     HumanMessage(query),
 *     AIMessage(answer1),
 *     HumanMessage(searchResults1)
 *   ],
 *   iteration: 0
 * }
 * 
 * ROUND 1 (revisor ke baad):
 * {
 *   messages: [
 *     HumanMessage(query),
 *     AIMessage(answer1),
 *     HumanMessage(searchResults1),
 *     AIMessage(answer2)  // Search results use karke improved answer
 *   ],
 *   iteration: 1  // MEMORY: "Maine ek baar seekh liya"
 * }
 * 
 * ROUND 2 (doosre search ke baad):
 * {
 *   messages: [
 *     HumanMessage(query),
 *     AIMessage(answer1),
 *     HumanMessage(searchResults1),
 *     AIMessage(answer2),
 *     HumanMessage(searchResults2)  // Naya search based on answer2 ke queries
 *   ],
 *   iteration: 1
 * }
 * 
 * ROUND 2 (doosre revisor ke baad):
 * {
 *   messages: [
 *     ...saare previous messages,
 *     AIMessage(answer3)  // Final, most improved version
 *   ],
 *   iteration: 2  // MEMORY: "Maine do baar seekh liya, ab rukna hai"
 * }
 */

/**
 * ZOD SCHEMA DEFINITION
 * ──────────────────────────────────────────────────────────────────
 * Zod kyun? Ye provide karta hai:
 * - Runtime type validation (data sahi format mein hai ya nahi)
 * - Clear error messages agar LLM wrong format return kare
 * - Type inference for TypeScript
 * - Self-documenting structure
 */

const reflectionSchema = z.object({
    missing: z.string().describe('Critique of what is missing - kya kami hai.'),
    superfluous: z.string().describe('Critique of what is superfluous - kya zyada hai.'),
});

export const questionAnswerSchema = z.object({
    answer: z.string().describe('~250 word detailed answer to the question.'),
    reflection: reflectionSchema,
    searchQueries: z
        .array(z.string())
        .describe(
            '1-3 search queries for researching improvements to address the critique of your current answer.'
        ),
});

export type QuestionAnswer = z.infer<typeof questionAnswerSchema>;

/**
 * GRAPH STATE DEFINITION
 * ──────────────────────────────────────────────────────────────────
 * Combine karta hai:
 * 1. MessagesAnnotation.spec - Built-in message handling
 * 2. iteration - Custom counter for Reflexion memory
 */
export const graphState = Annotation.Root({
    ...MessagesAnnotation.spec,
    iteration: Annotation<number>,
});

// ======================================================================
// SECTION 4: RESPONDER NODE - Pehla Attempt Karne Wala
// ======================================================================

/**
 * ██████╗ ███████╗███████╗██████╗  ██████╗ ███╗   ██╗██████╗ ███████╗██████╗ 
 * ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗
 * ██████╔╝█████╗  ███████╗██████╔╝██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
 * ██╔══██╗██╔══╝  ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
 * ██║  ██║███████╗███████║██║     ╚██████╔╝██║ ╚████║██████╔╝███████╗██║  ██║
 * ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
 * 
 * KAAM: Pehla attempt banana
 * 
 * PROMPT MEIN CURRENT DATE/TIME KYON?
 * ──────────────────────────────────────────────────────────────────
 * Research questions often depend on current information
 * "JavaScript 2025 mein kya naya hai?" - iske liye pata hona chahiye ki hum 2025 MEIN hain
 * Date ke bina, AI outdated knowledge based answer de sakta hai
 * 
 * DO SYSTEM PROMPTS KYON?
 * ──────────────────────────────────────────────────────────────────
 * Pehla system: Main task aur expectations set karta hai
 * Doosra system (messages ke baad): Structured output requirement reinforce karta hai
 * Ye double-prompting format compliance improve karta hai
 * 
 * OUTPUT STRUCTURE BREAKDOWN:
 * ──────────────────────────────────────────────────────────────────
 * {
 *   "answer": "...",           // User ke liye main content
 *   "reflection": {            // Self-critique (Reflexion ki key)
 *     "missing": "...",        // Kya improve karna hai
 *     "superfluous": "..."     // Kya hata dena chahiye
 *   },
 *   "searchQueries": [...]     // Missing info kaise find karni hai
 * }
 * 
 * Ye structure Reflexion ko ENABLE karta hai kyunki:
 * 1. answer provide karta hai current attempt
 * 2. reflection identify karta hai WHAT to improve
 * 3. searchQueries batata hai HOW to improve it
 */

async function responder(state: typeof graphState.State) {
    console.log("\n🔷 RESPONDER NODE EXECUTING (Pehla Attempt)");
    console.log(`   Iteration: ${state.iteration}`);
    
    const currentDateTime = new Date().toLocaleString('sv-SE');

    const SYSTEM_PROMPT = `
       Tum ek expert researcher ho.
       Current time: ${currentDateTime}
       
       1. Detailed ~250 word answer do.
       2. Reflect karo aur apne answer ki critique karo. Severe bano taake maximum improvement ho.
       3. Max 3 search queries recommend karo research karne ke liye aur apna answer improve karne ke liye.
    `;

    console.log("   📝 Initial answer bana raha hai self-reflection ke saath...");
    
    const llmWithStructure = llm.withStructuredOutput(questionAnswerSchema);

    const response = await llmWithStructure.invoke([
        {
            role: 'system',
            content: SYSTEM_PROMPT,
        },
        ...state.messages,
        {
            role: 'system',
            content: `User ke original question aur actions taken reflect karo. Structured output mein do.`,
        },
    ]);

    console.log("   ✅ Initial response generate ho gaya");
    console.log(`   🔍 Search queries propose kiye:`, response.searchQueries);

    return {
        messages: [new AIMessage(JSON.stringify(response))],
        iteration: state.iteration,  // Abhi increment mat karo
    };
}

// ======================================================================
// SECTION 5: REVISOR NODE - Improvement Karne Wala with Memory
// ======================================================================

/**
 * ██████╗ ███████╗██╗   ██╗██╗███████╗ ██████╗ ██████╗ 
 * ██╔══██╗██╔════╝██║   ██║██║██╔════╝██╔═══██╗██╔══██╗
 * ██████╔╝█████╗  ██║   ██║██║███████╗██║   ██║██████╔╝
 * ██╔══██╗██╔══╝  ╚██╗ ██╔╝██║╚════██║██║   ██║██╔══██╗
 * ██║  ██║███████╗ ╚████╔╝ ██║███████║╚██████╔╝██║  ██║
 * ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
 * 
 * KAAM: Search results aur past reflections use karke answers improve karna
 * 
 * YEH REFLEXION KYON HAI (sirf reflection nahi)?
 * ──────────────────────────────────────────────────────────────────
 * Regular reflection sirf last answer dekhega
 * Reflexion dekhta hai:
 *   - Original query
 *   - Previous answers (including their reflections)
 *   - Multiple rounds ke search results
 *   - Iteration counter (memory of kitni attempts)
 * 
 * State mein iteration counter hi "memory" hai jo
 * Reflexion ko simple reflection se distinguish karta hai.
 * 
 * CRITICAL - ANSWER FORMAT REQUIREMENTS:
 * ──────────────────────────────────────────────────────────────────
 * Answer field mein References section HONA CHAHIYE kyunki:
 * 1. Users need to verify sources
 * 2. Credibility add hoti hai research ki
 * 3. Fact-checking enable hota hai
 * 4. Academic/professional use ke liye required hai
 * 
 * Example format:
 * "JavaScript 2025 mein pattern matching introduce hoga [1]. TC39 ne ye finalize kiya [2].
 * 
 * References:
 * - [1] https://tc39.es/proposals/pattern-matching
 * - [2] https://example.com/tc39-update"
 * 
 * INLINE CITATIONS KYON?
 * ──────────────────────────────────────────────────────────────────
 * [1], [2], [3] format allow karta hai:
 * - Easy reference mapping
 * - Clean reading flow
 * - Standard academic style
 * - Machine-parsable citations
 */

async function revisor(state: typeof graphState.State) {
    console.log("\n🔄 REVISOR NODE EXECUTING (Improvement Cycle)");
    console.log(`   Current iteration: ${state.iteration}`);
    
    const currentDateTime = new Date().toLocaleString('sv-SE');

    const SYSTEM_PROMPT = `
        Tum ek expert researcher ho.
        Current time: ${currentDateTime}
        
        Tumhara kaam hai apne previous answer ko revise karna using search results.
        
        CRITICAL - Answer Format Requirements:
        Tumhara "answer" field mein yeh exact structure HONA CHAHIYE:
        
        [Main answer content with citations like [1], [2], [3]...]
        
        References:
        - [1] https://actual-url-from-search-results.com
        - [2] https://another-url-from-search-results.com
        - [3] https://third-url-from-search-results.com
        
        Instructions:
        1. Main answer likho (~250 words) using information from search results
        2. Inline citations [1], [2], [3] use karo answer mein jab sources reference kar rahe ho
        3. MANDATORY: Answer field ko "References:" section ke saath END karo listing saare URLs
        4. References section answer field ka PART hai, alag field nahi
        5. Actual URLs extract karo search results se jo conversation mein provide kiye gaye hain
        6. Previous critique use karo superfluous information hatane ke liye
        7. Max 3 new search queries recommend karo research karne ke liye aur answer improve karne ke liye.
        
        Example answer field format:
        JavaScript rapidly evolve ho raha hai new features ke saath [1]. WebAssembly integration improve ho raha hai [2].
        
        References:
        - [1] https://example.com/js-features
        - [2] https://example.com/webassembly
    `;

    console.log("   📝 Answer revise kar raha hai search results aur past reflections ke saath...");

    const llmWithStructure = llm.withStructuredOutput(questionAnswerSchema);

    const response = await llmWithStructure.invoke([
        {
            role: 'system',
            content: SYSTEM_PROMPT,
        },
        ...state.messages,
        {
            role: 'system',
            content: `User ke original question aur actions taken reflect karo. Structured output mein do.`,
        },
    ]);

    console.log("   ✅ Revision complete");
    console.log(`   🔍 Naye search queries propose kiye:`, response.searchQueries);

    // INCREMENT ITERATION - Yeh hai MEMORY update!
    // Har increment ka matlab "maine ek aur round of feedback se seekha"
    const newIteration = state.iteration + 1;
    console.log(`   📊 Memory updated: iteration ${state.iteration} → ${newIteration}`);

    return {
        messages: [new AIMessage(JSON.stringify(response))],
        iteration: newIteration,
    };
}

// ======================================================================
// SECTION 6: SEARCH EXECUTOR TOOL - Information Gather Karne Wala
// ======================================================================

/**
 * ███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
 * ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
 * ███████╗█████╗  ███████║██████╔╝██║     ███████║
 * ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
 * ███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
 * ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 * 
 * KAAM: Web searches execute karna aur cleaned results return karna
 * 
 * TAVILY SEARCH KYON?
 * ──────────────────────────────────────────────────────────────────
 * Tavily optimized hai LLM applications ke liye:
 * - Clean, relevant content return karta hai (sirf snippets nahi)
 * - URLs include karta hai citation ke liye
 * - Structured results format
 * - API designed for AI agents
 * 
 * DATA CLEANING PROCESS:
 * ──────────────────────────────────────────────────────────────────
 * Raw Tavily output:
 * {
 *   results: [
 *     {
 *       title: "...",
 *       content: "Full article text...",
 *       url: "...",
 *       score: 0.95,
 *       raw_content: "..."
 *     },
 *     ...
 *   ]
 * }
 * 
 * Cleaned output:
 * [
 *   {
 *     query: "original search query",
 *     content: "Full article text...",  // Sirf yeh chahiye
 *     url: "..."                         // Citations ke liye
 *   },
 *   ...
 * ]
 * 
 * CLEAN KYON KARTE HAIN?
 * - Unnecessary fields hatao (score, raw_content)
 * - Har result mein query context add karo
 * - Token usage kam karo subsequent LLM calls mein
 * - Focus on what matters for answer generation
 * 
 * BATCH SEARCH KYON?
 * ──────────────────────────────────────────────────────────────────
 * .batch() parallel mein searches run karta hai:
 * - Faster than sequential
 * - Independent queries affect nahi karte ek doosre ko
 * - Results maintain order matching input queries
 */

const tavilySearch = new TavilySearch({ maxResults: 2 });  // Har query ke top 2 results lo

export async function searchExecutor(state: typeof graphState.State) {
    console.log("\n🔍 SEARCH EXECUTOR RUNNING");
    
    // Last message lo (AIMessage hona chahiye with searchQueries)
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    const parsed = JSON.parse(lastMessage.content as string) as QuestionAnswer;

    console.log(`   ${parsed.searchQueries.length} search queries execute ho rahe hain:`);
    parsed.searchQueries.forEach((q, i) => console.log(`   ${i+1}. "${q}"`));

    // Saare searches parallel mein execute karo
    const searchResult = await tavilySearch.batch(
        parsed.searchQueries.map((query) => ({ query }))
    );

    // Clean aur structure the results
    const cleanedResults = [];

    for (let i = 0; i < parsed.searchQueries.length; i++) {
        const query = parsed.searchQueries[i];
        const searchOutput = searchResult[i];

        // Access the results array directly from the search output
        const results = searchOutput?.results || [];

        // Extract only essential fields from each result
        for (const result of results) {
            cleanedResults.push({
                query: query,
                content: result.content || '',
                url: result.url || '',
            });
            
            console.log(`   ✅ Result mila "${query}" ke liye: ${result.url}`);
        }
    }

    console.log(`   Total results retrieved: ${cleanedResults.length}`);

    return {
        messages: [new HumanMessage(JSON.stringify({ searchResults: cleanedResults }))],
    };
}

// ======================================================================
// SECTION 7: GRAPH CONSTRUCTION - The Reflexion Orchestrator
// ======================================================================

/**
 * ██████╗  █████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗
 * ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║
 * ██████╔╝███████║██████╔╝███████║██████╔╝███████║
 * ██╔══██╗██╔══██║██╔═══╝ ██╔══██║██╔═══╝ ██╔══██║
 * ██║  ██║██║  ██║██║     ██║  ██║██║     ██║  ██║
 * ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝
 * 
 * COMPLETE REFLEXION LOOP VISUALIZATION:
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                         LEGEND                                    │
 * │ ┌─────┐ Agent Node  │ ──→ Normal Edge  │ ══→ Conditional Edge  │
 * │ └─────┘              │                                          │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 *                              START
 *                                │
 *                                ▼
 *                        ┌───────────────┐
 *                        │   responder   │ ← Initial answer banata hai
 *                        │   (ACTOR #1)  │   self-reflection ke saath
 *                        └───────┬───────┘
 *                                │
 *                                ▼
 *                        ┌───────────────┐
 *                        │searchExecutor │ ← Web se real data laata hai
 *                        │    (TOOL)     │   searchQueries ke based pe
 *                        └───────┬───────┘
 *                                │
 *                                ▼
 *                        ┌───────────────┐
 *                        │    revisor    │ ← Answer improve karta hai
 *                        │   (ACTOR #2)  │   search results + memory ke saath
 *                        └───────┬───────┘
 *                                │
 *                    ════════════╧═══════════╗
 *                   ║                         ║
 *              [Check iteration]          [iteration >= MAX]
 *                   ║                         ║
 *                   ▼                         ▼
 *         ┌─────────────────┐          ┌─────────────┐
 *         │  searchExecutor  │          │     END     │
 *         │   (Doosra Round)  │          └─────────────┘
 *         └─────────────────┘
 *                   │
 *                   └──────→ wapas revisor ke paas
 * 
 * MAX_ITERATIONS = 2
 * 2 kyun? Improvement vs time/cost ka balance
 * - Round 1: Initial attempt + basic research
 * - Round 2: Deep improvement based on first round's critique
 * Zyada rounds = diminishing returns (fayda kam hota jata hai)
 */

export const graph = new StateGraph(graphState)
    // Saare nodes register karo
    .addNode('responder', responder)
    .addNode('searchExecutor', searchExecutor)
    .addNode('revisor', revisor)

    // Entry point: hamesha responder se start karo
    .addEdge('__start__', 'responder')
    
    // Fixed sequence for first round
    .addEdge('responder', 'searchExecutor')
    .addEdge('searchExecutor', 'revisor')

    // Conditional edge: REFLEXION LOOP
    .addConditionalEdges(
        'revisor',
        (state: typeof graphState.State) => {
            const MAX_ITERATIONS = 2;
            
            console.log(`\n   🔄 Reflexion check: iteration ${state.iteration} / ${MAX_ITERATIONS}`);
            
            if (state.iteration >= MAX_ITERATIONS) {
                console.log("   ✅ Max iterations reach ho gaye → ending");
                return '__end__';
            }

            console.log("   🔁 Abhi kaafi nahi seekha → ek aur round research & revision ka");
            return 'searchExecutor';
        },
        {
            __end__: '__end__',
            searchExecutor: 'searchExecutor',
        }
    );

// ======================================================================
// SECTION 8: COMPLETE EXECUTION EXAMPLE WITH DATA FLOW TRACING
// ======================================================================

/**
 * 🎬 COMPLETE RUNTHROUGH WITH REAL DATA
 * 
 * User: "JavaScript 2025 mein kya naya hai?"
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 1 - INITIAL ATTEMPT (Pehla Chakkar)
 * ──────────────────────────────────────────────────────────────────
 * 
 * [responder]
 * ├─ Input: HumanMessage("JavaScript 2025 mein kya naya hai?")
 * ├─ LLM generates:
 * │  {
 * │    "answer": "JavaScript 2025 mein kai naye features aa rahe hain including pattern matching, 
 * │               temporal API improvements, aur naye array methods. Language continuously 
 * │               evolve ho raha hai TC39 proposals ke saath stage 4 tak pahunch kar.",
 * │    "reflection": {
 * │      "missing": "Specific proposal names, adoption dates, aur browser support details chahiye",
 * │      "superfluous": "JavaScript evolution ke generic statements"
 * │    },
 * │    "searchQueries": [
 * │      "TC39 stage 4 proposals 2025",
 * │      "JavaScript 2025 features browser support",
 * │      "pattern matching JavaScript release date"
 * │    ]
 * │  }
 * └─ Output: AIMessage with JSON string
 * 
 * [searchExecutor]
 * ├─ Input: AIMessage with searchQueries
 * ├─ Tavily batch search:
 * │  Query 1: "TC39 stage 4 proposals 2025"
 * │  → Results: [
 * │      { content: "ECMAScript 2025 includes: Pattern Matching (Stage 4), 
 * │                  Temporal (Stage 4), Iterator Helpers (Stage 4)...",
 * │        url: "https://tc39.es/proposals/2025" },
 * │      { content: "TC39 finished proposals for 2025: Decorators, 
 * │                  RegExp Modifiers, Promise.try...",
 * │        url: "https://github.com/tc39/proposals" }
 * │    ]
 * │  Query 2: "JavaScript 2025 features browser support"
 * │  → Results: [
 * │      { content: "Chrome 120+ supports pattern matching behind flags...",
 * │        url: "https://caniuse.com/js-features-2025" }
 * │    ]
 * │  Query 3: "pattern matching JavaScript release date"
 * │  → Results: [
 * │      { content: "Pattern matching expected in ES2025, June 2025 publication...",
 * │        url: "https://2ality.com/2025/js-pattern-matching" }
 * │    ]
 * └─ Output: HumanMessage with cleaned results array
 * 
 * [revisor] (First revision)
 * ├─ Input: Original query + initial answer + search results
 * ├─ LLM generates improved answer:
 * │  {
 * │    "answer": "JavaScript 2025 mein kai major features aa rahe hain based on TC39 proposals [1]. 
 * │               Key additions mein Pattern Matching hai elegant conditional logic ke liye [2], 
 * │               Temporal API modern date/time handling ke liye [3], aur Iterator Helpers enhanced 
 * │               collection processing ke liye [1]. Chrome 120+ already pattern matching support 
 * │               karta hai experimental flags ke saath [4]. ECMAScript 2025 specification June 2025 
 * │               tak aane ki ummeed hai [5]. Other stage 4 proposals mein Decorators aur Promise.try hain [1].
 * │    
 * │               References:
 * │               - [1] https://tc39.es/proposals/2025
 * │               - [2] https://github.com/tc39/proposals
 * │               - [3] https://2ality.com/2025/js-pattern-matching
 * │               - [4] https://caniuse.com/js-features-2025
 * │               - [5] https://2ality.com/2025/js-pattern-matching",
 * │    "reflection": {
 * │      "missing": "Real-world adoption metrics aur performance comparisons chahiye",
 * │      "superfluous": "Speculative future features hata diye"
 * │    },
 * │    "searchQueries": [
 * │      "pattern matching performance benchmarks",
 * │      "JavaScript 2025 features adoption statistics"
 * │    ]
 * │  }
 * ├─ iteration: 0 → 1
 * └─ Output: AIMessage with revised answer
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 2 - REFLEXION LOOP (iteration=1 < MAX=2)
 * ──────────────────────────────────────────────────────────────────
 * 
 * [searchExecutor] (Doosra round)
 * ├─ Input: Naye searchQueries from revisor
 * ├─ New searches for adoption metrics
 * └─ Output: HumanMessage with new results
 * 
 * [revisor] (Doosra revision)
 * ├─ Input: Saara previous context + naya adoption data
 * ├─ Generates final answer with:
 * │  - Saare features from round 1
 * │  - Performance benchmarks
 * │  - Adoption statistics
 * │  - Comprehensive citations
 * ├─ iteration: 1 → 2
 * └─ Output: AIMessage with final answer
 * 
 * ──────────────────────────────────────────────────────────────────
 * FINAL OUTPUT TO USER
 * ──────────────────────────────────────────────────────────────────
 * 
 * "JavaScript 2025 mein pattern matching introduce hoga (2-3x faster than switch [6]), 
 *  Temporal API (adopted by 45% of developers [7]), aur Iterator Helpers. 
 *  Chrome 120+ pattern matching support karta hai [4]. ES2025 spec June 2025 [5].
 *  
 *  References:
 *  - [1] https://tc39.es/proposals/2025
 *  - [2] https://github.com/tc39/proposals
 *  - [3] https://2ality.com/2025/js-pattern-matching
 *  - [4] https://caniuse.com/js-features-2025
 *  - [5] https://2ality.com/2025/js-pattern-matching
 *  - [6] https://benchmarks.dev/pattern-matching-vs-switch
 *  - [7] https://stateofjs.com/2025/features"
 */

// ======================================================================
// SECTION 9: INTERACTIVE MAIN FUNCTION
// ======================================================================

/**
 * ███╗   ███╗ █████╗ ██╗███╗   ██╗
 * ████╗ ████║██╔══██╗██║████╗  ██║
 * ██╔████╔██║███████║██║██╔██╗ ██║
 * ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
 * ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
 * ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
 * 
 * INTERACTIVE COMMAND-LINE INTERFACE
 * 
 * FEATURES:
 * - Continuous conversation loop
 * - Thinking process dikhta hai
 * - Final formatted answer display hota hai
 * - '/bye' type karo exit ke liye
 */

async function main() {
    console.log("\n" + "=".repeat(60));
    console.log("🧠 REFLEXION RESEARCH AGENT (HINGLISH VERSION)");
    console.log("=".repeat(60));
    console.log("\n📋 SYSTEM FEATURES:");
    console.log("   • Self-reflection on each answer (Khud ki critique)");
    console.log("   • Web search for real-time information (Real data)");
    console.log("   • Memory of past attempts (iteration counter)");
    console.log("   • Maximum 2 improvement cycles (2 rounds tak improvement)");
    console.log("   • Citations with source URLs (Sources ke saath jawab)");
    console.log("\n💬 Koi bhi research question poochho (type '/bye' to exit)\n");

    const app = graph.compile();
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    let questionCount = 0;

    while (true) {
        const query = await rl.question('👤 Aap: ');
        
        if (query.toLowerCase() === '/bye') {
            console.log('\n🤖 Assistant: Mere saath research karne ke liye dhanyavaad! Bye bye!\n');
            break;
        }

        questionCount++;
        console.log(`\n📨 [Question #${questionCount}] Processing with Reflexion...`);
        console.log('🤔 Soch raha hai (thoda waqt lagega)...\n');

        const result = await app.invoke({
            messages: [{ role: 'user', content: query }],
        });

        console.log('\n' + '='.repeat(80));
        console.log('📋 FINAL ANSWER (Reflexion ke baad)');
        console.log('='.repeat(80) + '\n');

        const lastMessage = result.messages[result.messages.length - 1].content;
        const parsed = JSON.parse(lastMessage as string);
        
        console.log(parsed.answer);
        console.log('\n' + '='.repeat(80));
        console.log(`✅ Research complete after ${result.iteration} improvement cycles (${result.iteration} rounds mein improve hua)`);
        console.log('='.repeat(80) + '\n');
    }

    rl.close();
}

// ======================================================================
// SECTION 10: ERROR HANDLING AND STARTUP
// ======================================================================

/**
 * GLOBAL ERROR HANDLER
 * Koi bhi unhandled error catch karta hai
 */
process.on('unhandledRejection', (error) => {
    console.error('\n❌ Unhandled rejection:', error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('\n❌ Uncaught exception:', error);
    process.exit(1);
});

/**
 * START THE APPLICATION
 */
console.log("\n🚀 Reflexion Research Agent start ho raha hai...");
console.log("⏳ Components initialize ho rahe hain...");

main().catch((error) => {
    console.error("\n💥 Fatal error in main:", error);
    process.exit(1);
});

// ======================================================================
// APPENDIX: COMPLETE REFLEXION ARCHITECTURE SUMMARY (Hinglish)
// ======================================================================

/**
 * 📌 REFLEXION PATTERN SUMMARY
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     CORE COMPONENTS                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                  │
 * │ 1. ACTOR (responder + revisor)                                  │
 * │    • Initial answers create karta hai                           │
 * │    • Feedback ke based pe revise karta hai                      │
 * │    • Self-reflections generate karta hai                        │
 * │    • Search queries propose karta hai                           │
 * │                                                                  │
 * │ 2. EVALUATOR (built into actor prompts)                         │
 * │    • Apne output ki critique karta hai                          │
 * │    • Missing information identify karta hai                      │
 * │    • Superfluous content spot karta hai                         │
 * │    • Improvement direction guide karta hai                      │
 * │                                                                  │
 * │ 3. MEMORY (state.iteration)                                     │
 * │    • Track karta hai kitne improvement cycles hue               │
 * │    • Infinite loops se bachata hai                              │
 * │    • Conditional routing enable karta hai                       │
 * │    • Represent karta hai "lessons learned"                      │
 * │                                                                  │
 * │ 4. TOOL (searchExecutor)                                        │
 * │    • Real-world data gather karta hai                           │
 * │    • Citation sources provide karta hai                         │
 * │    • Fact-checking enable karta hai                             │
 * │    • Evidence-based answers support karta hai                   │
 * │                                                                  │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 📊 DATA FLOW SUMMARY
 * ======================================================================
 * 
 * Stage          | Input                          | Output
 * ---------------|--------------------------------|------------------
 * responder      | User query                     | Answer + reflection + queries
 * searchExecutor | Search queries                  | Structured search results
 * revisor        | Previous answer + search results| Improved answer + new reflections
 * 
 * 🔄 REFLEXION LOOP
 * ======================================================================
 * 
 * Round 1 (Pehla Chakkar): 
 *   responder → searchExecutor → revisor (iteration=1)
 *   ↓
 *   agar iteration < MAX: loop
 *   ↓
 * Round 2 (Doosra Chakkar):
 *   searchExecutor (naye queries) → revisor (iteration=2)
 *   ↓
 *   agar iteration >= MAX: end
 * 
 * 🎯 KEY INSIGHTS (Important Baatein)
 * ======================================================================
 * 
 * 1. REFLEXION ≠ Reflection
 *    • Reflection: "Mujhe apna kaam check karna hai" (ek baar)
 *    • Reflexion: "Mujhe apni galtiyan yaad rakhni hain" (persistent learning)
 * 
 * 2. MEMORY is the iteration counter
 *    • Sirf data store karna nahi, learning progress track karna
 *    • Har iteration = ek learning cycle
 *    • Endless loops se bachata hai
 * 
 * 3. SELF-REFLECTION drives improvement
 *    • Missing: Kya add karna hai
 *    • Superfluous: Kya hatana hai
 *    • Search queries: Missing info kaise find karni hai
 * 
 * 4. MULTIPLE ROUNDS compound learning
 *    • Round 1: Basic research
 *    • Round 2: Deep dive based on round 1 critique
 *    • Zyada rounds = diminishing returns (fayda kam hota hai)
 * 
 * 🚀 PRODUCTION ENHANCEMENTS (Aur Kya Kar Sakte Hain)
 * ======================================================================
 * 
 * 1. Persistent memory across sessions (database mein save karo)
 * 2. Different MAX_ITERATIONS per query type (simple vs complex)
 * 3. Caching for common searches (baar-baar same search na ho)
 * 4. Include more search providers (Google, Bing, etc.)
 * 5. Fact-checking validation (information sahi hai ya nahi)
 * 6. User feedback loop (user bataye answer sahi hai ya nahi)
 * 7. Track improvement metrics (kitna improve hua)
 * 8. Parallel search execution (ek saath multiple searches)
 * 
 * ======================================================================
 * 🎉 IMPLEMENTATION COMPLETE
 * ======================================================================
 * 
 * This Reflexion Research Agent demonstrate karta hai:
 * 
 * ✅ ADVANCED REFLEXION PATTERN
 *   • Self-reflection on each answer (khud ki critique)
 *   • Memory of improvement cycles (iteration counter)
 *   • Iterative refinement (round by round improvement)
 *   • Learning from mistakes (galtiyon se seekhna)
 * 
 * ✅ TOOL INTEGRATION
 *   • Tavily search API
 *   • Structured data cleaning
 *   • Citation generation (sources ke saath)
 * 
 * ✅ STATE MANAGEMENT
 *   • Messages tracking
 *   • Iteration counter (memory)
 *   • Conditional routing
 * 
 * ✅ PRODUCTION READINESS
 *   • Error handling
 *   • Clear data flow
 *   • Modular design
 *   • Extensive documentation (poora samjhaya)
 * 
 * System ab truly "learns from its mistakes" through
 * multiple refinement cycles, har cycle build karti hai
 * pehle ki reflections aur learning par.
 * 
 * ======================================================================
 */