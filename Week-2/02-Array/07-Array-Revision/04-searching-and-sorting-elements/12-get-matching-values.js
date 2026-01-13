/**
 * filter():
 * - Complex search for all matches.
 * - It returns all the elements that passes the condition.
 */

/**
 * Real World Example: E-commerce website pe products ko filter karna
 * Data: Sample products array
 */
const products = [
    { id: 1, name: "Laptop", price: 45000, category: "Electronics" },
    { id: 2, name: "T-shirt", price: 999, category: "Clothing" },
    { id: 3, name: "Headphones", price: 2500, category: "Electronics" },
    { id: 4, name: "Jeans", price: 1999, category: "Clothing" },
    { id: 5, name: "Smartphone", price: 15000, category: "Electronics" }
];

/**
 * Ex-1: Electronics category ke products filter karna
 */
const electronicsProducts = products.filter((product) => {
    return product.category === "Electronics";
});

console.log("Electronics Products:", electronicsProducts);

/**
 * Output: Electronics Products: [
 *   { id: 1, name: "Laptop", price: 45000, category: "Electronics" },
 *   { id: 3, name: "Headphones", price: 2500, category: "Electronics" },
 *   { id: 5, name: "Smartphone", price: 15000, category: "Electronics" }
 * ]
 */



/**
 * Ex-2: 1000 se upar price wale products filter karna
 */
const expensiveProducts = products.filter((product) => {
    return product.price > 1000;
});

console.log("Expensive Products:", expensiveProducts);
/* Output: Expensive Products: [
 *   { id: 1, name: "Laptop", price: 45000, category: "Electronics" },
 *   { id: 3, name: "Headphones", price: 2500, category: "Electronics" },
 *   { id: 4, name: "Jeans", price: 1999, category: "Clothing" },
 *   { id: 5, name: "Smartphone", price: 15000, category: "Electronics" }
 * ]
 */
