/**
 * Q. Use the fakeFetch() to get data and show on success.
 * */ 

/**
 * Printing data on success:
 * - Promise is used to handle asynchronous tasks.
 * - 3 states of promises:
 *   a. Pending
 *   b. Resolve/fulfilled
 *   c. Reject
 * - When the promise began, it is in the state of pending, but when the
 *   server says here is the data, then promise is resolved. But when
 *   the server says I didn't get the data, then promise is rejected.
 * - Callback fn: 
 *   a. Passing fn inside then() fn
 *   b. Passing Promise() inside fakeFetch() fn
 *   c. Inside Promise() fn, again we are passing two callback fn:
 *      - resolve
 *      - reject
 * - This is why we are learning callback fn.
*/
function fakeFetch(msg, shouldReject) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(shouldReject) {
                reject(`error from server: ${msg}`);
            }
            resolve(`from server: ${msg}`);
        }, 3000);
    });
}

/**
 * Handling data on success:
*/
fakeFetch("I am awesome")// promise { <pending> }
.then(data => console.log(`The data came from server is ${data.length}`))


/**
 * Internal inside of Promise:
 * function Promise(cb) {
 *    state = "pending";  // Initial state
 * 
 *    function resolve(msg) {
 *       state = "fulfilled";
 *    }
 * 
 *    function reject(msg) {
 *       state = "reject";
 *    }
 * 
 *    cb(resolve, reject)
 * }
*/