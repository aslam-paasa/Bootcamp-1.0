/**
 * Diving into the NodeJS Github repo:
 * - In this episode, we'll explore how modules actually work behind
 *   the scenes.
 * - We'll dive into how modules load into a page and how Node.js handles
 *   multiple modules, focusing on a deep dive into this:
 *   a. module.exports
 *   b. require fn
*/

/**
 * Behind the scenes:
 * - In JS, when we create a fn:
 * 
 *   function x() {
 *      const a = 10;
 *      function b() {
 *         console.log("b");
 *      }
 *   }
 *   console.log(a);  // ReferenceError: a is not defined
 * 
 * 
 * Q. Will you be able to access this value?
 * - No! console.log(a) is not defined.
*/

/**
 * Q. If you execute this code, will you be able to access it outside
 *    the function?
 * -  You cannot access 'a' value outside the function 'x' because it
 *    is defined within the function's scope.
 * -  Each function creates its own scope, so variables inside a function
 *    are not accessible from outside that function.
 * 
 *    a. Modules in Node.js work similarly to function scopes. When you
 *       require a file, Node.js wraps the code from that file inside a
 *       function. This means that all variables and functions in the
 *       module are contained within that function's scope and cannot
 *       be accessed from outside the module unless explicitly exported.
 * 
 *    b. To expose variables or functions to other modules, you use
 *       'module.exports'. This allows you to export specific elements
 *       from the module, making them accessible when required elsewhere
 *       in your application.
 * 
 *    c. All the code of a module is wrapped inside a function when you
 *       call 'require'. This function is not a regular function; it's
 *       a special type known as an IIFE(Immediately Invoked Function).
 *       Here's how it works:
 * 
 *       (function() {
 *          // All the code of the module runs inside here
 *       })();
 * 
 * - In this pattern, you create a function and then immediately invoke
 *   it. This is different from a normal function in JavaScript, which
 *   is defined and then called separately.
 * 
 *   function x() {}
 *   x(); 
*/


/**
 * In Node.js before passing the code to the V8 engine, it wraps the
 * module code inside an IIFE. The purpose of IIFE is to:
 * 1. Immediately Invoke Code: This fn runs as soon as it is defined.
 * 2. Keep Variables and Functions Private: By encapsulating the code
 *    within the IIFE, it prevents variables and functions from 
 *    interfering with other parts of the code. This ensures that the 
 *    code within the IIFE remains independent and private.
 * 
 * Using IIFE solves multiple problems by providing scope isolation and
 * immediate execution.
*/


/**
 * Q. How are variables and functions private in different modules?
 *    [Very Important]
 * - Because of IIFE and the requirement(statement) wrapping code inside
 *   IIFE.
 * 
 * Q. How do you get access to module.exports? Where does this module
 *    come from?
 * - In NodeJS, when your code is wrapped inside a function, this
 *   function has a parameter named 'module'. This parameter is an
 *   object provided by Node.js that includes 'module.exports'. 
 * 
 *   (function (module) {
 *     // All code of module runs inside here
 * 
 *     function calculateMultiply(a, b) {
 *        const result = a * b;
 *        console.log(result);
 *     }
 *     module.export = { calculateMultiply };
 *   })(module);
 * 
 * - When we use 'module.exports', we're modifying the 'exports' object
 *   of the current module. Node.js relies on this object to determine
 *   what will be exported from the module when it's required in another
 *   file.
 * 
 * - The 'module' object is automatically provided by Node.js and is
 *   passed as a parameter to the function that wraps your code. This
 *   mechanism allows you to define which parts of your module are
 *   accessible externally.
 *   [NodeJS is adding module]
 *
 * Suppose you want to include one module inside it:
 * 
 * a. multiply.js
 * 
 *    require("/path"); // Can u write this? Yes, u can give any path u want to
 *                      // NodeJS will not complain
 * 
 *    function calculateMultiply(a, b) {
 *       const result = a * b;
 *       console.log(result);
 *    }
 *
 *    // follow one pattern
 *    module.exports = { calculateMaltiply };
 *
 * b. index.js (the above require is pass over here)
 *
 *    (function (module, require) {
 *      // All code of module runs inside here
 * 
 *      function calculateMultiply(a, b) {
 *         const result = a * b;
 *         console.log(result);
 *      }
 *      module.export = { calculateMultiply };
 *    })();   <=== module.export = {}; // empty object
*/



/**
 * How require() works behind the scenes?
 * 
*/