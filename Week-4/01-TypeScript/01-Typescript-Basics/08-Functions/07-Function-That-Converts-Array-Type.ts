/**
 * Function that converts array(with types):
 * => function functionName(parameter: arrayType[]): arrayType[] {}
 * */ 

/**
 * Q. Define a function doubleNumbers that takes an array of numbers
 *    and returns a new array where each number is doubled.
*/

function doubleNumbers(numbers: number[]): number[] {
    return numbers.map((num) => num * 2);
}