/**
 * TOPIC: Child to Parent Data Passing in React
 * 
 * In the previous file, we learned Parent → Child via props.
 * But what if the CHILD needs to send data BACK to the Parent?
 *
 * Example: A button is inside a Child, but the Parent needs
 * to know when it was clicked and update its own state.
 *
 * We will go through 3 approaches — worst to best.
 */

import { useState } from "react";


/**
 * APPROACH 1 — Direct Variable Mutation ❌
 * Here we try to update a plain variable directly when the
 * button is clicked. This feels logical but completely breaks
 * in React.
 *
 * WHY THIS IS BAD:
 *
 * 1. UI never updates:
 *    count++ changes the value in memory, but React has NO idea
 *    the value changed. React only re-renders a component when
 *    its STATE changes. A plain variable is not state.
 *
 * 2. React does not track plain variables:
 *    React's rendering system only watches useState values.
 *    If you mutate a regular variable, the component never
 *    re-renders and the screen stays frozen at 0 forever.
 *
 * 3. Completely unpredictable:
 *    The variable IS changing in memory, but the screen is not
 *    updating. Now you have a variable that says 5 but the UI
 *    shows 0. This mismatch will drive you crazy debugging.
 */

function ParentComponentApproach1() {
  /* ❌ plain variable — React does not watch this */
  let count = 0;

  return (
    <div>
      <p>Count: {count}</p>
      {/* ❌ count++ updates the variable in memory but React
          never re-renders. The UI stays stuck at 0. */}
      <button onClick={() => count++}>Increment</button>
    </div>
  );
}


/**
 * APPROACH 2 — Callback Functions ✅
 * This is the correct React way to pass data from Child to Parent.
 *
 * The idea: Parent gives its own function to the Child as a prop.
 * When the Child wants to tell the Parent something, it CALLS
 * that function. The Parent's function then updates state,
 * which triggers a re-render.
 *
 * Real world analogy:
 * Parent gives the child their phone number.
 * Whenever the child needs something, they CALL that number.
 * The parent picks up and takes action.
 *
 * HOW THIS SOLVES APPROACH 1's PROBLEMS:
 *
 * 1. UI always updates:
 *    We use useState now. When setCount is called, React knows
 *    the state changed and re-renders the component immediately.
 *    The screen reflects the new value instantly.
 *
 * 2. React tracks it properly:
 *    useState is React's official way to store values that
 *    affect the UI. Any change to it triggers a re-render.
 *
 * 3. Predictable and controlled:
 *    Data flows in a clear direction:
 *    Child clicks button → calls onIncrement → Parent updates state
 *    You always know exactly what happened and why.
 *
 * FLOW:
 * Step 1 — Parent creates a function (handleIncrement) and
 *           passes it to Child as a prop called onIncrement.
 *
 * Step 2 — Child receives onIncrement and attaches it to the
 *           button's onClick. The child does NOT manage state.
 *
 * Step 3 — User clicks button → onIncrement is called with
 *           a function: prev => prev + 1
 *
 * Step 4 — Parent's handleIncrement receives that function,
 *           passes it to setCount, which updates state.
 *
 * Step 5 — React sees state changed → re-renders Parent →
 *           UI shows the new count value.
 */

/* ✅ Parent OWNS the state and provides a function to Child */
function ParentComponentApproach2() {
  const [count, setCount] = useState(0);

  /**
   * This function is the "phone number" given to the child.
   * When called, it updates the parent's state.
  */
  const handleIncrement = (value) => {
    setCount(value);
  };

  return (
    <div>
      {/* Parent displays the count — it owns and controls this */}
      <p>Count: {count}</p>

      {/* Parent passes its function down to Child as a prop */}
      <ChildComponentApproach2 onIncrement={handleIncrement} />
    </div>
  );
}

/**
 * ✅ Child does NOT own state. It just calls the function
 *     the Parent gave it whenever the button is clicked.
*/
function ChildComponentApproach2({ onIncrement }) {
  return (
    /** 
     * When clicked, calls onIncrement with a function that
     * takes the previous count and returns previous + 1.
     * The Parent's handleIncrement receives this and updates state.
    */
    <button onClick={() => onIncrement(prev => prev + 1)}>
      Increment
    </button>
  );
}


/**
 * APPROACH 3 — Callback with History Tracking ✅✅
 * Same callback pattern as Approach 2, but now the Parent
 * does MORE when it receives the value — it also keeps a
 * history of every count value that was ever set.
 *
 * This shows how powerful the callback pattern really is.
 * The Child's job is still simple — just call the function.
 * The Parent decides what to DO with the value.
 *
 * Real world analogy:
 * Child tells mom "I want 2 ice creams".
 * Mom gives 2 ice creams AND writes it in a notebook.
 * Later she can look back and see the full history of requests.
 *
 * HOW THIS IMPROVES APPROACH 2:
 *
 * 1. Same controlled data flow as Approach 2.
 *
 * 2. Better state management:
 *    The Parent can now maintain multiple related pieces of
 *    state together — the current count AND the history.
 *    The Child remains completely unaware of all of this.
 *
 * 3. History tracking becomes possible:
 *    Every time the Child triggers an update, the Parent
 *    records it. This is the foundation for features like
 *    undo/redo, audit logs, and activity feeds.
 *
 * KEY INSIGHT:
 *    The Child component is IDENTICAL to Approach 2.
 *    The Child did not change at all — the Parent just became
 *    smarter about what it does with the received value.
 *    This is the power of separating concerns.
 */

/* ✅ Parent now tracks both current count AND full history */
function ParentComponentApproach3() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]); // stores every past value

  const handleIncrement = (value) => {
    setCount(value);
    /**
     * Append the new value to history array
     * prev => [...prev, value] creates a new array with the new value added
    */
    setHistory(prev => [...prev, value]);
  };

  return (
    <div>
      <p>Count: {count}</p>
      {/* history.join(', ') displays: 1, 2, 3, 4, 5 */}
      <p>History: {history.join(", ")}</p>

      {/* Exact same Child as Approach 2 — nothing changed in Child */}
      <ChildComponentApproach3 onIncrement={handleIncrement} />
    </div>
  );
}

/**
 * ✅ Child is IDENTICAL to Approach 2.
 *     The child has no idea the parent is now tracking history.
 *     It just calls the function — the parent decides the rest.
*/
function ChildComponentApproach3({ onIncrement }) {
  return (
    <button onClick={() => onIncrement(prev => prev + 1)}>
      Increment
    </button>
  );
}


/**
 * WHAT'S NEXT — State Management Libraries
 * 
 * Callback functions work well for Parent ↔ Child communication.
 * But what if two components that are far apart in the tree
 * need to share data? Passing props through 5 levels of
 * components becomes messy — this is called "prop drilling".
 *
 * That is when State Management Libraries come in:
 *
 * 1. Context API  → built into React, good for small-medium apps
 * 2. Redux        → most popular, great for large complex apps
 * 3. Zustand      → simple and lightweight, growing in popularity
 * 4. Recoil       → atomic state, built by Facebook
 * 5. Jotai        → similar to Recoil, very minimal API
 *
 * We will cover these in upcoming files.
 * ============================================================
 */


/**
 * ============================================================
 * APP
 * ============================================================
 */
const App = () => {
  return (
    <div>
      <h1>Child to Parent Data Passing</h1>

      <h2>Approach 1 — Direct Variable Mutation (broken)</h2>
      <ParentComponentApproach1 />

      <h2>Approach 2 — Callback Function (correct)</h2>
      <ParentComponentApproach2 />

      <h2>Approach 3 — Callback with History Tracking (extended)</h2>
      <ParentComponentApproach3 />
    </div>
  );
};

export default App;