/**
 * Array Sorting Methods:
 * - sort() method array ko modify karta hai
 * - sort() method comparison function leta hai
 * - comparison function 2 parameters leta hai (a, b)
 * - comparison function ka return value decide karta hai sorting order
 * 
 * Comparison Function Return Values:
 * "> 0"   ===>   sort "a" after "b", e.g. [b, a]
 * "< 0"   ===>   sort "a" before "b", e.g. [a, b] 
 * "=== 0" ===>   keep original order of "a" and "b"
 */

/**
 * Basic Sorting Examples
*/
const numbers = [5, 2, 10, 7, 3, 1];


/**
 * 1. Ascending Order (Chote se bada)
*/
numbers.sort((a, b) => a - b);
console.log("Ascending:", numbers);  // [1, 2, 3, 5, 7, 10]


/**
 * 2. Descending Order (Bade se chota) 
*/
numbers.sort((a, b) => b - a);
console.log("Descending:", numbers); // [10, 7, 5, 3, 2, 1]

/**
 * Real World Example: E-commerce Product Sorting
 * - Products ko price ke hisab se sort karna
 * - Products ko rating ke hisab se sort karna
 * - Products ko number (ID) ke hisab se sort karna
 */
const products = [
    { id: 1003, name: "Laptop", price: 50000, rating: 4.5 },
    { id: 1001, name: "Phone", price: 20000, rating: 4.2 },
    { id: 1004, name: "Tablet", price: 30000, rating: 4.8 },
    { id: 1002, name: "Watch", price: 5000, rating: 3.9 }
];

/**
 * 1. Sort by Price (Low to High)
*/
const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
console.log("Sorted by Price:", sortedByPrice);

/**
 * 2. Sort by Rating (High to Low)
*/
const sortedByRating = [...products].sort((a, b) => b.rating - a.rating);
console.log("Sorted by Rating:", sortedByRating);

/**
 * 3. Sort by Name (Alphabetically)
*/
const sortedByName = [...products].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});
console.log("Sorted by Name:", sortedByName);

/**
 * 4. Sort by ID (Ascending)
*/
const sortedById = [...products].sort((a, b) => a.id - b.id);
console.log("Sorted by ID:", sortedById);
