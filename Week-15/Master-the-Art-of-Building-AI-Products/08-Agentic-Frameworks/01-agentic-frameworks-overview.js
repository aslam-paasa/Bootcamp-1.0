/**
 * Agentic Framework – Overview
 * > Now that we understand what an Agent is,
 * > let’s understand what an Agentic Framework does.
 *
 * What is an Agentic Framework?
 * > An Agentic Framework is a system or structure that helps us
 *   build AI Agents easily and reliably.
 * > Instead of manually handling:
 *   - Tool calls
 *   - Memory
 *   - Decision making
 *   - Step-by-step reasoning
 * > The framework manages all of this for us.
 *
 *
 * Why Do We Need It?
 * > Building an agent manually becomes complex when:
 *   - There are multiple tools
 *   - Tasks require multiple steps
 *   - The agent needs memory
 *   - The agent must retry if something fails
 *   - The agent must plan before acting
 * > A framework organizes all of this logic.
 *
 *
 * Core Components of an Agentic Framework:
 *
 * 1. LLM (Brain)
 *    - Understands goal
 *    - Decides next action
 *
 * 2. Tools (Actions)
 *    - Web search
 *    - Database queries
 *    - File reading
 *    - API calls
 *
 * 3. Memory
 *    - Stores conversation history
 *    - Stores intermediate results
 *
 * 4. Planner (Optional but Powerful)
 *    - Breaks large task into smaller steps
 *
 * 5. Executor
 *    - Runs tools
 *    - Feeds results back to LLM
 *
 *
 * Simple Flow Inside an Agentic Framework
 * > User gives goal
 *        ↓
 * > Agent plans steps
 *        ↓
 * > Agent calls tool
 *        ↓
 * > Tool returns result
 *        ↓
 * > Agent evaluates result
 *        ↓
 * > Repeat until goal is completed
 *
 *
 * Difference from Normal LLM Usage
 * > Normal LLM:
 *   Input → Output
 * > Agentic Framework:
 *   Input → Plan → Act → Observe → Repeat → Final Output
 *
 *
 * Mental Model
 * > Without framework: You manually connect everything.
 * > With framework   : It gives you a structured architecture to build
 *                      reliable, scalable AI agents.
 */
