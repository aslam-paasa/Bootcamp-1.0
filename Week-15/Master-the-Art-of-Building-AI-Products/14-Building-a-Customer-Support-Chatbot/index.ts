/**
 * Multi-Agent Customer Support Chatbot 
 * > Instead of one big agent handling everything:
 *   - Each agent specializes in one domain.
 *   - Tools are domain-specific.
 *   - Improves accuracy and scalability.
 *   - Easier to maintain and expand.
 * 
 * > Design Pattern Used:
 *   - Frontdesk            = Router Agent
 *   - Marketing Agent      = Specialist Agent
 *   - Learning Agent (RAG) = Specialist Agent
 * > This is called Multi-Agent Orchestration Architecture.
 * 
 *                        Frontdesk Agent
 *                       +----------------+
 *                       | +------------+ |   yes    +-------------------------+          +-----------------+
 *                       | | Marketing? |-+--------->| Marketing Support Agent |--------->| Marketing Tools |
 * +---------+    ask    | +------------+ |          +-------------------------+          +-----------------+
 * | Student |---------->|        | No    |                        |
 * +---------+           |        ↓       |                        |
 *                       | +------------+ |          yes           |                      +------------------------+         +----------+
 *                       | |  Learning? |-+------------------------+--------------------->| Learning Support Agent |-------->| Retrie↓ve |
 *                       | +------------+ |                        |                      +------------------------+         +----------+
 *                       +--------|-------+                        |                                    |
 *                                | No                             |                                    |
 *                                ↓                                |                                    |
 *                      +------------------+<----------------------+                                    |
 *                      | Respond directly |<-----------------------------------------------------------+
 *                      +------------------+
 * 
 * LangGraph Flow:
 *                               +-----------+
 *                               | Frontdesk |
 *                               +-----------+
 *                                     |
 *         +---------------------------+-------------------------+
 *         |                           |                         |
 *         ↓                           |                         ↓
 * +-----------------+                 |                 +----------------+
 * |    Marketing    |--------+        |        +--------|    Learning    |
 * +-----------------+        |        |        |        +----------------+
 *       ↑    |               |        |        |              ↑    |
 *       |    |               |        |        |              |    |
 *       |    ↓               |        |        |              |    ↓
 * +-----------------+        |        |        |        +----------------+
 * | Marketing Tools |        |        |        |        | Learning Tools |
 * +-----------------+        |        |        |        +----------------+
 *                            |        |        |    
 *                            ↓        ↓        ↓
 *                          +----------------------+
 *                          |         End          |
 *                          +----------------------+    
*/

/**
 * ======================================================================
 * MULTI-AGENT CUSTOMER SUPPORT CHATBOT - COMPLETE IMPLEMENTATION
 * ======================================================================
 * 
 * ████████╗██╗  ██╗███████╗    ██████╗  █████╗ ████████╗ █████╗ 
 * ╚══██╔══╝██║  ██║██╔════╝    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
 *    ██║   ███████║█████╗      ██║  ██║███████║   ██║   ███████║
 *    ██║   ██╔══██║██╔══╝      ██║  ██║██╔══██║   ██║   ██╔══██║
 *    ██║   ██║  ██║███████╗    ██████╔╝██║  ██║   ██║   ██║  ██║
 *    ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
 * 
 * ==================== ARCHITECTURE PHILOSOPHY ======================
 * 
 * WHY MULTI-AGENT?
 * ──────────────────────────────────────────────────────────────────
 * Instead of one monolithic agent handling everything (which leads to:
 *   - Context confusion
 *   - Tool overloading
 *   - Poor specialization
 *   - Difficult maintenance
 * )
 * 
 * We use multiple specialized agents where:
 *   ✓ Each agent masters ONE domain
 *   ✓ Tools are domain-specific and focused
 *   ✓ Routing is intelligent and contextual
 *   ✓ System scales horizontally
 *   ✓ Easy to add new specialists
 * 
 * ==================== VISUAL DATA FLOW MAP =========================
 * 
 * 
 *                            DATA STORES
 *                    ┌─────────────────────────┐
 *                    │  STATE (MemorySaver)    │
 *                    │  ┌───────────────────┐  │
 *                    │  │ messages[]        │  │
 *                    │  │ nextRepresentative│  │
 *                    │  └───────────────────┘  │
 *                    │         ▲               │
 *                    │         │               │
 *                    │    read/write           │
 *                    │         │               │
 *                    └─────────┼───────────────┘
 *                              │
 *    ┌─────────────────────────┼─────────────────────────────┐
 *    │                         │                             │
 *    ▼                         ▼                             ▼
 * ┌──────────────┐     ┌──────────────┐              ┌──────────────┐
 * │   FRONTDESK  │     │  MARKETING   │              │   LEARNING   │
 * │    AGENT     │     │    AGENT     │              │    AGENT     │
 * │  (Router)    │     │ (Specialist) │              │ (Specialist) │
 * └──────┬───────┘     └──────┬───────┘              └──────┬───────┘
 *        │                    │                             │
 *        │                    │                             │
 *        ▼                    ▼                             ▼
 * ┌──────────────┐     ┌──────────────┐              ┌───────────────┐
 * │ LLM Call #1  │     │   getOffers  │              │kbRetrieverTool│
 * │(Response Gen)│     │    Tool      │              │   (RAG Tool)  │
 * └──────────────┘     └──────┬───────┘              └──────┬────────┘
 *        │                    │                             │
 *        ▼                    ▼                             ▼
 * ┌────────────────┐   ┌──────────────┐              ┌──────────────┐
 * │ LLM Call #2    │   │  Hardcoded   │              │   Pinecone   │
 * │(Classification)│   │   Offers     │              │  Vector DB   │
 * └────────────────┘   └──────────────┘              └──────────────┘
 *                                                             ▲
 *                                                             │
 *                                                    ┌────────┴────────┐
 *                                                    │   PDF Knowledge │
 *                                                    │      Base       │
 *                                                    └─────────────────┘
 * 
 * ==================== DETAILED EXECUTION PIPELINE =================
 * 
 * [USER INPUT] 
 *   ↓
 * [STATE.messages] ← stored: HumanMessage("Which language is GenAI course in?")
 *   ↓
 * [NODE: frontDeskSupport]
 *   ├─ READ FROM STATE: entire message history
 *   ├─ LLM CALL #1: Generate friendly response
 *   │   INPUT: system prompt + state.messages
 *   │   OUTPUT: "Great question! Let me transfer you to our learning team."
 *   │   ↓
 *   ├─ STORE IN STATE: messages[] ← AIMessage(response)
 *   │
 *   ├─ LLM CALL #2: Classify routing intent
 *   │   INPUT: system prompt + state.messages + response from call #1
 *   │   OUTPUT: JSON { "nextRepresentative": "LEARNING" }
 *   │   ↓
 *   └─ STORE IN STATE: nextRepresentative = "LEARNING"
 *   ↓
 * [CONDITIONAL EDGE: whoIsNext()]
 *   ├─ READ FROM STATE: nextRepresentative = "LEARNING"
 *   └─ DECISION: route to learningSupport
 *   ↓
 * [NODE: learningSupport]
 *   ├─ READ FROM STATE: entire message history
 *   ├─ TRIM HISTORY: remove last AI message (frontdesk response)
 *   ├─ LLM CALL: Generate learning response (may call tool)
 *   │   INPUT: system prompt + trimmed history
 *   │   OUTPUT: AIMessage with tool_calls
 *   │   ↓
 *   └─ STORE IN STATE: messages[] ← AIMessage(with tool_calls)
 *   ↓
 * [CONDITIONAL EDGE: isLearningTool()]
 *   ├─ READ FROM STATE: last message has tool_calls
 *   └─ DECISION: route to learningTools
 *   ↓
 * [NODE: learningTools]
 *   ├─ READ FROM STATE: last message's tool_calls
 *   ├─ EXECUTE TOOL: kbRetrieverTool.search(query)
 *   │   ├─ 1. Embed query using OpenAI embeddings
 *   │   ├─ 2. Search Pinecone for similar vectors
 *   │   ├─ 3. Retrieve matching PDF chunks
 *   │   └─ 4. Format as ToolMessage
 *   │   ↓
 *   └─ STORE IN STATE: messages[] ← ToolMessage(results)
 *   ↓
 * [EDGE: back to learningSupport]
 *   ↓
 * [NODE: learningSupport (second pass)]
 *   ├─ READ FROM STATE: messages now includes tool results
 *   ├─ LLM CALL: Generate final answer using retrieved context
 *   │   INPUT: system prompt + tool results + original query
 *   │   OUTPUT: "The GenAI course is taught in Python..."
 *   │   ↓
 *   └─ STORE IN STATE: messages[] ← final AIMessage
 *   ↓
 * [CONDITIONAL EDGE: isLearningTool() → no more tools]
 *   ↓
 * [END] → Return final state to user
 */

// ======================================================================
// SECTION 1: IMPORTS - External Dependencies
// ======================================================================
import readline from 'node:readline/promises'
import { END, StateGraph, MemorySaver, Annotation, MessagesAnnotation } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { ChatGroq } from '@langchain/groq';
import { tool } from '@langchain/core/tools';
import { createRetrieverTool } from 'langchain/tools/retriever';
import type { AIMessage } from '@langchain/core/messages';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';

// ======================================================================
// SECTION 2: STATE MANAGEMENT - The "Whiteboard" of Our System
// ======================================================================

/**
 * ███████╗████████╗ █████╗ ████████╗███████╗
 * ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
 * ███████╗   ██║   ███████║   ██║   █████╗  
 * ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  
 * ███████║   ██║   ██║  ██║   ██║   ███████╗
 * ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
 * 
 * WHAT IS STATE?
 * ──────────────────────────────────────────────────────────────────
 * Think of STATE as a shared whiteboard that EVERY node in the graph
 * can read from and write to. It's the system's collective memory.
 * 
 * STATE LIFE CYCLE:
 * ┌─────────────────────────────────────────────────────────────┐
 * │                                                             │
 * │   [INITIAL] → { messages: [], nextRepresentative: "" }      │
 * │        ↓                                                    │
 * │   [NODE EXECUTES]                                           │
 * │        ↓                                                    │
 * │   ├─ READS current state                                    │
 * │   ├─ PROCESSES (LLM calls, tool execution)                  │
 * │   ├─ RETURNS updates                                        │
 * │   ↓                                                         │
 * │   [LANGGRAPH MERGES] updates into global state              │
 * │        ↓                                                    │
 * │   [UPDATED STATE] ready for next node                       │
 * │                                                             │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * STATE STRUCTURE - Detailed Breakdown:
 * ──────────────────────────────────────────────────────────────────
 * {
 *   messages: [
 *     {
 *       type: "human",           // User message
 *       content: "Any offers?",   
 *       id: "msg_123"
 *     },
 *     {
 *       type: "ai",              // Frontdesk response
 *       content: "Let me connect you...",
 *       id: "msg_124"
 *     },
 *     {
 *       type: "ai",              // Marketing agent response
 *       content: "Here are our offers...",
 *       tool_calls: [...]         // Optional: if tool was called
 *       id: "msg_125"
 *     },
 *     {
 *       type: "tool",             // Tool execution result
 *       content: "[{code: 'LAUNCH', discount: 30}]",
 *       tool_call_id: "call_456"
 *     }
 *   ],
 *   nextRepresentative: "MARKETING" | "LEARNING" | "RESPOND" | ""
 * }
 * 
 * WHERE IS STATE STORED?
 * ──────────────────────────────────────────────────────────────────
 * 1. IN-MEMORY  : During graph execution, state flows through nodes
 * 2. MEMORYSAVER: Checkpointer that persists state between turns
 *    - Uses thread_id to maintain conversation continuity
 *    - Stored in RAM (can be swapped for Redis/PostgreSQL in prod)
 * 
 * WHY TWO-PART STATE?
 * ──────────────────────────────────────────────────────────────────
 * messages[]: Tracks the entire conversation for context
 * nextRepresentative: Simple string for routing decisions
 * 
 * This separation allows:
 * - Complex conversation history for LLM context
 * - Simple boolean-like flag for graph routing
 */

export const StateAnnotation = Annotation.Root({
    // PART 1: MessagesAnnotation.spec - Built-in message handling
    // Contains: messages array with automatic append/merge logic
    ...MessagesAnnotation.spec,
    
    // PART 2: Custom routing field - Simple string flag
    // Values: "MARKETING" | "LEARNING" | "RESPOND" | ""
    nextRepresentative: Annotation<string>,
});

// ======================================================================
// SECTION 3: MODEL INITIALIZATION - The "Brain" of Each Agent
// ======================================================================

/**
 * ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗     
 * ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║     
 * ██╔████╔██║██║   ██║██║  ██║█████╗  ██║     
 * ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║     
 * ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
 * ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
 * 
 * WHY SHARED MODEL INSTANCE?
 * ──────────────────────────────────────────────────────────────────
 * All agents use the same LLM configuration for:
 * - Consistency in response style
 * - Efficient connection pooling
 * - Single point of configuration
 * - Reduced resource usage
 * 
 * MODEL CONFIGURATION DEEP DIVE:
 * ──────────────────────────────────────────────────────────────────
 * ChatGroq (
 *   model: 'openai/gpt-oss-120b'   // 120B parameter model
 *   temperature: 0                 // Deterministic outputs
 *   apiKey: from env               // Secure key management
 * )
 * 
 * TEMPERATURE = 0: Why?
 * - Customer support needs consistency
 * - Same question → same answer
 * - No creative variations needed
 * - Predictable routing decisions
 * 
 * INPUT FORMAT:
 * model.invoke([
 *   { role: 'system', content: 'You are...' },   // System prompt
 *   { role: 'user', content: 'Question?' },      // User message
 *   { role: 'assistant', content: 'Answer...' }, // Previous AI response
 * ])
 * 
 * OUTPUT FORMAT:
 * AIMessage {
 *   content: "Response text...",
 *   tool_calls?: [{              // Optional: if tool needed
 *     name: "tool_name",
 *     args: { query: "search..." },
 *     id: "call_123"
 *   }]
 * }
 */

export const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY!,
    model: 'openai/gpt-oss-120b',
    temperature: 0,  // Zero randomness = predictable responses
});

// ======================================================================
// SECTION 4: VECTOR DATABASE - The "Long-term Memory" (RAG System)
// ======================================================================

/**
 * ██╗   ██╗███████╗ ██████╗████████╗ ██████╗ ██████╗ 
 * ██║   ██║██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
 * ██║   ██║█████╗  ██║        ██║   ██║   ██║██████╔╝
 * ╚██╗ ██╔╝██╔══╝  ██║        ██║   ██║   ██║██╔══██╗
 *  ╚████╔╝ ███████╗╚██████╗   ██║   ╚██████╔╝██║  ██║
 *   ╚═══╝  ╚══════╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
 * 
 * WHAT IS RAG (Retrieval-Augmented Generation)?
 * ──────────────────────────────────────────────────────────────────
 * RAG = Search your own documents + Generate answers
 * 
 * WITHOUT RAG:
 * User: "What's in the GenAI course?"
 * LLM: "I don't have that information." ❌
 * 
 * WITH RAG:
 * User: "What's in the GenAI course?"
 * Step 1: SEARCH vector DB → Find relevant PDF chunks
 * Step 2: GENERATE → "The course covers transformers, attention mechanisms..."
 * 
 * COMPLETE RAG PIPELINE:
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │   PDF      │ -> │  Chunking  │ -> │ Embedding  │ -> │  Pinecone  │
 * │ Knowledge  │    │   Split    │    │   Model    │    │   Store    │
 * │   Base     │    │            │    │            │    │            │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 *                                                              │
 *                                                              │
 *                         ┌────────────────────────────────────┘
 *                         │
 *                         ▼
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │   User     │ -> │   Query    │ -> │  Semantic  │ -> │  Retrieved │
 * │  Question  │    │  Embedding │    │  Search    │    │   Chunks   │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 *                                                              │
 *                                                              ▼
 *                                                      ┌────────────┐
 *                                                      │    LLM     │
 *                                                      │ Generation │
 *                                                      └────────────┘
 *                                                              │
 *                                                              ▼
 *                                                      ┌────────────┐
 *                                                      │   Answer   │
 *                                                      └────────────┘
 */

/**
 * EMBEDDINGS MODEL - Convert text to vectors
 * ──────────────────────────────────────────────────────────────────
 * INPUT:  "What is deep learning?"
 * OUTPUT: [0.123, -0.456, 0.789, ...]  (1536-dimensional vector)
 * 
 * Why vectors? Similar meaning = similar vector patterns
 * "deep learning" ≈ "neural networks" (vectors close together)
 * "deep learning" ≠ "shallow pond" (vectors far apart)
 */
const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',  // OpenAI's latest embedding model
    // Dimensions: 1536 (each text becomes 1536 numbers)
});

/**
 * PINECONE - Vector Database
 * ──────────────────────────────────────────────────────────────────
 * What it stores:
 * {
 *   id: "chunk_123",
 *   values: [0.123, -0.456, ...],  // The embedding vector
 *   metadata: {
 *     text: "The course covers...",  // Original chunk text
 *     source: "cg-knowledge-base.pdf",
 *     page: 5
 *   }
 * }
 * 
 * Search process:
 * 1. Convert query to vector (using same embeddings)
 * 2. Find nearest vectors in database (cosine similarity)
 * 3. Return metadata.text from top matches
 */
const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

/**
 * VECTOR STORE - LangChain wrapper
 * ──────────────────────────────────────────────────────────────────
 * Provides clean interface:
 * - .addDocuments() → embed and store
 * - .asRetriever() → create search tool
 * - .similaritySearch() → direct vector search
 */
export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,  // Process 5 chunks at a time
});

/**
 * INDEX DOCUMENT - One-time setup function
 * ──────────────────────────────────────────────────────────────────
 * Run this ONCE to populate your vector database
 * 
 * DATA TRANSFORMATION PIPELINE:
 * 
 * [PDF FILE] (100 pages)
 *    ↓ PDFLoader
 * [RAW TEXT] (50,000 words)
 *    ↓ RecursiveCharacterTextSplitter
 * [CHUNK 1] "Introduction to... 500 chars..."  
 * [CHUNK 2] "...neural networks... 500 chars..."
 * [CHUNK 3] "...training process... 500 chars..."
 * [CHUNK 100] "...conclusion... 500 chars..."
 *    ↓ OpenAIEmbeddings (for each chunk)
 * [VECTOR 1] [0.123, -0.456, 0.789, ...]
 * [VECTOR 2] [0.234, -0.567, 0.890, ...]
 * [VECTOR 100] [0.345, -0.678, 0.901, ...]
 *    ↓ PineconeStore.addDocuments()
 * [PINECONE] Stored with metadata (original text, source)
 * 
 * WHY CHUNK?
 * - LLMs have context limits (can't process entire PDF)
 * - Smaller chunks = more precise retrieval
 * - Overlap prevents cutting sentences in half
 */
export async function indexTheDocument(filePath: string) {
    console.log("📚 Loading PDF...");
    const loader = new PDFLoader(filePath, { splitPages: false });
    const doc = await loader.load();
    
    console.log("✂️ Splitting into chunks...");
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,     // Characters per chunk (approx 100 words)
        chunkOverlap: 100,   // Overlap to maintain context
        // Separators: ["\n\n", "\n", " ", ""] (tries these in order)
    });
    const texts = await textSplitter.splitText(doc[0].pageContent);
    console.log(`Created ${texts.length} chunks`);
    
    console.log("🔢 Creating documents with metadata...");
    const documents = texts.map((chunk, i) => ({
        pageContent: chunk,
        metadata: {
            ...doc[0].metadata,
            chunk_index: i,
            total_chunks: texts.length
        },
    }));
    
    console.log("📤 Embedding and storing in Pinecone...");
    await vectorStore.addDocuments(documents);
    console.log("✅ Done! Knowledge base ready.");
}

// Uncomment to run (one-time setup):
// indexTheDocument('../cg-knowledge-base.pdf').catch(console.error);

// ======================================================================
// SECTION 5: TOOLS - The "Hands" of Our Agents
// ======================================================================

/**
 * ████████╗ ██████╗  ██████╗ ██╗     ███████╗
 * ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
 *    ██║   ██║   ██║██║   ██║██║     ███████╗
 *    ██║   ██║   ██║██║   ██║██║     ╚════██║
 *    ██║   ╚██████╔╝╚██████╔╝███████╗███████║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
 * 
 * WHAT ARE TOOLS?
 * ──────────────────────────────────────────────────────────────────
 * Tools are functions that LLMs can "call" to:
 * - Fetch real-time data (APIs, databases)
 * - Perform calculations
 * - Search knowledge bases
 * - Take actions in external systems
 * 
 * WHY TOOLS? (The LLM Limitation)
 * ──────────────────────────────────────────────────────────────────
 * LLMs are trained on static data (cutoff date: earlier this year)
 * They CANNOT:
 * ❌ Know current promo codes
 * ❌ Access your private documents
 * ❌ Perform real calculations
 * ❌ Interact with external systems
 * 
 * Tools solve this by letting the LLM say:
 * "I need to fetch current offers" → Tool executes → LLM uses result
 * 
 * TOOL EXECUTION FLOW:
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │   LLM      │ -> │   Tool     │ -> │  Function  │ -> │   Result   │
 * │ decides    │    │   Call     │    │ Execution  │    │  returned  │
 * │ needs tool │    │  request   │    │            │    │   to LLM   │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 *                                                              │
 *                                                              ▼
 *                                                      ┌─────────────┐
 *                                                      │   LLM       │
 *                                                      │ generates   │
 *                                                      │ final answer│
 *                                                      └─────────────┘
 */

/**
 * TOOL 1: getOffers - Marketing Tool
 * ──────────────────────────────────────────────────────────────────
 * 
 * WHY HARDCODED NOW?
 * Development: Quick testing with mock data
 * Production: Replace with actual API call
 * 
 * PRODUCTION VERSION:
 * async () => {
 *   const response = await fetch('https://api.codersgyan.com/offers', {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   });
 *   return response.text();
 * }
 * 
 * DATA FLOW:
 * [LLM decides: "User asking about offers"]
 *    ↓
 * [LLM includes in response: tool_calls: [{name: "offers_query_tool"}]]
 *    ↓
 * [ToolNode executes getOffers()]
 *    ↓
 * [Returns: JSON string of offers]
 *    ↓
 * [ToolMessage added to state.messages]
 *    ↓
 * [LLM reads ToolMessage, formulates final answer]
 *    ↓
 * "We have 30% off with code LAUNCH..."
 */
export const getOffers = tool(
    // The actual function to execute
    () => {
        // Mock data for development
        return JSON.stringify([
            {
                code: 'LAUNCH',
                discount_percent: 30,
                valid_until: '2024-12-31',
                description: 'Launch special - 30% off all courses'
            },
            {
                code: 'FIRST_20',
                discount_percent: 20,
                valid_until: '2024-06-30',
                description: 'First 20 students get 20% off'
            },
        ], null, 2);  // Pretty print JSON
    },
    {
        name: 'offers_query_tool',
        description: 'Call this tool to get the available discounts and offers',
        // No schema = no arguments needed
    }
);

/**
 * TOOL 2: kbRetrieverTool - Learning Tool (RAG)
 * ──────────────────────────────────────────────────────────────────
 * 
 * COMPLETE RAG DATA FLOW:
 * 
 * [User Query: "What does the GenAI course cover?"]
 *    ↓
 * [Learning Agent receives query]
 *    ↓
 * [LLM decides: "Need to search knowledge base"]
 *    ↓
 * [Creates tool call: {
 *      name: "retrieve_learning_knowledge_base",
 *      args: { query: "GenAI course content syllabus" }
 * }]
 *    ↓
 * [ToolNode executes kbRetrieverTool]
 *    ↓
 * [retriever = vectorStore.asRetriever()]
 *    ↓
 * [1. Query embedded: → [0.123, -0.456, ...]]
 *    ↓
 * [2. Pinecone search: Find similar vectors]
 *    ↓
 * [3. Top 4 chunks returned:
 *      "Module 1: Transformers architecture..."
 *      "Module 2: Attention mechanisms..."
 *      "Module 3: Fine-tuning LLMs..."
 *      "Module 4: Deployment strategies..."
 *    ]
 *    ↓
 * [ToolMessage added to state with chunks]
 *    ↓
 * [LLM reads chunks, generates answer]
 *    ↓
 * "The GenAI course covers transformers, attention mechanisms, 
 *  fine-tuning LLMs, and deployment strategies..."
 * 
 * WHY .asRetriever()?
 * ──────────────────────────────────────────────────────────────────
 * Converts vectorStore into a tool with:
 * - Default search parameters (k=4 results)
 * - Automatic query embedding
 * - Score thresholding
 * - Result formatting
 */
const retriever = vectorStore.asRetriever({
    k: 4,  // Return top 4 most relevant chunks
    // searchType: "similarity",  // Default: cosine similarity
});

export const kbRetrieverTool = createRetrieverTool(retriever, {
    name: 'retrieve_learning_knowledge_base',
    description: 'Search and return information about syllabus, courses, FAQs, career doubts. Use this when students ask about course content, learning paths, or technical concepts.',
});

// Tool collections for binding
const marketingTools = [getOffers];
const learningTools = [kbRetrieverTool];

// Tool execution nodes
const marketingToolNode = new ToolNode(marketingTools);
const learningToolNode = new ToolNode(learningTools);

// ======================================================================
// SECTION 6: FRONTDESK AGENT - The Router
// ======================================================================

/**
 * ███████╗██████╗  ██████╗ ███╗   ██╗████████╗██████╗ ███████╗███████╗██╗  ██╗
 * ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝██╔════╝██║ ██╔╝
 * █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██║  ██║█████╗  ███████╗█████╔╝ 
 * ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██║  ██║██╔══╝  ╚════██║██╔═██╗ 
 * ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██████╔╝███████╗███████║██║  ██╗
 * ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
 * 
 * RESPONSIBILITY: First point of contact + Intelligent Router
 * 
 * WHY TWO LLM CALLS?
 * ──────────────────────────────────────────────────────────────────
 * Call #1: Generate human-like response (conversational)
 * Call #2: Classify routing intent (analytical)
 * 
 * Separating concerns = Better performance at each task
 * 
 * COMPLETE DATA FLOW THROUGH FRONTDESK:
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                         INPUT STATE                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ {                                                               │
 * │   messages: [                                                   │
 * │     HumanMessage("Which language is GenAI course in?")          │
 * │   ],                                                            │
 * │   nextRepresentative: ""                                        │
 * │ }                                                               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     LLM CALL #1 - Response                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ INPUT:                                                          │
 * │ - System: "You are frontline support..."                        │
 * │ - History: [Human: "Which language..."]                         │
 * │                                                                 │
 * │ PROCESSING:                                                     │
 * │ LLM analyzes query and decides:                                 │
 * │ "This is about course content → needs learning team"            │
 * │                                                                 │
 * │ OUTPUT:                                                         │
 * │ AIMessage(                                                      │
 * │   "Great question! Let me transfer you to our learning team,    │
 * │    one moment please."                                          │
 * │ )                                                               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     LLM CALL #2 - Classification                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ INPUT:                                                          │
 * │ - System: "You are an expert routing system..."                 │
 * │ - Full context: [Human msg + AI response from Call #1]          │
 * │ - Task: "Extract routing intent as JSON"                        │
 * │                                                                 │
 * │ PROCESSING:                                                     │
 * │ LLM analyzes conversation and determines intent:                │
 * │ "The representative is routing to learning team"                │
 * │                                                                 │
 * │ OUTPUT (with response_format: {type: "json_object"}):           │
 * │ { "nextRepresentative": "LEARNING" }                            │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                         OUTPUT STATE                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ {                                                               │
 * │   messages: [                                                   │
 * │     HumanMessage("Which language..."),                          │
 * │     AIMessage("Let me transfer you...")  ← NEW                  │
 * │   ],                                                            │
 * │   nextRepresentative: "LEARNING"          ← NEW                 │
 * │ }                                                               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 *                      [whoIsNext() reads]
 *                              ↓
 *                      Routes to learningSupport
 */

async function frontDeskSupport(state: typeof StateAnnotation.State) {
    console.log("\n🔷 FRONTDESK AGENT EXECUTING");
    console.log("   Input messages:", state.messages.length);

    /**
     * LLM CALL #1: Generate conversational response
     * 
     * SYSTEM PROMPT BREAKDOWN:
     * ──────────────────────────────────────────────────────────
     * "You are frontline support staff for Coder's Gyan..."
     *    → Establishes role and company context
     * 
     * "Be concise in your responses."
     *    → Instructs on response style
     * 
     * "If the student is having a marketing or learning support query,
     *  do not try to answer the question directly..."
     *    → Critical routing instruction
     * 
     * "Otherwise, just respond conversationally."
     *    → Default behavior for general queries
     */
    const SYSTEM_PROMPT = `You are frontline support staff for Coder's Gyan, an ed-tech company that helps software developers excel in their careers through practical web development and Generative AI courses.
Be concise in your responses.
You can chat with students and help them with basic questions, but if the student is having a marketing or learning support query,
do not try to answer the question directly or gather information.
Instead, immediately transfer them to the marketing team(promo codes, discounts, offers, and special campaigns) or learning support team(courses, syllabus coverage, learning paths, and study strategies) by asking the user to hold for a moment.
Otherwise, just respond conversationally.`;

    console.log("   📞 LLM Call #1: Generating response...");
    const supportResponse = await model.invoke([
        { role: 'system', content: SYSTEM_PROMPT },
        ...state.messages,
    ]);

    /**
     * LLM CALL #2: Classify routing intent
     * 
     * WHY JSON FORMAT?
     * ──────────────────────────────────────────────────────────
     * response_format: { type: 'json_object' } ensures:
     * - Valid, parseable JSON output
     * - Consistent structure { "nextRepresentative": "VALUE" }
     * - No markdown or explanatory text
     * 
     * CLASSIFICATION LOGIC:
     * ──────────────────────────────────────────────────────────
     * The LLM analyzes the ENTIRE conversation including:
     * - Original user query
     * - Frontdesk's response
     * 
     * Then decides if frontdesk is:
     * - Routing to MARKETING (promo/offer questions)
     * - Routing to LEARNING (course/content questions)
     * - RESPONDing directly (general chat)
     */
    const CATEGORIZATION_SYSTEM_PROMPT = `You are an expert customer support routing system.
Your job is to detect whether a customer support representative is routing a user to a marketing team or learning support team, or if they are just responding conversationally.`;

    const CATEGORIZATION_HUMAN_PROMPT = `The previous conversation is an interaction between a customer support representative and a user.
Extract whether the representative is routing the user to a marketing team or learning support team, or whether they are just responding conversationally.
Respond with a JSON object containing a single key called "nextRepresentative" with one of the following values:
If they want to route the user to the marketing team, respond with "MARKETING".
If they want to route the user to the learning support team, respond with "LEARNING".
Otherwise, respond only with the word "RESPOND".`;

    console.log("   🧠 LLM Call #2: Classifying intent...");
    const categorizationResponse = await model.invoke(
        [
            { role: 'system', content: CATEGORIZATION_SYSTEM_PROMPT },
            ...state.messages,
            supportResponse,
            { role: 'user', content: CATEGORIZATION_HUMAN_PROMPT },
        ],
        {
            response_format: { type: 'json_object' },
        }
    );

    // Parse the JSON response
    const { nextRepresentative } = JSON.parse(
        categorizationResponse.content as string
    );
    console.log(`   🚦 Routing decision: ${nextRepresentative}`);

    // Return updates to state
    return {
        messages: [supportResponse],
        nextRepresentative,
    };
}

// ======================================================================
// SECTION 7: MARKETING AGENT - Promotions Specialist
// ======================================================================

/**
 * ███╗   ███╗ █████╗ ██████╗ ██╗  ██╗███████╗████████╗██╗███╗   ██╗ ██████╗ 
 * ████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝ 
 * ██╔████╔██║███████║██████╔╝█████╔╝ █████╗     ██║   ██║██╔██╗ ██║██║  ███╗
 * ██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ██╔══╝     ██║   ██║██║╚██╗██║██║   ██║
 * ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██╗███████╗   ██║   ██║██║ ╚████║╚██████╔╝
 * ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
 * 
 * RESPONSIBILITY: Handle ALL marketing-related queries
 * - Promo codes
 * - Discounts
 * - Special offers
 * - Campaign information
 * 
 * WHY BIND TOOLS?
 * ──────────────────────────────────────────────────────────────────
 * model.bindTools(marketingTools) tells the LLM:
 * "You have access to these functions. Call them when needed."
 * 
 * The LLM learns:
 * - What tools exist (names)
 * - What they do (descriptions)
 * - When to use them (from context)
 * 
 * COMPLETE MARKETING AGENT DATA FLOW:
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                    INPUT STATE (after routing)                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ {                                                                 │
 * │   messages: [                                                    │
 * │     HumanMessage("Any active promo codes?"),                    │
 * │     AIMessage("Let me transfer you...")  ← frontdesk response   │
 * │   ],                                                             │
 * │   nextRepresentative: "MARKETING"                                │
 * │ }                                                                │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     TRIM HISTORY (Critical Step)                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ WHY? The marketing agent shouldn't see the frontdesk's           │
 * │ "transferring" message. It needs a clean conversation starting   │
 * │ with the user's original question.                               │
 * │                                                                  │
 * │ BEFORE: [Human, AI(frontdesk)]                                  │
 * │ AFTER:  [Human]  ← Clean slate for specialist                   │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                    LLM CALL - Marketing Response                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ INPUT:                                                           │
 * │ - System: "You are part of the Marketing Team..."               │
 * │ - History: [Human: "Any active promo codes?"]                   │
 * │ - Available tools: offers_query_tool                            │
 * │                                                                  │
 * │ LLM DECISION PROCESS:                                            │
 * │ 1. "User asking about promo codes"                              │
 * │ 2. "I have a tool for that: offers_query_tool"                  │
 * │ 3. "I should call it to get current offers"                     │
 * │                                                                  │
 * │ OUTPUT:                                                          │
 * │ AIMessage(                                                       │
 * │   content: "",  // Empty while calling tool                     │
 * │   tool_calls: [{                                                │
 * │     name: "offers_query_tool",                                  │
 * │     args: {},  // No arguments needed                           │
 * │     id: "call_123"                                              │
 * │   }]                                                            │
 * │ )                                                               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 *                      [isMarketingTool() reads]
 *                              ↓
 *                      Routes to marketingTools
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                    TOOL EXECUTION (marketingTools)               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ INPUT: tool_calls from last message                             │
 * │                                                                  │
 * │ EXECUTION:                                                      │
 * │ getOffers() runs → returns JSON string of offers                │
 * │                                                                  │
 * │ OUTPUT added to state:                                           │
 * │ ToolMessage(                                                     │
 * │   content: "[{code: 'LAUNCH', discount: 30}]",                  │
 * │   tool_call_id: "call_123"                                      │
 * │ )                                                               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 *                    [Edge back to marketingSupport]
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                MARKETING AGENT - Second Pass                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ INPUT NOW INCLUDES:                                              │
 * │ - Original: HumanMessage("Any active promo codes?")             │
 * │ - Tool Result: ToolMessage with offers data                     │
 * │                                                                  │
 * │ LLM generates final answer:                                      │
 * │ "Yes! We have two active offers:                                │
 * │  • LAUNCH: 30% off (valid until Dec 2024)                      │
 * │  • FIRST_20: 20% off (valid until June 2024)"                  │
 * └─────────────────────────────────────────────────────────────────┘
 */

async function marketingSupport(state: typeof StateAnnotation.State) {
    console.log("\n📢 MARKETING AGENT EXECUTING");
    
    // Bind marketing tools to the model
    const llmWithTools = model.bindTools(marketingTools);

    const SYSTEM_PROMPT = `You are part of the Marketing Team at Coder's Gyan, an ed-tech company that helps software developers excel in their careers through practical web development and Generative AI courses.
You specialize in handling questions about promo codes, discounts, offers, and special campaigns.
Answer clearly, concisely, and in a friendly manner. For queries outside promotions (course content, learning), politely redirect the student to the correct team.
Important: Answer only using given context, else say I don't have enough information about it.`;

    /**
     * HISTORY TRIMMING LOGIC:
     * ──────────────────────────────────────────────────────────
     * Check if last message is from AI (frontdesk)
     * If yes, remove it so agent sees only user query
     */
    let trimmedHistory = state.messages;
    if (trimmedHistory.at(-1)?.getType() === 'ai') {
        console.log("   ✂️ Trimming frontdesk response from history");
        trimmedHistory = trimmedHistory.slice(0, -1);
    }
    console.log("   Processing query with", trimmedHistory.length, "messages");

    const marketingResponse = await llmWithTools.invoke([
        { role: 'system', content: SYSTEM_PROMPT },
        ...trimmedHistory,
    ]);

    // Check if tool was called
    if (marketingResponse.tool_calls?.length) {
        console.log("   🔧 Tool called:", marketingResponse.tool_calls[0].name);
    } else {
        console.log("   ✅ Direct response generated");
    }

    return {
        messages: [marketingResponse],
    };
}

// ======================================================================
// SECTION 8: LEARNING AGENT - Course Content Specialist (with RAG)
// ======================================================================

/**
 * ██╗     ███████╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ 
 * ██║     ██╔════╝██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ 
 * ██║     █████╗  ███████║██║  ██║██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
 * ██║     ██╔══╝  ██╔══██║██║  ██║██║╚██╗██║██║██║╚██╗██║██║   ██║
 * ███████╗███████╗██║  ██║██████╔╝██║ ╚████║██║██║ ╚████║╚██████╔╝
 * ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
 * 
 * RESPONSIBILITY: Handle ALL learning-related queries using RAG
 * - Course content
 * - Syllabus details
 * - Learning paths
 * - Technical concepts
 * - FAQs
 * 
 * WHY "MAX 3 TIMES" IN SYSTEM PROMPT?
 * ──────────────────────────────────────────────────────────────────
 * RAG sometimes returns irrelevant chunks. The agent can:
 * 1. Try a different search query
 * 2. Try more specific terms
 * 3. Give up after 3 attempts (prevents infinite loops)
 * 
 * COMPLETE RAG DATA FLOW WITH LEARNING AGENT:
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                    INPUT STATE (after routing)                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ {                                                                 │
 * │   messages: [                                                    │
 * │     HumanMessage("What does the GenAI course cover?"),          │
 * │     AIMessage("Let me transfer you...")  ← frontdesk response   │
 * │   ],                                                             │
 * │   nextRepresentative: "LEARNING"                                 │
 * │ }                                                                │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     TRIM HISTORY (Same as marketing)             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ BEFORE: [Human, AI(frontdesk)]                                  │
 * │ AFTER:  [Human]  ← Clean slate for learning agent               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │         LLM CALL #1 - Learning Agent (with RAG tool)             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ INPUT:                                                           │
 * │ - System: "You are part of the Learning Support Team..."        │
 * │   (with instruction: "Call retrieve_learning_knowledge_base     │
 * │    max 3 times if not relevant")                                │
 * │ - History: [Human: "What does GenAI course cover?"]             │
 * │ - Available tools: retrieve_learning_knowledge_base             │
 * │                                                                  │
 * │ LLM DECISION PROCESS:                                            │
 * │ 1. "User asking about course content"                           │
 * │ 2. "This requires our knowledge base"                           │
 * │ 3. "I should call the retriever tool"                           │
 * │                                                                  │
 * │ OUTPUT:                                                          │
 * │ AIMessage(                                                       │
 * │   tool_calls: [{                                                │
 * │     name: "retrieve_learning_knowledge_base",                   │
 * │     args: { query: "GenAI course content syllabus" },           │
 * │     id: "call_456"                                              │
 * │   }]                                                            │
 * │ )                                                               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 *                      [isLearningTool() reads]
 *                              ↓
 *                      Routes to learningTools
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │              TOOL EXECUTION - RAG Pipeline                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ STEP 1: Embed query                                               │
 * │ "GenAI course content syllabus" → [0.234, -0.567, ...]          │
 * │                                                                  │
 * │ STEP 2: Search Pinecone                                           │
 * │ Find vectors closest to query vector                            │
 * │                                                                  │
 * │ STEP 3: Retrieve top chunks                                       │
 * │ Chunk 1: "Module 1: Introduction to Transformers..."            │
 * │ Chunk 2: "Module 2: Attention Mechanisms and Self-Attention..." │
 * │ Chunk 3: "Module 3: Fine-tuning Pre-trained Models..."          │
 * │ Chunk 4: "Module 4: Deployment and Production..."               │
 * │                                                                  │
 * │ STEP 4: Return as ToolMessage                                     │
 * │ ToolMessage(                                                     │
 * │   content: "Module 1:... Module 2:... Module 3:... Module 4:..."│
 * │   tool_call_id: "call_456"                                       │
 * │ )                                                               │
 * └─────────────────────────────────────────────────────────────────┘
 *                              ↓
 *                    [Edge back to learningSupport]
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────────┐
 * │              LEARNING AGENT - Second Pass                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ INPUT NOW INCLUDES:                                              │
 * │ - Original: HumanMessage("What does GenAI course cover?")       │
 * │ - Tool Result: 4 chunks of relevant course content              │
 * │                                                                  │
 * │ LLM synthesizes information:                                     │
 * │ "The Generative AI course covers 4 main modules:                │
 * │  1. Transformers architecture - the foundation of modern LLMs   │
 * │  2. Attention mechanisms - how models focus on relevant parts   │
 * │  3. Fine-tuning techniques - adapting models to specific tasks  │
 * │  4. Production deployment - putting models into real-world use" │
 * └─────────────────────────────────────────────────────────────────┘
 */

async function learningSupport(state: typeof StateAnnotation.State) {
    console.log("\n📚 LEARNING AGENT EXECUTING");
    
    const SYSTEM_PROMPT = `You are part of the Learning Support Team at Coder's Gyan, an ed-tech company that helps software developers excel in their careers through practical web development and Generative AI courses.
You assist students with questions about available courses, syllabus coverage, learning paths, and study strategies.
Keep your answers concise, clear, and supportive. Strictly use information from retrieved context for answering queries. If the query is about learning issues, politely redirect the student to the respective team.
Important: Call retrieve_learning_knowledge_base max 3 times if the tool result is not relevant to original query.`;

    // Trim history (remove frontdesk response)
    let trimmedHistory = state.messages;
    if (trimmedHistory.at(-1)?.getType() === 'ai') {
        console.log("   ✂️ Trimming frontdesk response from history");
        trimmedHistory = trimmedHistory.slice(0, -1);
    }

    const llmWithTools = model.bindTools(learningTools);

    console.log("   🔍 Processing learning query...");
    const learningResponse = await llmWithTools.invoke([
        { role: 'system', content: SYSTEM_PROMPT },
        ...trimmedHistory,
    ]);

    if (learningResponse.tool_calls?.length) {
        console.log("   🔧 RAG tool called with query:", 
            learningResponse.tool_calls[0].args.query);
    } else {
        console.log("   ✅ Direct response generated");
    }

    return {
        messages: [learningResponse],
    };
}

// ======================================================================
// SECTION 9: CONDITIONAL ROUTING FUNCTIONS - Graph Decision Makers
// ======================================================================

/**
 * 🔀 CONDITIONAL EDGE FUNCTIONS
 * 
 * These functions are PURE (no side effects, no LLM calls)
 * They only READ state and RETURN the next node name
 * 
 * WHY PURE?
 * - Fast execution (no network calls)
 - Deterministic (same input = same output)
 * - Easy to test
 * - Graph can predict all possible paths
 */

/**
 * whoIsNext - Routes from frontdesk to specialists
 * 
 * INPUT: state.nextRepresentative (set by frontDeskSupport)
 * OUTPUT: node name string
 * 
 * DECISION TREE:
 * ┌────────────────┐
 * │ nextRep = ?    │
 * └────────┬───────┘
 *          │
 *     ┌────┴────┐
 *     │Contains │     YES → "marketingSupport"
 *     │MARKETING│───────────────┐
 *     └────┬────┘               │
 *          │ NO                 │
 *     ┌────┴────┐               │
 *     │Contains │     YES → "learningSupport"
 *     │Contains │     YES → "learningSupport"
 *     │LEARNING │───────────────┐
 *     └────┬────┘               │
 *          │ NO                 │
 *     ┌────┴────┐               │
 *     │Default  │     → "__end__"
 *     │RESPOND  │───────────────┘
 *     └─────────┘
 */
function whoIsNext(state: typeof StateAnnotation.State) {
    const route = state.nextRepresentative;
    console.log(`\n   🚦 Routing decision from frontdesk: "${route}"`);

    if (route.includes('MARKETING')) {
        console.log("   → Routing to MARKETING specialist");
        return 'marketingSupport';
    }
    if (route.includes('LEARNING')) {
        console.log("   → Routing to LEARNING specialist");
        return 'learningSupport';
    }
    console.log("   → Responding directly (no specialist needed)");
    return '__end__';
}

/**
 * isMarketingTool - Checks if marketing agent called a tool
 * 
 * HOW IT WORKS:
 * 1. Get the last message from state
 * 2. Check if it's an AIMessage with tool_calls array
 * 3. If tool_calls exists and has items → tool was called
 * 
 * MESSAGE STRUCTURE CHECK:
 * {
 *   content: "",  // Empty when tool is called
 *   tool_calls: [ // ← This array exists if tool was called
 *     {
 *       name: "offers_query_tool",
 *       args: {},
 *       id: "call_123"
 *     }
 *   ]
 * }
 */
function isMarketingTool(state: typeof StateAnnotation.State) {
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    if (lastMessage.tool_calls?.length) return 'marketingTools';
    return '__end__';
}

/**
 * isLearningTool - Checks if learning agent called a tool
 * 
 * Same logic as isMarketingTool but for learning agent
 * Checks for retrieve_learning_knowledge_base tool calls
 */
function isLearningTool(state: typeof StateAnnotation.State) {
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    if (lastMessage.tool_calls?.length) return 'learningTools';
    return '__end__';
}

// ======================================================================
// SECTION 10: GRAPH CONSTRUCTION - The Orchestrator
// ======================================================================

/**
 * ██████╗  █████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗
 * ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║
 * ██████╔╝███████║██████╔╝███████║██████╔╝███████║
 * ██╔══██╗██╔══██║██╔═══╝ ██╔══██║██╔═══╝ ██╔══██║
 * ██║  ██║██║  ██║██║     ██║  ██║██║     ██║  ██║
 * ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝
 * 
 * WHAT IS A GRAPH?
 * ──────────────────────────────────────────────────────────────────
 * A graph is a network of nodes connected by edges that defines
 * the execution flow of our multi-agent system.
 * 
 * NODE TYPES:
 * 1. AGENT NODES: frontDeskSupport, marketingSupport, learningSupport
 *    - Contain LLM logic
 *    - Can call tools
 *    - Update state with new messages
 * 
 * 2. TOOL NODES: marketingTools, learningTools
 *    - Execute tool functions
 *    - Return results as ToolMessages
 *    - Don't contain LLM logic
 * 
 * EDGE TYPES:
 * 1. NORMAL EDGES: Always go from A to B
 *    - __start__ → frontDeskSupport
 *    - marketingTools → marketingSupport
 *    - learningTools → learningSupport
 * 
 * 2. CONDITIONAL EDGES: Decision points
 *    - frontDeskSupport → whoIsNext() → [marketing|learning|end]
 *    - marketingSupport → isMarketingTool() → [tools|end]
 *    - learningSupport → isLearningTool() → [tools|end]
 * 
 * COMPLETE GRAPH VISUALIZATION WITH STATE FLOW:
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                         LEGEND                                    │
 * │ ┌─────┐ Agent Node  │ ┌─────┐ Tool Node  │ ──→ Normal Edge      │
 * │ └─────┘              │ └─────┘            │ ══→ Conditional Edge │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 *                              START
 *                                │
 *                                ▼
 *                        ┌───────────────┐
 *                        │   frontDesk   │ ← Reads: state.messages
 *                        │   Support     │   Writes: messages[], nextRep
 *                        └───────┬───────┘
 *                                │
 *                    ════════════╧═══════════════╗
 *                   ║            │               ║
 *                   ║        [whoIsNext]        ║
 *                   ║            │               ║
 *          MARKETING ║            │ LEARNING      ║ RESPOND
 *                   ║            │               ║
 *                   ▼             ▼              ▼
 *          ┌───────────────┐ ┌───────────────┐
 *          │   marketing   │ │   learning    │    ┌─────────┐
 *          │   Support     │ │   Support     │    │   END   │
 *          └───────┬───────┘ └───────┬───────┘    └─────────┘
 *                  │                 │                 ▲
 *             [isMarketingTool]  [isLearningTool]      │
 *                  │                 │                 │
 *            ┌─────┴─────┐     ┌─────┴─────┐           │
 *           YES          NO    YES         NO          │
 *            │            │     │           │           │
 *            ▼            │     ▼           │           │
 *     ┌─────────────┐     │  ┌─────────────┐│           │
 *     │ marketing   │     └─→│ learning    │└───────────┘
 *     │ Tools       │        │ Tools       │
 *     └──────┬──────┘        └──────┬──────┘
 *            │                      │
 *            └──────────────────────┘
 *                      │
 *                      ▼
 *             ┌─────────────────┐
 *             │  Return to      │
 *             │  calling agent  │
 *             └─────────────────┘
 */

const graph = new StateGraph(StateAnnotation)

    // ==================== NODE REGISTRATION ====================
    // Register all nodes with their handler functions
    .addNode('frontDeskSupport', frontDeskSupport)
    .addNode('marketingSupport', marketingSupport)
    .addNode('learningSupport', learningSupport)
    .addNode('marketingTools', marketingToolNode)
    .addNode('learningTools', learningToolNode)

    // ==================== ENTRY POINT ====================
    // Always start at frontdesk
    .addEdge('__start__', 'frontDeskSupport')

    // ==================== TOOL RETURN EDGES ====================
    // After tools execute, return to the agent that called them
    .addEdge('marketingTools', 'marketingSupport')
    .addEdge('learningTools', 'learningSupport')

    // ==================== CONDITIONAL EDGES ====================
    // After frontdesk, route based on nextRepresentative
    .addConditionalEdges('frontDeskSupport', whoIsNext, {
        marketingSupport: 'marketingSupport',
        learningSupport: 'learningSupport',
        __end__: '__end__',
    })

    // After marketing agent, check if tool was called
    .addConditionalEdges('marketingSupport', isMarketingTool, {
        marketingTools: 'marketingTools',
        __end__: END,
    })

    // After learning agent, check if tool was called
    .addConditionalEdges('learningSupport', isLearningTool, {
        learningTools: 'learningTools',
        __end__: END,
    });

/**
 * COMPILE THE GRAPH
 * ──────────────────────────────────────────────────────────────────
 * compile() locks the graph structure and returns a runnable app
 * 
 * MemorySaver: Checkpointer that maintains state between turns
 * - Uses thread_id to identify conversation threads
 * - Stores state in memory (can be swapped for Redis/PostgreSQL)
 * - Enables multi-turn conversations
 * 
 * WITHOUT MemorySaver: Each invocation starts fresh (stateless)
 * WITH MemorySaver: Conversation continues across turns (stateful)
 */
const app = graph.compile({ checkpointer: new MemorySaver() });

// ======================================================================
// SECTION 11: COMPLETE EXECUTION EXAMPLE WITH DATA FLOW TRACING
// ======================================================================

/**
 * 🎬 COMPLETE RUNTHROUGH WITH REAL DATA
 * 
 * Let's trace a complete conversation through the system:
 * 
 * User: "What language is the GenAI course taught in?"
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 1: INVOKE GRAPH
 * ──────────────────────────────────────────────────────────────────
 * 
 * app.invoke({
 *   messages: [{
 *     role: 'user',
 *     content: 'What language is the GenAI course taught in?'
 *   }]
 * }, { configurable: { thread_id: '1' } })
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 2: INITIAL STATE
 * ──────────────────────────────────────────────────────────────────
 * 
 * STATE (before execution):
 * {
 *   messages: [
 *     HumanMessage {
 *       content: "What language is the GenAI course taught in?",
 *       type: "human",
 *       id: "msg_1"
 *     }
 *   ],
 *   nextRepresentative: ""
 * }
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 3: NODE EXECUTION - frontDeskSupport
 * ──────────────────────────────────────────────────────────────────
 * 
 * INPUT STATE:
 * { messages: [HumanMessage], nextRepresentative: "" }
 * 
 * LLM CALL #1 (Response Generation):
 * ├─ System: "You are frontline support..."
 * ├─ Human: "What language is the GenAI course taught in?"
 * └─ AI Response: "Great question about our GenAI course! Let me 
 *    transfer you to our learning support team who can give you 
 *    all the details about the course content and requirements. 
 *    One moment please."
 * 
 * LLM CALL #2 (Routing Classification):
 * ├─ System: "You are an expert routing system..."
 * ├─ Context: [Human message + AI response above]
 * ├─ Task: "Extract routing intent as JSON"
 * └─ Response: { "nextRepresentative": "LEARNING" }
 * 
 * STATE UPDATE:
 * {
 *   messages: [
 *     HumanMessage("What language..."),
 *     AIMessage("Great question... Let me transfer you...")  // ← Added
 *   ],
 *   nextRepresentative: "LEARNING"  // ← Added
 * }
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 4: CONDITIONAL EDGE - whoIsNext()
 * ──────────────────────────────────────────────────────────────────
 * 
 * READ: state.nextRepresentative = "LEARNING"
 * DECISION: Route to learningSupport
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 5: NODE EXECUTION - learningSupport (First Pass)
 * ──────────────────────────────────────────────────────────────────
 * 
 * INPUT STATE:
 * {
 *   messages: [
 *     HumanMessage("What language..."),
 *     AIMessage("Great question... Let me transfer you...")
 *   ],
 *   nextRepresentative: "LEARNING"
 * }
 * 
 * TRIM HISTORY:
 * BEFORE: [Human, AI(frontdesk)]
 * AFTER:  [Human]  // Remove frontdesk response
 * 
 * LLM CALL (with RAG tool):
 * ├─ System: "You are learning support... Call retrieve_learning..."
 * ├─ Human: "What language is the GenAI course taught in?"
 * ├─ Available: retrieve_learning_knowledge_base
 * └─ Response: AIMessage {
 *       tool_calls: [{
 *           name: "retrieve_learning_knowledge_base",
 *           args: { query: "GenAI course programming language" },
 *           id: "call_456"
 *       }]
 *   }
 * 
 * STATE UPDATE:
 * {
 *   messages: [
 *     HumanMessage("What language..."),
 *     AIMessage("Great question... Let me transfer you..."),
 *     AIMessage { tool_calls: [...] }  // ← Added
 *   ],
 *   nextRepresentative: "LEARNING"
 * }
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 6: CONDITIONAL EDGE - isLearningTool()
 * ──────────────────────────────────────────────────────────────────
 * 
 * READ: last message has tool_calls
 * DECISION: Route to learningTools
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 7: NODE EXECUTION - learningTools
 * ──────────────────────────────────────────────────────────────────
 * 
 * INPUT: tool_calls from last message
 * 
 * RAG PIPELINE EXECUTION:
 * 1. Embed query: "GenAI course programming language"
 *    → Vector: [0.345, -0.678, 0.901, ...]
 * 
 * 2. Search Pinecone:
 *    Finding chunks similar to query vector...
 * 
 * 3. Retrieved chunks:
 *    Chunk 1: "The Generative AI course uses Python as its primary 
 *              programming language. Students should be comfortable 
 *              with Python basics including functions, classes, and 
 *              working with libraries like NumPy and PyTorch."
 *    
 *    Chunk 2: "Prerequisites: Python programming experience required. 
 *              The course includes hands-on coding exercises using 
 *              Jupyter notebooks and Python 3.9+."
 *    
 *    Chunk 3: "Course materials include Python scripts, pre-trained 
 *              models, and deployment code. All examples are provided 
 *              in Python with detailed comments."
 * 
 * 4. Return as ToolMessage:
 *    ToolMessage {
 *        content: "Chunk 1:... Chunk 2:... Chunk 3:...",
 *        tool_call_id: "call_456"
 *    }
 * 
 * STATE UPDATE:
 * {
 *   messages: [
 *     HumanMessage("What language..."),
 *     AIMessage("Great question... Let me transfer you..."),
 *     AIMessage { tool_calls: [...] },
 *     ToolMessage { content: "Chunk 1:... Chunk 2:... Chunk 3:..." }  // ← Added
 *   ],
 *   nextRepresentative: "LEARNING"
 * }
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 8: EDGE - Return to learningSupport
 * ──────────────────────────────────────────────────────────────────
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 9: NODE EXECUTION - learningSupport (Second Pass)
 * ──────────────────────────────────────────────────────────────────
 * 
 * INPUT NOW INCLUDES RETRIEVED CHUNKS:
 * {
 *   messages: [
 *     HumanMessage("What language..."),
 *     AIMessage("Great question... Let me transfer you..."),
 *     AIMessage { tool_calls: [...] },  // First attempt
 *     ToolMessage { content: "Python is the primary language..." }  // Retrieved knowledge
 *   ]
 * }
 * 
 * LLM CALL (synthesizing answer):
 * ├─ System: "You are learning support... Use retrieved context..."
 * ├─ Human: "What language is the GenAI course taught in?"
 * ├─ Context: [ToolMessage with Python information]
 * └─ Response: "The Generative AI course is taught primarily in 
 *               Python. You'll need to be comfortable with Python 
 *               basics as we work with libraries like NumPy and 
 *               PyTorch. The course includes hands-on coding 
 *               exercises using Jupyter notebooks with Python 3.9+."
 * 
 * STATE UPDATE:
 * {
 *   messages: [
 *     HumanMessage("What language..."),
 *     AIMessage("Great question... Let me transfer you..."),
 *     AIMessage { tool_calls: [...] },
 *     ToolMessage { content: "Python is the primary language..." },
 *     AIMessage { content: "The Generative AI course is taught..." }  // ← Final answer
 *   ],
 *   nextRepresentative: "LEARNING"
 * }
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 10: CONDITIONAL EDGE - isLearningTool()
 * ──────────────────────────────────────────────────────────────────
 * 
 * READ: last message has no tool_calls
 * DECISION: Route to END
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 11: RETURN FINAL STATE TO USER
 * ──────────────────────────────────────────────────────────────────
 * 
 * FINAL STATE:
 * {
 *   messages: [Array of 5 messages],
 *   nextRepresentative: "LEARNING"
 * }
 * 
 * USER SEES: "The Generative AI course is taught primarily in Python..."
 */

// ======================================================================
// SECTION 12: INTERACTIVE MAIN FUNCTION
// ======================================================================

/**
 * ███╗   ███╗ █████╗ ██╗███╗   ██╗
 * ████╗ ████║██╔══██╗██║████╗  ██║
 * ██╔████╔██║███████║██║██╔██╗ ██║
 * ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
 * ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
 * ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
 * 
 * INTERACTIVE COMMAND-LINE INTERFACE
 * 
 * FEATURES:
 * - Continuous conversation loop
 * - Thread_id='1' maintains conversation memory
 * - Type '/bye' to exit
 * 
 * DATA FLOW PER ITERATION:
 * 1. User types message
 * 2. Message wrapped as HumanMessage
 * 3. Graph invoked with current state + new message
 * 4. Full multi-agent pipeline executes
 * 5. Final response displayed
 * 6. Loop continues (memory preserved)
 */
async function main() {
    const rl = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });

    console.log("\n" + "=".repeat(60));
    console.log("🤖 MULTI-AGENT CUSTOMER SUPPORT CHATBOT");
    console.log("=".repeat(60));
    console.log("\n📋 SYSTEM READY:");
    console.log("   • Frontdesk Agent (Router)");
    console.log("   • Marketing Agent (Offers & Promos)");
    console.log("   • Learning Agent (RAG-enabled)");
    console.log("   • Pinecone Vector DB (Course Knowledge Base)");
    console.log("\n💬 Type your questions below (type '/bye' to exit)\n");

    let messageCount = 0;

    while (true) {
        const query = await rl.question("👤 You: ");
        
        if (query.toLowerCase() === "/bye") {
            console.log("\n🤖 Assistant: Thank you for chatting! Have a great day!\n");
            break;
        }

        messageCount++;
        console.log(`\n📨 [Message #${messageCount}] Processing...`);

        try {
            // Invoke the graph with user message
            const state = await app.invoke({
                messages: [
                    {
                        role: 'user',
                        content: query,
                    },
                ],
            }, { 
                configurable: { 
                    thread_id: '1'  // Maintains conversation memory
                } 
            });

            // Get the last message (final response)
            const lastMessage = state.messages[state.messages.length - 1];
            
            console.log("\n🤖 Assistant:", lastMessage.content);
            
            // Show conversation stats
            console.log(`\n📊 [Stats: Total messages in history: ${state.messages.length}]`);
            
        } catch (error) {
            console.error("\n❌ Error processing message:", error);
        }

        console.log("\n" + "-".repeat(60)); // Separator for readability
    }

    rl.close();
}

// ======================================================================
// SECTION 13: ERROR HANDLING AND UTILITIES
// ======================================================================

/**
 * GLOBAL ERROR HANDLER
 * Catches and formats any unhandled errors
 */
process.on('unhandledRejection', (error) => {
    console.error('\n❌ Unhandled rejection:', error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('\n❌ Uncaught exception:', error);
    process.exit(1);
});

/**
 * START THE APPLICATION
 */
console.log("\n🚀 Starting Multi-Agent Chatbot System...");
console.log("⏳ Initializing components...");

main().catch((error) => {
    console.error("\n💥 Fatal error in main:", error);
    process.exit(1);
});

// ======================================================================
// APPENDIX: COMPLETE SYSTEM ARCHITECTURE SUMMARY
// ======================================================================

/**
 * 📌 SYSTEM ARCHITECTURE SUMMARY
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     COMPONENT OVERVIEW                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                  │
 * │ 1. STATE MANAGEMENT                                              │
 * │    • Purpose: Shared memory across all nodes                    │
 * │    • Structure: { messages: [], nextRepresentative: string }    │
 * │    • Storage: MemorySaver (in-memory)                          │
 * │    • Persistence: Thread-based conversation memory             │
 * │                                                                  │
 * │ 2. LLM INTEGRATION (Groq)                                       │
 * │    • Model: openai/gpt-oss-120b                                │
 * │    • Temperature: 0 (deterministic)                            │
 * │    • Usage: All agents share same instance                     │
 * │                                                                  │
 * │ 3. VECTOR DATABASE (Pinecone)                                   │
 * │    • Purpose: Semantic search over course materials            │
 * │    • Embeddings: text-embedding-3-small                        │
 * │    • Storage: 1536-dim vectors with text metadata              │
 * │    • Search: Cosine similarity                                 │
 * │                                                                  │
 * │ 4. AGENTS                                                        │
 * │    • Frontdesk: Router + conversational                        │
 * │    • Marketing: Offers & promotions specialist                 │
 * │    • Learning: RAG-enabled course specialist                   │
 * │                                                                  │
 * │ 5. TOOLS                                                         │
 * │    • getOffers: Fetches current promo codes                    │
 * │    • kbRetrieverTool: Searches vector DB                       │
 * │                                                                  │
 * │ 6. GRAPH                                                         │
 * │    • Nodes: 5 execution units                                   │
 * │    • Edges: 2 normal + 3 conditional                           │
 * │    • Flow: Linear with tool loops                               │
 * │                                                                  │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 📊 DATA FLOW SUMMARY
 * ======================================================================
 * 
 * User Input → [State] → Frontdesk (2 LLM calls) → [State update] 
 *      ↓
 * Conditional Routing → Specialist Agent → [State update]
 *      ↓ (if tool needed)
 * Tool Execution → [State update with results] → Back to Specialist
 *      ↓ (if no more tools)
 * Final Response → [State final] → User
 * 
 * 🔄 STATE TRANSITIONS PER NODE
 * ======================================================================
 * 
 * Node              | Reads                          | Writes
 * ------------------|--------------------------------|------------------
 * frontDeskSupport  | messages[]                     | messages[] + nextRep
 * marketingSupport  | messages[] (trimmed)           | messages[]
 * learningSupport   | messages[] (trimmed)           | messages[]
 * marketingTools    | last message tool_calls        | ToolMessage
 * learningTools     | last message tool_calls        | ToolMessage
 * 
 * 🎯 SUCCESS CRITERIA MET
 * ======================================================================
 * 
 * ✓ Each agent specializes in ONE domain
 * ✓ Tools are domain-specific
 * ✓ Routing is intelligent (LLM-based, not keyword)
 * ✓ RAG provides accurate course information
 * ✓ System scales horizontally (add new agents easily)
 * ✓ Easy to maintain and test
 * ✓ Full conversation memory
 * ✓ Deterministic responses (temp=0)
 * 
 * 🚀 NEXT STEPS / PRODUCTION ENHANCEMENTS
 * ======================================================================
 * 
 * 1. Replace mock offers with real API
 * 2. Add Redis/PostgreSQL for persistent state
 * 3. Add monitoring and logging
 * 4. Implement rate limiting
 * 5. Add more specialist agents (Billing, Technical, etc.)
 * 6. Implement A/B testing for prompts
 * 7. Add caching for frequent queries
 * 8. Implement feedback loop for continuous improvement
 */

export {
    graph,
    app,
    frontDeskSupport,
    marketingSupport,
    learningSupport,
    whoIsNext,
    isMarketingTool,
    isLearningTool,
    // indexTheDocument,
    // vectorStore
};

/**
 * 🎉 IMPLEMENTATION COMPLETE
 * ======================================================================
 * 
 * This multi-agent chatbot system demonstrates:
 * 
 * ✅ ADVANCED LANGGRAPH PATTERNS
 *   - Multi-agent orchestration
 *   - Conditional routing
 *   - Tool calling loops
 *   - State management
 * 
 * ✅ RAG IMPLEMENTATION
 *   - Document indexing pipeline
 *   - Vector embeddings
 *   - Semantic search
 *   - Context synthesis
 * 
 * ✅ PRODUCTION-READY FEATURES
 *   - Error handling
 *   - Conversation memory
 *   - Modular architecture
 *   - Clear data flow
 * 
 * ✅ EDUCATIONAL VALUE
 *   - Detailed comments explaining WHY
 *   - Visual diagrams
 *   - Complete data flow traces
 *   - Architecture decisions explained
 * 
 * The system is now ready to run and can be extended
 * with additional agents, tools, and capabilities.
 * 
 * ======================================================================
 */