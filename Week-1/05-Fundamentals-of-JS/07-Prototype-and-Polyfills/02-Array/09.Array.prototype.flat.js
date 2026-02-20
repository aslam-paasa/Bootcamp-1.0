/**
 * flat() in JavaScript:
 *
 * flat() is used to convert a nested (multi-level) array
 * into a single-level array.
 *
 * Simple meaning:
 * - It removes nested arrays
 * - It brings inner elements to the top level
 *
 * Important points:
 * 1. flat() returns a NEW array.
 * 2. It does NOT change the original array.
 * 3. It flattens the array up to a given depth.
 * 4. Default depth is 1.
 */

/**
 * Syntax:
 * array.flat(depth);
 *
 * depth (optional):
 * - How deep the flattening should go.
 * - Default value is 1.
 */

/* Simple Example */
const arr = [1, 2, [3, 4, [5, 6]]];

const flattened = arr.flat(2);

console.log(flattened);

// Output:
// [1, 2, 3, 4, 5, 6]

/**
 * Step-by-step flow:
 *
 * Original array:
 * [1, 2, [3, 4, [5, 6]]]
 *
 * flat(1):
 * [1, 2, 3, 4, [5, 6]]
 *
 * flat(2):
 * [1, 2, 3, 4, 5, 6]
 */

/**
 * If depth is not provided:
 *
 * arr.flat()
 * → depth = 1 by default
 */

/* Step 1: Create your own flat() */
Array.prototype.flat = function (depth) {
    let flattenDepth = depth === undefined ? 1 : Math.floor(depth);

    if (flattenDepth < 1) {
        return this.slice();
    }

    return this.reduce(function (acc, val) {
        if (Array.isArray(val)) {
            acc = acc.concat(val.flat(flattenDepth - 1));
        } else {
            acc.push(val);
        }
        return acc;
    }, []);
};

/* Step 2: Use flat() */
const nums = [1, 2, [3, 4, [5, 6]]];

const result = nums.flat(2);

console.log(result);

// Output:
// [1, 2, 3, 4, 5, 6]

/**
 * Common use cases:
 *
 * - Clean API response data
 * - Flatten nested arrays
 * - Use before map(), filter(), reduce()
 */

/**
 * flat() vs flatMap():
 *
 * flat():
 * - Only flattens arrays
 *
 * flatMap():
 * - Transforms + flattens (1 level)
 */

/**
 * Important note:
 *
 * flat() performs a shallow flatten.
 * It does NOT clone objects inside arrays.
 */

/**
 * Final understanding:
 *
 * map()     → transform values
 * filter()  → select values
 * reduce()  → combine values
 * flat()    → remove nesting
 * flatMap() → transform + flatten
 *
 * flat() = "nested → single level"
 */
