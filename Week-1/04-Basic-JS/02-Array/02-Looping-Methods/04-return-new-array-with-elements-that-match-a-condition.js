/**
 * Step 3: filter() - Condition ke hisaab se filter karna
 * > filter() elements ko condition ke basis par filter karta hai aur naya 
 *   array return karta hai.
 * > Original array change nahi hota.
 * 
 * Syntax:
 *    const newArray = array.filter(function(currentValue, index, array) {
 *        return condition; // true or false
 *    });
*/


/**
 * Example 1: Even Numbers Filter Karna
*/

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* Even numbers filter karo */
const evenNumbers = numbers.filter(function(num) {
    return num % 2 === 0;
});

console.log("All numbers:", numbers);      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log("Even numbers:", evenNumbers); // [2, 4, 6, 8, 10]



/**
 * Example 2: Real World - Adult Users Filter Karna
*/

const users = [
    { name: "Rahul", age: 25, city: "Delhi" },
    { name: "Priya", age: 17, city: "Mumbai" },
    { name: "Amit", age: 30, city: "Bangalore" },
    { name: "Neha", age: 16, city: "Delhi" },
    { name: "Raj", age: 22, city: "Mumbai" }
];

/* Adults filter karo (age >= 18) */
const adults = users.filter(function(user) {
    return user.age >= 18;
});

/* Delhi ke adults filter karo */
const delhiAdults = users.filter(function(user) {
    return user.age >= 18 && user.city === "Delhi";
});

console.log("All users:", users.length);
console.log("Adults:", adults.length);
console.log("Delhi adults:", delhiAdults.length);

console.log("Delhi adults details:");
delhiAdults.forEach(user => console.log(`- ${user.name}, ${user.age}`));



/**
 * Example 3: Available Products Filter
*/

const products = [
    { name: "Laptop", price: 50000, inStock: true, category: "electronics" },
    { name: "Phone", price: 25000, inStock: false, category: "electronics" },
    { name: "Book", price: 500, inStock: true, category: "education" },
    { name: "Chair", price: 3000, inStock: true, category: "furniture" },
    { name: "Table", price: 8000, inStock: false, category: "furniture" }
];

/* Available electronics filter karo */
const availableElectronics = products.filter(function(product) {
    return product.inStock && product.category === "electronics";
});

/* Affordable products (price < 10000) */
const affordableProducts = products.filter(product => product.price < 10000);

console.log("Available Electronics:", availableElectronics.map(p => p.name));
console.log("Affordable Products (<10k):", affordableProducts.map(p => `${p.name} - ₹${p.price}`));



/**
 * When to use filter()?
 * > Jab condition ke basis par elements chaiye ho
 * > Search functionality ke liye
 * > Data filtering ke liye
 * > Available/active items ke liye
*/