/**
 * Assignment: useState Types
 * In this exercise, you'll practice typing the useState hook in TypeScript.
 * You will define state types for various use cases and apply them in
 * functional components to ensure type safety and clarity.
*/

/**
 * Instructions:
 * 1. Basic useState Typing
 *    a. Open App.tsx (or create a new component if you prefer).
 *    b. Define a state variable with useState and type it explicitly.
 * 
 * 2. Typing Complex State
 *    a. Create a new file named UserProfile.tsx in the src directory.
 *    b. Define a state variable that holds an object with user profile
 *       information and type it accordingly.
 * 
 * 3. Typing State with Arrays
 *    a. Create a new file named TodoList.tsx in the src directory.
 *    b. Define a state variable for a list of todo items and type it
 *       accordingly.
*/

import UserProfile from "./components/UserProfile"
import TodoList from "./components/TodoList"
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>

      <UserProfile />
      <TodoList />
    </div>
  );  
}

export default App
