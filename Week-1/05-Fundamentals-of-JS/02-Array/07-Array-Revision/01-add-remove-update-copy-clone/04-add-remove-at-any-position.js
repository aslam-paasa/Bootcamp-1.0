/**
 * Splice Method: (Array k kisi part ko hata dega)
 * - It modifies the original array by removing, replacing, or adding elements.
 * - Syntax: array.splice(startingIndex, deleteCount, item1, item2, ...)
 * 
 * - It takes 3 parameters:
 *   a. startingIndex - Kahan se shuru karna hai
 *   b. deleteCount   - Kitne elements delete karne hain
 *   c. New elements   - Kya add karna hai (optional)
 * 
 * - It returns the deleted elements
 * - It modifies the original array
*/ 


/**
 * Ex: Shopping Cart
 */
let shoppingCart = ["Laptop", "Mouse", "Keyboard", "Headphones", "Monitor"];



/**
 * 1. Removing Element at any position:
 *    - We can remove element at any position using splice method
 *    - array.splice(startIndex, numberOfItemsToRemove);
 * 
 *    - Isme 2 parameters hote hain:
 *      a. startIndex: Array mein kahan se elements remove karne hain
 *      b. numberOfItemsToRemove: Koi bhi existing elements remove nahi karne hain
*/


/**
 * Scenario-1: Customer ne Mouse aur Keyboard ko cancel kiya
*/
console.log("\nScenario 1: Replace multiple items with one item");

let removedItems = shoppingCart.splice(1, 2);
console.log("Removed items:", removedItems); // ['Mouse', 'Keyboard']
console.log("Updated cart:", shoppingCart); // ['Laptop', 'Mousepad', 'Headphones', 'Monitor']



/**
 * Scenario-2: Customer ne Headphones aur Monitor ko cancel kiya
*/
console.log("\nScenario 2: Replace multiple items with one item");

removedItems = shoppingCart.splice(2, 2);
console.log("Removed items:", removedItems); // ['Headphones', 'Monitor']
console.log("Updated cart:", shoppingCart); // ['Laptop', 'Mousepad', 'Webcam']



/**
 * Scenario-3: Customer ne sirf Mousepad ko cancel kiya
*/
console.log("\nScenario 3: Remove single item");

removedItems = shoppingCart.splice(1, 1);
console.log("Removed item:", removedItems); // ['Mousepad']
console.log("Updated cart:", shoppingCart); // ['Laptop', 'Webcam']




/**
 * 2. Adding Element at any position:
 *    - We can add element at any position using splice method
 *    - array.splice(startIndex, 0, item1, item2, ...);
 * 
 *    - Isme 3 parameters hote hain:
 *      a. startIndex: Array mein kahan se elements add karne hain
 *      b. 0: Koi bhi existing elements remove nahi karne hain
 *      c. item1, item2, ...: Array mein add karne wale new elements
*/



/**
 * Scenario 1: Mouse aur Monitor ke beech mein Mousepad add karna
*/
console.log("\nScenario 1: Mouse aur Monitor ke beech mein Mousepad add karna");
shoppingCart.splice(2, 0, "Mousepad");
console.log("Updated cart:", shoppingCart); 



/**
 * Scenario 2: Multiple items add karna - Keyboard ke pehle Headphones aur Webcam
*/
console.log("\nScenario 2: Multiple items add karna");
shoppingCart.splice(4, 0, "Headphones", "Webcam");
console.log("Updated cart:", shoppingCart); 



/**
 * Scenario 3: Cart ke shuru mein priority items add karna
*/
console.log("\nScenario 3: Priority items add karna");
shoppingCart.splice(0, 0, "Gaming Chair", "Desk Lamp");
console.log("Updated cart:", shoppingCart);





/**
 * 
 * 3. Replace Element at any position:
 *    - We can replace element at any position using splice method
 *    - array.splice(startIndex, numberOfItemsToRemove, item1, item2, ...);
 * 
 *    - Isme 3 parameters hote hain:
 *      a. startIndex: Array mein kahan se elements replace karne hain
 *      b. numberOfItemsToRemove: Koi bhi existing elements remove nahi karne hain
 *      c. item1, item2, ...: Array mein replace karne wale new elements
*/ 


/** 
 * Real World Example - Product Inventory Update:
 * - Store manager needs to update product inventory
 * - Replace old stock with new stock
 * - Add new products
 * - Remove discontinued items
 * 
 * Explanation:
 * 1. Pehle humne inventory array banaya jisme current products hain
 * 2. Phir humne 3 operations perform kiye:
 *    a. iPhone 12 ko iPhone 13 se replace kiya (splice(0, 1, "iPhone 13"))
 *    b. Middle mein 2 new products add kiye (splice(2, 0, "Samsung S21", "OnePlus 9"))
 *    c. Discontinued products ko remove karke new products add kiye
 *       (splice(3, 2, "Pixel 6", "iPhone 14"))
 * 3. Har operation ke baad humne inventory ko update kiya aur changes ko display kiya
*/

let inventory = ["iPhone 12", "Samsung S20", "OnePlus 8", "Pixel 5", "iPhone 11"];


/**
 * Scenario 1: Replace old iPhone 12 with new iPhone 13
*/
console.log("\n1. Replacing old model with new model:");

let replacedItems = inventory.splice(0, 1, "iPhone 13");
console.log("Replaced item:", replacedItems); // ['iPhone 12']
console.log("Updated inventory:", inventory);



/**
 * Scenario 2: Add new products in the middle
*/
console.log("\n2. Adding new products:");
inventory.splice(2, 0, "Samsung S21", "OnePlus 9");
console.log("Updated inventory:", inventory);



/**
 * Scenario 3: Remove discontinued items and add new ones
*/
console.log("\n3. Updating discontinued items:");

replacedItems = inventory.splice(3, 2, "Pixel 6", "iPhone 14");
console.log("Removed items:", replacedItems); // ['OnePlus 8', 'Pixel 5']
console.log("Final inventory:", inventory);