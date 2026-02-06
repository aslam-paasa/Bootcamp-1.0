/**
 * Step 9: toReversed() - Return a New Reversed Array
 * > toReversed() - same as reverse() but returns a new array
 * > Syntax: array.toReversed()
*/

const numbers = [1, 2, 3, 4, 5];

console.log("🔢 Original:", numbers);

/* Mutable reverse (changes original) */
// numbers.reverse();

/* Immutable reverse (returns new array) */
const reversed = numbers.toReversed();
console.log("toReversed():", reversed); // [5, 4, 3, 2, 1]
console.log("Original after toReversed:", numbers); // [1, 2, 3, 4, 5] - unchanged! 