/**
 * Integrate Tavily Tool - Connect LLM with the web.
 * > Command: npm i @tavily/core
 * > Flow:
 *   1. User asks a question in terminal.
 *   2. LLM decides whether it needs to call webSearch().
 *   3. If tool is called → execute Tavily search.
 *   4. Send tool result back to LLM.
 *   5. LLM generates final answer.
 *
 * > LLM     = Brain
 * > Tavily  = Web Access
 * > Backend = Bridge between them
*/

import readLine from 'node:readline/promises'
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import dotenv from "dotenv";
dotenv.config();

/* Initialize APIs */
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {

    /* Create terminal interface */
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    /* Conversation memory */
    const messages = [
        {
            role: "system",
            content: `You are a smart personal assistant who answers the asked questions.
                You have access to following tools:
                - Use searchWeb({query}: {query: string}) to search the latest information and realtime data on the internet.
                - current date and time: ${new Date().toUTCString()}
                `,
        },
    ];

    /* Main chat loop: User Input */
    while (true) {

        const question = await rl.question('You: ')

        if (question === 'bye') {
            break;
        }

        messages.push({
            role: "user",
            content: question,
        });

        /* Tool execution loop */
        while (true) {

            /* Step-1: Ask LLM */
            const completion = await groq.chat.completions.create({
                model: "openai/gpt-oss-20b",
                temperature: 0,
                messages: messages,
                tools: [
                    {
                        type: "function",
                        function: {
                            name: "webSearch",
                            description: "Search the latest information and realtime data on the internet.",
                            parameters: {
                                type: "object",
                                properties: {
                                    query: {
                                        type: "string",
                                        description: "Search query to perform search on.",
                                    },
                                },
                                required: ["query"],
                            },
                        },
                    },
                ],
                tool_choice: "auto",
            });

            const message = completion.choices[0].message;
            messages.push(message);

            /* Step-2: If no tool call, break the loop and log final result */
            const toolCalls = completion.choices[0].message.tool_calls;
            if (!toolCalls) {
                console.log(`Assistant: ${completion.choices[0].message.content}`);
                break;
            }

            /* Step-3: Execute Tools Calls */
            for (const toolCall of toolCalls) {

                const functionName = toolCall.function.name;
                const functionParams = JSON.parse(toolCall.function.arguments);

                if (functionName === "webSearch") {

                    const toolResult = await webSearch(functionParams);

                    /* Add the result of the tool call to the messages array */
                    messages.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        content: toolResult,
                    });
                }
            }

        }
    }

    rl.close();
}

main();

/* Tool: Web Search - We are using tavily tool to search the web */
async function webSearch({ query }) {
    console.log("Calling web search");

    const response = await tvly.search(query);

    const finalResult = response.results
        .map((result) => result.content)
        .join("\n\n");

    return finalResult;
}