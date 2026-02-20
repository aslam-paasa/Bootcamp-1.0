/**
 * 1. What is Temporal Dead Zone(TDZ)?
 * 2. Are let & const declarations hoisted?
 * 3. SyntaxError vs. ReferenceError vs. TypeError?
 * */ 


/**
 * let & const declarations are hoisted, but they are hoisted very
 * differently than the var declarations. These are in the temporal
 * dead for the time being.
*/


/**
 * Comparing var & let in hoisting:
 * - As we have studied earlier, we can access 'b' even before we initialize
 *   it. And in other languages like C, C++, etc., we won't be able to do
 *   access 'b' without initializing it, but in JS we can do this:
 * 
 *   console.log(b); // 100
 *   var b = 100;
 * 
 * - The memory allocated to these variables and functions even before a
 *   single line of code is executed. Until the code is executed, we get
 *   a special placeholder known as "undefined", and this is because of
 *   "hoisting".
 * 
 *   console.log(b); // undefined
 *   var b = 10;
*/

console.log(b); // undefined
var b = 10;


/**
 * - But in case of let & const, we won't be able to access them before
 *   they are initialized, and if we run the code, we will get a reference
 *   error - "Cannot access 'a' before initialization".
 * - This error tells us that we can only access 'a' after we have assigned
 *   a value to it. So, if we do console.log(a) after the initialization,
 *   we will get the value of 'a' i.e. 10.
 * 
 *   let a = 10;
 *   console.log(a); // 10
*/

// console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
console.log(a); // 10


/**
 * How to know whether this variable was hoisted or not?
 * - Even before a single line of code is executed, the JS Engine allocated
 *   memory to 'a: undefined', b: 'undefined'.
 * - In case of var, it is in the global scope, but in case of let & const,
 *   it is in some script scope, means they are stored in a different memory
 *   space than global scope. And we cannot access this memory space before
 *   we have assigned a value to it. And this is known as "Temporal Dead Zone".
 * - So, we can say that let & const are not hoisted, but they are in the
 *   temporal dead zone until some value is assigned to it.
*/

/**
 * Temporal Dead Zone(TDZ):
 * - Temporal Dead Zone is the time between the declaration of the variable
 *   and the initialization of the variable.  
 * - In case of var, the TDZ is 0 seconds, but in case of let & const, the
 *   TDZ is the time between the declaration and the initialization of the
 *   variable.
 * - So, we can say that let & const are not hoisted, but they are in the
 *   temporal dead zone until some value is assigned to it.
 * - This is why we get a reference error when we try to access a let or const
 *   variable before its value is assigned.
*/


/**
 * How to Handle the Temporal Dead Zone (TDZ) Effectively?
 * 
 * 1. Declare Variables Before Using Them:
 *    - TDZ occurs when we try to access let/const variables before
 *      their declaration
 *    - Best practice is to declare first, use later
 * 
 *    Good Practice:
 *    let fruit = "apple";
 *    console.log(fruit); // "apple"
 * 
 *    Bad Practice:
 *    console.log(fruit); // ReferenceError: Cannot access 'fruit' before initialization
 *    let fruit = "apple";
 * 
 * 2. Place Declarations at the Top of Block Scope:
 *    - When using variables in a block ({}), declare them at the
 *      beginning of that block
 * 
 *    {
 *      let x = 10;  // ✅ Good: Declaration at the top
 *      // ... other code
 *      console.log(x);
 *    }
 * 
 * 3. Understanding var vs let/const:
 *    - var doesn't have TDZ because it's hoisted with undefined
 *    - However, using var is not recommended because:
 *      a) Lacks block scope support
 *      b) Pollutes the global object
 *      c) Can create unexpected behaviors
 * 
 * Note: TDZ is a safety feature that helps write better code.
 *       Instead of avoiding it, it's better to work with it and
 *       understand its purpose.
*/


/**
 * Relation between global object & variables: let, var, const:
 * 1. In case of var, the variable is added to the global object.
 * 
 *    console.log(window.a); // undefined
 *    console.log(this.a);   // undefined
 *    var a = 10;
 *    console.log(window.a); // 10
 * 
 * 2. In case of let & const, the variable is not added to the global object.
 *    console.log(window.b); // undefined
 * 
 *    let b = 10;
 *  
 * Note: If value is not present, then it will be undefined for all.
*/

/**
 * Duplicate redeclaration of variables:
 * 1. In case of var, we can redeclare the variable with the same name.
 * 
 *    var a = 10;
 *    var a = 20;
 *    console.log(a); // 20
 * 
 * 2. In case of let, we cannot redeclare the variable with the same name.
 * 
 *    let b;
 *    b = 10;
 *    console.log(b); // 10
 * 
 *    let b = 20; // SyntaxError: Identifier 'b' has already been declared
 * 
 * 3. In case of const, we cannot redeclare the variable with the same name.
 * 
 *    const c;      // SyntaxError: Missing initializer in const declaration
 *    const c = 10;
 *    const c = 20; // SyntaxError: Identifier 'c' has already been declared
 *    c = 30;       // TypeError: Assignment to constant variable.
*/


/**
 * Let's understand 3 common errors in JavaScript in a simple way:
 * 
 * 1. ReferenceError (When something doesn't exist):
 *    - This happens when we try to use a variable that doesn't exist
 *      in our code
 *    
 *    Example 1: Variable doesn't exist at all
 *    console.log(pizza);  // ReferenceError: pizza is not defined
 *    
 *    Example 2: Variable exists but not initialized yet
 *    console.log(samosa); // ReferenceError: Cannot access 'samosa' before initialization
 *    let samosa = 5;
 * 
 * 2. SyntaxError (When code grammar is wrong):
 *    - This happens when we write JavaScript in the wrong way
 *    - Like when we try to use reserved words (let, const, var) as 
 *      variable names
 * 
 *    Example:
 *    let const = 10;  // SyntaxError: 'const' cannot be used as variable name
 *    
 * 3. TypeError (When we do wrong type of operation):
 *    - This happens when we try to change a constant value
 *    - Or when we try to do operations that don't match the data type
 * 
 *    Example:
 *    const tea = "green tea";
 *    tea = "black tea";     // TypeError: Cannot change constant variable
 * 
 * Remember: These errors are your friends! They help you write better code
 * by pointing out what's wrong.
*/


/**
 * Note: Developers prefer using 'const' for these reasons:
 * 1. It prevents accidental reassignment of important values
 * 2. It makes code more predictable and easier to debug
 * 3. It helps other developers understand your intent better
 * 
 * Q. If we can't reassign values to const variables, how do developers 
 *    work with them?
 * A. While we can't change the binding of a const variable, we can:
 *    1. Modify arrays using push(), pop(), etc
 *       const arr = [1, 2];
 *       arr.push(3);  // Valid: [1, 2, 3]
 * 
 *    2. Update object properties
 *       const user = {name: 'John'};
 *       user.age = 25;  // Valid: {name: 'John', age: 25}
 * 
 *    3. Pass const variables to functions that transform them
 *       const nums = [1, 2, 3];
 *       const doubled = nums.map(n => n * 2);  // New array: [2, 4, 6]
 * 
 * Important: Which data types can be modified with const?
 * 1. Mutable (Can be modified):
 *    - Objects
 *    - Arrays
 *    - Sets
 *    - Maps
 * 
 * 2. Immutable (Cannot be modified):
 *    - Numbers
 *    - Strings
 *    - Booleans
 *    - null
 *    - undefined
*/