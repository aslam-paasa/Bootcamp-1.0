/**
 * flatMap() in JavaScript:
 *
 * flatMap() is a combination of map() and flat().
 *
 * Simple meaning:
 * - First, it transforms each element (like map())
 * - Then, it flattens the result by ONE level (like flat(1))
 *
 * Important points:
 * 1. flatMap() always returns a NEW array.
 * 2. It does NOT change the original array.
 * 3. It only flattens ONE level (depth = 1).
 * 4. It is more efficient than using map().flat().
 */

/**
 * How flatMap() works internally:
 *
 * Step 1:
 * - Apply a function to each element (map behavior)
 *
 * Step 2:
 * - If the result is an array, spread its elements
 * - If it is a single value, push it directly
 */

/**
 * Syntax:
 * array.flatMap(callbackFunction, thisArg);
 *
 * callbackFunction(currentValue, index, array)
 *
 * thisArg (optional):
 * - Used as "this" inside the callback function.
 */

/* Simple Example */
const arr = [1, 2, 3, 4];

const result = arr.flatMap(function (x) {
    return [x * 2];
});

console.log(result);

// Output:
// [2, 4, 6, 8]

/**
 * Step-by-step flow:
 *
 * Original array:
 * [1, 2, 3, 4]
 *
 * After map step:
 * [[2], [4], [6], [8]]
 *
 * After flatten (1 level):
 * [2, 4, 6, 8]
 */

/* Step 1: Create your own flatMap() */
Array.prototype.flatMap = function (callbackFunc) {
    let newArray = [];

    for (let i = 0; i < this.length; i++) {
        let result = callbackFunc(this[i], i, this);

        if (Array.isArray(result)) {
            newArray.push(...result);
        } else {
            newArray.push(result);
        }
    }

    return newArray;
};

/* Step 2: Use flatMap() */
const nums = [1, 2, 3, 4];

const doubled = nums.flatMap(x => [x * 2]);

console.log(doubled);

// Output:
// [2, 4, 6, 8]

/**
 * Common real-world example:
 *
 * Split words into characters
 */
const words = ["hi", "bye"];

const letters = words.flatMap(word => word.split(""));

console.log(letters);

// Output:
// ["h", "i", "b", "y", "e"]

/**
 * flatMap() vs map():
 *
 * map():
 * - Returns array of arrays
 *
 * flatMap():
 * - Returns a flattened array
 */

/**
 * Final understanding:
 *
 * map()     → transform values
 * flat()    → flatten arrays
 * flatMap() → transform + flatten (1 step)
 *
 * flatMap() = "map + flat(1)"
 */
