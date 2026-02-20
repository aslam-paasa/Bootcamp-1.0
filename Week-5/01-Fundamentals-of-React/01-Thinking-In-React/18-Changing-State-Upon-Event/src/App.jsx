/**
 * Q. Write a Counter Component which has two buttons + and - and an
 *    initial count of 0 on the screen. Both the buttons will increase
 *    or decrease the count by 1 respectively. Display the increasing
 *    or decreasing count on the click of the buttons.
 * 
 * 1. If we give a fn to onClick() fn, it will run that fn.
 * 2. Whenever we give a JS fn, we wrap it inside a curly bracket.
 * 
 *    let count = 3;
 *    const handleClick = () => {
 *       console.log('clicked');
 *    }
 * 
 *    <h1 className="app-header" onClick={handleClick}>{count}</h1>
 * 
 * 3. Now, whenever we click, it will increment the counter.
 * 
 *    let count = 3;
 *    const handleClick = () => {
 *       console.log('clicked', count++);
 *    }
 * 
 *    <h1 className="app-header" onClick={handleClick}>{count}</h1>
 * 
 * Issue: Value is changing in the console, but it is not changing in
 *        the screen/html. And that's where useState() comes into play.
*/

/**
 * State: 
 * It is variable which react can track, and everytime there is a change
 * in that variable, react will refresh the view for it. And we can
 * achieve it by using useState() Hook.
 * 
 * useState Hook:
 * When we declare a state variable with useState, it returns a pair -
 * an array with two items. 
 * 1. Item-1: Current Value
 * 2. Item-2: function that let us update it.
 */

import { useState } from 'react';

function App() {
  const [ count, setCount ] = useState(0);

  const handleClick = () => {
    setCount((count) => count + 1);
  }
  return (
    <div style={{ textAlign: 'center'}}>
      <p>{count}</p>
      <button onClick={handleClick}>Counter</button>
    </div>
  )
}

export default App
