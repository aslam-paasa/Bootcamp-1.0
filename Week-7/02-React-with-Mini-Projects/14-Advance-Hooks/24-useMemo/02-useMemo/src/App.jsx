/**
 * Assignment: useMemo Hook Implementation
 * Create an app that demonstrates useMemo hook with two features:
 * 1. A counter that increments by 1
 * 2. An input box that calculates sum from 1 to n
 * 
 * The goal is to optimize performance by memoizing the expensive sum calculation
 * so it only runs when the input value changes, not on every counter update.
 */


/**
 * useMemo():
 * => Before we start, let's understand what "memoization" means
 * => It means remembering some output given an input and not
 *    computing it again (like caching). For example, suppose in
 *    chatgpt we write "what is 2+2?" => Somewhere in the database
 *    it has stored "4", so chatgpt doesn't have to compute  again.
 * */

/**
 * Memoization:
 * => Let's say you are the driver and you want to check how much
 *    petrol is left. Would you do that in every lap? Or would you
 *    do that every 10 laps? Or every 20 minutes? Would there be any
 *    certain condition under which we look at the petrol?
 * => Taking attention off the road to check petrol and then take your
 *    attention back to the road is an expensive task, because it can 
 *    cause accident. 
 * => There are some conditions under which we are running these
 *    expensive operation. We are not running it on every render or
 *    after every lap.
 * => Similarly, if I ask you to create an app that does two things:
 *    (a) Increases a counter by 1 (Counter button)
 *    (b) Lets user put a value in an input box (n) and you need to
 *        show sum from 1-n. (Input box)
 * => But there is one restriction when you are writing this code.
 *    Restriction: Everything needs to be inside App. Means we should
 *                 have single component inside which we have to write
 *                 these logic.
 *    
*/

/**
 * Ugly Solution:
 * import { useState } from "react";
 *
 * function App() {
 *     const [counter, setCounter] = useState(0);
 *     const [inputValue, setInputValue] = useState(1);
 *
 *     let count = 0;
 *     for(let i = 1; i <= inputValue; i++) {
 *         count = count + i;
 *     }
 *
 *     return <div>
 *         <input onChange={(e) => {setInputValue(e.target.value)}} 
 *                 placeholder="Find sum from 1 to n">
 *         </input>
 *         <br/>
 *         <button onClick={() => {setCounter(counter+1)}}>Counter ({counter})</button>
 *     </div>
 * }
 * 
 * => This is the first application where we have two state variables:
 *    (a) Counter => Only has to do with one button at the end.
 *    (b) InputValue => In this input box, user can come and put a 
 *        number. When they do, in the state variable we store the
 *        number that the user has put. But how? onChange()  
 * 
 *         <input onChange={(e) => {setInputValue(e.target.value)}} 
 *                 placeholder="Find sum from 1 to n">
 *         </input>
 * 
 *     => e.target.value gives you the actual value inside the input box.
 *        This is the actual reference to the DOM element.
 * 
 * Q. What do we do next?
 * => Find the sum of the number and put it in the h1 tag to display.
 * => We created a simple in-memory variable called as count and 
 *    initialize it to "0", iterate from 1 to inputvalue and then do:
 *    count = count + i;
 * => This simply render these variables.
 * 
 * Q. Why this codebase not optimal?
 * => When we click on the counter button, setCounter gets called
 *    and the state variable changes and a re-render happens. Logic
 *    of the expensive runs again but inputValue didn't changed, only
 *    counter has changed. Do we need to run these expensive operation
 *    again. Can't we just remember the value from the last render
 *    rather than iterating over the for-loop again and that is what
 *    useMemo() let us do.
 * 
 * useMemo():
 * => Across renders if you want to remember a value then use useMemo.
*/

/**
 * Better Approach:
 * import { useState, useEffect } from "react";
 *
 * function App() {
 *     const [counter, setCounter] = useState(0);
 *     const [inputValue, setInputValue] = useState(1);
 *     const [finalValue, setFinalValue] = useState(0);
 *
 *     useEffect(() => {
 *       let count = 0;
 *       for(let i = 1; i <= inputValue; i++) {
 *           count = count + i;
 *       }
 *     setFinalValue(count);
 *     }, [inputValue])
 *
 *     return <div>
 *         <input onChange={function(e) {setInputValue(e.target.value)}} 
 *                 placeholder={"Find sum from 1 to n"}>
 *         </input>
 *         <br/>
 *         Sum from 1 to {inputValue} is {finalValue}
 *         <br/>
 *         <button onClick={() => {setCounter(counter + 1)}}>Counter: ({counter})</button>
 *     </div>
 * }
 *
 * export default App
 * 
 * => But there is one problem, we are causing a unnecessary rerender:
 *     useEffect(() => {
 *       let count = 0;
 *       for(let i = 1; i <= inputValue; i++) {
 *           count = count + i;
 *       }
 *     setFinalValue(count);
 *     }, [inputValue])
 * 
 * => Firstly, inputValue is changing, render has happened, and then
 *    because inputValue has changed, finalValue has changing, and
 *    this is causing another re-render.
 * 
 * useMemo():
 * => Across renders if you want to remember a value then use useMemo.
 * 
 * => We need something like useEffect() where our logic will run only
 *    when the inputValue changes. And this is what useMemo() does.
 * => Does not matter how many times re-render happens, it will run
 *    only when the inputValue changes. 
 * => And across the re-render, inputValue hasn't changed and counter
 *    has changed then our logic won't run. 
 * 
 *     let count = useMemo(() => {
 *       let count = 0;
 *       for(let i = 1; i <= inputValue; i++) {
 *           count = count + i;
 *       }
 *     return count
 *     }, [inputValue])
*/

/**
 * Optimal Code:
 * import { useState, useEffect } from "react";
 *
 * function App() {
 *   const [counter, setCounter] = useState(0);
 *   const [inputValue, setInputValue] = useState(1);
 *
 *   let count = useMemo(() => {
 *     let count = 0;
 *     for (let i = 1; i <= inputValue; i++) {
 *       count = count + i;
 *     }
 *     return count
 *   }, [inputValue])
 *
 *   return <div>
 *     <input onChange={function (e) { setInputValue(e.target.value) }}
 *       placeholder={"Find sum from 1 to n"}>
 *     </input>
 *     <br />
 *     Sum from 1 to {inputValue} is {count}
 *     <br />
 *     <button onClick={() => { setCounter(counter + 1) }}>Counter: ({counter})</button>
 *   </div>
 * }
 *
 * export default App
*/


import { useState, useMemo } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  let count = useMemo(() => {
    let finalCount = 0;
    for (let i = 1; i <= inputValue; i++) {
      finalCount = finalCount + i;
    }
    return finalCount
  }, [inputValue])

  return <div>
    <input onChange={function (e) { setInputValue(e.target.value) }}
      placeholder={"Find sum from 1 to n"}>
    </input>
    <br />
    Sum from 1 to {inputValue} is {count}
    <br />
    <button onClick={() => { setCounter(counter + 1) }}>Counter: ({counter})</button>
  </div>
}

export default App
