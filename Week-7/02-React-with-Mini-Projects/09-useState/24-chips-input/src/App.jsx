/**
 * Assignment: Chips Input
 * In this task, you are asked to create a Chips Input component that allows
 * users to input a series of tags or keywords. The component will display
 * these tags as "chips" (small labels), which users can add and remove
 * dynamically.
 * 
 * Features:
 * 1. Input Field: Users can type text into a input field.
 * 2. Add Chips  : When the user presses the Enter key, the typed text will be
 *                 added as a new chip (tag). Empty or whitespace-only chips
 *                 should not be added.
 * 3. Remove Chips: Users can delete a chip by clicking the "X" button next
 *                  to it.
 * 4. Horizontal Display: The chips should be displayed in a horizontal list.
 * 5. Persistence       : The list of chips should be maintained even when
 *                        the component re-renders. 
 * 
 * 
 * Important Points:
 * 1. The input field should be of type text.
 * 2. Button should be labeled "X" to delete chips.
 * 3. If two chips have the same name, deleting one should NOT delete both.
 * 4. Make sure to use onKeyDown event handler instead of onKeyPress because
 *    onKeyPress is deprecated.
*/

import React, { useState } from "react";
import "./App.css";

function ChipsInput() {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [idCounter, setIdCounter] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newChip = {
        id: idCounter,
        value: inputValue.trim(),
      };
      setChips([...chips, newChip]);
      setIdCounter(idCounter + 1);
      setInputValue("");
    }
  };

  const handleDeleteChip = (idToDelete) => {
    setChips(chips.filter((chip) => chip.id !== idToDelete));
  }

  return (
    <div style={{display:"flex", flexDirection:"column",alignItems:"center", margin:"40px 0"}}>
      <h2>Chips Input</h2>
      <input
        type="text" 
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
      />
      <div style={{ margin: "20px", display: "flex", flexWrap: "wrap", alignItems: "center"}}>
        {chips.map((chip) => (
          <div 
            key={chip.id} 
            style={{
              display: "flex", 
              alignItems: "center", 
              margin: "5px",
              backgroundColor: "lightgray",
              borderRadius: "20px",
              padding: "5px 10px"
            }}>
              <span>{chip.value}</span>
              <button 
                onClick={() => handleDeleteChip(chip.id)} 
                style={{
                  backgroundColor: "transparent", 
                  border: "none",
                  marginLeft: "8px",
                  cursor: "pointer",
                  color: "red"
              }}>X</button>
            </div>
          ))}
        </div>
      </div>
  );
}


function App() {
  return (
    <div className="App">
      <ChipsInput />
    </div>
  );
}

export default App;