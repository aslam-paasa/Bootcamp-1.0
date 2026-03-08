import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const DebouncedInput = () => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const debouncedValue = useDebounce(inputText, 500, () => {
        console.log("Debounced Value: ", debouncedValue);
    });

    useEffect(() => {
        // Code for API call
    }, [debouncedValue]);

  return (
    <div>
        <h1>Debounced Input</h1>

        {/* Input */}
        <input 
            type="text" 
            value={inputText} 
            onChange={handleInputChange} 
            placeholder="Type something..." 
        />

        {/* Debounced Value */}
        <p>Debounced Value: {debouncedValue}</p>
    </div>
  )
}

export default DebouncedInput
