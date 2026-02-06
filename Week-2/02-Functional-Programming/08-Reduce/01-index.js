/**
 * Q. Create and array of numbers. Sum all of the numbers. Log the sum.
 * => Reduce Method:
 *    a. reduce((accumulator, currentValue) => { ... });
 *    b. reduce(accumulator, currentValue) => { ... }, initialValue);
 *    -  reduce has three things:
 *       a. accumulator
 *       b. current value
 *       c. current index (optional)
 *    - returns the updated value of the accumulator
 * 
 *    - Think of accumulator as like a bucket, and we are throwing 
 *      everything into that bucket.
 *    - We have accumulator & current value, and the reduce will run once
 *      for each element in this array. So, we have 5 elements in the array
 *      and we are going to add each element one by one to the bucket to
 *      make a single "sum" result.
 *      - Loop-1: 0(accumulator)    + 2(current element)
 *      - Loop-2: 2(accumulator)    + 333(current element)
 *      - Loop-3: 335(accumulator)  + 9(current element)
 *      - Loop-4: 344(accumulator)  + 811(current element)
 *      - Loop-5: 1155(accumulator) + 9(current element)
 *      - Output: 1164(accumulator)
*/

let nums = [2, 333, 9, 811, 9]
let sum = nums.reduce((acc, c) => acc + c, 0);
console.log(sum);

/**
 * Challenge:
 * Q. Given an array, find the sum of all numbers in the array using
 *    reduce() method.
*/

const arr = [1, 2, 3, 4];
const sumOfNumbers = (accumulator, currentValue, currentIndex) => accumulator + currentValue;
const sumOfArr = arr.reduce(sumOfNumbers, 0);
console.log(sumOfArr);


/**
 * Challenge:
 * Q. Given an array, find the sum of all odd numbers in the array
 *    using reduce() method.
*/
const array = [1, 2, 3, 4, 5, 6, 7];

// const oddNumbersOnly = (accumulator, currentValue) => {
//     return currentValue % 2 !== 0 ? accumulator + currentValue : accumulator;
// };
// const sumOfOddNumbersOnly = array.reduce(oddNumbersOnly, 0);

const sumOfOddNumbersOnly = array.reduce((acc, num) => num % 2 !== 0 ? acc + num : acc, 0);
console.log(sumOfOddNumbersOnly);


/**
 * Challenge:
 * Q. Write a function that takes an array of objects representing books
 *    with properties title, author, and pages, and returns the total
 *    number of pages of all the books using the reduce function.
*/

const books = [
    { title: 'The Alchemist', author: 'Paulo Coelho', pages: 197 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281 },
    { title: 'The Great Gatsby', author: 'F.Scott Fitzgerald', pages: 180 },
];

const getTotalPages = (books) => books.reduce((totalPages, book) => totalPages + book.pages, 0)
console.log(getTotalPages(books)) // Output: 658