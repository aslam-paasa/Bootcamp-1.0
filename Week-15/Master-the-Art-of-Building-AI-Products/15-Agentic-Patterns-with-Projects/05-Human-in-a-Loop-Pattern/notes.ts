/**
 * ======================================================================
 * SUPERVISOR PATTERN WITH HUMAN-IN-THE-LOOP - COMPLETE IMPLEMENTATION (HINGLISH VERSION)
 * ======================================================================
 * 
 * ███████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗   ██╗██╗███████╗ ██████╗ ██████╗ 
 * ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔══██╗
 * ███████╗██║   ██║██████╔╝█████╗  ██████╔╝██║   ██║██║███████╗██║     ██████╔╝
 * ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚██╗ ██╔╝██║╚════██║██║     ██╔══██╗
 * ███████║╚██████╔╝██║     ███████╗██║  ██║ ╚████╔╝ ██║███████║╚██████╗██║  ██║
 * ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝
 * 
 *                          +------------+
 *                          | Supervisor |
 *                          |  (BOSS)    |
 *                          +------------+
 *                                 |
 *                                 V
 *       +-------------------------+-------------------------+
 *       |                         |                         |
 *       V                         V                         V
 * +-------------+           +-------------+         +---------------+
 * |    Tools    |           |    Tools    |         |     Tools     |
 * | schedule_   |           | manage_     |         | manage_       |
 * | event       |           | email       |         | contacts      |
 * +-------------+           +-------------+         +---------------+
 *       |                         |                         |
 *       V                         V                         V
 * +-------------+           +-------------+         +---------------+
 * | Calendar    |           | Email       |         | Contact       |
 * | Agent       |           | Agent       |         | Agent         |
 * +-------------+           +-------------+         +---------------+
 *       |                         |                         |
 *       V                         V                         V
 * +-------------+           +-------------+         +---------------+
 * |    Tools    |           |    Tools    |         |     Tools     |
 * | create_     |           | send_email  |         | get_contacts  |
 * | calendar_   |           |  🔴 PAUSES  |         |               |
 * | event       |           |  for review |         |               |
 * +-------------+           +-------------+         +---------------+
 * 
 * ======================================================================
 * HUMAN-IN-THE-LOOP KYA HAI?
 * ======================================================================
 * 
 * Problem: AI sensitive actions bina permission ke execute kar sakta hai
 *          (emails bhejna, meetings create karna) jo galat ho sakta hai
 * 
 * Solution: Sensitive tool calls se pehle INTERRUPT karo, insaan ko dikhao,
 *           aur unhe decision lene do:
 * 
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  AI send_email tool call kar raha hai:                   │
 *   │  To:      ["sujoy@company.com", "john@company.com"]      │
 *   │  Subject: "Reminder: Meeting Tomorrow at 2pm"            │
 *   │  Body:    "Hi team, just a reminder..."                  │
 *   │                                                          │
 *   │  Aap kya karna chahte hain?                              │
 *   │  [1] Approve  [2] Edit  [3] Reject                       │
 *   └──────────────────────────────────────────────────────────┘
 * 
 *   1 → APPROVE : Action original arguments ke saath execute hoga
 *   2 → EDIT    : Aap arguments modify kar sakte hain, phir execute hoga
 *   3 → REJECT  : Action cancel ho jayega
 * 
 * IMPORTANT: Agar user REJECT kare to AI DOBARA try nahi karega
 * 
 * ======================================================================
 * EXECUTION FLOW EXAMPLE
 * ======================================================================
 * 
 * User: "Design team ke saath kal 2pm meeting rakho aur unhe email reminder bhejo"
 * 
 *  [1] Supervisor 3 tasks identify karta hai:
 *      → manage_contacts (design team ke emails lao)
 *      → schedule_event  (meeting banao)
 *      → manage_email    (email reminder bhejo)
 * 
 *  [2] manage_contacts called first
 *      → Returns: sujoy@... aur john@...
 * 
 *  [3] schedule_event called with contact emails
 *      → Calendar agent "kal 2pm" parse karta hai → 2026-03-04T14:00:00
 *      → 🔴 INTERRUPT: "Calendar event pending approval"
 *      → Human types: 1 (approve)
 *      → Event created ✓
 * 
 *  [4] manage_email called with same emails
 *      → Email agent reminder compose karta hai
 *      → 🔴 INTERRUPT: "Email pending approval"
 *      → Human types: 3 (reject)
 *      → Email cancelled ✓
 * 
 *  [5] Supervisor responds:
 *      "Meeting created for kal 2pm. Email was rejected.
 *       Kuch aur help chahiye?"
 * 
 * ======================================================================
 * KEY CONCEPTS EXPLAINED
 * ======================================================================
 * 
 * ┌──────────────────────────────────────────────────────────────────┐
 * │ 1. Command                                                       │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ Kya hai: LangGraph ka ek class jo paused/interrupted graph ko    │ 
 * │           batata hai ki kaise resume karna hai.                  │
 * │                                                                  │
 * │ Kab use: Sirf jab interrupt hua ho. Normal turns par direct      │
 * │          messages pass karo.                                     │
 * │                                                                  │
 * │ Syntax: new Command({ resume: { [interrupt.id]: decision } })    │
 * │                                                                  │
 * │ Code:                                                            │
 * │   const result = await agent.invoke(                             │
 * │     interrupts.length                                            │
 * │       ? new Command({ resume })   ← interrupt ke baad resume     │
 * │       : { messages: [...] },      ← normal naya message          │
 * │     config                                                       │
 * │   );                                                             │
 * └──────────────────────────────────────────────────────────────────┘
 * 
 * ┌──────────────────────────────────────────────────────────────────┐
 * │ 2. resume Object                                                 │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek plain object (Record<string, any>) jo har interrupt  │
 * │           ki unique ID ko human decision se map karta hai.       │
 * │                                                                  │
 * │ Kyun: Ek run mein multiple tools interrupt ho sakte hain.        │
 * │       resume har ek ko independently handle karne deta hai.      │
 * │                                                                  │
 * │ Syntax: { [interrupt.id]: { decisions: [{ type, editedAction }]}}│
 * │                                                                  │
 * │ Code:                                                            │
 * │   // Approve:                                                    │
 * │   resume[interrupt.id] = {                                       │
 * │     decisions: [{ type: 'approve' }]                             │
 * │   };                                                             │
 * │                                                                  │
 * │   // Reject:                                                     │
 * │   resume[interrupt.id] = {                                       │
 * │     decisions: [{ type: 'reject' }]                              │
 * │   };                                                             │
 * │                                                                  │
 * │   // Edit (args modify karo phir run karo):                      │
 * │   resume[interrupt.id] = {                                       │
 * │     decisions: [{ type: 'edit', editedAction }]                  │
 * │   };                                                             │
 * └──────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. action / editedAction                                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: AI ne jo tool call karna chahta hai uski representation│
 * │          Tool ka name aur arguments jo usne prepare kiye hain.  │
 * │                                                                 │
 * │ Kahan milta: interrupt.value.actionRequest[0].action mein       │
 * │                                                                 │
 * │ Syntax: { name: string, args: Record<string, any> }             │
 * │                                                                 │
 * │ editedAction = action ki copy with modified args, graph ko      │
 * │                wapas bheji jati hai taaki AI ki jagah AAPKE     │
 * │                changes run hon.                                 │
 * │                                                                 │
 * │ Code:                                                           │
 * │   const action = interrupt.value.actionRequest[0].action;       │
 * │                                                                 │
 * │   // Clone and modify:                                          │
 * │   const editedAction = {                                        │
 * │     ...action,                                                  │
 * │     args: {                                                     │
 * │       ...action.args,                                           │
 * │       subject: 'Naya subject',  // ← aapka edit                 │
 * │     }                                                           │
 * │   };                                                            │
 * │                                                                 │
 * │   resume[interrupt.id] = {                                      │
 * │     decisions: [{ type: 'edit', editedAction }]                 │
 * │   };                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ 4. interrupt / __interrupt__                                      │
 * ├───────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Jab middleware execution pause karta hai, LangGraph      │
 * │          result object par __interrupt__ array attach kar deta hai│
 * │                                                                   │
 * │ Har interrupt mein hota hai:                                      │
 * │   .id          → unique string ID for this interrupt              │
 * │   .value       → InterruptValue object                            │
 * │     .actionRequest[0].description      → human-readable label     │
 * │     .actionRequest[0].action           → { name, args }           │
 * │     .reviewConfigs[0].allowedDecisions → ['approve','edit',...]   │
 * │                                                                   │
 * │ Code:                                                             │
 * │   if (result.__interrupt__) {                                     │
 * │     const interrupt = result.__interrupt__[0];                    │
 * │     const { description, action } =                               │
 * │       interrupt.value.actionRequest[0];                           │
 * │     const decisions =                                             │
 * │       interrupt.value.reviewConfigs[0].allowedDecisions;          │
 * │     interrupts.push(interrupt);  // next user input ke liye save  │
 * │   }                                                               │
 * └───────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. humanInTheLoopMiddleware                                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Agent mein add kiya gaya middleware jo specific tool   │
 * │           calls ko intercept karta hai aur execution pause      │
 * │           karta hai human review ke liye.                       │
 * │                                                                 │
 * │ Options:                                                        │
 * │   interruptOn:      { toolName: true }  → kaunse tools pause    │
 * │   descriptionPrefix: string             → human ko dikhne wala  │
 * │                                           label                 │
 * │                                                                 │
 * │ Code:                                                           │
 * │   const agent = createAgent({                                   │
 * │     model,                                                      │
 * │     tools: [sensitiveToolHere],                                 │
 * │     middleware: [                                               │
 * │       humanInTheLoopMiddleware({                                │
 * │         interruptOn: { send_email: true },                      │
 * │         descriptionPrefix: 'Email pending approval',            │
 * │       }),                                                       │
 * │     ],                                                          │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. MemorySaver / checkpointer                                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Poora graph state save karta hai taaki execution pause │
 * │          aur resume ho sake multiple .invoke() calls ke across  │
 * │                                                                 │
 * │ Kyun required: Iske bina graph state har call ke baad lost      │
 * │                ho jata hai. Human-in-the-loop iske BINA kaam    │
 * │                nahi karega.                                     │
 * │                                                                 │
 * │ MemorySaver  = in-memory, dev/demo ke liye best                 │
 * │ Production   = SqliteSaver, PostgresSaver, ya RedisSaver use    │
 * │                                                                 │
 * │ Code:                                                           │
 * │   const agent = createAgent({                                   │
 * │     ...                                                         │
 * │     checkpointer: new MemorySaver(),                            │
 * │   });                                                           │
 * │                                                                 │
 * │   // thread_id ek conversation session group karta hai:         │
 * │   const config = { configurable: { thread_id: 'user-123' } };   │
 * │   await agent.invoke({ messages: [...] }, config);              │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. COMPLETE DECISION HANDLER TEMPLATE                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                  │
 * │  let interrupts: any[] = [];                                    │
 * │                                                                  │
 * │  while (true) {                                                 │
 * │    const userInput = await getUserInput();                      │
 * │    const resume: Record<string, any> = {};                      │
 * │                                                                  │
 * │    if (interrupts.length) {                                     │
 * │      const interrupt = interrupts[0];                           │
 * │                                                                  │
 * │      if (userInput === '1') { // approve                        │
 * │        resume[interrupt.id] = {                                 │
 * │          decisions: [{ type: 'approve' }]                       │
 * │        };                                                       │
 * │                                                                  │
 * │      } else if (userInput === '2') { // edit                    │
 * │        const action = interrupt.value.actionRequest[0].action;  │
 * │        const editedAction = {                                   │
 * │          ...action,                                             │
 * │          args: { ...action.args, subject: '🎯 ' + action.args.subject }│
 * │        };                                                       │
 * │        resume[interrupt.id] = {                                 │
 * │          decisions: [{ type: 'edit', editedAction }]            │
 * │        };                                                       │
 * │                                                                  │
 * │      } else { // reject                                         │
 * │        resume[interrupt.id] = {                                 │
 * │          decisions: [{ type: 'reject' }]                        │
 * │        };                                                       │
 * │      }                                                          │
 * │    }                                                            │
 * │                                                                  │
 * │    const result = await agent.invoke(                           │
 * │      interrupts.length                                          │
 * │        ? new Command({ resume })                                │
 * │        : { messages: [{ role: 'user', content: userInput }] },  │
 * │      config                                                     │
 * │    );                                                           │
 * │                                                                  │
 * │    interrupts = [];                                             │
 * │                                                                  │
 * │    if (result.__interrupt__) {                                  │
 * │      interrupts.push(result.__interrupt__[0]);                  │
 * │      // user ko review UI dikhao...                             │
 * │    } else {                                                     │
 * │      // final response dikhao...                                │
 * │    }                                                            │
 * │  }                                                              │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ======================================================================
 */

/**
 * ======================================================================
 * SUPERVISOR PATTERN WITH HUMAN-IN-THE-LOOP
 * ======================================================================
 *
 * ARCHITECTURE OVERVIEW
 * ─────────────────────
 *
 *   USER INPUT
 *       │
 *       ▼
 *  ┌──────────────────────────────────────────────────────────┐
 *  │                    SUPERVISOR AGENT                      │
 *  │              (Orchestrates everything)                   │
 *  └──────────────┬──────────────────┬───────────────────────┘
 *                 │                  │                │
 *        ┌────────▼───────┐  ┌───────▼──────┐  ┌─────▼────────┐
 *        │ schedule_event │  │ manage_email │  │manage_contacts│
 *        │    (tool)      │  │   (tool)     │  │   (tool)     │
 *        └────────┬───────┘  └───────┬──────┘  └─────┬────────┘
 *                 │                  │                │
 *        ┌────────▼───────┐  ┌───────▼──────┐  ┌─────▼────────┐
 *        │ CALENDAR AGENT │  │ EMAIL AGENT  │  │CONTACT AGENT │
 *        │  + middleware  │  │ + middleware │  │              │
 *        └────────┬───────┘  └───────┬──────┘  └─────┬────────┘
 *                 │                  │                │
 *        ┌────────▼───────┐  ┌───────▼──────┐  ┌─────▼────────┐
 *        │create_calendar │  │ send_email   │  │ get_contacts │
 *        │get_time_slots  │  │  🔴 PAUSES   │  │              │
 *        │  🔴 PAUSES     │  │  for review  │  │              │
 *        └────────────────┘  └──────────────┘  └──────────────┘
 *
 * ======================================================================
 * WHAT IS HUMAN-IN-THE-LOOP?
 * ======================================================================
 *
 * Problem:  AI can execute sensitive actions (emails, meetings) without
 *           any human oversight, leading to mistakes.
 *
 * Solution: Interrupt the AI before sensitive tool calls, show humans
 *           what's about to happen, and let them decide:
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  AI wants to call: send_email                            │
 *   │  To:      ["sujoy@company.com", "john@company.com"]      │
 *   │  Subject: "Reminder: Meeting Tomorrow at 2pm"            │
 *   │  Body:    "Hi team, just a reminder..."                  │
 *   │                                                          │
 *   │  What do you want to do?                                 │
 *   │  [1] Approve  [2] Edit  [3] Reject                       │
 *   └──────────────────────────────────────────────────────────┘
 *
 *   1 → APPROVE  : Action runs with original arguments
 *   2 → EDIT     : You modify arguments, then action runs
 *   3 → REJECT   : Action is cancelled entirely
 *
 * ======================================================================
 * EXECUTION FLOW EXAMPLE
 * ======================================================================
 *
 * User: "Design team ke saath kal 2pm meeting rakho aur email bhejo"
 *
 *  [1] Supervisor identifies 3 tasks:
 *      → Get design team contacts
 *      → Create calendar event
 *      → Send email reminder
 *
 *  [2] manage_contacts called first
 *      → Returns: sujoy@... and john@...
 *
 *  [3] schedule_event called with contact emails
 *      → Calendar agent parses "kal 2pm" → 2026-03-04T14:00:00
 *      → 🔴 INTERRUPT: "Calendar event pending approval"
 *      → Human types: 1 (approve)
 *      → Event created ✓
 *
 *  [4] manage_email called with same emails
 *      → Email agent composes reminder
 *      → 🔴 INTERRUPT: "Email pending approval"
 *      → Human types: 3 (reject)
 *      → Email cancelled ✓
 *
 *  [5] Supervisor responds:
 *      "Meeting created for kal 2pm. Email was rejected.
 *       Kuch aur help chahiye?"
 *
 * ======================================================================
 * KEY CONCEPTS & KEYWORDS EXPLAINED
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. Command                                                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  A LangGraph class that sends instructions to a           │
 * │        paused/interrupted graph to tell it how to resume.       │
 * │                                                                 │
 * │ When:  Used ONLY when an interrupt has occurred. On normal      │
 * │        turns you pass messages directly.                        │
 * │                                                                 │
 * │ Shape: new Command({ resume: { [interrupt.id]: decision } })    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const result = await agent.invoke(                            │
 * │     interrupts.length                                           │
 * │       ? new Command({ resume })   ← resume after interrupt      │
 * │       : { messages: [...] },      ← normal new message          │
 * │     config                                                      │
 * │   );                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. resume                                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  A plain object (Record<string, any>) that maps each      │
 * │        interrupt's unique ID to the human's decision.           │
 * │                                                                 │
 * │ Why:   Multiple tools can interrupt in one run. resume lets     │
 * │        you handle each one independently by its ID.             │
 * │                                                                 │
 * │ Shape: { [interrupt.id]: { decisions: [{ type, editedAction }]}}│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const resume: Record<string, any> = {};                       │
 * │                                                                 │
 * │   // approve:                                                   │
 * │   resume[interrupt.id] = {                                      │
 * │     decisions: [{ type: 'approve' }]                            │
 * │   };                                                            │
 * │                                                                 │
 * │   // reject:                                                    │
 * │   resume[interrupt.id] = {                                      │
 * │     decisions: [{ type: 'reject' }]                             │
 * │   };                                                            │
 * │                                                                 │
 * │   // edit (modify args before running):                         │
 * │   resume[interrupt.id] = {                                      │
 * │     decisions: [{ type: 'edit', editedAction }]                 │
 * │   };                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. action / editedAction                                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Represents the tool call the AI wanted to make.          │
 * │        Contains the tool name and the arguments it prepared.    │
 * │                                                                 │
 * │ Where: Lives inside interrupt.value.actionRequest[0].action     │
 * │                                                                 │
 * │ Shape: { name: string, args: Record<string, any> }              │
 * │                                                                 │
 * │ editedAction = action with modified args, passed back to        │
 * │ the graph so it runs with YOUR changes instead of the AI's.     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const action = interrupt.value.actionRequest[0].action;       │
 * │                                                                 │
 * │   // Clone and mutate safely:                                   │
 * │   const editedAction = {                                        │
 * │     ...action,                                                  │
 * │     args: {                                                      │
 * │       ...action.args,                                           │
 * │       subject: 'New subject here',  // ← your edit              │
 * │     }                                                           │
 * │   };                                                            │
 * │                                                                 │
 * │   resume[interrupt.id] = {                                      │
 * │     decisions: [{ type: 'edit', editedAction }]                 │
 * │   };                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. interrupt / __interrupt__                                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  When the middleware pauses execution, LangGraph attaches  │
 * │        a __interrupt__ array to the result object.              │
 * │                                                                 │
 * │ Each interrupt contains:                                        │
 * │   .id          → unique string ID for this interrupt            │
 * │   .value       → InterruptValue (see type below)                │
 * │     .actionRequest[0].description  → human-readable label       │
 * │     .actionRequest[0].action       → { name, args }            │
 * │     .reviewConfigs[0].allowedDecisions → ['approve','edit',...] │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   if (result.__interrupt__) {                                   │
 * │     const interrupt = result.__interrupt__[0];                  │
 * │     const { description, action } =                             │
 * │       interrupt.value.actionRequest[0];                         │
 * │     const decisions =                                           │
 * │       interrupt.value.reviewConfigs[0].allowedDecisions;        │
 * │     // store interrupt to use on next user input:               │
 * │     interrupts.push(interrupt);                                 │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. humanInTheLoopMiddleware                                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Middleware added to an agent that intercepts specific     │
 * │        tool calls and pauses execution for human review.        │
 * │                                                                 │
 * │ Options:                                                        │
 * │   interruptOn:      { toolName: true }  → which tools to pause  │
 * │   descriptionPrefix: string             → label shown to human  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const agent = createAgent({                                   │
 * │     model,                                                      │
 * │     tools: [sensitiveToolHere],                                 │
 * │     middleware: [                                               │
 * │       humanInTheLoopMiddleware({                                │
 * │         interruptOn: { send_email: true },                      │
 * │         descriptionPrefix: '✉️ Email pending approval',         │
 * │       }),                                                       │
 * │     ],                                                          │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. MemorySaver / checkpointer                                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Saves the entire graph state so execution can pause      │
 * │        and resume across multiple .invoke() calls.              │
 * │                                                                 │
 * │ Why required: Without it, graph state is lost after each call.  │
 * │               Human-in-the-loop CANNOT work without it.         │
 * │                                                                 │
 * │ MemorySaver  = in-memory, great for dev/demo                    │
 * │ Production   = use SqliteSaver, PostgresSaver, or RedisSaver    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const agent = createAgent({                                   │
 * │     ...                                                         │
 * │     checkpointer: new MemorySaver(),                            │
 * │   });                                                           │
 * │                                                                 │
 * │   // thread_id groups messages into one conversation session:   │
 * │   const config = { configurable: { thread_id: 'user-123' } };   │
 * │   await agent.invoke({ messages: [...] }, config);              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. COMPLETE DECISION HANDLER TEMPLATE                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                 │
 * │  let interrupts: any[] = [];                                    │
 * │                                                                 │
 * │  while (true) {                                                 │
 * │    const userInput = await getUserInput();                      │
 * │    const resume: Record<string, any> = {};                      │
 * │                                                                 │
 * │    if (interrupts.length) {                                     │
 * │      const interrupt = interrupts[0];                           │
 * │                                                                 │
 * │      if (userInput === 'approve') {                             │
 * │        resume[interrupt.id] = {                                 │
 * │          decisions: [{ type: 'approve' }]                       │
 * │        };                                                       │
 * │                                                                 │
 * │      } else if (userInput === 'edit') {                         │
 * │        const action = interrupt.value.actionRequest[0].action;  │
 * │        const editedAction = {                                   │
 * │          ...action,                                             │
 * │          args: { ...action.args, subject: 'New Subject' }       │
 * │        };                                                       │
 * │        resume[interrupt.id] = {                                 │
 * │          decisions: [{ type: 'edit', editedAction }]            │
 * │        };                                                       │
 * │                                                                 │
 * │      } else {                                                   │
 * │        resume[interrupt.id] = {                                 │
 * │          decisions: [{ type: 'reject' }]                        │
 * │        };                                                       │
 * │      }                                                          │
 * │    }                                                            │
 * │                                                                 │
 * │    const result = await agent.invoke(                           │
 * │      interrupts.length                                          │
 * │        ? new Command({ resume })                                │
 * │        : { messages: [{ role: 'user', content: userInput }] },  │
 * │      config                                                     │
 * │    );                                                           │
 * │                                                                 │
 * │    interrupts = [];                                             │
 * │                                                                 │
 * │    if (result.__interrupt__) {                                  │
 * │      interrupts.push(result.__interrupt__[0]);                  │
 * │      // show review UI to user...                               │
 * │    } else {                                                     │
 * │      // show final response...                                  │
 * │    }                                                            │
 * │  }                                                              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 */

/* SECTION 1: IMPORTS */
import readline from 'node:readline/promises';
import { ChatOpenAI } from '@langchain/openai';
import { tool, createAgent, humanInTheLoopMiddleware } from 'langchain';
import { MemorySaver, Command } from '@langchain/langgraph';
import { z } from 'zod';


/* SECTION 2: MODEL */
const model = new ChatOpenAI({
    model: 'gpt-4o-mini',
    temperature: 0, // Deterministic output for consistent tool calls
});


/* SECTION 3: PRIMITIVE TOOLS (the actual API stubs) */
const createCalendarEvent = tool(
    async ({ title, startTime, endTime, attendees, location }) => {
        // TODO: Replace with Google Calendar API
        return `Event created: ${title} from ${startTime} to ${endTime} with ${attendees.length} attendees`;
    },
    {
        name: 'create_calendar_event',
        description: 'Create a calendar event. Requires exact ISO datetime format.',
        schema: z.object({
            title: z.string(),
            startTime: z.string().describe("ISO format: '2024-01-15T14:00:00'"),
            endTime: z.string().describe("ISO format: '2024-01-15T15:00:00'"),
            attendees: z.array(z.string()).describe('email addresses'),
            location: z.string().optional(),
        }),
    }
);

const sendEmail = tool(
    async ({ to, subject, body, cc }) => {
        // TODO: Replace with SendGrid / Gmail API
        return `Email sent to ${to.join(', ')} - Subject: ${subject}`;
    },
    {
        name: 'send_email',
        description: 'Send an email. Requires properly formatted addresses.',
        schema: z.object({
            to: z.array(z.string()).describe('email addresses'),
            subject: z.string(),
            body: z.string(),
            cc: z.array(z.string()).optional(),
        }),
    }
);

const getAvailableTimeSlots = tool(
    async ({ attendees, date, durationMinutes }) => {
        // TODO: Replace with Calendar API availability check
        return ['09:00', '14:00', '16:00'];
    },
    {
        name: 'get_available_time_slots',
        description: 'Check calendar availability for attendees on a specific date.',
        schema: z.object({
            attendees: z.array(z.string()),
            date: z.string().describe("ISO format: '2024-01-15'"),
            durationMinutes: z.number(),
        }),
    }
);

const getContacts = tool(
    async ({ search }) => {
        // TODO: Replace with real contact database
        return JSON.stringify([
            { id: 1, team: 'design',      name: 'Sujoy', email: 'sujoy@codersgyan.com' },
            { id: 2, team: 'design',      name: 'John',  email: 'john@codersgyan.com'  },
            { id: 3, team: 'development', name: 'Kevin', email: 'kevin@codersgyan.com' },
        ]);
    },
    {
        name: 'get_contacts',
        description: 'Search and return contacts from the database.',
        schema: z.object({
            search: z.string().describe('Search query. e.g: "design" or "sujoy"'),
        }),
    }
);


/**
 * SECTION 4: SUB-AGENTS
 * Each sub-agent is a specialist. Sensitive tools get humanInTheLoopMiddleware
 * so the AI pauses and waits for human approval before executing them.
 * 
 *  - create_calendar_event    → 🔴 interrupts (modifies user's calendar)
 *  - send_email               → 🔴 interrupts (sends to real people)
 *  - get_available_time_slots → ✅ no interrupt (read-only, safe)
 *  - get_contacts             → ✅ no interrupt (read-only, safe)
*/

const calendarAgent = createAgent({
    model,
    tools: [createCalendarEvent, getAvailableTimeSlots],
    systemPrompt: `
You are a calendar scheduling assistant.
Parse natural language requests (e.g., "aglae mangalvar 2 baje") into ISO datetime format.
Use get_available_time_slots to check availability when needed.
Use create_calendar_event to schedule events.
Always confirm what was scheduled in your final response.
    `.trim(),
    middleware: [
        humanInTheLoopMiddleware({
            interruptOn: { create_calendar_event: true },
            descriptionPrefix: '📅 Calendar event pending approval',
        }),
    ],
});

const emailAgent = createAgent({
    model,
    tools: [sendEmail],
    systemPrompt: `
You are an email assistant.
Compose professional emails from natural language requests.
Extract recipient info, craft a subject line and body.
Use send_email to send the message.
Always confirm what was sent in your final response.
    `.trim(),
    middleware: [
        humanInTheLoopMiddleware({
            interruptOn: { send_email: true },
            descriptionPrefix: '✉️ Outbound email pending approval',
        }),
    ],
});

const contactAgent = createAgent({
    model,
    tools: [getContacts],
    systemPrompt: `
You are a contact assistant.
Find contact records based on team name or person name.
Use get_contacts to retrieve the contact list.
    `.trim(),
});


/* SECTION 5: SUPERVISOR TOOLS (wrap each sub-agent as a callable tool) */

const scheduleEvent = tool(
    async ({ request }) => {
        const result = await calendarAgent.invoke({
            messages: [{ role: 'user', content: request }],
        });
        const last = result.messages[result.messages.length - 1];
        return typeof last.content === 'string' ? last.content : JSON.stringify(last.content);
    },
    {
        name: 'schedule_event',
        description: `
Schedule calendar events using natural language.
Use when the user wants to create, modify, or check calendar appointments.
Input: e.g. "Design team ke saath aglae mangalvar 2pm meeting"
        `.trim(),
        schema: z.object({
            request: z.string().describe('Natural language scheduling request'),
        }),
    }
);

const manageEmail = tool(
    async ({ request }) => {
        const result = await emailAgent.invoke({
            messages: [{ role: 'user', content: request }],
        });
        const last = result.messages[result.messages.length - 1];
        return typeof last.content === 'string' ? last.content : JSON.stringify(last.content);
    },
    {
        name: 'manage_email',
        description: `
Send emails using natural language.
Use when the user wants to send notifications, reminders, or any email.
Input: e.g. "Unhe meeting ki reminder bhejo"
        `.trim(),
        schema: z.object({
            request: z.string().describe('Natural language email request'),
        }),
    }
);

const manageContacts = tool(
    async ({ request }) => {
        const result = await contactAgent.invoke({
            messages: [{ role: 'user', content: request }],
        });
        const last = result.messages[result.messages.length - 1];
        return typeof last.content === 'string' ? last.content : JSON.stringify(last.content);
    },
    {
        name: 'manage_contacts',
        description: `
Look up contacts using natural language.
Use when the user wants a list of contacts or a specific person's details.
Input: e.g. "Design team ke saare contacts do"
        `.trim(),
        schema: z.object({
            request: z.string().describe('Natural language contact request'),
        }),
    }
);


/**
 * SECTION 6: SUPERVISOR AGENT
 * The supervisor sees only the three high-level tools above.
 * It decides the order of calls and synthesizes the final response.
 *
 * Checkpointer (MemorySaver) is REQUIRED for human-in-the-loop:
 *   - Saves graph state when an interrupt occurs
 *   - Resumes from exactly that point after human decides
 *   - In production: swap MemorySaver with SqliteSaver / PostgresSaver
*/
const supervisorAgent = createAgent({
    model,
    tools: [scheduleEvent, manageEmail, manageContacts],
    systemPrompt: `
You are a helpful personal assistant.
You can schedule calendar events and send emails.

Rules:
- To send emails, ALWAYS call manage_contacts first to get email addresses.
- When a request has multiple steps, call tools in the correct order.
- If the user REJECTS an action: acknowledge it, do NOT retry or show a draft.
- Ask what the user wants to do instead.
    `.trim(),
    checkpointer: new MemorySaver(),
});


/**
 * SECTION 7: TYPE DEFINITION FOR INTERRUPT PAYLOAD
 *
 * When a tool is interrupted, LangGraph sets result.__interrupt__
 * Each interrupt item has this shape:
 *
 *   {
 *     id: "unique-string",           ← key for resume object
 *     value: {
 *       actionRequest: [{
 *         description: "...",         ← human-readable label
 *         action: {
 *           name: "send_email",       ← tool that was intercepted
 *           args: { to, subject, ... }← arguments AI prepared
 *         }
 *       }],
 *       reviewConfigs: [{
 *         allowedDecisions: ["approve", "edit", "reject"]
 *       }]
 *     }
 *   }
*/

type InterruptValue = {
    actionRequest: {
        description: string;
        action: {
            name: string;
            args: Record<string, any>;
        };
    }[];
    reviewConfigs: {
        allowedDecisions: string[];
    }[];
};


/* SECTION 8: MAIN LOOP */

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('🤖 SUPERVISOR WITH HUMAN-IN-THE-LOOP');
    console.log('='.repeat(60));
    console.log('\nFeatures:');
    console.log('  📅 Calendar scheduling  (with human review)');
    console.log('  ✉️  Email sending        (with human review)');
    console.log('  👥 Contact lookup       (automatic)');
    console.log('\nWhen prompted for review:');
    console.log('  1 → Approve   (run as-is)');
    console.log('  2 → Edit      (modify args, then run)');
    console.log('  3 → Reject    (cancel action)');
    console.log('\nType /bye to exit.\n');

    /**
     * thread_id groups all turns of one conversation together
     * in the checkpointer — change it to start a fresh session 
    */
    const config = { configurable: { thread_id: '1' } };
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    /**
     * Holds any pending interrupt across loop iterations
     * (one interrupt = one human decision required)
    */
    let interrupts: any[] = [];

    while (true) {
        const query = await rl.question('\n👤 You: ');

        if (query.toLowerCase() === '/bye') {
            console.log('\n👋 Bye! Shukriya!\n');
            break;
        }

        /**
         * ── STEP A: Build the resume object ───────────────────────────
         * resume maps interrupt.id → human decision
         * It will be empty ({}) on normal turns (no pending interrupt)
        */
        const resume: Record<string, any> = {};

        if (interrupts.length) {
            const interrupt = interrupts[0];

            if (query === '2') {
                /**
                 * ── EDIT decision ──────────────────────────────────────
                 * 1. Get the action the AI wanted to run
                 * 2. Clone it and change the args you want to modify
                 * 3. Pass it back as type: 'edit'
                */
                const actionRequest = (interrupt.value as InterruptValue).actionRequest[0];
                const editedAction = {
                    ...actionRequest.action,
                    args: { ...actionRequest.action.args }, // shallow clone args
                };

                /** Demo: auto-prepend 🎯 to email subject */
                if (editedAction.name === 'send_email') {
                    editedAction.args.subject = '🎯 ' + editedAction.args.subject;
                    console.log(`\n✏️  Subject updated to: "${editedAction.args.subject}"`);
                }

                resume[interrupt.id] = {
                    decisions: [{ type: 'edit', editedAction }],
                };

            } else {
                /** ── APPROVE or REJECT decision ─────────────────────────
                 * type: 'approve' → tool runs with original args
                 * type: 'reject'  → tool is cancelled, AI acknowledges
                */
                const decisionType = query === '1' ? 'approve' : 'reject';
                console.log(`\n${decisionType === 'approve' ? '✅ Approved' : '❌ Rejected'}`);
                resume[interrupt.id] = {
                    decisions: [{ type: decisionType }],
                };
            }
        }

        /** ── STEP B: Invoke the supervisor ──────────────────────────────
         * If there's a pending interrupt → send Command({ resume }) to resume
         * Otherwise → send a fresh message as usual
        */
        const result = await supervisorAgent.invoke(
            interrupts.length
                ? new Command({ resume })                          // resume paused graph
                : { messages: [{ role: 'user', content: query }] }, // new user turn
            config
        );

        /** Clear now-handled interrupts before checking for new ones */
        interrupts = [];

        /*  ── STEP C: Handle result ── */
        if (result.__interrupt__) {
            /**
             * A tool was intercepted → save interrupt and prompt human
            */
            interrupts.push(result.__interrupt__[0]);

            const iv = result.__interrupt__[0].value as InterruptValue;
            const { description, action } = iv.actionRequest[0];
            const decisions = iv.reviewConfigs[0].allowedDecisions;

            console.log('\n' + '─'.repeat(60));
            console.log('🔴 REVIEW REQUIRED');
            console.log('─'.repeat(60));
            console.log(`\n${description}`);
            console.log('\nArguments:');
            Object.entries(action.args).forEach(([k, v]) => {
                console.log(`  ${k}: ${JSON.stringify(v)}`);
            });
            console.log('\nOptions:');
            decisions.forEach((d, i) => console.log(`  ${i + 1}. ${d}`));
            console.log('─'.repeat(60));

        } else {
            /** No interrupt → normal final response from supervisor */
            const last = result.messages[result.messages.length - 1];
            console.log(`\n🤖 Assistant: ${last.content}`);
        }
    }

    rl.close();
}

main();