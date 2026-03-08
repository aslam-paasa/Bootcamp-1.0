import { useReducer, useState } from 'react';
import './App.css'

/**
 * Understanding:
 * Both useState and useReducer return a current state and value and
 * a function to update the state. However, useState uses a function
 * that directly sets a new state value, while useReducer uses a
 * dispatch function that takes an action and uses a reducer function
 * to calculate and set the new state value based on the current state
 * and the action.
 * 
 * When the button is clicked, the andFunctionToSetState function is
 * called, which is turn dispatched an action to the reducerFunc.
 * 
 * The reducerFunc logs "being called..." to the console, indicating that
 * it has been called due to the state update. This way, everytime the
 * button is clicked, and the message "being called..." is logged to the
 * console.
*/

/**
 * Q. Let's see how the wiring works in React.
 *    Use useReducer() to console.log every time a button is clicked.
*/


function App() {

  function reducerFunc() {
    console.log("being called...");
  }

  /**
   * const [currentState, SetterFn] = useReducer(callbackFn, initialValue);
  */
  const [state, dispatch] = useReducer(reducerFunc, {});

  return (
    <div className="App">
      <h1>tanaypratap's box</h1>
      <h2>write your app here</h2>
      <button onClick={() => dispatch()}>
        Done by professionals, don't try at home.{ state }
      </button>
    </div>
  );
}

export default App
