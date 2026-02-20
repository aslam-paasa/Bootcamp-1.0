/**
 * find() in JavaScript:
 *
 * find() is used to search for an element in an array
 * based on a condition.
 *
 * Simple meaning:
 * - It checks elements one by one
 * - Returns the FIRST element that matches the condition
 * - Stops searching after the first match
 *
 * Important points:
 * 1. find() returns the FIRST matching element.
 * 2. If nothing matches, it returns undefined.
 * 3. It does NOT create a new array.
 * 4. It does NOT change the original array.
 * 5. Once a match is found, it stops looping.
 */

/**
 * Callback function arguments:
 * The function passed to find() gets:
 *
 * a. currentValue
 *    - The current element being checked.
 *
 * b. index (optional)
 *    - The position of the element.
 *
 * c. array (optional)
 *    - The original array on which find() was called.
 *
 * Very important:
 * - The callback must return true or false.
 * - true  → element is found and returned
 * - false → keep searching
 */

/**
 * Syntax:
 * array.find(callbackFunction, thisValue);
 *
 * callbackFunction(currentValue, index, array)
 *
 * thisValue (optional):
 * - Used as "this" inside the callback.
 */

/* Simple Example */
const numbers = [1, 2, 3, 4, 5];

const found = numbers.find(function (number) {
    return number > 3;
});

console.log(found);

// Output:
// 4

/**
 * Step-by-step flow:
 *
 * numbers = [1, 2, 3, 4, 5]
 *
 * Check 1 → 1 > 3 ❌
 * Check 2 → 2 > 3 ❌
 * Check 3 → 3 > 3 ❌
 * Check 4 → 4 > 3 ✅
 *
 * Stop searching and return 4
 */

/* Step 1: Create your own find() */
Array.prototype.find = function (callbackFunc) {
    if (this == null) {
        throw new TypeError("Array.prototype.find called on null or undefined");
    }

    if (typeof callbackFunc !== "function") {
        throw new TypeError("callback must be a function");
    }

    for (let i = 0; i < this.length; i++) {
        if (callbackFunc(this[i], i, this)) {
            return this[i];
        }
    }

    return undefined;
};

/* Step 2: Use find() */
const nums = [1, 2, 3, 4, 5];

const result = nums.find(function (value) {
    return value === 4;
});

console.log(result);

// Output:
// 4

/**
 * Common use cases:
 *
 * - Find first matching user
 * - Search for an item by id
 * - Check existence of a value
 */

/**
 * find() vs filter():
 *
 * find():
 * - Returns ONE element
 * - Stops at first match
 *
 * filter():
 * - Returns an ARRAY
 * - Checks all elements
 */

/**
 * Final understanding:
 *
 * map()   → transforms elements
 * filter()→ returns matching array
 * find()  → returns first matching element
 *
 * find() = "search and stop"
 */
  