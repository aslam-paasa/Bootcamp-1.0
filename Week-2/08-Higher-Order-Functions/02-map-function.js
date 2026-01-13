/**
 * Map Function::
 * - The map() fn is used to create a new array from existing one by applying
 *   a function to each of the elements of the first array.
 *   Or,
 * - The map() fn is used to transform an array.
*/

/**
 * Array Transformation:
 * Suppose we have this array and we want to transform it. Transformation 
 * means transform each and every value of this array and get a new array 
 * out of it.
*/

const arr = [5, 1, 3, 2, 6];


/**
 * Map is a HOF, so we need to pass a callback fn inside it, which bascially
 * tells us what transformation do we need:
 * a. map()  : HOF
 * b. double : callback fn (logic)
 * c. triple : callback fn (logic)
 * d. binary : callback fn (logic)
 * 
 * Note: These are the callback fn we need to pass inside the map() fn.
*/

function double(x) {
    return x * 2;
}

function triple(x) {
    return x * 3;
}

function binary(x) {
    return x.toString(2);
}


/**
 * Internally map() fn will run the fn over each and every value of the 
 * array, and create a new array out of it and that new array will be
 * stored inside "output" variable.
*/

const output = arr.map(double);
console.log(output); // [ 10, 2, 6, 4, 12 ]


const tripleOutput = arr.map(triple);
console.log(tripleOutput); // [ 15, 3, 9, 6, 18 ]


const binaryOutput = arr.map(binary);
console.log(binaryOutput); // [ '101', '1', '11', '10', '110' ]


/**
 * Sometimes people also prefer to put the function inside it.
 * a. map()  : HOF
 * b. binary : callback fn (logic)
 * c. x      : argument (each value of the array passed to x)
*/
const binaryOutputTwo = arr.map(function binary(x) {
    return x.toString(2);
})
console.log(binaryOutputTwo);


/**
 * We can also write the same HOF using arrow function
 * a. map()  : HOF
 * b. binary : callback fn (logic)
 * c. x      : argument (each value of the array passed to x)
*/
const binaryOutputThree = arr.map((x) => {
    return x.toString(2);
})
console.log(binaryOutputThree);



/**
 * If there is single argument passed we can also remove the "return" and 
 * curly braces 
 * a. map()  : HOF
 * b. binary : callback fn (logic)
 * c. x      : argument (each value of the array passed to x)
*/
const binaryOutputFour = arr.map((x) => x.toString(2))
console.log(binaryOutputFour);
