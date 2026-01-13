/**
 * findIndex - E-commerce Product Search:
 * - It returns the 'index' of the first element that satisfies the condition.
 * - If no element satisfies the condition, it returns -1.
 * 
 * Note: It returns 'index' of the first element that satisfies the condition.
 * 
 * Example:
 * - Product inventory mein se specific criteria ke hisab se product dhundna
 * - Like Out of stock products ya specific price range ke products
 */

let products = [
    { id: "P001", name: "iPhone 13", price: 79999, stock: 5, category: "Electronics" },
    { id: "P002", name: "Samsung TV", price: 45999, stock: 0, category: "Electronics" },
    { id: "P003", name: "Nike Shoes", price: 4999, stock: 10, category: "Fashion" },
    { id: "P004", name: "MacBook Pro", price: 129999, stock: 3, category: "Electronics" },
    { id: "P005", name: "Sony Headphones", price: 8999, stock: 0, category: "Electronics" },
    { id: "P006", name: "Levi's Jeans", price: 2999, stock: 15, category: "Fashion" }
];

/**
 * Ex-1: Electronics category ka pehla out of stock product dhundna:
 */
let outOfStockElectronicsIndex = products.findIndex(function(product) {
    return product.category === "Electronics" && product.stock === 0;
});

if (outOfStockElectronicsIndex !== -1) {
    let product = products[outOfStockElectronicsIndex];
    console.log(`Out of stock product found: ${product.name} (${product.id})`);
    console.log(`Price: ₹${product.price}`);
} else {
    console.log("No out of stock electronics found!");
}

/**
 * Ex-2: 5000-10000 price range ka pehla fashion product dhundna:
 */
let affordableFashionIndex = products.findIndex(function(product) {
    return product.category === "Fashion" && 
           product.price >= 5000 && 
           product.price <= 10000;
});

if (affordableFashionIndex !== -1) {
    let product = products[affordableFashionIndex];
    console.log(`\nAffordable fashion product found: ${product.name} (${product.id})`);
    console.log(`Price: ₹${product.price}`);
} else {
    console.log("\nNo affordable fashion products found in this range!");
}