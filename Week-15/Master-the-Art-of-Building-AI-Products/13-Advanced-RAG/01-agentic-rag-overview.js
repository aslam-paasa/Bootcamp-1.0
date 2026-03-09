/**
 * 2.5 LIMITATIONS OF BASIC RAG (WHY WE NEED ADVANCED)
 * 
 * LIMITATION 1: RETRIEVAL QUALITY ISSUES
 * ──────────────────────────────────────────────────────────────────
 * 
 * Problem: Basic RAG assumes retrieved chunks are always relevant
 * Reality: Often retrieves partially relevant or irrelevant chunks
 * 
 * Example:
 *   Query: "What is the capital of France?"
 *   Retrieved: "France is famous for its cuisine and wine..."
 *   Result: LLM might talk about food instead of Paris
 * 
 * LIMITATION 2: NO QUALITY CHECKING
 * ──────────────────────────────────────────────────────────────────
 * 
 * Basic RAG never asks:
 *   - "Do we need to search RAG?"
 *   - "Are these chunks actually useful?"
 *   - "Do they contain the answer?"
 *   - "Is the answer complete?"
 * 
 * It just generates answer regardless of quality
 * 
 * LIMITATION 3: SINGLE ATTEMPT ONLY
 * ──────────────────────────────────────────────────────────────────
 * 
 * Basic RAG = One search, one answer
 * If first search is bad → No second chance
 * 
 * LIMITATION 4: STATIC APPROACH
 * ──────────────────────────────────────────────────────────────────
 * 
 * Basic RAG treats all queries the same:
 *   - Always searches (even for simple questions)
 *   - For simple question, it gives long answers
 *   - Always uses same number of chunks
 *   - Never adapts strategy
 * 
 * LIMITATION 5: COMPLEX QUERY FAILURE
 * ──────────────────────────────────────────────────────────────────
 * 
 * Multi-part questions often fail:
 *   Query: "What are causes, symptoms, and treatment of diabetes?"
 *   
 * Basic RAG might:
 *   - Retrieve only causes (miss symptoms/treatment)
 *   - Retrieve general diabetes info (miss specifics)
 *   - Give incomplete answer
 * 
 * LIMITATION 6: VOCABULARY MISMATCH
 * ──────────────────────────────────────────────────────────────────
 * 
 * Problem: User might not know technical terms
 * Example:
 *   User asks: "heart attack symptoms"
 *   Documents use: "myocardial infarction clinical presentation"
 *   
 * Basic RAG may not connect these
 * 
 * LIMITATION 7: NO SELF-AWARENESS
 * ──────────────────────────────────────────────────────────────────
 * 
 * Basic RAG doesn't know:
 *   - What it knows vs doesn't know
 *   - When to stop searching
 *   - When to ask clarifying questions
 * 
 * SUMMARY TABLE: BASIC RAG LIMITATIONS
 * ──────────────────────────────────────────────────────────────────
 * 
 * ┌────────────────────┬──────────────────────────────────────────┐
 * │ Limitation         │ Consequence                              │
 * ├────────────────────┼──────────────────────────────────────────┤
 * │ Blind retrieval    │ May use irrelevant chunks                │
 * │ No quality check   │ Can't detect bad retrieval               │
 * │ Single attempt     │ No recovery from poor search             │
 * │ Static approach    │ Wastes time on simple queries            │
 * │ Complex Q failure  │ Incomplete answers                       │
 * │ Vocabulary mismatch│ Misses relevant documents                │
 * │ No self-awareness  │ Can't express uncertainty                │
 * └────────────────────┴──────────────────────────────────────────┘
 */

/**
 * SECTION 3: ADVANCED RAG TECHNIQUES
 * 
 * This section covers techniques that fix Basic RAG's limitations
 * by adding intelligence, feedback loops, and decision-making.
 * 1. Corrective RAG (Fix Poor Retrieval)
 * 2. Self RAG       (Intelligent Decision Making)
 */

