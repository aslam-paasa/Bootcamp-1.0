/**
 * some() Method ka Basic Concept:
 * - Ye method array ke elements ko check karta hai
 * - Agar koi bhi ek element condition ko satisfy karta hai, to true return karta hai
 * - Agar koi bhi element condition ko satisfy nahi karta, to false return karta hai
 * 
 * Real World Example: Shopping Cart mein check karna ki koi expensive item hai ya nahi
 */


/**
 * Data: Shopping cart items with prices
 */
const cartItems = [
    { name: "T-shirt", price: 499 },
    { name: "Jeans", price: 999 },
    { name: "Socks", price: 199 },
    { name: "Cap", price: 299 }
];


/**
 * Check if cart mein koi expensive item hai (price > 800)
 */
const hasExpensiveItem = cartItems.some(item => item.price > 800);
console.log("Kya cart mein koi expensive item hai?", hasExpensiveItem); // true (Jeans ki price 999 hai)



/**
 * Check if cart mein koi luxury item hai (price > 2000)
 */
const hasLuxuryItem = cartItems.some(item => item.price > 2000);
console.log("Kya cart mein koi luxury item hai?", hasLuxuryItem); // false (koi bhi item 2000 se expensive nahi hai)



/**
 * some() Method ka Use Cases:
 * 1. Shopping cart mein expensive items check karna
 * 2. Student list mein check karna ki koi topper hai ya nahi
 * 3. Product inventory mein check karna ki koi out of stock item hai ya nahi
 * 4. User permissions mein check karna ki koi admin user hai ya nahi
 */