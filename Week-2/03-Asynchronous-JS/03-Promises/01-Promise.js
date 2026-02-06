/**
 * Approach-1: Callback Hell (Worst Approach)
 * - Don't use setTimeout() + callback function together for async operations.
 * - It's a bad practice.
*/

function stepOne(callback) {
    setTimeout(() => {
        console.log("Step one done!");
        callback();
    }, 1000);
}

function stepTwo(callback) {
    setTimeout(() => {
        console.log("Step two done!");
        callback();
    }, 1000);
}

function stepThree(callback) {
    setTimeout(() => {
        console.log("Step three done!");
        callback();
    }, 1000);
}

/**
 * Callback Hell:
 */
stepOne(() => {
    stepTwo(() => {
        stepThree(() => {
            console.log("All steps completed!");
        });
    });
});


/**
 * Approach-2: Promises (Better Approach)
 * - A Promise is like a contract that says:
 * 
 *   a. Success case:
 *      - When the task completes successfully
 *      - We will return the result
 *   b. Error case:
 *      - If the task fails to complete
 *      - We will return an error message
 *   c. Waiting period:
 *      - Until we get the result/error
 *      - We will wait
 * 
 * - In simple words: 
 *   "I promise that I'll give you the result if task succeeds,
 *    an error if it fails, and until then please wait"
*/

/**
 * Benefits:
 * 1. Readability
 * 2. Error Handling
 * 3. Code Organization
 * 4. Method Chaining
*/


/**
 * Why we don't need to pass callback function as an argument in Promise?
 * 1. Callback approach:
 *    - We have to explicitly pass the callback function as an argument
 *    - Example: stepOne(callback)
 * 
 * 2. Promise approach:
 *    - Promise itself provides the .then() method
 *    - We can simply write: promiseOne().then(...)   [chaining]
 *    - Promise automatically handles when to execute the next step
 * 
 * In simple words: 
 * - Promise is a modern way to handle callbacks without manually passing them.
 * - Promise handles everything for us!
*/

function promiseOne() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step one done!");
            resolve();
        }, 1000);
    });
}

function promiseTwo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step two done!");
            resolve();
        }, 1000);
    });
}


function promiseThree() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step three done!");
            resolve();
        }, 1000);
    });
}

/**
 * Chaining Promises:
*/
promiseOne()
    .then(promiseTwo)
    .then(promiseThree)
    .then(() => {
        console.log("All steps completed!");
    });
