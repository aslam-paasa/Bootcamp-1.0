/**
 * Introduction: Array Validation aur Checking
 * > Array Checking = Quality control in factory
 *   a. some()          = Koi bhi ek item defective hai?
 *   b. every()         = Saare items perfect hain?
 *   c. includes()      = Ye specific item available hai?
 *   d. Array.isArray() = Ye package array hai ya kuch aur?
 * 
 * > Ye methods arrays ko validate aur check karte hain - koi bhi original 
 *   array ko change nahi karta.
*/

/* Checking methods always return boolean (true/false) */
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.some(n => n > 3));  // true
console.log(numbers.every(n => n > 0)); // true  
console.log(numbers.includes(3));       // true
console.log(Array.isArray(numbers));    // true