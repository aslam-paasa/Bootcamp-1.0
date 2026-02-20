/**
 * Promise.withResolvers():
 * > The Promise.withResolvers() static method returns an object containing
 *   a new Promise object and two functions to resolve and reject it,
 *   corresponding to the two parameters passed to the executor of the
 *   Promise() constructor.
 * 
 * > Such usage can improve code readability and make it easier to manage
 *   asynchronous operations, especially when you need to resolve or reject
 *   the Promise from different parts of the code. 
*/

/**
 * Example usage:
*/
function delayedGreeting(name) {
    const { promise, resolve, reject } = Promise.withResolvers();
  
    setTimeout(() => {
      if (name) {
        resolve(`Hello, ${name}!`);
      } else {
        reject(new Error('Name is required.'));
      }
    }, 1000);
  
    return promise;
}
  
delayedGreeting('Alice')
    .then((message) => console.log(message)) // Output: Hello, Alice!
    .catch((error) => console.error(error));
  
delayedGreeting()
    .then((message) => console.log(message))
    .catch((error) => console.error(error)); // Output: Error: Name is required.
  

/**
 * Explanation and Implementation:
 * > For the most part, Promise.withResolvers() is syntactic sugar.
 *   The only way to get access to the 'resolve' and 'reject' fn is the
 *   arguments to the 'Promise' constructor.
 * > Hence, we can create the 'resolve' and 'reject' fns before creating the
 *   'Promise', then exposing it from within the constructor fn.
 * 
 * > The 'Promise' constructor fn argument runs synchronously, so we can be
 *   sure that the 'resolve' and 'reject' variables are assigned the right
 *   values before the 'return' statement.
*/

/**
 * @returns { promise: Promise, resolve: Function, reject: Function }
 */
export default function promiseWithResolvers() {
    
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
  
    return { promise, resolve, reject };
}
  