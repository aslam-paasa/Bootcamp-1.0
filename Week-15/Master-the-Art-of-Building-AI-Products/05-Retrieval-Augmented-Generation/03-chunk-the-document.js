/**
 * Chunk the document: 
 * > bun add @langchain/textsplitters @langchain/core
 * 
 * > Chunking Properties:
 *   a. chunkSize: It means that how many chars will be in each chunk.
 *   b. chunkOverlap: It means that the last 20 characters of the 
 *      previous chunk will be the first 20 characters of the next 
 *      chunk so that the LLM can understand the context of the 
 *      previous chunk.
*/

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

export async function indexTheDocument(filePath) {

    /* 1. Load the document */
    const pdfPath = filePath
    const loader = new PDFLoader(pdfPath, { splitPages: false })
    const doc = await loader.load()

    // console.log(doc[0].pageContent);

    /* 2. Chunk the document */
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 100,
    })
    const chunks = await textSplitter.splitText(doc[0].pageContent)
    console.log(chunks.length);

}
