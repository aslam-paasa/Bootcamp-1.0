
/**
 * Child to Parent Data Passing:
*/

/**
 * Approach-1: Direct state modification (worst approach)
 * > File-1: ParentComponent.jsx
 */
function ParentComponent() {
  let count = 0;  // Bad practice!

  return (
      <div>
          <ChildComponent count={count} />
          <button onClick={() => count++}>Increment</button>
      </div>
  );
}

/**
* Problems with Approach-1:
* 1. State doesn't update UI:
*    count++ doesn't trigger re-render.
* 
* 2. React doesn't know value changed
*    It's just a variable, not real React state.
* 
* 3. Totally unpredictable behavior
*    You'll go crazy debugging this
*/


/**
* Approach-2: Callback functions (better approach)
 * Parent provide phone number to child, and child save that
 * number in his phone. Now, whenever the child wants something
 * from parent, he can call the parent and ask for it.
 *
 * Similarly, in React, parent component provides a function to
 * child component i.e. handleIncrement, and child component
 * saves that anonymous function in his button's onClick handler. Now,
 * whenever the child clicks the button, the function will do some
 * operation and then returns the value to parent component. 
 * (message to parent: I want to increment the count).
 *
 * Flow: 
 * 1. Parent sharing a function to child:
 *    <ChildComponent onIncrement={handleIncrement} />
 *
 * 2. Child saves the function and calls when needed:
 *    <button onClick={() => onIncrement(prev => prev + 1)}>Increment</button>
 *
 * 3. Function does some operation and returns the value to parent:
 *    setCount(value);
 *
 * 4. Parent updating the UI with new count:
 *    <p>Count: {count}</p>
 * 
 *    Count++ : 0 -> 1 -> 2 -> 3 -> 4 -> 5
*/

/**
* File-1: ParentComponent.jsx
*/
function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleIncrement = (value) => {
      setCount(value);
  };

  return (
      <div>
          <p>Count: {count}</p>
          <ChildComponent onIncrement={handleIncrement} />
      </div>
  );
}

/**
* File-2: ChildComponent.jsx
*/
function ChildComponent({ onIncrement }) {
  return (
      <button onClick={() => onIncrement(prev => prev + 1)}>
          Increment
      </button>
  );
}


/**
* Benefits:
* 1. Controlled data flow
* 2. Predictable behavior
* 3. Easy to debug
*/


/**
* Approach-3: Event Handler
* In this case, when the child component is clicked, it do some
* operation and then returns the value to parent component.
* 
* 1. When button is clicked, child component sends a value to parent.
*    <button onClick={() => onIncrement(prev => prev + 1)}>
*        Increment
*    </button>
* 
* 2. Parent component stores this value in its state
*    const [count, setCount] = useState(0);
* 
* 3. Parent also keeps track of all values in history
*    const [history, setHistory] = useState([]);
* 
* Example:
* a. Like a child telling mom "I want 2 ice creams"
* b. Mom gives 2 ice creams and remembers how many ice creams child asked for
* c. Similarly, child component sends count to parent, and parent stores it
*/

/**
* File-1: ParentComponent.jsx
*/
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const handleIncrement = (value) => {
      setCount(value);
      setHistory(prev => [...prev, value]);
  };

  return (
      <div>
          <p>Count: {count}</p>
          <p>History: {history.join(', ')}</p>
          <ChildComponent onIncrement={handleIncrement} />
      </div>
  );
}


/**
* File-2: ChildComponent.jsx
*/
function ChildComponent({ onIncrement }) {
  return (
      <button onClick={() => onIncrement(prev => prev + 1)}>
          Increment
      </button>
  );
}


/**
* Benefits:
* 1. Controlled data flow
* 2. Better state management
* 3. History tracking possible
*/

/**
* State Management Libraries:
* 1. Redux
* 2. Context API
* 3. Zustand
* 4. Recoil
* 5. Jotai
*/


const App = () => {
  return (
    <div>
      <h1>Child to Parent Data Passing</h1>
      <ParentComponent />
    </div>
  )
}

export default App
