/**
 * Filter Function:
 * - The filter() fn is used to create a new array from existing one by 
 *   filtering out the values based on some condition.
 *   Or,
 * - The filter() fn is used to filter the values inside an array.
*/


/**
 * Array Filtering:
 * - Filter array values based on conditions like odd numbers or values > 4
 * - Returns filtered values like [5,6] for values > 4
 * - Takes input array and returns new array with filtered values based on 
 *   logic.
*/

const arr = [5, 1, 3 ,2 ,6];


/**
 * Filtering Odd Values: 
 * a. filter() : HOF
 * b. isOdd    : callback fn (logic)
 * c. x        : argument (each value of the arr passed to x)
*/
function isOdd(x) {
    return x % 2;
}

const filteredOddValues = arr.filter(isOdd);
console.log(filteredOddValues); // [ 5, 1, 3 ]


/**
 * Filtering Even Values:
 * a. filter() : HOF
 * b. isEven   : callback fn (logic)
 * c. x        : argument (each value of the arr passed to x)
*/
function isEven(x) {
    return x % 2 == 0;
}

const filteredEvenValues = arr.filter(isEven);
console.log(filteredEvenValues); // [ 2, 6 ]


/**
 * Filtering Values Greater Than 4:
 * a. filter() : HOF
 * b. x > 4    : callback fn (logic)
 * c. x        : argument (each value of the arr passed to x)
*/

const filteredValuesGreaterThanFour = arr.filter((x) => x > 4);
console.log(filteredValuesGreaterThanFour); // [ 5, 6 ]
