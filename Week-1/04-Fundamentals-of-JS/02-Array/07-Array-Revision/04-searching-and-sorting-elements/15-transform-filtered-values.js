/**
 * Map + Filter + Arrow Function:
 * 1. Real World Example: E-commerce website pe products ko filter aur transform karna
 * 2. Scenario: Electronics category ke products ko filter karke unke discounted prices calculate karna
 */

const products = [
    { id: 1, name: "Laptop", price: 45000, category: "Electronics" },
    { id: 2, name: "T-shirt", price: 999, category: "Clothing" },
    { id: 3, name: "Headphones", price: 2500, category: "Electronics" },
    { id: 4, name: "Jeans", price: 1999, category: "Clothing" },
    { id: 5, name: "Smartphone", price: 15000, category: "Electronics" }
];

/**
 * 1. Map ka use - har product ke liye boolean value return karega
 */
const isElectronicsProduct = products.map(product => product.category === "Electronics");
console.log("Is Electronics Products:", isElectronicsProduct);
// Output: [true, false, true, false, true]

/**
 * 2. Filter ka use - sirf electronics products ko return karega
 */
const electronicsProducts = products.filter(product => product.category === "Electronics");
console.log("Electronics Products:", electronicsProducts);


/**
 * Output: [
 *   { id: 1, name: "Laptop", price: 45000, category: "Electronics" },
 *   { id: 3, name: "Headphones", price: 2500, category: "Electronics" },
 *   { id: 5, name: "Smartphone", price: 15000, category: "Electronics" }
 * ]
 */

/**
 * Explanation:
 * 1. map() har product ke liye ek boolean value return karta hai (true/false)
 * 2. filter() sirf electronics category ke products ko return karta hai
 * 3. Arrow function ka use karke code concise aur readable banaya hai
 * 4. Real world example mein e-commerce products ko use karke practical use case dikhaya hai
 */