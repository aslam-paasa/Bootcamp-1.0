/**
 * Structured Output:
 * > LLMs generate text/data, but we need structured data.
 * > We can use JSON Schema to guide the model to generate structured 
 *   data, and for that we will use JSON MODE in groq:
 *   - To use JSON mode:
 *     a. Set "response_format": {"type": "json_object"} in your chat
 *        completion request
 *     b. Include a description of the desired JSON structure in your
 *        system prompt.
 *     c. Process the returned JSON in your application.
 *   - For JSON Schema Validation, we will use schema libraries like 
 *     Instructor, Pydantic, Zod, etc.
 *     response_format: { type: "json_schema" }
*/

import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export async function main() {
    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",

        // response_format: { type: "json_object" },
        // messages: [
        //     {
        //         role: "system",
        //         content: `
        //                     You are an interview grader assistant.
        //                     Your task is to generate candidate evaluation score.

        //                     Output must be following JSON structure:
        //                     {
        //                         "confidence": number (1-10 scale),
        //                         "accuracy": number (1-10 scale),
        //                         "pass": boolean (true or false)
        //                     }

        //                     The response must:
        //                     1. Include ALL fields shown above
        //                     2. Use only the exact field names shown
        //                     3. Follow the exact data types specified
        //                     4. Contain ONLY the JSON object and nothing else
        //                 `,
        //     },

        /**
         * JSON Schema Validation:
        */
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "candidate_evaluation",
                schema: {
                    type: "object",
                    properties: {
                        confidence: {
                            type: "number",
                            minimum: 1,
                            maximum: 10,
                        },
                        accuracy: {
                            type: "number",
                            minimum: 1,
                            maximum: 10,
                        },
                        pass: {
                            type: "boolean",
                        },
                    },
                    required: ["confidence", "accuracy", "pass"],
                    additionalProperties: false,
                },
            },
        },
        messages: [
            {
                role: "system",
                content: `
                            You are an interview grader assistant.
                            Your task is to generate candidate evaluation score.
                            Return ONLY valid JSON.
                        `,
            },
            {
                role: "user",
                content: `
                            Q: What does === do in JavaScript?
                            A: It checks strict equality-both value and type must match.

                            Q: How do you create a promise that resolves after 1 second?
                            A: const p = new Promise(r => setTimeout(r, 1000));

                            Q: What is hoisting?
                            A: JavaScript moves declarations (but not initializations) to the top of their scope before code runs.

                            Q: Why use let instead of var?
                            A: let is block-scoped, avoiding the function-scope quirks and re-declaration issues of var.
                        `,
            },
        ],
    });

    /* Extract & Parse the JSON */
    const response = JSON.parse(completion.choices[0]?.message?.content.replace('```json', '').replace('```', '') || '');
    console.log(response);
}

main();