/**
 * LangChain vs LangGraph:
 * > Both LangChain and LangGraph are frameworks used to build
 *   AI agents and LLM-powered applications.
 * > But they solve slightly different problems.
 *
 *
 * What is LangChain?
 * > LangChain is a high-level framework for building LLM applications
 *   quickly.
 * > It helps you:
 *   - Connect LLMs to tools
 *   - Add memory
 *   - Chain multiple steps together
 *   - Build simple agents
 *
 * > Think of LangChain as: A toolkit for building AI apps fast.
 * > Example Use Cases:
 *   - Chatbots
 *   - Document Q&A
 *   - Tool calling apps
 *   - Retrieval-augmented generation (RAG)
 *
 *
 * Flow in LangChain:
 * > User Input
 *      ↓
 * > LLM decides
 *      ↓
 * > Tool call
 *      ↓
 * > Final answer
 *
 *
 * What is LangGraph?
 * > LangGraph is built on top of LangChain.
 * > It is used for building more advanced, multi-step, stateful, and 
 *   controllable AI agents.
 * > Instead of simple chains, it uses a graph-based architecture.
 *
 * > Think of LangGraph as: A workflow engine for complex AI agents.
 * > It allows:
 *   - Multi-step reasoning
 *   - Loops
 *   - Conditional branching
 *   - Persistent state
 *   - Human-in-the-loop
 *
 *
 * Flow in LangGraph:
 * > User Input
 *      ↓
 * > Node 1 (Planning)
 *      ↓
 * > Node 2 (Tool execution)
 *      ↓
 * > Node 3 (Evaluation)
 *      ↓
 * > Loop if needed
 *      ↓
 * > Final output
 *
 *
 * Key Differences
 * > LangChain:
 *   - Easier to start
 *   - Good for simple agents
 *   - Linear workflow (chain-based)
 *
 * > LangGraph:
 *   - More control
 *   - Handles complex workflows
 *   - Graph-based (nodes + edges)
 *   - Better for production-scale agents
 *
 *
 * When Should You Use What?
 * > Use LangChain when:
 *   - Building simple AI tools
 *   - Learning agent basics
 *   - Fast prototyping
 *
 * > Use LangGraph when:
 *   - Building production-ready agents
 *   - Need multi-step workflows
 *   - Need retries / loops
 *   - Need state management
 *
 * Mental Model
 * a. LangChain = Simple linear pipeline      (Starter kit)
 * b. LangGraph = Structured workflow engine  (Advanced control system)
 */


/**
 * Langchain: One way workflow (DAG)
 * > Retrieve - Vector Database       > Start
 *     |                                 |
 *     V                                 V
 * > Generate - LLM                   > Generate
 *     |                                 |
 *     V                                 V
 * > Memory   - Database              > IsValid?
 *     |                                 |
 *     V                                 V
 * > Answer   - Programming          +---------+
 *                                   |         |
 *                                   V         V
 *                                  Yes       No
 *                                   |         |
 *                                   V         V
 *                                 Do this   Do this
 *                                   |         |
 *                                   +---------+
 *                                        |
 *                                        V
 *                                      Stop
*/

/**
 * Langgraph: Multi-way workflow (Graph) using loops
 * > It is also agent orchestrator.
 * 
 * >   Start
 *       |
 *       V
 * >   Generate (LLM)
 *       |
 *       V
 * >   Good? (LLM) <----+
 *       |              |
 *   +---------+        |
 *   |         |        |
 *   V         V        |
 *  Yes        No-------+
 *   |
 *   V
 *  Stop
*/