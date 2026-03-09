/**
 * Agentic Pattern: Reflexion
 * > Reflexion is like Reflection but with MEMORY. 
 * > The AI not only checks its work but also REMEMBERS past mistakes 
 *   to avoid them in the future.
 * 
 * Simple Definition:
 * 1. AI tries to answer
 * 2. AI gets feedback (from tools or self-check)
 * 3. AI saves lessons in memory
 * 4. AI uses those lessons for next attempts
 * 5. Repeat until success
 * 
 * Key difference from reflection:
 * > Reflection: "Let me check my answer and fix it"
 * > Reflexion : "Let me check my answer, REMEMBER what I did wrong, and
 *                use that memory for ALL future attempts"
 * 
 * Why Reflexion is needed?
 * > Problem: AI Repeats Same Mistakes
 *    Without memory, AI might:
 *     > Make same error miltiple times
 *     > Forget what didn't work before
 *     > Waste time on bad approaches
 * > Solution: Learn from Experience
 *    Like humans learning from mistakes, AI should:
 *     > Remember what went wrong
 *     > Avoid repeating errors
 *     > Get smarter with each try
 * 
 *     User Question ──▶ AI Creates Answer
 *                             │
 *                             ▼
 *                     Get Feedback (Tool/Check)
 *                             │
 *                             ▼
 *                 Save Lessons to Memory──┐
 *                             │           │
 *                             ▼           │
 *                 Is Answer Good? ──No────┘
 *                             │
 *                            Yes
 *                             ▼
 *                        Return Answer
 * 
 * > Three Core Components:
 *   1. ACTOR    : Creates answers/actions
 *   2. EVALUATOR: Checks if answer is good
 *   3. MEMORY   : Stores lessons from mistakes
*/

/**
 * Building Research Agent:
 *  +-----------+
 *  | __start__ |
 *  +-----------+
 *        |
 *        V
 *  +------------+
 *  | responsder |
 *  +------------+
 *        |
 *        V
 * +----------------+
 * | searchEcecutor |<-----------+
 * +----------------+            |
 *        |                      |
 *        V                      | N-times
 * +----------------+            |
 * |    revisor     |------------+
 * +----------------+
 *        |
 *        V
 * +----------------+
 * |     end        |
 * +----------------+
*/

import readline from 'node:readline/promises';
import { graph } from './src/graph';

async function main() {
    const app = graph.compile();

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    while (true) {
        const query = await rl.question('You: ');
        if (query === '/bye') break;

        console.log('\n🤔 Thinking...');
        const result = await app.invoke({
            messages: [{ role: 'user', content: query }],
        });

        console.log('='.repeat(80));
        console.log('Final Answer');
        console.log('='.repeat(80));

        const lastMessage = result.messages[result.messages.length - 1].content;

        console.log(JSON.parse(lastMessage as string).answer);
    }

    rl.close();
}

main();
