import { useEffect } from 'react'
import './App.css'

/**
 * API call on load:
 * - Just like onClick, a load is also an event.
*/

/**
 * Q. If we have "from useEffect..." inside the useEffect, and then
 *    we have "before render..." outside the useEffect, then which will
 *    be printed first on console?
 * 
 * Understanding:
 * 1. "before render..."
 * 2. "from useEffect..."
 * This is because the console.log statement inside useEffect is 
 * executed after the component has rendered. So, first return statement
 * is executed and the component is rendered, logging "before render..."
 * to the console. Then the useEffect hook is executed, loggin "from
 * useEffect..." to the console.
 * 
 * Note: useEffect is called after the UI is rendered once(mounted).
 * Basically, useEffect takes a callback and runs the callback after render
 * is done when the second argument is an empty array.
 * 
 * - app started...
 * - before render...
 * - from useEffect...
*/

function App() {

  console.log('app started...');
  

  useEffect(() => {
    console.log("from useEffect..."); // B
  }, []);

  console.log("before render..."); // A

  return (
    <div className="App">
      <h1 className="app-header">tanaypratap's box</h1>
      <div className="App">
        <h1> print on load </h1>
      </div>
    </div>
  );
}

export default App
