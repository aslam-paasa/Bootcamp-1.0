/**
 * Email Sending Agent: Human-in-the-Loop in the Graph
 * > https://docs.langchain.com/oss/javascript/langchain/supervisor
 * > Common Human-in-a-loop Patterns:
 *   1. Approval Workflow        [done]
 *   2. Review and Edit          [done]
 *   3. Interrupting Tools Calls [done]
 *   4. Validating Human Input
 * 
 *                    +-------+
 *                    | start |
 *                    +-------+
 *                        |
 *                    +-------+    +-----+
 *          +-------->| draft |    | LLM |
 *          |         +-------+    +-----+
 *          |             |
 *    +-----------+   +-------+    +----------------------+
 *    | Interrupt |   | send  |    | Internet (Gmail API) |
 *    +-----------+   +-------+    +----------------------+
 *                        |
 *                    +-------+
 *                    |  end  |
 *                    +-------+
*/

import readline from 'node:readline/promises'
import { Annotation, Command, END, interrupt, MemorySaver, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";

const State = Annotation.Root({
    ...MessagesAnnotation.spec,
    firstDraft: Annotation<string>,
    approved: Annotation<boolean>
});


async function draft(state: typeof State.State) {
    console.log("draft is ready")
    // llm call
    return { firstDraft: "This is our first draft" };
}

async function approval(state: typeof State.State) {
    const approved = interrupt('Do you approve this action?');
    if (approved === 'true') {
        return { approved: true }
    } else {
        return { approved: false }
    }

}

async function send(state: typeof State.State) {
    // todo: send email through email apis

    if (state.approved) {
        console.log("sending email: ", state.firstDraft)
        return { messages: [{ role: 'assistant', content: `Done!` }] }
    } else {
        return {
            messages: [{ role: 'assistant', content: `You didn't approve the action` }]
        };
    }
}

/* Build Graph */
const graph = new StateGraph(State)
    .addNode("draft", draft)
    .addNode('approval', approval)
    .addNode("send", send)
    .addEdge(START, "draft")
    .addEdge('draft', 'approval')
    .addEdge('approval', 'send')
    .addEdge('send', END);

/* Compile Graph */
const app = graph.compile({ checkpointer: new MemorySaver() });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    const config = { configurable: { thread_id: '1' } }
    let interrupts = [];

    while (true) {
        const query = await rl.question("You: ");
        if (query === '/bye') break;


        const input = {
            messages: [
                {
                    role: "human",
                    content: query,
                },
            ]
        }

        if (interrupts.length) {
            input = new Command({ resume: query === 'yes' ? 'true' : 'false' })
        }

        const result = await app.invoke(input, config);
        interrupts = [];

        type StateWithInterrupt = typeof State.State & {
            __interrupt__: { id: string, value: string }[];
        };

        const _result = (result as StateWithInterrupt).__interrupt__;

        if (_result) {
            // take user input then reinvoke
            interrupts.push(_result[0]);
            console.log('AI: ', _result[0].value);
        } else {
            console.log('AI: ', result.messages[result.messages.length - 1].content);
        }
        // console.log('finalState:', JSON.stringify(result, null, 2));
    }
    rl.close();
}

main();