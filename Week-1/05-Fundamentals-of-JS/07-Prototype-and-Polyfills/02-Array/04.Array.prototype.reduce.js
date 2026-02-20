/**
 * reduce() in JavaScript:
 * > reduce() is used to combine all elements of an array 
 *   (from left to right) into ONE single value.
 * 
 * Simple meaning:
 * - It takes many values
 * - Step by step combines them
 * - And returns ONE final result
 * 
 * Here's how it works:
 * 1. It applies a function against an accumulator and each element 
 *    in the array to reduce it to a single value.
 * 2. The provided function is called with four arguments: 
 *    a. the accumulator, 
 *    b. the current element, 
 *    c. the index of the current element, and 
 *    d. the array reduce() was called upon.
 *
 * That final result can be:
 * - a number (sum, product)
 * - a string
 * - an object
 * - an array
 *
 * Important points:
 * 1. reduce() runs a function once for every element.
 * 2. It returns ONE single value.
 * 3. It does NOT change the original array.
 * 4. It is commonly used for:
 *    - sum of numbers
 *    - total price
 *    - counting items
 *    - building objects or arrays
 */

/**
 * Callback function arguments:
 * > The function passed to reduce() gets:
 * 
 *   a. accumulator
 *      - Stores the result of previous step.
 *      - This value keeps growing step by step.
 *  
 *   b. currentValue
 *      - The current element being processed.
 *  
 *   c. index (optional)
 *      - The position of the element.
 *  
 *   d. array (optional)
 *      - The original array on which reduce() was called.
 *
 * Very important:
 * - Whatever you return becomes the NEW accumulator value.
 */

/**
 * Syntax:
 * > array.reduce(callbackFunction, initialValue);
 *   a. callbackFunction(accumulator, currentValue, index, array)
 *   b. initialValue:
 *      - Starting value of accumulator.
 *      - If NOT provided:
 *        → first array element becomes accumulator
 *        → loop starts from second element
 */

/* Step 1: Create your own reduce() */
Array.prototype.reduce = function (callbackFunc, initialVal) {
    let accumulator = initialVal;

    for (let i = 0; i < this.length; i++) {
        if (accumulator === undefined) {
            accumulator = this[i];
        } else {
            accumulator = callbackFunc(accumulator, this[i], i, this);
        }
    }

    return accumulator;
};

/* Step 2: Use reduce() */
const numbers = [1, 2, 3, 4, 5];

/* Using a named function */
const sumFn = function (accumulator, currentValue) {
    return accumulator + currentValue;
};

const total = numbers.reduce(sumFn, 0);

console.log(total);

// Output:
// 15

/**
 * Step-by-step flow:
 *
 * Initial accumulator = 0
 *
 * Step 1: 0 + 1 = 1
 * Step 2: 1 + 2 = 3
 * Step 3: 3 + 3 = 6
 * Step 4: 6 + 4 = 10
 * Step 5: 10 + 5 = 15
 *
 * Final result → 15
 */

/**
 * Final understanding:
 *
 * forEach() → just loops
 * map()     → transforms elements
 * filter()  → removes unwanted elements
 * reduce()  → combines everything into ONE value
 *
 * reduce() = "many → one"
 */
