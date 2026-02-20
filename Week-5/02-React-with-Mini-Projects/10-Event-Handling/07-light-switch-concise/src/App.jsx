/**
 * Challenge: Light Switch Concise
 * You may have noticed that in our last "Light Switch" example, we had
 * some wasted keystrokes. Specifically, depending on how you set it up,
 * you may have written two methods (handleDarkMode and handleLightMode) 
 * for updating our 'mode' state like in our current starting code. Also,
 * we rendered two buttons, one for each event handler.
 * 
 * In this challenge, consolidate our logic into a single event handler and
 * a single button element.
 * 
 * Tasks:
 * 1. The app renders without crashing
 * 2. 'mode' defaults to 'dark'
 * 3. 'mode' toggles between 'dark' and 'light' when the button is clicked
*/

import './App.css'
import { useState } from 'react'

function App() {
  const [mode, setMode] = useState("dark");

  const handleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <main className={mode}>
      <button onClick={handleClick}>
        {mode === "dark" ? "Activate Light Mode" : "Activate Dark Mode"}
      </button>
    </main>
  );
}

export default App
