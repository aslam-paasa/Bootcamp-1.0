/**
 * Assignment: Map and Filter Combination Practice
 * 
 * Task: Ek array diya gaya hai numbers ka. Humein ispe different operations perform karne hain
 * using map() and filter() combinations.
 */

const numbers = [5, 83, 24, 67, 71, 12, 24, 7];

/**
 * Question 1: 
 * Find cubes of numbers whose squares are less than or equal to 1000
 * Hint: Pehle filter karo, phir map karo
 */
const cubesOfSmallSquares = numbers
    .filter(num => num * num <= 1000)
    .map(num => num * num * num);
console.log("Cubes of numbers with squares <= 1000:", cubesOfSmallSquares);


/**
 * Question 2:
 * Find cubes of numbers whose cubes are less than 10000
 * Hint: Pehle filter karo, phir map karo
 */
const cubesLessThan10000 = numbers
    .filter(num => num * num * num < 10000)
    .map(num => num * num * num);
console.log("Cubes of numbers < 10000:", cubesLessThan10000);


/**
 * Question 3:
 * Find v^6 for elements whose square is less than or equal to 1000
 * Hint: Pehle map se square karo, phir filter karo, phir map se cube karo
 */
const v6ForSmallSquares = numbers
    .map(num => num * num)        // Square each number
    .filter(square => square <= 1000)  // Filter squares <= 1000
    .map(square => square * square * square);  // Cube the filtered squares
console.log("v^6 for numbers with squares <= 1000:", v6ForSmallSquares);