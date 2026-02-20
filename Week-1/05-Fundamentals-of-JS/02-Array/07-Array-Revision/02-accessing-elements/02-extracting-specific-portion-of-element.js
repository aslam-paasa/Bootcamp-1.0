/**
 * Slice Method:
 * - Array ke kisi specific portion ko access karne ke liye use hota hai
 * - Original array ko modify nahi karta
 * - Syntax: array.slice(startIndex, endIndex)
 * 
 * Real World Example - E-commerce Product Pagination:
 * - Jab hum products ko pages mein show karte hain
 * - Har page par limited number of products dikhate hain
 */

/**
 * Product Catalog Example
*/
const products = [
    { id: 1, name: "iPhone", price: 999, category: "Electronics" },
    { id: 2, name: "Samsung TV", price: 799, category: "Electronics" },
    { id: 3, name: "Nike Shoes", price: 129, category: "Fashion" },
    { id: 4, name: "Coffee Maker", price: 89, category: "Home" },
    { id: 5, name: "Headphones", price: 199, category: "Electronics" },
    { id: 6, name: "T-shirt", price: 29, category: "Fashion" }
];

/**
 * First page products (first 3 items)
*/
const firstPage = products.slice(0, 3);
console.log("First Page Products:");
console.log(firstPage);

/**
 * Second page products (next 3 items)
*/
const secondPage = products.slice(3, 6);
console.log("\nSecond Page Products:");
console.log(secondPage);

/**
 * Last 2 products from catalog
*/
const lastTwoProducts = products.slice(-2);
console.log("\nLast Two Products:");
console.log(lastTwoProducts);

/**
 * Original array unchanged rahega
*/
console.log("\nOriginal Products Array:");
console.log(products);
