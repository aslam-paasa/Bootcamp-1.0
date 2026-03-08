/**
 * useRef:
 * In React, useRef is a hook that provides a way to create a reference to a
 * value or a DOM element that persists across renders but does not trigger a
 * re-render when the value changes.
 * 
 * - useRef let's us do two things:
 *   a. Create a reference to a DOM element.
 *   b. Create a reference to a value.
 * 
*/

/**
 * Key Characteristics: [Two Use Cases of useRef]
 * 1. Persistent Across Renders:
 *    - The value stored in useRef persists between component re-renders. 
 *    - This means the value of a 'ref' does not get reset when the component
 *       re-renders, unlike regular variables.
 * 2. No Re-Renders on Change:
 *    - Changing the value of 'ref' (ref.current) does not cause a component
 *      to re-render. 
 *    - This is different from state (useState), which triggers a re-render
 *      when updated.
*/


/**
 * Q. Focusing on an input box:
 *    - document.getElementById().focus()
 *    - ref.current.focus()
*/
import { useRef } from 'react';

function App() {

  return (
    <div>
      <DomManipulation1 />
      <DomManipulation2 />
    </div>
  )
}


/**
 * Approach-1: Manipulating the DOM directly [document.getElementById()]
 * Q. How to focus on an input element?
 *    - document.getElementById().focus()
 *    - Example : 
 * 
 *      window.setTimeout(() => {
 *        document.getElementById('name').focus()
 *      }, 3000)
 * 
 *    - After 3 seconds, the cursor will automatically move to the input 
 *      element.
 * 
 * Q. How to write this in React?
 *    - In the below code, when we click the button, the focus will reach to
 *      the input element after 3 seconds.
 * 
 * Note: Manipulating the DOM directly is not a good practice.
*/
function DomManipulation1() {

  function focusInput() {
    window.setTimeout(() => {
      document.getElementById('name').focus()
    }, 3000)
  }

  return (
    <div>
      Sign up
      <input id="name" type="text" />
      <input type="text" />
      <button onClick={focusInput}>Submit</button>
    </div>
  )
}


/**
 * Approach-2: Using useRef
 * 1. Create a reference to the DOM element:
 *    a. Instead of document.getElementById(), I can use: ref.current
 *    b. Just like id, ref is a property of the input element to target the
 *       input element.
 * 
 *      const inputRef = useRef();
 *      <input ref={inputRef} type="text" />
 * 
 *    c. Focus on the DOM element: ref.current.focus()
 *       [current means what is currently being stored in this ref]
 */
function DomManipulation2() {

  const inputRef = useRef();

  function focusInput() {
    // document.getElementById('name').focus();
    inputRef.current.focus();
  }

  return (
    <div>
      Sign up
      <input ref={inputRef} type="text" />
      <input type="text" />
      <button onClick={focusInput}>Submit</button>
    </div>
  )
}


export default App
