/**
 * Consuming Promises:
 * 1. Using 'then' and 'catch':
 *    a. The 'then' method is used to handle the resolved value.
*/

const failedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Operation failed!');
    }, 1000);
  });
  

/**
 * 2. Chaining Promises:
 *    Promises can be chained using 'then'. Each 'then' returns a new
 *    promise.
*/


successfulPromise
  .then((result) => {
    console.log(result); // Output: Operation succeeded!
    return 'New value';
  })
  .then((newValue) => {
    console.log(newValue); // Output: New value
  })
  .catch((error) => {
    console.error(error);
  });


/**
 * 3. Promise All:
 *    Promise.All is used to wait for multiple promises to complete.
*/


const promise1 = Promise.resolve('One');
const promise2 = Promise.resolve('Two');

Promise.all([promise1, promise2])
  .then((values) => {
    console.log(values); // Output: ['One', 'Two']
  })
  .catch((error) => {
    console.error(error);
  });


/**
 * Promises are essential for handling asynchronous code in a clean and
 * readable way, especially when working with features like fetching
 * data from server, handling events, or working with timer.
*/