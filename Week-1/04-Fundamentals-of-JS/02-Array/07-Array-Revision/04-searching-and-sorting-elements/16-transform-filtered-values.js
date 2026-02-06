/**
 * Assignment: Product Price Analysis and Name Transformation
 * Task: Products ke prices ke hisab se unke names ko transform karna
 * 
 * Requirements:
 * 1. High value products (>=100) ke names ko uppercase mein convert karna
 * 2. Low value products (<100) ke names ko lowercase mein convert karna
 * 3. Dono approaches se solve karna - arrow function aur normal function
 */

const productInventory = [
    { name: "T-Shirt", price: 25 },
    { name: "Headphones", price: 125 },
    { name: "Keyboard", price: 75 },
    { name: "Monitor", price: 200 }
];

/**
 * Approach 1: Using arrow functions (Modern approach)
 */
const highValueProductNames = productInventory
    .filter(product => product.price >= 100)
    .map(product => product.name.toUpperCase());
console.log("High Value Products (Arrow Function):", highValueProductNames);



/**
 * Approach 2: Using traditional functions
 */
const highValueProductNamesTraditional = productInventory
    .filter(function(product, index, originalArray) {
        return product.price >= 100;
    })
    .map(function(product, index, originalArray) {
        return product.name.toUpperCase();
    });
console.log("High Value Products (Traditional Function):", highValueProductNamesTraditional);



/**
 * Approach 3: Single map operation for all products
 */
const transformedProductNames = productInventory.map(function(product) {
    return product.price >= 100 
        ? product.name.toUpperCase() 
        : product.name.toLowerCase();
});
console.log("All Products with Transformed Names:", transformedProductNames);