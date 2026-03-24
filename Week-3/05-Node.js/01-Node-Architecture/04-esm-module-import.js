/**
 * ES Modules(ESM):
 * - We've already studied CommonJS Modules(CJS). Now, I'll introduce
 *   you to another type of module known as ES Modules(ESM), which
 *   typically use the .mjs extension.
 * 
 * - CommonJS Modules(CJS)                  ES Modules(ESM)
 *   a. module.exports require()       a. import export
 *   b. by default used NodeJS         b. By default used in frameworks like react, angular
 *   c. Older way                      c. Newer way
 *   d. Synchronous                    d. Async
 *   e. Non-Strict                     e. Strict
*/

/**
 * There are two major difference between these two module systems that
 * are important to note:
 * 
 * 1. Synchronous Vs Asynchronous:
 *    CommonJS requires modules in a synchronous manner, meaning the 
 *    next line of code will execute only after the module has been
 *    loaded. In contrast, ES Modules load modules asynchronously, 
 *    allowing for more efficient and flexible code execution. This 
 *    distinction is powerful feature and an important point to remember
 *    for interviews.
 * 
 * 2. Strict Mode:
 *    Another significant difference is that CommonJS code runs in
 *    non-strict mode, while ES modules execute in strict mode. This
 *    means that ES modules enforce stricter parsing and error handling,
 *    making them generally safer and more reliable.
 * 
 * => Overall, ES Modules are considered better due to these advantages.
 *    - First, we need to create a new file called 'package.json'. 
 *    - To use ES Modules, we must include the following in our file:
 * 
 *      {
 *         "type": "module"
 *      }
 * 
 *    - This setting indicates that our code will use ES module syntax:
 * 
 *      a. export function calculateSum(a, b) {
 *            let sum = a + b;
 *           console.log(sum);
 *         }
 * 
 *      b. import { calculateSum } from './ESM-Module-Import.js';
 *         
 *         let name = "NodeJS 03";
 *         let a = 5;
 *         let b = 10;
 *
 *         calculateSum(a, b);
 *         console.log(name);
 * 
 * Note: In the industry, we will still find CommonJS modules being
 *       used; however, in the next 2-3 years, there is expected to be
 *       a significant shift towards ES Modules.
*/