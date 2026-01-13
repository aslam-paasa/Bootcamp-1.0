/**
 * Step 11: toSpliced() - Return a New Array with Changes like splice()
 * > toSpliced() - same as splice() but returns a new array
 * > Syntax: array.toSpliced(start, deleteCount, ...items)
*/

const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];

console.log("🎨 Original:", colors);

/* Immutable splice - remove elements */
const withoutBlue = colors.toSpliced(2, 1);
console.log("toSpliced(2, 1):", withoutBlue); // ["Red", "Green", "Yellow", "Purple"]

/* Immutable splice - add elements */
const withOrange = colors.toSpliced(1, 0, "Orange");
console.log("toSpliced(1, 0, 'Orange'):", withOrange); // ["Red", "Orange", "Green", "Blue", "Yellow", "Purple"]

/* Immutable splice - replace elements */
const replaced = colors.toSpliced(1, 2, "Pink", "Cyan");
console.log("toSpliced(1, 2, 'Pink', 'Cyan'):", replaced); // ["Red", "Pink", "Cyan", "Yellow", "Purple"]

console.log("Original after all operations:", colors); // unchanged!