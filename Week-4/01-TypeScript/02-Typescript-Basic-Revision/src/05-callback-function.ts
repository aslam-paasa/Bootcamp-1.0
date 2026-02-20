/**
 * Q. Write a function that takes another function as input (callback function)
 *    and calls it after a delay of 1000ms (1 second). 
 *    a. Arguments - fn
 *    b. Returns  - void
 *    c. Logs     - "hi there" after 1 second
 * 
 * 1. Declare the function
 * 2. Invoke the function with a callback function
*/
function delayedCall(fn: () => void) {
    setTimeout(fn, 1000);
}

delayedCall(function() {
    console.log("hi there");
})
