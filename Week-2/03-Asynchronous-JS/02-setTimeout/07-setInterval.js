/**
 * setInterval():
 * - setInterval() is a built-in function in JS which is used to execute a
 *   function repeatedly after a specified interval of time.
 * 
 * Syntax:
 * - setInterval(callback, delay, param1, param2, ...);
 *   a. callback: The function to be executed repeatedly.
 *   b. delay   : The time to wait in milliseconds before executing the
 *                callback.
 *   c. param1, param2, ...: Optional parameters to be passed to the callback
 *                            function.
 * 
 * - clearInterval() is used to clear the interval.
*/

/**
 * Ex: setInterval() with setTimeout() + clearInterval()
 * - Print "Requesting data..." every 1 second.
 * - After 5 seconds, clear the interval and print "Data fetched!".
*/

const intervalId = setInterval(() => {
    console.log("Requesting data...");
}, 1000);
        
setTimeout(() => {
    clearInterval(intervalId);
    console.log("Data fetched!");
}, 5000);
    