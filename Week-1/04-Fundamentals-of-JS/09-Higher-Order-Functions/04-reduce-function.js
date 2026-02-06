/**
 * Reduce() fn:
 * - The reduce() fn is used to reduce an array to a single value.
 * - It is used to reduce the array to a single value.
 * 
 * This function takes two parameters :
 * a. acc  : accumulator (stores the result)
 * b. curr : current     (current value of the array)
 * 
 * Param-1: acc (accumulator)
 * - It acts like a bucket to store the result.
 * - In accumulator, we can also pass the initial value. If we don't
 *   pass, then by default it will take the first value of the array as
 *   the initial value.
 * 
 * Param-2: curr (current)
 * - It represents the current value of the array.
 * - In each iteration, it will take the current value of the array and pass
 *   it to the accumulator. 
*/


/**
 * We can iterate and find :
 * (a) sum of all the elements of array
 * (b) largest and maximum number in this array
 * etc...
*/

const arr = [5, 1, 3, 2, 6];


/**
 * Sum or Max:- Without using reduce() fn
*/

function findSum(arr) {
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

const sumOfArray = findSum(arr);
console.log(sumOfArray); // 17


/**
 * Sum of Array:- Using reduce() fn
 * a. reduce() : HOF
 * b. acc       : accumulator (stores the result)
 * c. curr      : current     (current value of the array)
*/

const sumOfArrayUsingReduce = arr.reduce(function(acc, curr) {
    acc = acc + curr;
    return acc;
}, 0); 

console.log(sumOfArrayUsingReduce); // 17


/**
 * Sum of Array:- Using reduce() fn (using arrow function)
 * a. reduce()  : HOF
 * b. acc       : accumulator (stores the result)
 * c. curr      : current     (current value of the array)
*/

const sumOfArrayUsingReduceTwo = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sumOfArrayUsingReduceTwo); // 17




/**
 * Max Value:- Without using reduce() fn
 * a. findMax : callback fn (logic)
 * b. arr     : argument (each value of the arr passed to x)
*/
function findMax(arr) {
    let max = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(findMax(arr)); // 6


/**
 * Max Value:- Using reduce() fn
 * a. reduce()  : HOF
 * b. max       : accumulator (stores the result)
 * c. curr      : current     (current value of the array)
*/
const maxValueUsingReduce = arr.reduce(function(max, curr) {
    if(curr > max) {
        max = curr;
    }
    return max;
}, 0);

console.log(maxValueUsingReduce);  // 6


/**
 * Max Value:- Using reduce() fn (using arrow function)
 * a. reduce()  : HOF
 * b. max       : accumulator (stores the result)
 * c. curr      : current     (current value of the array)
*/

const maxValueUsingReduceTwo = arr.reduce((max, curr) => curr > max ? curr : max, 0);
console.log(maxValueUsingReduceTwo); // 6