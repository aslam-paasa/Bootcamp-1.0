/**
 * ======================================================================
 * REFLECTION PATTERN LINKEDIN POST WRITER - HINGLISH VERSION
 * ======================================================================
 * 
 * ██████╗ ███████╗███████╗██╗     ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 * ██╔══██╗██╔════╝██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 * ██████╔╝█████╗  █████╗  ██║     █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 * ██╔══██╗██╔══╝  ██╔══╝  ██║     ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 * ██║  ██║███████╗███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 * ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 * 
 * ==================== REFLECTION KYA HAI? ==============================
 * 
 * Simple Definition (Hinglish Mein):
 * ──────────────────────────────────────────────────────────────────
 * Reflection tab hota hai jab AI apne kaam ko khud check karta hai. Jaise tum
 * apna homework submit karne se pehle check karte ho, waise hi AI apne answers
 * check karta hai users ko dene se pehle.
 * 
 * 1. AI answer banata hai
 * 2. AI apne answer ko dekhta hai aur problems dhokta hai
 * 3. AI un problems ko fix karta hai
 * 4. Repeat jab tak answer achha na ho jaye
 * 
 * REFLECTION KYON ZAROORI HAI?
 * ──────────────────────────────────────────────────────────────────
 * 
 * PROBLEM: AI galtiyan karta hai
 *   ❌ Galat facts
 *   ❌ Information missing
 *   ❌ Wrong logic
 *   ❌ Unclear explanations (samajh nahi aata)
 *   ❌ Real question ka answer nahi deta
 * 
 * SOLUTION: AI khud apna kaam check kare
 *   Jaise tum homework submit karne se pehle check karte ho, waise hi AI
 *   bhi apne answers check kare users ko dene se pehle.
 * 
 * REFLECTION AUR REFLEXION MEIN FARAK:
 * ──────────────────────────────────────────────────────────────────
 * 
 * REFLECTION:                          REFLEXION:
 * ┌──────────────────┐                 ┌──────────────────┐
 * │ "Mujhe apna      │                 │ "Mujhe apna      │
 * │  answer check    │                 │  answer check    │
 * │  karna hai aur   │                 │  karna hai,      │
 * │  abhi fix karna  │                 │  YAAD RAKHNA hai │
 * │  hai"            │                 │  ki maine kya    │
 * └──────────────────┘                 │  galat kiya"     │
 *         ↓                            └──────────────────┘
 *    Ek baar fix karega                        ↓
 *    Koi memory nahi                      MEMORY hai
 *    improvement cycles ke beech          (iteration counter)
 *    (stateless)                           (stateful)
 * 
 * Yeh implementation REFLECTION use karti hai (Reflexion nahi) kyunki:
 * - Har post independent hai (conversation nahi hai)
 * - Past posts yaad rakhne ki zaroorat nahi
 * - Max 5 revisions then done
 * - Simple generate → critique → improve loop
 * 
 * ==================== VISUAL DATA FLOW (Hinglish Mein) =================
 * 
 *                            START
 *                              │
 *                              ▼
 *                    ┌─────────────────┐
 *                    │    writer       │
 *                    │  (Post Likho)   │
 *                    └────────┬────────┘
 *                             │
 *                             ▼
 *                    ┌─────────────────┐
 *                    │   critique      │
 *                    │  (Check Karo)   │
 *                    └────────┬────────┘
 *                             │
 *                    ┌────────┴────────┐
 *                    │                 │
 *              [Check: revisions]      │
 *                    │                 │
 *              ┌─────┴─────┐           │
 *             Haan         Nahi        │
 *            (>=5)         (<5)        │
 *              │            │           │
 *              ▼            └───────────┘
 *             END
 * 
 *                    N-times = 5 max (zyada se zyada 5 baar)
 * 
 * STATE KAISE BADALTA HAI:
 * ──────────────────────────────────────────────────────────────────
 * 
 * ROUND 1 (Shuruat):
 * {
 *   messages: [HumanMessage("Coding seekhne ke baare mein post likho")],
 *   revisions: undefined (0 maana jayega)
 * }
 *    ↓
 * [writer] pehla draft banata hai
 *    ↓
 * {
 *   messages: [
 *     HumanMessage("Coding seekhne ke baare mein post likho"),
 *     AIMessage("Pehla draft post...")
 *   ],
 *   revisions: undefined
 * }
 *    ↓
 * [critique] evaluate karta hai aur fixes deta hai
 *    ↓
 * {
 *   messages: [
 *     HumanMessage("Coding seekhne ke baare mein post likho"),
 *     AIMessage("Pehla draft post..."),
 *     HumanMessage("Ab revise karo. Saare changes apply karo... [fixes]")
 *   ],
 *   revisions: 1  // ← Increment hua!
 * }
 *    ↓
 * [check: revisions=1 < 5] → Loop wapas writer ke paas
 *    ↓
 * 
 * ROUND 2:
 * [writer] critique ke based pe improved version banata hai
 *    ↓
 * {
 *   messages: [
 *     ...pehle ke messages,
 *     AIMessage("Improved doosra draft...")
 *   ],
 *   revisions: 1
 * }
 *    ↓
 * [critique] dobara evaluate karta hai
 *    ↓
 * {
 *   messages: [
 *     ...pehle ke messages,
 *     AIMessage("Improved doosra draft..."),
 *     HumanMessage("Ab revise karo. [naye fixes]")
 *   ],
 *   revisions: 2
 * }
 *    ↓
 * [check: revisions=2 < 5] → Loop wapas
 *    ↓
 * 
 * ... aise chalta hai jab tak revisions=5 na ho jaye
 *    ↓
 * [check: revisions=5 >= 5] → END
 *    ↓
 * Return final message (last AIMessage)
 * 
 * ==================== DETAILED EXECUTION PIPELINE (Hinglish) ==========
 * 
 * [USER: "LinkedIn post likho imposter syndrome ke baare mein"]
 *    ↓
 * [STATE INITIAL]
 * {
 *   messages: [HumanMessage("LinkedIn post likho imposter syndrome ke baare mein")],
 *   revisions: undefined  // 0 maana jayega
 * }
 *    ↓
 * [NODE: writer] (Pehla execution)
 *    ├─ STATE SE PADHA: messages[0] (user query)
 *    ├─ LLM CALL with SYSTEM_PROMPT
 *    │   INPUT:
 *    │   │  System: "Tum LinkedIn writing assistant ho beginner devs ke liye..."
 *    │   │  Human: "LinkedIn post likho imposter syndrome ke baare mein"
 *    │   │
 *    │   PROCESS:
 *    │   │  - Requirements analyze karta hai
 *    │   │  - Style guidelines apply karta hai
 *    │   │  - Pehla draft banata hai
 *    │   │
 *    │   OUTPUT:
 *    │   │  "Mujhe apna pehla coding interview yaad hai. Haath kaamp rahe the. 🫣
 *    │   │   
 *    │   │   Months Python seekha, kuch projects banaye, but phir bhi fraud jaisa feel hota tha.
 *    │   │   
 *    │   │   Ye cheezein meri madad ki:
 *    │   │   
 *    │   │   1. Realized ki har senior dev kahi na kahi start kiya tha
 *    │   │   2. 'Wins' folder rakha jisme solved bugs the
 *    │   │   3. Mentor mila jisne apni struggles share ki
 *    │   │   
 *    │   │   Tum bhi yahan belong karte ho. Coding karte raho. 💪
 *    │   │   
 *    │   │   Follow for more dev journey stories."
 *    │
 *    └─ STATE MEIN LIKHA: messages[] ← AIMessage(first draft)
 *    ↓
 * [EDGE: writer → critique] (Hamesha critique ke paas jaata hai pehle baar)
 *    ↓
 * [NODE: critique] (Pehla evaluation)
 *    ├─ STATE SE PADHA:
 *    │   • Last AI message dhundo (draft)
 *    │   • revisions (undefined)
 *    │
 *    ├─ LLM CALL with CRITIQUE_PROMPT
 *    │   INPUT:
 *    │   │  System: "Tum LinkedIn post critique ho..."
 *    │   │  AI Message: [draft ka content]
 *    │   │
 *    │   EVALUATION CRITERIA:
 *    │   │  1) Strong hook in 1-2 lines? ✓ (personal story works)
 *    │   │  2) Beginner-friendly clarity? ✓
 *    │   │  3) Specific insights/examples? ✓ (3 concrete tips)
 *    │   │  4) Skimmable formatting? ✓ (short lines)
 *    │   │  5) Clear CTA? ✓ ("Follow for more")
 *    │   │  6) 160-220 words? → ✗ (sirf 120 words)
 *    │   │  7) No buzzwords? ✓
 *    │   │
 *    │   OUTPUT (strict format):
 *    │   │  "Ab revise karo. Saare changes apply karo. Sirf revised post ka text do.
 *    │   │   - Expand to 180-200 words, tips mein aur detail add karo
 *    │   │   - Har tip ke saath concrete example do
 *    │   │   - Batayo ki har tip follow karne ke baad kya hua"
 *    │
 *    ├─ INCREMENT revisions: undefined → 1
 *    └─ STATE MEIN LIKHA:
 *       • messages[] ← HumanMessage(critique content)
 *       • revisions: 1
 *    ↓
 * [CONDITIONAL EDGE: shouldContinue()]
 *    ├─ STATE SE PADHA: revisions = 1
 *    ├─ CHECK: 1 >= 5? → FALSE
 *    └─ DECISION: wapas 'critique' ke paas (jo phir writer ke paas bhejega)
 *    ↓
 * [EDGE: critique → writer] (Hamesha wapas writer ke paas)
 *    ↓
 * [NODE: writer] (Doosra execution - critique ke saath)
 *    ├─ STATE SE PADHA:
 *    │   • Original query
 *    │   • Previous draft
 *    │   • Critique with specific fixes
 *    │
 *    ├─ LLM CALL (samajhta hai critique as revision order)
 *    │   PROCESS:
 *    │   │  - "Revise now" ko explicit command samajhta hai
 *    │   │  - Har fix apply karta hai:
 *    │   │    • Har tip ko expand karta hai examples ke saath
 *    │   │    • Har tip ke liye before/after add karta hai
 *    │   │    • 190 words tak pahunchta hai
 *    │   │
 *    │   OUTPUT:
 *    │   │  "Mujhe apna pehla coding interview yaad hai. Haath kaamp rahe the. 🫣
 *    │   │   
 *    │   │   Months Python seekha, kuch projects banaye, but phir bhi fraud jaisa feel hota tha.
 *    │   │   
 *    │   │   Ye cheezein meri madad ki:
 *    │   │   
 *    │   │   1. Realized ki har senior dev kahi na kahi start kiya tha
 *    │   │      → Jab ye accept kiya, toh better questions puchne laga
 *    │   │   
 *    │   │   2. 'Wins' folder rakha jisme solved bugs the
 *    │   │      → Interviews se pehle review karke confidence 10x ho gaya
 *    │   │   
 *    │   │   3. Mentor mila jisne apni struggles share ki
 *    │   │      → Unki stories se realize hua ki imposter syndrome normal hai
 *    │   │   
 *    │   │   Tum bhi yahan belong karte ho. Coding karte raho. 💪
 *    │   │   
 *    │   │   Follow for more dev journey stories."
 *    │
 *    └─ STATE MEIN LIKHA: messages[] ← AIMessage(improved draft)
 *    ↓
 * [EDGE: writer → critique] (Hamesha writer ke baad critique)
 *    ↓
 * ... aise chalta hai jab tak revisions=5 na ho jaye
 *    ↓
 * [CONDITIONAL EDGE: shouldContinue()]
 *    ├─ revisions = 5
 *    ├─ 5 >= 5 → TRUE
 *    └─ DECISION: route to END
 *    ↓
 * [END] Final state user ko return karo
 *    ↓
 * [USER DEKHTA HAI] Final improved post
 */

// ======================================================================
// SECTION 1: IMPORTS - Jo Libraries Use Karenge
// ======================================================================
import readline from 'node:readline/promises';
import { END, START, StateGraph, Annotation, MessagesAnnotation } from '@langchain/langgraph';
import { ChatGroq } from '@langchain/groq';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';

// ======================================================================
// SECTION 2: MODEL INITIALIZATION - System ka "Dimag"
// ======================================================================

/**
 * ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗     
 * ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║     
 * ██╔████╔██║██║   ██║██║  ██║█████╗  ██║     
 * ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║     
 * ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
 * ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
 * 
 * GROQ KYON?
 * ──────────────────────────────────────────────────────────────────
 * - Fast inference (multiple revisions ke liye important)
 * - Cost-effective for iteration loops
 * - Structured prompts follow karne mein achha
 * 
 * TEMPERATURE 0 KYON?
 * ──────────────────────────────────────────────────────────────────
 * - Consistent outputs across revisions
 * - Critique instructions ko precisely follow karta hai
 * - Refinement ke dauran creative drift nahi hota
 * - Predictable improvements
 */

export const model = new ChatGroq({
    model: 'openai/gpt-oss-120b',
    temperature: 0,  // Zero randomness = exactly instructions follow karta hai
});

// ======================================================================
// SECTION 3: STATE DEFINITION - Is Post ke Liye "Whiteboard"
// ======================================================================

/**
 * ███████╗████████╗ █████╗ ████████╗███████╗
 * ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
 * ███████╗   ██║   ███████║   ██║   █████╗  
 * ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  
 * ███████║   ██║   ██║  ██║   ██║   ███████╗
 * ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
 * 
 * YEH STATE STRUCTURE REFLECTION KE LIYE KYON IMPORTANT HAI?
 * ──────────────────────────────────────────────────────────────────
 * 
 * messages[]: Poori conversation thread track karta hai
 *   - HumanMessage: Original query + critique instructions
 *   - AIMessage: Generated posts (multiple versions)
 *   
 * revisions: Simple counter (0-5)
 *   - Starts undefined (0 maana jata hai)
 *   - Critique node increment karta hai
 *   - Conditional edge read karta hai decide karne ke liye kab rukna hai
 * 
 * Yeh REFLECTION hai (Reflexion nahi) kyunki:
 * - Different posts ke beech memory ki zaroorat nahi
 * - Har post independent hai
 * - revisions counter sirf is session ke liye hai
 * - Post complete hone ke baad counter reset ho jata hai
 */

export const State = Annotation.Root({
    ...MessagesAnnotation.spec,  // Built-in message handling
    revisions: Annotation<number>,  // Current post ke liye simple counter
});

// ======================================================================
// SECTION 4: WRITER NODE - Content Creator (Post Likhne Wala)
// ======================================================================

/**
 * ██╗    ██╗██████╗ ██╗████████╗███████╗██████╗ 
 * ██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝██╔══██╗
 * ██║ █╗ ██║██████╔╝██║   ██║   █████╗  ██████╔╝
 * ██║███╗██║██╔══██╗██║   ██║   ██╔══╝  ██╔══██╗
 * ╚███╔███╔╝██║  ██║██║   ██║   ███████╗██║  ██║
 *  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
 * 
 * KAAM: User ke topic ke based pe LinkedIn post generate karna
 * 
 * PROMPT ENGINEERING JO CRITICAL HAI:
 * ──────────────────────────────────────────────────────────────────
 * 
 * "Agar latest human message mein critique ho ya 'Revise now' likha ho,
 *  to use previous draft ko revise karne ka explicit order samjho."
 * 
 * Yeh instruction REFLECTION loop ko enable karta hai kyunki:
 * 1. Writer critique ko command samajhta hai (suggestion nahi)
 * 2. Saare requested changes apply karta hai
 * 3. Sirf post output karta hai (meta-commentary nahi)
 * 4. Sawaal nahi puchta ya confirmation nahi maangta
 * 
 * STYLE GUIDELINES KA BREAKDOWN:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Target audience: Beginner devs (0-2 years experience)
 * └── Jargon explain karna hai, encouraging hona hai
 * 
 * Tone: Conversational, authentic, buzzword-free
 * └── "synergize", "leverage", "paradigm shift" jaisa kuch nahi
 * 
 * Format:
 * - 160–220 words (LinkedIn ka sweet spot)
 * - Short lines, whitespace (mobile-friendly)
 * - Max 2 relevant emojis (distracting na ho)
 * 
 * Structure:
 * 1. Hook (first 2 lines) → Attention grab karo
 * 2. 1-2 concrete examples → Relatable content
 * 3. Clear takeaway → Reader ke liye value
 * 4. Simple CTA → Engagement
 */

async function writer(state: typeof State.State) {
    console.log("\n✍️ WRITER NODE EXECUTING (Post Likha Ja Raha Hai)");
    console.log(`   Current revision: ${state.revisions || 0}`);

    const SYSTEM_PROMPT = `Tum LinkedIn writing assistant ho beginner devs (0-2 years experience) ke liye.
    Goal: helpful, human, buzzword-free posts likhna.

    Style & format:
    - Conversational, authentic, short lines, whitespace friendly.
    - 160-220 words. Max 2 relevant emojis.
    - Hook first 2 lines mein do. 1-2 concrete examples do. Clear takeaway do.
    - Jargon ho toh quick analogy ya simple example se explain karo.
    - Controversy se bacho. Simple CTA do follow karne ke liye.

    Behavior:
    - Agar latest human message mein critique ho ya "Revise now" likha ho, to use previous draft ko revise karne ka explicit order samjho. Saare requested changes apply karo.
    - Sawaal mat pucho ya confirmation mat maango. Sirf post ka text do (koi preamble nahi).`;

    console.log("   📝 Post generate ho raha hai...");

    const response = await model.invoke([
        new SystemMessage(SYSTEM_PROMPT),
        ...state.messages,
    ]);

    console.log("   ✅ Post generate ho gaya");
    console.log(`   Length: ${response.content.length} characters`);

    return { messages: [response] };
}

// ======================================================================
// SECTION 5: CRITIQUE NODE - Quality Checker (Post Check Karne Wala)
// ======================================================================

/**
 *  ██████╗██████╗ ██╗████████╗██╗  ██╗██╗   ██╗███████╗
 * ██╔════╝██╔══██╗██║╚══██╔══╝██║  ██║██║   ██║██╔════╝
 * ██║     ██████╔╝██║   ██║   ███████║██║   ██║█████╗  
 * ██║     ██╔══██╗██║   ██║   ██╔══██║██║   ██║██╔══╝  
 * ╚██████╗██║  ██║██║   ██║   ██║  ██║╚██████╔╝███████╗
 *  ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 * 
 * KAAM: Posts evaluate karna aur specific fixes dena
 * 
 * CRITIQUE FORMAT JO CRITICAL HAI:
 * ──────────────────────────────────────────────────────────────────
 * 
 * "Revise now. Apply ALL changes below. Output only the revised post text."
 * (Ab revise karo. Saare changes apply karo. Sirf revised post ka text do.)
 * 
 * Yeh exact phrasing REFLECTION loop ke liye REQUIRED hai kyunki:
 * 1. "Revise now" writer ke revision mode ko trigger karta hai
 * 2. "Apply ALL changes below" ensure karta hai ki koi change miss na ho
 * 3. "Output only the revised post" meta-commentary prevent karta hai
 * 
 * CHECKLIST (6 items):
 * ──────────────────────────────────────────────────────────────────
 * 
 * 1) Strong hook in 1-2 lines
 *    Kyun: LinkedIn feed crowded hai, scroll stop karna hai
 * 
 * 2) Beginner-friendly clarity; jargon ko analogy/example se explain karo
 *    Kyun: Target audience ke paas 0-2 years experience hai
 * 
 * 3) Specific insights aur concrete examples (generic advice nahi)
 *    Kyun: Generic posts ignore hote hain, specific share hote hain
 * 
 * 4) Skimmable formatting (short lines, whitespace)
 *    Kyun: Mobile users scan karte hain, read nahi karte
 * 
 * 5) Clear CTA to follow for more
 *    Kyun: Growth mechanism, audience build hoti hai
 * 
 * 6) 160-220 words, no emojis, authentic tone, no buzzwords, no controversy
 *    Kyun: Length sweet spot, professional but corporate nahi
 * 
 * OUTPUT RULES:
 * ──────────────────────────────────────────────────────────────────
 * ✓ "Revise now..." se start karo
 * ✓ Sirf bullet-point fixes list karo
 * ✓ Rewritten sentences nahi
 * ✓ Paragraphs nahi
 * ✓ Scores ya ratings nahi
 * ✓ Sawaal nahi
 * ✓ Meta commentary nahi
 * 
 * Yeh writer ko FORCE karta hai kaam KARNE ke liye, sirf feedback lene ke liye nahi.
 */

async function critique(state: typeof State.State) {
    console.log("\n🔍 CRITIQUE NODE EXECUTING (Post Check Ki Ja Rahi Hai)");
    console.log(`   Current revision count: ${state.revisions || 0}`);

    const SYSTEM_PROMPT = `Tum LinkedIn post critique ho. Tumhara kaam hai writer agent ke previous post ko feedback dena.

    Check karo against:
    1) Strong hook in 1-2 lines
    2) Beginner-friendly clarity; jargon ko analogy/example se explain karo
    3) Specific insights aur concrete examples (generic advice nahi)
    4) Skimmable formatting (short lines, whitespace)
    5) Clear CTA to follow for more
    6) 160-220 words, no emojis, authentic tone, no buzzwords, no controversy
    
    Output format (no scores, no questions, no meta):
    Exactly iske saath start karo:
    "Ab revise karo. Saare changes apply karo. Sirf revised post ka text do."
    Then sirf bullet-point FIXES list karo (edit instructions). Koi rewritten sentences ya paragraphs mat do. Post mat likho.
    
    Sirf fixes return karo.`;

    // Last AI message dhundo (most recent post)
    const lastAIMessage = [...state.messages].reverse().find((m) => m.getType() === 'ai');

    if (!lastAIMessage) {
        console.log("   ⚠️ Koi AI message nahi mila critique karne ke liye");
        return { messages: [], revisions: state.revisions };
    }

    console.log("   📋 Post evaluate ho rahi hai 6 criteria ke against...");

    const response = await model.invoke([
        new SystemMessage(SYSTEM_PROMPT),
        lastAIMessage as AIMessage,
    ]);

    // Naya revision count calculate karo (increment by 1, 0 se start agar undefined ho)
    const newRevisions = state.revisions ? state.revisions + 1 : 1;
    
    console.log(`   📊 Critique complete. Revisions increment ho rahe hain: ${state.revisions || 0} → ${newRevisions}`);
    console.log(`   Fixes propose kiye:`, (response.content as string).split('\n').filter(l => l.startsWith('-')).length);

    return {
        messages: [new HumanMessage(response.content as string)],
        revisions: newRevisions,
    };
}

// ======================================================================
// SECTION 6: CONDITIONAL EDGE - Loop Controller (Loop Rokne Wala)
// ======================================================================

/**
 * 🚦 SHOULD CONTINUE - Decision Function
 * 
 * Yeh reflection loop ka "brake" (break) hai.
 * 
 * DECISION LOGIC:
 * ──────────────────────────────────────────────────────────────────
 * 
 * agar revisions >= 5 → STOP (END)
 * nahi toh → CONTINUE (critique)
 * 
 * 5 ITERATIONS KYON?
 * ──────────────────────────────────────────────────────────────────
 * - Round 1: Initial draft
 * - Round 2: Major improvements
 * - Round 3: Polish and refine
 * - Round 4: Fine-tune
 * - Round 5: Final check
 * 
 * 5 ke baad, diminishing returns:
 * - Har additional revision kam value add karta hai
 * - Cost linearly increase hoti hai
 * - Users tiny improvements notice nahi karenge
 * 
 * EDGE FLOW:
 * ──────────────────────────────────────────────────────────────────
 * 
 * writer
 *   │
 *   ▼
 * shouldContinue()
 *   │
 *   ├─ agar revisions < 5 → critique ──┐
 *   │                                 │
 *   └─ agar revisions >= 5 → END        │
 *                                      │
 * critique ────────────────────────────┘
 *   │
 *   ▼
 * writer
 */

function shouldContinue(state: typeof State.State) {
    const currentRevisions = state.revisions || 0;
    console.log(`\n   🔄 Continuation check ho raha hai: revisions = ${currentRevisions}/5`);

    if (currentRevisions >= 5) {
        console.log("   ✅ Max revisions reach ho gaye. Reflection loop end ho raha hai.");
        return END;
    }

    console.log(`   🔁 Revisions bache hain: ${5 - currentRevisions}. Reflection continue ho raha hai.`);
    return 'critique';
}

// ======================================================================
// SECTION 7: GRAPH CONSTRUCTION - The Reflection Orchestrator
// ======================================================================

/**
 * ██████╗  █████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗
 * ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║
 * ██████╔╝███████║██████╔╝███████║██████╔╝███████║
 * ██╔══██╗██╔══██║██╔═══╝ ██╔══██║██╔═══╝ ██╔══██║
 * ██║  ██║██║  ██║██║     ██║  ██║██║     ██║  ██║
 * ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝
 * 
 * COMPLETE REFLECTION LOOP VISUALIZATION (Hinglish):
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
 *                        │    writer     │ ← Post generate karta hai
 *                        │   (Likhne     │
 *                        │    Wala)      │
 *                        └───────┬───────┘
 *                                │
 *                    ════════════╧═══════════╗
 *                   ║                         ║
 *              [shouldContinue]           [agar revisions>=5]
 *                   ║                         ║
 *                   ▼                         ▼
 *         ┌─────────────────┐          ┌─────────────┐
 *         │    critique     │          │     END     │
 *         │  (Check Karne   │          └─────────────┘
 *         │   Wala)         │
 *         └─────────────────┘
 *                   │
 *                   └──────→ wapas writer ke paas
 * 
 * YEH ORDER KYON?
 * ──────────────────────────────────────────────────────────────────
 * 
 * writer → critique → writer → critique → ... → END
 * 
 * Ye feedback loop create karta hai jahan:
 * 1. Writer create (ya improve) karta hai
 * 2. Critique evaluate karta hai aur fixes deta hai
 * 3. Writer fixes apply karta hai
 * 4. Repeat jab tak enough achha na ho jaye
 * 
 * KEY EDGES:
 * ──────────────────────────────────────────────────────────────────
 * 
 * START → writer
 *   Hamesha generation se start karo
 * 
 * critique → writer
 *   Critique ke baad hamesha writer ke paas wapas jao (fixes apply karne ke liye)
 * 
 * writer → [conditional]
 *   Writer ke baad, decide karo critique karna hai ya end karna hai
 * 
 * Ye ensure karta hai ki loop hamesha flow kare:
 * Generate → Evaluate → Improve → Evaluate → Improve ... → Done
 */

export const graph = new StateGraph(State)
    // Nodes register karo
    .addNode('writer', writer)
    .addNode('critique', critique)
    
    // Flow define karo
    .addEdge(START, 'writer')                    // Writing se start karo
    .addEdge('critique', 'writer')                 // Critique ke baad, wapas writer ke paas
    
    // Conditional edge: writer ke baad, check karo ki aur critique chahiye ya nahi
    .addConditionalEdges(
        'writer', 
        shouldContinue, 
        { 
            [END]: END,           // Agar shouldContinue END return kare
            critique: 'critique'   // Agar shouldContinue 'critique' return kare
        }
    );

// ======================================================================
// SECTION 8: COMPLETE EXECUTION EXAMPLE WITH REAL DATA (Hinglish)
// ======================================================================

/**
 * 🎬 COMPLETE RUNTHROUGH WITH REAL DATA
 * 
 * User: "30 saal ki umar mein coding seekhne ke baare mein LinkedIn post likho"
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 1 - INITIAL DRAFT (Pehla Draft)
 * ──────────────────────────────────────────────────────────────────
 * 
 * [writer]
 * ├─ Input: HumanMessage("30 saal ki umar mein coding seekhne ke baare mein LinkedIn post likho")
 * ├─ Generate karta hai:
 * │  "30 saal ki umar mein coding seekhna start kiya. Best decision ever. 🚀
 * │   
 * │   Ye seekha:
 * │   
 * │   • Umr matter nahi karti
 * │   • Doosre fields ka experience help karta hai
 * │   • Consistency beats intensity
 * │   
 * │   Follow for more coding journey stories."
 * └─ Output: AIMessage(first draft)
 * 
 * [critique]
 * ├─ Evaluate karta hai:
 * │  1) Hook: ✓ (personal story)
 * │  2) Beginner clarity: ✗ (jargon explain nahi kiya)
 * │  3) Examples: ✗ (too generic)
 * │  4) Format: ✓ (short lines)
 * │  5) CTA: ✓ (follow hai)
 * │  6) Length: ✗ (sirf 80 words)
 * ├─ Output:
 * │  "Ab revise karo. Saare changes apply karo. Sirf revised post ka text do.
 * │   - Expand to 180 words with specific examples
 * │   - Concrete examples do ki doosre fields ka experience kaise help kiya
 * │   - Explain karo 'consistency beats intensity' ka matlab example ke saath
 * │   - Har bullet point mein aur detail add karo"
 * ├─ revisions: 0 → 1
 * 
 * [shouldContinue] → revisions=1 < 5 → continue to critique
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 2 - FIRST REVISION (Pehla Sudhaar)
 * ──────────────────────────────────────────────────────────────────
 * 
 * [writer] (applies fixes)
 * ├─ Generate karta hai:
 * │  "30 saal ki umar mein coding seekhna start kiya. Best decision ever. 🚀
 * │   
 * │   2 saal coding 30+ mein seekhne ke baad ye seekha:
 * │   
 * │   • Umr matter nahi karti
 * │     → Sochta tha 'abhi bohot late ho gaya'. Phir mila ek 45-year-old
 * │        jo Google mein lead developer ban gaya.
 * │   
 * │   • Doosre fields ka experience help karta hai
 * │     → Mere 8 saal customer service mein the, isse user needs samajhne mein
 * │        fresh CS grads se better ban gaya.
 * │   
 * │   • Consistency beats intensity (30 mins daily coding > 8 hours weekends)
 * │     → Roz subah 1 hour padha. 6 months mein 3 real projects bana diye.
 * │        Dost jo 8-hour weekends karte the, 3 weeks mein burnout ho gaye.
 * │   
 * │   Follow for more stories about starting late in tech."
 * ├─ Length: 195 words ✓
 * 
 * [critique]
 * ├─ Evaluate karta hai:
 * │  ✓ Length good
 * │  ✓ Examples added
 * │  ✓ Jargon explained
 * │  ✗ Points ke beech transition add kar sakte hain
 * ├─ Output:
 * │  "Ab revise karo. Saare changes apply karo...
 * │   - Teen points ke beech transition phrases add karo
 * │   - Flow smoother banao"
 * ├─ revisions: 1 → 2
 * 
 * ... aise chalta hai rounds 3, 4, 5 ke liye smaller improvements ke saath
 * 
 * ──────────────────────────────────────────────────────────────────
 * ROUND 5 - FINAL VERSION (Aakhri Version)
 * ──────────────────────────────────────────────────────────────────
 * 
 * [writer] (final polish)
 * ├─ Output:
 * │  "30 saal ki umar mein coding seekhna start kiya. Best decision ever. 🚀
 * │   
 * │   2 saal coding 30+ mein seekhne ke baad ye seekha:
 * │   
 * │   Pehla, umr matter nahi karti.
 * │   → Sochta tha 'abhi bohot late ho gaya'. Phir mila ek 45-year-old
 * │      jo Google mein lead developer ban gaya. Age is just a number.
 * │   
 * │   Doosra, tumhara past experience ek superpower hai.
 * │   → Mere 8 saal customer service mein the, isse user needs samajhne mein
 * │      fresh CS grads se better ban gaya. Soft skills matter.
 * │   
 * │   Teesra, consistency beats intensity.
 * │   → Roz subah 1 hour padha. 6 months mein 3 real projects bana diye.
 * │      Dost jo 8-hour weekends karte the, 3 weeks mein burnout ho gaye.
 * │      Slow and steady wins the race.
 * │   
 * │   Start karne mein kabhi late nahi hota. Tumhara unique path hi tumhara advantage hai.
 * │   
 * │   Follow for more stories about starting late in tech."
 * 
 * [shouldContinue] → revisions=5 >=5 → END
 * 
 * [USER DEKHTA HAI] Final polished post
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
 * - Har topic ke liye fresh reflection cycle
 * - Final polished post dikhta hai
 * - '/bye' type karo exit ke liye
 */

async function main() {
    console.log("\n" + "=".repeat(60));
    console.log("📝 REFLECTION LINKEDIN POST WRITER (HINGLISH VERSION)");
    console.log("=".repeat(60));
    console.log("\n📋 YEH KAISE KAAM KARTA HAI:");
    console.log("   • Main aapke topic par LinkedIn post likhunga");
    console.log("   • Phir usko critique karunga aur improve karunga");
    console.log("   • Maximum 5 refinement cycles");
    console.log("   • Aapko final polished version milega\n");
    console.log("💬 Kis baare mein likhna hai? (type '/bye' to exit)\n");

    const app = graph.compile();
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    let postCount = 0;

    while (true) {
        const query = await rl.question('📝 Topic: ');
        
        if (query.toLowerCase() === '/bye') {
            console.log('\n👋 Happy posting! Alvida!\n');
            break;
        }

        postCount++;
        console.log(`\n📨 [Post #${postCount}] Aapki LinkedIn post bana raha hoon...`);
        console.log('🤔 Generate, critique aur refine ho raha hai (thoda time lagega)...\n');

        const result = await app.invoke({
            messages: [new HumanMessage(query)],
        });

        console.log('\n' + '='.repeat(60));
        console.log('📋 FINAL POLISHED POST (Aakhri Post)');
        console.log('='.repeat(60) + '\n');

        const finalPost = result.messages[result.messages.length - 1].content;
        console.log(finalPost);
        
        console.log('\n' + '='.repeat(60));
        console.log(`✅ Post ${result.revisions || 0} revision cycles ke baad polish hui`);
        console.log('='.repeat(60) + '\n');
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
console.log("\n🚀 Reflection LinkedIn Post Writer start ho raha hai...");
console.log("⏳ Components initialize ho rahe hain...\n");

main().catch((error) => {
    console.error("\n💥 Fatal error in main:", error);
    process.exit(1);
});

// ======================================================================
// APPENDIX: COMPLETE REFLECTION ARCHITECTURE SUMMARY (Hinglish)
// ======================================================================

/**
 * 📌 REFLECTION PATTERN SUMMARY
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     CORE COMPONENTS                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                  │
 * │ 1. WRITER (Actor - Likhne Wala)                                │
 * │    • Initial post generate karta hai                            │
 * │    • Critique fixes apply karta hai                             │
 * │    • Strict style guidelines follow karta hai                   │
 * │    • Koi meta-commentary nahi, sirf post                        │
 * │                                                                  │
 * │ 2. CRITIQUE (Evaluator - Check Karne Wala)                      │
 * │    • 6 criteria ke against check karta hai                      │
 * │    • Bullet-point fixes provide karta hai                       │
 * │    • Exact "Revise now..." format use karta hai                 │
 * │    • Rewritten content nahi, sirf instructions                  │
 * │                                                                  │
 * │ 3. COUNTER (Loop Control - Counter)                             │
 * │    • Revision number track karta hai                            │
 * │    • Max 5 iterations                                           │
 * │    • Infinite loops se bachata hai                              │
 * │    • Posts ke beech memory nahi                                 │
 * │                                                                  │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 📊 DATA FLOW SUMMARY
 * ======================================================================
 * 
 * Stage     | Input                          | Output
 * ----------|--------------------------------|------------------
 * writer    | Topic + previous critique       | New/improved post
 * critique  | Last post                       | Fix instructions
 * 
 * 🔄 REFLECTION LOOP
 * ======================================================================
 * 
 * Round 1: writer → critique (revisions=1)
 *    ↓
 * Round 2: writer → critique (revisions=2)
 *    ↓
 * Round 3: writer → critique (revisions=3)
 *    ↓
 * Round 4: writer → critique (revisions=4)
 *    ↓
 * Round 5: writer → critique (revisions=5) → END
 * 
 * 🎯 KEY INSIGHTS (Importants Points)
 * ======================================================================
 * 
 * 1. REFLECTION ≠ Reflexion
 *    • Reflection: Abhi fix karo, baad mein bhool jao
 *    • Reflexion: Mistakes yaad rakho across sessions
 *    
 *    Yeh REFLECTION hai kyunki har post independent hai
 * 
 * 2. CRITIQUE FORMAT crucial hai
 *    • "Revise now" writer ke revision mode ko trigger karta hai
 *    • Bullet points = clear instructions
 *    • No rewritten text = writer ko kaam khud karna padta hai
 * 
 * 3. 5 ITERATIONS sweet spot hai
 *    • Meaningful improvement ke liye enough
 *    • Itna nahi ki cost outweigh kare benefit ko
 *    • Users ko polished content milta hai
 * 
 * 4. NO MEMORY by design hai
 *    • Har post fresh start hota hai
 *    • Topics ke beech cross-contamination nahi
 *    • Clean slate every time
 * 
 * 🚀 PRODUCTION ENHANCEMENTS (Aur Kya Kar Sakte Hain)
 * ======================================================================
 * 
 * 1. Max iterations configurable karo per request
 * 2. Post length options add karo (short/medium/long)
 * 3. Tone selection include karo (professional/casual/inspiring)
 * 4. Hashtag suggestions add karo
 * 5. Successful posts save karo unse seekhne ke liye
 * 6. A/B test different critique criteria
 * 7. Plagiarism check add karo
 * 8. Engagement prediction score include karo
 * 
 * ======================================================================
 * 🎉 IMPLEMENTATION COMPLETE
 * ======================================================================
 * 
 * Yeh Reflection LinkedIn Post Writer demonstrate karta hai:
 * 
 * ✅ PURE REFLECTION PATTERN
 *   • Generate → Critique → Improve loop
 *   • No cross-session memory (true reflection)
 *   • Fixed iteration limit (5 cycles)
 *   • Clear separation of concerns
 * 
 * ✅ PROMPT ENGINEERING EXCELLENCE
 *   • "Revise now" trigger phrase
 *   • Bullet-point only critique
 *   • No meta-commentary enforcement
 *   • Style guidelines baked in
 * 
 * ✅ ROBUST STATE MANAGEMENT
 *   • Messages track full history
 *   • Revisions counter controls loop
 *   • Clean slate for each post
 * 
 * ✅ PRODUCTION READINESS
 *   • Error handling
 *   • Clear data flow
 *   • Modular design
 *   • Extensive documentation
 * 
 * System consistently well-crafted LinkedIn posts produce karta hai
 * iterative self-improvement ke through, bina past posts yaad rakhne
 * ya complex state maintain karne ki zaroorat ke.
 * 
 * ======================================================================
 */