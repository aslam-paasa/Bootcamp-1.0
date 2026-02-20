import './App.css'

/**
 * Q. Create a counter with + and - button.
 * => You only need to pass the right type as there's no need to pass
 *    payload.
 * 
 * => Step-1: Use useReducer hook with the default state.
 *    const [state, dispatch] = useReducer(counterReducer, { count: 0 })
 * 
 * => Step-2: Define a Reducer Function.
 *    This function will handle state updates on different action types.
 *    This function uses a switch statement and is defined with cases
 *    for "INCREMENT" and "DECREMENT" actions, which update the state by
 *    incrementing or decrementing the count value, respectively.
 * 
 *    const counterReducer = (acc, value) => {
 *       switch(value.type) {
 *          case 'INCREMENT':
 *             return { ...acc, count: acc.count + 1 };
 *          case 'DECREMENT':
 *             return { ...acc, count: acc.count - 1};
 *          default:
 *             console.log('Something went wrong');
 *             break;
 *       }
 *    }
 * 
 * => Step-3: Dispatching Actions
 *    When the "+" button is clicked, the dispatch function is called
 *    with the { type: "INCREMENT" } action object. When the "-" button
 *    is clicked, the dispatch function is called with the { type: "Decrement" }
 *    action object. These actions are dispatched to the counterReducer
 *    function, which updates the state accordingly.
 *    <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
 *    <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
 * 
 * Step-4: State Update
 *    After the state is updated by the counterReducer function. React
 *    re-renders the component with the updated state.count value.
 *    <p>Count : {state.count}</p>
*/

/**
 * Understanding:
 * The counterReducer function is defined to handle state updates based
 * on different action types. It takes two arguments - acc(which represents
 * the current state) and value(which represents the action dispatched).
 * 
 * When the "+" button is clicked, the dispatch function is called with
 * the { type: "INCREMENT" } action object. The counterReducer function
 * is executed with the current state(acc) and the action(value), and
 * a new state object is returned with the count value incremented by 1.
 * 
 * Similalry, when the "-" button is clicked, the dispatch function is
 * called with the { type: "DECREMENT" } action object, and the 
 * counterReducer function updates the state with the count value
 * decremented by 1.
*/

function counterReducer(state, action) {
  console.log({ state, action });

  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload };

    case "INCREMENT_BY_5":
        return { count: state.count + action.payload };  

    case "DECREMENT":
      return { count: state.count - 1 + action.payload };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h1>useReducer class | {state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT", payload: 1 })}> + </button>
      <button onClick={() => dispatch({ type: "DECREMENT", payload: -1 })}> - </button>
      <button onClick={() => dispatch({ type: "INCREMENT_BY_5,", payload: 5 })}> + 5 </button>
    </div>
  )
} 

export default App

/**
 * todoReducer(state, action) {
 *    
 *    case 'ADD_TODO':
 *       return { todo: [ ...todo, action.payload ]}
 * 
 *    case 'REMOVE_TODO':
 *       return { todo: state.todo.filter(todo => todo.id !== action.payload)}
 * 
 *    case 'TOGGLE_TODO':
 *       return { todo: state.todo.map(todo => todo.id === action.payload ? {...todo, todo.isDone = !todo.isDone} : todo)}
 * } 
 * 
 * 
 * ADD_TODO: { type: 'ADD_TODO', payload: event.target.value }
 * REMOVE_TODO: { type: 'REMOVE_TODO', payload: id }
*/