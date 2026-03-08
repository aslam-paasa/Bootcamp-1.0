import { useState, useEffect } from 'react'
import './App.css'

/**
 * useEffect - predict the output and order
 * - If would be good to reason in your mind about the order of how
 *   things run in React.
 * - We had covered before that useState() triggers re-render.
 * - If you were unable to predict this, run the program and check.
*/

/**
 * Challenge:
 * 1. What will be the console for the initial render?
 * 2. What will be the console after the user click the increment button?
*/

/**
 * Output:
 * 1. Initially, the component is rendered and logs "before render...0"
 *    to the console.
 * 2. The useEffect hook runs and logs "from useEffect...0" to the console.
 * 3. When the user clicks the button, and the incrementClickHandler fn is
 *    called, which logs "from click handler...0" to the console.
 * 4. The setCounter fn updates the state value of counter to 1.
 * 5. The component is re-rendered, and logs "before render...1" to the
 *    console.
 * 
 * - before render...0
 * - from useEffect...0      [Run once on load]
 * - from click handler...0  [Button is clicked]
 * - before render...1
*/

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("from useEffect...", counter);
  }, []);

  function incrementClickHandler() {
    setCounter((counter) => {
      console.log("from click handler...", counter);
      return counter + 1;
    });
  }

  console.log("before render...", counter);

  return (
    <div>
      <h1>print on load : {counter}</h1>
      <button onClick={incrementClickHandler}>Increment</button>
    </div>
  )
}

export default App
