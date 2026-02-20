/**
 * Step 4: reduce() - Array ko single value mein reduce karna
 * > reduce() array ko single value mein reduce karta hai.
 *   (sum, average, max, min, etc.)
 * > Original array change nahi hota
 * 
 * Syntax:
 *    const singleValue = array.reduce(function(accumulator, currentValue, index, array) {
 *        return accumulator + currentValue;
 *    }, initialValue);
*/


/**
 * Example 1: Sum of Numbers
*/

const numbers = [1, 2, 3, 4, 5];

/* Sum calculate karo */
const sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);

console.log("Numbers:", numbers); // [1, 2, 3, 4, 5]
console.log("Sum:", sum);        // 15



/**
 * Example 2: Real World - Shopping Cart Total
*/

const cartItems = [
    { name: "Laptop", price: 50000, quantity: 1 },
    { name: "Mouse", price: 1500, quantity: 2 },
    { name: "Keyboard", price: 3000, quantity: 1 },
    { name: "Monitor", price: 15000, quantity: 1 }
];

/* Total amount calculate karo */
const totalAmount = cartItems.reduce(function(total, item) {
    return total + (item.price * item.quantity);
}, 0);

/* Most expensive item find karo */
const mostExpensive = cartItems.reduce(function(maxItem, currentItem) {
    return currentItem.price > maxItem.price ? currentItem : maxItem;
}, cartItems[0]);

console.log("Cart Summary:");
console.log(`Total Items: ${cartItems.length}`);
console.log(`Total Amount: ₹${totalAmount}`);
console.log(`Most Expensive: ${mostExpensive.name} - ₹${mostExpensive.price}`);


/**
 * Example 3: Student Statistics
*/

const students = [
    { name: "Rahul", marks: 85, age: 20 },
    { name: "Priya", marks: 92, age: 19 },
    { name: "Amit", marks: 78, age: 21 },
    { name: "Neha", marks: 88, age: 20 },
    { name: "Raj", marks: 65, age: 22 }
];

/* Multiple statistics ek saath */
const stats = students.reduce(function(acc, student) {
    acc.totalMarks += student.marks;
    acc.highestMarks = Math.max(acc.highestMarks, student.marks);
    acc.lowestMarks = Math.min(acc.lowestMarks, student.marks);
    acc.studentCount++;
    
    if (student.marks >= 80) acc.gradeACount++;
    
    return acc;
}, {
    totalMarks: 0,
    highestMarks: -Infinity,
    lowestMarks: Infinity,
    studentCount: 0,
    gradeACount: 0
});

const averageMarks = stats.totalMarks / stats.studentCount;

console.log("Student Statistics:");
console.log(`Total Students: ${stats.studentCount}`);
console.log(`Average Marks: ${averageMarks.toFixed(2)}`);
console.log(`Highest Marks: ${stats.highestMarks}`);
console.log(`Lowest Marks: ${stats.lowestMarks}`);
console.log(`Grade A Students: ${stats.gradeACount}`);



/**
 * When to use reduce()?
 * > Jab array ko single value mein convert karna ho
 * > Calculations ke liye (sum, average, max, min, etc.)
 * > Complex data aggregation ke liye
 * > Statistics generate karna ke liye  
*/