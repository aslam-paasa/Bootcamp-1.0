/**
 * join() in JavaScript:
 *
 * join() is used to convert an array into a STRING
 * by joining all its elements.
 *
 * Simple meaning:
 * - Takes array elements
 * - Joins them into one string
 * - Uses a separator between elements
 *
 * Important points:
 * 1. join() returns a STRING.
 * 2. It does NOT change the original array.
 * 3. Default separator is a comma (,).
 * 4. You can provide any separator (space, dash, etc.).
 */

/**
 * Syntax:
 * array.join(separator);
 *
 * separator (optional):
 * - A string placed between elements.
 * - Default value is "," (comma).
 */

/* Simple Example */
const arr = ["Hello", "World"];

const str = arr.join(" ");

console.log(str);

// Output:
// "Hello World"

/**
 * Step-by-step flow:
 *
 * arr = ["Hello", "World"]
 *
 * join(" "):
 * "Hello" + " " + "World"
 *
 * Result:
 * "Hello World"
 */

/* Example with default separator */
const nums = [1, 2, 3, 4];

console.log(nums.join());

// Output:
// "1,2,3,4"

/* Step 1: Create your own join() */
Array.prototype.join = function (separator) {
    separator = separator === undefined ? "," : String(separator);

    let result = "";

    for (let i = 0; i < this.length; i++) {
        result += this[i];

        if (i < this.length - 1) {
            result += separator;
        }
    }

    return result;
};

/* Step 2: Use join() */
const words = ["JavaScript", "is", "awesome"];

const sentence = words.join(" ");

console.log(sentence);

// Output:
// "JavaScript is awesome"

/**
 * Important notes:
 *
 * - Non-string values are converted to strings.
 * - Empty array → returns empty string.
 */

/**
 * join() vs concat():
 *
 * concat():
 * - Joins arrays
 *
 * join():
 * - Joins elements into a string
 */

/**
 * Final understanding:
 *
 * map()   → returns array
 * filter()→ returns array
 * reduce()→ returns any value
 * join()  → returns STRING
 *
 * join() = "array → string"
 */
