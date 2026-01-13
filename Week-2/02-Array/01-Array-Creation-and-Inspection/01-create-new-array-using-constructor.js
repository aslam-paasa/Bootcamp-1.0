/**
 * Real World Analogy:
 * > Array = Shopping List
 *   > Ordered Collection of items
 *   > Har item ka apna position (index) hota hai
 *   > Easily add, remove, access items
*/

/**
 * Simple Array Creation:
*/
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null];

/**
 * Step 1: Array() Constructor - Traditional Way
 * > Array() constructor JavaScript ka built-in method hai arrays banane ke 
 *   liye.
 * > Syntax:
 *   a. new Array(length)                  // Fixed length array
 *   b. new Array(element1, element2, ...) // Elements ke saath
*/

/**
 * Example 1: Fixed Length Array 
*/

/* Fixed length array banae */ 
const emptyArray = new Array(5);           // 5 empty slots
console.log("Empty array:", emptyArray);   // [empty × 5]
console.log("Length:", emptyArray.length); // 5

/* Empty Slots ko fill karein */
emptyArray[0] = "First";
emptyArray[4] = "Last";
console.log("After filling:", emptyArray); // ['First', empty × 3, 'Last']


/**
 * Example 2: Elements ke saath array
*/

/* Direct elements ke saath array banayein */
const fruitsArray = new Array("Apple", "Banana", "Orange");
console.log("Fruits array:", fruitsArray);  // ['Apple', 'Banana', 'Orange']
console.log("Length:", fruitsArray.length); // 3

/* Numbers ka array */
const scoresArray = new Array(95, 87, 92, 78);
console.log("Scores:", scoresArray); // [95, 87, 92, 78]




/**
 * Common Pitfall: Single Number Argument
*/

/* ❌ CONFUSING BEHAVIOR - Single number */
const arr1 = new Array(5);     // Creates array with 5 empty slots
const arr2 = new Array(5, 10); // Creates array with elements [5, 10]

console.log("arr1:", arr1);               // [empty × 5]
console.log("arr2:", arr2);               // [5, 10]
console.log("arr1 length:", arr1.length); // 5
console.log("arr2 length:", arr2.length); // 2




/**
 * Real World Example: Student Seats
*/

/* Classroom mein students ke liye seats arrange karna */
const classroomSeats = new Array(30); // 30 seats ka classroom

/* Kuch seats fill karein */
classroomSeats[0] = "Rahul";
classroomSeats[1] = "Priya"; 
classroomSeats[29] = "Amit";

console.log("Classroom seats:", classroomSeats);
console.log("Total seats:", classroomSeats.length);
console.log("Occupied seats:", classroomSeats.filter(seat => seat !== undefined).length);