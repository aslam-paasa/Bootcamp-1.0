/**
 * Shopping Cart Stock Checker:
 * Imagine ek shopping website ka checkout system banaya jaa rha hai.
 * Har product ke paas name and inStock property hoti hai. Tumhein
 * check karna hai:
 * - "Kya cart k saare items stock main hain ye nahi?" 
*/


const cartItems = [
    { name: "Laptop", inStock: true },
    { name: "Mouse", inStock: true },
    { name: "Keyboard", inStock: true }
];

// TODO: Use .every() to check if all items are in stock

const allAvailable = cartItems.every(function (item) {
    return item.inStock === true;
});

console.log("Kya saare items stock mein hain?", allAvailable);
