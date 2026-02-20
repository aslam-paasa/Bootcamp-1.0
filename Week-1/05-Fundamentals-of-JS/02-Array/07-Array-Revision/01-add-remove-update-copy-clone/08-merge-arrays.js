/**
 * Concat Method:
 * - Do ya do se zyada arrays ko ek saath merge karke new array banata hai
 * - Original arrays ko modify nahi karta
 * - Syntax: array1.concat(array2, array3, ...)
 * 
 * Real World Example - E-commerce Shopping Cart:
 * - User ke different shopping sessions ke items ko combine karna
 * - Saved for Later items ko current cart mein add karna
 */

/**
 * Shopping Cart Example
*/
const currentCart = [
    { id: 1, name: "iPhone", price: 999 },
    { id: 2, name: "AirPods", price: 199 }
];

const savedForLater = [
    { id: 3, name: "MacBook", price: 1299 },
    { id: 4, name: "iPad", price: 799 }
];

/**
 * Combine current cart with saved items
*/
const completeCart = currentCart.concat(savedForLater);
console.log("Complete Shopping Cart:");
console.log(completeCart);

/**
 * Multiple arrays ko bhi combine kar sakte hain
*/
const wishlist = [
    { id: 5, name: "Apple Watch", price: 399 }
];

const finalCart = currentCart.concat(savedForLater, wishlist);
console.log("\nFinal Cart with Wishlist:");
console.log(finalCart);

/**
 * Original arrays unchanged rahenge
*/
console.log("\nOriginal Arrays:");
console.log("Current Cart:", currentCart);
console.log("Saved Items:", savedForLater);
console.log("Wishlist:", wishlist);