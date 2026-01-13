/**
 * What is Asynchronous JS?
 * JavaScript is a single-threaded programming language, meaning it can
 * execute one task at a time in a single call stack.
 * 
 * However, JavaScript can perform asynchronous operations (such as API calls,
 * setTimeout, event listeners, etc.) without blocking the main thread. This
 * is achieved using:
 * 
 * a. Event Loop
 * b. Web APIs
 * c. Callback Queue
 * d. Microtask Queue
 * e. Call Stack
 * 
 * All of these work together to ensure smooth and non-blocking operations
 * in JavaScript.
*/


/**
 * Call Stack (The Core of JavaScript Execution):
 * The Call Stack is a data structure in JavaScript that records the function
 * execution in order.
 * a. Whenever you call a function, it is pushed onto the call stack.
 * b. Whenever the function returns a value, it is popped off the stack.
*/

/**
 * How Call Stack Works:
*/
function first() {
    console.log("First Function");
}

function second() {
    first();
    console.log("Second Function");
}

/**
 * Call Stack Process:
 * a. Call Stack is synchronous, meaning it can only process one function 
 *    at a time.
 * b. Any long-running task will block the entire application.
 * 
 * +----------------------------------------+-------------------------+
 * |    Action                              |  Call Stack             |
 * +----------------------------------------+-------------------------+
 * | a. second() is called                  |   second()              |
 * | b. Inside second(), first() is called  |   first()  ->  second() |
 * | c. console.log() executes in first()   |   first()  ->  second() |
 * | d. first() completes                   |   second()              |
 * | e. console.log() executes in second()  |   second()              |
 * | f. second() completes                  |   (empty)               |
 * +----------------------------------------+-------------------------+
*/


/**
 * Example of Blocking Call Stack:
 * a. Callstack is blocked until the long task is completed.
*/
function longTask() {
    // Heavy computation task
    for(let i = 0; i < 1000000000; i++) {
        console.log("Long Task Completed");
    }
}

console.log("Start");
longTask();
console.log("End");