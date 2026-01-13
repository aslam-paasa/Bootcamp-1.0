/**
 * Default Parameters:
 * - In JS, you can provide default values for function parameters.
 * - If a parameter is not provided when the function is called, JS
 *   will use the default value instead.
*/

/**
 * What will be the output? And Why?
*/

const defaultExample = (a, b) => a + b;
console.log(defaultExample(2)); // Output: NaN

/**
 * Understanding:
 * - Output: NaN
 * - The reason is that in the code, the 'defaultExample' function is 
 *   defined with two parameters, 'a' and 'b'. However, when we call the
 *   function with 'console.log(defaultExample(2))', we are only 
 *   providing a single argument '2', so 'b' is undefined.
 * - When you try to add an undefined value to a number, JavaScript 
 *   returns NaN (Not-a-Number).
 * - So, how can you make sure if the value of 'b' is not provided by 
 *   the user, 'b' will have a default value?
 * 
*/


/**
 * Adding Default Parameters:
 * - To avoid this, you can set a default value for 'b' if it's not
 *   provided. There are two ways to do it:
 *   a. Checking Manually Inside the Function
 *   b. Using Default Parameters Directly in the Function Declaration
*/

/**
 * 1. Checking Manually Inside the Function:
*/
const defaultExample1 = (a,b) => {
    if(b === undefined) {
        b = 5; // Set default value manually
    }
    return a + b;
};
console.log(defaultExample1(2, 4)); // 6 (using b = 4)
console.log(defaultExample1(3));    // 8 (b defaults to 5)


/**
 * 2. Using Default Parameters Directly in the Function Declaration:
*/

const defaultExample2 = (a, b = 5) => a + b;

console.log(defaultExample2(3));  // 8 (b defaults to 5)
console.log(defaultExample2(2, 4)); // 6 (using b = 4)


/**
 * Why is defaultExample2 better?
 * a. Concise & Easy to Read: 
 *    You can directly define the default value in the function signature.
 * b. No Manual Checks: 
 *    No need for if statements or extra logic inside the function.
*/