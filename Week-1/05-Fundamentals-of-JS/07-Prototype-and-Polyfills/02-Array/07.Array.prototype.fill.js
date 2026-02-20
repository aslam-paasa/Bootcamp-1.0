/**
 * fill() in JavaScript:
 *
 * fill() is used to replace elements of an array
 * with a single static value.
 *
 * Simple meaning:
 * - It fills part (or all) of an array with one value
 * - It CHANGES the original array
 *
 * Important points:
 * 1. fill() modifies the original array.
 * 2. It does NOT create a new array.
 * 3. It replaces values from start index to end index.
 * 4. End index is NOT included.
 * 5. It returns the modified array.
 */

/**
 * Syntax:
 * array.fill(value, start, end);
 *
 * Parameters:
 *
 * value:
 * - The value that will replace existing elements.
 *
 * start (optional):
 * - Index to start filling from.
 * - Default is 0.
 *
 * end (optional):
 * - Index to stop filling (exclusive).
 * - Default is array.length.
 */

/* Simple Example */
const arr = [1, 2, 3, 4, 5];

arr.fill(0, 2, 4);

console.log(arr);

// Output:
// [1, 2, 0, 0, 5]

/**
 * Step-by-step flow:
 *
 * Original array:
 * [1, 2, 3, 4, 5]
 *
 * fill(0, 2, 4):
 * - Start index = 2
 * - End index   = 4 (not included)
 *
 * Index 2 → replaced with 0
 * Index 3 → replaced with 0
 *
 * Final array:
 * [1, 2, 0, 0, 5]
 */

/* Step 1: Create your own fill() */
Array.prototype.fill = function (value, start, end) {
    start = start === undefined ? 0 : Number(start);
    end = end === undefined ? this.length : Number(end);

    for (let i = start; i < end; i++) {
        this[i] = value;
    }

    return this;
};

/* Step 2: Use fill() */
const nums = [1, 2, 3, 4, 5];

nums.fill(9, 1, 4);

console.log(nums);

// Output:
// [1, 9, 9, 9, 5]

/**
 * Common use cases:
 *
 * - Initialize an array with same value
 * - Reset array values
 * - Fill default data
 */

/**
 * Important warning:
 *
 * fill() modifies the original array.
 * Be careful when using it in real applications.
 */

/**
 * Final understanding:
 *
 * map()   → creates new array
 * filter()→ creates new array
 * concat()→ creates new array
 * fill()  → MODIFIES existing array
 *
 * fill() = "overwrite values in array"
 */
