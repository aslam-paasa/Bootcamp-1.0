/**
 * Diving Deep into Functions:
*/

/**
 * What is Function Statement or Declaration?
 * - It is a way of defining a function using the 'function' keyword followed
 *   by a name.
 * - Function statements are processed during the memory allocation phase
 * 
 * Example:
 * function greet() {
 *    console.log("Hello!");  
 * }
*/

/**
 * What is Function Expression?
 * - A function expression is when you store a function in a variable
 * - Just like storing numbers, strings or arrays in variables
 * - It provides flexibility as you can:
 *   1. Pass it as a variable
 *   2. Use it as an argument in other functions
 *   3. Store it as an object property
 * 
 * Real world example:
 * - Think of a calculator's "+" button as a function
 * - We can store this addition function in a variable named 'add'
 * 
 * Example:
 * var calculateSum = function(a, b) {
 *    return a + b;  
 * }
 * 
 * Usage:
 * calculateSum(5, 3) -> Output: 8
*/

/**
 * Difference between Function Statement vs Function Expression?
 * - The major difference between function statement and function expression
 *   is 'hoisting' 
 * 
 * 1. function statement:
 *  
 *    a();
 * 
 *    function a() {
 *      console.log('a is called');
 *    }
 * 
 * 2. function expression:
 * 
 *    b();
 * 
 *    var b = function() {
 *      console.log('b is called');
 *    }
 * 
 * 
 * - When we call fn a() & fn b()even before creating it, what will happen?
 *   a. a() will work fine
 *   b. b() will throw an error : TypeError: b is not a function
 * - During the hoisting phase/memory creation phase, a() is created in
 *   memory and the function is stored in the memory, but in case of b(),
 *   it is treated as a variable, means it is assigned undefined initially
 *   until the code hits the function expression.
 * 
 * 
 * Main differences:
 * - Hoisting behavior: Statement can be called before definition
 * - Expression must be defined before calling
 * - Expression provides more flexibility (can be passed as variables)
 * - Expression can be used as values in objects or arrays
*/


/**
 * What is Anonymous Function?
 * - A function without a name is called an anonymous function
 * - Anonymous functions are used in a place where functions are used as
 *   values, that's why we use it with function expression.
 * - It is not stored in the memory, it is stored in the variable.
 * 
 * Example:
 * var a = function() {
 *    console.log('a is called');
 * }
 * 
 * a();
*/

/**
 * Why are we making it first place? Itni mehnat kyu?
 * - To create private variables using closure concept.
 * - Function k bahar 'a' ki value koi v change and access nahi kr skta hai,
 *   sirf getter aur setter functions k through hi 'a' ki value ko access aur 
 *   modify kr skte hai.
*/

let ans = (function() {
    let a = 10; // Using let instead of var for block scoping
    return {
        getter: function() {
            console.log(a);
        },
        setter: function(value) {
            a = value;
        }
    }
})();

ans.getter(); // Outputs: 10
ans.setter(20); 
ans.getter(); // Outputs: 20




/**
 * Syntax Error & Anonymous Function:
 * - If we don't give a name to the function, it will throw a syntax error.
 * - We can give a name to the function, but it will not be stored in the
 *   memory, it will be stored in the variable.
 * 
 * Example:
 * 1. Wrong way:
 *    function() {
 *       console.log('a is called');
 *    }
 *    Output: SyntaxError: Function statements require a function name
 * 
 * 2. Right way:
 *    var a = function() {
 *       console.log('a is called');
 *    }
 *    Output: a is called
*/

/**
 * Advantages of Anonymous Function:
 * - We can use it as a value.
 * - We can pass it as an argument to another function.
 * - We can return it from a function.
 * - We can store it in a variable.
*/

/**
 * What are Named Function Expressions?
 * - A function expression with a name is called a named function expression.
 * - It is stored in the memory, it is not stored in the variable.
 * - It is used when we need to use a function only once.
 * 
 * Example:
 * var a = function xyz() {
 *    console.log('a is called');
 * }
 * 
 * a();
 * xyz();
 * 
 * Output: a is called
 *         ReferenceError: xyz is not defined
 * 
 * - The reason is that xyz is not defined in the global scope, it is defined
 *   in the local scope of the function a.
 * - We can't access xyz from the global scope.
*/

/**
 * Corner Case Gotcha using Named Function Expressions:
 * - We can call the a() fn, but we can't call the xyz() fn, because xyz is
 *   not created in the global scope, it is created in the local scope of the
 *   function a.
 * - We can't access xyz from the global scope.
 * 
 * Example:
 * var a = function xyz() {
 *    console.log('a is called');
 * }
 * 
 * a(); 
 * xyz(); // ReferenceError: xyz is not defined
*/

/**
 * Difference between Parameters and Arguments?
 * 1. Parameters:
 *    - Parameters are the variables that are used to store the values that
 *      are passed to the function.
 *    - They are defined when the function is declared.
 *    - They are used to store the values that are passed to the function.
 * 
 *    function a(param1, param2) {
 *      console.log(param1, param2);
 *    }
 * 
 *    a(1, 2);
 * 
 * 2. Arguments:
 *    - Arguments are the values that are passed to the function.
 *    - They are defined when the function is called.
 * 
 *    a(arg1, arg2);
*/

/**
 * First Class Functions in JS:
 * - Ability to use functions as values:
 *   a. Stored in variables
 *   b. Passed as arguments to other functions
 *   c. Returned from other functions
 * 
 * 
 * Example 1: Storing function in a variable
 * let welcomeMsg = function() {
 *    console.log("Welcome! 👋");
 * };
 * 
 * 
 * Example 2: Passing function as an argument
 * function greet(fn) {
 *    fn(); // calls welcomeMsg
 * }
 * greet(welcomeMsg);
 * 
 * 
 * Example 3: Returning a function
 * function createGreeting() {
 *    return function() {
 *       console.log("Hello from returned function! 👋");
 *    }
 * }
 * let greeting = createGreeting();
 * greeting(); // Prints: Hello from returned function! 👋
*/


/**
 * Info about Arrow Functions:
 * - We can write all the above examples using arrow functions.
*/