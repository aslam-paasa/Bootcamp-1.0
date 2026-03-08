import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});


export async function gemini(input, setError) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
    You are an expert AI evaluator analyzing a candidate's interview or test performance.

    Input Details:
    ${input}

    Your task:
    Generate a structured and personalized performance report in JSON format with the following
    {
        "score": "numeric score out of 100 based on overall performance",
        "positives": "list of strong points in concise bullet style",
        "negatives": "list of weak points in concise bullet style",
        "analysis": "detailed paragraph explaining reasoning behind score, implement areas, and suggestions for improvement"
    }

    Scoring Logic:
    - Consider accuracy, clarity, confidence, and technical depth.
    - Be fair and specific - avoid generic statements.
    - Keep tone professional but slightly motivated.

    Output format:
    Return only the JSON object, no extra text.
    
    Example:
    {
        "score": 78,
        "positives": ["Good understanding of React fundamentals", "Clean Code Structure"],
        "negatives": ["Needs stronger backend API design", "Missed optimization in state management"],
        "analysis": "Candidate has a solid foundation in React but could benefit from more experience with backend development and optimization techniques."
    }
`,
        });
        return response.text
    } catch (error) {
        setError(error)
    }
}