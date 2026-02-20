/**
 * Flow of Redux:
 * 1. UI does ACTION
 * 2. ACTION goes to REDUCER
 * 3. REDUCER updates STORE
 * 4. STORE updates UI
*/

/**
 * In ReactJS:
 * 1. Context gives you the access to the state tree across components.
 * 2. Provider provides context to the part of the tree or the whole tree.
 *    a. Need Store? <Provider state={store} /> => App.jsx
 *    b. Use the store: You need some part of the store in a component? 
 *      - vanilla React: useContext()
 *      - redux React  : useSelect()
 * 3. You need to update the store:
 *    a. vanilla React : dispatch
 *    b. redux React   : useDispatch()
 * 
 * Note: useReducer + useContext = Redux
*/


/**
 * Challenge-4: Access State from Redux Store
 * In the App.jsx file, use the useSelector hook to access the counter value
 * from the Redux store and display it in the component.
 * 
 * Challenge-5: Add handleClick
 * Add the event listeners to the 'add' and 'minus' buttons in the App.jsx
 * file, calling the handleClick function with the appropriate action type
 * when each button is clicked.
*/


import { useSelector } from 'react-redux'

export default function App() {
    let counter = useSelector((state) => state.counter);

    return (
        <div>
            <h1>Counter: {counter}</h1>

            {/* Add event listeners to the buttons */}
            <button onClick={() => handleClick('add')}>Add</button>
            <button onClick={() => handleClick('minus')}>Minus</button>
        </div>
    )
}