/**
 * Step 2: map() - Transform Har Element
 * > map() har element ko transform karke naya array return karta hai. 
 * > Original array change nahi hota.
 * 
 * Syntax:
 *    const newArray = array.map(function(currentValue, index, array) {
 *        return transformedValue;
 *    });
*/


/**
 * Example 1: Numbers ko Double karna
*/

const numbers = [1, 2, 3, 4, 5];

/* Har number ko double karo */
const doubled = numbers.map(function(num) {
    return num * 2;
});

console.log("Original:", numbers); // [1, 2, 3, 4, 5]
console.log("Doubled:", doubled);  // [2, 4, 6, 8, 10]



/**
 * Example 2: Real World - Product Prices with Tax
*/

const products = [
    { name: "Laptop", price: 50000 },
    { name: "Phone", price: 25000 },
    { name: "Tablet", price: 15000 }
];

/* Har product ka price with tax calculate karo */
const productsWithTax = products.map(function(product) {
    return {
        name: product.name,
        price: product.price,
        priceWithTax: product.price * 1.18, // 18% GST
        tax: product.price * 0.18
    };
});

console.log("Products with Tax:");
productsWithTax.forEach(product => {
    console.log(`${product.name}: ₹${product.price} → ₹${product.priceWithTax.toFixed(2)} (Tax: ₹${product.tax.toFixed(2)})`);
});



/**
 * Example 3: Student Grades Transformation
*/

const students = [
    { name: "Rahul", marks: 85 },
    { name: "Priya", marks: 92 },
    { name: "Amit", marks: 78 },
    { name: "Neha", marks: 65 }
];

/* Marks se grades generate karo */
const studentsWithGrades = students.map(function(student) {
    let grade;
    if (student.marks >= 90) grade = "A+";
    else if (student.marks >= 80) grade = "A";
    else if (student.marks >= 70) grade = "B";
    else if (student.marks >= 60) grade = "C";
    else grade = "F";
    
    return {
        name: student.name,
        marks: student.marks,
        grade: grade
    };
});

console.log("Student Report Cards:");
console.table(studentsWithGrades);


/**
 * When to use map()?
 * > Jab data transform karna ho
 * > Jab naya array chaiye ho
 * > Data formatting ke liye
 * > Calculation k liye
*/