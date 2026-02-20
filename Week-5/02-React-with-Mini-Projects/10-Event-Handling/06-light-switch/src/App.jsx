/**
 * Challenge: Light Switch
 * In order to persist a value across renders and update the UI when that
 * value changes, we need to use React's useState hook. In this challenge,
 * you'll need to create a button that toggles the 'mode' state between
 * 'light' and 'dark'. 
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

  const handleDarkMode = () => {
    setMode("dark");
  };

  const handleLightMode = () => {
    setMode("light");
  };

  return (
    <main className={mode}>
      {mode === "light" ? (
        <button onClick={handleDarkMode}>Activate Dark Mode</button>
      ) : (
        <button onClick={handleLightMode}>Activate Light Mode</button>
      )}
    </main>
  );
}

export default App
