/**
 * const with arrays:
 * - When you use const with an array (or any object), it means you can't
 *   reassign the variable to a new value.
 * - However, you can still change the contents of the array (add, 
 *   remove, or modify elements inside it).
 * 
 * Note: In simple terms, the array stays the same, but its contents can
 * change!
*/

/**
 * Q. Will we get an error? What will it return?
 */ 

const array = [1, 2, 3, 4]
array.push(55);
console.log(array);


/**
 * Understanding:
 * - The push() method adds a new item to the end of the array. In this
 *   case, it adds 55 to the array.
 * - The array will now look like this: [1, 2, 3, 4, 55].
 * - The push() method does not return the array itself, but instead 
 *   returns the new length of the array, which is 5 in this case.
*/

/**
 * How arrays/objects are treated in memory?
 * - When you declare an array using const, you are creating a constant
 *   reference to that array in memory. This means the reference (or 
 *   pointer) to the array itself cannot be changed. However, the contents
 *   of the array can be modified.
 * - The array is an object in JavaScript, and objects in JavaScript are
 *   mutable, meaning their internal state can change even if the 
 *   reference to them is constant.
 * - So, no new reference is created when we modify content. The original
 *   array remains in the same location in memory, but its contents
 *   change(it grows in size).
*/

 