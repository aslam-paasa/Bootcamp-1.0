/**
 * if-else vs Ternary Operator in JS:
*/

/**
 * What's the difference?
 * a. if-else Statements:
 *    - thoda long form hota hai.
 *    - tmhare paas complex logic, ya multiple branches ho (if, else-if, else)
 *      tab if-else ka use better hai.
 *    - Ex:
 *          if(condition) {
 *              // code
 *          } else {
 *              // code
 *          }
 * 
 * b. Ternary Operator ( ? : )
 *    - Ek short-hand way hai if-else likhne ka.
 *    - Tabhi use karo jb tumhara logic simple one-liner ho.
 *    - Ex:
 *          let result = (condition) ? (true) : (false)
 * 
*/

/**
 * Example-1: Basic Condition
*/
let y = (10 > 5) ? 10 : 7;
console.log(y); // Output: 10


/**
 * Example-2: Another Similar Example
*/
let x = (10 > 5) ? 10 : 7;
console.log(x); // Output: 10


/**
 * Example-3: Ternary with an expression
*/
let a = (true) ? (2 + 3) : (2 - 3);
console.log(a); // Output: 5


/**
 * Example-4: Ternary with pre-increment
*/
let c = 10;
let b = (3 < 1) ? (2 - 3) : (++c);
console.log(b); // Output: 11
