/**
 * Challenge: Updating the cookie count
 * Implement event handlers that will dispatch these actions when interacting
 * with the "get a cookie" and "give away a cookie" buttons. Make sure you
 * comment the dispatch actions.
 * 1. Create two functions named 'addCookieHandler' and 'removeCookieHandler'.
 *    Inside these functions, dispatch the respective actions (cookies/added
 *    and cookies/removed) to the Redux store.
 * 2. Attach event listeners to the "get a cookie" and "give away a cookie"
 *    buttons (addCookie and removeCookie) using the addEventListener method.
 *    These event handlers should call the addCookieHandler and removeCookieHandler
 *    functions when the buttons are clicked.
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
 * 6. Adding event listeners to the buttons to dispatch actions:
 *    - Use addEventListener to add event listeners to the buttons
 *    - These event handlers should call the addCookieHandler and removeCookieHandler
 *      functions when the buttons are clicked.
 * 7. Update the Cookie Count:
 *    - Use store.getState() to get the current state of the store
 *    - Update the cookie count in the UI using the cookieCount element
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
const callMeWhenStateUpdates = () => {
    console.log(store.getState());
    updateCookieCount();
};
store.subscribe(callMeWhenStateUpdates);

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


/**
 * Adding event listeners to the buttons:
*/
const addCookieHandler = () => {
    store.dispatch({ type: "ADD_COOKIE" });
}

const removeCookieHandler = () => {
    store.dispatch({ type: "REMOVE_COOKIE" });
}

addCookie.addEventListener("click", addCookieHandler);
removeCookie.addEventListener("click", removeCookieHandler);


/**
 * Update the Cookie Count:
*/
const updateCookieCount = () => {
    const state = store.getState();
    cookieCount.textContent = state.cookies;
};

updateCookieCount();
