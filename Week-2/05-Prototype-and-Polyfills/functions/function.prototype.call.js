/**
 * Function.prototype.call():
 * > "The function.prototype.call() method calls the function with a given
 *    'this' value and arguments provided individually."
*/

/**
 * Explanation:
 * > The function.prototype.call() fn is a built-in method in JS that allows
 *   you to call a fn with a specified this value and a set of arguments,
 *   passed individually (not as an array like function.prototype.apply).
 * > It allows you to explicitly define the context (this value) in which
 *   the function will be executed.
*/


/**
 * Implementation:
 * a. Using bind
 * b. Using apply
 * c. Using symbol
*/

/**
 * Approach-1: Using bind
 * > bind, apply and call can be viewed as sibling functions. They're highly
 *   similar in terms of function signature and usage.
 * > Within function.prototype methods, 'this' refers to the 'function' object
 *   itself.
 * > If the 'this' context is not used at all, the following will not work:
*/

Function.prototype.myCall = function (thisArg, ...argArray) {
   return this(...argArray);
}

/**
 * > However, thisArg is still used widely in modern code, so we need another
 *   way to do this.
 * > function.prototype.bind creates a new function with a specified 'this'
 *   value and initial arguments, without executing the original function
 *   immediately.
 * > It allows you to permanently bind a specific context (this value) to
 *   the function and partially apply arguments if needed.
 * > This is exactly what we need to bridge the gap in the above solution.
*/

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
    return this.bind(thisArg)(...argArray);
};

/**
 * Or you can also pass the argArray into bind() before executing it.
*/

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
    return this.bind(thisArg, ...argArray)();
};



/**
 * Approach-2: Using apply
 * > Function.prototype.call and function.prototype.apply are very similar.
 * > Here's an easy way to remember each function's signature:
 *   a. Function.prototype.call starts with 'C' and takes a comma-separated
 *      list of arguments.
 *   b. Function.prototype.apply starts with 'A' and takes in an Array of
 *      arguments.
*/

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
    return this.apply(thisArg, argArray);
};



/**
 * Approach-3: Using symbol
 * > Another approach is to create a Symbol and add it as a property to a
 *   newly-created Object with thisArg bound to it.
 * > This is very similar to one of the solutions to the Function.prototype.bind
 *   question.
*/

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
    const sym = Symbol();
    const wrapperObj = Object(thisArg);
    Object.defineProperty(wrapperObj, sym, {
      enumerable: false,
      value: this,
    });
  
    return wrapperObj[sym](...argArray);
};
  