/**
 * Understanding Dispatch Actions:
 * - Dispatching actions is like telling our app what we want to do. It's
 *   like giving commands to our app to make things happen.
 * - When we dispatch actions, we're telling our app what we want to do.
 *   We say, "Add a cookie" by dispatching an action that the store understands.
 *   The store then follows the plan with the help of reducer and changes the
 *   number of cookies accordingly.
 *   => store.dispatch({ type: 'cookies/added' })
 * 
 * Note: If user did something, dispatch will tell the reducer action to do that.
 *       If reducer action changes the state, store will update the state.
 *       If subscribe method is listening to the store, it will update the UI.
*/

/**
 * Challenge:
 * Use the dispatch method of the Redux store to dispatch actions. 
 * Add 2 cookies & then remove 1.
*/

/**
 * Steps to follow:
 * 1. Importing the createStore function from redux and cookiesReducer
 * 2. Creating a store: (Adding redux dependency)
 *    - Keep the copy of the state in the store
 * 3. Subscribing/Listening to the store
 *    - subscribe() is used to listen for state changes
 *    - get the current state of the store using store.getState()
 * 4. Dispatching actions: (Listening to UI events)
 *    - Use the dispatch method of the Redux store to dispatch actions
 *    - store.dispatch({ type: 'ADD_COOKIE' })    => Add a cookie
 *    - store.dispatch({ type: 'REMOVE_COOKIE' }) => Remove a cookie
*/


import { createStore } from 'redux'
import cookiesReducer from './cookieReducer'

const store = createStore(cookiesReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "ADD_COOKIE" });
store.dispatch({ type: "ADD_COOKIE" });
store.dispatch({ type: "REMOVE_COOKIE" });

export default store;