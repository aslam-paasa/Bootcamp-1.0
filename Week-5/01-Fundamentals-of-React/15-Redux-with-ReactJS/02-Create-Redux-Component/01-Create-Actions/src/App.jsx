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


