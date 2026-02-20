/**
 * For objects & arrays, we can't use toBe(), rather we use:
 * 1. toEqual()
 * 2. toContain()
 * Note: Refer documentation
*/

/**
 * Capitalize:
 * Write tests for a capitalize utility function that takes a string as
 * input and returns the same string with the first letter capitalized.
*/

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * filterEven:
 * Create tests for a filterEven utility function that filters out even
 * number from an array.
*/
function filterEven(arr) {
    return arr.filter(num => num % 2 === 0);
}


/**
 * double:
 * Write tests for a double utility function that doubles each number
 * in an array.
*/
function double(arr) {
    return arr.map(num => num * 2);
}


/**
 * Reducer(sum):
 * Create tests for a sum utility function that calculates the sum of
 * all numbers in an array.
*/
function sum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}


/**
 * Reducer(average);
 * Write tests for an average utility function that calculates the 
 * average of all numbers in an array.
*/
function average(arr) {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    return sum / arr.length;
}


module.exports = { capitalize, double, filterEven, sum, average };