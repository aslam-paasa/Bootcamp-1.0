/**
 * Promises:
 * Promises are a JavaScript feature that provides a more structured
 * and readable way to work with asynchronous code. They represent the
 * eventual completion or failure of a asynchronous operation, allowing
 * you to handle the result or error in a more organized and manageable
 * manner.
 * */ 

/**
 * Key Charactertistics of Promises:
 * 1. Asynchronous Operations:
 *    Promises are commonly used to handle asynchronous operations, such
 *    as fetching data from a server, reading a file, or executing a timer.
 * 
 * 2. States:
 *    A promises can be of three states:
 *    (a) Pending: The initial state, before the promise is resolved or
 *        rejected.
 *    (b) Fulfilled(Resolved): The operation completed successfully,
 *        and the promise has a resulting value.
 *    (c) Rejected: There was an error during the operation, and the
 *        promise has a reason for the failure.
 * 
 * 3. Chaining:
 *    Promises support chaining through the 'then' method, allowing
 *    you to sequence asynchronous operations in a readable manner.
 * 
 * 4. Error Handling:
 *    Promises have a built-in error handling through the 'catch' method,
 *    making it easier to manage and propagate errors in asynchronous code.
*/

/**
 * Q. Why do we need promises?
 * 1. Avoiding Callback Hell(Callback Pyramids):
 *    Promises helps to mitigate the problem of callback hell, where
 *    nesting callbacks leads to unreadable and hard-to-maintain code.
*/


// Without Promises
asyncOperation1((result1) => {
    asyncOperation2(result1, (result2) => {
      asyncOperation3(result2, (result3) => {
        // ...
      });
    });
  });
  
// With Promises
asyncOperation1()
    .then((result1) => asyncOperation2(result1))
    .then((result2) => asyncOperation3(result2))
    .then((result3) => {
      // ...
});
  
/**
 * 2. Sequential Execution of Asynchronous Code:
 *    Promises provide a clean way of execute asynchronous operations
 *    sequentially, improving code readability.
*/


// Without Promises
asyncOperation1((result1) => {
    asyncOperation2(result1, (result2) => {
      asyncOperation3(result2, (result3) => {
        // ...
      });
    });
  });
  
  // With Promises
  asyncOperation1()
    .then((result1) => asyncOperation2(result1))
    .then((result2) => asyncOperation3(result2))
    .then((result3) => {
      // ...
    });
  
/**
 * 3. Error Handling:
 *    Promises simplify error handling by providing a centralized
 *    'catch' block to handle errors for a sequence of asynchronous
 *    operations.
 * */  


asyncOperation1()
  .then((result1) => asyncOperation2(result1))
  .then((result2) => asyncOperation3(result2))
  .catch((error) => {
    console.error('An error occurred:', error);
  });


/**
 * 4. Promise.all for Parallel Execution:
 *    Promises offer the 'Promise.all' method, allowing parallel
 *    execution of multiple asynchronous operations and waiting for
 *    all of them to complete.
*/


const promise1 = asyncOperation1();
const promise2 = asyncOperation2();

Promise.all([promise1, promise2])
  .then((results) => {
    const result1 = results[0];
    const result2 = results[1];
    // ...
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });


/**
 * Summary:
 * In summary, promises provide a cleaner and more organized way to
 * work with asynchronous code, making to easier to read, write and
 * maintain. They address common challenges associated with callback
 * based code and promote better error handling and sequential execution
 * of asynchronous operations.
*/