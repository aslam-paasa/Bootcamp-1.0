/**
 * Q. Challenge: Create a Reducer
 * Create a cookies reducer, to add & remove a cookie in cookiesReducer.js
*/

/**
 * Understanding the Reducer:
 * - Imagine you have a magic box that holds the number of cookies you have.
 *   This magic box is the state of your cookie count.
 * - Now, we need a plan for what happens when you get more cookies or give
 *   away some. The reducer is the plan! We write a function that takes the
 *   current number of cookies and the action, and it gives us a new number
 *   of cookies.
 * - That's how we change our state in a predictable way.
*/

/**
 * Reducer:
 * a. Pure Function
 * b. Given a state, an action will give you a new state
 *    { currentCount: 1}, { type: 'increment' } => { currentCount: 2 }
 *    { currentCount: 1}, { type: 'decrement' } => { currentCount: 0 }
 *    { currentCount: 1}, { type: 'reset' } => { currentCount: 0 }
 * c. Store: It says, whatever is the new state, I am going to have that
 *    until a new action comes, and it has some methods:
 * 
 *    - UI dispatches action (event)  - New action by user
 *    - Action goes to reducer        - State updated
 *    - Reducer goes to store         - Store updates the state
 *    - Store is subscribed by the UI - Updates the UI
 * 
 *    
 *                                        +--------+
 *      +-------------------------------->| Action |
 *      |          dispatch               +--------+
 *      |                                     |
 *    +----+                                  V
 *    | UI |                              +--------+
 *    +----+                              | Reducer|
 *      |                                 +--------+
 *      |                                     |
 *      |                                     V
 *      |           subscribe             +--------+
 *      + <-------------------------------| Store  |
 *                                        +--------+
*/

/**
 * Step-1: Creating a Reducer
 * It will take two arguments:
 * 1. The current state
 * 2. The action
 * 
 * It will return a new state based on the action.
*/

const initialState = {
    cookies: 0,
}

const cookiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COOKIE':
            return { cookies: state.cookies + 1 };
        case 'REMOVE_COOKIE':
            return { cookies: state.cookies - 1 };
        default:
            return state;
    }
}

export default cookiesReducer;