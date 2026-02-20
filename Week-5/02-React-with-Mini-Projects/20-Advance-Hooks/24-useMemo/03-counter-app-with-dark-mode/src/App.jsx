/**
 * Assignment: Counter App with Dark Mode using useMemo
 * 
 * Create a counter app with following features:
 * 1. Increment/decrement counter
 * 2. Check if number is even/odd
 * 3. Toggle between dark/light mode
 * 4. Optimize performance using useMemo for expensive even/odd calculation
*/

/**
 * Performance Issue: 
 * - isDarkMode k click pe component re-render ho rha hai. Aur jb
 *   component re-render hoga to sb code dobara chlega. Means isEven
 *   dobara chlega jiske andr heavy task ho rha aur uske wajah se
 *   response aane m kaafi time lg rha. 
 * - Humaare isDarkMode pe click krne se isEven ni chlna chaiye. To iss
 *   chij ko tackle krne k liye ek hook aata hai - useMemo Hook.
 * 
 * Q. What is the difference between useMemo & useCallback?
 *  - Ye dono hooks use kiye jaate hai memoize/cache/preserve krne k 
 *    liye. 
 *  - useMemo preserve krta hai fn ki value ko. Jbki useCallback 
 *    preserve krta hai itself fn ko.
*/ 

import { useState, useMemo } from "react"

function App() {

  return (
    <div>
      <Counter />
    </div>
  )
}

function Counter() {
  console.log('I AM APP!!!');
  
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isEven = useMemo(() => {
    console.log('I AM COUNTER!!!');
    
    let i = 0;
    while(i <= 1000000000) {
      i += 1;
    }

    if(count % 2 === 0) {
      return true;
    } 
    return false;
  }, [count]);

  return (
    <div>
      <h1>Counter App</h1>
      <div className="screen">{count}</div>
      <div>{isEven ? "Even" : "Odd"}</div>
      <button onClick={() => setCount(count+1)}>+</button>
      <button onClick={() => setCount(count-1)}>-</button>
      
      <h1>Choose Your Preference</h1>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
    </div>
  )
}

export default App
