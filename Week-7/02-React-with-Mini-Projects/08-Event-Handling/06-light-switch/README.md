```jsx
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
 * 
 * Hint:
 * 1. To add state to a component, you can use React's useState hook.
 *    
 *    const [mode, setMode] = useState('dark');
 * 
 * 2. Whenever you're handling an event in React, in this case a 'click'
 *    event, you'll want to encapsulate the logic for handling that event
 *    into an event handler.
 * 
 *    In our example, we'll create two - one for toggling the mode to 'light'
 *    and one for toggling the mode to 'dark'.
 * 
 *    const handleDarkMode = () => {}
 *    const handleLightMode = () => {}
 * 
 * 3. Whenever you invoke 'useState', what you get back is an array with the
 *    first element being the piece of state and the second element being
 *    a way to update that state.
 * 
 *    const [mode, setMode] = useState('dark');
 * 
 *    Whatever you pass to that second element will be set as the new value
 *    for that piece of state. So we can update our event handlers like this:
 * 
 *    const handleDarkMode = () => {
 *       setMode('dark');
 *    }
 * 
 *    const handleLightMode = () => {
 *       setMode('light');
 *    }
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
```