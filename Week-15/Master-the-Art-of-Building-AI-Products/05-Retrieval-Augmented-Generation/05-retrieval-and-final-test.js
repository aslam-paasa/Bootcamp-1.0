/**
 * Retrieval & Final Test:
 * > Install: bun add groq-sdk
 * > Question: How many leaves can I take?
*/

import readline from 'node:readline/promises';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { vectorStore } from './04-generate-vector-embeddings-and-indexing.js';
dotenv.config();


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export async function chat() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    while (true) {
        const question = await rl.question("You: ");
        if (question.toLowerCase() === "/bye") {
            break;
        }

        /* 4. Retrieval */
        const relevantChunks = await vectorStore.similaritySearch(question, 3);
        const context = relevantChunks.map(chunk => chunk.pageContent).join("\n\n");
        console.log("Relevant Chunks: ", context);

        /* 5. Generation */
        const SYSTEM_PROMPT = `
            You are an assistant for question-answering task.
            Use the following relevant pieces of retrieved context to answer the question.
            If you don't know the answer, say I don't know.
        `

        const userQuery = `
            Question: ${question}
            Relevant Context: ${context}
            Answer:
        `

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: userQuery,
                },
            ],
        });
        console.log(`Assistant: ${response.choices[0].message.content}`);
    }

    rl.close()
}

chat();