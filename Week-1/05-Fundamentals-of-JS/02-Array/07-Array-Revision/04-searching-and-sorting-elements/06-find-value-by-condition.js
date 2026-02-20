/**
 * find:
 * - It returns the first 'element' that satisfies the condition.
 * - If no element satisfies the condition, it returns undefined.
 * 
 * Note: It returns the first 'element' that satisfies the condition.
 * 
 * E-commerce Product Search Example using find()
 * - Complex product search with multiple conditions
 * - Finding first product that matches specific criteria
 */

let products = [
    { 
        id: "P001", 
        name: "iPhone 13", 
        price: 79999, 
        stock: 5, 
        category: "Electronics",
        rating: 4.5,
        discount: 10,
        isNewArrival: true
    },
    { 
        id: "P002", 
        name: "Samsung TV", 
        price: 45999, 
        stock: 0, 
        category: "Electronics",
        rating: 4.2,
        discount: 0,
        isNewArrival: false
    },
    { 
        id: "P003", 
        name: "Nike Shoes", 
        price: 4999, 
        stock: 10, 
        category: "Fashion",
        rating: 4.8,
        discount: 15,
        isNewArrival: true
    },
    { 
        id: "P004", 
        name: "MacBook Pro", 
        price: 129999, 
        stock: 3, 
        category: "Electronics",
        rating: 4.7,
        discount: 5,
        isNewArrival: false
    }
];

/**
 * Ex-1: Complex product search with multiple conditions:
 * - Product should be:
 *   1. In stock
 *   2. Have rating >= 4.5
 *   3. Have discount > 0
 *   4. Price less than 100000
 */
let bestDeal = products.find(function(product) {
    return product.stock > 0 && 
           product.rating >= 4.5 && 
           product.discount > 0 && 
           product.price < 100000;
});

/**
 * If bestDeal is found, print the details:
 */
if (bestDeal) {
    console.log("Best Deal Found:");
    console.log(`Product: ${bestDeal.name}`);
    console.log(`Price: ₹${bestDeal.price}`);
    console.log(`Discount: ${bestDeal.discount}%`);
    console.log(`Rating: ${bestDeal.rating}`);
    console.log(`Category: ${bestDeal.category}`);
} else {
    console.log("No product matches the criteria!");
}




/**
 * Ex-2: Finding first new arrival in Electronics category
 */
let newElectronics = products.find(function(product) {
    return product.category === "Electronics" && 
           product.isNewArrival === true;
});

if (newElectronics) {
    console.log("\nNew Electronics Arrival:");
    console.log(`Product: ${newElectronics.name}`);
    console.log(`Price: ₹${newElectronics.price}`);
} else {
    console.log("\nNo new electronics arrivals found!");
}