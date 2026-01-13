/**
 * Chaining (Handling multiple promises):
 * Chaining is when you chain '.then()' methods together to handle
 * promises one after another. This is helpful when you want to wait
 * for an operation(like fetching data from a server) to complete,
 * and use the result in another operation.
*/ 

/**
 * Without Promise Chaining (Nested Callbacks):
*/
getUser((user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            console.log(details);
        })
    });
});


/**
 * With Promise Chaining (Clean Code):
*/
getUser()
    .then((user) => getOrders(user.id))
    .then((orders) => getOrderDetails(orders[0].id))
    .then((details) => console.log(details))
    .catch((error) => console.log(error));

/**
 * Benefits of Promise Chaining:
 * a. No Callback Hell
 * b. Cleaner and readable code
 * c. Easy to handle errors
*/


/**
 * Create a function getServerResponseLength(msg). This function will
 * use fakeFetch() internally with the message and return the response
 * received by the server.
 * - We have a fn called getServerResponseLength(msg) that will:
 *   a. Call fakeFetch() with a message(msg).
 *   b. Wait for the server's response.
 *   c. Return the length of the response.
 * 
 * Hint about chaining:
 * If you return a value from '.then()' (like the response length), it
 * will still be inside a promise. So, you can chain more '.then()'
 * methods if you want to handle the value later.
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

// 2. Function that gets the server response and returns its length
const getServerResponseLength = (msg) => {
    fakeFetch(msg)  // 3. Call fakeFetch to get a response
    .then(response => response.length)
}

// 1. Call getServerResponseLength and log the length of the server's response
getServerResponseLength("Yuhu")
.then(data => console.log(data)) // 4. print the length of the response