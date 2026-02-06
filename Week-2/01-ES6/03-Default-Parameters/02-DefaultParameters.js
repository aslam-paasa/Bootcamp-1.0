/**
 * What will be the output? Will we get an error?
*/

/**
 * 1. Function with Default Parameters:
*/
const defaultExample3 = (a, b = 5, c) => a + b + c;
console.log(defaultExample3(1,2,3));

/**
 * Understanding:
 * - The function defaultExample3 has three parameters: a, b, and c.
 * - When we call defaultExample3(1, 2, 3), all three parameters are 
 *   provided: a = 1, b = 2, and c = 3.
 * - So, the function computes 1 + 2 + 3 = 6, which is the expected output.
*/


/**
 * 2. Invalid Function Call with Missing Argument:
*/

// console.log(defaultExample3(1, , 3)); // Syntax Error

/**
 * Understanding:
 * - In JS, a command without a value is not allowed.
 * - defaultExample3(1, , 3) has a missing value between 1 and 3 (i.e.,
 *   there's a comma but no value for b).
 * - This results in a Syntax Error because JavaScript cannot interpret
 *   the empty space as a valid argument.
*/

/**
 * 3. Using undefined to Trigger Default Parameter:
*/

console.log(defaultExample3(1, undefined, 3)); // Output: 9

/**
 * Understanding:
 * - By passing undefined explicitly for b, we tell JavaScript to use 
 *   the default value for b (which is 5).
 * - So the function computes 1 + 5 + 3 = 9, and we get the expected 
 *   result.
*/