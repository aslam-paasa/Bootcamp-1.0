import { writeFileSync } from "node:fs";
import readline from "node:readline/promises"
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGroq } from "@langchain/groq";
import { TavilySearch } from "@langchain/tavily";
import { tool } from "@langchain/core/tools";
import z from "zod";

import dotenv from "dotenv";
dotenv.config();

async function main() {
    /* 1. Prepare the LLM Model */
    const model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: "llama-3.3-70b-versatile",
        temperature: 0,
    });

    /**
     * 2. Prepare the Tools 
     *    a. Pre-built Tool: Tavily Web Search
     *    b. Custom Tool   : Calendar Event
    */
    const search = new TavilySearch({
        apiKey: process.env.TAVILY_API_KEY,
        maxResults: 5,
        topic: "general",
    });

    const calendarEvents = tool(
        async ({ query }) => {
            /* Google Calendar Logic goes here */
            return JSON.stringify({
                events: [
                    {
                        title: "Meeting with John",
                        date: "27 February, 2026",
                        time: "2PM",
                        location: "Google Meet",
                    },
                    {
                        title: "Meeting with Jane",
                        date: "28 February, 2026",
                        time: "3PM",
                        location: "Zoom",
                    },
                ],
            });
        },
        {
            name: "get-calendar-events",
            description: "Call to get the calendar events.",
            schema: z.object({
                query: z.string().describe("The query to use in your calendar event search."),
            }),
        }
    );

    /* 3. Create ReAct Agent */
    const agent = createReactAgent({
        llm: model,
        tools: [search, calendarEvents],
    });

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    /* 4. Call the Agent */
    while (true) {
        const userQuery = await rl.question("You: ")

        if (userQuery === 'bye') break;

        const res = await agent.invoke({
            messages: [
                {
                    role: "system",
                    content: `
                    You are a personal assistant.
                    Use provided tools to get the information if you don't have it.
                    Current date and time: ${new Date().toUTCString()}
                `,
                },
                {
                    role: "user",
                    content: userQuery
                },
            ],
        });
        console.log(`\nAssistant: ${res.messages[res.messages.length - 1].content} \n`);
    }

    rl.close();


    /**
     * 5. Save the Agent Graph Flow as a PNG Image (Optional):
     *    > LangGraph builds the agent as a graph of nodes and edges internally.
     *    > For example: call model → use tool → call model again → give answer.
     *
     * > getGraph() gives us that internal graph structure.
     * > drawMermaidPng() turns it into a PNG image using Mermaid diagrams.
     * > arrayBuffer() converts the image into raw binary data.
     * > writeFileSync() saves that binary data as a .png file on disk.
     *
     * This helps us visually understand how the agent thinks and acts.
     */
    // const drawableGraph = agent.getGraph();
    // const graphImage = await drawableGraph.drawMermaidPng();
    // const graphArrayBuffer = await graphImage.arrayBuffer();
    // writeFileSync("./graphState.png", new Uint8Array(graphArrayBuffer));
    // console.log("Graph saved to: ./graphState.png");


}

main();