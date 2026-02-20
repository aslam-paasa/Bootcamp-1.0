/**
 * filter() in JavaScript:
 * > filter() is used to create a NEW array by selecting only those 
 *   elements that match a condition.
 *
 * > Simple meaning:
 *   - It checks each element
 *   - If condition is true  → element is kept
 *   - If condition is false → element is removed
 *
 * > Important points:
 *   1. filter() runs a function once for every element.
 *   2. It ALWAYS returns a new array.
 *   3. It does NOT change the original array.
 *   4. It is mostly used to:
 *      - remove unwanted data
 *      - get specific elements (even, odd, active users, etc.)
 */

/**
 * Callback function arguments:
 * The function passed to filter() gets:
 * a. currentValue    : The current element being checked.
 * b. index (optional): The position of the element.
 * c. array (optional): The original array on which filter() was called.
 *
 * Very important rule:
 * - Return true  → element will be added to new array
 * - Return false → element will be skipped
 */

/**
 * Syntax:
 * array.filter(callbackFunction, thisValue);
 *
 * Example:
 * const newArray = array.filter((value) => {
 *    return condition;
 * });
*/


/* Step 1: Create your own filter() */
Array.prototype.filter = function (callbackFunc) {
    const newArr = [];

    for (let i = 0; i < this.length; i++) {
        if (callbackFunc(this[i], i, this)) {
            newArr.push(this[i]);
        }
    }

    return newArr;
};

/* Step 2: Use filter() */
const numbers = [1, 2, 3, 4, 5];

/* Using a named function */
const isEven = function (number) {
    return number % 2 === 0;
};

const evenNumbers = numbers.filter(isEven);

console.log(evenNumbers);

// Output:
// [2, 4]

/**
 * Final understanding:
 *
 * forEach() → just loops, no return
 * map()     → transforms elements
 * filter()  → removes unwanted elements
 *
 * filter() = "keep only what you need"
 */
