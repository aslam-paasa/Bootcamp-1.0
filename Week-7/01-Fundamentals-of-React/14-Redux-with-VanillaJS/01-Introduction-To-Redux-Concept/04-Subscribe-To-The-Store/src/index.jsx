/**
 * Understanding Subscribe to the store:
 * - Subscribing lets us know whenever something changes in our app's state.
 *   It's like getting a message whenever someone takes or adds a cookie to
 *   our cookie jar.
*/

/**
 * Q. Challenge: 
 *    Use the subscribe method of the Redux store to listen for state changes
 *    and log the state.
*/

/**
 * Steps to follow:
 * 1. Importing the createStore function from redux and cookiesReducer
 * 2. Creating a store: (Adding redux dependency)
 *    - Keep the copy of the state in the store
 * 3. Subscribing/Listening to the store
 *    - subscribe() is used to listen for state changes
 *    - get the current state of the store using store.getState()
*/


import { createStore } from 'redux'
import cookiesReducer from './cookieReducer'


const store = createStore(cookiesReducer);
store.subscribe(() => console.log(store.getState()));


export default store;