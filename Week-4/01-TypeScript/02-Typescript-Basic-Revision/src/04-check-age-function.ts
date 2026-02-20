/**
 * Q. Write a function that checks if the given age is greater than 18 and returns a boolean.
 *    a. Arguments - age
 *    b. Returns  - boolean
 *    c. Logs     - true if age is greater than 18, false otherwise
 * 
 * 1. Declare the function
 * 2. Invoke the function with different age values
*/

function isLegal(age: number): boolean {
    if (age > 18) {
        return true;
    } else { 
        return false;
    }
}

console.log(isLegal(26));
console.log(isLegal(10)); 
