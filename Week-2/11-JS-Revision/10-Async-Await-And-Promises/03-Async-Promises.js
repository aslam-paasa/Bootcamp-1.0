/**
 * Topics:
 * 1. Async vs Sync Functions
 * 2. Real use of callbacks
 * 3. Promises
 * 4. Async Await
 * 
 * 
 * 1. Synchronous Function :
 * => Synchronous means together, one after the other or sequential.
 * 
 * 2. Asynchronous function :
 * => Multiple things are context switching with each other.
*/ 


/** 
 * Now let's see the examples of synchronous function and asynchronous function :
 * 1. Synchronous function:
 * => Synchronous function that performs tasks sequentially
*/

function synchronous() {
    console.log('sync 1');
    console.log('sync 2');
    console.log('sync 3');
  }
  
  /**
   * Calling the synchronous function
  */
  console.log('Synchronous Function:');
  synchronous();
  console.log('Next task after synchronous function');

  
/**
 * Output:
 * => Synchronous Operation:
 *    sync 1
 *    sync 2
 *    sync 3
 * => Next task after synchronous function
*/



/**
 * 2. Asynchronous Function :
 * => Asynchronous function using a callback
 * */ 

function asynchronousOperation(callback) {
    setTimeout(function() {
      callback('Asynchronous task completed!');
    }, 2000); // Simulating a delay of 2 seconds
  }
  
  /**
   * Callback function to handle the result:
  */
  function handleAsyncResult(result) {
    console.log('Asynchronous Operation:');
    console.log(result);
    console.log('Next task after asynchronous operation');
  }
  
  /**
   * Calling the asynchronous function with a callback
  */ 
  asynchronousOperation(handleAsyncResult);


/**
 * Output :
 * => After approximately 2 seconds delay:
 * => Asynchronous Operation:
 *    Asynchronous task completed!
 *    Next task after asynchronous operation
*/


/**
 * Q. Can JS delegate? Can JS context switch?
 * => Yes! By using async functions.
 *    a. By observing the above examples we can conclude that : Even though JS is
 *       single threaded, they can do parallel things by delegating works. 
 *       By context switching - Net amount of time to do any particular task can be
 *       decreased.
 * 
 * Q. What are common async functions?
 * => a. setTimeout
 *    b. fs.readFile - to read a file from your fileSystem
 *    c. fetch - to fetch some data from API endpoint.
 * 
 * 
 * The real use of Callback functions :
 * => We use callback functions more in async functions like :
 *    1. fetching data from an API
 *    2. Event Handling
 *    3. Iteration and Control Flow
 *    4. Reading Files Asynchronously (Node.js)
 * 
 * 
 * To understand the javascript architecture and the nature of async functions :
 * => a. Write an async code and observe how the async function works :
 *       http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
 * 
 * 
 * Promises :
 * 1. Promises in JavaScript are a way to handle asynchronous operations.
 * 2. It is just a syntactic sugar which makes callback and async functions slightly
 *    more readable.
 * 3. Still uses callback under the hood.
*/


/**
 * Creating a new Promise:
*/
const fs = require('fs') //fs- File System

/**
 * Create a file with the txt extention and store some data/information in that file:
*/
function Promise(){
  return Promise((resolve)=>{
    fs.readFile('filename.txt','utf-8',(err,data)=>{
      resolve(data)
    })
  })
}
function ondone(data){
  console.log(data)
}

Promise().then(ondone)


/**
 * Async-Await :
 * a. It is also a syntactic sugar. Still uses callback/promises under the hood.
 * b. Makes code much more readable than callbacks/promises.
*/


/**
 * Example of an asynchronous function using async/await:
*/
async function myAsyncFunction() {

    let p = new Promise((resolved)=>{
      // async logic
      setTimeout(() => {
        resolved('Async operation complete!');
      }, 2000);
    })
    return p;
  }
  async function main(){
      let value= await myAsyncFunction();
      console.log(value)
  }
  main()