/**
 * Array Intersection using includes() method
 * - Intersection matlab dono arrays mein common elements
 * - includes() method check karta hai ki element array mein hai ya nahi
 */

// Sample arrays
const arrayOne = [10, 30, 50, 70, 90];
const arrayTwo = [63, 34, 50, 90, 80, 10, 60];

// includes() method ka basic usage
console.log("Kya 80 arrayTwo mein hai?", arrayTwo.includes(80));  // true
console.log("Kya 88 arrayTwo mein hai?", arrayTwo.includes(88));  // false

/**
 * Intersection find karne ka logic:
 * 1. arrayOne ke har element ko check karo
 * 2. filter() method use karke wo elements select karo jo arrayTwo mein bhi hain
 * 3. includes() method se check karo ki element arrayTwo mein hai ya nahi
 */
const intersection = arrayOne.filter(element => arrayTwo.includes(element));
console.log("Dono arrays ke common elements:", intersection + '\n');  // [10, 50, 90]




/**
 * Ex: E-commerce Product Categories
 * - Dono users ke favorite product categories ka intersection find karna
 * - Isse hum users ko common interests ke products recommend kar sakte hain
 */

/**
 * Users ke favorite product categories:
 */
const user1Categories = ["Electronics", "Fashion", "Books", "Sports", "Home"];
const user2Categories = ["Fashion", "Beauty", "Sports", "Toys", "Electronics"];

/**
 * Common categories find karna
 */
const commonCategories = user1Categories.filter(category => 
    user2Categories.includes(category)
);

console.log("Users ke common favorite categories:", commonCategories);  // ["Electronics", "Fashion", "Sports"]

/**
 * Ab hum in common categories ke products recommend kar sakte hain
 */
console.log("\nRecommended Products:");
commonCategories.forEach(category => {
    console.log(`- ${category} category ke trending products`);
});