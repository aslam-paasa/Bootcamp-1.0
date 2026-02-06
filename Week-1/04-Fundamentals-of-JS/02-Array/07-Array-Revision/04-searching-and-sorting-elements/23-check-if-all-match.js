/**
 * every() Method:
 * - Check if all elements satisfy the condition.
 *   a. If Yes -> return true
 *   b. If No  -> return false
 * 
*/

/**
 * Data: Shopping cart items with stock status
 */
const cartItems = [
    { name: "T-shirt", price: 499, inStock: true },
    { name: "Jeans", price: 999, inStock: true },
    { name: "Socks", price: 199, inStock: true },
    { name: "Cap", price: 299, inStock: false }
];

/**
 * Check if all items are in stock
 */
const allItemsInStock = cartItems.every(item => item.inStock);
console.log("Kya saare items in stock hain?", allItemsInStock); // false (Cap out of stock hai)


/**
 * Check if all items are affordable (price < 1000)
 */
const allItemsAffordable = cartItems.every(item => item.price < 1000);
console.log("Kya saare items affordable hain?", allItemsAffordable); // true (koi bhi item 1000 se expensive nahi hai)

/**
 * every() Method ka Use Cases:
 * 1. Shopping cart mein check karna ki saare items in stock hain
 * 2. Student list mein check karna ki saare students ne exam diya hai
 * 3. Product inventory mein check karna ki saare items ka price update ho gaya hai
 * 4. User permissions mein check karna ki saare users ne terms accept kiye hain
 */