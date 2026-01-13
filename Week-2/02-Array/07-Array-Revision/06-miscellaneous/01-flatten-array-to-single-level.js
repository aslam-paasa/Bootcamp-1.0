/**
 * flat() Method Explanation:
 * - flat() method nested arrays ko ek single array mein convert karta hai
 * - Ye method array ke depth ko reduce karta hai
 * - Default depth 1 hoti hai, lekin hum custom depth bhi specify kar sakte hain
 * - Infinity depth se saare nested arrays ko flatten kar sakte hain
 */

/**
 * Syntax:
 * array.flat(depth)
 * - depth: Kitne levels tak array ko flatten karna hai (default: 1)
 */

/**
 * Ex-1: Basic Usage
 */
const nestedArray = [1, [2, 3], [[4, 5], 6]];
console.log("Original Array:", nestedArray);

/**
 * Default depth (1 level)
 */
const flattenedOneLevel = nestedArray.flat();
console.log("Flattened (1 level):", flattenedOneLevel); // [1, 2, 3, [4, 5], 6]

/**
 * Custom depth (2 levels)
 */
const flattenedTwoLevels = nestedArray.flat(2);
console.log("Flattened (2 levels):", flattenedTwoLevels); // [1, 2, 3, 4, 5, 6]

/**
 * Infinity depth
 */
const deeplyNested = [1, [2, [3, [4, [5]]]]];
const completelyFlat = deeplyNested.flat(Infinity);
console.log("Completely Flattened:", completelyFlat); // [1, 2, 3, 4, 5]

/**
 * Real World Problem: E-commerce Product Categories
 * - Multiple categories ke products ko ek single list mein merge karna
 * - Nested categories ko handle karna
 * - Saare products ko ek flat list mein convert karna
 */
const productCategories = [
    {
        category: "Electronics",
        products: [
            { id: "E1", name: "Laptop", price: 50000 },
            { id: "E2", name: "Phone", price: 20000 }
        ]
    },
    {
        category: "Clothing",
        products: [
            { id: "C1", name: "T-Shirt", price: 500 },
            { id: "C2", name: "Jeans", price: 1500 }
        ]
    }
];

// Saare products ko ek single array mein convert karna
const allProducts = productCategories
    .map(category => category.products)
    .flat();

console.log("\nAll Products:");
console.log(allProducts);

/**
 * Output:
 * Original Array: [1, [2, 3], [[4, 5], 6]]
 * Flattened (1 level): [1, 2, 3, [4, 5], 6]
 * Flattened (2 levels): [1, 2, 3, 4, 5, 6]
 * Completely Flattened: [1, 2, 3, 4, 5]
 * 
 * All Products:
 * [
 *   { id: 'E1', name: 'Laptop', price: 50000 },
 *   { id: 'E2', name: 'Phone', price: 20000 },
 *   { id: 'C1', name: 'T-Shirt', price: 500 },
 *   { id: 'C2', name: 'Jeans', price: 1500 }
 * ]
 */
