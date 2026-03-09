/**
 * Agentic Pattern-1: Reflection
 * > Reflection is when an AI checks its own work. 
 * > It's like asking yourself "Did I do this right?" before submitting
 *   an answer.
 * 
 * Simple Definition:
 * 1. AI creates an answer
 * 2. AI looks at its answer and finds problems
 * 3. AI fixes those problems
 * 4. Repeat until answer is good
 * 
 * Why Reflection is needed?
 * > Problem: AI makes mistakes
 *   - Wrong facts
 *   - Missing information
 *   - Bad logic
 *   - Unclear explanations
 *   - Not answering the real question
 * 
 * > Solution: Have AI checked itself
 *   Just like you check your homework before turning it in, AI should 
 *   check its answers before giving them to users. 
 * 
 *   User Question ──▶ AI Creates First Answer
 *                           │
 *                           ▼
 *                   AI Reviews Its Answer
 *                           │
 *                           ▼
 *               Does it have problems? ──▶ Yes ──▶ Fix Problems
 *                           │                            │
 *                           No                           │
 *                           │                            │
 *                           ▼                            │
 *                   Return Final Answer ◀────────────────┘ 
 * 
 * > Two Step Process:
 *   a. Generate: Create initial answer
 *   b. Reflect : Review and improve
*/

/**
 * LinkedIn Post Write
 *                   +-------+
 *                   | Start |
 *                   +-------+
 *                       |
 *                       V
 *                   +--------+
 *   +-------------->| Writer |
 *   |               +--------+
 *   |                   |               N-times = 5
 *   |                   V
 *   |           +---------------+
 *   |           |               |
 *   |           V               V
 *   |     +----------+      +-------+
 *   +-----| Critique |      |  End  |
 *         +----------+      +-------+
 * 
 * Note: No need for memory because we are not having conversation, we
 *       are just generating answer.
*/

import readline from 'node:readline/promises';
import { HumanMessage } from '@langchain/core/messages';
import { graph } from './src/graph';

async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const app = graph.compile();

    while (true) {
        const query = await rl.question('What you want me to write about?\n');

        if (query === '/bye') break;

        const result = await app.invoke({
            messages: [new HumanMessage(query)],
        });

        console.log(result.messages[result.messages.length - 1].content);
    }

    rl.close();
}

main();
