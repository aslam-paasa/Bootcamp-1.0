/**
 * Configure LLMs:
 * > When we call an LLM, we don't just send text.
 * > We also control how the model behaves using configuration params.
 * > Think of these params like: 
 *   Controls knobs like intelligence behavior
 * 
 * 1. Temperature (Creativity Control): 
 *    - Temperature controls randomness in output.
 *    - It affects how the model selects the next word.
 *      > Lower temperature  - safer, predictable output.
 *      > Higher temperature - riskier, creative output.
 *    - Range: 0-2 (default: 1)
 * 
 * 2. Top P (Diversity Control): 
 *    - Instead of looking at all possible words, it only considers top
 *      words whose total probablity = p.
 *    - Example: If top_p = 0.9
 *      Model selects from smallest set of words whose total probablity
 *      adds to 90%. It avoids extremely unlikely words.
 * 
 *    Diff b/w Temperature and Top_p
 *    a. Temperature = changes randomness distribution
 *    b. Top_p = cut off unlikely tokens
 *    Usually use either temperature or top_p, not both aggresively.
 * 
 * 3. Stop:
 *    - stop tells the model:
 *      "When you see this word or symbol - STOP generating."
 *    - It's like giving the model a full stop boundary.
 *    - Commonly used to prevent infinite loops.
 * 
 * 4. max_completion_tokens:
 *    - It control the maximum number of tokens the model is allowed to
 *      generate in the response.
 *    - It limits only the output, not the input. 
 * 
 * 5. frequency_penalty:
 *    - It reduces the chances of the model repeating the same words
 *      again and again.
 *    - In simple terms: The more a word appears, the less likely it
 *      becomes to appear again.
 * 
 * 6. Presence Penalty:
 *    - It reduces the probablity of a word if it has already appeared
 *      at least once.
 *    - In simple words: If a topic has already been mentioned, the model
 *      is encouraged to move to new topics.
 *    - It doesn't care how many times the word appeared, it only cares
 *      whether it appeared or not.
*/

import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export async function main() {
    const completion = await groq.chat.completions.create({
        temperature: 1,
        // top_p: 0.2,
        // stop: 'ga',  /* Negative */
        // max_completion_tokens: 1000,
        // frequency_penalty: 1,
        // presence_penalty: 1,
        model: "openai/gpt-oss-20b",
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
    });

    console.log(completion.choices[0]?.message?.content || "");
}

main();