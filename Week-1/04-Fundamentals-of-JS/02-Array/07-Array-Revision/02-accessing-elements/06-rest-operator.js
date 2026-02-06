
/**
 * Rest Operator (...):
 * - Function parameters mein multiple values ko ek array mein collect karta hai
 * - Real world use case - Dynamic number of arguments handle karna
 * 
 * Rest Operator ka Meaning:
 * - "Rest" ka matlab hai "baaki sab" ya "remaining"
 * - Ye operator baaki ke saare elements ko ek array mein collect karta hai
 * 
 * Kab Use Karein:
 * 1. Jab aapko pata nahi ki kitne arguments aayenge
 * 2. Jab aap multiple values ko ek array mein collect karna chahte hain
 * 3. Array destructuring mein remaining elements ko collect karne ke liye
 * 
 * Purpose:
 * 1. Dynamic arguments ko handle karna
 * 2. Code ko more flexible banana
 * 3. Array manipulation ko simplify karna
 * 
 * Real World Example - E-commerce Shopping Cart:
 * - User ke cart mein multiple items ho sakte hain
 * - Har item ka price aur quantity different ho sakta hai
 * - Total price calculate karna with dynamic number of items
 */


/**
 * Shopping cart items with different prices and quantities
 */
const cartItems = [
    { name: "Laptop", price: 999, quantity: 1 },
    { name: "Mouse", price: 25, quantity: 2 },
    { name: "Keyboard", price: 50, quantity: 1 },
    { name: "Headphones", price: 100, quantity: 1 }
];


/**
 * 1. Calculate total price with dynamic number of items
 */
function calculateTotal(...items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}


/**
 * 2. Calculate total for all items
 */
const total = calculateTotal(...cartItems);
console.log("\nTotal Price:", total);


/**
 * 3. Calculate total for specific items
 */
const selectedItems = calculateTotal(
    cartItems[0], // Laptop
    cartItems[2]  // Keyboard
);
console.log("\nSelected Items Total:", selectedItems);


/**
 * 4. Rest operator with array destructuring
 */
const [firstItem, secondItem, ...remainingItems] = cartItems;
console.log("\nFirst Item:", firstItem);
console.log("Second Item:", secondItem);
console.log("Remaining Items:", remainingItems);


/**
 * 5. Rest operator in function parameters
 */
function processOrder(customerName, ...items) {
    console.log(`\nProcessing order for ${customerName}:`);
    items.forEach(item => {
        console.log(`- ${item.name}: ${item.quantity} x $${item.price}`);
    });
}

processOrder("John Doe", ...cartItems);