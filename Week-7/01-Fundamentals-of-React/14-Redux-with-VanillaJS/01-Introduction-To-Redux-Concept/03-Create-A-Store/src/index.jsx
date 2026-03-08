/**
 * Understanding the Store:
 * The store is like a manager that keeps track of our app's state changes.
 * It's responsible for making sure everything happens in the right order.
 * 
 * In our case, the store keeps track of our state, which is the number of
 * cookies. We will tell the store how our state should change using the
 * reducer we made earlier.
*/

/**
 * Challenge: 
 * Inside index.js, import the required createStore function from redux and
 * cookiesReducer. Create a Redux store by passing your cookiesReducer to
 * the createStore function.
*/


/**
 * Step-2: Creating a Store using Redux (Adding redux dependency)
 * 1. Import the createStore function from redux
 * 2. Create a store by passing your reducer to the createStore function
 *    (Storing a copy of the state in the store)
 * 3. Export the store
*/

import { createStore } from 'redux'
import cookiesReducer from './cookieReducer'

const store = createStore(cookiesReducer);
