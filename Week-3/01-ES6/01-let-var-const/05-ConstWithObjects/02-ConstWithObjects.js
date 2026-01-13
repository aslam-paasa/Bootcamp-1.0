/**
 * Reassigning const Variables (Error):
*/

const obj = { a: 1, b: 2 }
const obj2 = { a: 3, b: 4 }
console.log(obj === obj2);  // Output: false

/**
 * Understanding:
 * - No error here. [TypeError]
 * - The === operator the references of obj and obj2. Since obj and obj2
 *   point to different objects in memory, the result is false.
 * - You cannot reassign a const variable, but you're not doing that here.
 *   Instead, you're comparing if the two variables point to the same 
 *   object, and since they don’t, the comparison results in false.
*/



/**
 * Why are obj3 and obj4 Not Equal?
*/

const obj3 = { a: 1, b: 2 }
const obj4 = { a: 1, b: 2 }
console.log(obj3 === obj4); // Output: false

/**
 * Understanding:
 * - Error: values are same but they are in two different memory locations.
*/



/**
 * Comparing Two Variables Pointing to the Same Object:
*/

const obj5 = obj3;
console.log(obj5 === obj3); // true

/**
 * Understanding:
 * - Here, obj5 is assigned the reference of obj3. This means both obj3
 *   and obj5 point to the same memory location (same object).
 * - As a result, obj5 === obj3 is true because they both refer to the 
 *   same object.
 * - Example: In our notebook, we are creating an index and saying :
 *   a. Introduction is on PageNo-2
 *   b. Author's photo is on PageNo-2
 *   Both are different references but pointing to the same physical 
 *   location.
*/
