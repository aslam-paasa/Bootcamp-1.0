/**
 * Step 6: sort() - Array ko sort karna
 * > sort() by default elements ko strings ki tarah treat karta hai. 
 * > Numbers ko sort karne ke liye compare function dena padta hai.
*/


/**
 * Example 1: String Sort Karna
*/

const fruits = ["Banana", "Orange", "Apple", "Mango"];

console.log("Original fruits:", fruits);

/* Alphabetically sort karo */
fruits.sort();
console.log("Sorted fruits:", fruits); // ["Apple", "Banana", "Mango", "Orange"]



/**
 * Example 2: Number Sort Karna
*/

const numbers = [40, 100, 1, 5, 25, 10];

console.log("Original numbers:", numbers);

/* Default sort (problematic for numbers) */
numbers.sort();
console.log("Default sort:", numbers); // [1, 10, 100, 25, 40, 5] - Wrong!

/* Correct way - compare function use karo */
numbers.sort((a, b) => a - b);
console.log("Ascending sort:", numbers); // [1, 5, 10, 25, 40, 100]

/* Descending sort */
numbers.sort((a, b) => b - a);
console.log("Descending sort:", numbers); // [100, 40, 25, 10, 5, 1]



/**
 * Example 3: Real World - Student Records Sort Karna
*/

const students = [
    { name: "Rahul", marks: 85, age: 20 },
    { name: "Priya", marks: 92, age: 19 },
    { name: "Amit", marks: 78, age: 21 },
    { name: "Neha", marks: 88, age: 20 }
];

console.log("Original students:", students);

/* Marks ke hisab se sort karo (descending) */
students.sort((a, b) => b.marks - a.marks);
console.log("📊 Sorted by marks (highest first):");
students.forEach(student => {
    console.log(`   ${student.name}: ${student.marks} marks`);
});

/* Name ke hisab se sort karo (alphabetical) */
students.sort((a, b) => a.name.localeCompare(b.name));
console.log("📝 Sorted by name:");
students.forEach(student => {
    console.log(`   ${student.name}`);
});