/**
 * Challenge-1: Setting Up Your Redux Project
 * Create a Redux store with a reducer and initial state.
 * You can use a simple counter reducer for this exercise.
 * 
 * 
 * Challenge-4: Test the Logging Middleware
 * 1. Click the 'Increment' and 'Decrement' buttons to trigger actions.
 *    Observe how the logging middleware logs the current state, action,
 *    and new state to the console.
 * 2. Verify that the middleware is working correctly by checking the
 *    log message and confirming that they match the state changes caused
 *    by the dispatched actions.
*/

import { useSelector, useDispatch } from "react-redux";
export default function App() {
  let counter = useSelector((state) => state.counter);

  let dispatch = useDispatch();

  let handleClick = (type) => {
    dispatch({ type });
  };

  return (
    <div className="App">
      <div> Counter: {counter} </div>
      <button onClick={(e) => handleClick("add")}> add </button>
      <button onClick={(e) => handleClick("minus")}> minus </button>
    </div>
  );
}
