/**
 * Promise.resolve():
 * > The Promise.resolve() static method 'resolves' a given value to a 
 *   Promise. If the value is:
 *   a. A native promise, return that promise
 *   b. A non-thenable, return a promise that is already fulfilled with that
 *      value
 *   c. A thenable, Promise.resolve() will call the then() method and pass a
 *      pair of resolving functions as arguments. A promise that has the
 *      same state as the thenable is returned.
 * 
 * > A 'thenable' is an interface that implements the .then() method, which
 *   is filled with two callbacks:
 *   a. when the promise is fulfilled
 *   b. when the promise is rejected
 * > Promises are also thenables.
*/

/**
 * Examples:
 * a. Resolving a non-promise:
 * 
 *    const p = promiseResolve(42);
 *    await p; // 42
 * 
 * b. Resolving a Promise:
 * 
 *    const original = new Promise((resolve) => resolve(42));
 *    const cast = promiseResolve(original);
 *    await cast; // 42
 * 
 * c. Resolving a thenable:
 * 
 *    const resolvedThenable = promiseResolve({
 *       then(resolve, reject) {
 *          resolve(42);
 *       }
 *    });
 *    await resolvedThenable; // 42
*/


/**
 * Implementation:
 * > The purpose of Promise.resolve() is to safe wrapper around any value
 *   such that can be used with then() and await-ed. 
 * 
 * > There are three cases to handle within the static Promise.resolve() fn:
 *   a. If the value is native Promise, return it directly without creating
 *      a new instance. We can check for this case using 'value instance of
 *      Promise'.
 *   b. If the value is not a thenable, return a promise that's fulfilled with
 *      the value. We can use a Promise constructor that calls resolve with
 *      the value.
 *   c. If the value is a thenable, the then() method will be called. The
 *      then() method has the same signature as a Promise constructor.
 * 
 * > The first two cases are straightforward. Let's talk about the last case:
 * > Since the Promise constructor and then() has the same parameters, one
 *   might tempted to pass 'value.then' to a new Promise e.g., new Promise(value.then)
 *   and call it a day. However, the then() will lose the value of 'this'. 
 *   Hence, we need to pass in 'value.then.bind(value)' instead.
 * 
 * > Nested thenables and promises should also be flattened. This is already
 *   handled by the 'resolve' callbacks of a Promise constructor, so we don't
 *   have to manually attempt to flatten.
*/

/**
 * @param {*} value
 * @returns Promise
 */
export default function promiseResolve(value) {
    if (value instanceof Promise) {
      return value;
    }
  
    if (typeof value.then === 'function') {
      return new Promise(value.then.bind(value));
    }
  
    return new Promise((resolve) => resolve(value));
}
  

/**
 * In fact, the resolve fn can also handle thenables. So, we can simplify
 * the code even further:
*/

/**
 * @param {*} value
 * @returns Promise
 */
export default function promiseResolve(value) {
    if (value instanceof Promise) {
      return value;
    }
  
    return new Promise((resolve) => resolve(value));
}
  


/**
 * Understand in Hinglish:
*/

/**
 * 1. Basic Idea:
 *    > Promise.resolve(value) ka kaam hai kisi v value ko ek Promise bana
 *      dena, taaki hum usko then() ya wait ke saath use kar sakein.
 * 
 * 2. Matlab kya hua?
 *    > Soch le, tu k paas ek value hai:
 *      a. kabhi wo already ek Promise hai
 *      b. kabhi ek normal value hai (like 42)
 *      c. kabhi ek 'thenable' object hai (jisme .then() method likha hua hai)
 *    > To Promise.resolve() automatically samajh jaata hai ki ye kis type 
 *      ki value hai, aur usko ek proper Promise me convert kar deta hai.
 * 
 * 3. Types of Values (3 scenarios):
 * 
 *    a. Value already ek Promise hai:
 *       > Agar value pehle se Promise hai, to Promise.resolve() kuch nhi
 *         karega, usi Promise ko return kar dega (duplicate nahi banata)
 *    
 *       const original = new Promise((resolve) => resolve(42));
 *       const cast = promiseResolve(original);
 *       await cast; // 42
 * 
 *    b. Normal value hai (like number, string, object, etc.)
 *       > Agar value ek normal value hai, to ye ek fulfilled Promise bana
 *         deta hai us value k saath.
 * 
 *       const p = promiseResolve(42);
 *       await p; // 42
 * 
 *    c. 'thenable' object hai (jisme .then() method likha hua hai)
 *       > Agar koi object .then() method implement karta hai, to wo 'thenable'
 *         kehlata hai (Promise jaise behave karta hai)
 *       > Promise.resolve() uska .then() call karke usko proper Promise me
 *         convert kar deta hai.
 * 
 *       const resolvedThenable = promiseResolve({
 *          then(resolve, reject) {
 *             resolve(42);
 *          }
 *       });
 *       await resolvedThenable; // 42 
*/

export default function promiseResolve(value) {
    /**
     * Case 1: Agar value already Promise hai, return as is
     */
    if (value instanceof Promise) {
      return value;
    }
  
    /**
     * Case 2: Agar thenable hai (matlab uske andar .then method hai)
     * > .bind(value) karna zaroori hai taaki 'this' na toot jaye
     */
    if (typeof value.then === "function") {
      return new Promise(value.then.bind(value));
    }
  
    /**
     * Case 3: Normal value -> Promise bana do
     */
    return new Promise((resolve) => resolve(value));
  }
  

/**
 * Understanding of instanceof operator:
 * > instanceof check karta hau ki koi object kis class se bana hai.
 * > instanceof = "is this object created from this blueprint?"
 * > Example:
 *  
 *   let arr = [];
 *   console.log(arr instanceof Array); // true
 *   console.log(arr instanceof Object); // true 
 *   > arr ek array hai, aur array internally ek object bhi hota hai.
 * 
 *   let x = new Promise((resolve) => resolve(42));
 *   console.log(x instanceof Promise); // true
 * 
 *   Matlab ye check karta hai:
 *   > Kya x ek Promise ka instance hai?
 *   > So agar ye true aata hai, to iska matlab ye value already ek Promise h
 *   > To hume naya Promise banaane ki zaroorat nahi hai, we can return the
 *     existing Promise.
 * 
 * > Final Version:
 *   Kyuki Promise.resolve ke andar ka resolve() function already thenables
 *   handle kar leta hai.
*/

export default function promiseResolve(value) {
    if (value instanceof Promise) {
      return value; // already a Promise
    }
    return new Promise((resolve) => resolve(value)); // normal or thenable
}