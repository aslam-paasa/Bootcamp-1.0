/**
 * Promise.any() in JavaScript:
 *
 * Promise.any() is used to get the FIRST SUCCESSFUL promise.
 *
 * Simple meaning:
 * - Run many promises at the same time
 * - Ignore failed promises
 * - Return the FIRST promise that RESOLVES
 *
 * Important points:
 * 1. Promise.any() takes an iterable (usually an array) of promises.
 * 2. It returns a NEW Promise.
 * 3. The returned promise:
 *    - resolves when ANY promise resolves
 *    - rejects ONLY if ALL promises reject
 */

/**
 * How Promise.any() works:
 *
 * - All promises start executing together
 * - Rejections are ignored (temporarily)
 * - First resolved promise wins
 * - If none resolve → reject at the end
 */

/**
 * Syntax:
 * Promise.any(iterable);
 *
 * iterable:
 * - Usually an array of promises
 *
 * Return value:
 * - A Promise
 */

/* Simple Example */
let promise1 = Promise.reject("Error 1");
let promise2 = new Promise(resolve => {
    setTimeout(resolve, 1000, "Success");
});
let promise3 = Promise.reject("Error 2");

Promise.any([promise1, promise2, promise3])
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.error(error);
    });

// Output:
// "Success"

/**
 * Step-by-step flow:
 *
 * promise1 → rejected ❌
 * promise2 → resolved ✅
 * promise3 → rejected ❌
 *
 * First success:
 * "Success"
 */

/**
 * Important behavior:
 *
 * If ALL promises reject:
 * - Promise.any() rejects
 * - Error type is AggregateError
 */

/* Example: All promises fail */
Promise.any([
    Promise.reject("A"),
    Promise.reject("B")
])
.catch(error => {
    console.log(error instanceof AggregateError);
    console.log(error.errors);
});

// Output:
// true
// ["A", "B"]

/**
 * Real-world use cases:
 *
 * - Multiple API fallbacks
 * - CDN or mirror servers
 * - Fastest successful response
 */

/**
 * Promise.any() vs Promise.race():
 *
 * Promise.race():
 * - First settled (resolve OR reject) wins
 *
 * Promise.any():
 * - First resolved wins
 * - Rejections are ignored
 */

/**
 * Promise.any() vs Promise.all():
 *
 * Promise.all():
 * - All must succeed
 *
 * Promise.any():
 * - Only one success needed
 */

/**
 * Final understanding:
 *
 * Promise.all()        → all must succeed
 * Promise.race()       → first finished wins
 * Promise.allSettled() → everyone reports result
 * Promise.any()        → first SUCCESS wins
 *
 * Promise.any() = "ignore failures, get first success"
 */
