/**
 * Callbacks:
 * Q. Where have you seen callbacks?
 * => 1. Event Listener
 *    2. Array Method
 *    3. Fetch()
 *    4. HOF (Map, Reduce, Filter)
 * 
 * => Callback is a fn which is passed inside another fn as an argument.
 *    And the passed fn, we can execute it later whenever we need to execute.
 * 
 * numbers.map(( ) => {})
 *              |
 *              V
 * Passing the fn as an argument
 * 
 * 1. const printName = name => console.log(name);
 * 2. ["tanay", "tanvi"].map(printName);
 *    (a) printName("tanay");
 *    (b) printName("tanvi");
*/

function greet(name, callback) {
    console.log(`Hello ${name}`);
    callback();
}

function afterGreet() {
    console.log("How are you?");
}

greet("Alice", afterGreet)


/**
 * Q1. Write a function strLength() which takes:
 *     (a) Your name
 *     (b) A function that it will call with the length of your name
 * 
 * => Now, call this function with the two parameters:
 *    (a) Your name. This is simple
 *    (b) A function: This function will get the length of the string.
 *        Means passing each element into the function that user has
 *        defined, as explained above. And use that length to print a
 *        message:
 *        "OMG! my name is X char long!"
*/

/**
 * Way-1: Callback - Passing fn as an argument
*/
const strLength = (name, callbackFn) => callbackFn(name.length);
strLength("tanay", (lengthOfName) => console.log(`OMG! my name is ${lengthOfName} char long!`));

/**
 * Way-2: Callback - Passing fn as an argument
*/
const printName = (lengthOfName) => console.log(`OMG! my name is ${lengthOfName} char long!`);
strLength("tanay", printName);



/**
 * Explanation:
 * When you're designing your API. A callback is nothing but a function
 * that the user of your API will give you. In return, you give your
 * user a 'contract' saying that you'll call her function with X data.
 * 
 * Contract basically means If I ask for this, you give me this.
 * For example, if you ask you mom for more money, she will give you
 * chappal. So, that's a contract, and if we have a contract defined
 * then we behave in that manner only.
 * 
 * Understand that this data can be calculated synchronously or in an
 * asynchronous manner. It doesn't matter as long as you give that data. 
*/