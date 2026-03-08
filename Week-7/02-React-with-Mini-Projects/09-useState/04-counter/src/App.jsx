/**
 * Challenge: Counter
 * This challenge is pretty straight forward. Increment or decrement count
 * whenever the user clicks on the corresponding button.
 * 
 * Tasks:
 * 1. Render the initial state correctly
 * 2. Increment count when the user clicks the "+" button
 * 3. Decrement count when the user clicks the "-" button
 * 4. Render the correct count after multiple button clicks
 * 
 * Hint:
 * 1. In order to persist our count variable across renders and update the
 *    UP when it changes, we need to create it using React's useState hook.
 * 
 *    const [count, setCount] = useState(0);
 * 
 * 2. Whenever you're managing an event in React, in this case "click",
 *    you should encapsulate the logic for that event in an event handler.
 *    In our case, we have two events we care about - incrementing and
 *    decrementing our count.
 * 
 *    const handleIncrement = () => {};
 *    const handleDecrement = () => {};
 * 
 * 3. To update the state based on the current state, you can reference the
 *    current state via closure scope inside of your event handler.
 * 
 *    const [count, setCount] = useState(0);
 * 
 *    const handleIncrement = () => {
 *      setCount(count + 1);
 *    };
 * 
 *    const handleDecrement = () => {
 *      setCount(count - 1);
 *    };
*/

import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <main>
      <span>{count}</span>
      <div>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
    </main>
  );
}

export default App
