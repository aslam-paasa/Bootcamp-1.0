/**
 * reverse() in JavaScript:
 *
 * reverse() is used to reverse the order of elements
 * in an array.
 *
 * Simple meaning:
 * - First element becomes last
 * - Last element becomes first
 *
 * Important points:
 * 1. reverse() MODIFIES the original array.
 * 2. It does NOT create a new array.
 * 3. It returns the same array (after reversing).
 * 4. Be careful when using it, because it mutates data.
 */

/**
 * Syntax:
 * array.reverse();
 *
 * - reverse() does NOT take any parameters.
 */

/* Simple Example */
const arr = [1, 2, 3, 4, 5];

arr.reverse();

console.log(arr);

// Output:
// [5, 4, 3, 2, 1]

/**
 * Step-by-step flow:
 *
 * Original array:
 * [1, 2, 3, 4, 5]
 *
 * After reverse():
 * [5, 4, 3, 2, 1]
 */

/* Step 1: Create your own reverse() */
Array.prototype.reverse = function () {
    let mid = Math.floor(this.length / 2);

    for (let i = 0; i < mid; i++) {
        let temp = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = temp;
    }

    return this;
};

/* Step 2: Use reverse() */
const nums = [10, 20, 30, 40];

nums.reverse();

console.log(nums);

// Output:
// [40, 30, 20, 10]

/**
 * Important warning:
 *
 * reverse() changes the original array.
 * If you need a safe version:
 *
 * const reversed = [...arr].reverse();
 */

/**
 * Common use cases:
 *
 * - Reverse list order
 * - Reverse words or characters
 * - Undo operations
 */

/**
 * reverse() vs sort():
 *
 * reverse():
 * - Just reverses order
 *
 * sort():
 * - Sorts based on rules
 */

/**
 * Final understanding:
 *
 * map()     → new array
 * filter()  → new array
 * concat() → new array
 * reverse() → MODIFIES array
 *
 * reverse() = "flip the array"
 */
