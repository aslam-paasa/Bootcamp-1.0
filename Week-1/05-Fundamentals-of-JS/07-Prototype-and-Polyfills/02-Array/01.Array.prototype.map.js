/**
 * How map() works in JavaScript?
 * 1. map() creates a NEW array.
 * 2. It runs a function on every element of the array.
 * 3. The value returned from the function is added to the new array.
 * 4. The original array is NOT changed.
 */

 /**
  * Callback function arguments:
  * The function passed to map() gets:
  * a. currentValue    : The current element being processed.
  * b. index (optional): The position of the current element.
  * c. array (optional): The original array on which map() was called.
  */

 /**
  * About thisValue:
  * - map() can take a second argument called 'thisValue'.
  * - This value becomes "this" inside the callback function.
  * - Most of the time, thisValue is not used.
  */

 /**
  * Syntax: array.map(callbackFunction, thisValue);
  *
  * Example:
  * array.map((value, index, array) => {
  *    return newValue;
  * });
  */

 /* Step 1: Create your own map function */
 Array.prototype.map = function (callbackFunc) {
    const newArr = [];

    for (let i = 0; i < this.length; i++) {
        newArr.push(callbackFunc(this[i], i, this));
    }

    return newArr;
};

/* Step 2: Use map */
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(function (number) {
    return number * 2;
});

console.log(doubledNumbers); // [2, 4, 6, 8, 10]
