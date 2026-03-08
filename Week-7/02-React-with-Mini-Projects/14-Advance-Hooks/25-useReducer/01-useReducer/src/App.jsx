/**
 * useReducer() Hook - State Management:
 * - useReducer() ka use tb hota hai jb hme zyada complex state manage 
 *   krni ho. 
 *   E.g., 300 states ek sath manage krni ho.
 * - Basically it is an alternative of useState
 * - useReducer() thoda complex hota hai as compared to useState().
 * - Ye reduce() function pe based hota hai jo JS mai hota hai.
*/


/**   
 * Q. How does reducer fn work?
 * => arr=[10,20,30,40,50]
 * => Isse ek single value bna k return karega i.e. 150 (sabko add kr 
 *    dega).
 *    
 *    arr.reduce(callbackFn, initialVal)
 *                   |           |
 *                   V           V
 *    const initialVal = 0;
 *    const reducerFn = (prevVal, nextVal) => {
 *       return prevVal + nextVal;
 *    };
 * 
 *    console.log(arr.reduce(reducerFn, initialVal)); => 150
 * 
 *    a. initialVal = 0
 *       arr = [10,20,30,40,50] => 150
 *       O/P: 150
 *    b. initialVal = 2
 *       arr = [10,20,30,40,50] => 150
 *       O/P: 152
 * 
 * - Exact same humaara useReducer() hook follow kr rha hota hai.
 *   Isme hum ek initialState dete hai aur ek reducer function jo state
 *   ko update krta hai based on actions.
 * 
 *   const [counter, dispatch] = useReducer(reducerFn, intialState);
*/ 


/** 
 * Explanation of useReducer() parameters:
 * a. intialState: Pehla state value jo reducer ke through update hoti hai.
 * b. reducer: Jo function state update krne ke rules define krta hai.
 * 
 * 
 * Example of initialState:
 * - useReducer mai intialState object component k bahar bnta hai, 
 *   qki ye multiple states k liye bna hai.
 * 
 *       const initialState = {
 *          counter: 0  |
 *       }              |
 *                      V
 *             Story starts from here
 * 
 * 
 * Example of a reducer function:
 * - reducer fn 2 chije as an input leta hai:
 *   a. state:  initialState
 *   b. action: Koi v kaam ek action hai
 * 
 * - Aur ye 2 chije return krta hai:
 *   a. counter ki state
 *   b. dispatch fn: Means kuch bhijwana
 *        |
 *        V
 * - Maine button click kiya to wo click ek action hai. Ab button click
 *   krne pe kn sa action hoga wo humein react ko mera msg bhijwana 
 *   pdega ki ye increment kr do(dispatch).
 * - So, humein incrementHandler fn react ko dispatch krwana pdega,
 *   taaki increment ho. Aur increment krne k liye dispatch k andr
 *   uss action ko paas krte hai ki react mera ye kaam kr do.
 * - Action k andr mere paas 2 chije hoti hai:
 *   a. type: Kis action pe kn sa kaam krwana hai wo type k through lgta hai.
 *   b. payload (not required)
 *   => Ye poora mera action hai: {type: "INCREMENT_COUNTER"}
 * 
 *   const incrementHandler = () => {
 *      dispatch({
 *         type: "INCREMENT_COUNTER"})  ==> Capital Letter Best Practice
 *         // payload => used to send data
 *   }
 * 
 * 
 * const reducer = (state = initialState, action) => {
 *    switch(action.type) {
 *       case "INCREMENT_COUNTER":
 *          return { counter: state.counter + 1 };
 *       case "DECREMENT_COUNTER":
 *          return { counter: state.counter - 1 };
 *       case "RESET_COUNTER":
 *          return { counter: 0 };
 *       default:
 *          return state;
 *    }
 * };
 * 
 * Note: Jb humaari application load hogi tb default case chlega qki
 *       humne koi action perform hi nhi kiya hai.
 * 
 * 
 * O/P: 
 *       const initialState = {
 *          counter: 0  => UpdateCounter
 *       }               
 *                      
 * 
 * Workflow of useReducer():
 * 1. Button click ek action trigger krta hai (increment, reset, etc).
 * 2. Ye action dispatch ke through reducer function ko call krta hai.
 * 3. Reducer function action type check krke appropriate state update 
 *    return krta hai.
 * 
 * Benefits:
 * - Better for complex state handling with multiple actions.
 * - Code readability and structure improve hota hai. 
*/

/**
 * 2 ways to State Update:
 * 1. Direct update(Setting a new value directly):
 * => const incrementHandler = () => {
 *       setCounter(counter+1);
 *    };
 * => It tries to counter+1 as the new value of counter.
 * => React might not update the counter value right away because sometimes
 *    delays updates to make things faster. So if counter changes a lot,
 *    this method might use an old value of counter instead of most
 *    recent one.
 * 
 * 2. Function Form(Using a fn to setState):
 * => const incrementHandler = () => {
 *       setCounter((prev) => prev + 1);
 *    }
 * => State depends upon previous value.
 * => Using prev guarantees that even if counter is updated multiple times
 *    quickly, it will always use the most current value to calculate
 *    the new one.
 * 
 * Q. When to use what?
 * => Use direct update: When you are not worried about timing issues,
 *    like a single button click that updates a simple value.
 * => Use Function Update: When the new state depends on the previous
 *    value(e.g. counting clicks, adding/subtracting in a sequence).
 *    This way, even rapid updates, the latest state is always used.
*/

import { useState, useReducer } from "react"

// Define initial state for useReducer
const initialState = {
  counter: 0,
  heading: "Update Heading"
}

/**
 * Define reducer function:
 * - Jb INCREMENT_COUNTER call kr the hai to wo sirf counter de rha,
 *   heading de hi nhi rha, jiske wajah se humaara heading ka data
 *   blank ho rha.
 * - Soln: Spread Operator - Array/Object se values ki copy nikaal
 *   leta tha. 
 *   a. ...state: Poori object ki saari values ki copy le li
 *   b. Ab is object m states ko override kr diya.
 *      Ex: { ...state, counter: state.counter+1 }
 *          { ...state, counter: state.counter - 1 }
 *          { ...state, heading: action.payload }
 *          
 * */ 
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "INCREMENT_COUNTER":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT_COUNTER":
      return { ...state, counter: state.counter - 1 };
    case "RESET_COUNTER":
      return { ...state, counter: 0 };
    case "UPDATE_HEADING":
      return { ...state, heading: action.payload }; // <== text data
    default: 
      return state;
  }
}

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>Hello</h1>
      <UseStateCounter counter={counter} setCounter={setCounter} />
      <UseReducerCounter />
    </div>
  )
}


function UseStateCounter({ counter, setCounter }) {
  const incrementHandler = () => setCounter(prev => prev + 1);
  const resetHandler = () => setCounter(0);
  const decrementHandler = () => setCounter(prev => prev - 1);

  return (
    <div>
      <h1>Counter-1 using useState Hook</h1>
      <div>{counter}</div>
      <button onClick={incrementHandler}>+</button>
      <button onClick={resetHandler}>RESET</button>
      <button onClick={decrementHandler}>-</button>
    </div>
  )
}

function UseReducerCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const incrementHandler = () => dispatch({ type: 'INCREMENT_COUNTER' });
  const resetHandler = () => dispatch({ type: 'RESET_COUNTER' });
  const decrementHandler = () => dispatch({ type: 'DECREMENT_COUNTER' });
  const updatedHeadingHandler = () => dispatch({ 
    type: 'UPDATE_HEADING',
    payload: 'JavaScript Counter'
  });

  return (
    <div>
      <h1>Counter-2 using useReducer Hook</h1>
      <div>{state.counter}</div>
      <button onClick={incrementHandler}>+</button>
      <button onClick={resetHandler}>RESET</button>
      <button onClick={decrementHandler}>-</button>
      <br />
      <h3>{state.heading}</h3>
      <button onClick={updatedHeadingHandler}>Update Heading</button>
    </div>
  )
}

export default App
