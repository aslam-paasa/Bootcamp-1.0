/**
 * Understanding:
 * In a typical Redux application, actions are synchronous, meaning
 * they happen immediately when you dispatch them. For instance, 
 * increasing a counter value happens right away.
 * 
 * However, many real-world tasks take time, like fetching data from
 * a server or saving data to a database. You can't do these tasks
 * synchronously because they may take a while.
 * 
 * Redux Thunk is like a helper that extends Redux's abilities. It lets
 * you dispatch actions that are functions instead of plain objects.
 * 
 * Challenge-1: Set up Redux Store
 * 1. Create a file named store.js
 * 2. Import necessary dependencies: applyMiddleware, createStore,
 *    redux-thunk, and your financeReducer
 * 3. Create the Redux store using createStore and apply redux-thunk
 *    middleware.
 * 4. Export the configured store.
*/

