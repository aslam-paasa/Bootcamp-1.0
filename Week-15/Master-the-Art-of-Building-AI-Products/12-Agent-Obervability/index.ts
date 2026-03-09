/**
 * AGENT OBSERVABILITY & TRACING
 *
 * 1. What is Agent Observability?
 * Agent Observability means the ability to monitor,
 * inspect, and understand everything your AI agent
 * is doing internally.
 *
 * Instead of only seeing the final answer,
 * we can see:
 *
 *   - What input the agent received
 *   - What the LLM saw
 *   - What the LLM responded
 *   - Whether a tool was called
 *   - What arguments were passed to the tool
 *   - What the tool returned
 *   - How many steps were executed
 *   - Where an error occurred
 *
 * In short:
 * Observability = Full visibility into agent behavior.
 *
 *
 * 2. What is Tracing?
 * Tracing is a part of observability.
 *
 * A trace records the complete execution path
 * of ONE user request.
 *
 * Example:
 *
 *   User: "Create meeting at 4PM"
 *
 *   Trace:
 *     Step 1 → Assistant Node executed
 *     Step 2 → Tool call generated (create-event)
 *     Step 3 → Tool executed
 *     Step 4 → Tool result returned
 *     Step 5 → Final response generated
 *     Total Time: 1.2s
 *     Tokens Used: 840
 *
 * That full record is called a "trace".
 *
 *
 * 3. Why Observability & Tracing Matter
 * AI agents are multi-step systems:
 *
 *   User → LLM → Tool → LLM → Output
 *
 * Many components are involved:
 *   - LLM reasoning
 *   - Tool execution
 *   - External APIs
 *   - Memory state
 *   - Graph transitions
 *
 * Without observability:
 *   You only see the final output.
 *
 * With observability:
 *   You understand how the output was produced.
 *
 * This helps in:
 *   - Debugging wrong tool calls
 *   - Fixing incorrect reasoning
 *   - Detecting infinite loops
 *   - Monitoring latency
 *   - Measuring token usage & cost
 *   - Tracking production errors
 *
 *
 * 4. What Should Be Observable in an Agent?
 *
 *   ✔ LLM Inputs
 *   ✔ LLM Outputs
 *   ✔ Tool Calls (name + arguments)
 *   ✔ Tool Results
 *   ✔ Graph Node Transitions
 *   ✔ Memory State
 *   ✔ Execution Time
 *   ✔ Token Usage
 *
 *
 * 5. Tools for Observability & Tracing
 *
 * 🔵 LangSmith
 *   - Built by LangChain team
 *   - Deep integration with LangChain & LangGraph
 *   - Automatically traces:
 *       • LLM calls
 *       • Tool calls
 *       • Graph execution
 *       • Token usage
 *   - Provides dashboard to inspect traces
 *
 *   Best for:
 *       Projects built with LangChain/LangGraph.
 *
 *
 * 🟣 Langfuse
 *   - Open-source observability platform
 *   - Framework-independent
 *   - Works with any LLM system
 *   - Tracks:
 *       • Prompts
 *       • Tool execution
 *       • Latency
 *       • Costs
 *       • User sessions
 *
 *   Best for:
 *       Custom or large-scale AI systems.
 *
 *
 * 6. Final Understanding
 *
 * Observability = The ability to monitor the agent.
 *
 * Tracing = The detailed execution record of a single request.
 *
 * LangSmith and Langfuse are platforms that:
 *   - Collect traces
 *   - Store execution data
 *   - Visualize internal behavior
 *   - Help debug and monitor production systems
 *
 * In modern AI systems,
 * observability and tracing are essential
 * for reliability, debugging, and scaling.
 */

/**
 * Setting up LangSmith: (Partial Free)
 * 1. Login LangSmith
 * 2. Create Tracing Project: calendar-agent
 * 3. Install dependencies  : npm install langsmith
 * 4. Configure Environment :
 *    LANGSMITH_TRACING=true
 *    LANGSMITH_ENDPOINT=https://api.smith.langchain.com
 *    LANGSMITH_API_KEY=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
 *    LANGSMITH_PROJECT="calendar-agent"
 * 5. Run bun run index.js and ask questions
 * 6. Go to langsmith for tracing & monitoring
*/

/**
 * Setting up Langfuse: (Free)
 * 1. Get a copy of the latest langfuse repository & start app:
 *    - git clone https://github.com/langfuse/langfuse.git
 *    - cd langfuse
 *    - docker compose up
 * 2. Go to langfuse website
 *    - Create Organization: codersgyan
 *    - We can create multiple projects inside this orgz
 *    - Create Project: calendar-agent
*/

import readline from 'node:readline/promises';
import { ChatGroq } from '@langchain/groq';
import { createEventTool, getEventsTool } from './tools';
import { END, MemorySaver, MessagesAnnotation, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import type { AIMessage } from '@langchain/core/messages';
import { CallbackHandler } from "@langfuse/langchain";
 
/* Initialize the Langfuse CallbackHandler */
const langfuseHandler = new CallbackHandler({
    publicKey: process.env.LANGFUSE_PUBLIC_KEY,
    secretKey: process.env.LANGFUSE_SECRET_KEY,
    baseUrl: process.env.LANGFUSE_BASE_URL,
    sessionId: "my-custom-session-id"
});

const tools = [createEventTool, getEventsTool];

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: 'openai/gpt-oss-120b',
    temperature: 0,
}).bindTools(tools);


async function callModel(state: typeof MessagesAnnotation.State) {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
}


const toolNode = new ToolNode(tools);

function shouldContinue(state: typeof MessagesAnnotation.State) {
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;

    if (lastMessage.tool_calls?.length) {
        return 'tools';
    }

    return '__end__';
}


const graph = new StateGraph(MessagesAnnotation)
    .addNode('assistant', callModel)
    .addNode('tools', toolNode)
    .addEdge('__start__', 'assistant')
    .addEdge('tools', 'assistant')
    .addConditionalEdges('assistant', shouldContinue, {
        __end__: END,
        tools: 'tools',
    });


const checkpointer = new MemorySaver();


const app = graph.compile({ checkpointer });


async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const config = { configurable: { thread_id: '1' }, callbacks: [langfuseHandler] };

    console.log('🤖 Google Calendar Assistant started. Type /bye to exit.\n');

    while (true) {
        const userInput = await rl.question('You: ');

        if (userInput.trim() === '/bye') {
            console.log('Goodbye! 👋');
            break;
        }

        if (!userInput.trim()) {
            continue;
        }

        try {
            const currentDateTime = new Date().toLocaleString('sv-SE').replace(' ', 'T');
            const timeZoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const result = await app.invoke(
                {
                    messages: [
                        {
                            role: 'system',
                            content: `  You are a smart personal assistant that helps manage Google Calendar.
                                        Current datetime: ${currentDateTime}
                                        Current timezone: ${timeZoneString}

                                        When creating events:
                                        - If the user does not specify a duration, default to 1 hour.
                                        - If the user says "fill details yourself", infer a reasonable summary and time.
                                        - attendee displayName is optional — only include it if the user provides a name.
                                        - Always confirm what you created with the event title, time, and Meet link.

                                        When fetching events:
                                        - Use a broad search query if the user is not specific.
                                        - Summarize events clearly: title, time, attendees, and Meet link if available.`,
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
            console.log('\nAI:', lastMessage.content, '\n');
        } catch (err) {
            console.error('Error invoking graph:', err);
        }
    }

    rl.close();
}

main();