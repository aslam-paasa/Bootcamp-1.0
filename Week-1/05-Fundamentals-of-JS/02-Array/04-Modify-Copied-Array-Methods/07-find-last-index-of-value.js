/**
 * Step 7: lastIndexOf() - Last Occurrence Index
 * > lastIndexOf() - last occurrence ka index return karta hai
 * > Return -1 if value not found
 * > Syntax: array.lastIndexOf(value, fromIndex)
*/


/**
 * Example 1: Basic Index Search
 */

const numbers = [10, 20, 30, 20, 40, 20, 50];

console.log("🔢 Numbers:", numbers);

/* indexOf - first occurrence */
console.log("indexOf(20):", numbers.indexOf(20)); // 1
console.log("indexOf(99):", numbers.indexOf(99)); // -1 (not found)

/* lastIndexOf - last occurrence */
console.log("lastIndexOf(20):", numbers.lastIndexOf(20)); // 5
console.log("lastIndexOf(20, 3):", numbers.lastIndexOf(20, 3)); // 3 (search up to index 3)

/* From specific index */
console.log("indexOf(20, 2):", numbers.indexOf(20, 2)); // 3
