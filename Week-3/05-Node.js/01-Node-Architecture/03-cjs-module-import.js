/**
 * Approach-1: CommonJS Module(CJS)
*/ 


/**
 * Module Export and Requirements:
 * We all know that keeping all the Node.js code in a single file is
 * not good practice, right? We need multiple files to create a large
 * project, so in this chapter, we will explore how we can create those
 * file and import concepts like modules and export requirements.
*/

/**
 * What is a module?
 * - A module is a file that contains code that can be reused in other
 *   files. In Node.js, a module can be a single file or a folder that
 *   contains multiple files.
*/


/**
 * These two files, Module-Export & Module-Import, have different code 
 * that is not related to each other, so in NodeJS we call them
 * separate modules.
*/


/**
 * Q. How do you make two modules work together?
 * - Using a 'require' function.
*/

/**
 * What is the required function?
 * - In Node.js, the 'require()', fn is a built-in fn that allows you
 *   to include or required other modules into your main modules.
 * - Now, let's write our code using the require fn.
 * 
 * Task: Our objective is to execute the code written in the 
 *       Module-Export module by runnning the Module-Import module.
*/

/**
 * Steps:
 * 1. Open the ModuleImport file.
 * 2. First, include the ModuleExport using the require function.
 * 3. Then, run the code using Node.js(As discussed in the last lecture)
 * 
 *    require('./03-ModuleExport');
 *    console.log("Sum of a + b ", a + b);
 *       
 * Note: It will not work, because module protect their values and
 *       functions from leaking by default.
*/


/**
 * Q. How do we achieve it?
 * => We need to export the function using "module.exports"
 * 
 *    function calculateSum(a, b) {
 *      let sum = a + b;
 *      console.log(sum);
 *    }
 *
 *    module.exports = calculateSum;
 * 
 * Note: But it will still won't work. Why? Because we also need to
 *       import.
*/

/**
 * Q. Suppose you need to export a variable, let x = "export in React
 *    exports in Node," and a funtion, calculateSum. How would you do
 *    this?
 * => You can export both the variable and the function by wrapping
 *    them inside an object:
 * 
 *    let x = "export in React exports in Node";
 * 
 *    function calculateSum(a, b) {
 *      let sum = a + b;
 *      console.log(sum);
 *    }
 *
 *    module.exports = { 
 *       x: x, 
 *       calculateSum: calculateSum 
 *    };
 * 
 * 
 *
 * const obj = require('./03-ModuleExport');
 *
 * let name = "Node JS 03";
 * let a = 5;
 * let b = 10;
 *
 * console.log(obj.x);
 * obj.calculateSum("Sum of a + b is ", Number(a + b));
 * 
*/



/**
 * When to use this following statement:
 * - Many developers use destructuring as a common pattern to write
 *   cleaner and more efficient code. You'll encounter this technique
 *   frequently throughout your development journey.
 
 * - const { x, calculateSum } = require('./03-ModuleExport');
*/

const { x, calculateSum } = require('./03-moduleexport');

console.log(x);

let a = 5;
let b = 10;
console.log(calculateSum(a, b));


/**
 * Summary: To use private variables and functions in other modules,
 *          you need to export them. This allows other parts of your
 *          application to access and utilize those variable and fns.
*/