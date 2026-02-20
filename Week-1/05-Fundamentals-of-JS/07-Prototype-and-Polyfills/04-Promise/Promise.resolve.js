/**
 * Promise.resolve() in JavaScript:
 *
 * Promise.resolve() is used to create a promise
 * that is already RESOLVED.
 *
 * Simple meaning:
 * - It creates a successful promise immediately
 * - No waiting, no async work needed
 *
 * Important points:
 * 1. Promise.resolve() returns a NEW Promise.
 * 2. The returned promise is already fulfilled.
 * 3. It is often used to:
 *    - wrap a normal value into a promise
 *    - normalize sync and async code
 */

/**
 * Syntax:
 * Promise.resolve(value);
 *
 * value:
 * - Can be anything (number, string, object, promise)
 *
 * Return value:
 * - A resolved Promise
 */

/* Simple Example */
const promise = Promise.resolve("Hello");

promise.then(value => {
    console.log(value);
});

// Output:
// "Hello"

/**
 * Step-by-step flow:
 *
 * Promise.resolve("Hello")
 * → creates a resolved promise
 * → then() runs immediately
 */

/**
 * Promise.resolve() with a value:
 */
Promise.resolve(100)
    .then(val => console.log(val));

// Output:
// 100

/**
 * Promise.resolve() with an object:
 */
Promise.resolve({ name: "JS" })
    .then(obj => console.log(obj));

// Output:
// { name: "JS" }

/**
 * Important behavior:
 *
 * If you pass a PROMISE into Promise.resolve():
 * - It returns the SAME promise
 */

/* Example */
const p = new Promise(res => setTimeout(res, 1000, "Done"));

Promise.resolve(p).then(val => console.log(val));

// Output (after 1s):
// "Done"

/**
 * Promise.resolve() vs new Promise():
 *
 * new Promise():
 * - Used when you need async logic
 *
 * Promise.resolve():
 * - Used when you already have a value
 */

/**
 * Real-world use cases:
 *
 * - Convert sync data to promise
 * - Ensure function always returns a promise
 * - Use inside Promise.all(), race(), any()
 */

/* Example: normalize return type */
function getData(value) {
    return Promise.resolve(value);
}

getData("Data received")
    .then(result => console.log(result));

/**
 * Promise.resolve() vs Promise.reject():
 *
 * Promise.resolve() → success promise
 * Promise.reject()  → failed promise
 */

/**
 * Final understanding:
 *
 * Promise.resolve():
 * - Creates a fulfilled promise
 * - Useful for consistency
 * - No async delay
 *
 * Promise.resolve() = "instant success promise"
 */
