/**
 * Promise.allSettled() in JavaScript:
 *
 * Promise.allSettled() is used to handle MULTIPLE promises
 * and wait until ALL of them finish.
 *
 * Simple meaning:
 * - Run many promises at the same time
 * - Wait for ALL of them to finish
 * - It does NOT care whether they resolve or reject
 *
 * Important points:
 * 1. Promise.allSettled() takes an iterable (usually an array) of promises.
 * 2. It returns a NEW Promise.
 * 3. The returned promise ALWAYS resolves.
 * 4. It gives the result of EVERY promise.
 */

/**
 * How Promise.allSettled() works:
 *
 * - All promises start executing together
 * - It waits for every promise to settle
 *   (settle = resolve OR reject)
 * - No promise can stop the execution
 */

/**
 * Syntax:
 * Promise.allSettled(iterable);
 *
 * iterable:
 * - Usually an array of promises
 *
 * Return value:
 * - A Promise that resolves with an array of result objects
 */

/* Simple Example */
let promise1 = Promise.resolve("Success");
let promise2 = Promise.reject("Error");

Promise.allSettled([promise1, promise2])
    .then(results => {
        console.log(results);
    });

// Output:
// [
//   { status: "fulfilled", value: "Success" },
//   { status: "rejected", reason: "Error" }
// ]

/**
 * Step-by-step flow:
 *
 * promise1 → resolved → "Success"
 * promise2 → rejected → "Error"
 *
 * Promise.allSettled waits for BOTH
 *
 * Final result:
 * - Each promise result is reported
 */

/**
 * Result object structure:
 *
 * If promise resolves:
 * { status: "fulfilled", value: result }
 *
 * If promise rejects:
 * { status: "rejected", reason: error }
 */

/* Another Example */
const p1 = new Promise(res => setTimeout(res, 1000, "A"));
const p2 = new Promise((_, rej) => setTimeout(rej, 500, "B failed"));
const p3 = new Promise(res => setTimeout(res, 1500, "C"));

Promise.allSettled([p1, p2, p3])
    .then(results => console.log(results));

/**
 * Real-world use cases:
 *
 * - Load multiple APIs even if some fail
 * - Show partial results to user
 * - Logging success and failure together
 */

/**
 * Promise.all() vs Promise.allSettled():
 *
 * Promise.all():
 * - Fails fast
 * - Rejects if ANY promise fails
 *
 * Promise.allSettled():
 * - Never fails
 * - Waits for ALL promises
 */

/**
 * Promise.allSettled() vs Promise.race():
 *
 * Promise.allSettled():
 * - Waits for all promises
 *
 * Promise.race():
 * - First finished promise decides result
 */

/**
 * Final understanding:
 *
 * Promise.all():
 * - All must succeed
 *
 * Promise.race():
 * - First result wins
 *
 * Promise.allSettled():
 * - Everyone reports back
 *
 * Promise.allSettled() = "wait for everyone, no matter what"
 */
