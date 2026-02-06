
/**
 * Challenge:
 * 1. Given an array of numbers and returns a new array with square root
 *    of each number in it.
*/
const numbers = [1, 4, 9];
const roots = numbers.map(num => num * num);
console.log(roots); // [1, 16, 81]


/**
 * Challenge:
 * 2. Given an array of numbers a new array with each number squared
 *    using the map method.
*/
const num = [1, 2, 3, 4, 5]
const sqrt = num.map(nums => nums * nums);
console.log(sqrt);

/**
 * Challenge:
 * 3. Write a ES6 function that takes an array of strings and returns
 *    an array with the length of each string using the map method.
*/
const strings = ['neoG', 'coding', 'programming'];
const getLength = strings.map(word => word.length);
console.log(getLength);


/**
 * Map with objects:
*/
const thisIsAnArrayOfObjects = [{ name: "tanay" }, { name: "tanvi" }, { name: "akanksha "}];
const extractNameFromObj = obj => obj.name;
console.log(thisIsAnArrayOfObjects.map(extractNameFromObj));
