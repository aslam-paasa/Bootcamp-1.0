/**
 * What is a Promise?
 * - A promise is an object representing the eventual completion (or failure)
 *   of an asynchronous operation.
 * - Think of it as a placeholder for a value that you're expecting from the
 *   future - a 'container for a future value'. 
 * - It helps us handle async tasks like API calls, file reads, and timers
 *   without losing control of our program flow.
*/



/**
 * Use Case: E-commerce Cart
 * Let's say we are building a shopping website like Amazon:
*/

const cart = ["shoes", "pants", "kurta"];

/**
 * We have two API-like functions:
 * 1. createOrder(cart) - creates an order and returns an orderId
 * 2. proceedToPayment(orderId) - takes us to the payment screen
*/


/**
 * The callback problem (Inversion of Control):
 * The old-school JavaScript, we'd pass one callback inside another:
*/

createOrder(cart, function (orderId) {
    proceedToPayment(orderId);
});


/**
 * Issues with Callbacks:
 * - We hand over control to another function.
 * - What if:
 *   a. The callback is never called?
 *   b. The callback is called twice?
 *   c. The fn is written by someone else or an intern?
 * - Our logic is now dependent on something we don't control.
 * - This is called Inversion of Control - and it's risky.
*/

/**
 * Solution: Promises
 * Instead of passing a callback, we let createOrder return a Promise:
*/

const promise = createOrder(cart);

/**
 * At the time of execution, this gives:
 * - A pending promise object: Promise { <pending> }
*/

/**
 * Internally, it's like:
 * - { data: undefined }    <=== at first
 * 
 *   Later...
 * 
 * - { data: orderDetails } <=== after order is created
*/

/**
 * We can now attach a callback fn using .then():
*/

promise.then(function (orderId) {
    proceedToPayment(orderId);
});


/**
 * Difference between callback and promise:
 * 
 * 1. Pass the callback to the API      1. Attach callback to the returned object
 * 2. Loss of Control (IOC)             2. Full Control - Promise guarantee single call
 * 3. Risk of Bugs, uncertainity        3. Safer, more predictable
*/



/**
 * Real Example: GitHub API Call using fetch()
*/

const GITHUB_API = "https://api.github.com/users/askhaymarch7";
const user = fetch(GITHUB_API);

/**
 * fetch returns a promise:
 * - Promise { <pending> }
 * 
 * The promise contains:
 * a. [[PromiseState]]: "pending"
 * b. [[PromiseResult]]: "undefined"
 * 
 * After some time:
 * a. 
 * - [[PromiseState]]: "fulfilled"
 * - [[PromiseResult]]: Response
 * 
 * JS logs it as pending, because JS doesn't wait for promises to resolve.
*/

/**
 * Attach a .then() to use the data:
*/

user.then(function (data) {
    console.log(data);  // Response object
});


/**
 * Promise Lifecycle:
 * A promise can have 3 states:
 * 1. Pending - still waiting
 * 2. Fulfilled - successfully got the data
 * 3. Rejected  - operation failed
 * 
 * An guess what? Once fulfilled or rejected, promises are immutable - their
 * result cannot be changed.
*/


/**
 * Callback Hell (Pyramid of Doom):
 * - Nested callbacks can get ugly & hard to read, debug, and maintain.
*/

createOrder(cart, function (orderId) {
    proceedToPayment(orderId, function (paymentInfo) {
        showOrderSummary(paymentInfo, function () {
            updateWalletBalance();
        })
    })
});


/**
 * Promise Chaining (Clean & Elegant):
 * - We can fix this using Promise Chaining:
*/

createOrder(cart)
    .then(function (orderId) {
        return proceedToPayment(orderId);
    })
    .then(function (paymentInfo) {
        return showOrderSummary(paymentInfo);
    })
    .then(function (paymentInfo) {
        return updateWalletBalance(paymentInfo);
    });

/**
 * Or Using Arrow Functions:
*/

createOrder(cart)
    .then(orderId => proceedToPayment(orderId))
    .then(paymentInfo => showOrderSummary(paymentInfo))
    .then(paymentInfo => updateWalletBalance(paymentInfo));

/**
 * Common Mistake in Chaining:
 * - Always return a promise inside each .then():
 *   .then(() => return somePromise)
 * 
 * - Otherwise, the next .then() won't receive the intended data and your
 *   chain will break.
*/
