/**
 * Generate Vector Embedding & Indexing:
 * > Install: bun add @langchain/openai
 * > Install: bun add @langchain/pinecone
 * > Install: bun add @pinecone-database/pinecone
 * > Select Embedding Model: text-embedding-3-small
 * > Select Vector Store   : Pinecone
 *   a. pineconeIndex
 *   b. maxConcurrency
 * 
 * Login Pinecone Database Website:
 * > Create new index: company-chatbox-index
 * > Configuration   : text-embedding-3-small
 * > Dimension       : 1536
 * > Metric          : cosine
 * > Cloud Provider  : AWS
 * > Region          : us-east-1
 * > Click Create Index
 * 
 * > Go to API Keys > Create API Key : company-chatbot
 * > Copy the API Key
 * > Paste it in .env file
*/

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

/* Initialize OpenAI Embeddings */
const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small"
});

/* Initialize Pinecone Vector Database */
const pinecone = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY });
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
});


export async function indexTheDocument(filePath) {

    /* 1. Load the document */
    const pdfPath = filePath
    const loader = new PDFLoader(pdfPath, { splitPages: false })
    const doc = await loader.load()


    /* 2. Chunk the document */
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 100,
    })
    
    const chunks = await textSplitter.splitText(doc[0].pageContent)

    const documents = chunks.map((chunk) => {
        return {
            pageContent: chunk,
            metadata: doc[0].metadata,
        }
    })


    /* 3. Generate Vector Embedding */
    await vectorStore.addDocuments(documents);
    console.log("Documents indexed successfully!");
}
