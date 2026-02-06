/**
 * forEach() in JavaScript:
 *
 * forEach() is used to run a function on each element of an array.
 *
 * Important points:
 * 1. forEach() runs a function once for every element.
 * 2. It does NOT return a new array.
 * 3. It is mostly used for side effects like:
 *    - logging
 *    - updating variables
 *    - calling APIs
 * 4. The original array is NOT changed automatically.
 */

 /**
  * Callback function arguments:
  * The function passed to forEach() gets:
  *
  * a. currentValue
  *    - The current element being processed.
  *
  * b. index (optional)
  *    - The position of the element.
  *
  * c. array (optional)
  *    - The original array on which forEach() was called.
  */

 /**
  * Syntax:
  * array.forEach(callbackFunction, thisValue);
  *
  * Example:
  * array.forEach((value, index) => {
  *    console.log(value, index);
  * });
  */

 /* Step 1: Create your own forEach */
 Array.prototype.forEach = function (callbackFunc) {
    for (let i = 0; i < this.length; i++) {
        callbackFunc(this[i], i, this);
    }
};

/* Step 2: Use forEach */
const numbers = [1, 2, 3, 4, 5];

/* Using a named function */
const printNums = function (number, index) {
    console.log(`Element ${number} is at index ${index}`);
};

numbers.forEach(printNums);

// Output:
// Element 1 is at index 0
// Element 2 is at index 1
// Element 3 is at index 2
// Element 4 is at index 3
// Element 5 is at index 4