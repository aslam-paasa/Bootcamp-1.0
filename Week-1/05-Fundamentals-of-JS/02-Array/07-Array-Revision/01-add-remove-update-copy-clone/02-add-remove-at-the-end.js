/**
 * Array ke end mein elements add/remove karne ke methods:
 * 
 * 1. push() method:
 *    - Array ke end mein ek ya multiple elements add karne ke liye
 *    - Return karta hai array ki new length
 *    - Ex: shoppingCart.push("Laptop") : shopping cart mein laptop add ho jayega
 * 
 * 2. pop() method:
 *    - Array ke end se last element ko remove karta hai
 *    - Return karta hai removed element
 *    - Ex: shoppingCart.pop() : last added item remove ho jayega
 */


let shoppingCart = ["Shirt", "Jeans", "Shoes", "Watch", "Belt"];
displayCart(shoppingCart);



/**
 * Push method:
 * - push() method ke 2 important points:
 *   a. Kya add kar sakte hain? 
 *      - Koi bhi item add kar sakte hain, wo cart ke end mein add ho jayega
 *   b. Kya return karta hai? 
 *      - Cart mein total items ki count return karta hai
*/

/**
 * 1. Add single item at the end of the cart:
 */
console.log("\n1. Single item add karna: ");
shoppingCart.push("Laptop");
displayCart(shoppingCart);


/**
 * 2. Add multiple items at the end of the cart:
 */
console.log("\n2. Multiple items add karna: ");
shoppingCart.push("Headphones", "Mouse", "Keyboard");
displayCart(shoppingCart);


/**
 * 3. Check the return value of push() method:
 */
console.log("\n3. Check the return value of push() method: ");
let totalItems = shoppingCart.push("Monitor", "Webcam");
console.log("Total items in cart: " + totalItems);    // 11 items
displayCart(shoppingCart);


/**
 * Pop() method:
 * - pop() method ke 2 important points:
 *   a. Kya remove karta hai?
 *      - Cart se last added item ko remove karta hai
 *   b. Kya return karta hai?
 *      - Removed item ko return karta hai
 */


/**
 * 1. Remove single item from cart:
 */
console.log("\n1. Single item remove karna: ");
let removedItem = shoppingCart.pop();
console.log("Removed item: " + removedItem);  // Webcam
displayCart(shoppingCart);

/**
 * 2. Remove multiple items from cart:
 */
console.log("\n2. Multiple items remove karna: ");
let removedItems = [];
for(let i = 0; i < 3; i++) {
    removedItems.push(shoppingCart.pop());
}
console.log("Removed items: " + removedItems);  // [Monitor, Keyboard, Mouse]
displayCart(shoppingCart);

/**
 * 3. Helper function to display cart items and count
 */
console.log("\n3. Check the cart items and count: ");
function displayCart(cart){
    if(cart.length === 0) {
        console.log("Cart is empty");
    } else {
        console.log("Cart Items: " + cart + " | Total Items: " + cart.length);
    }
}

displayCart(shoppingCart);