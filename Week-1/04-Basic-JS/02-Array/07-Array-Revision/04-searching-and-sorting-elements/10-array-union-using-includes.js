/**
 * Array Union using includes() method
 * - Union matlab dono arrays ke unique elements
 * - includes() method check karta hai ki element array mein hai ya nahi
 */

/**
 * Sample arrays
 */
const arrayOne = [10, 50, 70, 80, 90, 100, 30, 60];
const arrayTwo = [11, 50, 75, 85, 90, 100, 34, 60];

/**
 * Union find karne ka logic:
 * 1. arrayTwo ke elements ko filter karo jo arrayOne mein nahi hain
 * 2. includes() method se check karo ki element arrayOne mein hai ya nahi
 * 3. Filtered elements ko arrayOne ke saath concat karo
 */
const uniqueElements = arrayTwo.filter(element => !arrayOne.includes(element));
console.log("ArrayTwo ke unique elements:", uniqueElements); // [11, 75, 85, 34]

const union = arrayOne.concat(uniqueElements);
console.log("Dono arrays ka union:", union + '\n'); // [10, 50, 70, 80, 90, 100, 30, 60, 11, 75, 85, 34]





/**
 * Ex: E-commerce Product Categories
 * - Dono users ke favorite product categories ka union find karna
 * - Isse hum users ko combined interests ke products recommend kar sakte hain
 */

/**
 * Users ke favorite product categories:
 */
const user1Categories = ["Electronics", "Fashion", "Books", "Sports", "Home"];
const user2Categories = ["Fashion", "Beauty", "Sports", "Toys", "Electronics", "Gaming"];

/**
 * Union find karne ka logic:
 * 1. user2Categories ke elements ko filter karo jo user1Categories mein nahi hain
 * 2. includes() method se check karo ki element user1Categories mein hai ya nahi
 * 3. Filtered elements ko user1Categories ke saath concat karo
 */
const uniqueCategories = user2Categories.filter(category => !user1Categories.includes(category));
console.log("User2 ke unique categories:", uniqueCategories); // ["Beauty", "Toys", "Gaming"]

const allCategories = user1Categories.concat(uniqueCategories);
console.log("Dono users ke combined categories:", allCategories); 
// ["Electronics", "Fashion", "Books", "Sports", "Home", "Beauty", "Toys", "Gaming"]

/**
 * Ab hum in combined categories ke products recommend kar sakte hain
 */
console.log("\nRecommended Products for Combined Interests:");
allCategories.forEach(category => {
    console.log(`- ${category} category ke trending products`);
});