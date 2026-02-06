/**
 * Throttle:
 * > Throttling is a technique used to control how many times we allow a
 *   function to be executed over time.
 * > When a JavaScript function is said to be throttled with a wait time
 *   of X milliseconds, it can only be invoked at most once every
 *   X milliseconds. The callback is invoked immediately and cannot be
 *   invoked again for the rest of the wait duration.
 */

/**
 * Q. Implement a throttle function which accepts a callback function and a
 *    wait duration.
 *
 *    > Calling throttle() returns a function which throttled invocations of
 *      the callback function following the behavior described above.
 */

/**
 * Explanation: 
 * > A throttled fn can be in two states: It's either:
 * 
 *   a. Idle:
 *      > The throttled function was not invoked in the last wait duration. 
 *      > Calling the throttled function will immediately execute the callback
 *        function without any need to throttle. 
 *      > After this happens, the function enters the "Active" state.
 * 
 *   b. Active:
 *      > The throttled function was invoked within the last wait duration. 
 *      > Subsequent calls should not execute the callback function until 
 *        wait is over. 
 * 
 * > Given that there's a wait duration before the function can be invoked 
 *   again, we know that we will need a timer, and setTimeout is the first 
 *   thing that comes to mind. Since there are only two states, we can use a 
 *   boolean variable to model the state.
 * 
 * 
 * > We will also need to return a function which contains logic surrounding 
 *   when to invoke the func. This function needs to do a few things:
 * 
 *   a. Throttle Invocation:
 *      > The callback function is invoked immediately and doesn't allow only
 *        invocations again until a duration of wait has passed. As mentioned
 *        earlier, we can use a boolean variable shouldThrottle to model the 
 *        states.
 * 
 *      > When the function is called in the "Idle" state, a few things are done:
 *        1. shouldThrottle is set to true. The function is now in the "Active"
 *           state.
 *        2. Invoke func with the appropriate arguments.
 *        3. Use setTimeout to schedule releasing of the lock 
 *           (shouldThrottle = false) after wait duration.
 * 
 * 
 *      > While the lock is active, calls to the throttled function will not
 *        invoke func because of the shouldThrottle check at the top of the 
 *        function.
 * 
 *   b. Invoke func with the appropriate arguments:
 *      > Throttled functions are used like the original functions, so we 
 *        should forward the value of this and function arguments when 
 *        invoking the original callback functions.
 * 
 *      > Invoking the original callback function func has to preserve the 
 *        reference to this. Therefore:
 *        - Arrow functions cannot be used to declare the inner function due
 *          to lexical binding of this.
 *        - Invoking the original callback function via func(...args) will 
 *          not forward the correct this reference and cannot be used.
 * 
 *      > Hence we have to use Function.prototype.apply()/Function.prototype.call()
 *        which allows us to specify this as the first argument:
 *        - func.apply(thisArg, args)
 *        - func.call(thisArg, ...args)
*/

export default function throttle(func, wait = 0) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(function () {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}


/**
 * Techniques:
 * a. Using setTimeout
 * b. Closures
 * c. How 'this' works
 * d. Invoking fns via Function.prototype.apply()/Function.prototype.call()
*/