/**
 * Step 4: toString() - Array Ko String Mein Convert Karna
 * > toString() array ko string mein convert karta hai with comma separator.
*/


/**
 * join() vs toString():
*/

const fruits = ["Apple", "Banana", "Orange"];

/* Both give same result for default case */
const toStringResult = fruits.toString();
const joinResult = fruits.join();

console.log("toString():", toStringResult); /* "Apple,Banana,Orange" */
console.log("join():", joinResult);         /* "Apple,Banana,Orange" */
console.log("Are equal?", toStringResult === joinResult); /* true */


/**
 * Example 1: Basic Conversion
*/

const mixedArray = [1, "hello", true, null, undefined];

console.log("Mixed array:", mixedArray);
console.log("toString():", mixedArray.toString()); /* "1,hello,true,," */

/* Useful for debugging */
console.log("Array as string:", `[${mixedArray.toString()}]`);