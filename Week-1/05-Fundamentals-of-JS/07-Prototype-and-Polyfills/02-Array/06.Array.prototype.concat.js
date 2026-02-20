/**
 * concat() in JavaScript:
 *
 * concat() is used to join (merge) two or more arrays
 * into a NEW array.
 *
 * Simple meaning:
 * - It joins arrays together
 * - It returns a NEW array
 * - Original arrays remain unchanged
 *
 * Important points:
 * 1. concat() merges arrays (or values).
 * 2. It ALWAYS returns a new array.
 * 3. It does NOT modify the original arrays.
 * 4. It performs a shallow copy.
 * 5. It can also add normal values, not just arrays.
 */

/**
 * Syntax:
 * array.concat(value1, value2, ..., valueN);
 *
 * value1, value2, ..., valueN:
 * - Can be arrays or normal values
 * - All values are added to a new array
 *
 * If no value is passed:
 * - concat() returns a shallow copy of the array
 */

/* Simple Example */
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const newArr = arr1.concat(arr2);

console.log(newArr);

// Output:
// [1, 2, 3, 4, 5, 6]

/**
 * Important:
 * arr1 and arr2 are NOT changed.
 */

/**
 * Step-by-step flow:
 *
 * arr1 = [1, 2, 3]
 * arr2 = [4, 5, 6]
 *
 * concat() joins them like:
 * [1, 2, 3] + [4, 5, 6]
 *
 * Result:
 * [1, 2, 3, 4, 5, 6]
 */

/* Step 1: Create your own concat() */
Array.prototype.concat = function () {
    let newArray = [...this];

    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];

        if (Array.isArray(arg)) {
            newArray.push(...arg);
        } else {
            newArray.push(arg);
        }
    }

    return newArray;
};

/* Step 2: Use concat() */
const a = [1, 2, 3];
const b = [4, 5, 6];

const result = a.concat(b);

console.log(result);

// Output:
// [1, 2, 3, 4, 5, 6]

/**
 * Example with multiple arrays and values:
 */
const merged = a.concat(b, 7, [8, 9]);

console.log(merged);

// Output:
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Final understanding:
 *
 * forEach() → just loops
 * map()     → transforms elements
 * filter()  → removes unwanted elements
 * reduce()  → combines into one value
 * concat()  → joins arrays into one array
 *
 * concat() = "join arrays safely"
 */
