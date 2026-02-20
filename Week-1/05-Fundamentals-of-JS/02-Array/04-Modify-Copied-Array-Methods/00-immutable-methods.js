/**
 * Introduction to Immutable Methods:
 * > Ye sab methods original array ko change nahi karte. 
 * > Naya array return karte hain. 
 * > Isse aapka code predictable aur safe rehta hai.
*/

/* Original array safe rehta hai */
const original = [1, 2, 3];

const newArray = original.slice(1); /* naya array banega */
console.log(original);              /* [1, 2, 3] - unchanged */
console.log(newArray);              /* [2, 3] - new array */