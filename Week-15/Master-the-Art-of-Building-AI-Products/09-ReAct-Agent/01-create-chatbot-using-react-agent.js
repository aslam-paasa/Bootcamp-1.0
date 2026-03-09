/**
 * LangGraph: Agentic Framework
 * > In traditional chatbot project, we often have to manually control
 *   every step of the agent's behavior. This includes:
 *   - Managing conversation state
 *   - Writing loop logic
 *   - Deciding when to call tools
 *   - Executing tools
 *   - Passing tool results back to the model
 *   - Handling errors and retries
 * > As the project grows, this manual control increases complexity and
 *   also increases the chances of bugs or inconsistent behavior.
 * 
 * > LangGraph is an agent framework that helps automate this flow.
 * > It allows us to define structured workflows (using nodes and edges)
 *   so that the framework itself manages:
 *   - State Persistence
 *   - Iterative reasoning loops
 *   - Tool execution
 *   - Conditional branching
 * > This reduces boilerplate code and makes the agent more reliable,
 *   scalable, and easier to maintain.
*/

/**
 * ReAct Agent: Reason + Act
 * > To build a chatbot, we will use LangGraph along with a ReAct Agent.
 * > ReAct Agent stands for "Reason + Act". It is a way of making the
 *   AI think step-by-step instead of directly giving the final answer.
 * > The flow is simple:
 *   1. Reason : The model thinks about the question
 *   2. Act    : If needed, it uses a tool (search, calculator, database)
 *   3. Observe: It looks at the result from the tool
 *   4. Repeat : It thinks again if more steps are needed
 *   5. Final Answer: Once it has enough information, it gives answer.
 * > So, instead of question > direct answer, it becomes:
 *   question > think > use tool > get result > think again > answer
 * > This makes the chatbot smarter because:
 *   - It can break big problems into smaller steps
 *   - It can use external tool when needed
 *   - It reduces wrong guesses
 * 
 * In simple words: 
 * > ReAct allows the AI to think first, act if needed, and then answer
*/

import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { TavilySearch } from "@langchain/tavily";

import dotenv from "dotenv";
dotenv.config();


async function main() {

    /* 1. Prepare the LLM Model */
    const model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: "llama-3.3-70b-versatile",
        temperature: 0,
    })

    /* 2. Prepare the Tool */
    const search = new TavilySearch({
        apiKey: process.env.TAVILY_API_KEY,
        maxResults: 5,
        topic: "general",
    })

    /* 3. Create ReAct Agent & Pass the LLM & Tool to the Agent */
    const agent = createReactAgent({
        llm: model,
        tools: [search],
    });

    /* 4. Prepare the User Message */
    const message = new HumanMessage("What is the current weather in Tokyo?");
    console.log(`User: ${message.content} \n`);

    /* 5. Call the Agent */
    const res = await agent.invoke({ messages: [message] });
    console.log(`Assistant: ${res.messages[res.messages.length - 1].content} \n\n`);
}

main();
