/**
 * Challenge: Interacting with the cookie counter:
 * - index.html contains a "get a cookie" button, a "give away a cookie" 
 *   button, and a text element displaying the current count of cookies. 
 *   Your task is to write javascript code that interacts with these elements
 *   with document.getElementsById
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
 * 5. Interacting with the cookie counter:
 *    - Use document.getElementsById to get the elements from the DOM
*/

import { createStore } from 'redux'
import cookiesReducer from './cookieReducer'

/**
 * Create a store:
*/
const store = createStore(cookiesReducer);

/**
 * Subscribe to the store:
*/
store.subscribe(() => console.log(store.getState()));

/**
 * Dispatching actions:
*/
// store.dispatch({ type: "ADD_COOKIE" });
// store.dispatch({ type: "ADD_COOKIE" });
// store.dispatch({ type: "REMOVE_COOKIE" });

/**
 * Interacting with the cookie counter:
*/
const addCookie = document.getElementById("add");
const removeCookie = document.getElementById("remove");
const cookieCount = document.getElementById("cookie-count");


export { store, addCookie, removeCookie, cookieCount };