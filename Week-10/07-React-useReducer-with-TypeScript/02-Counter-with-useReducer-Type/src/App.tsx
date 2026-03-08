/**
 * Typing useReducer:
 * > In this exercise, you'll practice using the useReducer hook with TS.
 * > You'll create a state management system using useReducer and type the
 *   actions, state and reducer fn to ensure type safety.
 * 
 * Instructions:
 * 1. Define State and Actions
 *    a. Create a file named counterReducer.ts in the src directory.
 *    b. Define the types for the state and actions for counter.
 * 2. Create the Counter Component
 *    a. Create a file named Counter.tsx in the src directory.
 *    b. Use useReducer to manage the counter state and actions in the
 *       component.
 * 3. Use the Component in App
 *    a. Open App.tsx (or create a new component if you prefer)
 *    b. Import and use the Counter component
*/

import Counter from "./component/Counter";

const App = () => {
  return (
    <div>
      <Counter />
    </div>
  )
}

export default App
