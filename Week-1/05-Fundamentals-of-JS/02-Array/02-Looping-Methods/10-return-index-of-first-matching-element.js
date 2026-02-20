/**
 * Step 10: findIndex() - Returns index of first matching element
*/

/* First Rahul ka index */
const rahulIndex = users.findIndex(user => user.name === "Rahul");
console.log("First Rahul index:", rahulIndex); // 0

/* User with age < 20 (doesn't exist) */
const youngIndex = users.findIndex(user => user.age < 20);
console.log("Young user index:", youngIndex); // -1 (not found)



/**
 * Example: Product Search by Index
*/

const products = [
    { id: 101, name: "iPhone 14", price: 79999, category: "mobile" },
    { id: 102, name: "Samsung Galaxy", price: 49999, category: "mobile" },
    { id: 201, name: "MacBook Pro", price: 149999, category: "laptop" },
    { id: 202, name: "Dell XPS", price: 89999, category: "laptop" },
    { id: 301, name: "Apple Watch", price: 29999, category: "wearable" }
];

/* Find index of a product by ID */
function getProductIndexById(productId) {
    return products.findIndex(product => product.id === productId);
}

/* Find index of a product by (case-insensitive) name search */
function getProductIndexByNameFragment(fragment) {
    return products.findIndex(product =>
        product.name.toLowerCase().includes(fragment.toLowerCase())
    );
}

/* Find index of first product by category */
function getProductIndexByCategory(category) {
    return products.findIndex(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );
}

/* Find index of first product above a certain price */
function getProductIndexAbovePrice(minPrice) {
    return products.findIndex(product =>
        product.price > minPrice
    );
}

console.log("Product Search Results:");
console.log("Index for product ID 201:", getProductIndexById(201));             // 2
console.log("Index for product named with 'iPhone':", getProductIndexByNameFragment("iphone")); // 0
console.log("Index for product named with 'watch':", getProductIndexByNameFragment("watch"));   // 4
console.log("Index for category 'laptop':", getProductIndexByCategory("laptop"));              // 2
console.log("Index for first product above 1,00,000:", getProductIndexAbovePrice(100000));      // 2
console.log("Index for product ID 999 (not found):", getProductIndexById(999));                // -1