/**
 * SECTION 4: RETRIEVAL ENHANCEMENT TECHNIQUES
 * ======================================================================
 * 
 * These techniques improve HOW you search, regardless of which RAG
 * architecture you use (Basic, Corrective, or Self-RAG).
 */

/**
 * 4.1 QUERY REWRITING
 * ----------------------------------------------------------------------
 * 
 * CORE CONCEPT:
 * Before searching, improve the user's query to increase chances of
 * finding relevant documents.
 * 
 * WHY QUERY REWRITING IS NEEDED:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Users are messy! They:
 * - Make spelling mistakes
 * - Use incorrect technical terms
 * - Write incomplete questions
 * - Use ambiguous language
 * - Include unnecessary words
 * 
 * PROBLEM EXAMPLES:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Type 1: Spelling Errors
 *   User: "javasript tutorl"
 *   Should be: "javascript tutorial"
 *   
 * Type 2: Missing Context
 *   User: "how to make it"
 *   Should be: "how to make pasta carbonara"
 *   
 * Type 3: Wrong Terms
 *   User: "heart attack signs"
 *   Documents use: "myocardial infarction symptoms"
 *   
 * Type 4: Too Wordy
 *   User: "I was wondering if you could possibly tell me about..."
 *   Should be: "information about [topic]"
 * 
 * QUERY REWRITING TECHNIQUES:
 * ──────────────────────────────────────────────────────────────────
 * 
 * TECHNIQUE A: SPELLING CORRECTION
 * ────────────────────────────────
 * How it works:
 *   Use a spelling correction model or API
 * 
 * Example:
 *   Input: "what is machin lerning"
 *   Output: "what is machine learning"
 * 
 * Implementation options:
 *   - SymSpell (fast, open-source)
 *   - Bing Spell Check API
 *   - Custom dictionary + Levenshtein distance
 * 
 * TECHNIQUE B: QUERY EXPANSION (Linguistic)
 * ────────────────────────────────────────
 * How it works:
 *   Add synonyms and related terms
 * 
 * Example:
 *   Input: "car maintenance"
 *   Output: "car maintenance automobile repair vehicle service"
 * 
 * Sources for synonyms:
 *   - WordNet database
 *   - Domain-specific thesaurus
 *   - Embedding similarity (find similar words)
 * 
 * TECHNIQUE C: QUERY COMPRESSION
 * ──────────────────────────────
 * How it works:
 *   Remove stop words and unnecessary phrases
 * 
 * Example:
 *   Input: "I was wondering if you could tell me about the history of Rome"
 *   Output: "history Rome"
 * 
 * Stop words to remove:
 *   - a, an, the, and, or, but
 *   - I, you, he, she, it, we, they
 *   - is, am, are, was, were
 *   - could, would, should, might
 * 
 * TECHNIQUE D: TECHNICAL TERM MAPPING
 * ──────────────────────────────────
 * How it works:
 *   Map layman terms to technical terms
 * 
 * Example:
 *   Input: "heart attack"
 *   Output: "myocardial infarction"
 * 
 * Term mapping table:
 * ┌────────────────────┬─────────────────────────┐
 * │ Layman Term        │ Technical Term          │
 * ├────────────────────┼─────────────────────────┤
 * │ heart attack       │ myocardial infarction   │
 * │ high blood pressure│ hypertension             │
 * │ sugar disease      │ diabetes mellitus       │
 * │ brain attack       │ cerebrovascular accident │
 * └────────────────────┴─────────────────────────┘
 * 
 * TECHNIQUE E: QUESTION TO KEYWORDS
 * ─────────────────────────────────
 * How it works:
 *   Convert natural language questions to search keywords
 * 
 * Example:
 *   Input: "What is the penalty for stealing in California?"
 *   Output: "California theft penalty law"
 * 
 * Process:
 *   1. Extract key entities (California, stealing, penalty)
 *   2. Remove question words (what, is, the, for, in)
 *   3. Reorder for search relevance
 * 
 * TECHNIQUE F: MULTI-QUERY GENERATION
 * ───────────────────────────────────
 * How it works:
 *   Generate multiple versions of the query and search with all
 * 
 * Example:
 *   Original: "machine learning tutorial"
 *   
 *   Generated versions:
 *   - "machine learning guide for beginners"
 *   - "learn machine learning step by step"
 *   - "intro to machine learning"
 *   - "machine learning basics explained"
 * 
 * COMPLETE QUERY REWRITING PIPELINE:
 * ──────────────────────────────────────────────────────────────────
 * 
 * ┌────────────┐
 * │ Raw Query  │ "i want to no about machin lerning for begnners"
 * └──────┬─────┘
 *        ▼
 * ┌────────────┐
 * │ Step 1:    │ "i want to know about machine learning for beginners"
 * │ Spelling   │
 * │ Correction │
 * └──────┬─────┘
 *        ▼
 * ┌────────────┐
 * │ Step 2:    │ "know about machine learning beginners"
 * │ Stop Word  │
 * │ Removal    │
 * └──────┬─────┘
 *        ▼
 * ┌────────────┐
 * │ Step 3:    │ "learn about machine learning beginners"
 * │ Synonym    │
 * │ Expansion  │
 * └──────┬─────┘
 *        ▼
 * ┌────────────┐
 * │ Step 4:    │ "machine learning tutorial beginners"
 * │ Question   │
 * │ to Keyword │
 * └──────┬─────┘
 *        ▼
 * ┌────────────┐
 * │ Final Query│ "machine learning tutorial beginners guide"
 * └────────────┘
 * 
 * IMPLEMENTATION EXAMPLE (Pseudocode):
 * ──────────────────────────────────────────────────────────────────
 * 
 * function rewrite_query(raw_query):
 *     # Step 1: Spelling correction
 *     corrected = spell_check(raw_query)
 *     
 *     # Step 2: Remove stop words
 *     words = corrected.split()
 *     keywords = [w for w in words if w not in STOP_WORDS]
 *     
 *     # Step 3: Map layman terms to technical
 *     for i, word in enumerate(keywords):
 *         if word in TERM_MAPPING:
 *             keywords[i] = TERM_MAPPING[word]
 *     
 *     # Step 4: Generate multiple versions
 *     versions = [
 *         " ".join(keywords),
 *         add_synonyms(keywords),
 *         reorder_for_search(keywords)
 *     ]
 *     
 *     return versions
 * 
 * BENEFITS OF QUERY REWRITING:
 * ──────────────────────────────────────────────────────────────────
 * ✓ Fixes user errors automatically
 * ✓ Improves search accuracy significantly
 ✓ Handles vocabulary mismatches
 * ✓ Works with any search system
 * ✓ Low cost (small models work well)
 * 
 * TRADEOFFS:
 * ──────────────────────────────────────────────────────────────────
 * ✗ Adds slight latency (100-500ms)
 * ✗ May over-correct sometimes
 * ✗ Requires domain knowledge for term mapping
 */

/**
 * 4.2 QUERY EXPANSION
 * ----------------------------------------------------------------------
 * 
 * CORE CONCEPT:
 * Broaden the search by generating multiple related queries and
 * combining results.
 * 
 * DIFFERENCE FROM QUERY REWRITING:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ Query Rewriting: Fix and improve the SINGLE best query         │
 * │ Query Expansion: Generate MULTIPLE queries to cast wider net   │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * WHY QUERY EXPANSION IS NEEDED:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Problem: Different documents use different words for same concept
 * 
 * Example:
 *   User searches: "automobile"
 *   
 *   Documents might use:
 *   - "car"
 *   - "vehicle"
 *   - "motor vehicle"
 *   - "auto"
 *   - "automotive"
 *   
 * Without expansion, you miss documents using different terms!
 * 
 * QUERY EXPANSION TECHNIQUES:
 * ──────────────────────────────────────────────────────────────────
 * 
 * TECHNIQUE A: THESAURUS-BASED EXPANSION
 * ──────────────────────────────────────
 * How it works:
 *   Use a thesaurus to add synonyms
 * 
 * Example:
 *   Original: "car maintenance"
 *   Expanded: "car maintenance OR automobile maintenance OR 
 *              vehicle maintenance OR auto repair"
 * 
 * Sources:
 *   - WordNet
 *   - Domain-specific thesaurus
 *   - Custom synonym lists
 * 
 * TECHNIQUE B: EMBEDDING-BASED EXPANSION
 * ──────────────────────────────────────
 * How it works:
 *   1. Embed the query
 *   2. Find closest words in embedding space
 *   3. Add those words to query
 * 
 * Example:
 *   Query: "happy"
 *   Embedding nearest neighbors:
 *     - joyful (0.92)
 *     - cheerful (0.89)
 *     - pleased (0.87)
 *     - delighted (0.86)
 *   
 *   Expanded: "happy OR joyful OR cheerful OR pleased"
 * 
 * TECHNIQUE C: HISTORICAL SEARCH EXPANSION
 * ────────────────────────────────────────
 * How it works:
 *   Look at past successful searches and add terms users found useful
 * 
 * Example:
 *   User searches: "machine learning"
 *   Past successful searches also used:
 *     - "artificial intelligence"
 *     - "deep learning"
 *     - "neural networks"
 *   
 *   Add these to current search
 * 
 * TECHNIQUE D: RELEVANCE FEEDBACK EXPANSION
 * ─────────────────────────────────────────
 * How it works:
 *   1. Do initial search
 *   2. Look at top retrieved documents
 *   3. Extract key terms from those documents
 *   4. Add those terms to query and search again
 * 
 * Example:
 *   Initial query: "climate change"
 *   Top documents contain: "global warming", "greenhouse gases", "carbon emissions"
 *   Expanded query: "climate change OR global warming OR greenhouse gases"
 * 
 * TECHNIQUE E: STRUCTURED EXPANSION
 * ─────────────────────────────────
 * How it works:
 *   Expand based on known entity relationships
 * 
 * Example for medical domain:
 *   Query: "diabetes treatment"
 *   
 *   Knowledge graph expands to:
 *   - "diabetes medication" (related treatments)
 *   - "insulin therapy" (specific treatment)
 *   - "metformin" (common drug)
 *   - "blood sugar management" (related concept)
 * 
 * COMPLETE QUERY EXPANSION PIPELINE:
 * ──────────────────────────────────────────────────────────────────
 * 
 * ┌────────────┐
 * │ Base Query │ "machine learning"
 * └──────┬─────┘
 *        ▼
 * ┌─────────────────────────────────┐
 * │ Expansion Engine                 │
 * │ ┌─────────────────────────────┐ │
 * │ │ Thesaurus: AI, ML           │ │
 * │ │ Embeddings: deep learning   │ │
 * │ │ Historical: neural networks │ │
 * │ │ Domain: pattern recognition │ │
 * │ └─────────────────────────────┘ │
 * └───────────────┬─────────────────┘
 *                 ▼
 * ┌─────────────────────────────────┐
 * │ Expanded Query Set               │
 * │ 1. "machine learning"            │
 * │ 2. "artificial intelligence"     │
 * │ 3. "deep learning"               │
 * │ 4. "neural networks"             │
 * │ 5. "pattern recognition"         │
 * └───────────────┬─────────────────┘
 *                 ▼
 * ┌─────────────────────────────────┐
 * │ Search Each Query Independently  │
 * │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
 * │ │ Q1  │ │ Q2  │ │ Q3  │ │ Q4  │ │
 * │ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ │
 * │    ▼       ▼       ▼       ▼    │
 * │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
 * │ │ R1  │ │ R2  │ │ R3  │ │ R4  │ │
 * │ └─────┘ └─────┘ └─────┘ └─────┘ │
 * └───────────────┬─────────────────┘
 *                 ▼
 * ┌─────────────────────────────────┐
 * │ Combine & Deduplicate Results    │
 * │ - Merge all retrieved chunks     │
 * │ - Remove duplicates               │
 * │ - Rerank by relevance            │
 * └───────────────┬─────────────────┘
 *                 ▼
 * ┌─────────────────────────────────┐
 * │ Final Context for Generation     │
 * └─────────────────────────────────┘
 * 
 * IMPLEMENTATION EXAMPLE:
 * ──────────────────────────────────────────────────────────────────
 * 
 * class QueryExpander:
 *     def expand_query(self, query):
 *         # Generate variations
 *         variations = []
 *         
 *         # 1. Thesaurus-based
 *         for word in query.split():
 *             synonyms = self.thesaurus.get(word, [])
 *             for syn in synonyms[:2]:  # Top 2 synonyms
 *                 variations.append(query.replace(word, syn))
 *         
 *         # 2. Embedding-based
 *         query_embedding = self.embed(query)
 *         similar_terms = self.find_similar_terms(query_embedding, top_k=3)
 *         for term in similar_terms:
 *             variations.append(f"{query} {term}")
 *         
 *         # 3. Add original
 *         variations.append(query)
 *         
 *         return list(set(variations))  # Remove duplicates
 *     
 *     def search_with_expansion(self, query, top_k=10):
 *         variations = self.expand_query(query)
 *         
 *         all_results = []
 *         for var in variations:
 *             results = self.vector_db.search(var, top_k=5)
 *             all_results.extend(results)
 *         
 *         # Deduplicate and rerank
 *         unique_results = self.deduplicate(all_results)
 *         reranked = self.rerank(unique_results, query)
 *         
 *         return reranked[:top_k]
 * 
 * BENEFITS OF QUERY EXPANSION:
 * ──────────────────────────────────────────────────────────────────
 * ✓ Finds more relevant documents
 * ✓ Handles vocabulary mismatch
 * ✓ Increases recall (finds more)
 * ✓ Works well for comprehensive answers
 * 
 * TRADEOFFS:
 * ──────────────────────────────────────────────────────────────────
 * ✗ Higher cost (multiple searches)
 * ✗ Slower response time
 * ✗ May bring irrelevant results
 * ✗ Requires careful deduplication
 */

/**
 * 4.3 SUBQUERY RAG
 * ----------------------------------------------------------------------
 * 
 * CORE CONCEPT:
 * Break complex, multi-part questions into smaller, focused subqueries.
 * Search for each part separately, then combine results.
 * 
 * WHY SUBQUERY RAG IS NEEDED:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Problem: Complex questions often require information from multiple
 *          documents that don't exist together in one place.
 * 
 * Example:
 *   Question: "What are the causes, symptoms, and treatment of diabetes?"
 *   
 *   Reality:
 *   - Document A: Only covers causes
 *   - Document B: Only covers symptoms  
 *   - Document C: Only covers treatment
 *   
 *   Basic RAG might only find Document A → Incomplete answer!
 * 
 * WHEN TO USE SUBQUERY RAG:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Question Patterns That Benefit:
 * 
 * 1. Multi-topic Questions
 *    "What are X, Y, and Z about topic T?"
 * 
 * 2. Comparison Questions
 *    "Compare A and B in terms of X, Y, Z"
 * 
 * 3. Step-by-step Questions
 *    "How to do X? Include preparation, execution, and follow-up"
 * 
 * 4. Multi-entity Questions
 *    "What are the policies of company X in countries Y and Z?"
 * 
 * 5. Chronological Questions
 *    "What happened before, during, and after event X?"
 * 
 * SUBQUERY GENERATION METHODS:
 * ──────────────────────────────────────────────────────────────────
 * 
 * METHOD 1: RULE-BASED DECOMPOSITION
 * ──────────────────────────────────
 * How it works:
 *   Use grammatical rules to split questions
 * 
 * Example Rules:
 *   - Split on "and" in lists: "causes, symptoms, and treatment"
 *   - Split on question words: "what X and what Y"
 *   - Split on comparative phrases: "compare A and B"
 * 
 * Pros: Simple, fast, no API calls
 * Cons: Limited, misses nuance
 * 
 * METHOD 2: LLM-BASED DECOMPOSITION
 * ─────────────────────────────────
 * How it works:
 *   Ask LLM to break down complex questions
 * 
 * Prompt:
 *   """
 *   Break this complex question into smaller, independent subquestions
 *   that can be answered separately:
 *   
 *   Question: {user_question}
 *   
 *   Return as a list:
 *   1. [subquestion 1]
 *   2. [subquestion 2]
 *   3. [subquestion 3]
 *   """
 * 
 * Example:
 *   Input: "What are the causes, symptoms, and treatment of diabetes?"
 *   
 *   Output:
 *   1. "What causes diabetes?"
 *   2. "What are the symptoms of diabetes?"
 *   3. "How is diabetes treated?"
 * 
 * Pros: Handles complex cases, understands nuance
 * Cons: Additional LLM call, slower
 * 
 * METHOD 3: HYBRID APPROACH
 * ─────────────────────────
 * How it works:
 *   Use rules for obvious splits, LLM for complex cases
 * 
 * Process:
 *   if question matches simple patterns:
 *       use rule-based splitting
 *   else:
 *       use LLM-based splitting
 * 
 * SUBQUERY EXECUTION STRATEGIES:
 * ──────────────────────────────────────────────────────────────────
 * 
 * STRATEGY A: SEQUENTIAL EXECUTION
 * ────────────────────────────────
 * Process:
 *   Run subqueries one after another
 * 
 * When to use:
 *   - Subqueries depend on each other
 *   - Limited API concurrency
 *   - Need to control rate limits
 * 
 * STRATEGY B: PARALLEL EXECUTION
 * ──────────────────────────────
 * Process:
 *   Run all subqueries simultaneously
 * 
 * When to use:
 *   - Independent subqueries
 *   - Need fast response
 *   - Good API rate limits
 * 
 * STRATEGY C: ADAPTIVE EXECUTION
 * ──────────────────────────────
 * Process:
 *   Start with most important subquery
 *   Use results to inform subsequent searches
 * 
 * Example:
 *   Question about "causes and treatment"
 *   - First find "causes"
 *   - Use "causes" results to better target "treatment" search
 * 
 * RESULT COMBINATION METHODS:
 * ──────────────────────────────────────────────────────────────────
 * 
 * METHOD A: SIMPLE CONCATENATION
 * ─────────────────────────────
 * Just put all retrieved chunks together
 * 
 * Pros: Simple, preserves all information
 * Cons: May have duplicates, no organization
 * 
 * METHOD B: DEDUPLICATION + RERANKING
 * ──────────────────────────────────
 * Steps:
 *   1. Collect all chunks from all subqueries
 *   2. Remove exact duplicates (same text)
 *   3. Remove near-duplicates (semantic similarity > 0.95)
 *   4. Rerank all chunks against original question
 *   5. Keep top-K most relevant
 * 
 * METHOD C: STRUCTURED COMBINATION
 * ────────────────────────────────
 * Organize results by subquery topic
 * 
 * Example:
 *   {
 *     "causes": [chunk1, chunk2],
 *     "symptoms": [chunk3, chunk4],
 *     "treatment": [chunk5, chunk6]
 *   }
 * 
 * Then in generation, reference appropriate sections
 * 
 * COMPLETE SUBQUERY RAG EXAMPLE:
 * ──────────────────────────────────────────────────────────────────
 * 
 * User Question: "Compare electric cars and hybrid cars in terms of
 *                 cost, environmental impact, and maintenance."
 * 
 * STEP 1: Generate Subqueries
 * ──────────────────────────
 * Subquery 1: "What is the cost of electric cars?"
 * Subquery 2: "What is the cost of hybrid cars?"
 * Subquery 3: "What is the environmental impact of electric cars?"
 * Subquery 4: "What is the environmental impact of hybrid cars?"
 * Subquery 5: "What is the maintenance requirements for electric cars?"
 * Subquery 6: "What is the maintenance requirements for hybrid cars?"
 * 
 * STEP 2: Execute Subqueries (Parallel)
 * ────────────────────────────────────
 * Run all 6 searches simultaneously
 * 
 * Results:
 *   SQ1: [cost_elec_1, cost_elec_2, cost_elec_3]
 *   SQ2: [cost_hyb_1, cost_hyb_2]
 *   SQ3: [env_elec_1, env_elec_2]
 *   SQ4: [env_hyb_1]
 *   SQ5: [maint_elec_1, maint_elec_2]
 *   SQ6: [maint_hyb_1, maint_hyb_2, maint_hyb_3]
 * 
 * STEP 3: Combine Results
 * ──────────────────────
 * Total chunks: 14
 * After deduplication: 12 unique chunks
 * After reranking: Keep top 8 most relevant to original question
 * 
 * STEP 4: Generate Answer
 * ──────────────────────
 * Use all 8 chunks as context
 * LLM generates comprehensive comparison covering all aspects
 * 
 * BENEFITS OF SUBQUERY RAG:
 * ──────────────────────────────────────────────────────────────────
 * ✓ Handles complex multi-part questions
 * ✓ No information loss (each part gets focus)
 * ✓ More comprehensive answers
 * ✓ Can parallelize for speed
 * ✓ Scales to very complex queries
 * 
 * TRADEOFFS:
 * ──────────────────────────────────────────────────────────────────
 * ✗ More API calls = higher cost
 * ✗ Complex to implement
 * ✗ Need good decomposition strategy
 * ✗ Results need careful merging
 * ✗ May retrieve redundant information
 */

/**
 * 4.4 HYPOTHETICAL DOCUMENT EMBEDDINGS (HyDE)
 * ----------------------------------------------------------------------
 * 
 * CORE CONCEPT:
 * Instead of searching with the question, first generate a hypothetical
 * answer, then search with that answer.
 * 
 * THE KEY INSIGHT:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Questions are short and lack detail.
 * Answers are long and contain rich context.
 * Searching with detailed answers finds better matches!
 * 
 * VISUAL EXPLANATION:
 * ──────────────────────────────────────────────────────────────────
 * 
 * Traditional Search:
 *   Question (10 words) ──▶ Search ──▶ Find documents
 *                    ↑_________________↑
 *                    Mismatch! Questions are too short
 * 
 * HyDE Search:
 *   Question (10 words) ──▶ Generate Hypothetical Answer (100 words)
 *                           │
 *                           ▼
 *                    Rich, detailed text
 *                           │
 *                           ▼
 *                    Search with this ──▶ Find better matches
 * 
 * WHY HyDE WORKS:
 * ──────────────────────────────────────────────────────────────────
 * 
 * 1. Semantic Richness
 *    - 100 words contain more meaning than 10 words
 *    - Embeddings capture richer concepts
 * 
 * 2. Domain Alignment
 *    - Hypothetical answer uses domain terminology
 *    - Matches how real documents are written
 * 
 * 3. Context Inclusion
 *    - Includes related concepts implicitly
 *    - Example: "Node.js" answer includes "server", "JavaScript", "runtime"
 * 
 * COMPLETE HyDE PROCESS:
 * ──────────────────────────────────────────────────────────────────
 * 
 * ┌────────────────┐
 * │ User Question  │ "What is Node.js used for?"
 * └────────┬───────┘
 *          ▼
 * ┌────────────────┐
 * │ STEP 1: Generate Hypothetical Answer     │
 * │                                          │
 * │ Prompt: "Write a 100-word answer to:     │
 * │          What is Node.js used for?       │
 * │          Be detailed and use technical   │
 * │          terms as if explaining to a     │
 * │          developer."                      │
 * └────────┬───────┘
 *          ▼
 * ┌─────────────────────────────────────────┐
 * │ Hypothetical Answer                      │
 * │ "Node.js is a JavaScript runtime built   │
 * │  on Chrome's V8 engine that allows       │
 * │  developers to run JavaScript on the     │
 * │  server side. It's commonly used for     │
 * │  building REST APIs, real-time           │
 * │  applications like chat apps,            │
 * │  microservices, and command-line tools.  │
 * │  Its event-driven, non-blocking I/O      │
 * │  model makes it efficient for handling   │
 * │  concurrent connections and I/O-heavy    │
 * │  operations. Popular frameworks include  │
 * │  Express.js, NestJS, and Socket.io."     │
 * └────────┬───────┘
 *          ▼
 * ┌────────────────┐
 * │ STEP 2: Create Embedding                 │
 * │ Hypothetical Answer ──▶ [0.234, -0.567, │
 * │                          0.891, ...]     │
 * └────────┬───────┘
 *          ▼
 * ┌────────────────┐
 * │ STEP 3: Search Vector DB                 │
 * │ Find chunks similar to hypothetical      │
 * │ answer embedding                         │
 * └────────┬───────┘
 *          ▼
 * ┌────────────────┐
 * │ Retrieved Real Documents                  │
 * │ - "Node.js event-driven architecture..."  │
 * │ - "Building REST APIs with Express..."    │
 * │ - "Real-time apps with Socket.io..."      │
 * │ - "Node.js vs other backends..."          │
 * └────────┬───────┘
 *          ▼
 * ┌────────────────┐
 * │ STEP 4: Generate Final Answer             │
 * │ Use: Original Question +                  │
 * │      Hypothetical Answer +                │
 * │      Retrieved Real Documents              │
 * └────────┬───────┘
 *          ▼
 * ┌────────────────┐
 * │ Final Comprehensive Answer                │
 * └────────────────┘
 * 
 * HYPOTHETICAL ANSWER GENERATION PROMPTS:
 * ──────────────────────────────────────────────────────────────────
 * 
 * For Technical Questions:
 * """
 * Write a detailed, technically accurate answer to this question.
 * Use domain-specific terminology and explain concepts thoroughly.
 * Write as if you're an expert explaining to a colleague.
 * 
 * Question: {question}
 * 
 * Answer (100-150 words):
 * """
 * 
 * For Factual Questions:
 * """
 * Write a comprehensive answer to this factual question.
 * Include specific details, dates, numbers, and sources where relevant.
 * Structure the answer with clear facts.
 * 
 * Question: {question}
 * 
 * Answer (100-150 words):
 * """
 * 
 * For Conceptual Questions:
 * """
 * Explain this concept in detail. Include:
 * - Definition and core ideas
 * - Key components or principles
 * - Common applications or examples
 * - Related concepts
 * 
 * Concept: {question}
 * 
 * Explanation (100-150 words):
 * """
 * 
 * HyDE VARIATIONS:
 * ──────────────────────────────────────────────────────────────────
 * 
 * VARIATION 1: MULTIPLE HYPOTHETICAL ANSWERS
 * ──────────────────────────────────────────
 * Generate 3-5 different hypothetical answers
 * Search with all, combine results
 * 
 * Benefits:
 * - Covers different aspects of the question
 * - More comprehensive retrieval
 * - Reduces risk of one bad hypothetical
 * 
 * VARIATION 2: STRUCTURED HYPOTHETICAL
 * ─────────────────────────────────────
 * Generate answer in structured format
 * 
 * Example:
 * """
 * Question: "What are Node.js use cases?"
 * 
 * Hypothetical Answer (Structured):
 * - Web Applications: Building REST APIs with Express.js
 * - Real-time Apps: Chat applications with Socket.io
 * - Microservices: Lightweight service architecture
 * - CLI Tools: Building command-line utilities
 * - IoT: Running on resource-constrained devices
 * """
 * 
 * VARIATION 3: HYBRID HyDE + QUERY
 * ─────────────────────────────────
 * Search with both:
 * - Original question embedding
 * - Hypothetical answer embedding
 * Combine results
 * 
 * IMPLEMENTATION EXAMPLE:
 * ──────────────────────────────────────────────────────────────────
 * 
 * class HyDE:
 *     def __init__(self, llm, embedder, vector_db):
 *         self.llm = llm
 *         self.embedder = embedder
 *         self.vector_db = vector_db
 *     
 *     def generate_hypothetical(self, question):
 *         prompt = f"""
 *        
*/ 