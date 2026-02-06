/**
 * Filter:
 * - Filter will return an array with the values for which the callback
 *   function return true.
*/

const numbers = [1, 3, 5, 2, 22, 11, 9];
const isOdd = num => num % 2 != 0;
console.log(isOdd(numbers[1])); // true

/**
 * - True and False are boolean values.
 * - If I have to check every value on the above array, whether it's 
 *   odd or not, and also take an array out of it, we can use something
 *   called filter.
 * - But to use filter, the callback fn should return boolean.
*/

const oddNumbersOnly = numbers.filter(isOdd);
console.log(oddNumbersOnly); // => true values: [ 1, 3, 5, 11, 9 ]

/**
 * Challenge:
 * Q. Given an array, return an array with only odd numbers in it.
*/

const nums = [3, 5, 6, 1, 2];
const isOddNum = num => num % 2 != 0;
const oddArr = nums.filter(isOddNum);
console.log(oddArr);


/**
 * Challenge:
 * Q. Given an array, return an array with only numbers divisible by 10.
*/

const nums2 = [5, 20, 15, 40, 3, 30, 11];
const isDivisibleBy10 = num => num % 10 == 0;
const numbersDivisibleBy10 = nums2.filter(isDivisibleBy10);
console.log(numbersDivisibleBy10);


/**
 * Challenge:
 * Q. Write an ES6 function that returns an array with no number less 
 *    than 10 in it.
*/
const nums3 = [2, 20, 3, 30, 4, 40, 5, 50];
const isNumberGreaterThan10 = num => num > 10;
const numbersGreaterThan10 = nums3.filter(isNumberGreaterThan10);
console.log(numbersGreaterThan10);
