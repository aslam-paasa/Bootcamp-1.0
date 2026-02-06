/**
 * Step 12: with() - Return a New Array with Updated Value at Index
*/

const students = ["Rahul", "Priya", "Amit", "Neha"];

console.log("🎓 Original:", students);

/* Immutable update - specific index par value change karo */
const updated = students.with(1, "Priyanka");
console.log("with(1, 'Priyanka'):", updated); // ["Rahul", "Priyanka", "Amit", "Neha"]

/* Multiple updates (chaining) */
const multipleUpdates = students
    .with(0, "Rahul Kumar")
    .with(2, "Amit Sharma")
    .with(3, "Neha Gupta");
    
console.log("Multiple updates:", multipleUpdates);
console.log("Original after with():", students); /* unchanged */