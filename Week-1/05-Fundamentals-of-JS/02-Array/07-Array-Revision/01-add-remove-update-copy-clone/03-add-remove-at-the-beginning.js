/**
 * Add/Remove elements at the beginning of an array:
 * 1. unshift() method:
 *    - Array ke shuru mein ek ya multiple elements add karne ke liye
 *    - Return karta hai array ki new length
 *    - Ex: Shopping cart mein agar aap koi priority item add karna chahte hain
 *      toh wo sabse pehle dikhega
 * 
 * 2. shift() method:
 *    - Array ke shuru se first element ko remove karta hai
 *    - Return karta hai removed element
 *    - Ex: Shopping cart se sabse pehle add kiya gaya item remove karna
 * 
 */



let shoppingCart = ["Shirt", "Jeans", "Shoes", "Watch", "Belt"];
displayCart(shoppingCart);




/**
 * Unshift method:
 * - Unshift method ke 2 important points:
 * a. Kya add kar sakte hain? 
 *    - Koi bhi item add kar sakte hain, wo cart ke shuru mein add ho jayega
 * b. Kya return karta hai? 
 *    - Cart mein total items ki count return karta hai
*/

/**
 * 1. Single priority item add karna
 */
console.log("\n1. Single priority item add karna: ");
shoppingCart.unshift("Laptop"); // Laptop priority item hai
displayCart(shoppingCart);

/**
 * 2. Multiple priority items add karna
 */
console.log("\n2. Multiple priority items add karna: ");
shoppingCart.unshift("Headphones", "Mouse", "Keyboard");
displayCart(shoppingCart);

/**
 * 3. Check return value
 */
console.log("\n3. Check return value: ");
let totalItems = shoppingCart.unshift("Monitor", "Webcam");
console.log("Total items in cart: " + totalItems);
displayCart(shoppingCart);




/**
 * Shift method:
 * - Shift method ke 2 important points:
 * a. Kya remove kar sakte hain? 
 *    - Koi bhi item remove kar sakte hain, wo cart ke shuru se remove ho jayega
 * b. Kya return karta hai? 
 *    - Removed item ko return karta hai
 */

/**
 * 1. Remove first item
 */
console.log("\n1. First item remove karna: ");
let removedItem = shoppingCart.shift();
console.log("Removed item: " + removedItem);
displayCart(shoppingCart);

/**
 * 2. Remove multiple items
 */
console.log("\n2. Multiple items remove karna: ");
let removedItems = [];
for(let i = 0; i < 3; i++) {
    removedItems.push(shoppingCart.shift());
}
console.log("Removed items: " + removedItems);
displayCart(shoppingCart);

/**
 * 3. Helper function to display cart
 */
console.log("\n3. Check the cart items and count: ");
function displayCart(cart) {
    if(cart.length === 0) {
        console.log("Cart is empty");
    } else {
        console.log("Cart Items: " + cart + " | Total Items: " + cart.length);
    }
}
