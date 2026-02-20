/**
 * What is Callback Function in JavaScript?
 * - Functions are first class citizens in JS:
 *   a. Store a fn in a variable
 *   b. Pass a fn as an argument to another fn (callback)
 *   c. Return a fn from another fn
 * 
 * - The fn that is passed as an argument to another fn is called callback fn.
*/

// function x(y) {
//     y();
// }

// Passing y() as an argument to x()
// x(function y() {
//     console.log("y");
// });

/**
 * Why it is called callback fn?
 * - A callback function gets its name because we hand over "control" of one
 *   function to another function.
 * 
 * - Like in the example above:
 *   1. We gave the y() function to x() function
 *   2. Now x() function decides when to "call back" y()
 *   3. The control of y() function is now with x()
 * 
 * - Real life example:
 *   Like when you order at a restaurant, and the waiter says:
 *   "I'll call you back when your food is ready"
 * 
 * - That's why it's called a callback function - because this function is
 *   "called back" later in the code execution
*/


/**
 * JavaScript is a synchronous and single-threaded language:
 * - It can only do one thing at a time and in a specific order, but due
 *   to callbacks, we can do multiple things at once.
*/

/**
 * How callback is used in asynchronous tasks?
 * - The function that is passed as an argument to setTimeout() fn is 
 *   called callback fn, and it is called after 5 seconds.
 * 
 * - Output:
 *   x 
 *   y 
 *   Timer (after 5 seconds)
*/

setTimeout(function() { 
    console.log("Timer");
}, 5000);

function x(y) {
    console.log("x");
    y();
}

x(function y() {
    console.log("y");
});


/**
 * Deep about Event Listeners:
 * - When JS will execute the code, it will pickup 'clickMe' button and add
 *   a 'click' event listener to it.
 * - If the user clicks on the button, the 'click' event listener will be
 *   triggered and the callback function will be called.
 * - So, this is a callback fn which is stored somewhere and that is called
 *   when the event is triggered.
*/

// document.getElementById("clickMe")
// .addEventListener("click", function() {
//     console.log("Button Clicked");
// });

/**
 * Closures Demo with Event Listeners:
 * - Suppose if we have to count how many times the button is clicked, how
 *   can we do that?
*/

/**
 * Approach-1: Use Global Variable Count
 * - But this is not a good approach because if we have multiple buttons,
 *   then we will have to use multiple global variables.
 * - So, this is not a good approach.
*/

// let count = 0;
// document.getElementById("clickMe")
// .addEventListener("click", function() {
//     console.log("Button Clicked", ++count);
// });

/**
 * Approach-2: Use Closure
 * - We can use a closure to store the count variable.
 * - A closure is a function that has access to the parent scope even after
 *   the parent function has closed.
 * - So, we can use a closure to store the count variable.
 * - This is a good approach because we can use the same count variable for
 *   multiple buttons.
*/

function attachEventListeners() {
   let count = 0;
   document.getElementById("clickMe")
   .addEventListener("click", function() {
       console.log("Button Clicked", ++count);
   });
}

attachEventListeners();

/**
 * Scope Demo with Event Listeners:
 * - The function inside event listener is a closure
 * - This closure can access count variable from outer scope (attachEventListeners)
 * - Count increments on each button click
 * - Count variable is scoped only to attachEventListeners function
 * - No global variable pollution as count is not in global scope
 * - Prevents memory leaks since count is only accessed through closure
 * - Can create separate count variables for multiple buttons
*/

/**
 * Garbage Collection & removeEventListener:
 * - In large codebase, a lot of developer remove event listeners on certain
 *   events because event listeners are heavy, means it takes memory. So,
 *   whenever we attach any event listener, it forms a closure with the
 *   count and even when the callstack is empty, but still this program is
 *   not freeing up this memory, because we never know when somebody from
 *   this page will click on the button, and we need this closure to be there.
 * - So, to free up this memory, we need use removeEventListener. After
 *   every buton click, removeEventListener is called and it frees up the
 *   memory.
*/