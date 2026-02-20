/**
 * Promise Utility APIs:
 * - Promise APIs are very helpful when we are building our day-to-day 
 *   application. 
 * - When we are developing a react project, we came to a situation where 
 *   we have to make parallel API calls and that is where we use promise APIs.
*/


/**
 * 1. Promise.all():
 *    a. Use Case: You want to run multiple promises in parallel and continue
 *       only if all succeed.
 *    b. Key Rules:
 *       - Accepts an array of promises
 *       - Waits for all to succeed.
 *       - Fails immediately if one fails.
 *       - Returns an array of results in order of input promises.
 *    c. Time:
 *       - Slowest promise determines total time.
 *    d. Example:
 *       - Promise.all([p1, p2, p3])
 *       - p1: 3s, p2: 1s, p3: 2s
 *       - Output: [val1, val2, val3] after 3s
*/

const p1 = new Promise((res) => setTimeout(() => res("P1 success"), 3000));
const p2 = new Promise((res) => setTimeout(() => res("P2 success"), 1000));
const p3 = new Promise((res) => setTimeout(() => res("P3 success"), 2000));

Promise.all([p1, p2, p3])
  .then((results) => console.log("All Success:", results))
  .catch((err) => console.log("One Failed:", err));


/**
 * If one fails:
*/
const p4 = new Promise((res) => setTimeout(() => res("P4 success"), 3000));
const p5 = new Promise((_, rej) => setTimeout(() => rej("P5 failed"), 1000));
const p6 = new Promise((res) => setTimeout(() => res("P6 success"), 2000));

Promise.all([p4, p5, p6])
  .then((results) => console.log("All Success:", results))
  .catch((err) => console.log("One Failed:", err));



/**
 * 2. Promise.allSettled():
 *    a. Use Case: You want to know the result of every promise, whether it
 *       succeeded or failed.
 *    b. Key Rules:
 *       - Accepts an array of promises
 *       - Waits for all to settle (resolve/reject)
 *       - Always returns an array of { status, value/reason }
 *    c. Time:
 *       - Slowest promise determines total time.
*/

const p7 = new Promise((res) => setTimeout(() => res("P7 success"), 3000));
const p8 = new Promise((_, rej) => setTimeout(() => rej("P8 failed"), 1000));
const p9 = new Promise((res) => setTimeout(() => res("P9 success"), 2000));

Promise.allSettled([p7, p8, p9]).then((results) => {
  console.log("All Results:", results);
});

/**
 * Output after 3 seconds:
 * [
 *   { status: 'fulfilled', value: 'P7 success' },
 *   { status: 'rejected', reason: 'P8 failed' },
 *   { status: 'fulfilled', value: 'P9 success' }
 * ]
*/



/**
 * 3. Promise.race():
 *    a. Use Case: You care about only the first promise to settle, success
 *       or failure.
 *    b. Key Rules:
 *       - Returns the result of the first settled promise.
 *       - Doesn't wait for the others.
 *       - If the first promise fails, it will return the error.
 *    c. Time:
 *       - Fastest promise determines total time.
 *    d. Example:
 *       - Promise.race([p1, p2, p3])
 *       - p1: 3s, p2: 1s, p3: 2s
 *       - Output: 'P2 success' after 1s
*/

const p10 = new Promise((res) => setTimeout(() => res("P10 success"), 3000));
const p11 = new Promise((res) => setTimeout(() => res("P11 success"), 1000));
const p12 = new Promise((res) => setTimeout(() => res("P12 success"), 2000));

Promise.race([p10, p11, p12])
  .then((result) => console.log("Race Winner:", result))
  .catch((err) => console.log("Race Error:", err));


/**
 * First One Fails:
*/

const p13 = new Promise((_, rej) => setTimeout(() => rej("P13 failed"), 1000));
const p14 = new Promise((res) => setTimeout(() => res("P14 success"), 2000));

Promise.race([p13, p14])
  .then((res) => console.log("Race Result:", res))
  .catch((err) => console.log("Race Error:", err));

/**
 * Output after 1 second:
 * - Race Error: P13 failed
*/


/**
 * 4. Promise.any():
 *    a. Use Case: You want only the first successful promise and want to ignore
 *       the failures.
 *    b. Key Rules:
 *       - Returns the first successful result.
 *       - If all fail, returns an AggregateError.
 *    c. Time:
 *       - Fastest success determines total time.
 *    d. Example:
 *       - Promise.any([p1, p2, p3])
 *       - p1: 3s, p2: 1s, p3: 2s
 *       - Output: 'P2 success' after 1s
*/

const p15 = new Promise((_, rej) => setTimeout(() => rej("P15 failed"), 1000));
const p16 = new Promise((res) => setTimeout(() => res("P16 success"), 2000));
const p17 = new Promise((res) => setTimeout(() => res("P17 success"), 3000));

Promise.any([p15, p16, p17])
  .then((res) => console.log("First Success:", res))
  .catch((err) => console.log("All Failed:", err));


/**
 * All fail:
*/

const p18 = new Promise((_, rej) => setTimeout(() => rej("P18 failed"), 1000));
const p19 = new Promise((_, rej) => setTimeout(() => rej("P19 failed"), 2000));

Promise.any([p18, p19])
  .then((res) => console.log("First Success:", res))
  .catch((err) => console.log("All Failed:", err.errors));


/**
 * Output after 2 seconds:
 * - All Failed: [ 'P18 failed', 'P19 failed' ]
*/
