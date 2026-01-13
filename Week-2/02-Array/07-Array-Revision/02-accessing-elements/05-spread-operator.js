/**
 * Spread Operator (...):
 * - Array ya object ke elements ko copy karke new array/object mein spread karta hai
 * - Shallow copy create karta hai - nested objects/arrays reference copy hote hain
 * - Spread operator ka matlab hai "expand" ya "unpack" karna
 * - Iska main purpose hai:
 *   1. Arrays/Objects ko combine karna
 *   2. Arrays/Objects ki copy banana
 *   3. Function arguments ko pass karna
 *   4. Arrays/Objects ko modify karna without mutating original
 * 
 * Real World Example - E-commerce Shopping Cart:
 * - User ke cart items ko copy karke new order create karna
 * - Cart items ko modify karna without affecting original cart
 */


/**
 * Original shopping cart with items
 */
const shoppingCart = [
    { id: 1, name: "Laptop", price: 999, quantity: 1 },
    { id: 2, name: "Mouse", price: 25, quantity: 2 },
    { id: 3, name: "Keyboard", price: 50, quantity: 1 }
];

/**
 * 1. Create a copy of cart using spread operator
 */
const cartCopy = [...shoppingCart];

/**
 * 2. Modify the copy without affecting original
 */
cartCopy[0].quantity = 2; // This will affect both arrays because of shallow copy
cartCopy.push({ id: 4, name: "Headphones", price: 100, quantity: 1 });

console.log("Original Cart:", shoppingCart);
console.log("Modified Cart Copy:", cartCopy);


/**
 * Deep copy example using JSON
 */
const deepCartCopy = JSON.parse(JSON.stringify(shoppingCart));
deepCartCopy[0].quantity = 3; // This won't affect original array

console.log("\nAfter Deep Copy Modification:");
console.log("Original Cart:", shoppingCart);
console.log("Deep Cart Copy:", deepCartCopy);
