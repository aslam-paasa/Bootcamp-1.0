/**
 * What is a Memory Leak?
 * - A memory leak occurs when your program 'uses memory' but 'fails to
 *   release' it when its' no longer needed. Over time, memory leak can
 *   cause your application to consume more and more memory, leading to
 *   performance issues like slowdowns or crashes.
 * - In other words:
 *   a. You allocate memory for something(like creating an object or
 *      storing data).
 *   b. You stop using it, but you don't properly remove it from memory.
 *   c. This unused memory staus allocated, but your program can't use
 *      it anymore.
 * - Eventually, this unused memory starts building up, leading to a
 *   memory leak.
*/

/**
 * Memory Leak Example:
*/
let array = [];
for (let i = 5; i > 1; i++) {
    array.push(i - 1);
}

/**
 * i. In this case, an array is created, and a loop adds numbers to it.
 * ii. The array will continue to grow as long as the loop runs.
 * iii. If there is a 'bug' or issue in the code where the array is not
 *      properly cleaned up or removed(i.e., the memory is not freed
 *      when no longer needed), this can cause a memory leak.
*/

/**
 * Why does this happen?
 * - The array is holding onto memory, even if it's no longer useful
 *   or referenced.
 * - If nothing clears it up when it's not needed anymore, the memory
 *   used by this array can't be reused, leading to a leak.
*/

/**
 * Common Causes of Memory Leaks in JS:
*/ 

/** 
 * 1. Global Variables:
 *    - When you declare a global variable, it stays in memory for the
 *      entire lifetime of the application, even if it is no longer
 *      needed.
 *    - If you accidentally create global variables, especially large
 *      or nested objects, they can keep using up memory.
 *    - Example:
*/

function example() {
    myGlobalVariable = "I'm global!";  // No "let", "var", or "const" keyword
}

example();


/**
 * Why is this a memory leak?
 * - myGlobalVariable is not scoped to the function and becomes a
 *   global variable.
 * - This variable will remain in memory until the program ends, even
 *   though it might no longer be necessary.
 * - Nested or complex objects attached to global variables can take up
 *   significant memory, especially if they hold large data structures.
 * 
 * How to avoid it?
 * - Always use 'let', 'const' or 'var' to define variables within a
 *   specific scope.
 * - Avoid polluting the global namespace with unnecessary variables.
*/


/**
 * 2. Event Listeners:
 *    - When you add event listeners(e.g., click, mousemove, etc.) they
 *      listen for specific events and trigger actions. However, if you
 *      'forget to remove' event listeners when they are no longer needed,
 *      they 'hold onto references' to elements or objects.
 *    - These event listeners can keep objects in memory, causing a
 *      memory leak because the references are still there.
*/

function addClickListener() {
    document.getElementById("myButton").addEventListener("click", function() {
        alert("Button clicked!");
    });
}

// Forgetting to remove the event listener when not needed


/**
 * Why is there a memory leak?
 * - The event listener is attached to the myButton element. Even if the
 *   button is removed from the DOM, the event listener keeps a reference
 *   to it, preventing garbage collection from freeing the memory used
 *   by the button. 
 * 
 * How to avoid it?
 * - Always remove event listeners when they are no longer needed, especially
 *   when dynamically adding and removing elements.
 * - Use 'removeEventListener()' to detach the listener once it's no
 *   longer needed.
*/

function removeClickListener() {
    document.getElementById("myButton").removeEventListener("click", myFunction);
}


/**
 * 3. Timers(setTimeout/SetInterval):
 *    - Timers like setTimeout and setInterval run in the background,
 *      even if the event or function they're attached to is no longer
 *      needed.
 *    - If you don't properly 'clear the timer', it may keep running,
 *      using up resources and memory.
*/

function startTimer() {
    let timerId = setInterval(function() {
        console.log("Timer running");
    }, 1000);
}

// Forgetting to clear the timer when done

/**
 * Why is this a memory leak?
 * - The setInterval timer keeps running in the background, even if the
 *   code doesn't need it anymore.
 * - This can cause 'unnecessary memory consumption' since the timer
 *   object is not cleaned up.
 * 
 * How to avoid it?
 * - Use clearTimeout() or clearInterval() to stop timers when they are
 *   no longer needed.
*/

let timerId = setInterval(function() {
    console.log("Timer running");
}, 1000);

// Clear the timer when done
clearInterval(timerId);


/**
 * Why Memory Leaks are dangerous?
 * 1. Performance Degradation: As more and more memory is leaked, the
 *    system starts running out of memory. This leads to 'slower
 *    performance', crashed, or freezes.
 * 2. Unresponsive Applications: If memory keeps building up without
 *    being freed, your application may become 'unresponsive' and users
 *    may experience lag or crashes.
 * 3. Increased Resource Consumption: Memory leaks cause programs to
 *    use unnecessary resources, increasing the load on the system.
*/

/**
 * How to detect and prevent Memory Leaks?
 * 1. Use Developer Tools: Modern browsers(like Chrome and Firefox) have
 *    built-in developer tools that can help detect memory leaks. For
 *    example, in Chrome, you can use the Memory Panel to see memory
 *    usage and track any leaked objects.
 * 2. Profile and Monitor: Keep an eye on how your app uses memory over
 *    time. If the memory usage keeps growing without being freed, that's
 *    a sign of a leak.
 * 3. Test and Profile Performance: Always test your application's
 *    performance under different scenarios to ensure memory is being
 *    managed correctly.
*/