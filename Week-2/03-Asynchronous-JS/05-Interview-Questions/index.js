/**
 * Theory:
 * 1. Callback
 * 2. Promises
 * 3. How asynchronous code works?
 * 4. setTimeout, setInterval
 * 5. Async-Await
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


/**
 * Code-01: 
 */
function houseOne(){
    console.log('Paper delivered to house 1')
}
function houseTwo(){
    console.log('Paper delivered to house 2')
}
function houseThree(){
    console.log('Paper delivered to house 3')
}
houseOne()
houseTwo()
houseThree()


/**
 * Code-02: 
 */
function houseOne(){
    console.log('Paper delivered to house 1')
}
function houseTwo(){
    setTimeout(() => console.log('Paper delivered to house 2'), 0)
}
function houseThree(){
    console.log('Paper delivered to house 3')
}
houseOne()
houseTwo()
houseThree()


/**
 * Code-03: 
 */
function houseOne(){
    console.log('Paper delivered to house 1')
}
function houseTwo(callback){
    setTimeout(() => {
        console.log('Paper delivered to house 2')
        callback()
    }, 3000)
}
function houseThree(){
    console.log('Paper delivered to house 3')
}
houseOne()
houseTwo(houseThree)


/**
 * Code-04: 
 */
function houseOne(){
    setTimeout(() => {
        console.log('Paper delivered to house 1')
        setTimeout(() => {
            console.log('Paper delivered to house 2')
            setTimeout(() => {
                console.log('Paper delivered to house 3')
            }, 3000)
        }, 4000)
    }, 5000)
}
houseOne()


/**
 * Code-05: 
 */
const promise = new Promise((resolve, reject) => {
    const error = false
    if(!error){
        resolve('Promise has been fullfilled')
    }else{
        reject('Error: Operation has failed')
    }
})
console.log(promise)
promise
    .then(data => console.log(data))
    .catch(err => console.log(err))


/**
 * Code-06: 
 */
function houseOne(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Paper delivered to house 1')
        }, 1000)
    })
}
function houseTwo(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Paper delivered to house 2')
        }, 5000)
    })
}
function houseThree(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Paper delivered to house 3')
        }, 2000)
    })
}

// Promise Chaining
houseOne()
    .then(data => console.log(data))
    .then(houseTwo)
    .then(data => console.log(data))
    .then(houseThree)
    .then(data => console.log(data))
    .catch(err => console.log(err))


/**
 * Code-07: 
 */
function houseOne(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Paper delivered to house 1')
        }, 1000)
    })
}
function houseTwo(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Paper delivered to house 2')
        }, 5000)
    })
}
function houseThree(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Paper delivered to house 3')
        }, 2000)
    })
}

async function getPaid(){
    const houseOneWait = await houseOne()
    const houseTwoWait = await houseTwo()
    const houseThreeWait = await houseThree()
    console.log(houseOneWait)
    console.log(houseTwoWait)
    console.log(houseThreeWait)
}

getPaid()


/**
 * Ques 1: What's the output?
 * - Output:
 *   - start
 *   - 1
 *   - end
 *   - 2
*/

console.log('start');

const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
});

promise1.then(res => {
    console.log(res);
});

console.log('end');



/**
 * Ques 2: What's the output?
 * - Output:
 *   - start
 *   - 1
 *   - 3
 *   - end
 *   - 2
*/

console.log('start');

const promise2 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
    console.log(3);
});

promise2.then(res => {
    console.log(res);
});

console.log('end');


/**
 * Ques 3: What's the output?
 * - Output:
 *   - start
 *   - 1
 *   - 3
 * 
 * Note: promise didn't went to the .then() method because it didn't have
 *       any resolve or reject.
*/

console.log('start');

const promise3 = new Promise((resolve, reject) => {
    console.log(1);
    console.log(3);
});

promise3.then(res => {
    console.log('Result: ' + res);
});

console.log('end');


/**
 * Ques 4: What's the output?
 * - Output:
 *   - start
 *   - middle
 *   - 1
 *   - end
 *   - success
*/

console.log('start');

const fn = () => 
    new Promise((resolve, reject) => {
        console.log(1);
        resolve('success');
    });

console.log('middle');

fn().then(res => {
    console.log(res);
});

console.log('end');



/**
 * Ques 5: What's the output?
 * - Output:
 *   - Error
 *   - Success 4 (because of .then() method)
 * 
 * Note: .then() method is called even after the error because it is a
 *       promise chain.
*/

function job() {
    return new Promise(function(resolve, reject) {
        reject();
    });
}

let promise5 = job();

promise5
    .then(function() {
        console.log('Success 1');
    })
    .then(function() {
        console.log('Success 2');
    })
    .then(function() {
        console.log('Success 3');
    })
    .catch(function() {
        console.log('Error');
    })
    .then(function() {
        console.log('Success 4');
    });


/**
 * Ques 5: What's the output?
 * - Output:
 *   - success
 *   - error
 *   - Error Caught
*/

function job(state) {
    return new Promise(function(resolve, reject) {
        if(state) {
            resolve('Success');
        } else {
            reject('Error');
        }
    });
}

let promise6 = job(true);

promise6
    .then(function(data) {
        console.log(data);

        return job(false);
    })
    .catch(function(error) {
        console.log(error);

        return 'Error Caught';
    })
    .then(function(data) {
        console.log(data);

        return job(true);
    })
    .catch(function(error) {
        console.log(error);
    });


/**
 * Ques 6: What's the output?
 * - Output:
 *   - success
 *   - Defeat
 *   - error
 *   - Error Caught
 *   - Success: test
*/

function job(state) {
    return new Promise(function(resolve, reject) {
        if(state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}

let promise7 = job(true);

promise7
    .then(function(data) {
        console.log(data); 

        return job(true); // success
    })
    .then(function(data) {
        if(data !== 'victory') {
            throw 'Defeat'; // Defeat
        }

        return job(true);   // skip
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error);
        return job(false); // error
    })
    .then(function(data) {
        console.log(data);
        return job(true);
    })
    .catch(function(error) {
        console.log(error);
        return 'Error caught'; // Error caught
    })
    .then(function(data) {
        console.log(data);
        return new Error('test'); // not returning a promise
    })
    .then(function(data) {
        console.log('Success:', data.message);
    })
    .catch(function(error) {
        console.log('Error:', error.message);
    });


/**
 * Ques 8: What's the output? (Promise chaining)
 * - Output: First!
*/

const firstPromise = new Promise((resolve, reject) => {
    resolve('First!');
});

const secondPromise = new Promise((resolve, reject) => {
    resolve(firstPromise);
});

secondPromise
    .then(res => {
        return res;
    })
    .then(res => {
        console.log(res);
    });


/**
 * Ques 9: Rewrite this example code using async/await instead of .then()
*/

async function loadJson(url) {
    let response = await fetch(url);

    if(response.status === 200) {
        let json = await response.json();
        return json;
    } else {
        throw new Error(response.status);
    }

    // return fetch(url).then((response) => {
    //     if(response.status === 200) {
    //         return response.json();
    //     } else {
    //         throw new Error(response.status);
    //     }
    // });
}

loadJson('https://fakeurl.com/no-such-user.json')
    .catch(err => console.log(err));
