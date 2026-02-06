/**
 * Class-36: Cohort-2 - Event Loop for Beginners
*/

/**
 * Javascript is single-threaded:
 * - Synchronous aka processes one operation at a time. So, it is not 
 *   multi-threaded language. 
 * - For example, we own a paper delivery business, and we wanted to deliver
 *   those papers.
 *   a. We can have a single paper delivery person.
 *      - Single threaded might take longer to deliver to all these papers,
 *        but it has less complications.
 *   b. We can have multiple paper delivery persons.
 *      - Multi-threaded might deliver the papers faster, but it has more
 *        complications.
*/

/**
 * If JS is single-threaded (synchronous), how do we do stuff like make an
 * api request and keep scrolling or clicking, and how does not are not
 * stuck waiting for the response?
 * - Because of the environment. In JS, things should block but since we
 *   are running JS in the environment, we get access to the ability to hand
 *   off all those asynchronous stuff to the environment.
 * - When we are talking about environment, we are talking about running 
 *   our JS in the browser or node.js.
 * - Eventually we run of JS in many environments, but the first environment
 *   where we are running our code in all this time was the browser. 
 * - Since our JS is running in the browser, we get access to a collection of
 *   Web APIs. These APIs are asynchronous and would normally cause blocking
 *   behavior in JS. However, JS itself doesn't handle these operations - 
 *   instead, the Web APIs handle them on our behalf. In this session, we'll
 *   explore how this process works under the hood.
*/ 

/**
 * We are going to learn:
 *   a. How to handle responses coming back from those Web APIs.
 *      - JS does this with:
 *        i. Callbacks
 *        ii. Promises
 *        iii. Async-await
*/


/**
 * Higher Order Functions:
 * - A fn can take another fn as an argument, then the parent fn is called
 *   higher order function, and the child fn is called callback function.
 * - Ex: Whenever we have created an event listener, we have created a 
 *       higher order function.
 *       - btn.addEventListener('click', callbackFn);
*/


/**
 * Callbacks: 
 * - A callback is the fn that has been passed as an argument.
 * - Callbacks are not really 'a thing' in JS, just a convention.
 * - A callback fires when 'async task' or another fn is done.
 * 
 * - Ex: Pyramid of Doom (Callback Hell)
 *       function houseOne() {
 *          setTimeout(() => {
 *              console.log('Paper delivered to house one');
 *              setTimeout(() => {
 *                  console.log('Paper delivered to house two');
 *                  setTimeout(() => {
 *                      console.log('Paper delivered to house three');
 *                  }, 3000);
 *              }, 4000);
 *          }, 5000);
 *       }
 * 
 * houseOne();
 * 
 * Q. Instead of nesting our crap inside of another crap, what if there
 *    are more readable way to handle asynchronous code?
 *    - Promises
*/


/** 
 * Promises in JavaScript:
 * 
 * What is a Promise?
 * - It's a special type of object that can hold a value in the future
 * - Used for operations like fetching data from an API or reading files
 * 
 * Three States of a Promise:
 * 1. Pending   - When the promise hasn't completed yet
 * 2. Fulfilled - When the promise completes successfully
 * 3. Rejected  - When the promise fails
 * 
 * How to Work with Promises:
 * 1. .then() method:
 *     Once the promise is fulfilled, the promise object has a value, and
 *     the .then(value) is called with the value.
 *    - Ex: .then(value)
 *          .then(data => console.log(data))
 * 
 * 2. .catch() method:
 *     Once the promise is rejected, the promise object has a reason, and
 *     the .catch(reason) is called with the reason.
 *    - Ex: .catch(error => console.log(error))
 */ 

/** 
 * Example: Fetch returns a promise
 * - fetch('https://dog.ceo/api/breeds/image/random')
 *      .then(response => response.json())            // parse the response as json
 *      .then(data => console.log(data))              // log the data
 *      .catch(error => console.log('Error:', error)) // log the error
 * 
 * Note: fetch is a Web API to do something really complex that the browser
 *       is handling for us, like going and getting some information for us.
 *       And most of our Web APIs respond with a promise, and that promise
 *       may have a value, and once that promise is resolved and it has the
 *       value, .then() method is called with the value. And if something
 *       goes wrong, then we skip the .then() method and go to the .catch()
 *       method.
*/ 

/**
 * Q. Why do you think Web APIs return promises?
 * - All these Web APIs (asyc operations) takes time, but JS can't really
 *   wait for them, so JS wants a promise to get some data in the future.
 * 
 * - Ex: Promise Chaining:
 *      
 *       a. Function-1: House One
 *       function houseOne() {
 *          return new Promise((resolve, reject) => {
 *              setTimeout(() => {
 *                  resolve('Paper delivered to house one');
 *              }, 1000);
 *          });
 *       }
 * 
 *       b. Function-2: House Two
 *       function houseTwo() {
 *          return new Promise((resolve, reject) => {
 *              setTimeout(() => {
 *                  resolve('Paper delivered to house two');
 *              }, 5000);
 *          });
 *       }
 * 
 *       c. Function-3: House Three
 *       function houseThree() {
 *          return new Promise((resolve, reject) => {
 *              setTimeout(() => {
 *                  resolve('Paper delivered to house three');
 *              }, 2000);
 *          });
 *       }
 * 
 *       houseOne()
 *            .then(data => console.log(data));
 *            .then(houseTwo)
 *            .then(data => console.log(data));
 *            .then(houseThree)
 *            .then(data => console.log(data));
 *            .catch(error => console.log(error)); 
 * 
 * What's happening here:
 * 1.Each of these functions returns a promise, so when I call houseOne(),
 *   the promise of houseOne() will resolve, and once it resolves, all the
 *   .then() starts firing one after another. 
 * 2. All these .then() are chained together, and running one after another
 *    called Promise Chaining.
 * 
 * Note: While this works, it can be hard to read. So, async/await came
 *       to make this much cleaner!
 */


/**
 * Async-Await: Promises under the hood 
 * - Syntactic sugar on top of promises, making asynchronous code easier
 *   to write and to read afterwards.
 * - Await 'waits' for an async process to complete inside an Async Fn.
 * 
 * - Ex-1: 
 *       async function getACuteDogPhoto() {
 *          const response = await fetch('https://dog.ceo/api/breeds/image/random');
 *          const data = await response.json();
 *          console.log(data);
 *       }
 * 
 *       getACuteDogPhoto();
 *   
 * Note:
 * a. The async function executes immediately when called, but the await
 *    keyword pauses the execution of async function until the Promise
 *    resolves. 
 * b. The async function continues execution only after the awaited Promise
 *    is resolved. 
 * c. This allows for sequential handling of asynchronous operations while
 *    keeping the code readable.
*/


/**
 * Try-Catch Block:
 * - Async-Await doesn't handle the errors, so we need to use try-catch block
 *   to handle the errors.
 * 
 * - Ex:
 *       async function getACuteDogPhoto() {
 *          try {
 *              const response = await fetch('https://dog.ceo/api/breeds/image/random');
 *              const data = await response.json();
 *              console.log(data);
 *          } catch (error) {
 *              console.log('Error:', error);
 *          }
 *       }
 * 
 *       getACuteDogPhoto();
*/


/**
 * Async-Await with try-catch block:
 * - Async-Await with try-catch block is the best way to handle errors.
 * 
 * - Ex-: Deliver Papers using Async-Await
 * 
 *       a. Function-1: House One
 *       function houseOne() {
 *          return new Promise((resolve, reject) => {
 *              setTimeout(() => {
 *                  resolve('Paper delivered to house one');
 *              }, 1000);
 *          });
 *       }
 * 
 *       b. Function-2: House Two
 *       function houseTwo() {
 *          return new Promise((resolve, reject) => {
 *              setTimeout(() => {
 *                  resolve('Paper delivered to house two');
 *              }, 5000);
 *          });
 *       }
 * 
 *       c. Function-3: House Three
 *       function houseThree() {
 *          return new Promise((resolve, reject) => {
 *              setTimeout(() => {
 *                  resolve('Paper delivered to house three');
 *              }, 2000);
 *          });
 *       }
 * 
 *       async function deliverPapers() {
 *          try {
 *          const houseOneWait = await houseOne()
 *          const houseTwoWait = await houseTwo()
 *          const houseThreeWait = await houseThree()
 *          console.log(houseOneWait())
 *          console.log(houseTwoWait())
 *          console.log(houseThreeWait())
 *          } catch (error) {
 *              console.log('Error:', error);
 *          }
 *       }
 * 
 *       deliverPapers();
 * 
 * How things work:
 * 1. The deliverPapers() function is marked as async (returns a promise).
 * 2. Each await statement pauses the function until that delivery is complete:
 *    a. When we call houseOne(), it returns a Promise that resolves after 
 *       1 second: 
 *       - During this 1 second, the await pauses deliverPapers()
 *       - The result is stored in houseOneWait variable
 *    b. Then houseTwo() is called, which returns a Promise that resolves 
 *       after 5 seconds:
 *       - The function pauses again for 5 seconds
 *       - The result is stored in houseTwoWait variable
 *    c. Finally houseThree() is called, which returns a Promise that 
 *       resolves after 2 seconds:
 *       - The function pauses for 2 seconds
 *       - The result is stored in houseThreeWait variable
 * 3. All these results are stored in memory until the function completes:
 *    - houseOneWait
 *    - houseTwoWait
 *    - houseThreeWait
 * 4. The total execution time is 8 seconds (1 + 5 + 2 seconds)
 * 5. This is synchronous execution - each house is delivered one after 
 *    another
 * 6. The code is more readable than promise chains (.then()) because it looks
 *    like regular synchronous code.
*/
