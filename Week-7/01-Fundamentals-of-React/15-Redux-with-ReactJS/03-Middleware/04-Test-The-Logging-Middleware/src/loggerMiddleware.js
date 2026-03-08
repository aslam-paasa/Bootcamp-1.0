/**
 * Create the logging middleware
 * 1. Create a new file called loggingMiddleware.js in your source directory.
 * 2. In loggerMiddleware.js, define the logging middleware following the
 *    structure provided in the exercise description.
*/

/**
 * Understanding Middleware:
 * loggerMiddlware is a Redux middleware that logs the current state,
 * dispatched actions, and the new state after an action is processed.
 * 
 * const loggerMiddlware = (store) => (next) => (action) => {
 *    // Middleware logic
 * }  
 * 
 * a. The loggerMiddleware is a fn that takes a store as its argument
 * b. Inside the fn, there is another fn that takes next as an argument
 * c. Inside the second fn, there is yet another fn that takes action as
 *    its argument.
*/


const loggerMiddlware = (store) => (next) => (action) => {
    console.log('Current State:', store.getState());
    console.log('Dispatched Action:', action);
    next(action);
    console.log('New State:', store.getState());
}

export default loggerMiddlware;