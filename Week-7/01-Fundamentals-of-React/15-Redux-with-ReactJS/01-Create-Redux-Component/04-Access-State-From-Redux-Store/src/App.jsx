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
*/


import { useSelector } from 'react-redux'

export default function App() {
    let counter = useSelector((state) => state.counter);

    return (
        <div>
            <h1>Counter: {counter}</h1>
        </div>
    )
}