/**
 * Promise.race() in JavaScript:
 *
 * Promise.race() is used to run multiple promises
 * and get the result of the FIRST one that finishes.
 *
 * Simple meaning:
 * - Start many promises at the same time
 * - Whichever finishes FIRST wins
 * - Others are ignored
 *
 * Important points:
 * 1. Promise.race() takes an iterable (usually an array) of promises.
 * 2. It returns a NEW Promise.
 * 3. The returned promise:
 *    - resolves if the FIRST finished promise resolves
 *    - rejects if the FIRST finished promise rejects
 * 4. It does NOT wait for all promises.
 */

/**
 * How Promise.race() works:
 *
 * - All promises start executing together
 * - The first promise to settle (resolve or reject) decides the result
 * - Remaining promises are ignored
 */

/**
 * Syntax:
 * Promise.race(iterable);
 *
 * iterable:
 * - Usually an array of promises
 *
 * Return value:
 * - A single Promise
 */

/* Simple Example */
let promise1 = new Promise((resolve) => {
    setTimeout(resolve, 2000, "one");
});

let promise2 = new Promise((resolve) => {
    setTimeout(resolve, 1000, "two");
});

Promise.race([promise1, promise2])
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.error(error);
    });

// Output:
// "two"

/**
 * Step-by-step flow:
 *
 * promise1 → resolves after 2s → "one"
 * promise2 → resolves after 1s → "two"
 *
 * promise2 finishes first
 *
 * Final result:
 * "two"
 */

/**
 * Important behavior:
 *
 * If the FIRST finished promise FAILS,
 * Promise.race() rejects immediately.
 */

/* Example with rejection */
let p1 = new Promise((resolve) => {
    setTimeout(resolve, 2000, "Success");
});

let p2 = new Promise((_, reject) => {
    setTimeout(reject, 1000, "Error");
});

Promise.race([p1, p2])
    .then(value => console.log(value))
    .catch(error => console.log(error));

// Output:
// "Error"

/**
 * Real-world use cases:
 *
 * - API timeout handling
 * - Fastest response wins
 * - Fallback logic
 */

/* Timeout Example */
function fetchWithTimeout(promise, timeout) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject("Request timed out"), timeout);
    });

    return Promise.race([promise, timeoutPromise]);
}

/**
 * Promise.race() vs Promise.all():
 *
 * Promise.all():
 * - Waits for ALL promises
 * - Fails if ANY fails
 *
 * Promise.race():
 * - Waits for FIRST promise
 * - Result decided immediately
 */

/**
 * Promise.race() vs Promise.any():
 *
 * Promise.race():
 * - First settle (resolve OR reject) wins
 *
 * Promise.any():
 * - First resolve wins
 * - Ignores rejections
 */

/**
 * Final understanding:
 *
 * Promise.all()  → wait for everything
 * Promise.race() → fastest wins
 *
 * Promise.race() = "first result matters"
 */
