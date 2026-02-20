/**
 * reduceRight() in JavaScript:
 *
 * reduceRight() works exactly like reduce(),
 * but it processes the array from RIGHT to LEFT.
 *
 * Simple meaning:
 * - It combines all array elements into ONE single value
 * - But starts from the last element instead of the first
 *
 * Important points:
 * 1. reduceRight() runs a function once for every element.
 * 2. It returns ONE single value.
 * 3. It does NOT change the original array.
 * 4. The main difference from reduce() is:
 *    - reduce()      → left to right
 *    - reduceRight() → right to left
 */

/**
 * Callback function arguments:
 * The function passed to reduceRight() gets:
 *
 * a. accumulator
 *    - Stores the result of previous step.
 *    - Keeps updating after every iteration.
 *
 * b. currentValue
 *    - The current element being processed (from right side).
 *
 * c. index (optional)
 *    - The index of the current element.
 *
 * d. array (optional)
 *    - The original array on which reduceRight() was called.
 *
 * Very important:
 * - Whatever you return becomes the NEW accumulator value.
 */

/**
 * Syntax:
 * array.reduceRight(callbackFunction, initialValue);
 *
 * callbackFunction(accumulator, currentValue, index, array)
 *
 * initialValue:
 * - Starting value of accumulator.
 * - If NOT provided:
 *   → last array element becomes accumulator
 *   → loop starts from second last element
 */

/* Step 1: Create your own reduceRight() */
Array.prototype.reduceRight = function (callbackFunc, initialVal) {
    let accumulator = initialVal;

    for (let i = this.length - 1; i >= 0; i--) {
        if (accumulator === undefined) {
            accumulator = this[i];
        } else {
            accumulator = callbackFunc(accumulator, this[i], i, this);
        }
    }

    return accumulator;
};

/* Step 2: Use reduceRight() */
const numbers = [1, 2, 3, 4, 5];

/* Using a named function */
const sumFn = function (accumulator, currentValue) {
    return accumulator + currentValue;
};

const total = numbers.reduceRight(sumFn, 0);

console.log(total);

// Output:
// 15

/**
 * Step-by-step flow (Right to Left):
 *
 * Initial accumulator = 0
 *
 * Step 1: 0 + 5 = 5
 * Step 2: 5 + 4 = 9
 * Step 3: 9 + 3 = 12
 * Step 4: 12 + 2 = 14
 * Step 5: 14 + 1 = 15
 *
 * Final result → 15
 */

/**
 * reduce() vs reduceRight():
 *
 * reduce():
 * - Starts from index 0
 * - Moves left → right
 *
 * reduceRight():
 * - Starts from last index
 * - Moves right → left
 *
 * Output can be same for addition,
 * but DIFFERENT for strings, arrays, and objects.
 */

/**
 * Final understanding:
 *
 * forEach()    → just loops
 * map()        → transforms elements
 * filter()     → removes unwanted elements
 * reduce()     → combines left to right
 * reduceRight()→ combines right to left
 *
 * reduceRight() = "many → one (from right side)"
 */
