/**
 * Challenge: Displaying the cookie count
 * Your task is to write JavaScript Code that will display the cookie count
 * and update it whenever the state changes:
 * 1. Create a function updateCookieCount that will be responsible for
 *    updating the displayed cookie count on the webpage. Inside this function,
 *    get the current state from the Redux store using 'store.getState()',
 *    and update the content of the 'cookieCount' element with the cookie
 *    count value from the state.
 * 2. Inside the 'store.subscribe' method, after the log, call the function
 *    'updateCookieCount'
 * 3. Call the 'updateCookieCount' function after defining it to ensure that
 *    the initial count is displayed correctly on page load.
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
 * Create a store (Create state in the store)
*/
const store = createStore(cookiesReducer);

/**
 * Subscribe to the store (Read the state from the store):
*/
const callMeWhenStateUpdates = () => {
    console.log(store.getState());
    updateCookieCount();
};
store.subscribe(callMeWhenStateUpdates);

/**
 * Dispatching actions (Listen to UI events):
*/
// store.dispatch({ type: "ADD_COOKIE" });
// store.dispatch({ type: "ADD_COOKIE" });
// store.dispatch({ type: "REMOVE_COOKIE" });

/**
 * Interacting with the cookie counter (Get the elements from the DOM):
*/
const addCookie = document.getElementById("add");
const removeCookie = document.getElementById("remove");
const cookieCount = document.getElementById("cookie-count");


/**
 * Adding event listeners to the buttons (Listen to UI events):
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
 * Update the Cookie Count (Update the UI):
*/
const updateCookieCount = () => {
    const state = store.getState();
    cookieCount.textContent = state.cookies;
};

updateCookieCount();
