/**
 * What is Callback Queue/Task Queue?
 * The Callback Queue is a waiting area where asynchronous callbacks (like
 * setTimeout, click events, setIntervals, etc) are placed after the Web API
 * completes the task.
 * 
 * The Callback Queue waits for the Call Stack to be empty before executing
 * any callback.
*/

/**
 * Example of Callback Queue:
*/

console.log("Start");

setTimeout(() => {
    console.log("Callback Executed");
}, 2000);

console.log("End");

/**
 * How it works?
 * 
 * Time       Call Stack             Web API                 Callback Queue
 *  0ms       console.log("Start");  
 *  1ms       setTimeout()           Time Started (3000ms)
 *  2ms       console.log("End");
 *  0-3000ms  (Idle)                 Timer Running
 *  3000ms    (Empty)                Moves callback to queue  () => console.log("Timeout Callback")
 *  3001ms    Executes Callback
 * 
 * Note: The callback will only execute when the Call Stack is empty.
*/


/**
 * Ex: DOM Event
 * The callback queue handles DOM events asynchronously.
*/
document.getElementById("btn").addEventListener("click", () => {
    console.log("Button Clicked");
});