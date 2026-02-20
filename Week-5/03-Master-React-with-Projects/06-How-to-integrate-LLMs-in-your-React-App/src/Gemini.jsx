import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const Gemini = () => {
    const [message, setMessage] = useState("Response aa rhe hai!");

    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY
    });

    async function main() {
        setMessage("");

        const response = await ai.models.generateContentStream({
            model: "gemini-3-flash-preview",
            contents: "Tell me about India in 200 words and properly formatted in bullet points",
        });

        let ans = "";
        for await (const chunk of response) {
            ans += chunk.text;
            setMessage(ans);
        }
    }


    return (
        <>
            <div>Gemini in True Power</div>
            <div>Response from LLM:</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{message}</div>
            <button onClick={main}>Click to ask AI</button>
        </>
    )
}

export default Gemini