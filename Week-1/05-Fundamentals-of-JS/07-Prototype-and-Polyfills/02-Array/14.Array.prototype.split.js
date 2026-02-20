/**
 * split() in JavaScript:
 *
 * split() is used to break a STRING into an ARRAY
 * based on a separator.
 *
 * Simple meaning:
 * - Take a string
 * - Cut it into pieces
 * - Store those pieces in an array
 *
 * Important points:
 * 1. split() returns a NEW array.
 * 2. It does NOT change the original string.
 * 3. The split happens based on a separator.
 * 4. Separator can be a string or regex.
 */

/**
 * Syntax:
 * string.split(separator, limit);
 *
 * Parameters:
 *
 * separator (optional):
 * - The value where the string should be split.
 * - Can be a string or regular expression.
 * - If omitted → whole string becomes one array element.
 *
 * limit (optional):
 * - Maximum number of elements in the result array.
 * - Extra parts are ignored.
 */

/* Simple Example */
const str = "Hello World";

const arr = str.split(" ");

console.log(arr);

// Output:
// ["Hello", "World"]

/**
 * Step-by-step flow:
 *
 * str = "Hello World"
 *
 * split(" "):
 * - Split wherever space appears
 *
 * Result:
 * ["Hello", "World"]
 */

/* Example with empty string separator */
const word = "HELLO";

console.log(word.split(""));

// Output:
// ["H", "E", "L", "L", "O"]

/* Example with limit */
const text = "apple,banana,grapes,orange";

console.log(text.split(",", 2));

// Output:
// ["apple", "banana"]

/**
 * Step 1: Create your own split()
 */
String.prototype.split = function (separator) {
    let output = [];
    let start = 0;
    let end;

    separator = separator === undefined ? "" : separator;

    // Case 1: split by empty string → characters
    if (separator === "") {
        for (let i = 0; i < this.length; i++) {
            output.push(this.charAt(i));
        }
    } 
    // Case 2: split by given separator
    else {
        while ((end = this.indexOf(separator, start)) !== -1) {
            output.push(this.substring(start, end));
            start = end + separator.length;
        }
        output.push(this.substring(start));
    }

    return output;
};

/* Step 2: Use split() */
const sentence = "JavaScript is fun";

const words = sentence.split(" ");

console.log(words);

// Output:
// ["JavaScript", "is", "fun"]

/**
 * Common use cases:
 *
 * - Split sentences into words
 * - Convert CSV data into arrays
 * - Convert string to character array
 */

/**
 * split() vs join():
 *
 * split():
 * - string → array
 *
 * join():
 * - array → string
 */

/**
 * Final understanding:
 *
 * join()  → array → string
 * split() → string → array
 *
 * split() = "break string into pieces"
 */
