/**
 * Topic 1: Array Creation Methods
 * 1. Array Literal
 * 2. new Array()
 * 3. Array.of()
 * 4. Array.from()
 */

/**
 * 1. Array Literal
 */
const numbers = [10, 20, 30];
console.log("Array Literal:", numbers);


/**
 * 2. new Array()
 */
const newArray = new Array(10, 20, 30);
console.log("new Array:", newArray);


/**
 * 3. Array.of() Method
 */
const singleElement = Array.of(10);
const multipleElements = Array.of(10, 20, 30);
console.log("Array.of single element:", singleElement);
console.log("Array.of multiple elements:", multipleElements);


/**
 * 4. Array.from() Method
 */
const nameArray = Array.from("Aslam");
console.log("Array.from string:", nameArray);
