/**
 * What is Garbage Collection in JS?
 * - In programming, garbage collection is a process by which a 
 *   programming language automatically manages memory. Specifically,
 *   it involves automatically reclaiming memory that is no longer being
 *   used by your program, so that it can be used for other purposes.
 * 
 * - JS is automatically garbage collected, which means it does this
 *   process behind the scenes without you needing to manually free
 *   memory. This is a big advantage because it reduces the risk of
 *   errors that could happen if developers forget to clean up memory
 *   themselves.
 * 
 * - When your program is running, JS creates objects, arrays, functions,
 *   and other data structures in memory. When these are no longer
 *   needed, the garbage collector automatically removes them.
*/

/**
 * How does Garbage Collection work in JS?
 * - Garbage Collection in JS is based on a process known as 'automatic
 *   memory management', and it's typically implemented using an
 *   algorithm called 'Mark-and-Sweep'. But before getting into the
 *   algorithm, let's first understand the 'concept of reachability'
 *   and how the system determines which objects can be safely deleted.
*/

/**
 * Understand Reachability:
 * - In order for an object to be garbage collected, it needs to be
 *   unreachable. An object is considered unreachable when no part of
 *   the program can access it anymore.
 * - Reachable objects are those that can still be accessed or referenced
 *   by some part of the program, and therefore, they must not be
 *   deleted.
 * - Unreachable objects are those that are no longer referenced, meaning
 *   no variables, properties, or other objects can point to them. These
 *   are the candidates for garbage collection.
 * 
 * Here are some examples of reachability:
 * 1. Global Variables(like window in the browser or global in Node.js)
 *    are always reachable.
 * 2. Function parameters and local variables inside a function are
 *    reachable as long as the function is running and hasn't finished
 *    executing.
 * 3. Objects referenced by other are reachable. If A points to B, then
 *    both A and B are reachable.
 * 
 * If there's no path to reach an object from any of these references,
 * it is unreachable, and the garbage collector can safely delete it.
*/

/**
 * The Mark-and-Sweep Algorithm:
 * - The Mark-and-Sweep Algorithm is the most common way garbage 
 *   collection works in JavaScript.
 *
 * Let's breal it down step-by-step:
 * 1. Marking
 * => Marking is the first phase of garbage collection. JavaScript starts
 *    from the "roots" of our program. These roots could be things like:
 *    a. Global variables(like those at the level of our program)
 *    b. Function Parameters (the inputs to a function)
 *    c. Local variables in the current execution context(like variables
 *       inside a function that is running)
 *    d. Closures(functions that still "remember" the variables from
 *       their containing function, even after that function has finished)
 * => From these roots, the garbage collector 'traverses' all objects that
 *    are reachable. It marks every object it encounters as 'alive' or
 *    'in use'. This is done recursively(if an ibject references another
 *    object, the second object is marked as well, and so on).
 * 
 * 2. Sweeping:
 * => Once the 'marking' phase is complete, the garbage collector goes
 *    through the heap - a region of memory where objects are stored -
 *    and looks for obejcts that 'weren't marked' as reachable.
 * => Any objects that were not marked are considered 'garbage', meaning
 *    they are no longer referenced anywhere in the program.
 * => These 'reachable objects' are then 'swept' away(deleted), and the
 *    memory they occupy is 'freed up'. 
*/

/**
 * Heap and Stack in Memory Management:
 * => To understand the garbage collector better, it's useful to know
 *    how memory is structured:
 *    a. Stack Memory: This is where Primitive values(numbers, booleans,
 *       etc.) are references to objects are stored. When a function is
 *       called, it's local variables are placed on the stack. When the
 *       function finishes, the memory for those local variables is
 *       automatically released.
 *    b. Heap Memory: 
 *       This is where complex objects(like arrays, functions or objects)
 *       are stored. Objects in the heap are dynamically allocated, 
 *       meaning they don't have a fixed size. The garbage collector works
 *       on the heap, looking for objects that are no longer referenced
 *       and freeing their memory.
 * 
 * => When the program creates a new object, it gets placed in the heap,
 *    and the reference(or pointer) to it is placed on the stack. The
 *    stack keeps track of which objects are still reachable. When all
 *    references to an object are removed(i.e., it's reachable), the
 *    object in the heap can be cleaned up.
*/

/**
 * Example of Mark-and-Sweep Process:
*/
let a = { name: 'John' };   // Object 1
let b = { name: 'Jane' };   // Object 2
let c = { name: 'Jim' };    // Object 3

a = null;  // Now a is unreachable
b = c;     // b now points to c

/**
 * - Initially, all three objects (a, b, and c) are reachable.
 * - After a = null, Object-1 is no longer referenced by any variable,
 *   so it is now 'unreachable'.
 * - However, b = c; means that Object-2 (originally pointed to by b)
 *   is now referenced by 'b', and Object-3(originally pointed to by c)
 *   is still referenced by 'c' and 'b'. 
 * 
 * Phase-1: Mark Phase
 * - The garbage collector starts from the roots. The variables a, b, c
 *   are starting points.
 * - b and c are still pointing to Object-2 and Object-3, so those objects
 *   are marked as alive.
 * - Object-1 is no longer reachable because 'a' was set to 'null', so
 *   it is not marked.
 * 
 * Phase-2: Sweep Phase
 * - The garbage collector looks through the heap and find that Object-1
 *   is no longer marked as alive. It is 'sweep away' and the memory
 *   it occupied is freed.
 * - Object-2 and Object-3 are still reachable, so they are left alone.
 * 
*/


/**
 * Memory Leaks and How Garbage Collection Helps Prevent Them:
 * - A 'memory leak' occurs when objects are no longer needed but
 *   'are still referenced' somewhere, preventing the garbage collector
 *   from freeing them. Over time, these unused objects accumulate,
 *   causing your application to use more memory than necessary, slowing
 *   it down or even crashing.
 * 
 * - Garbage Collection helps prevent memory leaks by automatically
 *   removing objects thats are no longer referened, ensuring that
 *   memory usage stays under control.
 * 
 * - However, there are cases where memory leaks can still happen, even
 *   with garbage collection. Some examples include:
 *   a. Global Variables:
 *      If you create too many global variables or attach too many
 *      properties to global objects, they can stick around even when
 *      not needed.
 *   b. Circular references:
 *      If two or more objects reference each other(e.g. Object A 
 *      references Object B, and Object B references Object A), they
 *      may not be garbage collected if no other part of the program
 *      references them.
*/

/**
 * Example of Global Variable Memory Leak:
 * - Global variables persist throughout the life of the program. 
 * - If they’re never cleared, they can hold on to memory unnecessarily.
*/

let data = [];  // Global variable

function fetchData() {
  data = getDataFromServer(); // The global variable holds the data
}

// To avoid the memory leak:
function clearData() {
  data = null; // Explicitly release memory
}


/**
 * Event Listener Memory Leak:
 * - Event Listeners can cause memory leaks if they hold references
 *   to objects that are no longer needed.
*/

document.addEventListener("click", function() {
    // Do something
});

// To prevent memory leaks, unbind the event handler when not needed:
document.removeEventListener("click", function() {
    // Do something
});


/**
 * Circular References:
 * - Circular references can create a situation where two or more objects
 *   reference each other, making it difficult for the garbage collector
 *   to identify them as unreachable.
*/
const obj1 = {};
const obj2 = {};

obj1.ref = obj2;
obj2.ref = obj1; // Circular reference


/**
 * This creates a cycle, and if no other part of the program references
 * these objects, the garbage collector may fail to clean them up. 
 * To prevent this, break the circular references by setting one or 
 * both references to null when they are no longer needed.
*/