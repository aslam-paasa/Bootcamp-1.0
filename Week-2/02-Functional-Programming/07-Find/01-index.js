/**
 * Find:
 * - Find is used to find the first element in an array that satisies a
 *   certain condition.
 * - Syntax:
 *   a. find((element) => { ... })
 *   b. find((element, index) => { ... })
 *   c. array.find(function(element, index));
 *      - element: the current element of the array
 *      - index  : the index of the current element
 *      - returns the first element in the array that satisfies the
 *        condition, otherwise -1.
 * - Find is very similar to filter, but the only change is it returns
 *   the first value it finds.
*/

/**
 * Challenge:
 * 1. Given an array, return the first even number in the array.
*/
const numbers = [5, 12, 8, 13, 44];
const findEvenNumber = numbers.find(element => element % 2 === 0);
console.log(findEvenNumber);


/**
 * Challenge:
 * 2. Write an ES6 function that takes an array of fruits and returns
 *    the first fruit that is longer than 10 characters.
*/
const fruits = ['apple', 'banana', 'cherry', 'watermelon', 'pineapple'];


/**
 * Challenge:
 * 3. Given an array of objects, find the object with name "clips". 
*/
const inventory = [
    { name: "socks", quantity: 12 },
    { name: "shirts", quantity: 10 },
    { name: "clips", quantity: 5 }
]
