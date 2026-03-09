
/**
 * Basic RAG:
 * > A comprehensive, beginner-friendly guide to Retrieval-Augmented 
 *   Generation
 * 
 * TABLE OF CONTENTS:
 * 1. RAG FUNDAMENTALS
 *    1.1 What is RAG?
 *    1.2 Why RAG Matters
 *    1.3 Core Concepts Explained
 * 
 * 2. BASIC RAG - DEEP DIVE
 *    2.1 Step 1: Indexing Phase
 *    2.2 Step 2: Retrieval Phase
 *    2.3 Step 3: Generation Phase
 *    2.4 Complete Basic RAG Example
 */

/**
 * SECTION 1: RAG FUNDAMENTALS
 */

/**
 * 1.1 WHAT IS RAG?
 * 
 * RAG = Retrieval-Augmented Generation
 * 
 * SIMPLE DEFINITION:
 * RAG is a technique that gives Large Language Models (LLMs) access to
 * YOUR private data, so they can answer questions about information they
 * weren't trained on.
 * 
 * TECHNICAL DEFINITION:
 * A framework that combines information retrieval systems with generative
 * models. It first retrieves relevant documents from a knowledge base,
 * then uses those documents as context for generation.
 * 
 * ANALOGY FOR BEGINNERS:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ Without RAG: You have a brilliant friend (LLM) who read         │
 * │              millions of books from public libraries. But they  │
 * │              don't know anything about YOUR personal diary.     │
 * │                                                                 │
 * │ With RAG:    You give this friend access to YOUR diary before   │
 * │              answering questions. Now they know both public     │
 * │              knowledge AND your private information.            │
 * └─────────────────────────────────────────────────────────────────┘
 */

/**
 * 1.2 WHY RAG MATTERS
 * 
 * KEY BENEFITS WITH DETAILED EXPLANATIONS:
 * 
 * BENEFIT 1: PRIVATE DATA ACCESS
 * ──────────────────────────────────────────────────────────────────
 * Problem: LLMs are trained on public internet data only
 * Solution: RAG connects LLMs to your private documents
 * 
 * Real Example:
 *   Law Firm with 10,000 confidential case files
 *   → Without RAG: LLM says "I don't know about your cases"
 *   → With RAG: LLM answers "Case #123 was about theft, decided in 2023"
 * 
 * BENEFIT 2: COST EFFECTIVENESS
 * ──────────────────────────────────────────────────────────────────
 * Comparison:
 * 
 * ┌────────────────────┬────────────────────────┬──────────────────┐
 * │ Approach           │ Estimated Cost         │ Time Required    │
 * ├────────────────────┼────────────────────────┼──────────────────┤
 * │ Train New Model    │ $1M - $10M             │ Months to Years  │
 * │ Fine-tune Model    │ $10K - $100K           │ Weeks to Months  │
 * │ RAG                │ $100 - $1000/month     │ Days to Setup    │
 * └────────────────────┴────────────────────────┴──────────────────┘
 * 
 * BENEFIT 3: REAL-TIME UPDATES
 * ──────────────────────────────────────────────────────────────────
 * With RAG: Add document at 10:00 AM → Answer questions at 10:05 AM
 * Without RAG: Need to retrain model (months) for new information
 * 
 * BENEFIT 4: VERIFIABILITY
 * ──────────────────────────────────────────────────────────────────
 * RAG can SHOW you where information came from:
 *   Answer: "The defendant was found guilty"
 *   Source: "criminal_case_123.pdf, page 42, paragraph 3"
 * 
 * This is CRITICAL for:
 * - Legal applications (need to cite cases)
 * - Medical applications (need to cite research)
 * - Enterprise (need to verify facts)
 */

/**
 * 1.3 CORE CONCEPTS EXPLAINED
 * 
 * Before diving deep, understand these fundamental concepts:
 * 
 * CONCEPT 1: EMBEDDINGS
 * ──────────────────────────────────────────────────────────────────
 * What: Converting text into lists of numbers that capture meaning
 * 
 * Simple Explanation:
 *   Think of embeddings as "fingerprints" for text. Similar texts have
 *   similar fingerprints.
 * 
 * Technical:
 *   Text → Model → [0.234, -0.567, 0.891, ...] (768 or 1536 numbers)
 * 
 * Example:
 *   "cat"     → [0.1, 0.3, -0.2, 0.5, ...]
 *   "kitten"  → [0.11, 0.29, -0.19, 0.48, ...]  (similar)
 *   "car"     → [-0.8, 0.1, 0.7, -0.3, ...]      (different)
 * 
 * CONCEPT 2: VECTOR DATABASE
 * ──────────────────────────────────────────────────────────────────
 * What: A database specialized in storing and searching embeddings
 * 
 * Simple Explanation:
 *   Regular DB: Finds exact matches ("WHERE name = 'John'")
 *   Vector DB: Finds similar matches ("Find texts similar to this idea")
 * 
 * Popular Options:
 *   - Pinecone (cloud-based)
 *   - Weaviate (self-hosted)
 *   - Chroma (lightweight, local)
 *   - Qdrant (fast, scalable)
 * 
 * CONCEPT 3: CHUNKING
 * ──────────────────────────────────────────────────────────────────
 * What: Splitting long documents into smaller pieces
 * 
 * Why:
 *   - LLMs have limited context windows (can't read 1000 pages)
 *   - Need precise retrieval (small chunks = precise matches)
 * 
 * Chunking Strategies:
 *   ┌──────────────┬──────────────────────────┬──────────────────┐
 *   │ Strategy     │ How it Works             │ Best For         │
 *   ├──────────────┼──────────────────────────┼──────────────────┤
 *   │ Fixed Size   │ Split every 500 tokens   │ Simple documents │
 *   │ Paragraph    │ Split by paragraphs       │ Articles, essays │
 *   │ Semantic     │ Split at topic changes    │ Complex content │
 *   │ Recursive    │ Try multiple splitters    │ Mixed content   │
 *   └──────────────┴──────────────────────────┴──────────────────┘
 * 
 * CONCEPT 4: SIMILARITY SEARCH
 * ──────────────────────────────────────────────────────────────────
 * What: Finding vectors closest to your query vector
 * 
 * How it works mathematically:
 *   Calculate distance between vectors:
 *   - Cosine Similarity : Measures angle between vectors
 *   - Euclidean Distance: Measures straight-line distance
 *   - Dot Product       : Measures overlap
 * 
 * CONCEPT 5: CONTEXT WINDOW
 * ──────────────────────────────────────────────────────────────────
 * What: Maximum amount of text an LLM can process at once
 * 
 * Examples:
 *   - GPT-3.5: 4K tokens (~3000 words)
 *   - GPT-4  : 8K-32K tokens (~6000-24000 words)
 *   - Claude : 100K-200K tokens (~75,000-150,000 words)
 * 
 * 1 token ≈ 0.75 words in English
 */

/**
 * SECTION 2: BASIC RAG - DEEP DIVE
 */

/**
 * 2.1 STEP 1: INDEXING PHASE (Prepare Information)
 * 
 * WHAT IS INDEXING?
 * The process of converting raw documents into a searchable format
 * BEFORE users start asking questions.
 * 
 * DETAILED INDEXING PIPELINE:
 * 
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │   Raw      │───>│   Clean    │───>│   Chunk    │───>│  Embed     │
 * │ Documents  │    │            │    │            │    │            │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 *                                                              │
 *                                                              ▼
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │ Production │<───│   Store    │<───│   Add      │<───│   Create   │
 * │   Ready    │    │   in DB    │    │  Metadata  │    │  Vectors   │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 * 
 * SUB-STEP 1.1: DOCUMENT CLEANING
 * ──────────────────────────────────────────────────────────────────
 * 
 * Why Clean?
 *   Raw documents are messy. Cleaning prevents "garbage in, garbage out"
 * 
 * Common Cleaning Operations:
 * 
 * PDFs:
 *   - Remove headers/footers
 *   - Fix broken text (scanning errors)
 *   - Extract text from images (OCR)
 *   - Remove page numbers
 * 
 * HTML/Web:
 *   - Remove HTML tags
 *   - Remove ads and navigation
 *   - Extract main content only
 *   - Handle character encoding
 * 
 * Word/Excel:
 *   - Extract text from tables
 *   - Remove comments/track changes
 *   - Handle embedded objects
 * 
 * Code Example (Pseudocode):
 *   function clean_document(raw_text):
 *     text = remove_special_characters(raw_text)
 *     text = fix_encoding_issues(text)
 *     text = remove_extra_whitespace(text)
 *     text = normalize_unicode(text)
 *     return text
 * 
 * SUB-STEP 1.2: CHUNKING STRATEGIES (DETAILED)
 * ──────────────────────────────────────────────────────────────────
 * 
 * STRATEGY A: FIXED-SIZE CHUNKING
 *   How: Split every N characters/tokens regardless of content
 *   
 *   Example with 200-token chunks:
 *     [Tokens 1-200] [Tokens 201-400] [Tokens 401-600] ...
 *   
 *   Pros: Simple, fast, predictable size
 *   Cons: May cut sentences in half, lose context
 * 
 * STRATEGY B: RECURSIVE CHARACTER TEXT SPLITTER
 *   How: Try multiple separators in order (paragraph → sentence → word)
 *   
 *   Separator priority:
 *     1. "\n\n" (paragraphs)
 *     2. "\n" (lines)
 *     3. ". " (sentences)
 *     4. " " (words)
 *   
 *   Pros: Maintains natural boundaries, clean chunks
 *   Cons: Chunk sizes may vary
 * 
 * STRATEGY C: SEMANTIC CHUNKING
 *   How: Detect topic changes and split at boundaries
 *   
 *   Process:
 *     - Generate embeddings for sentences
 *     - Calculate similarity between consecutive sentences
 *     - If similarity drops below threshold → new topic → split
 *   
 *   Pros: Keeps related content together, ideal for retrieval
 *   Cons: Computationally expensive
 * 
 * SUB-STEP 1.3: EMBEDDING CREATION
 * ──────────────────────────────────────────────────────────────────
 * 
 * What Happens:
 *   Each chunk → Embedding Model → Vector (list of numbers)
 * 
 * Popular Embedding Models:
 * 
 * ┌──────────────────┬────────────┬──────────┬─────────────────────┐
 * │ Model            │ Dimensions │ Cost     │ Best For            │
 * ├──────────────────┼────────────┼──────────┼─────────────────────┤
 * │ OpenAI Ada-002   │ 1536       │ $0.13/M  │ General purpose     │
 * │ Cohere Embed     │ 4096       │ $0.10/M  │ Multilingual        │
 * │ BGE Large        │ 1024       │ Free     │ Self-hosting        │
 * │ Sentence-BERT    │ 768        │ Free     │ Local development   │
 * └──────────────────┴────────────┴──────────┴─────────────────────┘
 * 
 * SUB-STEP 1.4: METADATA ATTACHMENT
 * ──────────────────────────────────────────────────────────────────
 * 
 * What is Metadata?
 *   Additional information about each chunk stored alongside the vector
 * 
 * Common Metadata Fields:
 *   {
 *     "filename": "criminal_case_123.pdf",
 *     "page_number": 42,
 *     "chunk_index": 3,
 *     "total_chunks": 15,
 *     "document_type": "legal_case",
 *     "date": "2023-05-15",
 *     "author": "Judge Smith",
 *     "tags": ["theft", "guilty", "probation"]
 *   }
 * 
 * Why Metadata Matters:
 *   - Filter search results (only 2023 documents)
 *   - Show sources to users
 *   - Organize and manage documents
 *   - Apply security rules (user can only see certain docs)
 * 
 * SUB-STEP 1.5: VECTOR DATABASE STORAGE
 * ──────────────────────────────────────────────────────────────────
 * 
 * Storage Structure:
 * 
 * ┌────────────────────────────────────────────────────────────┐
 * │ Vector Database Table                                      │
 * ├──────────────┬──────────────┬──────────────┬───────────────┤
 * │ ID           │ Vector       │ Text Chunk   │ Metadata      │
 * ├──────────────┼──────────────┼──────────────┼───────────────┤
 * │ chunk_001    │ [0.1, -0.3...│ "The defend...│ {"file":...} │
 * │ chunk_002    │ [0.5, 0.2... │ "was found... │ {"file":...} │
 * │ chunk_003    │ [-0.8, 0.1...│ "guilty of... │ {"file":...} │
 * └──────────────┴──────────────┴──────────────┴───────────────┘
 */

/**
 * 2.2 STEP 2: RETRIEVAL PHASE (Find Information)
 * ----------------------------------------------------------------------
 * 
 * WHAT IS RETRIEVAL?
 * When a user asks a question, find the most relevant document chunks
 * from your vector database.
 * 
 * DETAILED RETRIEVAL PIPELINE:
 * 
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │   User     │───>│   Embed    │───>│   Search   │───>│   Get      │
 * │  Question  │    │  Question  │    │  Database  │    │  Chunks    │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 *                                                             │
 *                                                             ▼
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │   Return   │<───│   Apply    │<───│   Filter   │<───│   Rank     │
 * │   Results  │    │ Metadata   │    │  by Score  │    │  Results   │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 * 
 * SUB-STEP 2.1: QUERY EMBEDDING
 * ──────────────────────────────────────────────────────────────────
 * 
 * Process:
 *   User Question: "What was the outcome of case #123?"
 *   ↓
 *   Same embedding model used in indexing
 *   ↓
 *   Query Vector: [0.345, -0.678, 0.912, ...]
 * 
 * IMPORTANT: Must use SAME embedding model as indexing phase
 * 
 * SUB-STEP 2.2: SIMILARITY SEARCH (DETAILED)
 * ──────────────────────────────────────────────────────────────────
 * 
 * How Vector Search Works:
 * 
 * Step 1: Calculate similarity between query vector and ALL stored vectors
 * Step 2: Sort by similarity score (highest first)
 * Step 3: Return top-K results (usually K=5 to 20)
 * 
 * Similarity Calculation Methods:
 * 
 * METHOD 1: COSINE SIMILARITY
 *   Formula: cos(θ) = (A·B) / (||A|| ||B||)
 *   Range: -1 to 1 (1 = identical direction)
 *   Best for: Text embeddings (standard choice)
 * 
 * METHOD 2: EUCLIDEAN DISTANCE
 *   Formula: d = √(Σ(Aᵢ - Bᵢ)²)
 *   Range: 0 to ∞ (0 = identical)
 *   Best for: When magnitude matters
 * 
 * METHOD 3: DOT PRODUCT
 *   Formula: A·B = Σ(Aᵢ × Bᵢ)
 *   Range: -∞ to ∞ (higher = more similar)
 *   Best for: Normalized vectors
 * 
 * Example Search Results:
 * 
 * Rank 1: Score 0.89 - "Case #123: The defendant was found guilty..."
 * Rank 2: Score 0.76 - "Similar cases often result in probation..."
 * Rank 3: Score 0.65 - "The judge's ruling in case #124..."
 * Rank 4: Score 0.52 - "Legal procedures for criminal cases..."
 * Rank 5: Score 0.41 - "Court system overview..."
 * 
 * SUB-STEP 2.3: FILTERING & RERANKING
 * ──────────────────────────────────────────────────────────────────
 * 
 * FILTERING:
 *   Apply metadata filters BEFORE or AFTER similarity search
 * 
 * Examples:
 *   - Only chunks from 2023 documents
 *   - Only documents tagged "confidential"
 *   - Only pages 1-50
 * 
 * RERANKING:
 *   Use a second model to improve result ordering
 * 
 * Why Rerank?
 *   - Vector similarity isn't perfect
 *   - Small, fast reranker can improve accuracy significantly
 * 
 * Reranking Process:
 *   1. Get top-50 results from vector search
 *   2. Send each chunk + query to reranker model
 *   3. Reranker gives new relevance scores
 *   4. Keep top-5 after reranking
 */

/**
 * 2.3 STEP 3: GENERATION PHASE (Create Answer)
 * ----------------------------------------------------------------------
 * 
 * WHAT IS GENERATION?
 * Using retrieved chunks as context for an LLM to generate accurate answers.
 * 
 * DETAILED GENERATION PIPELINE:
 * 
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │ Retrieved  │───>│   Format   │───>│   Send to  │───>│   LLM      │
 * │  Chunks    │    │  Context   │    │    LLM     │    │ Generates  │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 *                                                                   │
 *                                                                   ▼
 * ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
 * │   Return   │<───│   Add      │<───│   Format   │<───│   Raw      │
 * │   Answer   │    │  Sources   │    │  Response  │    │  Output    │
 * └────────────┘    └────────────┘    └────────────┘    └────────────┘
 * 
 * SUB-STEP 3.1: CONTEXT CONSTRUCTION
 * ──────────────────────────────────────────────────────────────────
 * 
 * Create a prompt that combines:
 *   1. System instructions
 *   2. Retrieved chunks
 *   3. User question
 * 
 * Example Prompt Structure:
 * 
 * """
 * System: You are a legal assistant. Answer questions based ONLY on
 *         the provided context. If the answer isn't in the context,
 *         say "I cannot find this information in the provided documents."
 * 
 * Context:
 * --- START DOCUMENT 1 ---
 * [Retrieved chunk 1 text...]
 * Source: criminal_case_123.pdf, page 42
 * --- END DOCUMENT 1 ---
 * 
 * --- START DOCUMENT 2 ---
 * [Retrieved chunk 2 text...]
 * Source: criminal_case_123.pdf, page 43
 * --- END DOCUMENT 2 ---
 * 
 * User Question: What was the outcome of case #123?
 * 
 * Answer:
 * """
 * 
 * SUB-STEP 3.2: LLM GENERATION
 * ──────────────────────────────────────────────────────────────────
 * 
 * LLM Processes:
 *   - Reads all context
 *   - Understands question
 *   - Generates answer using ONLY provided context
 * 
 * Important Settings:
 *   temperature: 0 (for factual answers)
 *   max_tokens: Based on expected answer length
 *   stop_sequences: ["\n\n", "Human:", "Assistant:"]
 * 
 * SUB-STEP 3.3: SOURCE CITATION
 * ──────────────────────────────────────────────────────────────────
 * 
 * Always show users WHERE information came from:
 * 
 * Final Answer Format:
 * """
 * Based on case file #123 (page 42), the defendant was found guilty
 * of theft and sentenced to 2 years probation.
 * 
 * Sources:
 * - criminal_case_123.pdf, page 42
 * - criminal_case_123.pdf, page 43 (sentencing details)
 * """
 */

/**
 * 2.4 COMPLETE BASIC RAG EXAMPLE
 * ----------------------------------------------------------------------
 * 
 * Let's walk through a complete example from start to finish:
 * 
 * SCENARIO: Law firm with 10,000 case files
 * 
 * PHASE 1: INDEXING (Done Once)
 * ──────────────────────────────────────────────────────────────────
 * 
 * Input: 10,000 PDF case files
 * 
 * Step 1.1: Clean each PDF
 *   - Extract text
 *   - Remove headers/footers
 *   - Fix OCR errors
 * 
 * Step 1.2: Chunk each document
 *   - Split by paragraphs
 *   - Max chunk size: 500 tokens
 *   - Overlap: 50 tokens (to maintain context)
 *   → Results in 500,000 chunks total
 * 
 * Step 1.3: Create embeddings
 *   - Use OpenAI Ada-002
 *   - Each chunk → 1536-dimensional vector
 *   → 500,000 vectors created
 * 
 * Step 1.4: Add metadata
 *   For each chunk, store:
 *   - filename
 *   - page number
 *   - case number
 *   - date
 *   - case type
 * 
 * Step 1.5: Store in Pinecone
 *   - Create index named "legal-cases"
 *   - Upload all vectors + metadata + text
 *   → Index ready for queries
 * 
 * PHASE 2: RETRIEVAL (When User Asks)
 * ──────────────────────────────────────────────────────────────────
 * 
 * User: "What was the outcome of case #123?"
 * 
 * Step 2.1: Embed question
 *   Question → Ada-002 → [0.345, -0.678, ...]
 * 
 * Step 2.2: Search database
 *   Find top-10 similar vectors
 *   Results include chunks from case #123 and similar cases
 * 
 * Step 2.3: Rerank (optional)
 *   Use Cohere reranker to improve ordering
 *   Keep top-5 most relevant chunks
 * 
 * Retrieved Chunks:
 *   1. "...defendant found guilty of theft..." (score 0.89)
 *   2. "...sentenced to 2 years probation..." (score 0.87)
 *   3. "...judge cited precedent from case #122..." (score 0.76)
 *   4. "...prosecution argued for stricter sentence..." (score 0.71)
 *   5. "...defense requested community service..." (score 0.68)
 * 
 * PHASE 3: GENERATION
 * ──────────────────────────────────────────────────────────────────
 * 
 * Step 3.1: Construct prompt with chunks 1-2 (most relevant)
 * Step 3.2: Send to GPT-4
 * Step 3.3: Get response
 * 
 * Final Answer:
 * "Based on case file #123 (pages 42-43), the defendant was found
 *  guilty of theft and sentenced to 2 years probation."
 * 
 * Sources:
 * - criminal_case_123.pdf, page 42
 * - criminal_case_123.pdf, page 43
 */

