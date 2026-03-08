/**
 * 1. Creating a Promise:
 *    a. A promise represents the eventual completion or failure of an
 *       asynchronous operation.
 *    b. The 'Promise' constructor takes a function with two parameters:
 *       i. resolve
 *       ii. reject     
 * */ 


const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation goes here
    // If successful, call resolve with the result
    // If there's an error, call reject with the error
  });
  

/**
 * 2. Resolving a Promise:
 *    a. Use the 'resolve' function when the asynchronous operation is
 *       successful.
*/

const successfulPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Operation succeeded!');
    }, 1000);
  });
  

/**
 * 3. Rejecting a Promise:
 *    a. Use the 'reject' function when there's an error during the
 *       asynchronous operation.
*/

const failedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Operation failed!');
    }, 1000);
  });