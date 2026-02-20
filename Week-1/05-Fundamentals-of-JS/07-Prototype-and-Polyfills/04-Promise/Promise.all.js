/**
 * Promise.all() in JavaScript:
 *
 * Promise.all() is used to handle MULTIPLE promises together.
 *
 * Simple meaning:
 * - Run many promises at the same time
 * - Wait for ALL of them to finish
 * - Then get all results together
 *
 * Important points:
 * 1. Promise.all() takes an iterable (usually an array) of promises.
 * 2. It returns a NEW Promise.
 * 3. The returned promise:
 *    - resolves when ALL promises resolve
 *    - rejects if ANY one promise rejects
 * 4. The resolved value is an array of results
 *    (same order as input promises).
 */

/**
 * How Promise.all() works:
 *
 * - All promises start executing immediately
 * - Promise.all() waits for all of them
 * - If all succeed → resolve with results array
 * - If any fails → reject immediately
 */

/**
 * Syntax:
 * Promise.all(iterable);
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

Promise.all([promise1, promise2])
    .then(values => {
        console.log(values);
    })
    .catch(error => {
        console.error(error);
    });

// Output:
// ["one", "two"]

/**
 * Step-by-step flow:
 *
 * promise1 → resolves after 2s → "one"
 * promise2 → resolves after 1s → "two"
 *
 * Promise.all waits for BOTH
 *
 * Final result:
 * ["one", "two"]
 */

/**
 * Important behavior:
 *
 * If ANY promise fails:
 *
 * Promise.all([
 *   Promise.resolve(1),
 *   Promise.reject("Error"),
 *   Promise.resolve(3)
 * ])
 *
 * → Promise.all rejects immediately with "Error"
 */

/* Another Example */
let p1 = Promise.resolve("Hello");
let p2 = Promise.resolve("World");

Promise.all([p1, p2])
    .then(values => console.log(values))
    .catch(error => console.log(error));

// Output:
// ["Hello", "World"]

/**
 * Real-world use cases:
 *
 * - Multiple API calls
 * - Load data in parallel
 * - Fetch user + orders + profile together
 */

/* Step 1: Create your own Promise.all() (Polyfill) */
function PromiseAll(promiseArr) {
    const results = [];
    let resolvedCount = 0;

    return new Promise((resolve, reject) => {
        promiseArr.forEach((promise, index) => {

            // Convert non-promise values into promises
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    resolvedCount++;

                    if (resolvedCount === promiseArr.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

/* Step 2: Use custom PromiseAll */
const a = new Promise(res => setTimeout(res, 1000, "A"));
const b = new Promise(res => setTimeout(res, 2000, "B"));

PromiseAll([a, b]).then(result => {
    console.log(result);
});

// Output:
// ["A", "B"]

/**
 * Promise.all() vs Promise.race():
 *
 * Promise.all():
 * - Waits for ALL promises
 *
 * Promise.race():
 * - Resolves/rejects as soon as FIRST promise finishes
 */

/**
 * Final understanding:
 *
 * Promise.all():
 * - Parallel execution
 * - All-or-nothing result
 * - Fail fast on error
 *
 * Promise.all() = "wait for everything"
 */
