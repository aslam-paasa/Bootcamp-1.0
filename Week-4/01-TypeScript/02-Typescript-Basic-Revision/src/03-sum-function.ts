/**
 * Q. How to assign a return type to a function.
 *    1. Write a function that calculates the sum of two numbers.
 *       a. Arguments - a, b
 *       b. Returns  - number
 *       c. Logs     - sum of a and b
 *   2. Declare the function
 *   3. Invoke the function with two numbers
*/


function sum(a: number, b: number): number {
    return a + b;
}

let ans: number = sum(15, 30);

console.log(ans); 
