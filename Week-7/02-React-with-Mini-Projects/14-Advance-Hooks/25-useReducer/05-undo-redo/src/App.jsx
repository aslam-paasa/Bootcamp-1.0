/**
 * Challenge: Undo Redo
 * The goal of this challenge is, using useReducer, add increment, decrement,
 * undo, and redo functionality to your application. Unlike the other challenges,
 * you'll need to wire up useReducer, the event handlers, and the reducer
 * function yourself - you won't need to touch the JSX though.
 * 
 * Tasks:
 * 1. Clicking increment should increment the counter
 * 2. Clicking decrement should decrement the counter
 * 3. Clicking undo and redo should undo or redo the previous action
 * 
 * Hint:
 * 1. Since we already have our initialState and the skeleton for our reducer,
 *    the first thing we'll do is invoke useReducer in order to get our state
 *    and dispatch function.
 * 
 *    function CounterWithUndoRedo() {
 *       const [state, dispatch] = React.useReducer(reducer, initialState);
 *       ...
 *    }
 * 
 * 2. Let's wire up our event handlers to dispatch the appropriate actions
 *    when they're invoked. Our app will have four actions:
 *    a. increment,
 *    b. decrement,
 *    c. undo,
 *    d. redo
 *    Since we have access to the current state from inside of our reducer,
 *    we don't need to pass along any additional data when we dispatch these
 *    actions
 * 
 *    const handleIncrement = () => dispatch({ type: "increment" });
 *    const handleDecrement = () => dispatch({ type: "decrement" });
 *    const handleUndo = () => dispatch({ type: "undo" });
 *    const handleRedo = () => dispatch({ type: "redo" });
 * 
 *    Also, given these action types, we can sketch out the skeleton for
 *    our reducer.
 * 
 *    function reducer(state, action) {
 *       const { past, present, future } = state;
 *      
 *       if (action.type === "increment") {
 *         return {};
 *       }
 *      
 *       if (action.type === "decrement") {
 *         return {};
 *       }
 *      
 *       if (action.type === "undo") {
 *         return {};
 *       }
 *      
 *       if (action.type === "redo") {
 *         return {};
 *       }
 *      
 *       throw new Error("This action type isn't supported.")
 *    }
 * 
 *   Since we're returning a value from each one, I'm choosing to do multiple
 *   if statements instead of if/else or a awicth statement. This is just a
 *   personal preference, but I find it easier to read in this scenario.
 * 
 * 3. Let's start with implementing the logic for when an increment action
 *    is dispatched. If you look at our initialState, you'll notice that
 *    there are three properties we want to keep track of - past, present,
 *    and future.
 * 
 *    present represents the current value of the counter, past represents
 *    an array of all the previous values of the counter (for when a user
 *    presses undo), and future represents an array of all the potential
 *    future values of the counter(for when a user presses redo after they've
 *    presses undo).
 * 
 *    When an increment action is dispatched, we want to add the current
 *    value of the counter to the past array, increment the present value
 *    of the counter, and clear out the future array.
 * 
 *    if (action.type === "increment") {
 *       return {
 *         past: [...past, present],
 *         present: present + 1,
 *         future: []
 *       };
 *    }
 * 
 *    The reason we clear out the future array is because that only applies
 *    when the user has pressed undo. If the user presses increment after
 *    pressing undo, we want to clear out the future array so that the
 *    user can't press redo and go back to the previous value of the counter.
 * 
 * 4. Next is when decrement is dispatched. This is similar to the logic for
 *    when an increment action is dispatched, except we're decrementing the
 *    present value of the counter instead of incrementing it.
 * 
 *    if (action.type === "decrement") {
 *       return {
 *          past: [...past, present],
 *          present: present - 1,
 *          future: []
 *       };
 *    }
 * 
 * 5. When undo is dispatched, we want to take the last value of the past
 *    array and set that as the present value of the counter. We also want
 *    to take the last value of the past array and add it to the future
 *    array. Finally, since it's now the present value, we want to remove
 *    the last value of the past array.
 * 
 *    if (action.type === "undo") {
 *       return {
 *          past: past.slice(0, -1),
 *          present: past.at(-1),
 *          future: [present, ...future]
 *       };
 *    }
 * 
 * 6. Finally, when redo is dispatched, we want to take the first value of
 *    the future array and set that as the present value of the counter.
 *    We also want to take the first value of the future array and add it
 *    to the past array. Finally, we want to remove the first value of the
 *    future array since it's now the present value.
 * 
 *    if (action.type === "redo") {
 *       return {
 *          past: [...past, present],
 *          present: future[0],
 *          future: future.slice(1)
 *       };
 *    } 
*/

import './App.css'

const initialState = {
  past: [],
  present: 0,
  future: []
};

function reducer(state, action) {
  const { past, present, future } = state;

  if (action.type === "increment") {
    return {
      past: [...past, present],
      present: present + 1,
      future: []
    };
  }

  if (action.type === "decrement") {
    return {
      past: [...past, present],
      present: present - 1,
      future: []
    };
  }

  if (action.type === "undo") {
    return {
      past: past.slice(0, -1),
      present: past.at(-1),
      future: [present, ...future]
    };
  }

  if (action.type === "redo") {
    return {
      past: [...past, present],
      present: future[0],
      future: future.slice(1)
    };
  }

  throw new Error("This action type isn't supported.")
}

function CounterWithUndoRedo() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleIncrement = () => dispatch({ type: "increment" });
  const handleDecrement = () => dispatch({ type: "decrement" });
  const handleUndo = () => dispatch({ type: "undo" });
  const handleRedo = () => dispatch({ type: "redo" });

  return (
    <div>
      <h1>Counter: {state.present}</h1>
      <button className="link" onClick={handleIncrement}>
        Increment
      </button>
      <button className="link" onClick={handleDecrement}>
        Decrement
      </button>
      <button
        className="link"
        onClick={handleUndo}
        disabled={!state.past.length}
      >
        Undo
      </button>
      <button
        className="link"
        onClick={handleRedo}
        disabled={!state.future.length}
      >
        Redo
      </button>
    </div>
  );
}

function App() {

  return (
    <div>
      <CounterWithUndoRedo />
    </div>
  )
}

export default App
