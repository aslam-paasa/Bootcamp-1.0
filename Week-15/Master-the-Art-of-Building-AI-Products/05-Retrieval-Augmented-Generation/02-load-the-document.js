/**
 * Implementation Plan:
 * > Stage 1: Indexing
 *   1. Load the document - pdf, text
 *   2. Chunk the document
 *   3. Generate vector embeddings
 *   4. Store the vector embeddings in a vector database
 * 
 * > Stage 2: Using the chatbot
 *   1. Setup LLM
 *   2. Add retrieval step
 *   3. Pass input + relevant information to LLM
 *   4. Generate response
*/

/**
 * Load the document:
 * > npm install @langchain/community @langchain/core pdf-parse
 * > It will return every page in a new object.
 *   (9 page = 9 object)
 * > We will keep all 9 pages in one object and for that we will use:
 *   { splitPages: false }.
 *   
*/

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

export async function indexTheDocument(filePath) {

    /* 1. Load the document */
    const pdfPath = filePath
    const loader = new PDFLoader(pdfPath, { splitPages: false })
    const doc = await loader.load()

    console.log(doc[0].pageContent);
}
