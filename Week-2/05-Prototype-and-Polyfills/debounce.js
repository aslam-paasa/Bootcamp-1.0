/**
 * Debounce:
 * > Debouncing is a technique used to control how many time we allow a
 *   function to be executed over time.
 * > When a JS fn is debounced with a wait time of x milliseconds, it must
 *   wait until after X milliseconds have elapsed since the debounced fn
 *   was last called.
 *
 * > You almost certainly have encountered debouncing in your daily lives
 *   before (e.g. when entering an elevator). Only after X duration of not
 *   pressing the "Door open" button (the debounced fn not being called)
 *   will the elevator door actually close (the callback fn is executed).
 */

/**
 * Q. Implement a debounce function which accepts a callback function and
 *    a wait duration.
 *
 *    > Calling debounce() returns a function which has debounced invocations
 *      of the callback function following the behavior described above.
 *    > Example:
 *
 *      let i = 0;
 *      function increment() {
 *        i++;
 *      }
 *      const debouncedIncrement = debounce(increment, 100);
 *
 *      // t = 0: Call debouncedIncrement().
 *      debouncedIncrement(); // i = 0
 *
 *      // t = 50: i is still 0 because 100ms have not passed.
 *
 *      // t = 100: increment() was invoked and i is now 1.
 *
 *
 *    > debouncedIncrement() is called multiple times
 *
 *      let i = 0;
 *      function increment() {
 *        i++;
 *      }
 *      const debouncedIncrement = debounce(increment, 100);
 *
 *      // t = 0: Call debouncedIncrement().
 *      debouncedIncrement(); // i = 0
 *
 *      // t = 50: i is still 0 because 100ms have not passed.
 *      //  Call debouncedIncrement() again.
 *      debouncedIncrement(); // i = 0
 *
 *      // t = 100: i is still 0 because it has only
 *      //  been 50ms since the last debouncedIncrement() at t = 50.
 *
 *      // t = 150: Because 100ms have passed since
 *      //  the last debouncedIncrement() at t = 50,
 *      //  increment was invoked and i is now 1 .
 */

/**
 * Explanation:
 * > Given that there's a 'wait' duration before the fn can be invoked, we
 *   know that we will need a timer, and 'setTimeout' is the first thing
 *   that comes to mind.
 *
 * > We will also need to return a fn which wraps around the callback fn
 *   parameter. This fn needs to do a few things:
 *
 *   a. Debounce Invocation:
 *      > It invokes the callback fn only after a delay of 'wait'. This
 *        is performed using 'setTimeout'.
 *      > Since, we might need to clear the timer if the debounced fn is
 *        called again while there's a pending invocation, we need to retain
 *        a reference to a 'timeoutID', which is the returned value of
 *        'setTimeout'
 *
 *      > If the fn is called agin while there's a pending invocation, we
 *        should cancel existing timers and schedule a new timer for the
 *        deplayed invocation with the full 'wait' duration.
 *      > We can cancel the timer via clearTimeout(timeoutID)
 *
 *
 *    b. Calls the callback fn with the right parameters:
 *       > Debounced fns are used like the original fns, so we should forward
 *         the value of 'this' and fn arguments when invoking the original
 *         callback fns.
 *
 *       > You may be tempted to use func(...args) but this will be lost if
 *         callback fns are invoked that way.
 *       > Hence, we have use Function.prototype.apply()/Function.prototype.call()
 *         which allows us to specify 'this' as the first argument.
 *         - func.apply(thisArg, args)
 *         - func.call(thisArg, ...args)
 */


export default function debounce(func, wait = 0) {
  let timeoutID = null;

  return function (...args) {
    // Keep a reference to `this` so that func.apply() can access it.
    const context = this;
    clearTimeout(timeoutID);

    timeoutID = setTimeout(function () {
      timeoutID = null; // Not strictly necessary but good to do this.
      func.apply(context, args);
    }, wait);
  };
}



/**
 * Edge Cases:
 * > The main pitfall in this question is invoking the callback function 
 *   with the correct this, the value of this when the debounced function 
 *   was called. 
 * > Since the callback function will be invoked in a timeout, we need to 
 *   ensure that the first argument to func.apply()/func.call() is the 
 *   right value. 
 * > There are two ways to achieve this:
 *   a. Use another variable to keep a reference to this and access this via
 *      that variable from within the setTimeout callback. This is the 
 *      traditional way of preserving this before arrow functions existed.
 *   b. Use an arrow function to declare the setTimeout callback where the 
 *      this value within it has lexical scope. The value of this within 
 *      arrow functions is bound to the context in which the function is 
 *      created, not to the environment in which the function is called.
*/

/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait = 0) {
    let timeoutID = null;

    return function (...args) {
      clearTimeout(timeoutID);
  
      timeoutID = setTimeout(() => {
        timeoutID = null; // Not strictly necessary but good to include.
        // Has the same `this` as the outer function's
        // as it's within an arrow function.
        func.apply(this, args);
      }, wait);
    };
}
  

/**
 * > Also, we should not implement the returned function using an arrow 
 *   function for reasons mentioned above. The this value of the returned 
 *   function needs to be dynamically determined when executed.
*/


/**
 * Techniques:
 * a. Using setTimeout
 * b. Closures
 * c. How 'this' works
 * d. Invoking fns via Function.prototype.apply()/Function.prototype.call()
 * 
 * Note: clearTimeout() is a forgiving function and passing an invalid ID to
 *       clearTimeout() silently does nothing; no exception is thrown. 
 *       Hence we don't have to check for timeoutID === null before using 
 *       clearTimeout().
*/