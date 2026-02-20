import './App.css'

/**
 * Counter with reducer:
 * Q. Create counter with increment + and useReducer.
 * => Step-1: Use useReducer hook with the default state.
 *    const [state, dispatch] = useReducer(reducerFunc, { counter: 0 })
 * 
 * => Step-2: Define the Reducer Function
 *    function reducerFunc(state, action) {
 *       return { ...state, counter: state.counter + action.payload }
 *    }
 * 
 * => Step-3: Write it with UI
 *    <h2>{state.counter}</h2>
 *    <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
 *       +{" "}
 *    </button>
*/

/**
 * Understanding:
 * Inside the reducerFunc, the current state is spread into a new object
 * using the spread syntax. Then, the action.payload value is added to
 * the counter property of the state object, which is used to calculate
 * the new state value.
 * 
 * When the button is clicked, the dispatch fn is called with the action
 * object, and the reducerFunc is executed with the current state and
 * the action.
 * 
 * The counter value in the state is incremented by the action.payload
 * value, and a new state object is returned.
 * 
 * This triggers a re-render of the component with the updated state and
 * the updated state.counter value is displayed in the UI:
 * 
 * => Internal representation of userReducer
 *    function useReducerImpl(reducerFunc, initialState) {
 *       function dispatch(action) {
 *          reducerFunc(intialState, action)
 *       }
 *       return [intialState, dispatch];
 *    }
*/

function counterReducer(state, action) {
  console.log({ state, action });

  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "INCREMENT_BY_5":
        return { count: state.count + 5 };  

    case "DECREMENT":
      return { count: state.count - 1 };

    default:
      return state;
  }
}

function App() {
  
  /**
   * useReducer Hook:
   * const [currentState, SetterFn] = useReducer(callbackFn, initialValue);
   * 
   * 1. currentState will come automatically. So, the only thing we
   *    need to  pass is the action. And we pass action in an object. 
   * 
   *    const dispatch = (action) => counterReducer(state, action);
   * 
   * 2. Similar to useState, dispatch is a fn that will call reducer 
   *    with the value passed (update fn).
  */
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h1>useRedcer class | {state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}> + </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}> - </button>
      <button onClick={() => dispatch({ type: "INCREMENT_BY_5" })}> + 5 </button>
    </div>
  )
} 

export default App
