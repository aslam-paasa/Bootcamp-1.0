/**
 * Step 8: find() - Return first matching element
*/

const users = [
    { id: 1, name: "Rahul", age: 25 },
    { id: 2, name: "Priya", age: 22 },
    { id: 3, name: "Amit", age: 30 },
    { id: 4, name: "Rahul", age: 28 }
];

/* First user with name "Rahul" */
const firstRahul = users.find(user => user.name === "Rahul");
console.log("First Rahul:", firstRahul); // { id: 1, name: "Rahul", age: 25 }

/* User with age > 25 */
const adult = users.find(user => user.age > 25);
console.log("First adult (>25):", adult); // { id: 3, name: "Amit", age: 30 }



/**
 * Example: Product Search
*/

const products = [
    { id: 101, name: "iPhone 14", price: 79999, category: "mobile" },
    { id: 102, name: "Samsung Galaxy", price: 49999, category: "mobile" },
    { id: 201, name: "MacBook Pro", price: 149999, category: "laptop" },
    { id: 202, name: "Dell XPS", price: 89999, category: "laptop" }
];

/* Product by ID search */
function findProductById(productId) {
    return products.find(product => product.id === productId);
}

/* Product by name search */
function findProductByName(productName) {
    return products.find(product => 
        product.name.toLowerCase().includes(productName.toLowerCase())
    );
}

console.log("Product Search Results:");
console.log("Product ID 201:", findProductById(201)?.name);
console.log("Product with 'iPhone':", findProductByName("iphone")?.name);
console.log("Product with 'Pro':", findProductByName("pro")?.name);