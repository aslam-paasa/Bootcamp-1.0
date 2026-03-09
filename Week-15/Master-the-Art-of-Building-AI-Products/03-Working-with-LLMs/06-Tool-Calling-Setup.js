/**
 * Tool Calling/Function Calling:
 * > Used to interact with external resources, such as APIs, databases
 *   and the web.
 * > Use: tavily tool - Connect your LLM to the Web
*/

import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
    /**
     * Step-1: First LLM Call 
     * a. messages   : This is the conversation history.
     * b. tools      : This tells the model what functions it can request. 
     * c. tool_choice: "auto" - Automatically choose whether to use the tool or not
     * */
    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        temperature: 0,
        messages: [
            {
                role: "system",
                content: `You are a smart personal assistant who answers the asked questions.
                You have access to following tools:
                1. webSearch({query}: {query: string})  // Search the latest information and realtime data on the internet.
                `,
            },
            {
                role: "user",
                content: `When was iphone 16 launched?`,
            },
        ],
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

    /* Step-2: If no tool call, just print answer */
    const toolCalls = completion.choices[0]?.message?.tool_calls;
    if (!toolCalls) {
        console.log(`Assistant: ${completion.choices[0]?.message?.content}`);
        return;
    }

    /* Step-3: Execute Tools */
    for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionParams = JSON.parse(toolCall.function.arguments);

        if (functionName === "webSearch") {
            const toolResult = await webSearch(functionParams);
            console.log(`Tool Result: ${toolResult}`);
        }
    }
}

main();

/* Tool: Web Search */
async function webSearch({ query }) {
    console.log('Calling webSearch() with query:', query);
    return "Iphone was launched on 20 Sep, 2024."
}