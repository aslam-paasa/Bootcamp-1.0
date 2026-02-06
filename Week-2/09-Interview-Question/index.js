/**
 * 115 Important Questions:
*/

/**
 * What is JavaScript?
 * - JS is high level, interpreted, single threaded programming language
 *   which is primarily used in web development. 
 * - It is a client side scripting language, which means it is executed
 *   in the user's browser, but it can be used on the server side using
 *   Node.js, which means we can use JS in both client and server side.
*/

/**
 * What is High and Low Level Language?
 * - In High Level Languages like JavaScript, Java, Python, etc. we don't
 *   need to worry about memory management, pointers, etc.
 * - Whenever we are having unused memory, it is automatically garbage
 *   collected by the garbage collector. 
 * - But in Low Level Languages like C, C++, etc. we need to manually
 *   manage memory, pointers, etc. 
 * - HLL is easy to learn and use, whereas LLL is difficult to learn and use.
*/

/**
 * What is difference between JavaScript and Java?
 * - Java is compiled language, whereas JavaScript is interpreted language.
 * - Java is multi-threaded language, whereas JavaScript is single threaded
 *   language, means Java can handle multiple tasks at a time, whereas
 *   JavaScript can't handle multiple tasks at a time.
*/

/**
 * What is compilation, interpretation and just in time compilation?
*/


/**
 * What are the data types in JavaScript?
 * - Primitive Data Types:
 *   - Number
 *   - String
 *   - Boolean
 *   - Null
 *   - Undefined
 *   - Symbol
 *   - BigInt
 * - Non-Primitive Data Types:
 *   - Object
 *   - Array
 *   - Function
*/


/**
 * Data Types & Type Coercion:
 * - Type Coercion is when JS automatically converts one data type to another
 *   data type during operations.
 * - This happens in 2 ways:
 *   1. Implicit (automatic) - JS does the conversion automatically
 *   2. Explicit (manual)    - We manually convert using methods
*/

/**
 * Examples of Implicit Coercion:
 * 1. Number + Number    = Number   : 10 + 20        = 30
 * 2. Number + String    = String   : 10 + "20"      = "1020"
 * 3. Number + Boolean   = Number   : 10 + true      = 11
 * 4. Number + Null      = Number   : 10 + null      = 10  (null is 0)
 * 5. Number + Undefined = Number   : 10 + undefined = NaN (undefined is NaN)
 * 
 * 6.  String + String    = String  : "10" + "20"      = "1020"
 * 7.  String + Number    = String  : "10" + 20        = "1020"
 * 8.  String + Boolean   = String  : "10" + true      = "10true"
 * 9.  String + Null      = String  : "10" + null      = "10null"  (null is "null")
 * 10. String + Undefined = String  : "10" + undefined = "10undefined" (undefined is "undefined")
 * 
 * 11. Boolean + Number    = Number : true + 1         = 2
 * 12. Boolean + String    = String : true + "hello"   = "truehello"
 * 13. Boolean + Boolean   = Number : true + true      = 2
 * 14. Boolean + Null      = Number : true + null      = 1 (null is 0)
 * 15. Boolean + Undefined = Number : true + undefined = NaN
 * 
 * 16. Null + Null      = Number    : null + null = 0 (null is 0)
 * 17. Null + Number    = Number    : null + 1 = 1 (null is 0)
 * 18. Null + String    = String    : null + "hello" = "nullhello"
 * 19. Null + Boolean   = Number    : null + true = 1 (null is 0)
 * 20. Null + Undefined = Number    : null + undefined = NaN (null is 0)
 * 
 * 21. Undefined + Undefined = String : undefined + undefined = "undefinedundefined"
 * 22. Undefined + Number    = Number : undefined + 1 = NaN (undefined is NaN)
 * 23. Undefined + String    = String : undefined + "hello" = "undefinedhello"
 * 24. Undefined + Boolean   = String : undefined + true = "undefinedtrue"
 * 
 * Special Cases (Important for Interviews):
 * 1. NaN + anything = NaN
 * 2. Null === 0 (false)
 * 3. Null == 0  (true) 
 * 4. Null == undefined (true)
 * 5. Null === undefined (false)
 * 6. typeof null = "object"
 * 7. typeof undefined = "undefined" 
 * 8. typeof NaN = "number"
 * 9. [] == false (true)
 * 10. [] == ![] (true)
 * 11. {} + [] = "[object Object]"
 * 12. [] + {} = "[object Object]"
 * 13. true + true = 2
 * 14. 1 + "2" + "2" = "122"
 * 15. 1 + +"2" + "2" = "32"
 * 16. "A" - "B" = NaN
 * 17. "A" - 1 = NaN
 * 18. {} == {} (false - reference comparison)
 * 19. [] == [] (false - reference comparison)
*/


/**
 * Difference between == and ===?
 * ==  : value comparison
 * === : value + type comparison
*/


/**
 * What is the difference between null and undefined?
*/

/**
 * What is the type of null bug?
 * - typeof null = "object" (This is a bug in JavaScript)
*/


/**
 * What is difference between var, let and const?
*/


/**
 * What is Temporal Dead Zone?
*/


/**
 * What is Scope? (Global, Function, Block)
 * - Scope is the region of the program where a variable is defined.
 * - There are 3 types of scope in JavaScript:
 *   1. Global Scope
 *   2. Function Scope
 *   3. Block Scope
 * 
 * Global Scope:
 * - Variables defined outside any function or block are in the global scope.
 * - They can be accessed from any part of the program.
 * 
 * Function Scope:
 * - Variables defined inside a function are in the function scope.
 * - They can be accessed only inside the function.
 * - Function scope is created when a function is defined.
 * - var has function scope, let and const have block scope.
 * 
 * Block Scope:
 * - Variables defined inside a block (between {}) are in block scope.
 * - Block scope is created by if, for, while, switch statements etc.
 * - let and const have block scope but var does not.
 * - var declared in block is accessible outside the block.
*/


/**
 * What is Lexical Scope?
 * - Lexical scope determines how variable access is controlled based on where
 *   variables and blocks of scope are authored in the source code
 * 
 *   function outer() {
 *     let a = 10;
 *     function inner() {
 *       console.log(a); // inner function can access 'a'
 *     }
 *   }
 * 
 * - Inner functions have access to variables declared in their outer scope
 * - This access is determined by the physical location of functions in the code
 * - In nested functions, the innermost function has access to variables from
 *   all outer function scopes
 * - However, outer functions cannot access variables defined in inner functions
 * - This is a core JavaScript concept that enables important features like closures
 * - The scope chain is created during function definition, not function execution
*/

/**
 * Note:
 * a. Lexical Scope: Related to where variables are declared
 * b. Scope        : Where the variable is accessible
*/


/**
 * What is NaN and how to check for it?
 * - NaN is a special value in JavaScript that represents Not-a-Number.
 * - It is a number type value.
 * 
 * Example:
 * 1. "A" - "B" = NaN
 * 2. "A" + 1 = NaN
 * 3. "A" / 1 = NaN
 * 4. "A" % 1 = NaN
 * 5. "A" ** 1 = NaN
 * 6. NaN === NaN (false)
*/


/**
 * What is the difference between undeclared and undefined variable?
 * a. console.log(a); // ReferenceError: a is not defined
 * b. let b;
 *    console.log(b); // undefined
*/


/**
 * What is type interface in JS?
*/


/**
 * What is hoisting in JS?
*/


/**
 * Which declarations are hoisted? How do we let, const and var behave in
 * hoisting?
*/


/**
 * What is shadowing in JS?
*/


/**
 * What is a closure in JS? With real-world use case
*/


/**
 * Can closure lead to memory leaks? How?
*/


/**
 * What are first-class functions?
*/


/**
 * What is a higher-order function?
*/


/**
 * What is a pure function?
 * - A pure function is a function that:
 *   a. Always returns the same output for the same input
 *   b. Has no side effects (doesn't modify external state)
 * 
 * Ex: Pure Function
 * 
 *     function add(a, b) {
 *        return a + b;
 *     }
 *     add(2,3) // Always returns 5
 * 
 * Ex: Impure Function (modifies external state)
 * 
 *     let total = 0;
 *     function addToTotal(num) {
 *        total += num; // Modifies external variable
 *        return total;
 *     }
 *     addToTotal(5) // Returns 5
 *     addToTotal(5) // Returns 10 (different output for same input)
 * 
 * Ex: Pure Function
 * 
 *     function getFullName(firstName, lastName) {
 *        return firstName + " " + lastName;
 *     }
 * 
 * Ex: Impure Function (depends on external state)
 * 
 *     const user = { name: "John" };
 *     function greet() {
 *        return "Hello " + user.name; // Depends on external object
 *     }
*/


/**
 * What is function currying? Implement it.
*/


/**
 * What is function composition?
*/


/**
 * What is memoization? How would you implement it?
*/


/**
 * Sum(1)(2)(3)...(n)
*/


/**
 * Call by reference vs value:
*/


/**
 * Thinking Recursively:
*/


/**
 * Find Factorial using Recursion:
*/


/**
 * Reverse a String using Recursion:
*/


/**
 * What is IIFE?
*/


/**
 * What is arrow functions and why are they used in HOFs?
*/


/**
 * Function Overloading in JS:
*/


/**
 * How to we simulate function overloading in JS?
*/


/**
 * What is event loop?
*/


/**
 * What is microtasks and macrotasks?
*/


/**
 * How does JS handle async operations under the hood?
*/


/**
 * What is a callback function?
*/


/**
 * What is promise?
*/


/**
 * What is async/await functions?
*/


/**
 * Example of promise and async/await:
*/


/**
 * Will async await block JavaScript execution?
*/


/**
 * Top level await:
*/


/**
 * setTimeout and setInterval working:
*/


/**
 * Purpose of setTimeout with 0ms delay:
*/


/**
 * Promise methods: all, allSettled, race, any, finally
*/


/**
 * How to create a custom promise?
*/


/**
 * What is callback hell?
*/


/**
 * How to avoid callback hell?
*/


/**
 * AbortController / fetch cancelation:
*/


/**
 * What is call stack?
*/


/**
 * setTimeout vs setImmediate vs requestAnimationFrame
*/


/**
 * Event Loop vs Callbacks vs Promises vs Async/Await
*/


/**
 * What is the difference between job queue and task queue?
*/


/**
 * How browser APIs interact with event loop?
*/


/**
 * DOM Manipulation:
*/


/**
 * Add Item to List using DOM Manipulation:
*/


/**
 * Event Propagation in JavaScript:
*/


/**
 * What is Event Bubbling?
*/


/**
 * What is Event Capturing?
*/


/**
 * Explain Event Delegation:
*/


/**
 * What is event.target vs currentTarget?
*/


/**
 * What is stopPropagation and stopImmediatePropagation?
*/


/**
 * What is default behavior of using script in head?
*/


/**
 * async and defer attributes in script tag:
*/


/**
 * Dynamically load script using JavaScript:
*/


/**
 * What is debouncing?
*/


/**
 * What is throttling?
*/


/**
 * Debouncing vs Throttling with code examples:
*/


/**
 * Real World Scenarios (Flipkar/Walmart):
*/


/**
 * How can you prevent a function from being called multiple times?
*/


/**
 * What is this in JavaScript?
*/


/**
 * How does this behave in different contexts (object, function, arrow fns)?
*/


/**
 * Arrow Function vs Regular Function:
*/


/**
 * What happens to this in event handlers?
*/


/**
 * How to manually bind this?
*/


/**
 * What is call(), apply() and bind()?
*/


/**
 * Difference between call() and apply()?
*/


/**
 * Use Case of bind()?
*/


/**
 * Polyfill for bind()?
*/


/**
 * What is OOP?
*/


/**
 * Example of 4 pillars of OOP:
*/


/**
 * JS Prototypes:
*/


/**
 * Prototypal Inheritance:
*/


/**
 * Difference between prototype and __proto__:
*/


/**
 * Use of Object.create():
*/


/**
 * Constructor Function and new keyword:
*/


/**
 * ES6 Classes and internal working:
*/


/**
 * How to create a class in JS?
*/


/**
 * How does inheritance work in ES6 Classes?
*/


/**
 * instanceOf operator:
*/


/**
 * Shallow Copy:
*/


/**
 * Purpose of Object.assign():
*/


/**
 * Deep Copy:
*/


/**
 * Difference between Shallow Copy and Deep Copy:
*/


/**
 * Limitations of JSON.parse(JSON.stringify()):
*/


/**
 * What is WeakSet?
*/


/**
 * What is WeakMap?
*/


/**
 * What are map, filter, reduce and forEach methods?
*/


/**
 * What is the difference between map and forEach?
*/


/**
 * Use cases of reduce:
*/


/**
 * Destructuring - array and object:
*/


/**
 * Spread and Rest Operators:
*/


/**
 * Template Literals:
*/


/**
 * for...of loop:
*/


/**
 * Default Parameters:
*/


/**
 * Enhanced object literals:
*/


/**
 * Optional Chaining:
*/


/**
 * What is Logical OR Operator ||?
*/


/**
 * Nullish Coalescing Operator ??
*/


/**
 * Modules (import and export)
*/


/**
 * What is the use of Object.freeze(), Object.entries() and Object.values()?
*/