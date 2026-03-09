/**
 * ======================================================================
 * 2023 LANGCHAIN RESEARCH PAPER: PLAN AND EXECUTE (HINGLISH VERSION)
 * ======================================================================
 * 
 * ██████╗ ██╗      █████╗ ███╗   ██╗    ███████╗██╗  ██╗███████╗ ██████╗██╗   ██╗████████╗███████╗
 * ██╔══██╗██║     ██╔══██╗████╗  ██║    ██╔════╝██║  ██║██╔════╝██╔════╝██║   ██║╚══██╔══╝██╔════╝
 * ██████╔╝██║     ███████║██╔██╗ ██║    █████╗  ███████║█████╗  ██║     ██║   ██║   ██║   █████╗  
 * ██╔═══╝ ██║     ██╔══██║██║╚██╗██║    ██╔══╝  ██╔══██║██╔══╝  ██║     ██║   ██║   ██║   ██╔══╝  
 * ██║     ███████╗██║  ██║██║ ╚████║    ███████╗██║  ██║███████╗╚██████╗╚██████╔╝   ██║   ███████╗
 * ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝
 * 
 * ==================== YEH PATTERN KYA PROBLEM SOLVE KARTA HAI? ===================
 * 
 * SIMPLE DEFINITION (Hinglish Mein):
 * ──────────────────────────────────────────────────────────────────
 * Jab AI ek saath sochta bhi hai aur act bhi karta hai, to:
 * - Expensive ho jata hai (bahut tokens lagte hain)
 * - Garbar ho jati hai (messy)
 * - Baar-baar reasoning karta rehta hai
 * 
 * SOLUTION: Process ko alag karo
 * 
 * STEP 1: PLAN (Bada Model)
 * ──────────────────────────────────────────────────────────────────
 * - Poora problem samjho
 * - Chhote tasks mein todo
 * - Ordered list banao
 * - Sirf reasoning, execution nahi
 * - Ek baar mein plan banao
 * 
 * STEP 2: EXECUTE (Chhota Model)
 * ──────────────────────────────────────────────────────────────────
 * - Har task lo plan se
 * - Complete karo
 * - Agle step par jao
 * - Deep reasoning ki zaroorat nahi
 * - Fast execution
 * 
 * ==================== ADVANTAGES (FAYDE) ===============================
 * 
 * 1) COST OPTIMIZATION (Paisa bachao)
 *    - Bada model sirf EK baar use hota hai (planning ke liye)
 *    - Chhota model baar-baar kaam karta hai (execution ke liye)
 *    - Example: Planning mein GPT-4, execution mein GPT-3.5
 * 
 * 2) STRUCTURED THINKING (Systematic approach)
 *    - Clear roadmap - pata hai agla step kya hai
 *    - Confusion kam hoti hai
 *    - Debug karna easy hai - dekh sakte ho kaunse step mein problem aayi
 *    - Monitor karna simple hai
 * 
 * 3) BETTER FOR COMPLEX TASKS (Mushkil kaam ke liye)
 *    - Multi-step workflows manageable ho jate hain
 *    - Think-Act loop se kam chaotic
 *    - Har step focused hai
 * 
 * 4) SCALABLE ARCHITECTURE (Bada system bana sakte ho)
 *    - Planning ke liye different model daal sakte ho
 *    - Execution ke liye different model daal sakte ho
 *    - Clean system design
 * 
 * ==================== DISADVANTAGES (NUKSAN) ============================
 * 
 * 1) EXCESS TOKEN USAGE IN PLANNING
 *    - Bada plan banane mein bahut tokens lag jate hain
 *    - Long plans context size badha dete hain
 *    - Example: 10 steps ka plan = bahut saare tokens
 * 
 * 2) CONTEXT PASSING OVERHEAD
 *    - Plan ko executor tak pass karna padta hai
 *    - Baar-baar plan bhejna padta hai (token cost badhti hai)
 *    - Har step ke baad state update karna padta hai
 * 
 * 3) RIGID EXECUTION (Akad)
 *    - Agar plan galat hai, to executor blindly follow karega
 *    - Galti pata chalne par poora plan dobara banana padega
 *    - Dynamic adjustment mushkil hai
 * 
 * 4) OVERKILL FOR SMALL TASKS
 *    - Chhote sawaal ke liye planning step unnecessary hai
 *    - Extra latency - waiting time badh jata hai
 *    - Example: "2+2 kya hai?" - iske liye plan banana bekar hai
 * 
 * 5) NO DYNAMIC ADAPTATION
 *    - Beech mein environment badal gaya to system struggle karega
 *    - Plan re-plot karna padega
 *    - Real-time changes handle karna mushkil
 * 
 * ==================== COMPARISON WITH REACT ============================
 * 
 * a) ReAct Pattern:
 *    Think → Act → Think → Act → Think → Act
 *    └─ Dynamic hai, har step ke baad sochta hai
 *    └─ Expensive hai (har step mein LLM call)
 *    └─ Flexible hai, adapt kar sakta hai
 * 
 * b) Plan & Execute:
 *    Think Once → Execute Many → Execute Many → Execute Many
 *    └─ Structured hai, ek baar plan, phir execute
 *    └─ Cheap hai (ek baar bada model, baaki chhota)
 *    └─ Rigid hai, plan galat hua to problem
 * 
 * ==================== QUICK DECISION RULE ===============================
 * 
 * Plan & Execute USE KARO JAB:
 * ✓ Problem structured ho
 * ✓ Multi-step ho
 * ✓ Predictable ho
 * ✓ Long reasoning ho
 * 
 * Plan & Execute AVOID KARO JAB:
 * ✗ Problem chhoti ho (simple Q&A)
 * ✗ Dynamic ho (real-time changes)
 * ✗ Creative ho (creative writing)
 * ✗ Real-time ho (chat conversations)
 * 
 * ==================== BEST USE CASES ====================================
 * 
 * 1. COMPLEX AUTOMATION:
 *    "Monthly report generate karo, team ko email karo, aur Slack pe post karo"
 * 
 * 2. MULTI-STEP PIPELINES:
 *    "Data fetch karo, clean karo, analyze karo, aur chart banao"
 * 
 * 3. LONG REASONING WORKFLOWS:
 *    "Stock market analysis karo, trends identify karo, future predict karo"
 * 
 * 4. AGENT ORCHESTRATION SYSTEMS:
 *    "Research paper padho, summary banao, key points extract karo, presentation banao"
 * 
 * IMPORTANT NOTE:
 * ──────────────────────────────────────────────────────────────────
 * Disadvantages ki wajah se, Plan & Execute pattern zyada production
 * mein use nahi hota. ReAct pattern zyada popular hai.
 */

/**
 * ======================================================================
 * PLAN AND EXECUTE PATTERN - COMPLETE IMPLEMENTATION (HINGLISH VERSION)
 * ======================================================================
 * 
 * ██████╗ ██╗      █████╗ ███╗   ██╗    ███████╗██╗  ██╗███████╗ ██████╗██╗   ██╗████████╗███████╗
 * ██╔══██╗██║     ██╔══██╗████╗  ██║    ██╔════╝██║  ██║██╔════╝██╔════╝██║   ██║╚══██╔══╝██╔════╝
 * ██████╔╝██║     ███████║██╔██╗ ██║    █████╗  ███████║█████╗  ██║     ██║   ██║   ██║   █████╗  
 * ██╔═══╝ ██║     ██╔══██║██║╚██╗██║    ██╔══╝  ██╔══██║██╔══╝  ██║     ██║   ██║   ██║   ██╔══╝  
 * ██║     ███████╗██║  ██║██║ ╚████║    ███████╗██║  ██║███████╗╚██████╗╚██████╔╝   ██║   ███████╗
 * ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝
 * 
 * ==================== PLAN AND EXECUTE KYA HAI? =========================
 * 
 * Simple Definition (Hinglish Mein):
 * ──────────────────────────────────────────────────────────────────
 * Complex questions ka answer dene ke liye, AI ek saath sab kuch karne ki 
 * koshish nahi karta. Iski jagah:
 * 
 * 1. PLAN   : Problem ko chhote steps mein todta hai
 * 2. EXECUTE: Har step ek-ek karke complete karta hai
 * 3. CHECK  : Progress check karta hai aur plan adjust karta hai
 * 4. REPEAT : Jab tak saare steps complete nahi ho jate
 * 5. RESPOND: Final answer deta hai
 * 
 * YEH PATTERN KYON ZAROORI HAI?
 * ──────────────────────────────────────────────────────────────────
 * 
 * PROBLEM: Complex questions AI ko overwhelm kar dete hain
 *   ❌ "Indian cricket team ke T20I captain ka hometown kya hai?"
 *      Iske liye multiple steps chahiye:
 *      - Current captain kaun hai?
 *      - Unka hometown kahan hai?
 *      - Information up-to-date hai?
 * 
 *   ❌ Bina planning ke, AI might:
 *      - Purani information de de
 *      - Key details miss kar de
 *      - Hallucinate kare (man se answer bana de)
 *      - Complexity mein kho jaye
 * 
 * SOLUTION: Tod do chhote steps mein
 *   ✓ Step 1: Current T20I captain dhundo
 *   ✓ Step 2: Unka hometown search karo
 *   ✓ Step 3: Information verify karo (current hai ya nahi)
 *   ✓ Step 4: Final answer banao
 * 
 * ==================== VISUAL DATA FLOW ===============================
 * 
 *                           START
 *                             │
 *                             ▼
 *                    ┌─────────────────┐
 *                    │    PLANNER      │
 *                    │  (Plan Banao)   │
 *                    └────────┬────────┘
 *                             │
 *                             ▼
 *                    ┌─────────────────┐
 *                    │     AGENT       │
 *                    │  (Ek Step Karo) │
 *                    └────────┬────────┘
 *                             │
 *                             ▼
 *                    ┌─────────────────┐
 *                    │     REPLAN      │
 *                    │ (Check & Adjust)│
 *                    └────────┬────────┘
 *                             │
 *                    ┌────────┴────────┐
 *                    │                 │
 *                 [Ho Gaya?]        [Nahi Hua]
 *                    │                 │
 *                    ▼                 │
 *                   END ◄──────────────┘
 * 
 *                    Max 25 recursion limit (safety ke liye)
 * 
 * STATE KAISE BADHTA HAI (Real Example):
 * ──────────────────────────────────────────────────────────────────
 * 
 * SHURUAT MEIN:
 * {
 *   input: "Indian cricket team ke T20I captain ka hometown kya hai?",
 *   plan: [],           // Khali - planner bharega
 *   pastSteps: [],      // Khali - abhi kuch hua nahi
 *   response: ""        // Khali - answer abhi nahi hai
 * }
 *    ↓
 * [PLANNER] ne initial plan banaya
 *    ↓
 * {
 *   input: "Indian cricket team ke T20I captain ka hometown kya hai?",
 *   plan: [
 *     "Current T20I captain kaun hai yeh dhundo",
 *     "Us captain ka hometown search karo",
 *     "Information current hai ya nahi check karo",
 *     "Final answer banao"
 *   ],
 *   pastSteps: [],
 *   response: ""
 * }
 *    ↓
 * [AGENT] ne pehla step execute kiya
 *    ↓
 * {
 *   input: "Indian cricket team ke T20I captain ka hometown kya hai?",
 *   plan: [
 *     "Us captain ka hometown search karo",
 *     "Information current hai ya nahi check karo", 
 *     "Final answer banao"
 *   ],  // Pehla step plan se hat gaya
 *   pastSteps: [
 *     ["Current T20I captain dhundo", "Suryakumar Yadav current T20I captain hain"]
 *   ],
 *   response: ""
 * }
 *    ↓
 * [REPLAN] ne progress check kiya aur plan adjust kiya
 *    ↓
 * {
 *   input: "Indian cricket team ke T20I captain ka hometown kya hai?",
 *   plan: [
 *     "Suryakumar Yadav ka hometown search karo",
 *     "Information current hai ya nahi verify karo",
 *     "Final answer banao with hometown information"
 *   ],  // Plan refine hua specific name ke saath
 *   pastSteps: [previous step results...],
 *   response: ""
 * }
 *    ↓
 * ... aise hi chalta hai jab tak saare steps complete nahi ho jate
 *    ↓
 * [REPLAN] ne detect kiya ki sab ho gaya
 *    ↓
 * {
 *   input: "Indian cricket team ke T20I captain ka hometown kya hai?",
 *   plan: [],  // Khali - sab steps ho gaye
 *   pastSteps: [saare step results...],
 *   response: "Suryakumar Yadav, jo ki Indian T20I team ke current captain hain, unka hometown Mumbai, Maharashtra hai. Unhone 2024 mein captaincy sambhali aur abhi tak lead kar rahe hain."
 * }
 *    ↓
 * [shouldEnd] ne response dekha → END
 * 
 * ==================== DETAILED EXECUTION PIPELINE (HINGLISH) ==========
 * 
 * [USER: "Indian cricket team ke T20I captain ka hometown kya hai?"]
 *    ↓
 * [NODE: planner] - Pehla execution
 *    ├─ STATE SE PADHA: input field
 *    ├─ PROMPT: "Objective ke liye simple step by step plan banao..."
 *    ├─ LLM CALL with structured output
 *    │   SOCHA:
 *    │   │  - Question complex hai
 *    │   │  - Sub-tasks identify kiye
 *    │   │  - Logical order mein rakha
 *    │   │
 *    │   OUTPUT:
 *    │   {
 *    │     "steps": [
 *    │       "Current T20I captain kaun hai yeh dhundo",
 *    │       "Us captain ka hometown search karo",
 *    │       "Information current hai ya nahi check karo",
 *    │       "Final answer banao"
 *    │     ]
 *    │   }
 *    │
 *    └─ STATE MEIN LIKHA: plan = steps array
 *    ↓
 * [EDGE: planner → agent]
 *    ↓
 * [NODE: agent] - Pehla step execute karo
 *    ├─ STATE SE PADHA:
 *    │   • plan[0] = "Current T20I captain kaun hai yeh dhundo"
 *    │   • pastSteps (khali)
 *    │
 *    ├─ AgentExecutor banaya with tools (TavilySearch)
 *    ├─ INVOKE kiya task ke saath
 *    │   TASK: "Current T20I captain kaun hai yeh dhundo"
 *    │   AGENT NE SOCHA:
 *    │   │  1. TavilySearch use karna hai
 *    │   │  2. Search kiya: "current captain Indian T20I team 2025"
 *    │   │  3. Results aaye:
 *    │   │     • "Suryakumar Yadav appointed T20I captain in 2024"
 *    │   │     • "Hardik Pandya ki jagah Suryakumar ne li"
 *    │   │  4. Answer banaya
 *    │   │
 *    │   OUTPUT: "Suryakumar Yadav current T20I captain hain"
 *    │
 *    └─ STATE MEIN LIKHA:
 *       • pastSteps ← [task, result] append kiya
 *       • plan ← first element hata diya (shift)
 *    ↓
 * {
 *   plan: [
 *     "Us captain ka hometown search karo",
 *     "Information current hai ya nahi check karo", 
 *     "Final answer banao"
 *   ],
 *   pastSteps: [
 *     ["Current T20I captain dhundo", "Suryakumar Yadav current T20I captain hain"]
 *   ]
 * }
 *    ↓
 * [EDGE: agent → replan]
 *    ↓
 * [NODE: replan] - Review aur adjust
 *    ├─ STATE SE PADHA:
 *    │   • input: original question
 *    │   • plan: remaining steps
 *    │   • pastSteps: completed steps with results
 *    │
 *    ├─ PROMPT: "Objective ke liye step by step plan banao...
 *    │           Tumhara objective tha: {input}
 *    │           Tumhara original plan tha: {plan}
 *    │           Tumne yeh kar liya hai: {pastSteps}
 *    │           Plan update karo accordingly..."
 *    │
 *    ├─ LLM CALL with tool binding (planTool, responseTool)
 *    │   PROCESS:
 *    │   │  - Review kiya: Captain mil gaya = Suryakumar Yadav
 *    │   │  - Agle steps mein specific name chahiye
 *    │   │  - Plan refine kiya
 *    │   │
 *    │   OUTPUT (via planTool):
 *    │   {
 *    │     "type": "plan",
 *    │     "args": {
 *    │       "steps": [
 *    │         "Suryakumar Yadav ka hometown search karo",
 *    │         "Information current hai ya nahi verify karo",
 *    │         "Final answer banao with hometown information"
 *    │       ]
 *    │     }
 *    │   }
 *    │
 *    └─ STATE MEIN LIKHA: plan = refined steps
 *    ↓
 * [CONDITIONAL EDGE: shouldEnd]
 *    ├─ READ: response field (still empty)
 *    ├─ CHECK: response? true : false
 *    └─ DECISION: false → wapas agent ke paas
 *    ↓
 * [NODE: agent] - Doosra step execute karo
 *    ├─ READ: plan[0] = "Suryakumar Yadav ka hometown search karo"
 *    ├─ SEARCH: "Suryakumar Yadav hometown"
 *    ├─ RESULTS: "Mumbai, Maharashtra"
 *    └─ UPDATE: pastSteps + new result, plan se step hatao
 *    ↓
 * ... aise hi chalta hai remaining steps ke liye
 *    ↓
 * [NODE: replan] - Final check
 *    ├─ Saare steps complete, plan khali
 *    ├─ LLM NE DEKHA: Ab aur steps ki zaroorat nahi
 *    ├─ OUTPUT (via responseTool):
 *    │   {
 *    │     "type": "response",
 *    │     "args": {
 *    │       "response": "Suryakumar Yadav, jo ki Indian T20I team ke current captain hain, unka hometown Mumbai, Maharashtra hai. Unhone 2024 mein captaincy sambhali aur abhi tak team ko lead kar rahe hain."
 *    │     }
 *    │   }
 *    │
 *    └─ STATE MEIN LIKHA: response = final answer
 *    ↓
 * [CONDITIONAL EDGE: shouldEnd]
 *    ├─ READ: response exists (non-empty)
 *    ├─ CHECK: true
 *    └─ DECISION: END
 *    ↓
 * [END] Final state return karo answer ke saath
 */

// ======================================================================
// SECTION 1: IMPORTS - Jo libraries use karenge
// ======================================================================
import { HumanMessage } from '@langchain/core/messages';
import type { RunnableConfig } from '@langchain/core/runnables';
import { END, START, StateGraph, Annotation } from '@langchain/langgraph';
import z from 'zod';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { createAgent } from 'langchain';
import { tool } from '@langchain/core/tools';
import { TavilySearch } from '@langchain/tavily';
import { JsonOutputToolsParser } from '@langchain/core/output_parsers/openai_tools';

// ======================================================================
// SECTION 2: STATE DEFINITION - "Project Board" for Plan
// ======================================================================

/**
 * ███████╗████████╗ █████╗ ████████╗███████╗
 * ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
 * ███████╗   ██║   ███████║   ██║   █████╗  
 * ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  
 * ███████║   ██║   ██║  ██║   ██║   ███████╗
 * ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
 * 
 * YEH STATE STRUCTURE KYON IMPORTANT HAI?
 * ──────────────────────────────────────────────────────────────────
 * 
 * input: Original question (kabhi nahi badalta)
 *   - North star ki tarah kaam karta hai
 *   - Replanner use karta hai track check karne ke liye
 * 
 * plan: Bache hue steps ki array
 *   - First element current task hai
 *   - Elements shift off hote hain complete hote hi
 *   - Replanner poora plan REPLACE kar sakta hai
 *   - Custom reducer: (x, y) => y ?? x ?? []
 *     Matlab: agar naya plan diya to use karo, nahi to purana rakho
 * 
 * pastSteps: [task, result] pairs ki history
 *   - IMMUTABLE (sirf append hota hai)
 *   - Har step ka result save hota hai
 *   - Replanner use karta hai progress samajhne ke liye
 *   - Custom reducer: (x, y) => x.concat(y) (hamesha append)
 * 
 * response: Final answer (jab complete ho)
 *   - Khali rahta hai shuru mein
 *   - Ek baar set ho gaya to END condition trigger hota hai
 *   - Custom reducer: (x, y) => y ?? x (pehla non-empty wins)
 */

export const PlanExecuteState = Annotation.Root({
    input: Annotation<string>({
        reducer: (x, y) => y ?? x ?? '',  // Original input preserve karo
    }),
    plan: Annotation<string[]>({
        reducer: (x, y) => y ?? x ?? [],  // Naya plan diya to use karo
    }),
    pastSteps: Annotation<[string, string][]>({
        reducer: (x, y) => x.concat(y),   // History mein hamesha append karo
    }),
    response: Annotation<string>({
        reducer: (x, y) => y ?? x,         // Pehla response hi final
    }),
});

// ======================================================================
// SECTION 3: TOOL DEFINITIONS - Agent ke "Haath"
// ======================================================================

/**
 * ████████╗ ██████╗  ██████╗ ██╗     ███████╗
 * ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
 *    ██║   ██║   ██║██║   ██║██║     ███████╗
 *    ██║   ██║   ██║██║   ██║██║     ╚════██║
 *    ██║   ╚██████╔╝╚██████╔╝███████╗███████║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
 * 
 * ZOD SCHEMAS KYON?
 * ──────────────────────────────────────────────────────────────────
 * - LLM sahi format mein data return kare, ensure karta hai
 * - Type safety in TypeScript
 * - Clear error messages agar format galat ho
 * - Self-documenting structure
 * 
 * EMPTY TOOL FUNCTIONS KYON?
 * ──────────────────────────────────────────────────────────────────
 * planTool aur responseTool sirf STRUCTURED OUTPUT ke liye hain
 * Ye actually execute nahi karte kuch
 * Ye LLM ko force karte hain specific JSON format mein return karne ke liye
 * 
 * Actual kaam TavilySearch tool karta hai
 */

const planObject = z.object({
    steps: z.array(z.string()).describe('Different steps to follow, sorted order mein'),
});

const responseObject = z.object({
    response: z.string().describe('User ko final response.'),
});

/**
 * responseTool - Replanner use karta hai jab task complete ho
 * 
 * Jab replanner ye tool call karta hai, signal hota hai:
 * "Main ho gaya! Yeh lo final answer"
 * 
 * Empty function isliye fine hai kyunki:
 * 1. Hume sirf call ka STRUCTURE chahiye
 * 2. Actual response string args mein hoti hai
 * 3. Hume state mein capture karna hai via tool call parsing
 */
export const responseTool = tool(() => {}, {
    name: 'response',
    description: 'User ko response do.',
    schema: responseObject,
});

/**
 * planTool - Replanner use karta hai updated steps dene ke liye
 * 
 * Jab replanner ye tool call karta hai, ye provide karta hai:
 * Naye steps ki array
 * 
 * Isse dynamic plan adjustment possible hai based on:
 * - New information jo milli
 * - Unexpected results
 * - Changed circumstances
 */
export const planTool = tool(() => {}, {
    name: 'plan',
    description: 'Ye tool plan ke steps update karne ke liye hai.',
    schema: planObject,
});

/**
 * TavilySearch - Actual execution tool
 * 
 * Features:
 * - Web search optimized for LLMs
 * - Clean, relevant content return karta hai
 * - URLs bhi deta hai verification ke liye
 * - Max 3 results per query
 */
export const tools = [new TavilySearch({ maxResults: 3 })];

// ======================================================================
// SECTION 4: PLANNER NODE - The Strategist (Hinglish Mein)
// ======================================================================

/**
 * ██████╗ ██╗      █████╗ ███╗   ██╗███╗   ██╗███████╗██████╗ 
 * ██╔══██╗██║     ██╔══██╗████╗  ██║████╗  ██║██╔════╝██╔══██╗
 * ██████╔╝██║     ███████║██╔██╗ ██║██╔██╗ ██║█████╗  ██████╔╝
 * ██╔═══╝ ██║     ██╔══██║██║╚██╗██║██║╚██╗██║██╔══╝  ██╔══██╗
 * ██║     ███████╗██║  ██║██║ ╚████║██║ ╚████║███████╗██║  ██║
 * ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
 * 
 * KAAM: Initial execution plan banana
 * 
 * STRUCTURED OUTPUT KYON?
 * ──────────────────────────────────────────────────────────────────
 * .withStructuredOutput(planObject) forces LLM ko:
 * - Valid JSON return karne ke liye 'steps' array ke saath
 * - Har step clear aur actionable string ho
 * - No extra commentary ya formatting
 * 
 * PLANNING KE PRINCIPLES:
 * ──────────────────────────────────────────────────────────────────
 * 1. "Do not add any superfluous steps"
 *    → Sirf necessary tasks, extra nahi
 * 
 * 2. "Each step has all the information needed"
 *    → Steps self-contained aur clear hone chahiye
 * 
 * 3. "Do not skip steps"
 *    → Logical progression, koi gap nahi
 * 
 * 4. "Result of final step should be final answer"
 *    → Plan seedha answer tak le jaaye
 * 
 * EXAMPLE PLANNING (Hindi mein):
 * 
 * Question: "Current Indian T20I captain ka hometown?"
 * 
 * Ganda plan:
 * 1. Internet pe search karo
 * 2. Answer dhundo
 *    → Bohat vague, critical steps skip kiye
 * 
 * Achha plan:
 * 1. Current Indian T20I captain kaun hai yeh dhundo
 * 2. Us captain ka hometown search karo
 * 3. Information current hai ya nahi verify karo
 * 4. Final answer banao
 *    → Har step clear aur actionable hai
 */

async function planStep(state: typeof PlanExecuteState.State) {
    console.log("\n📋 PLANNER NODE EXECUTING (Plan Bana Raha Hai)");
    console.log(`   Objective: "${state.input.substring(0, 50)}..."`);

    const plannerPrompt = ChatPromptTemplate.fromTemplate(
        `For the given objective, come up with a simple step by step plan. \
This plan should involve individual tasks, that if executed correctly will yield the correct answer. Do not add any superfluous steps. \
The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.

{objective}`
    );

    const model = new ChatOpenAI({
        modelName: 'gpt-4',  // Production mein GPT-4 use karenge
        temperature: 0,  // Deterministic planning
    });

    const structuredModel = model.withStructuredOutput(planObject);
    const planner = plannerPrompt.pipe(structuredModel);
    
    console.log("   🧠 Execution plan bana raha hai...");
    const plan = await planner.invoke({ objective: state.input });

    console.log(`   ✅ Plan bana diya: ${plan.steps.length} steps:`);
    plan.steps.forEach((step, i) => console.log(`      ${i+1}. ${step}`));

    return { plan: plan.steps };
}

// ======================================================================
// SECTION 5: EXECUTE STEP NODE - The Worker (Hinglish Mein)
// ======================================================================

/**
 * ███████╗██╗  ██╗███████╗ ██████╗██╗   ██╗████████╗███████╗
 * ██╔════╝██║  ██║██╔════╝██╔════╝██║   ██║╚══██╔══╝██╔════╝
 * █████╗  ███████║█████╗  ██║     ██║   ██║   ██║   █████╗  
 * ██╔══╝  ██╔══██║██╔══╝  ██║     ██║   ██║   ██║   ██╔══╝  
 * ███████╗██║  ██║███████╗╚██████╗╚██████╔╝   ██║   ███████╗
 * ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝
 * 
 * KAAM: Plan ka ek step execute karna
 * 
 * createAgent() KYON?
 * ──────────────────────────────────────────────────────────────────
 * AgentExecutor provide karta hai:
 * - Tool selection logic (kab Tavily use karna hai)
 * - Multi-step reasoning within single step
 * - Memory of current task
 * - Proper tool result handling
 * 
 * EXECUTION FLOW PER STEP:
 * ──────────────────────────────────────────────────────────────────
 * 
 * 1. Plan se pehla step lo: plan[0]
 * 2. Agent banao with TavilySearch tool
 * 3. Agent analyze karta hai task ko:
 *    - Kya mujhe search karna hai? (haan, captain dhundhne ke liye)
 *    - Kaunsa search query use karna hai?
 * 4. Agent tool call karta hai, results aate hain
 * 5. Agent results se answer banata hai
 * 6. Result return karo
 * 
 * STATE UPDATES:
 * - Completed step ko plan se hatao (shift)
 * - pastSteps mein [task, result] append karo
 * - Baaki state same rahegi
 */

async function executeStep(state: typeof PlanExecuteState.State, config?: RunnableConfig) {
    console.log("\n⚙️ EXECUTE STEP NODE RUNNING (Kaam Ho Raha Hai)");
    
    const task = state.plan[0];
    console.log(`   Current task: "${task}"`);

    const input = {
        messages: [new HumanMessage(task)],
    };

    const agentExecutor = createAgent({
        model: new ChatOpenAI({ 
            model: 'gpt-3.5-turbo',  // Execution ke liye faster model
            temperature: 0 
        }),
        tools: tools,
    });

    console.log("   🔍 Task execute ho raha hai Tavily search ke saath...");
    const { messages } = await agentExecutor.invoke(input, config);

    const result = messages[messages.length - 1].content.toString();
    console.log(`   ✅ Task result: "${result.substring(0, 100)}..."`);

    return {
        pastSteps: [[task, result]],
        plan: state.plan.slice(1),  // Pehla step hatao
    };
}

// ======================================================================
// SECTION 6: REPLAN NODE - The Project Manager (Hinglish Mein)
// ======================================================================

/**
 * ██████╗ ███████╗██████╗ ██╗      █████╗ ███╗   ██╗
 * ██╔══██╗██╔════╝██╔══██╗██║     ██╔══██╗████╗  ██║
 * ██████╔╝█████╗  ██████╔╝██║     ███████║██╔██╗ ██║
 * ██╔══██╗██╔══╝  ██╔═══╝ ██║     ██╔══██║██║╚██╗██║
 * ██║  ██║███████╗██║     ███████╗██║  ██║██║ ╚████║
 * ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
 * 
 * KAAM: Progress review karo aur plan adjust karo
 * 
 * TOOLS BIND KYON?
 * ──────────────────────────────────────────────────────────────────
 * .bindTools([planTool, responseTool]) gives LLM do options:
 * 
 * 1. planTool: "Mujhe aur steps chahiye, yeh lo updated plan"
 * 2. responseTool: "Main ho gaya, yeh lo final answer"
 * 
 * LLM decide karta hai based on:
 * - Kya plan mein steps bache hain?
 * - Kya saari information gather ho gayi?
 * - Kya original question ka answer de sakte hain ab?
 * 
 * REPLAN DECISION LOGIC (Hinglish Mein):
 * ──────────────────────────────────────────────────────────────────
 * 
 * CASE 1: Aur kaam baaki hai
 *   Input: Original plan mein 3 steps the, 1 ho gaya
 *   Process: Results review karo, next steps refine karo
 *   Output: planTool with updated steps (2-3 refined)
 * 
 * CASE 2: Ho gaya
 *   Input: Saare steps complete, saari info hai
 *   Process: Final answer synthesize karo
 *   Output: responseTool with final answer
 * 
 * CASE 3: Plan ko major revision chahiye
 *   Input: Unexpected information mili
 *   Process: Approach rethink karo
 *   Output: planTool with completely new plan
 * 
 * JsonOutputToolsParser KYON?
 * ──────────────────────────────────────────────────────────────────
 * Tool calls ko clean structured objects mein parse karta hai:
 * [
 *   {
 *     type: "plan" | "response",
 *     args: { steps: [...] } | { response: "..." }
 *   }
 * ]
 */

async function replanStep(state: typeof PlanExecuteState.State) {
    console.log("\n🔄 REPLAN NODE EXECUTING (Review Ho Rahi Hai)");
    console.log(`   Progress: ${state.pastSteps.length}/${state.plan.length + state.pastSteps.length} steps complete`);

    const replannerPrompt = ChatPromptTemplate.fromTemplate(
        `For the given objective, come up with a simple step by step plan.
This plan should involve individual tasks, that if executed correctly will yield the correct answer. Do not add any superfluous steps.
The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.

Your objective was this:
{input}

Your original plan was this:
{plan}

You have currently done the follow steps:
{pastSteps}

Update your plan accordingly. If no more steps are needed and you can return to the user, then respond with that and use the 'response' function.
Otherwise, fill out the plan.
Only add steps to the plan that still NEED to be done. Do not return previously done steps as part of the plan.`
    );

    const parser = new JsonOutputToolsParser();
    const replanner = replannerPrompt
        .pipe(
            new ChatOpenAI({ 
                model: 'gpt-4',  // Planning ke liye bada model
                temperature: 0 
            }).bindTools([
                planTool,
                responseTool,
            ])
        )
        .pipe(parser);

    // Past steps ko format karo prompt ke liye
    const formattedPastSteps = state.pastSteps
        .map(([step, result]) => `${step}: ${result}`)
        .join('\n');

    console.log("   🤔 Progress analyze ho raha hai aur next actions decide ho rahe hain...");

    const output = await replanner.invoke({
        input: state.input,
        plan: state.plan.join('\n'),
        pastSteps: formattedPastSteps,
    });
    
    const toolCall = output[0];  // First tool call (sirf ek hi hona chahiye)
    console.log(`   📊 Decision: ${toolCall.type}`);

    if (toolCall.type == 'response') {
        console.log(`   ✅ Task complete! Final answer ready.`);
        return { response: toolCall.args?.response };
    }

    console.log(`   📝 Plan updated: ${toolCall.args?.steps.length} steps remaining:`);
    toolCall.args?.steps.forEach((step: string, i: number) => 
        console.log(`      ${i+1}. ${step}`)
    );

    return { plan: toolCall.args?.steps };
}

// ======================================================================
// SECTION 7: CONDITIONAL EDGE - The Completion Detector (Hinglish Mein)
// ======================================================================

/**
 * 🚦 SHOULD END - Decision Function
 * 
 * Simple but critical:
 * Agar response exist karta hai → ho gaya
 * Agar response nahi hai → kaam karte raho
 * 
 * YEH KYON KAAM KARTA HAI?
 * ──────────────────────────────────────────────────────────────────
 * - response sirf replanner set karta hai via responseTool
 * - replanner responseTool tab use karta hai jab:
 *   a) Saare steps complete ho gaye, YA
 *   b) Direct answer de sakta hai bina steps ke
 * - Ek baar set ho gaya, kabhi clear nahi hota
 * - Perfect binary signal
 */

function shouldEnd(state: typeof PlanExecuteState.State) {
    const hasResponse = !!state.response;
    console.log(`\n   🔍 Checking completion: ${hasResponse ? '✅ Done' : '🔄 More work needed'}`);
    return hasResponse ? 'true' : 'false';
}

// ======================================================================
// SECTION 8: GRAPH CONSTRUCTION - The Plan and Execute Orchestrator
// ======================================================================

/**
 * ██████╗  █████╗  █████╗ ██████╗ ██╗  ██╗
 * ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║
 * ██████╔╝███████║███████║██████╔╝███████║
 * ██╔══██╗██╔══██║██╔══██║██╔═══╝ ██╔══██║
 * ██║  ██║██║  ██║██║  ██║██║     ██║  ██║
 * ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝
 * 
 * COMPLETE PLAN AND EXECUTE LOOP VISUALIZATION (Hinglish):
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                         LEGEND                                    │
 * │ ┌─────┐ Node        │ ──→ Normal Edge  │ ══→ Conditional Edge  │
 * │ └─────┘              │                                          │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 *                              START
 *                                │
 *                                ▼
 *                        ┌───────────────┐
 *                        │   planner     │ ← Initial plan banata hai
 *                        │  (Strategist) │
 *                        └───────┬───────┘
 *                                │
 *                                ▼
 *                        ┌───────────────┐
 *                        │    agent      │ ← Ek step execute karta hai
 *                        │   (Worker)    │   tools ke saath
 *                        └───────┬───────┘
 *                                │
 *                                ▼
 *                        ┌───────────────┐
 *                        │   replan      │ ← Progress review karta hai
 *                        │  (Manager)    │   plan adjust karta hai
 *                        └───────┬───────┘
 *                                │
 *                    ════════════╧═══════════╗
 *                   ║              ║         ║
 *              [shouldEnd]     [ho gaya]  [nahi hua]
 *                   ║              ║         ║
 *                   ║              ▼         ║
 *                   ║             END        ║
 *                   ║                         ║
 *                   ╚═════════════════════════╝
 *                         (wapas agent ke paas)
 * 
 * YEH ORDER KYON?
 * ──────────────────────────────────────────────────────────────────
 * 
 * planner → agent → replan → (agent ya end)
 * 
 * Ye cycle create karta hai:
 * 1. Plan banta hai
 * 2. Ek step execute hota hai
 * 3. Progress review hoti hai
 * 4. Ya to continue karo, ya end
 * 
 * KEY FEATURES:
 * - Max 25 recursion limit (safety)
 * - Dynamic plan adjustment
 * - Tool-based execution
 * - Clear completion signal
 */

const workflow = new StateGraph(PlanExecuteState)
    .addNode('planner', planStep)
    .addNode('agent', executeStep)
    .addNode('replan', replanStep)
    .addEdge(START, 'planner')
    .addEdge('planner', 'agent')
    .addEdge('agent', 'replan')
    .addConditionalEdges('replan', shouldEnd, {
        true: END,
        false: 'agent',
    });

// ======================================================================
// SECTION 9: COMPLETE EXECUTION EXAMPLE WITH REAL DATA (Hinglish)
// ======================================================================

/**
 * 🎬 COMPLETE RUNTHROUGH WITH REAL DATA
 * 
 * Question: "Indian cricket team ke T20I captain ka hometown kya hai?"
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 1 - PLANNING
 * ──────────────────────────────────────────────────────────────────
 * 
 * [planner]
 * ├─ Input: objective string
 * ├─ Plan banaya:
 * │  1. Current T20I captain kaun hai yeh dhundo
 * │  2. Us captain ka hometown search karo
 * │  3. Information current hai ya nahi check karo
 * │  4. Final answer banao
 * └─ State: plan = [steps...], pastSteps = [], response = ""
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 1 - EXECUTE STEP 1
 * ──────────────────────────────────────────────────────────────────
 * 
 * [agent]
 * ├─ Task: "Current T20I captain kaun hai yeh dhundo"
 * ├─ Agent ne socha: Search karna padega
 * ├─ Tavily search: "current captain Indian T20I team 2025"
 * ├─ Results:
 * │  • "Suryakumar Yadav named India's T20I captain in 2024"
 * │  • "Hardik Pandya steps down, Suryakumar Yadav takes over"
 * │  • "BCCI announces Suryakumar Yadav as new T20I captain"
 * ├─ Answer banaya: "Suryakumar Yadav current T20I captain hain"
 * └─ State: 
 *    plan = [steps 2,3,4],
 *    pastSteps = [["Captain dhundo...", "Suryakumar Yadav captain hain"]]
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 1 - REPLAN
 * ──────────────────────────────────────────────────────────────────
 * 
 * [replan]
 * ├─ Input: Captain mil gaya = Suryakumar Yadav
 * ├─ Remaining steps review kiye
 * ├─ Plan refine kiya specific name ke saath:
 * │  1. Suryakumar Yadav ka hometown search karo
 * │  2. Information current hai ya nahi verify karo
 * │  3. Final answer banao with hometown information
 * └─ State: plan = [refined steps]
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 2 - EXECUTE STEP 2
 * ──────────────────────────────────────────────────────────────────
 * 
 * [agent]
 * ├─ Task: "Suryakumar Yadav ka hometown search karo"
 * ├─ Tavily search: "Suryakumar Yadav birthplace hometown"
 * ├─ Results:
 * │  • "Suryakumar Yadav born in Mumbai, Maharashtra"
 * │  • "Cricketer Suryakumar Yadav hails from Mumbai"
 * │  • "Mumbai-born Suryakumar Yadav..."
 * ├─ Answer banaya: "Suryakumar Yadav ka hometown Mumbai, Maharashtra hai"
 * └─ State:
 *    plan = [steps 2,3],
 *    pastSteps = [step1 result, step2 result]
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 2 - REPLAN
 * ──────────────────────────────────────────────────────────────────
 * 
 * [replan]
 * ├─ Input: Captain aur hometown dono mil gaye
 * ├─ Review kiya: Verification aur compilation baaki hai
 * ├─ Plan refine kiya:
 * │  1. Information currency verify karo
 * │  2. Final answer banao
 * └─ State: plan = [verification, compilation]
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 3 - EXECUTE STEP 3
 * ──────────────────────────────────────────────────────────────────
 * 
 * [agent]
 * ├─ Task: "Information currency verify karo"
 * ├─ Tavily search: "Suryakumar Yadav current captain 2025"
 * ├─ Results confirm: Still captain
 * └─ Result: "Confirmed: Suryakumar Yadav still captain hain as of 2025"
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 3 - REPLAN (FINAL)
 * ──────────────────────────────────────────────────────────────────
 * 
 * [replan]
 * ├─ Input: Saari information gather ho gayi
 * ├─ Decision: Ab answer de sakte hain
 * ├─ responseTool use kiya:
 * │  "Suryakumar Yadav, jo ki Indian T20I team ke current captain hain, unka hometown Mumbai, Maharashtra hai. Unhone 2024 mein captaincy sambhali aur abhi tak team ko lead kar rahe hain."
 * └─ State: response = final answer
 * 
 * ──────────────────────────────────────────────────────────────────
 * END - User ko answer mila
 */

// ======================================================================
// SECTION 10: MAIN EXECUTION
// ======================================================================

/**
 * ███╗   ███╗ █████╗ ██╗███╗   ██╗
 * ████╗ ████║██╔══██╗██║████╗  ██║
 * ██╔████╔██║███████║██║██╔██╗ ██║
 * ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
 * ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
 * ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
 * 
 * EXECUTION ENTRY POINT
 */

async function main() {
    console.log("\n" + "=".repeat(60));
    console.log("📋 PLAN AND EXECUTE PATTERN DEMO (HINGLISH VERSION)");
    console.log("=".repeat(60));
    console.log("\n📋 YEH KAISE KAAM KARTA HAI:");
    console.log("   • PLANNER: Complex question ko chhote steps mein todta hai");
    console.log("   • AGENT: Ek-ek step execute karta hai search ke saath");
    console.log("   • REPLAN: Progress check karta hai aur plan adjust karta hai");
    console.log("   • Loop chalta hai jab tak complete na ho (max 25 iterations)\n");

    const app = workflow.compile();
    const config = { recursionLimit: 25 };  // Safety limit

    const inputs = {
        input: `Indian cricket team ke T20I captain ka hometown kya hai?`,
    };

    console.log("🔍 Question:", inputs.input);
    console.log("\n" + "=".repeat(60));
    console.log("📊 EXECUTION TRACE");
    console.log("=".repeat(60) + "\n");

    let stepCount = 0;
    for await (const event of await app.stream(inputs, config)) {
        stepCount++;
        console.log(`\n📦 [Step ${stepCount}] Event:`, Object.keys(event)[0]);
        console.log(JSON.stringify(event, null, 2));
    }

    console.log("\n" + "=".repeat(60));
    console.log(`✅ COMPLETE after ${stepCount} steps`);
    console.log("=".repeat(60));
}

// ======================================================================
// SECTION 11: ERROR HANDLING AND STARTUP
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
console.log("\n🚀 Plan and Execute Pattern start ho raha hai...");
console.log("⏳ Components initialize ho rahe hain...\n");

main().catch((error) => {
    console.error("\n💥 Fatal error in main:", error);
    process.exit(1);
});

// ======================================================================
// APPENDIX: COMPLETE PLAN AND EXECUTE ARCHITECTURE SUMMARY (Hinglish)
// ======================================================================

/**
 * 📌 PLAN AND EXECUTE PATTERN SUMMARY
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     CORE COMPONENTS                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                  │
 * │ 1. PLANNER (Strategist - Plan Banaane Wala)                    │
 * │    • Complex questions ko steps mein todta hai                  │
 * │    • Logical progression ensure karta hai                       │
 * │    • Extra steps nahi daalta                                     │
 * │    • Har step self-contained hota hai                           │
 * │                                                                  │
 * │ 2. AGENT (Worker - Kaam Karne Wala)                            │
 * │    • Ek step at a time execute karta hai                        │
 * │    • Tools use karta hai (Tavily search)                        │
 * │    • Results return karta hai us step ke liye                   │
 * │    • Long-term planning nahi karta                              │
 * │                                                                  │
 * │ 3. REPLANNER (Manager - Review Karne Wala)                      │
 * │    • Progress review karta hai                                  │
 * │    • Plan adjust karta hai results ke hisaab se                 │
 * │    • Decide karta hai kab stop karna hai                        │
 * │    • Final answer synthesize karta hai                          │
 * │                                                                  │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 📊 STATE MANAGEMENT
 * ======================================================================
 * 
 * Field      | Purpose                          | Update Pattern
 * -----------|----------------------------------|------------------
 * input      | Original question (kabhi nahi badalta) | Kabhi nahi badalta
 * plan       | Bache hue steps                   | Replace ya shift
 * pastSteps  | Completed work ka history         | Hamesha append
 * response   | Final answer (jab complete ho)    | Ek baar set
 * 
 * 🔄 EXECUTION LOOP
 * ======================================================================
 * 
 * Round | Plan                        | Action                | Result
 * ------|------------------------------|-----------------------|--------
 * 1     | 4 steps initial              | Execute step 1       | Captain mil gaya
 * 1     | -                            | Replan               | Steps refine kiye
 * 2     | 3 steps refined              | Execute step 2       | Hometown mil gaya
 * 2     | -                            | Replan               | Aur refine
 * 3     | 2 steps remaining            | Execute step 3       | Verification
 * 3     | -                            | Replan               | Final answer
 * 
 * 🎯 KEY INSIGHTS (Hinglish Mein)
 * ======================================================================
 * 
 * 1. COMPLEXITY DECOMPOSITION
 *    • Mushkil question → Simple steps
 *    • Har step manageable
 *    • Progress dikhta hai
 * 
 * 2. DYNAMIC PLANNING
 *    • Plans adjust hote hain beech mein
 *    • Naya information approach badalta hai
 *    • Rigid nahi, initial plan se chipka nahi rehta
 * 
 * 3. TOOL INTEGRATION
 *    • Agent tools use karta hai naturally
 *    • Jab zaroorat ho, search karta hai
 *    • Results inform karte hain next steps
 * 
 * 4. CLEAR COMPLETION
 *    • Response field flag ki tarah
 *    • Confusion nahi ki hua ya nahi
 *    • Natural language mein answer
 * 
 * 🚀 PRODUCTION ENHANCEMENTS (Aur Kya Kar Sakte Hain)
 * ======================================================================
 * 
 * 1. Multiple tool types (database, API, calculator)
 * 2. Parallel step execution jahan possible ho
 * 3. Plan caching for common questions
 * 4. Step timeout aur retry logic
 * 5. Progress persistence for long-running plans
 * 6. User feedback incorporation
 * 7. Plan optimization based on past performance
 * 8. Cost tracking per step
 * 
 * ======================================================================
 * 🎉 IMPLEMENTATION COMPLETE
 * ======================================================================
 * 
 * This Plan and Execute Pattern demonstrate karta hai:
 * 
 * ✅ COMPLEX QUESTION DECOMPOSITION
 *   • Breaking down into manageable steps
 *   • Logical progression
 *   • Clear dependencies
 * 
 * ✅ DYNAMIC PLAN ADJUSTMENT
 *   • Replanning based on results
 *   • No rigid adherence to initial plan
 *   • Adaptive execution
 * 
 * ✅ TOOL-ENABLED EXECUTION
 *   • Tavily search integration
 *   • Agent chooses when to search
 *   • Results inform next steps
 * 
 * ✅ ROBUST STATE MANAGEMENT
 *   • Clear separation of concerns
 *   • Append-only history
 *   • Replaceable plan
 *   • Binary completion signal
 * 
 * ✅ PRODUCTION READINESS
 *   • Recursion limit safety
 *   • Error handling
 *   • Clear data flow
 *   • Extensive documentation
 * 
 * SYSTEM MULTI-STEP RESEARCH QUESTIONS HANDLE KARTA HAI:
 * 1. Planning the approach
 * 2. Executing one step at a time
 * 3. Reviewing and adjusting
 * 4. Continuing until complete
 * 
 * ======================================================================
 */