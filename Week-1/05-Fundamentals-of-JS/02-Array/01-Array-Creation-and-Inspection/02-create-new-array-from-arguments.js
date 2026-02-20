/**
 * Step 2: Array.of() - Smart Array Creation
*/

/**
 * Problem with Array() Constructor:
 * > Array() constructor confusing hai jab single number argument milta hai.
*/

/**
 * Solution: Array.of()
 * > Array.of() har argument ko as an element treat karta hai, chahe single 
 *   ho ya multiple.
 * > Syntax: Array.of(element1, element2, ...)
*/


/**
 * Example 1: Single Number - No Confusion
 * > ✅ Array.of() - Consistent behavior
*/
const arr1 = Array.of(5);       // Creates [5]
const arr2 = Array.of(5, 10);   // Creates [5, 10]
const arr3 = Array.of(1, 2, 3); // Creates [1, 2, 3]

console.log("arr1:", arr1); // [5]
console.log("arr2:", arr2); // [5, 10] 
console.log("arr3:", arr3); // [1, 2, 3]


/**
 * Example 2: Mixed Data Types
*/

/* ✅ Different data types ke saath */
const mixedArray = Array.of("Hello", 42, true, null, [1, 2]);
console.log("Mixed array:", mixedArray); /* ['Hello', 42, true, null, [1, 2]] */

/* Empty array */
const empty = Array.of();
console.log("Empty array:", empty); /* [] */



/**
 * Real World Example: Prduct Prices
*/

/* E-commerce product prices */
const singleProduct = Array.of(499);                    // Single product price
const multipleProducts = Array.of(299, 499, 799, 1299); // Multiple prices

console.log("Single product price:", singleProduct);       // [499]
console.log("Multiple product prices:", multipleProducts); // [299, 499, 799, 1299]


/* Compare with Array() constructor */
const confusingArray = new Array(499);           // ❌ Creates 499 empty slots!
console.log("Confusing array:", confusingArray); // [empty × 499]




/**
 * Array() vs Array.of() Comparison:
*/

console.log("🔍 Array() vs Array.of() Comparison:");

/* Single number */
console.log("new Array(5):", new Array(5));         // [empty × 5]
console.log("Array.of(5):", Array.of(5));           // [5]

/* Multiple numbers */
console.log("new Array(5, 10):", new Array(5, 10)); // [5, 10]
console.log("Array.of(5, 10):", Array.of(5, 10));   // [5, 10]

/* Empty */
console.log("new Array():", new Array());          // []
console.log("Array.of():", Array.of());            // []