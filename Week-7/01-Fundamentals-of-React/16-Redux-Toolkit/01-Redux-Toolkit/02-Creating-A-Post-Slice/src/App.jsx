/**
 * Understanding:
 * The code sets up a storage area for your application's data using
 * Redux. It links this storage area to the postSlice reducer, so any
 * actions related to posts will be managed by this store. This store
 * is essential for keeping track of data that needs to be shared
 * across various parts of your application.
*/

/**
 * Creating a post slice:
 * 1. Create a file named postSlice.js. This file is where you define
 *    a "slice" of your Redux state, specifically for managing posts
 *    in your application.
 * 2. Inside postSlice.js, import createSlice from Redux Toolkit. This
 *    function helps you create a slice with an initial state and reducer
 *    actions.
 * 3. Use createSlice to define the postSlice. Give it a name ('posts')
 *    and provide an initial state, which contains an array of posts.
 * 4. Define additional actions (reducers) inside the reducers object,
 *    but in this solution, it's left empty. You can add actions here
 *    to modify the state as needed.
*/