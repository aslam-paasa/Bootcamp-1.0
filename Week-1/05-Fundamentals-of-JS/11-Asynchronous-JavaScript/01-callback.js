/**
 * 1. Callback is a function passed as an argument to another function.
 * 2. Callback functions are used when there is an asynchronous process.
 * 
 * => Js is synchronous single-threaded languages and it can do just one 
 *    thing at a time.
 * => It has one callstack and it can execute just thing at a time.
 * => Whatever code we give to javascript will be quickly executed by JS Engine.
*/

console.log("Namaste");

/**
 * => If we want to execute this code after 5 seconds.
 * => We can wrap it inside a callback function and pass it to setTimeout.
 * => Now it is the job of the setTimeout to set this callback function after 
 *    5 seconds.
 * => And this is how callback plays an important role in writing asynchronous
 *    code in JS.
*/
setTimeout(function () {
    console.log("javaScript");
}, 5000); 

console.log("Season 2");