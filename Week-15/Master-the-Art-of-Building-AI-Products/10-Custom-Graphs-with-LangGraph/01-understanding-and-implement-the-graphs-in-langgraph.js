/**
 * Problem with our ReAct Agent:
 * > Right now our ReAct agent works fine for a single question and answer.
 *   But it has one big problem — it has no memory.
 * > Every time you call agent.invoke(), it starts fresh. It has no idea
 *   what was said before. So if you ask:
 *   - User: My name is Aslam.
 *   - User: What is my name?
 * > The agent will say "I don't know" — because it forgot the first 
 *   message. Each call is completely independent.
 * > This is fine for simple one-off tasks, but for a real chatbot — 
 *   where the user has a back and forth conversation — this is a 
 *   serious limitation.
 * 
 * > If you need:
 *   - Multi-Step Tool Loops
 *   - Conditional Routing
 *   - Dynamic Branching
 *   - Multiple Tool Execution Paths
 *   - Structured State Management
 *   - Long-running Workflows
 * > Then MemorySaver is not enough, because MemorySaver only stores
 *   chat history.
*/

/**
 * How LangGraph solves this:
 * > LangGraph introduces the concept of State — a memory that persists 
 *   across multiple steps and turns of the conversation.
 * > Instead of User > Agent > Answer(done). It becomes:
 *   User > Node > Node > Node > Answer.
 *   And throughout this process, state is passed and updated.
 * 
 * > LangGraph lets you define:
 *   a. Nodes: Individual steps (LLM Call, Tool Call, etc.)
 *   b. Edges: How the flow moves b/w nodes
 *   c. State: Shared memory object that persists across steps
 * > So the flow becomes: User Message
 *                        -> Model Thinks
 *                        -> Tool runs
 *                        -> Model thinks again
 *                        -> Final Answer
 *   And all of this shares the same memory, and this is what enables:
 *   - Multi-Step Reasoning
 *   - Tool Loops
 *   - Conversation Context
 *   - Persistent Workflows
 * 
 * > In one clean line:
 *   - ReAct alone = Stateless Reasoning
 *   - LangGraph   = Structured Reasoning + Persistent State
*/

/**
 * Example Veg Biryani Graph:
 * 
 * +-------------------+
 * |      Start        |
 * +-------------------+
 *          |
 *          V
 * +-------------------+  Node
 * | Cut the Vegetable |--------------------+
 * +-------------------+                    |
 *          | Edge                          |
 *          V                               |      Knife
 * +-------------------+  Node              |    +-------+
 * | Boil the Rice     |--------------------+--->| State |
 * +-------------------+                    |    +-------+
 *          | Edge                          |
 *          V                               |
 * +-------------------+  Node              |
 * | Add Salt          |--------------------+
 * +-------------------+<------+
 *          | Edge             |
 *          V                  |Conditional Edge
 * +-------------------+  Node |
 * | Taste the Biryani |-------+
 * +-------------------+
 *          | Conditional Edge
 *          V
 * +-------------------+
 * |       End         |
 * +-------------------+
 * 
 * Note: Start and End is in-built in LangGraph.
*/


import { StateGraph, MessagesAnnotation, END } from '@langchain/langgraph'
import { writeFileSync } from 'node:fs';

/**
 * Cut the Vegetable:
*/

function cutTheVegetables(state) {
    console.log("Cutting the vegetables....");
    return state;
}


/**
 * Boil the Rice
*/

function boilTheRice(state) {
    console.log("Boiling the rice....")
    return state;
}


/**
 * Add Salt:
*/

function addSalt(state) {
    console.log("Adding Salt");
    return state;
}


/**
 * Taste the Biryani
*/

function tasteTheBiryani(state) {
    console.log('Tasting the Biryani');
    return state;
}

/**
 * Where to go? [Conditional Edge]
*/
function whereToGo() {
    if (true) {
        return "__end__"
    } else {
        return "addSalt"
    }
}


/**
 * Define a new graph
 * > MessageAnnotation: storing states in memory storage
 * > Create node      : addNode("nodeName", reference)
 * > Create node path : addEdge(from, to)
 * > Conditonal Edge  : addConditionalEdges()
*/
const graph = new StateGraph(MessagesAnnotation)
    .addNode("cutTheVegetables", cutTheVegetables)
    .addNode("boilTheRice", boilTheRice)
    .addNode("addSalt", addSalt)
    .addNode("tasteTheBiryani", tasteTheBiryani)
    .addEdge("__start__", "cutTheVegetables")
    .addEdge("cutTheVegetables", "boilTheRice")
    .addEdge("boilTheRice", "addSalt")
    .addEdge("addSalt", "tasteTheBiryani")
    .addConditionalEdges("tasteTheBiryani", whereToGo, {
        "__end__": END,
        "addSalt": "addSalt"
    })


/* Ready to Execute */
const biryaniProcess = graph.compile();


async function main() {
    /**
     * Save the Graph Visualization as a PNG Image (Optional):
     */
    const drawableGraph = biryaniProcess.getGraph();
    const graphImage = await drawableGraph.drawMermaidPng();
    const graphArrayBuffer = await graphImage.arrayBuffer();
    writeFileSync("./biryaniState.png", new Uint8Array(graphArrayBuffer));
    console.log("Graph saved to: ./biryaniState.png");

    /* Invoke the Graph */
    const final = await biryaniProcess.invoke({
        messages: [], /* Initial State */
    })

    console.log('Final', final);
}

main();