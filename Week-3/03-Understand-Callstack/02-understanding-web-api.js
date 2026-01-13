/**
 * Web APIs (Async Task Handler):
*/

/**
 * What is Web API in JS?
 * The Web API (Web Application Programming Interface) is a browser feature
 * provided to JavaScript for performing asynchronous tasks like:
 * 
 *      Web API         Purpose
 *   a. setTimeout   :  Executes a function after a specified delay.
 *   b. fetch        :  Fetches data from a server asynchronously.
 *   c. DOM Events   :  Handles user interactions asynchronously.
 *   d. setInterval  :  Repeatedly runs a function at specified intervals.
*/


/**
 * How Web API Works:
*/

console.log("Start");

setTimeout(() => {
    console.log("After 2 seconds");
}, 2000);

console.log("End");

/**
 * Why did the setTimeout execute later?
 * a. The setTimeout is handled by the Web API, not the Call Stack.
 * b. After 2 seconds, the Web API sends the callback to the Callback Queue.
*/


/**
 * Example of Fetch API:
 * The fetch API is handled by the Web API, and its callback is executed
 * asynchronously.
 * 
 * Output:
 * - Start
 * - End
 * - Data: { ... }
*/

console.log("Start");

fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => console.log(`Data: ${data}`));

console.log("End");