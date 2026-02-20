/**
 * Challenge-1: Create Redux Store
 * Create a file named counterReducer.js. In this file, define a reducer
 * function called counterReducer that handles the state for a counter.
 * The initial state and action types are provided. Make sure to import the
 * necessary functions from Redux.
 * 
 * Action Types:
 * a. add  : Increment the counter by 1
 * b. minus: Decrement the counter by 1
*/

const defaultState = {
    counter: 0
};

const counterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "add":
            return {
                ...state,
                counter: state.counter + 1
            };

        case "minus":
            return {
                ...state,
                counter: state.counter - 1
            };

        default:
            return state;
    }
};

export default counterReducer;