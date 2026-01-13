/**
 * Q. Call fakeFetch(msg, true) to get reject the promise. Handle the 
 *    error with the error handler. Show a message using console.error
 *    for errors.
*/

/**
 * .catch() and Error Handling:
 * - When you make a request(like calling fakeFetch()), sometimes it can
 *   fail. If the promise gets rejected(like an error happens), you need
 *   to handle the error properly.
 * - If the promise is rejected(like the server returns an error), .catch()
 *   will be triggered.
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
 * Print data on success, print error on failure:
*/
fakeFetch("Yuhu", true) // true: should reject
.then(data => console.log(data))
.catch(err => console.log(err))