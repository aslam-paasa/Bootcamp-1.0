/**
 * Spread Operator ka use Arrays ke saath
 * - Arrays ke saath:
 *   a. Jab arrays ko combine karna ho
 *   b. Jab array ke elements ko individual values mein convert karna ho
 *   c. Jab array ko copy karna ho (shallow copy)
*/


/**
 * Use Case 1: Merging multiple arrays using Spread Operator
 * - Spread Operator se hum 2 arrays ko ek saath combine kar sakte hain
 * - Iske 2 main use cases hain:
 *   1. Arrays ko combine karna (concatenate)
 *   2. Ek array ko dusre array mein copy karna
 */

/**
 * Example Data:
*/
const team1 = ['user1', 'user2'];
const team2 = ['user3'];


/**
 * Method 1: concat() method se combine karna
 * - Ye purana tarika hai
*/
const combinedTeam1 = team1.concat(team2);
console.log('Using concat():', combinedTeam1);  // ['user1', 'user2', 'user3']


/**
 * Method 2: Spread Operator se combine karna
 * - Ye modern aur easy tarika hai
*/
const combinedTeam2 = [...team1, ...team2];
console.log('Using spread:', combinedTeam2);    // ['user1', 'user2', 'user3']

/**
 * Kya use karein - concat() ya spread operator?
 * 1. Agar sirf 2 arrays ko combine karna hai:
 *    - concat() method use karein
 *    - Example: array1.concat(array2)
 * 
 * 2. Agar 2 se zyada arrays ko combine karna hai:
 *    - spread operator use karein (zyada easy hai)
 *    - Example: [...array1, ...array2, ...array3]
 */


/**
 * Example: E-commerce Cart System
 * - Scenario: Humare pass 3 different arrays hain:
 *   1. Cart items (user ke cart mein jo items hain)
 *   2. Wishlist items (user ne wishlist mein add kiye hain)
 *   3. Recently viewed items (user ne recently dekhe hain)
 * 
 * - Task: In sabhi items ko ek saath display karna hai "All Items" section mein
*/

/**
 * Cart items data:
*/
const cartItems = [
    { id: 1, name: 'iPhone', price: 50000 },
    { id: 2, name: 'Samsung', price: 30000 }
];

/**
 * Wishlist items data:
*/
const wishlistItems = [
    { id: 3, name: 'Laptop', price: 60000 },
    { id: 4, name: 'Tablet', price: 20000 }
];

/**
 * Recently viewed items data:
*/
const recentItems = [
    { id: 5, name: 'Headphones', price: 5000 }
];

/**
 * Method 1: Using concat() (Old way)
*/
const allItems1 = cartItems.concat(wishlistItems, recentItems);
console.log('All Items (concat):', allItems1);

/**
 * Method 2: Using spread operator (Modern way)
*/
const allItems2 = [...cartItems, ...wishlistItems, ...recentItems];
console.log('All Items (spread):', allItems2);

/**
 * Display total items count
*/
console.log(`Total items: ${allItems2.length}`);  // Output: Total items: 5

/**
 * Calculate total price
*/
const totalPrice = allItems2.reduce((sum, item) => sum + item.price, 0);
console.log(`Total price: ₹${totalPrice}`);  // Output: Total price: ₹165000




/**
 * Issue with strings using spread operator:
*/

const teamOne = ['user1', 'user2'];
const newMember = "newMember";

/**
 * Method 1: concat() method se add karna (Recommended)
 * - Ye simple aur clear tarika hai
 * - String ko directly add kar deta hai
 */
console.log('Using concat():', teamOne.concat(newMember));
// Output: ['user1', 'user2', 'newMember']


/**
 * Method 2: Spread Operator se add karna (Not Recommended)
 * - Ye string ko character-by-character spread kar deta hai
 * - Har character ko alag value ke roop mein treat karta hai
 * - Isliye ye galat output deta hai
 */
console.log('Using spread (wrong way):', [...teamOne, ...newMember]);
// Output: ['user1', 'user2', 'n', 'e', 'w', 'M', 'e', 'm', 'b', 'e', 'r']

/**
 * Note: 
 * 1. String ko array mein add karne ke liye concat() method use karein
 * 2. Spread operator string ke saath use karne se bachein
 * 3. Spread operator sirf arrays aur objects ke saath use karein
 */

/**
 * Ex: E-commerce website mein product categories ko combine karna
*/

/**
 * Product categories data:
*/
const electronics = ['Laptop', 'Mobile', 'Tablet'];
const newCategory = "Smartwatch";

/**
 * a. Wrong way - Spread operator se
*/
const allCategoriesWrong = [...electronics, ...newCategory];
console.log('Wrong way:', allCategoriesWrong);
// Output: ['Laptop', 'Mobile', 'Tablet', 'S', 'm', 'a', 'r', 't', 'w', 'a', 't', 'c', 'h']

/**
 * b. Correct way - concat() se
*/
const allCategoriesCorrect = electronics.concat(newCategory);
console.log('Correct way:', allCategoriesCorrect);
// Output: ['Laptop', 'Mobile', 'Tablet', 'Smartwatch']

/**
 * Ab hum in categories ko display kar sakte hain
*/
allCategoriesCorrect.forEach(category => {
    console.log(`- ${category}`);
});

/**
 * Output:
 * - Laptop
 * - Mobile
 * - Tablet
 * - Smartwatch
*/


/**
 * Why did this issue occur?
 * - String k case m:
 *   a. JS mein strings internally character array ki tarah
 *      treat hoti hai.
 *   b. Jab  ...newMember ya ..."Smartwatch" likhte hain to
 *      to spread operator string ko character-by-character
 *      kar deta hai.
 *   c. Isliye "Smartwatch" string ["S", "m", "a", "r", "t",
 *      "w", "a", "t", "c", "h"] mai convert ho jata hai.
 * 
 * - Solution: Concat() method se karein
*/

/**
 * Best Practice:
 * 1. Arrays ko combine karne k liye spread operator use karein.
 * 2. String ko array mein add karne k liye concat() method use karein.
 * 3. Spread operator sirf arrays aur objects ke saath use karein,
 *    string ke saath nahi.
*/







/**
 * Use Case 2: Copying Arrays using Spread Operator
 * - Hum ek array se dusri array banate hain
 * - Iske 2 tarike hain:
 *   1. Direct assignment (=) se
 *   2. Spread operator (...) se
*/

console.log('Array Copying Examples:');
const shoppingCart = ['Laptop', 'Mouse'];


/**
 * Method 1: Direct Assignment (=) se copy
 * - Reference copy banata hai
 * - Dono arrays same memory location ko point karte hain
 * - Ek mein change karne se dusri mein bhi change hota hai
*/
const cartCopy = shoppingCart;
console.log('Direct Copy:', cartCopy);  // ['Laptop', 'Mouse']

/**
 * Direct copy mein change :
 */
cartCopy.push('Keyboard');
console.log('Original Cart:', shoppingCart);  // ['Laptop', 'Mouse', 'Keyboard']
console.log('Direct Copy:', cartCopy);        // ['Laptop', 'Mouse', 'Keyboard']



/**
 * Method 2: Spread Operator (...) se copy
 * - Agar array nested hai to shallow copy banata hai, aur nhi to
 *   deep copy banata hai.
 * - New array create hoti hai
 * - Dono arrays alag memory locations par hote hain (deep copy)
 * - Ek mein change karne se dusri par effect nahi hota
*/
const cartClone = [...shoppingCart];
console.log('Spread Copy:', cartClone);  // ['Laptop', 'Mouse', 'Keyboard']

/**
 * Spread copy mein change :
 */
cartClone.push('Headphones');
console.log('Original Cart:', shoppingCart);  // ['Laptop', 'Mouse', 'Keyboard']
console.log('Spread Copy:', cartClone);       // ['Laptop', 'Mouse', 'Keyboard', 'Headphones']


/**
 * Ex: E-commerce Cart System
 * - Scenario:
 *   User ke shopping cart mein items hain aur wo wishlist mein
 *   add karna chahta hai, lekin cart se remove nahi karna chahta
*/

/**
 * User ka current cart
*/
const userCart = [
    { id: 1, name: 'iPhone', price: 50000 },
    { id: 2, name: 'AirPods', price: 15000 }
];

/**
 * Cart se wishlist mein move karna
*/
const wishlist = [...userCart];  // Spread operator se copy
console.log('Wishlist:', wishlist);

/**
 * Cart mein new item add karna
*/
userCart.push({ id: 3, name: 'Charger', price: 2000 });
console.log('Updated Cart:', userCart);  // Cart update hua
console.log('Wishlist:', wishlist);      // Wishlist same rahi


/**
 * Best Practices:
 * 1. Direct assignment (=) use karein jab:
 *    - Original array ke changes ko track karna ho
 *    - Memory efficient solution chahiye ho
 * 
 * 2. Spread operator (...) use karein jab:
 *    - Original array ko preserve karna ho (Jb wo nested naa ho)
 *    - Independent copy chahiye ho
 *    - Array manipulation karna ho
 * 
 * Note: Spread operator is shallow copy, so it's not recommended 
 *       for nested arrays.
 * 
 * 3. Use structuredClone(array) for nested arrays
 *    - It creates a deep copy of the array
 *    - Changes in one array won't affect the other
 *    - It's the most efficient way to create a deep copy of an array
*/


/**
 * Solution for nested arrays: (deep copy)
 * a. Use JSON.parse(JSON.stringify(array))
 * b. Use structuredClone(array)  [recommended]
*/

const cart = [
    { 
        id: 1, 
        name: 'Laptop',
        specs: { ram: '8GB', storage: '256GB' },
        price: { base: 50000, tax: 5000 }
    }
];

/**
 * Best Practice: Use structuredClone
*/
const cartBackup = structuredClone(cart);

/**
 * Ab changes independent honge
*/
cartBackup[0].specs.ram = '16GB';
cartBackup[0].price.tax = 6000;

console.log('Original Cart:', cart);
console.log('Backup Cart:', cartBackup);

