/**
 * Step 10: toSorted() - Return a New Sorted Array
 * > toSorted() - same as sort() but returns a new array
 * > Syntax: array.toSorted(compareFunction)
*/


const fruits = ["Banana", "Apple", "Orange", "Mango"];

console.log("🍎 Original:", fruits);

/* Immutable sort */
const sorted = fruits.toSorted();
console.log("toSorted():", sorted);              // ["Apple", "Banana", "Mango", "Orange"]
console.log("Original after toSorted:", fruits); // unchanged

/* With compare function */
const numbers = [40, 100, 1, 5, 25];
const sortedNumbers = numbers.toSorted((a, b) => a - b);
console.log("Sorted numbers:", sortedNumbers); // [1, 5, 25, 40, 100]