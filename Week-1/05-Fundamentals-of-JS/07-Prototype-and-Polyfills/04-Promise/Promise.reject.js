/**
 * Promise.reject() in JavaScript:
 *
 * Promise.reject() is used to create a promise
 * that is already REJECTED.
 *
 * Simple meaning:
 * - It creates a failed promise immediately
 * - No async work, just an error
 *
 * Important points:
 * 1. Promise.reject() returns a NEW Promise.
 * 2. The returned promise is already rejected.
 * 3. It is commonly used to:
 *    - throw errors in promise chains
 *    - handle failure cases
 */

/**
 * Syntax:
 * Promise.reject(reason);
 *
 * reason:
 * - The error or value that explains why promise failed
 *
 * Return value:
 * - A rejected Promise
 */

/* Simple Example */
const promise = Promise.reject("Something went wrong");

promise
    .then(value => console.log(value))
    .catch(error => console.log(error));

// Output:
// "Something went wrong"

/**
 * Step-by-step flow:
 *
 * Promise.reject("Something went wrong")
 * → creates a rejected promise
 * → then() is skipped
 * → catch() runs immediately
 */

/**
 * Promise.reject() with Error object:
 */
Promise.reject(new Error("Network error"))
    .catch(err => console.log(err.message));

// Output:
// "Network error"

/**
 * Important behavior:
 *
 * Promise.reject() behaves like throwing an error
 * inside a promise chain.
 */

/* Example inside a chain */
Promise.resolve(10)
    .then(val => {
        if (val < 20) {
            return Promise.reject("Value too small");
        }
        return val;
    })
    .catch(err => console.log(err));

// Output:
// "Value too small"

/**
 * Promise.reject() vs throw:
 *
 * throw:
 * - Used inside synchronous code
 *
 * Promise.reject():
 * - Used inside promise-based async code
 */

/**
 * Real-world use cases:
 *
 * - API error handling
 * - Validation failures
 * - Early exit from promise chain
 */

/**
 * Promise.reject() vs Promise.resolve():
 *
 * Promise.resolve() → success promise
 * Promise.reject()  → failure promise
 */

/**
 * Final understanding:
 *
 * Promise.reject():
 * - Creates rejected promise
 * - Triggers catch()
 * - Skips then()
 *
 * Promise.reject() = "instant failure promise"
 */
