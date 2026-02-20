/**
 * Challenge-3: Integrate Middleware Into Redux Store
 * In your Redux store setup file (e.g., store.js), import the applyMiddleware
 * function from Redux and the loggerMiddleware you created.
*/

import { applyMiddleware, createStore } from "redux";
import loggerMiddleware from "./loggerMiddleware";

let defaultState = {
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

const store = createStore(counterReducer, applyMiddleware(loggerMiddleware));

export default store;
