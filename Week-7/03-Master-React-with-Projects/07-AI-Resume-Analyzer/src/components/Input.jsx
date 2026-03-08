import { useState } from "react"
import { gemini } from "../gemini/gemini"
import { useNavigate } from "react-router-dom"

const Input = () => {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const submit = async () => {
        setError(null);
        setLoading(true);

        const response = await gemini(input, setError);
        setLoading(false);

        localStorage.setItem("input", JSON.stringify(response));
        navigate("/report");
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <textarea name="userInput" id="userInput" value={input} onChange={(e) => setInput(e.target.value)} className="text-center justify-center text-light border-2 border-blue-500 w-[90vw] h-[20vh] rounded-4xl p-10"></textarea>
            {error && <div className="p-5 text-red-900 text-3xl">{"{ " + error + " }"}</div>}
            <button
                onClick={submit}
                disabled={loading}
                className="m-4 p-4 bg-blue-500 text-white rounded-4xl"
            >
                Submit Your Resume
            </button>
        </div>
    )
}

export default Input