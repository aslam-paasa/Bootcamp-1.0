/**
 * includes() in JavaScript:
 *
 * includes() is used to check whether an array
 * contains a specific value or not.
 *
 * Simple meaning:
 * - It searches for a value in the array
 * - If found → returns true
 * - If not found → returns false
 *
 * Important points:
 * 1. includes() returns only true or false.
 * 2. It uses strict equality (===) for comparison.
 * 3. It does NOT change the original array.
 * 4. It stops searching once the value is found.
 */

/**
 * Syntax:
 * array.includes(valueToFind, fromIndex);
 *
 * Parameters:
 *
 * valueToFind:
 * - The value you want to search for in the array.
 *
 * fromIndex (optional):
 * - The index from where searching should start.
 * - Default value is 0.
 * - If negative:
 *   → search starts from (array.length + fromIndex).
 */

/* Simple Example */
const arr = [1, 2, 3, 4, 5];

const includesTwo = arr.includes(2);

console.log(includesTwo);

// Output:
// true

/**
 * Step-by-step flow:
 *
 * arr = [1, 2, 3, 4, 5]
 *
 * Search for 2:
 * - Check 1 → ❌
 * - Check 2 → ✅
 *
 * Stop searching and return true
 */

/* Example with fromIndex */
const nums = [1, 2, 3, 4, 5];

console.log(nums.includes(2, 2));

// Output:
// false
// (search starts from index 2 → [3, 4, 5])

/* Step 1: Create your own includes() */
Array.prototype.includes = function (searchElement, fromIndex) {
    let length = this.length >>> 0; // Ensure it's a number and non-negative
    fromIndex = fromIndex | 0; // convert to number

    let start = fromIndex < 0
        ? Math.max(length + fromIndex, 0)
        : fromIndex;

    for (let i = start; i < length; i++) {
        if (this[i] === searchElement) {
            return true;
        }
    }

    return false;
};

/* Step 2: Use includes() */
const data = [10, 20, 30, 40];

console.log(data.includes(30));

// Output:
// true

console.log(data.includes(50));

// Output:
// false

/**
 * includes() vs indexOf():
 *
 * includes():
 * - Returns true / false
 * - More readable
 *
 * indexOf():
 * - Returns index or -1
 */

/**
 * Important note:
 *
 * includes(NaN) → true if NaN exists
 * indexOf(NaN)  → always -1
 */

/**
 * Final understanding:
 *
 * find()     → returns element
 * filter()  → returns array
 * includes()→ returns true/false
 *
 * includes() = "check existence"
 */
