/**
 * Redux Toolkit:
 * > RTK simplified Redux and reduces the amount of code you need to write.
 *   - npm install @reduxjs/toolkit react-redux
 * 
 * 1. Store: Global Data Container
 *    - The store holds ALL your application state
 *    - Like a global JavaScript object that any component can access
 * 
 * 2. Reducers: The Update Rules
 *    > Reducers are functions that specify HOW the state can be updated.
 *    > Reducers are like rules that say:
 *    > "When this action happens, update the state like this..."
 * 
 * 3. useSelector: Reading from the Store
 *    > This hook lets components READ data from the store.
 *    > Like looking inside the safe to see what's there
 *    > const count = useSelector((state) => state.counter.value);
 * 
 * 4. useDispatch: Updating the Store
 *    > This hook lets components SEND update requests to the store.
 *    > Like sending a request to change what's in the safe
 *      const dispatch = useDispatch();
 *      dispatch(increment()); // "Please add 1 to the counter"
*/

import './App.css'
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';

function App() { 
  return (
    <div className="app">
      <h1>Todo List</h1>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
