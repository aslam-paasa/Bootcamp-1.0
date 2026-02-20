/**
 * Async-Await:
 * 1. What is async?
 * 2. What is await?
 * 3. How async works behind the scenes?
 * 4. Examples of using async/await
 * 5. Error Handling
 * 6. Interviews
 * 7. Async await vs Promise.then/.catch 
*/

/**
 * 1. What is Async?
 * 2. What are Async functions?
 * => Async is a keyword that is used before a function to create a async function.
 * 
 *    async function getData() {
 *       write logic
 *    }
 * 
 * 3. How it is different than a normal function?
 * => Async functions always returns a promise.
 * => There are two cases:
 * 
 * Case-1: When we will write a return keyword inside async function, either we return
 *         a promise from here that will be a valid async function.
 * 
*/

const p = new Promise((resolve, reject) => {
    resolve("Promise Resolved Value!!"); 
});

/**
 * Q. If we return this promise "p" from here, what actually will happen?
 * Q. Will this promise be wrapped inside another promise and will returned?
 * => No! If this return value is already a promise then it will not wrap inside
 *    a promise, it will be returned as it is.
*/

async function getData1() {
    return p;
}

/**
 * When dataPromise1 is called, it will directly return that "p". This "p" will get
 * inside dataPromise1 and if we do dataPromise1.then(), it is exactly like doing 
 * "p.then()" because dataPromise1 is "p" and it return "Promise Resolved Value!!". 
*/

const dataPromise1 = getData1();
dataPromise1.then((res) => console.log(res)); // Promise Resolved Value!!


/**
 * Case-2: Or if we don't return a promise from here means suppose if we return a 
 *         value which is a non-promise value, what this function will do?
 *         => It will basically take this value, wrap it inside a promise and return it.
*/
    
/**
 * Always returns a promise:
*/
async function getData2() {
    return "Namaste";
}

/**
 * Calling this promise :
*/
const dataPromise2 = getData2();
console.log(dataPromise2);  // Promise { 'Namaste' }

/**'
 * Once we take this data out, this "res" will be actual "namaste":
*/
dataPromise2.then(res => console.log(res));
