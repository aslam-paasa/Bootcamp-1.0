/**
 * const Vs var:
*/

/**
 * Reassigning a const Variable (Error):
 * Q. Output and why?
*/
const tanay = 2;
tanay = 3; // Error: Assignment to constant variable.

/**
 * Understanding :
 * - Error! You cannot reassign a variable declared with const. 
 * - Once a value is assigned to a const variable, it cannot be changed.
 * - In this case, you're trying to reassign the value of tanay from 2 
 *   to 3, which is not allowed.
 * - This code will result in an error because "const" declarations are
 *   read-only and cannot be reassigned. It will throw a "TypeError".
*/

/**
 * What is the difference between typeError and reference Error?
 * 1. TypeError: 
 *    - This error occurs when an operation or function is performed
 *      on a value of the wrong type. 
 *    - Example: Trying to call a method on a value that is not a fn.
 *      let x = 5;
 *      x();
 * 
 * 2. ReferenceError:
 *    - This error occurs when trying to access a variable that doesn't
 *      exist in the current scope(i.e. it hasn't been declared).
 *    - Example: Using a variable that has not been declared or is out
 *      of scope.
 *      console.log(a); // ReferenceError: a is not defined
*/