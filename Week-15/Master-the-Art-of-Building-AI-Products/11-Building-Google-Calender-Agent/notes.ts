/**
 * ======================================================================
 * GOOGLE CALENDAR PERSONAL ASSISTANT - COMPLETE IMPLEMENTATION (HINGLISH VERSION)
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
 *  │ assistant │◄─────────────────────────┐
 *  └─────┬─────┘                          │
 *        │                                │
 *        ▼  shouldContinue()              │
 *   ┌────┴──────────┐                     │
 *   │               │                     │
 *   ▼               ▼                     │
 * [tools]        [__end__]                │
 *   │                                     │
 *   ├──► createEventTool → Google Calendar (insert)
 *   ├──► getEventsTool   → Google Calendar (list)
 *   │                                     │
 *   └─────────────────────────────────────┘
 *       (tool result messages mein append hota hai,
 *        phir wapas assistant ke paas jata hai)
 *
 * ======================================================================
 * YEH SAB MILKAR KAISE KAAM KARTA HAI?
 * ======================================================================
 *
 *  User: "Aaj meri koi meeting hai?"
 *
 *  [1] assistant node saare messages padhta hai
 *      → LLM system prompt (current date/time ke saath) + user message dekhta hai
 *      → LLM decide karta hai: get-events tool call karna hai
 *      → AIMessage return karta hai tool_calls array ke saath
 *
 *  [2] shouldContinue tool_calls detect karta hai → 'tools' node pe bhejta hai
 *
 *  [3] tools node (ToolNode) getEventsTool execute karta hai
 *      → Google Calendar API call karta hai
 *      → Aaj ki events ki list JSON string mein return karta hai
 *      → ToolMessage state.messages mein append karta hai
 *
 *  [4] Graph wapas assistant node pe loop karta hai
 *      → LLM tool result padhta hai
 *      → Human-friendly reply banata hai
 *      → AIMessage return karta hai plain text (tool_calls ke bina)
 *
 *  [5] shouldContinue detect karta hai tool_calls nahi hain → __end__ pe bhejta hai
 *
 *  [6] Final AIMessage terminal par print hota hai
 *
 * ======================================================================
 * IMPLEMENTATION PLAN
 * ======================================================================
 *
 *  Step 1 → LLM initialize karo aur tools bind karo
 *  Step 2 → Assistant node define karo (LLM call karta hai)
 *  Step 3 → Tool node define karo (tool calls execute karta hai)
 *  Step 4 → Conditional routing define karo (shouldContinue)
 *  Step 5 → Graph banao (nodes + edges)
 *  Step 6 → Memory layer attach karo (MemorySaver)
 *  Step 7 → Graph compile karo
 *  Step 8 → Terminal UI banao (readline loop)
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. MessagesAnnotation                                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: LangGraph ka prebuilt state definition jo messages[]   │
 * │          array manage karta hai. Har node ise read aur append   │
 * │          karta hai.                                             │
 * │                                                                 │
 * │ Plain array kyun nahi?                                          │
 * │   MessagesAnnotation ek reducer use karta hai jo naye messages  │
 * │   ko existing list mein MERGE karta hai, replace nahi karta.   │
 * │   Yahi multi-turn conversation memory enable karta hai.         │
 * │                                                                 │
 * │ Array mein message types:                                       │
 * │   HumanMessage  → user input                                    │
 * │   SystemMessage → instructions (role: 'system')                 │
 * │   AIMessage     → LLM response (tool_calls bhi ho sakte hain)  │
 * │   ToolMessage   → tool ka result                                │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const graph = new StateGraph(MessagesAnnotation)              │
 * │   // state.messages automatically har node mein available hai   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. bindTools()                                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: LLM ke saath tool schemas register karta hai taake     │
 * │          LLM ko pata ho ki KAUNSE tools exist karte hain aur    │
 * │          KAB use karne hain.                                    │
 * │                                                                 │
 * │ bindTools() ke bina: LLM sirf text reply kar sakta hai.         │
 * │ bindTools() ke saath: LLM tool_calls bhi return kar sakta hai   │
 * │                        AIMessage mein, jo ToolNode execute karega│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const model = new ChatGroq({                                  │
 * │     model: 'llama-3.3-70b-versatile',                           │
 * │   }).bindTools(tools);   // ← tool schemas attach karo          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. ToolNode                                                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek prebuilt node jo last AIMessage se tool_calls padhta│
 * │          hai, matching tool ko run karta hai, aur result ko     │
 * │          ToolMessage ki form mein state.messages mein append    │
 * │          karta hai.                                             │
 * │                                                                 │
 * │ Aap kabhi tool functions directly call nahi karte — ToolNode    │
 * │ khud handle karta hai.                                          │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   import { ToolNode } from '@langchain/langgraph/prebuilt';     │
 * │   const toolNode = new ToolNode(tools);                         │
 * │   graph.addNode('tools', toolNode);                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. shouldContinue (conditional edge)                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Har assistant node run ke baad call hone wala routing  │
 * │          function. Decide karta hai ki tools call karein ya     │
 * │          graph end karein.                                      │
 * │                                                                 │
 * │ Logic:                                                          │
 * │   last message mein tool_calls hain → 'tools' return karo       │
 * │   last message plain text hai  → '__end__' return karo          │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   function shouldContinue(state) {                              │
 * │     const last = state.messages.at(-1) as AIMessage;            │
 * │     return last.tool_calls?.length ? 'tools' : '__end__';       │
 * │   }                                                             │
 * │   graph.addConditionalEdges('assistant', shouldContinue, {      │
 * │     tools:   'tools',                                           │
 * │     __end__: END,                                               │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. MemorySaver + thread_id                                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: MemorySaver graph state ko .invoke() calls ke beech    │
 * │          persist karta hai taake LLM conversation ke purane     │
 * │          turns yaad rakh sake.                                  │
 * │                                                                 │
 * │ thread_id: Ek conversation ke saare turns ek hi checkpoint ke   │
 * │            under group karta hai. Naya session start karne ke   │
 * │            liye thread_id change karo.                          │
 * │                                                                 │
 * │ MemorySaver ke bina: har invoke() fresh start se shuru hota hai │
 * │ MemorySaver ke saath: full message history restore hota hai     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const app = graph.compile({                                   │
 * │     checkpointer: new MemorySaver(),                            │
 * │   });                                                           │
 * │   const config = { configurable: { thread_id: 'user-abc' } };   │
 * │   await app.invoke(input, config);                              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. System prompt with dynamic datetime                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: LLM ke paas built-in clock nahi hota. Current datetime │
 * │          aur timezone system message mein inject karna zaroori  │
 * │          hai taake "aaj", "kal", "aglae mangalvar" sahi se      │
 * │          resolve ho sake.                                       │
 * │                                                                 │
 * │ toLocaleString('sv-SE'): Swedish locale ye produce karta hai    │
 * │   "2026-03-03 14:00:00" → space ko T se replace karo →         │
 * │   "2026-03-03T14:00:00"  (ISO 8601 format jo LLM expect karta hai)│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const now = new Date()                                        │
 * │     .toLocaleString('sv-SE')                                    │
 * │     .replace(' ', 'T');                                         │
 * │   const tz = Intl.DateTimeFormat()                              │
 * │     .resolvedOptions().timeZone;                                │
 * │                                                                 │
 * │   { role: 'system', content: `Current datetime: ${now}         │
 * │                                Current timezone: ${tz}` }       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * User: "Kal Sujoy ke saath meeting banao"
 * 
 * [assistant] LLM call:
 *   System: Current datetime: 2026-03-03T14:00:00, Timezone: Asia/Kolkata
 *   Human: "Kal Sujoy ke saath meeting banao"
 *   
 *   LLM sochta hai: 
 *     - "kal" = 2026-03-04
 *     - duration specify nahi kiya → default 1 hour
 *     - attendee name Sujoy, email nahi diya → email optional hai
 *   
 *   LLM returns AIMessage with tool_calls:
 *   {
 *     tool_calls: [{
 *       name: 'create-event',
 *       args: {
 *         summary: "Meeting with Sujoy",
 *         start: { dateTime: "2026-03-04T14:00:00", timeZone: "Asia/Kolkata" },
 *         end: { dateTime: "2026-03-04T15:00:00", timeZone: "Asia/Kolkata" },
 *         attendees: [{ email: "sujoy@example.com" }]  // displayName optional
 *       }
 *     }]
 *   }
 *
 * [shouldContinue] tool_calls detect → 'tools' node pe bheja
 *
 * [tools] ToolNode createEventTool execute karta hai:
 *   → Google Calendar API call
 *   → conferenceDataVersion: 1 (Meet link create)
 *   → sendUpdates: 'all' (email invites)
 *   
 *   Tool returns: "The meeting has been created. Meet link: https://meet.google.com/abc-defg-hij"
 *
 * [assistant] LLM tool result padhta hai aur final reply banata hai:
 *   "Meeting create ho gaya kal 2pm ke liye Sujoy ke saath. 
 *    Meet link: https://meet.google.com/abc-defg-hij"
 *
 * [shouldContinue] no tool_calls → __end__
 *
 * [END] User ko final reply dikhta hai
 *
 * ======================================================================
 */

// ======================================================================
// SECTION 1: IMPORTS
// ======================================================================
import readline from 'node:readline/promises';
import { ChatGroq } from '@langchain/groq';
import { createEventTool, getEventsTool } from './tools';
import { END, MemorySaver, MessagesAnnotation, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import type { AIMessage } from '@langchain/core/messages';

// ======================================================================
// SECTION 2: MODEL + TOOLS  (Step 1)
// ======================================================================
//
// bindTools() tool schemas LLM mein inject karta hai taake usse pata ho
// ki create-event ya get-events call kar sakta hai aur har tool ke liye
// kaunse arguments chahiye. Iske bina LLM sirf plain text reply kar sakta hai.

const tools = [createEventTool, getEventsTool];

const model = new ChatGroq({
    apiKey:      process.env.GROQ_API_KEY,
    model:       'llama-3.3-70b-versatile', // ✅ Valid Groq model with tool-calling support
    temperature: 0,                          // deterministic — tool arg generation ke liye important
}).bindTools(tools);

// ======================================================================
// SECTION 3: ASSISTANT NODE  (Step 2)
// ======================================================================
//
// Poori message history LLM ko bhejta hai.
// LLM ya to:
//   a) Plain text AIMessage return karega → shouldContinue → __end__
//   b) tool_calls ke saath AIMessage return karega → shouldContinue → 'tools'

async function callModel(state: typeof MessagesAnnotation.State) {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
}

// ======================================================================
// SECTION 4: TOOL NODE  (Step 3)
// ======================================================================
//
// ToolNode last AIMessage se tool_calls padhta hai, matching tool function
// execute karta hai, aur result ko ToolMessage ki form mein state.messages
// mein append karta hai. Phir execution assistant node pe loop hota hai.

const toolNode = new ToolNode(tools);

// ======================================================================
// SECTION 5: CONDITIONAL ROUTING  (Step 4)
// ======================================================================
//
// Har assistant node run ke baad call hota hai.
// 'tools' return karta hai agar LLM ne tool calls ki hain, warna '__end__'.

function shouldContinue(state: typeof MessagesAnnotation.State) {
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    return lastMessage.tool_calls?.length ? 'tools' : '__end__';
}

// ======================================================================
// SECTION 6: BUILD GRAPH  (Step 5)
// ======================================================================
//
// Node wiring:
//   __start__ → assistant → (shouldContinue) → tools → assistant → ...
//                                           ↘ __end__

const graph = new StateGraph(MessagesAnnotation)
    .addNode('assistant', callModel)
    .addNode('tools',     toolNode)
    .addEdge('__start__', 'assistant')
    .addEdge('tools',     'assistant')           // tool run ke baad wapas assistant pe loop
    .addConditionalEdges('assistant', shouldContinue, {
        __end__: END,
        tools:   'tools',
    });

// ======================================================================
// SECTION 7: COMPILE WITH MEMORY  (Steps 6 & 7)
// ======================================================================
//
// MemorySaver state ko .invoke() calls ke beech persist karta hai taake
// LLM poori conversation history yaad rakh sake.

const app = graph.compile({ checkpointer: new MemorySaver() });

// ======================================================================
// SECTION 8: TERMINAL INTERFACE  (Step 8)
// ======================================================================
async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    // thread_id is conversation ke saare turns ek checkpoint mein group karta hai
    // Naya session start karne ke liye thread_id change karo
    const config = { configurable: { thread_id: '1' } };

    console.log('\n' + '='.repeat(60));
    console.log('📅 GOOGLE CALENDAR ASSISTANT');
    console.log('='.repeat(60));
    console.log('\nCapabilities (Yeh sab kar sakta hai):');
    console.log('  📆 Calendar events banao Google Meet links ke saath');
    console.log('  🔍 Aane wali events dhundo aur summarize karo');
    console.log('  🧠 Context yaad rakhta hai baat-cheet ke across');
    console.log('\n/bye type karo exit ke liye.\n');

    while (true) {
        const userInput = await rl.question('👤 Aap: ');

        if (userInput.trim() === '/bye') {
            console.log('👋 Alvida!');
            break;
        }

        if (!userInput.trim()) continue;

        try {
            // Current datetime inject karo taake LLM
            // "aaj", "kal", "aglae mangalvar" sahi se resolve kar sake
            const currentDateTime = new Date()
                .toLocaleString('sv-SE')   // → "2026-03-03 14:00:00"
                .replace(' ', 'T');         // → "2026-03-03T14:00:00"

            const timeZoneString = Intl.DateTimeFormat()
                .resolvedOptions().timeZone;

            const result = await app.invoke(
                {
                    messages: [
                        {
                            role: 'system',
                            content: `Tum ek smart personal assistant ho jo Google Calendar manage karta hai.
Current datetime: ${currentDateTime}
Current timezone: ${timeZoneString}

Events create karte waqt:
- Agar user duration specify na kare, to default 1 hour lo.
- Agar user kahe "fill details yourself", to reasonable summary aur time infer karo.
- attendee displayName optional hai — sirf tab include karo jab user name de.
- Hamesha confirm karo ki tumne kya create kiya: event title, time, aur Meet link ke saath.

Events fetch karte waqt:
- Agar user specific na ho to broad search query use karo.
- Events clearly summarize karo: title, time, attendees, aur Meet link agar available ho.`,
                        },
                        {
                            role: 'user',
                            content: userInput,
                        },
                    ],
                },
                config,
            );

            const lastMessage = result.messages[result.messages.length - 1];
            console.log('\n🤖 Assistant:', lastMessage.content, '\n');

        } catch (err) {
            console.error('Error invoking graph:', err);
        }
    }

    rl.close();
}

main();






/**
 * ======================================================================
 * GOOGLE OAUTH2 AUTHORIZATION SERVER - HINGLISH VERSION
 * ======================================================================
 *
 * YEH FILE KYA HAI?
 * ──────────────────
 * Ek one-time setup server. Aap ise EK BAAR chalao Google tokens lene ke liye,
 * .env mein paste karo, phir kabhi zaroorat nahi (jab tak tokens expire na hon).
 *
 * ARCHITECTURE OVERVIEW
 * ─────────────────────
 *
 *   Aap (Browser)            Yeh Server             Google
 *   ─────────────            ────────────             ──────
 *
 *   GET /auth          ──►  Auth URL generate  ──►  Google Login Page
 *                                                          │
 *                                                  User access approve karta hai
 *                                                          │
 *   (redirect)         ◄──  GET /callback?code=XXXX  ◄────┘
 *                                │
 *                          Code exchange
 *                          tokens ke liye
 *                                │
 *                          Console print  ──►  Aap .env mein copy karo
 *
 * ======================================================================
 * YEH KYON ZAROORI HAI?
 * ======================================================================
 *
 * Aapke calendar tools ko Google APIs call karne ke liye aapki taraf se
 * authentication chahiye. Google OAuth2 use karta hai ye ensure karne ke liye
 * ki aapne explicitly permission di hai.
 *
 *   Is step ke bina:  No tokens → API calls fail with 401
 *   Is step ke baad:  .env mein tokens → saare calendar tools kaam karein
 *
 * Token types:
 * ┌────────────────┬──────────────────────────────────────────────┐
 * │ access_token   │ Short-lived (~1 hour). API calls ke liye.    │
 * │ refresh_token  │ Long-lived. access_token ko silently renew   │
 * │                │ karta hai jab expire ho.                     │
 * └────────────────┴──────────────────────────────────────────────┘
 *
 * ======================================================================
 * YEH SERVER KAISE USE KAREIN (Step-by-Step)
 * ======================================================================
 *
 *  1. .env mein set karo:
 *       GOOGLE_CLIENT_ID=<Google Cloud Console se>
 *       GOOGLE_CLIENT_SECRET=<Google Cloud Console se>
 *       GOOGLE_REDIRECT_URL=http://localhost:3600/callback
 *
 *  2. Chalao:   bun run auth.ts
 *
 *  3. Open karo:  http://localhost:3600/auth
 *
 *  4. Apne Google account se login karo aur calendar access approve karo
 *
 *  5. Google redirect karega /callback par — tokens console print honge
 *
 *  6. Tokens .env mein copy karo:
 *       GOOGLE_ACCESS_TOKEN=<printed value>
 *       GOOGLE_REFRESH_TOKEN=<printed value>
 *
 *  7. Ho gaya — aapke calendar tools ab authenticate ho gaye ✅
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. OAuth2 (Open Authorization 2.0)                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek industry-standard protocol jo aapke app ko user ki  │
 * │          taraf se kaam karne deta hai bina uska password store │
 * │          kiye.                                                  │
 * │                                                                 │
 * │ Flow 3 steps mein:                                              │
 * │   1. Aapka app user ko Google login pe bhejta hai (CLIENT_ID ke saath)
 * │   2. User approve karta hai → Google ek one-time CODE bhejta hai
 * │   3. Aapka app CODE ko ACCESS + REFRESH tokens mein exchange karta hai
 * │                                                                 │
 * │ CLIENT_SECRET kyun chahiye:                                    │
 * │   Code exchange step mein aapke secret ki zaroorat hoti hai ye │
 * │   prove karne ke liye ki request really aapke registered app se│
 * │   aa rahi hai — kisi attacker se nahi jisne code intercept kiya│
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. generateAuthUrl()                                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Google login URL banata hai jisme aapke app ki         │
 * │          permissions query parameters mein embedded hoti hain.  │
 * │                                                                 │
 * │ Options:                                                        │
 * │   scope       → kaunsi Google APIs access karni hain           │
 * │   access_type → 'offline' = response mein refresh_token bhi     │
 * │                 'online'  = sirf access_token (no refresh)      │
 * │   prompt      → 'consent' har baar approval screen force karta  │
 * │                 hai (refresh_token reliably lene ke liye)      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const url = oauth2Client.generateAuthUrl({                    │
 * │     access_type: 'offline',   // ← refresh_token ke liye        │
 * │     prompt:      'consent',   // ← approval screen force        │
 * │     scope: ['https://www.googleapis.com/auth/calendar'],        │
 * │   });                                                           │
 * │   res.redirect(url);                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. getToken(code)                                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: One-time authorization code (Google ke redirect se) ko │
 * │          actual usable tokens mein exchange karta hai.          │
 * │                                                                 │
 * │ Returns:                                                        │
 * │   tokens.access_token   → abhi API calls ke liye use karo       │
 * │   tokens.refresh_token  → ye store karo — naya access_token     │
 * │                            lene ke liye                         │
 * │   tokens.expiry_date    → Unix ms timestamp jab access expire   │
 * │                            hoga                                 │
 * │                                                                 │
 * │ Important: refresh_token sirf EK BAAR milta hai first consent   │
 * │            par. Agar kho diya to app access revoke karo aur     │
 * │            auth flow dobara chalao.                             │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const code = req.query.code as string;                        │
 * │   const { tokens } = await oauth2Client.getToken(code);         │
 * │   console.log(tokens.access_token);                             │
 * │   console.log(tokens.refresh_token);                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. scope                                                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Declare karta hai ki aapka app exactly kaunsi Google   │
 * │          services aur actions access kar raha hai.              │
 * │                                                                 │
 * │ Principle of least privilege: sirf utna request karo jitna      │
 * │ actually chahiye.                                               │
 * │                                                                 │
 * │ Common Calendar scopes:                                         │
 * │   Full access:   https://www.googleapis.com/auth/calendar       │
 * │   Read only:     https://www.googleapis.com/auth/calendar.readonly
 * │   Events only:   https://www.googleapis.com/auth/calendar.events│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const scopes = [                                              │
 * │     'https://www.googleapis.com/auth/calendar',                 │
 * │   ];                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. REDIRECT_URL                                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Woh URL jahan Google user ko bhejta hai access approve │
 * │          karne ke BAAD. Authorization code query param mein     │
 * │          aata hai.                                              │
 * │                                                                 │
 * │ Google Cloud Console mein jo register kiya hai usse EXACTLY     │
 * │ match hona chahiye. Ek trailing slash ka difference bhi error   │
 * │ dega.                                                           │
 * │                                                                 │
 * │ Local dev ke liye:  http://localhost:3600/callback              │
 * │ Production ke liye: https://yourdomain.com/callback             │
 * │                                                                 │
 * │ Google Cloud Console → APIs & Services → Credentials            │
 * │   → OAuth 2.0 Client → Authorized redirect URIs                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * Step 1: User http://localhost:3600/auth opens
 * 
 * Server redirects to Google:
 * https://accounts.google.com/o/oauth2/v2/auth?
 *   client_id=123456.apps.googleusercontent.com&
 *   redirect_uri=http://localhost:3600/callback&
 *   response_type=code&
 *   scope=https://www.googleapis.com/auth/calendar&
 *   access_type=offline&
 *   prompt=consent
 *
 * Step 2: User logs in and approves
 * 
 * Step 3: Google redirects to:
 * http://localhost:3600/callback?code=4/0AY0e-g7X...
 *
 * Step 4: Server exchanges code for tokens:
 * {
 *   access_token: "ya29.a0AfH6SMB...",
 *   refresh_token: "1//0gX...",
 *   expiry_date: 1741012345678
 * }
 *
 * Step 5: Console output:
 * ✅ Tokens received — copy these into your .env:
 * 
 * GOOGLE_ACCESS_TOKEN=ya29.a0AfH6SMB...
 * GOOGLE_REFRESH_TOKEN=1//0gX...
 * 
 * Step 6: User copies to .env — done!
 *
 * ======================================================================
 */

// ======================================================================
// SECTION 1: IMPORTS
// ======================================================================
import express from 'express';
import { google } from 'googleapis';

// ======================================================================
// SECTION 2: OAUTH2 CLIENT
// ======================================================================
//
// Google Cloud Console mein register kiya:
//   APIs & Services → Credentials → Create OAuth 2.0 Client ID
//
// REDIRECT_URL EXACTLY match hona chahiye jo wahan register kiya hai.

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
);

const app = express();

// ======================================================================
// SECTION 3: /auth ROUTE — Google Login pe redirect
// ======================================================================
//
// Browser mein http://localhost:3600/auth open karo flow start karne ke liye.
//
// access_type: 'offline' → Google response mein refresh_token include karega
// prompt: 'consent'      → Approval screen force karega taake refresh_token
//                          hamesha mile (sirf first login par nahi)

app.get('/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt:      'consent',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });

    console.log('Redirecting to Google OAuth URL:', url);
    res.redirect(url);
});

// ======================================================================
// SECTION 4: /callback ROUTE — Code ko tokens mein exchange karo
// ======================================================================
//
// Aap is route ko manually call nahi karte.
// Google automatically redirect karta hai yahan user approve karne ke baad:
//   http://localhost:3600/callback?code=XXXX
//
// Kya hota hai:
//   1. Query params se one-time code extract karo
//   2. Google ke saath exchange karo access + refresh tokens ke liye
//   3. Console par tokens print karo taake .env mein copy kar sako
//
// ⚠️  refresh_token sirf EK BAAR milta hai (first consent par).
//     Kho gaya to: Google Cloud Console → revoke app access → /auth dobara chalao

app.get('/callback', async (req, res) => {
    try {
        const code = req.query.code as string;

        if (!code) {
            res.status(400).send('Authorization code nahi mila.');
            return;
        }

        const { tokens } = await oauth2Client.getToken(code);

        // Tokens print karo taake .env mein paste kar sako
        console.log('\n✅ Tokens mil gaye — inhe .env mein copy karo:\n');
        console.log(`GOOGLE_ACCESS_TOKEN=${tokens.access_token}`);
        console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
        console.log(`\nExpiry date (Unix ms): ${tokens.expiry_date}`);
        console.log('\nFull token object:', tokens);

        res.send('Connected ✅ — Tokens console par print ho gaye. Aap ye tab close kar sakte ho.');
    } catch (err) {
        console.error('Token exchange error:', err);
        res.status(500).send('Token exchange failed.');
    }
});

// ======================================================================
// SECTION 5: START SERVER
// ======================================================================
app.listen(3600, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🔐 GOOGLE OAUTH2 SERVER');
    console.log('='.repeat(60));
    console.log('\nServer running on http://localhost:3600');
    console.log('\nSteps:');
    console.log('  1. Open http://localhost:3600/auth in your browser');
    console.log('  2. Login karo aur calendar access approve karo');
    console.log('  3. Print hue tokens ko .env file mein copy karo');
    console.log('  4. Ye server band karo — ab zaroorat nahi\n');
});






/**
 * ======================================================================
 * GOOGLE CALENDAR TOOLS - HINGLISH VERSION
 * ======================================================================
 *
 * YEH TOOLS KYA HAIN?
 * ─────────────────────
 * LangChain tools hain jo Google Calendar API ko wrap karte hain.
 * LLM kabhi Google directly call nahi karta — ye tools call karta hai,
 * jo phir Google call karte hain uski taraf se.
 *
 *  ┌──────────────────┬──────────────────────────────────────────┐
 *  │ Tool             │ Yeh kya karta hai                        │
 *  ├──────────────────┼──────────────────────────────────────────┤
 *  │ get-events       │ User ke primary calendar se events dhondhta hai │
 *  │                  │ query aur date range ke hisaab se        │
 *  ├──────────────────┼──────────────────────────────────────────┤
 *  │ create-event     │ Calendar event create karta hai Google    │
 *  │                  │ Meet link ke saath, attendees ko invites │
 *  │                  │ bhejta hai                                │
 *  └──────────────────┴──────────────────────────────────────────┘
 *
 * DATA FLOW
 * ─────────
 *   LLM tool_calls generate karta hai
 *       │
 *       ▼
 *   ToolNode tool_calls padhta hai, matching tool function call karta hai
 *       │
 *       ▼
 *   Tool function Google Calendar API call karta hai
 *       │
 *       ▼
 *   Tool string result return karta hai
 *       │
 *       ▼
 *   ToolMessage state.messages mein append hota hai
 *       │
 *       ▼
 *   LLM result padhta hai, final reply banata hai
 *
 * ======================================================================
 * GOOGLE OAUTH2 (Authentication Kaise Kaam Karta Hai)
 * ======================================================================
 *
 *  ┌──────────────────────────────────────────────────────────────┐
 *  │  Aapka App                       Google OAuth2                │
 *  │  ─────────                      ────────────                 │
 *  │                                                              │
 *  │  oauth2Client(CLIENT_ID,                                     │
 *  │   CLIENT_SECRET,         ──────► App identity validate       │
 *  │   REDIRECT_URL)                                              │
 *  │       │                                                      │
 *  │       ▼                                                      │
 *  │  setCredentials(         ──────► ACCESS_TOKEN use karta hai   │
 *  │   ACCESS_TOKEN,                  calls ke liye. Jab expire   │
 *  │   REFRESH_TOKEN)                 ho to REFRESH_TOKEN se      │
 *  │                                 naya le leta hai silently    │
 *  └──────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. tool() from @langchain/core/tools                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek plain async function ko LangChain tool mein wrap    │
 * │          karta hai jise LLM name se call kar sakta hai          │
 * │          tool_calls ke through.                                 │
 * │                                                                 │
 * │ Parts (Hisse):                                                  │
 * │   1st arg → async function (actual logic jo execute hoga)       │
 * │   2nd arg → metadata:                                           │
 * │     name        → identifier, LLM is name se call karega       │
 * │     description → LLM ko batata hai ki KAB ye tool use karna hai│
 * │     schema      → Zod schema: arguments validate karta hai +   │
 * │                    LLM ko guide karta hai                      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   export const meraTool = tool(                                 │
 * │     async (params) => {                                         │
 * │       // aapka logic yahan                                      │
 * │       return 'result as a string';  // ← string return karna hai│
 * │     },                                                          │
 * │     {                                                           │
 * │       name:        'mera-tool',                                 │
 * │       description: 'Jab user X karna chahe to call karo.',      │
 * │       schema: z.object({                                        │
 * │         param1: z.string().describe('yeh param kya hai'),       │
 * │       }),                                                       │
 * │     }                                                           │
 * │   );                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Zod schema — dual purpose (Do kaam)                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: LLM ko arguments define aur validate karta hai jab     │
 * │          tool call karta hai.                                   │
 * │                                                                 │
 * │ Dual purpose:                                                   │
 * │   Runtime:  Galat ya missing arguments validation error throw   │
 * │             karega API call se pehle hi                         │
 * │   LLM docs: .describe() text LLM ko bheja jata hai taake       │
 * │             usse pata ho ki har field mein kya dalna hai       │
 * │                                                                 │
 * │ Har field mein .describe() lagao — LLM unhe padhti hai.        │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const schema = z.object({                                     │
 * │     summary: z.string().describe('Event ka title'),             │
 * │     start: z.object({                                           │
 * │       dateTime: z.string().describe('ISO datetime string'),     │
 * │       timeZone: z.string().describe('IANA timezone e.g Asia/.. │
 * │     }),                                                         │
 * │     attendees: z.array(z.object({                               │
 * │       email:       z.string(),                                  │
 * │       displayName: z.string().optional(), // optional = LLM     │
 * │     })),                                  // omit kar sakta hai│
 * │   });                                                           │
 * │   type EventData = z.infer<typeof schema>; // TS type derive    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. oauth2Client + setCredentials()                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek authenticated Google API client banata hai.         │
 * │          Saari API calls automatically token ke saath sign       │
 * │          hoti hain. googleapis library silently refresh_token   │
 * │          use karti hai naya access_token lene ke liye jab       │
 * │          expire ho.                                             │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const oauth2Client = new google.auth.OAuth2(                  │
 * │     process.env.GOOGLE_CLIENT_ID,                               │
 * │     process.env.GOOGLE_CLIENT_SECRET,                           │
 * │     process.env.GOOGLE_REDIRECT_URL,                            │
 * │   );                                                            │
 * │   oauth2Client.setCredentials({                                 │
 * │     access_token:  process.env.GOOGLE_ACCESS_TOKEN,             │
 * │     refresh_token: process.env.GOOGLE_REFRESH_TOKEN,            │
 * │   });                                                           │
 * │   const calendar = google.calendar({ version: 'v3',            │
 * │                                       auth: oauth2Client });    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. conferenceData — Google Meet auto-creation                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Google Calendar ko batata hai ki automatically Meet    │
 * │          room create karo aur link naye event mein attach karo. │
 * │                                                                 │
 * │ Requirements:                                                   │
 * │   conferenceDataVersion: 1   → request mein set karna hai       │
 * │   requestId: randomUUID()    → har call ke liye unique;         │
 * │                                retry par duplicate Meet rooms   │
 * │                                banne se bachata hai             │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   calendar.events.insert({                                      │
 * │     conferenceDataVersion: 1,                                   │
 * │     requestBody: {                                              │
 * │       conferenceData: {                                         │
 * │         createRequest: {                                        │
 * │           requestId: crypto.randomUUID(),                       │
 * │           conferenceSolutionKey: { type: 'hangoutsMeet' },      │
 * │         },                                                      │
 * │       },                                                        │
 * │     },                                                          │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Tool return values — hamesha strings                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Tools STRING return karte hain. Ye value ToolMessage   │
 * │          ban jati hai state.messages mein jo LLM padhti hai.    │
 * │                                                                 │
 * │ Objects ke liye: JSON.stringify() karo return karne se pehle    │
 * │ Errors ke liye:  Descriptive string return karo — throw mat karo│
 * │                  Throw karne se ToolNode crash ho jayega.       │
 * │                  Error string return karne se LLM user ko       │
 * │                  problem bata sakta hai.                        │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   // Success data ke saath:                                     │
 * │   return JSON.stringify(result);                                │
 * │                                                                 │
 * │   // Success message ke saath:                                  │
 * │   return \`Created. Meet link: ${response.data.hangoutLink}\`;   │
 * │                                                                 │
 * │   // Graceful error:                                            │
 * │   } catch (err) {                                               │
 * │     console.error('Tool error:', err);                          │
 * │     return 'Calendar se connect karne mein failed.';            │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * LLM call karta hai: create-event tool with arguments:
 * {
 *   "summary": "Meeting with Sujoy",
 *   "start": {
 *     "dateTime": "2026-03-04T14:00:00",
 *     "timeZone": "Asia/Kolkata"
 *   },
 *   "end": {
 *     "dateTime": "2026-03-04T15:00:00", 
 *     "timeZone": "Asia/Kolkata"
 *   },
 *   "attendees": [
 *     { "email": "sujoy@example.com" }
 *   ]
 * }
 * 
 * Tool executes:
 *   → Google Calendar API call
 *   → conferenceDataVersion: 1 (Meet link create)
 *   → sendUpdates: 'all' (email invites)
 * 
 * Tool returns:
 * "The meeting has been created. Meet link: https://meet.google.com/abc-defg-hij"
 * 
 * LLM reads this and tells user:
 * "Meeting create ho gaya kal 2pm ke liye Sujoy ke saath. 
 *  Meet link: https://meet.google.com/abc-defg-hij"
 *
 * ======================================================================
 */

// ======================================================================
// SECTION 1: IMPORTS
// ======================================================================
import { tool } from '@langchain/core/tools';
import { google } from 'googleapis';
import z from 'zod';

// ======================================================================
// SECTION 2: GOOGLE OAUTH2 CLIENT  (dono tools share karte hain)
// ======================================================================
//
// googleapis automatically token refresh handle karta hai jab ACCESS_TOKEN
// expire ho (~1 hour). Manual refresh logic ki zaroorat nahi.

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
);

oauth2Client.setCredentials({
    access_token:  process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// ======================================================================
// SECTION 3: GET EVENTS TOOL
// ======================================================================
//
// Primary calendar mein search karta hai query string + date range ke saath.
// Simplified event data JSON string ki form mein return karta hai.
// LLM ye string padhti hai aur user ke liye format karti hai.

export const getEventsTool = tool(
    async (params) => {
        const { q, timeMin, timeMax } = params as {
            q: string;
            timeMin: string;
            timeMax: string;
        };

        try {
            const response = await calendar.events.list({
                calendarId: 'primary',
                q,
                timeMin,
                timeMax,
            });

            const result = response.data.items?.map((event) => ({
                id:          event.id,
                summary:     event.summary,
                status:      event.status,
                organiser:   event.organizer,
                start:       event.start,
                end:         event.end,
                attendees:   event.attendees,
                meetingLink: event.hangoutLink,
                eventType:   event.eventType,
            }));

            return JSON.stringify(result);
        } catch (err) {
            console.error('Calendar Fetch Error:', err);
            return 'Calendar se connect karne mein failed.';
        }
    },
    {
        name: 'get-events',
        description: 'Calendar events dhondho search query aur date range ke hisaab se.',
        schema: z.object({
            q: z.string().describe(
                "Search query matching: summary, description, location, attendee display name/email, ya organiser name/email."
            ),
            timeMin: z.string().describe('Date range ka start — ISO datetime string.'),
            timeMax: z.string().describe('Date range ka end — ISO datetime string.'),
        }),
    }
);

// ======================================================================
// SECTION 4: CREATE EVENT TOOL
// ======================================================================
//
// Naya Google Calendar event create karta hai with:
//   - Google Meet link auto-generated (conferenceDataVersion: 1)
//   - Saare attendees ko email invites (sendUpdates: 'all')
//   - Unique requestId prevents duplicate Meet rooms on retries
//
// displayName .optional() hai — FIX: 400 error prevent karta hai jab
// user sirf email de, naam na de.

const createEventSchema = z.object({
    summary: z.string().describe('Event ka title'),
    start: z.object({
        dateTime: z.string().describe('Event start hone ka time, ISO datetime string'),
        timeZone: z.string().describe('IANA timezone string, e.g. "Asia/Kolkata"'),
    }),
    end: z.object({
        dateTime: z.string().describe('Event khatam hone ka time, ISO datetime string'),
        timeZone: z.string().describe('IANA timezone string, e.g. "Asia/Kolkata"'),
    }),
    attendees: z.array(
        z.object({
            email:       z.string().describe('Attendee ka email address'),
            displayName: z.string().optional().describe('Attendee ka naam. Agar pata nahi to omit karo.'),
        })
    ),
});

type EventData = z.infer<typeof createEventSchema>;

export const createEventTool = tool(
    async (eventData) => {
        const { summary, start, end, attendees } = eventData as EventData;

        try {
            const response = await calendar.events.insert({
                calendarId:            'primary',
                sendUpdates:           'all',    // attendees ko email invites bhejta hai
                conferenceDataVersion: 1,         // Google Meet auto-creation enable
                requestBody: {
                    summary,
                    start,
                    end,
                    attendees,
                    conferenceData: {
                        createRequest: {
                            requestId: crypto.randomUUID(), // har request ke liye unique
                            conferenceSolutionKey: {
                                type: 'hangoutsMeet',
                            },
                        },
                    },
                },
            });

            if (response.status === 200 || response.status === 201) {
                return `Meeting create ho gaya. Meet link: ${response.data.hangoutLink ?? 'N/A'}`;
            }

            return "Meeting create nahi ho saka.";
        } catch (err) {
            console.error('Calendar Create Error:', err);
            return 'Meeting create karne mein error aaya.';
        }
    },
    {
        name:        'create-event',
        description: 'Naya Google Calendar event banao Meet link ke saath aur attendees ko invites bhejo.',
        schema:      createEventSchema,
    }
);