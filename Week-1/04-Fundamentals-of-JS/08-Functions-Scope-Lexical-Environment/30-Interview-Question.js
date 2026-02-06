/**
 * What is function declaration?
 * - Function declaration is a way to create a function.
 * - Also called as function statement or function definition.
*/

function square(num) {
    return num * num;
}


/**
 * What is function Expression?
 * - When we store a function inside of a variable, called fn expression.
*/

const squareEx = function (num) {
    return num * num;
}

/**
 * Calling a function expression:
*/
console.log(squareEx(5));


/**
 * What is anonymous function?
 * - A function without a name is called an anonymous function.
 * - It can be assigned to a variable or passed as a callback.
 * - Ex:
 *       function (num) {
 *          return num * num;
 *       }
*/


/** 
 * What are first class functions?
 * - In a language where a function is treated like a variable, is called
 *   first class functions.
 * - In these cases, function can be passed to another function, can be
 *   used, manipulated and return from those functions. So, basically
 *   it can do everything that a variable can do.
*/

function squareFn(num) {
    return num * num;
}

function displaySquare(fn) {
    console.log("Square is " + fn(5));
}

displaySquare(squareFn);


/**
 * What is IIFE?
 * - Immediately Invoked Function Expression.
 * - We wrap this function in a parenthesis and then call it immediately.
*/

(function squareIIFE(num) {
    console.log("Square is " + num * num);
})(5);


/**
 * IIFE Example:
 * - It will check in its local scope first, if not found then it will check
 *   in the parent's scope.
*/
(function (x) {
    return (function (y) {
        console.log(x);
    })(2);
})(1); // Output: 1


/**
 * Function Scope (Where variables can be used):
 * - Think of a function like a room. If you keep something inside the room,
 *   you can only use it inside that room, not outside.
 *   Example: If you write 'var x = 10' inside a function, you can only use 
 *   'x' inside that function
 * 
 * - But if you keep something outside (like in a hallway), you can use it 
 *   anywhere - both inside rooms and in the hallway.
 *   Example: If you write 'var y = 20' outside functions, you can use 'y' 
 *   anywhere in your code
*/ 

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i); // 0, 1, 2, 3, 4
    }, i * 1000);
}

for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i); // 5, 5, 5, 5, 5
    }, i * 1000); 
}

/**
 * It will print 0, 1, 2, 3, 4.
 * - Because let is block scoped, so it will create a new block scope for
 *   each iteration.
 * - So, each time the setTimeout will print the value of i.
 * - But if we use var, it will print 5, 5, 5, 5, 5.
 * - Because var is function scoped, so it will print the value of i after
 *   the loop is finished.
*/


/**
 * Function Hoisting:
 * - JavaScript automatically moves function declarations to the top
 * - Allows calling functions before their definition
 * - Only works with normal functions, not arrow functions or variables
 * - JavaScript processes function declarations before executing code
*/

functionName(); // fn is hoisted to the top, so it will work

function functionName() {
    console.log("workattech");
}

functionName();



/**
 * Function Hoisting Example:
 * - Yahan x ki value undefined aayegi kyunki function k andar wala x
 *   upar hoist ho jaata hai, lekin uski value nahi
*/

var x = 21;

var fun = function() {
    console.log(x);     // undefined
    var x = 20;
}

fun();


/**
 * Params vs Arguments:
 * a. Args : Sending Values
 * b. Params: Receiving Values
*/

function squareParamVsArg(num) { // Params: Receiving Values
    console.log(num * num);
}

squareParamVsArg(5); // Arguments: Sending Values



/**
 * Spread Operator & Rest Operator:
 * It is used to spread the values of an array or object into individual
 * elements.
 * a. Spread Operator: Sending Values
 * b. Rest Operator  : Receiving Values
*/
function multiply(...nums) {    // Rest Operator: Receiving Values
    console.log(nums[0] * nums[1]);
}

var args = [5, 6];
multiply(...args); // Spread Operator: Sending Values



/**
 * When we use Rest Operator, it should be the last parameter in the function.
 * If we use it in the middle, it will throw an error.
 * a. a : 5
 * b. x : 6
 * c. y : 3
 * d. numbers : [7, 8, 9]
*/
const fn = (a, x, y, ...numbers) => {
    console.log(x, y);
}

fn(5, 6, 3, 7, 8, 9);


/**
 * Callback Function:
 * - A callback function is a function that is passed as an argument to 
 *   another function. 
 * - It is a function that is executed after another function has
 *   finished executing.
 * 
 * Example:
 * a. Map
 * b. Filter
 * c. Every
 * etc...
*/




/**
 * Arrow Functions:
 * - Introduced in ES6
 * - They are a shorter way to write functions
*/

const add = (firstName, secondName) => {
    return firstName + secondName;
}


/**
 * Arrow Fn Vs Normal Fn:
*/


/**
 * 1. Syntax:
*/
function normalFn() {
    return num * num;
}

const arrowFn = () => {
    return num * num;
}


/**
 * 2. Implicit "return" keyword
*/
const arrowFun = (num) => num * num;


/**
 * 3. Arguments:
*/

function normalFnArg() {
    console.log(arguments);   // arguments is defined: [1, 2, 3]
}

normalFnArg(1, 2, 3);


const arrowFnArg = () => {
    console.log(arguments);   // arguments is not defined
}

arrowFnArg(1, 2, 3);


/**
 * 4. "this" keyword:
 *    a. arrow fn : Subscribe to undefined
 *    b. normal fn: Subscribe to John
 * 
 * Because in arrow fn, 'this' keyword is pointing to the parent scope 
 * i.e. window object. But in normal fn, 'this' keyword is pointing to the
 * object that is calling the function.
*/

let user = {
    userName: "John",
    rc1: () => {
        console.log('Subscribe to ' + this.userName);
    },
    rc2() {
        console.log('Subscribe to ' + this.userName);
    }
}

user.rc1();
user.rc2();



/**
 * Closures:
 * 
*/




/**
 * Q. Write a fn to check whether an input is an array or not.
*/

function checkArray(input) {
    return Array.isArray(input);
}

console.log(checkArray([1, 2, 3])); // true
console.log(checkArray({name: "John"})); // false


/**
 * Q. Write a fn to clone an array.
*/

const cloneArray = (arr) => {
    return [1, 2, 3, ...arr];
}

console.log(cloneArray([1, 2, 3])); // [1, 2, 3, 1, 2, 3]


/**
 * Q. Write a program to join all elements of the following array into
 *    a string using the join() method.
*/

function joinArray(arr) {
    return arr.join("-");
}

console.log(joinArray([1, 2, 3])); // "1-2-3"


/**
 * Q. Write a program to reverse an array.
*/





