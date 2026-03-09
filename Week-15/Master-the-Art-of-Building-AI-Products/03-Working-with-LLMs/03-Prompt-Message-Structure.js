/**
 * Prompt Message Structure:
 * > System Prompt: 
 * > User Prompt: 
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
                content: `
                            You are Jarvis, a smart review grader. 
                            Your task is to analyze given review and return the sentiment. 
                            Classify the review as positive, neutral or negative. 
                            Output must be a single word.
                        `,
            },
            {
                role: "user",
                content: `
                            Review: These headphones arrived quickly and look great, but the left earcup stopped working after a week. 
                            Sentiment: 
                        `,
            },
        ],
        model: "openai/gpt-oss-20b",
    });

    console.log(completion.choices[0]?.message?.content || "");
}

main();