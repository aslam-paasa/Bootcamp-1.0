/**
 * How to RAG works in a real-world application?
 * - Basic RAG has 3 core components
 *   a. Indexing
 *      - Load documents (pdf, web, db, etc)
 *      - Chunk them
 *      - Convert chunks into embeddings
 *      - Store in vector database
 *   b. Retrieval
 *      - Convert user query into embedding
 *      - Search vector database
 *      - Retrieve top-K relevant chunks
 *   c. Generation
 *      - Send user query + retrieved chunks to LLM
 *      - LLM generates final answer
*/

/**
 * What is the success metric of RAG?
 * > Every RAG follows indexing > retrieval > generation.
 * > So how do we compare different RAG systems? ACCURACY!
 * 
 * > Speed and Cost are important, but if accuracy is poor, the system
 *   fails
 * 
 * > Ideal RAG:
 *   - High Accuracy
 *   - Low Cost
 *   - Low Latency
 * 
 * > If the speed is fast and cost is low but accuracy is wrong
 *   (2 + 2 = 5), the system is useless.
*/

/**
 * What controls accuracy?
 * > Many people think:
 *   - Better model?
 *   - Better system prompt?
 * > These help, but they do not solve the real issue.
 * 
 * > The most important factor is: Context Quality
 * > If the Context is wrong, output will be wrong, and this leads to
 *   the core RAG problem: GIGO (Garbage in, garbage out)
*/

/**
 * Problems in RAG:
 * 1. Poor Source Files
 *    > If documents are poorly structured:
 *      - Bad formatting
 *      - Broken sentences
 *      - Missing sections
 *    > Then embeddings become weak.
 *    > Retrieval becomes weak.
 *    > Output becomes weak.
 * 
 * 2. Poor Retrieval
 *    > Even with good documents:
 *    > If user query is:
 *      - Spelling mistakes
 *      - Lack of Knowledge - Missing Technical terms
 *      - Missing Keywords
 *      - Unordered Keywords
 *    > Retrieval quality drops.
 *   
 *    Example:
 *    - User: "how diabetis cure"
 *    - Vector search may fail.
 *    - Result: Retrieval poor → Generation poor.
 * 
 * 3. One-Shot Retrieval Problem
 *    > Basic RAG retrieves only once.
 *    > If retrieval is wrong:
 *      - No correction
 *      - No retry
 *      - No refinement
 *    > It blindly trusts top-K.
*/

/**
 * Advanced RAG Patterns:
 * > To solve these issues, we use:
 *   1. Corrective RAG
 *   2. Query Expansion
 *   3. Subquery RAG
 *   4. HyDE
 *   5. Self-RAG
*/


/**
 * Understanding Corrective RAG:
 * - Corrective RAG is an advanced RAG pattern that improves user queries.
 * - It uses two main approaches:
 *   1. Query Rewriting: Corrects and enhances queries
 *   2. Query Expansion: Broadens queries for better results
 *   3. Subquery RAG: Breaks down complex queries into smaller subqueries
 * 
 * - Main Goals:                        Benefits:
 *   - Improve accuracy                 - Better search results
 *   - Better understand user intent    - Reduced errors & more relevant responses
 *   - Improve retrieval quality        - More relevant responses
 * 
 * - Note: We can use any of these approaches or a combination of them.
*/

/**
 * 1. Query Rewriting:
 *    - Whenever a user query comes in, we cannot depend directly on it. We 
 *      always use a mini or nano model for auto-correction and improvement 
 *      of the query through:
 *      a. Fixing Typos
 *      b. Adding more context
 *    - When we create vector embeddings for this improved query, it will
 *      attract more relevant chunks from the vector store. Then we can
 *      use a chatbot to generate the response.
 *    - However, this approach has tradeoffs as it increases both cost and
 *      processing time.
 *                                                                Chunk Store                     
 *      +--------+         +--------+        +-----------+       +-----------+       +-----------+         +--------+
 *      |        |-------->|        |------->|           |------>|           |-------|           |--------+|        |-----> Answer
 *      +--------+         +--------+        +-----------+       +-----------+       +-----------+         +--------+ 
 *      User Query       Query Rewriting      Embeddings         Vector Search      Retrieved Chunks        Chat/LLM
 * 
 *    - While adding more GPUs can improve speed, it significantly increases
 *      infrastructure costs.
 *    - Self-hosting models can help optimize both speed and costs, but it
 *      introduces scalability challenges when user traffic increases.
*/

/**
 * 2. Query Expansion:
 *    - Query expansion is a technique that builds upon query rewriting by
 *      focusing on broadening the search scope through related terms.
 *    
 *    Key Components (Similar to Query Rewriting):
 *    a. Auto-correction & Typo Fixing
 *       - First, we fix spelling mistakes or small errors.
 *       - This ensures the query is accurate before we try expanding it.
 *       - Example: "javasript tutorl" -> "javascript tutorial"
 *    
 *    b. Context Enhancement (Broaden the Query)
 *       - Generate multiple variations (chunks) of the query.
 *       - Add:
 *         - Synonyms (car -> automobile)
 *         - Related words (AI -> Artificial Intelligence, machine learning)
 *         - Domain-specific terms (medicine: heart attack -> myocardial infraction)
 *       - This way, the search covers a wider set of possibilities.
 *
 *    c. Quality Control with a Mini Model (Relevance Check)
 *       - Since expansion generates many query variations, not all will be
 *         useful.
 *       - Use a small/mini model as a judge:
 *         1. Pass the original query + retrieved chunks to the mini model
 *         2. Ask the model to tell us:
 *            - How good are these retrieved chunks compared to the original
 *              query?
 *            - How many are actually relevant? 
 *         3. The model scores each chunk for semantic match & relevance.
 *       - Keep only the most relevant chunks, discard the noisy ones.
 *       - Add these refined chunks back into the context and re-run the
 *         pipeline.
 *       - Repeat until you get high-quality, relevant
 * 
 * Note: Now result accuracy is very high, but this is a very expensive 
 *       process and is not recommended for production environments.
 *
 *    B. Architecture Diagram:
 *                                                                   +-------> Chunk-1 +------+
 *                                                                   |                        |   All Chunks + User Query
 *      +-----------+         +-----------+       +-----------+      +-------> Chunk-2 +------+       +----------+
 *      |           |-------->|           |------>|           |------|                        |------>|Judgement |------> Most relevant chunks
 *      +-----------+         +-----------+       +-----------+      +-------> Chunk-3 +------+       +----------+
 *       User Query          Query Rewriting        Embedding        |                        |        Mini Model 
 *                                  ^                                +-------> Chunk-4 +------+            |
 *                                  |                                                                      |
 *                                  |                                                                      |
 *                                  +----------------------------------------------------------------------+
 *                                     Re-write Query based on the Judgement & check more chunks created
 *                                                                    |
 *                                                                    +-------> Chunk-5 +------+
 *                                                                    |                        |
 *                                                                    +-------> Chunk-6 +------+
 *                                                                Adding this into context and re-run the pipeline
 * 
 * 
 *    C. Pipeline Flow:
 *       1. User submits initial query
 *       2. Query undergoes pre-processing and expansion
 *       3. System generates embeddings for expanded query
 *       4. Vector search retrieves multiple chunk sets
 *       5. Quality control model evaluates chunks
 *       6. If needed, query is refined and process repeats
 *       7. Final set of most relevant chunks is selected
 *
 *    Tradeoffs & Considerations:
 *    - Increased Processing: Multiple embeddings per query
 *    - Higher Latency      : More vector searches required
 *    - Cost Impact         : Additional API calls and compute resources
 *    - Precision vs Recall : Broader search may reduce accuracy
 *    
 *    Best Practices:
 *    - Use semantic expansion over simple synonym matching
 *    - Implement relevance scoring to filter expanded results
 *    - Consider caching common query expansions
 *    - Monitor and tune expansion breadth based on results
*/

/**
 * 3. Subquery RAG:
 *    - Subquery RAG is a technique where instead of treating the user query
 *      as one big question, we split it into smaller subqueries.
 *    - Each subquery is run through the retrieval system to fetch focused
 *      chunks, and then the results are merged to form a more accurate
 *      final answer.
 * 
 *    Key Components:
 *    A. Query Decomposition (Breaking into smaller queries):
 *       - The original query is analyzed and broken into multiple smaller
 *         pipelines.
 *       - Example: 
 *         User Query : What are the causes, symptoms and treatment of diabetes?
 *         Sub-Queries: a. What are the causes of diabetes?
 *                      b. What are the symptoms of diabetes?
 *                      c. What are the treatmesnts of diabetes?
 *       - This ensures that each aspect of the query is properly covered.
 * 
 *    B. Independent Retrieval (Chunk fetching per subquery):
 *       - Each subquery is run independently against the vector database 
 *         (retriever).
 *       - This helps avoid missing information that might be skipped if we
 *         only retrieved with the big original query.
 *       - Ensures focused and higher recall chunks for each part.
 * 
 *    C. Aggregation & Fusion:
 *       - After retrieving results for all subqueries, we combine the chunks.
 *       - Techniques used:
 *         a. Merging      : Simply combining chunks.
 *         b. Reranking    : Using a mini model to score and rank the chunks 
 *                           by relevance (remove irrelevant chunks).
 *         c. Deduplication: Removing overlapping or repetitive chunks.
 *       - This ensures that the final answer is accurate and relevant.
 * 
 *    D. Answer Composition:
 *       - The model now has a comprehensive context covering all parts of 
 *         the query.
 *       - It merges the subquery answers into a single coherent response.
 *       - Example final answer Covers:
 *         > causes, symptoms, and treatments all in one structured response.
 *
 *    Architecture Diagram:
 *                                                                                       +-------> Subquery-A +------+
 *                                                                                       |                           |   All Subqueries + Results
 *      +-----------+         +---------+         +-----------+       +-----------+      +-------> Subquery-B +------+       +----------+
 *      |           |-------->|         |-------->|           |------>|           |------|                           |------>|Combine & |------> Generate Final Answer
 *      +-----------+         +---------+         +-----------+       +-----------+      +-------> Subquery-C +------+       |Reranking |
 *       User Query        Query Translation    Query Decomposer      Embedding          |                           |       +----------+
 *                                                 (LLM/Rules)                           +-------> Subquery-D +------+    Fuse All retrieved chunks &
 *                                                                                                       Rerank chunks
 *                                                                                                       Deduplication
 *
 *    Pipeline Flow:
 *    1. Complex user query is received
 *    2. Query decomposer breaks it into simpler subqueries
 *    3. Each subquery gets processed independently
 *    4. Vector search runs for each subquery
 *    5. Results are combined and deduplicated
 *    6. Final context is built from merged results
 *    7. LLM generates answer using combined context
 *
 *    Tradeoffs & Considerations:
 *    - Higher Latency : Multiple parallel searches needed
 *    - Increased Costs: More embedding operations
 *    - Better Coverage: Handles complex queries better
 *    - Result Quality : May need careful deduplication
 *    
 *    Best Practices:
 *    - Use intelligent query decomposition
 *    - Implement efficient deduplication
 *    - Consider parallel processing
 *    - Balance subquery count vs performance
*/ 


/**
 * 4. Hypothetical Document Generation (HyDE):
 *    - HyDE stands for Hypothetical Document Embeddings
 *    - It uses the LLM's knowledge to increase the accuracy of the search
 *      by generating a hypothetical answer before searching.
 *    - Instead of directly searching with the user's question, it first
 *      creates a detailed hypothetical answer and then searches using that
 *    - Core Concept:
 *      "Rather than searching with the question, imagine what an ideal answer
 *       would look like, and search with that instead!"
 * 
 *    Key Components & Process Flow:
 *    A. Initial User Query:
 *       - Example: "What is Node.js used for?"
 *       - This is the starting point of the HyDE process
 *   
 *    B. Generate a Hypothetical Answer:
 *       - Instead of searching with just the question, we ask the LLM to
 *         write a fake but realistic answer.
 *       - Example of Hypothetical Answer:
 *         "Node.js is a runtime environment for executing JavaScript code
 *          outside of a browser. It's used for building server-side
 *          applications and APIs."
 *       - This doesn't come from your database yet - it's just generated
 *         by the model!
 *   
 *    C. Embedding Generation:
 *       - The hypothetical answer is converted into vector embeddings
 *       - Why? Because embeddings captures:
 *         - Semantic meaning
 *         - Technical context
 *         - Relationship between concepts
 *         (what the answer is about, not just the words)
 *         
 * 
 *    D. Retrieve Similar Documents
 *       - Use the embedding of the hypothetical answer to search your vector
 *         database.
 *       - The database will return the most relevant chunks from the Node.js
 *         PDF.
 *       - Example retrieved chunks:
 *         "Node.js provides event-driven architecture....."
 *         "It is commonly used for REST APIs and real-time apps like chats..."
 * 
 *    E. Generate the Final Answer:
 *       - Now, feed these things to the LLM:
 *         1. The original user query
 *         2. Retrieved relevant chunks
 *         3. The hypothetical answer context
 *       - Produces a comprehensive final response:
 *         "Node.js is a powerful runtime used for developing scalable network
 *          applications, REST APIs, and real-time services like chat applications
 *          and streaming platforms. Its non-blocking, event-driven architecture
 *          makes it ideal for handling concurrent operations."
 *   
 * 
 * 
 *    Architecture Diagram:                                         Hypothetical Answer Embedding
 *                                                                           +----------+                                    +----Chunk-1----+
 *                                                                  +------->|          |--------------+                     |               |
 *                                                                  |        +----------+              |                     +----Chunk-2----+
 *    +-----------+         +-----------+        +-----------+      |                                  +--------------+      |               |           +--------------+
 *    |           |-------->|           |------->|           |------+                                  |              |------+----Chunk-3----+---------->| Final Answer |
 *    +-----------+         +-----------+        +-----------+      |                                  +--------------+      |               |           +--------------+
 *    User Query          Query Translation       Claude LLM        |        +----------+              | Vector Search       +----Chunk-4----+            Generated using
 *                                              Create 100 words    +------->|          |--------------+                     |               |            retrieved chunks
 *                                              answer using LLM             +----------+                                    +----Chunk-5----+            & original query
 *                                              based on query           User Query Embedding                                                 
 *                                                                                                                            
 * 
 *    Why HyDE is powerful?
 *    We use HyDE when the question lacks specificity or lacks easily
 *    identifiable elements to derive an answer from a given context.
 * 
 *    Drawbacks:
 *    But there is a drawback of this approach, it may not consistently
 *    produce good results.
*/

/**
 * 5. Self-RAG (Most Advanced Pattern)
 *    > Self-RAG introduces self-evaluation and adaptive retrieval.
 *    > Core Idea:
 *      [Retrieve > Evaluate > Retry(if needed) > Generate > Done]
 *        - Do I need retrieval?
 *        - Is retrieved context enough?
 *        - Should I retrieve again?
 * 
 *    > High-Level Flow:
 *
 *                    +----------------+
 *                    |   User Query   |
 *                    +----------------+
 *                             |
 *                             v
 *                    +----------------+
 *                    |  LLM (Decide)  |
 *                    | Need Retrieval?|
 *                    +----------------+
 *                         |        |
 *                  (No)   |        |  (Yes)
 *                         |        v
 *                         |   +----------------+
 *                         |   |   Embedding    |
 *                         |   +----------------+
 *                         |            |
 *                         |            v
 *                         |   +----------------+
 *                         |   | Vector Search  |
 *                         |   +----------------+
 *                         |            |
 *                         |            v
 *                         |   +----------------+
 *                         |   | Retrieved Docs |
 *                         |   +----------------+
 *                         |            |
 *                         |            v
 *                         |   +------------------------+
 *                         |   | LLM Evaluates Context  |
 *                         |   | Is it sufficient?      |
 *                         |   +------------------------+
 *                         |        |            |
 *                         |   (No) |            | (Yes)
 *                         |        v            |
 *                         |   +------------------------+
 *                         |   | Refine Query / Retry   |
 *                         |   +------------------------+
 *                         |        |
 *                         |        +---------> (Back to Embedding)
 *                         |
 *                         v
 *                 +----------------+
 *                 | Final Answer   |
 *                 +----------------+
 *
 *    > Step-by-Step Pipeline:
 *      1. User submits query
 *      2. LLM decides:
 *           - Can I answer directly?
 *           - Do I need external knowledge?
 *      3. If retrieval is required:
 *           - Generate embedding
 *           - Perform vector search
 *           - Retrieve chunks
 *      4. LLM evaluates retrieved chunks:
 *           - Are they relevant?
 *           - Is information complete?
 *      5. If not sufficient:
 *           - Refine query
 *           - Retrieve again
 *      6. Once context is sufficient:
 *           - Generate final answer
*/
