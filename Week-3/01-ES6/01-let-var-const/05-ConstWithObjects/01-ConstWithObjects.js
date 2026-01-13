/**
 * Const with Objects:
 * - The const keyword only makes the 'reference' to the object constant,
 *   not the object itself.
 * - You can modify the 'properties' of the object, but cannot reassign
 *   object itself to something else.
 */

/**
 * Changing Properties of an Object Declared with const:
 * Q. Will we get an error?
 *  - It is not giving an error because we are not changing the whole 
 *    object, we are only changing the one key-value(one property) of
 *    an object.
 *  - obj.a = 22;
*/

const obj = { a: 1, b: 2 }
obj.a = 22;
console.log(obj);

/**
 * Understanding:
 * - We will not get an error. The "const" declaration creates a constant
 *   reference to the object { a: 1, b: 2 }, but it does not prevent us
 *   from modifying the properties of that object.
 * - We can modify the properties of objects, but cannot modify or replace
 *   the object. 
*/



/**
 * Modifying Properties of a const Object:
 * Q. Const is contant then why it is not giving an error?
 *  - It is not giving an error because we are not changing whole object.
 *  - We are only changing one value (one property of key-value pair) of
 *    the object.
*/

const obj1 = { a: 1, b: 2 };
console.log(obj1.a);

obj1.a = 33; // Modifying the value of 'a'
console.log(obj1.a);

/**
 * Understanding:
 * - You can change properties of an object declared with const, but you
 *   can't reassign the entire object.
 * - In this case, obj1.a = 33 works because we're just updating a 
 *   property, not replacing the whole object.
*/

/**
 * Reassigning a const Variable to a New Value:
 * Q. Will this give an error?
*/

const objStr = "tanay";
console.log(objStr); // Output: tanay

objStr = "mohammad"; // Error: TypeError: Assignment to constant variable.

/**
 * Explanation:
 *  - Error! You cannot reassign a const variable to a new value or object.
 *  - In this case, obj = "hello" causes an error because obj is already
 *    assigned to a string and we are trying to change it.
 *  - The const only allows you to assign the value once; after that, 
 *    it is fixed.
 *  - objStr = "mohammad"; <== TypeError: Assignment to constant variable.
*/


/**
 * Reassigning the Whole Object:
 * Q. Will this give an error?
 *  - obj = {a: 1, b: 2};
 *  - console.log(obj);  <== Error: Even if the values are same, but 
 *                           this is new object
*/

const objNum = { a: 1, b: 2 }
console.log(objNum); // Output: { a: 1, b: 2 }

objNum = {c: 22, d: 44}
console.log(obj); // Error: Cannot assign to 'obj' because it is a constant

/**
 * Understanding: 
 * - Error! You cannot reassign the whole object to a new value.
 * - Here, we're trying to assign a new object ({ c: 22, d: 44 }) to the
 *   obj variable, but since obj was declared with const, it cannot be 
 *   reassigned to a different object.
 * - The error happens because you're trying to change the reference of
 *   obj, not just its properties.
 * - Redeclaring reference point(memory location). [Prohibited]
*/