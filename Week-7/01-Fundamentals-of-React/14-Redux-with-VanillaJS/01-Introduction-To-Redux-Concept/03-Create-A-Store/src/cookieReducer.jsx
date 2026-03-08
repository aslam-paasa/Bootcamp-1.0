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
 *    - Action goes to reducer        - State updated
 *    - Reducer goes to store         - Store updates the state
 *    - Store is subscribed by the UI - Updates the UI
 *    - UI dispatches action (event)  - New action by user
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
 * Step-1: Creating a Reducer (Action)
 * It will take two arguments:
 * 1. The current state
 * 2. The action
 * 
 * Note:It will return a new state based on the action. 
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