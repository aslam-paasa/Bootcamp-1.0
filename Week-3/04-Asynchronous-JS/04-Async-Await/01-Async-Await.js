/**
 * Async-Await: 
 * - Async-Await is just a simplified way of working with promises.
 * - Instead of chaining .then() and .catch() like in traditional
 *   promise handling, async and await make the code look cleaner and
 *   easier to read.
 * - It's important to handle errors properly with 'try-catch'.
 *   a. async marks a function that works with promises.
 *   b. await pauses the fn until the promise is resolved, making the
 *      code look more readable.
 * 
 * Best Practices:
 * - Nothing but promises which looks better.
 * - Two best practices to keep in mind:
 *   1. Use async-await as much as possible.
 *   2. Always take care of the error handling as well.
*/

/**
 * What does each part do?
 * 1. Async Function:
 *    A function marked as async automatically returns a promise and
 *    allows the use of await inside it.
 *  
 *    async: Makes a function return a promise.
 * 
 * 2. await:
 *    await pauses the execution of the async fn until the promise
 *    resolves or rejects. It makes the code look synchronous while 
 *    it's still asynchronous.
 * 
 *    await: Waits for the Promise to resolve or reject.
*/

// Way-1: Normal Function
// async function printDataFromServer() {
//     const serverData = await anyPromiseWhichWillReturnData();
//     console.log(serverData);
// }

// Way-2: ES6+ Arrow Function
// const printDataFromServer = async () => {
//     try {
//         const serverData = await anyPromiseWhichWillReturnData();
//         console.log(serverData);
//     } catch (err) {
//         console.error(err);
//     } 
// }


/**
 * Ex: Async-Await Chaining
*/

function asyncAwaitOne() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step one done!");
            resolve();
        }, 1000);
    });
}

function asyncAwaitTwo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step two done!");
            resolve();
        }, 1000);
    });
}


function asyncAwaitThree() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step three done!");
            resolve();
        }, 1000);
    });
}


/**
 * Understanding Async-Await and Return Values:
 * - Each async function (asyncAwaitOne, asyncAwaitTwo, asyncAwaitThree) only
 *   logs a message and doesn't return any value.
 * - Since they don't return any value, the results will be undefined
 * - The functions will still execute and show the console.log messages:
 *   "Step one done!", "Step two done!", "Step three done!"
 * - But result1, result2, result3 will be undefined when logged
*/

async function runAsyncAwait() {
    try {
        const result1 = await asyncAwaitOne();
        const result2 = await asyncAwaitTwo(); 
        const result3 = await asyncAwaitThree();
        console.log(result1, result2, result3); // Will show: undefined undefined undefined
    } catch (err) {
        console.error(err);
    }
}

runAsyncAwait();



/**
 * Ex: Async-Await with fetch data (JSON Placeholder)
 * => Here we see the actual data (not undefined) because:
 *    a. fetch() returns a Promise with response object
 *    b. response.json() returns a Promise with the actual data
 *    c. We are displaying the data directly with console.log
 *    d. If we returned the data instead, it would be wrapped in a Promise
 */

const fetchData = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        console.log(data); // Displays data directly
        // return data; // This would return Promise<data>
    } catch (err) {
        console.error(err);
    }
}

fetchData();