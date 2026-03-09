/**
 * Invoking the LLM: Calling the LLM from our code
*/

import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Hi",
            },
        ],
        model: "openai/gpt-oss-20b",
    });

    console.log(completion.choices[0]?.message?.content || "");
}

main();