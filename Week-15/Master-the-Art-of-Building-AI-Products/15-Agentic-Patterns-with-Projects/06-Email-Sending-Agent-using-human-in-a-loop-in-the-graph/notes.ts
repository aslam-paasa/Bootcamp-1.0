/**
 * ======================================================================
 * EMAIL SENDING AGENT: HUMAN-IN-THE-LOOP DIRECTLY IN THE GRAPH
 * ======================================================================
 * Common Patterns:
 * 1. Approval Workflow
 * 2. Review and Edit
 * 3. Interrupting Tools Calls
 * 4. Validating Human Input
 * 
 * ARCHITECTURE OVERVIEW
 * ─────────────────────
 *
 *   USER INPUT
 *       │
 *       ▼
 *  ┌─────────┐
 *  │  START  │
 *  └────┬────┘
 *       │
 *       ▼
 *  ┌─────────┐      ┌─────┐
 *  │  draft  │◄─────│ LLM │   (composes the email)
 *  └────┬────┘      └─────┘
 *       │
 *       ▼
 *  ┌──────────┐
 *  │ approval │  ← 🔴 INTERRUPT HAPPENS HERE
 *  └────┬─────┘     graph pauses, waits for human input
 *       │
 *       ▼
 *  ┌─────────┐      ┌──────────────────────┐
 *  │  send   │─────►│ Internet (Gmail API) │
 *  └────┬────┘      └──────────────────────┘
 *       │
 *       ▼
 *  ┌─────────┐
 *  │   END   │
 *  └─────────┘
 *
 * ======================================================================
 * HOW THIS DIFFERS FROM MIDDLEWARE APPROACH
 * ======================================================================
 *
 * There are TWO ways to add human-in-the-loop in LangGraph:
 *
 *  A) MIDDLEWARE (previous pattern):
 *     - Interrupt is attached to a specific tool call
 *     - Framework handles pause/resume automatically
 *     - Best for: agent + tools patterns
 *
 *  B) GRAPH NODE (this pattern):
 *     - You create an explicit "approval" node in the graph
 *     - You call interrupt() yourself inside that node
 *     - Graph pauses at that node until resume is provided
 *     - Best for: custom multi-step workflows with clear stages
 *
 *  Comparison:
 *  ┌───────────────────┬──────────────────┬──────────────────────┐
 *  │                   │ Middleware        │ Graph Node           │
 *  ├───────────────────┼──────────────────┼──────────────────────┤
 *  │ Where interrupt   │ Inside tool call  │ Dedicated node       │
 *  │ Who calls it      │ Framework         │ You (interrupt())    │
 *  │ Flexibility       │ Per-tool          │ Any point in graph   │
 *  │ Best for          │ Agent + tools     │ Linear pipelines     │
 *  └───────────────────┴──────────────────┴──────────────────────┘
 *
 * ======================================================================
 * EXECUTION FLOW EXAMPLE
 * ======================================================================
 *
 * User: "Send an email to the design team about tomorrow's meeting"
 *
 *  [1] draft node runs
 *      → LLM composes email body
 *      → Saves to state.firstDraft
 *
 *  [2] approval node runs
 *      → interrupt() is called with question string
 *      → 🔴 GRAPH PAUSES — no further nodes execute
 *      → result.__interrupt__ is set on the returned state
 *      → User sees: "Do you approve this action?"
 *
 *  [3] User types "yes" or "no"
 *      → Command({ resume: 'true' or 'false' }) is sent
 *      → Graph RESUMES from approval node
 *      → interrupt() returns the resume value ('true'/'false')
 *      → state.approved is set accordingly
 *
 *  [4] send node runs
 *      → Checks state.approved
 *      → If true:  sends email via Gmail API, replies "Done!"
 *      → If false: replies "You didn't approve the action"
 *
 *  [5] Graph reaches END
 *
 * ======================================================================
 * KEY CONCEPTS & KEYWORDS EXPLAINED
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. interrupt()                                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  A LangGraph function you call INSIDE a node to pause     │
 * │        the graph and send a value to the caller.                │
 * │                                                                 │
 * │ How:   interrupt(value) does TWO things:                        │
 * │          1. Attaches value to result.__interrupt__[0].value     │
 * │          2. Pauses execution — the node does NOT continue       │
 * │        When resumed, interrupt() RETURNS the resume value.      │
 * │                                                                 │
 * │ Shape: const userAnswer = interrupt('Your question here');      │
 * │        // userAnswer === whatever was passed to Command.resume  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   async function approvalNode(state) {                          │
 * │     // Pauses here, sends 'question' to result.__interrupt__    │
 * │     const answer = interrupt('Do you approve?');                │
 * │                                                                 │
 * │     // Resumes here with the value from Command({ resume: ... })│
 * │     return { approved: answer === 'true' };                     │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Command({ resume })                                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Sent instead of a normal input to resume a paused graph. │
 * │        The resume value is passed directly back to interrupt()  │
 * │        as its return value.                                     │
 * │                                                                 │
 * │ Difference from supervisor pattern:                             │
 * │   Supervisor:  resume = { [interrupt.id]: { decisions: [...] }} │
 * │   This pattern: resume = any value (string, object, etc.)      │
 * │   Simpler here because interrupt() returns it directly.         │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   // Normal first turn:                                         │
 * │   await app.invoke({ messages: [...] }, config);                │
 * │                                                                 │
 * │   // Resume after interrupt:                                    │
 * │   await app.invoke(                                             │
 * │     new Command({ resume: 'true' }),  // ← goes to interrupt()  │
 * │     config                                                      │
 * │   );                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Annotation / State                                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  Defines the shape of data that flows through the graph.  │
 * │        Each node reads from and writes to this shared state.    │
 * │                                                                 │
 * │ MessagesAnnotation.spec → adds a messages[] array automatically │
 * │ Annotation<T>           → adds a custom field of type T         │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const State = Annotation.Root({                               │
 * │     ...MessagesAnnotation.spec, // includes messages[]          │
 * │     firstDraft: Annotation<string>,   // ← custom field        │
 * │     approved:   Annotation<boolean>,  // ← custom field        │
 * │   });                                                           │
 * │                                                                 │
 * │   // Access in any node:                                        │
 * │   async function myNode(state: typeof State.State) {            │
 * │     console.log(state.firstDraft); // read                      │
 * │     return { approved: true };     // write (merges into state) │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. StateGraph / compile / checkpointer                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  StateGraph builds the execution graph by wiring nodes    │
 * │        and edges. compile() produces a runnable app.            │
 * │                                                                 │
 * │ checkpointer is REQUIRED for interrupt() to work:               │
 * │   - Saves state snapshot before each node                       │
 * │   - When interrupt() fires, snapshot is frozen                  │
 * │   - When Command({ resume }) arrives, snapshot is restored      │
 * │   - MemorySaver = in-memory (dev only)                          │
 * │   - Production: SqliteSaver, PostgresSaver, RedisSaver          │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const app = new StateGraph(State)                             │
 * │     .addNode('draft',    draftFn)                               │
 * │     .addNode('approval', approvalFn)  // ← interrupt lives here │
 * │     .addNode('send',     sendFn)                                │
 * │     .addEdge(START,      'draft')                               │
 * │     .addEdge('draft',    'approval')                            │
 * │     .addEdge('approval', 'send')                                │
 * │     .addEdge('send',     END)                                   │
 * │     .compile({ checkpointer: new MemorySaver() });              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. __interrupt__ on result                                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ What:  After invoke(), if the graph paused at an interrupt()    │
 * │        call, the result object has __interrupt__ set.           │
 * │                                                                 │
 * │ Shape: result.__interrupt__ = [{ id: string, value: any }]      │
 * │          .id    → internal interrupt ID (not needed here)       │
 * │          .value → whatever you passed to interrupt()            │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const result = await app.invoke(input, config);               │
 * │                                                                 │
 * │   if (result.__interrupt__) {                                   │
 * │     // Graph paused — show the question to the user             │
 * │     console.log(result.__interrupt__[0].value); // "Do you..."  │
 * │     interrupts.push(result.__interrupt__[0]);                   │
 * │   } else {                                                      │
 * │     // Graph finished — show the final message                  │
 * │     console.log(result.messages.at(-1).content);                │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. COMPLETE MAIN LOOP TEMPLATE                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                 │
 * │  let interrupts: any[] = [];                                    │
 * │                                                                 │
 * │  while (true) {                                                 │
 * │    const query = await getUserInput();                          │
 * │                                                                 │
 * │    // STEP A: Decide what to send to invoke()                   │
 * │    let input;                                                   │
 * │    if (interrupts.length) {                                     │
 * │      // Graph is paused → resume it with user's answer          │
 * │      input = new Command({ resume: query });                    │
 * │    } else {                                                     │
 * │      // Fresh turn → send a normal message                      │
 * │      input = { messages: [{ role: 'human', content: query }] }; │
 * │    }                                                            │
 * │                                                                 │
 * │    // STEP B: Run (or resume) the graph                         │
 * │    const result = await app.invoke(input, config);              │
 * │    interrupts = [];                                             │
 * │                                                                 │
 * │    // STEP C: Handle the result                                 │
 * │    if (result.__interrupt__) {                                  │
 * │      interrupts.push(result.__interrupt__[0]);                  │
 * │      console.log('AI:', result.__interrupt__[0].value);         │
 * │    } else {                                                     │
 * │      console.log('AI:', result.messages.at(-1).content);        │
 * │    }                                                            │
 * │  }                                                              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 */

// ======================================================================
// SECTION 1: IMPORTS
// ======================================================================

import readline from 'node:readline/promises';
import {
    Annotation,
    Command,
    END,
    interrupt,
    MemorySaver,
    MessagesAnnotation,
    START,
    StateGraph,
} from '@langchain/langgraph';


// ======================================================================
// SECTION 2: STATE DEFINITION
// ======================================================================
//
// State is the shared data object passed between all nodes.
// Each node can read any field and return an object to update fields.
//
//  messages    → inherited from MessagesAnnotation (conversation history)
//  firstDraft  → the email body composed by the LLM in the draft node
//  approved    → set in approval node based on human's yes/no answer

const State = Annotation.Root({
    ...MessagesAnnotation.spec,
    firstDraft: Annotation<string>,
    approved: Annotation<boolean>,
});


// ======================================================================
// SECTION 3: GRAPH NODES
// ======================================================================

/**
 * draft node
 * ──────────
 * Composes the email. In production this calls an LLM with the user's
 * request from state.messages and returns a polished draft.
 * For now it returns a stub string.
 */
async function draft(state: typeof State.State) {
    console.log('\n📝 Drafting email...');
    // TODO: Replace with actual LLM call:
    //   const response = await model.invoke(state.messages);
    //   return { firstDraft: response.content };
    return { firstDraft: 'This is our first draft' };
}

/**
 * approval node  ← 🔴 THE INTERRUPT LIVES HERE
 * ─────────────
 * Pauses the graph and asks the human to approve or reject.
 *
 * interrupt(value):
 *   - Sends `value` to the caller via result.__interrupt__[0].value
 *   - Freezes the node — execution stops here
 *   - When Command({ resume: answer }) arrives, returns `answer`
 *
 * So the node appears to run twice from the outside, but from the
 * code's perspective it just blocks on interrupt() and continues.
 */
async function approval(state: typeof State.State) {
    console.log('\n📋 Draft ready:\n', state.firstDraft);

    // Pause and ask human. Returns whatever was passed to Command.resume.
    const answer = interrupt('Do you approve sending this email? (yes/no)');

    return { approved: answer === 'true' };
}

/**
 * send node
 * ─────────
 * Executes (or skips) the email send based on state.approved.
 * In production this calls Gmail API / SendGrid.
 */
async function send(state: typeof State.State) {
    if (state.approved) {
        console.log('\n📤 Sending email:', state.firstDraft);
        // TODO: Replace with Gmail API call
        return { messages: [{ role: 'assistant', content: 'Done! Email sent successfully.' }] };
    } else {
        return { messages: [{ role: 'assistant', content: "Action cancelled — email was not sent." }] };
    }
}


// ======================================================================
// SECTION 4: BUILD AND COMPILE THE GRAPH
// ======================================================================
//
// Edges define the fixed execution order:
//   START → draft → approval → send → END
//
// compile({ checkpointer }) is REQUIRED for interrupt() to work.
// Without it, graph state is lost between .invoke() calls and
// the graph cannot resume from where it paused.

const graph = new StateGraph(State)
    .addNode('draft',    draft)
    .addNode('approval', approval)   // interrupt fires inside this node
    .addNode('send',     send)
    .addEdge(START,      'draft')
    .addEdge('draft',    'approval')
    .addEdge('approval', 'send')
    .addEdge('send',     END);

const app = graph.compile({ checkpointer: new MemorySaver() });


// ======================================================================
// SECTION 5: TYPE FOR INTERRUPT RESULT
// ======================================================================
//
// LangGraph doesn't export __interrupt__ in its type for invoke(),
// so we extend the state type manually to access it safely.

type StateWithInterrupt = typeof State.State & {
    __interrupt__: { id: string; value: string }[];
};


// ======================================================================
// SECTION 6: MAIN LOOP
// ======================================================================

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('📧 EMAIL AGENT WITH HUMAN-IN-THE-LOOP');
    console.log('='.repeat(60));
    console.log('\nHow it works:');
    console.log('  1. Type your email request');
    console.log('  2. Agent drafts the email');
    console.log('  3. You approve (yes) or reject (no)');
    console.log('  4. Email is sent only if approved');
    console.log('\nType /bye to exit.\n');

    // thread_id ties all turns of this conversation to the same
    // checkpointer snapshot — change it to start a fresh session
    const config = { configurable: { thread_id: '1' } };

    // Stores pending interrupts across loop iterations.
    // If this array has items, the graph is paused and waiting.
    let interrupts: any[] = [];

    while (true) {
        const query = await rl.question('\n👤 You: ');
        if (query === '/bye') break;

        // ── STEP A: Build input ────────────────────────────────────────
        // If the graph is paused (interrupts pending):
        //   → send Command({ resume }) so interrupt() gets the answer
        // Otherwise:
        //   → send a normal message to start a fresh graph run
        let input: { messages: { role: string; content: string }[] } | Command;

        if (interrupts.length) {
            // Convert "yes"/"no" to "true"/"false" — matches approval node check
            const resumeValue = query.toLowerCase() === 'yes' ? 'true' : 'false';
            input = new Command({ resume: resumeValue });
        } else {
            input = {
                messages: [{ role: 'human', content: query }],
            };
        }

        // ── STEP B: Invoke (or resume) the graph ───────────────────────
        const result = await app.invoke(input, config);

        // Clear interrupts now that we've resumed (or started fresh)
        interrupts = [];

        // ── STEP C: Handle the result ──────────────────────────────────
        const _result = (result as StateWithInterrupt).__interrupt__;

        if (_result) {
            // Graph paused at approval node → show the interrupt question
            // and save it so next user input is treated as a resume
            interrupts.push(_result[0]);
            console.log('\n🤖 AI:', _result[0].value);
            console.log('   (type "yes" to approve, "no" to reject)');
        } else {
            // Graph completed → show the final assistant message
            const last = result.messages[result.messages.length - 1];
            console.log('\n🤖 AI:', last.content);
        }
    }

    rl.close();
}

main();