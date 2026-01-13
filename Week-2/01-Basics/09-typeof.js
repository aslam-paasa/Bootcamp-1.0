/**
 * typeof operator:
 * - JavaScript mein value ka type check karne ke liye 'typeof' operator ka 
 *   use karte hain
 * - Ye operator hume value ka data type batata hai
*/

console.log(typeof "1");        // "string"
console.log(typeof 1);          // "number"
console.log(typeof undefined);  // "undefined"
console.log(typeof NaN);        // "number"

/**
 * JavaScript ka ek historical bug: null ka type "null" hona chahiye tha, 
 * lekin "object" return hota hai
*/
console.log(typeof null);       // "object"