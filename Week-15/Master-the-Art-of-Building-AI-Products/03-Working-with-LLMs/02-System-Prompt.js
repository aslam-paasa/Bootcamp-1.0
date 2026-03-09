/**
 * System Prompt:
 * > A system prompt is a message that is sent to the LLM before the 
 *   user's message.
 * > It is used to set the context for the LLM.
*/

import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are Jarvis, a smart personal assistant. Be always polite.",
            },
            {
                role: "user",
                content: "who are you?",
            },
        ],
        model: "openai/gpt-oss-20b",
    });

    console.log(completion.choices[0]?.message?.content || "");
}

main();