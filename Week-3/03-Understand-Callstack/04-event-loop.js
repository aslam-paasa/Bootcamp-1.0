/**
 * Event Loop (Heart of Asynchronous JS):
*/

/**
 * What is Event Loop?
 * The Event Loop is responsible for:
 * a. Continuously monitoring the Call Stack and Callback Queue.
 * b. If the Call Stack is empty, it moves the first task from the Callback
 *    Queue to the Call Stack.
 * c. It keeps the JavaScript runtime non-blocking. 
*/

/**
 * How Event Loop Works:
 * 
 *    +------------+
 *    | Call Stack |
 *    +-----^------+
 *          |
 *  +----------------+
 *  | Callback Queue |
 *  +-------^--------+
 *          |
 *    +------------+
 *    | Event Loop |
 *    +------------+
*/


/**
 * Example of Event Loop:
*/
console.log("Start");

setTimeout(() => {
    console.log("After 2 seconds");
}, 2000);

console.log("End");


/**
 * Ex: Nested Callbacks
 * The event loop ensures tasks are executed in the correct order.
*/

console.log("Start");

setTimeout(() => {
    console.log("After 2 seconds");
    setTimeout(() => {
        console.log("After 3 seconds");
    }, 1000);
}, 2000);

console.log("End");