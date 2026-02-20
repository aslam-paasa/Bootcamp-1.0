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
 * Q. Take an array and calculate the sum of even and odd numbers
 *    using reduce.
 * */ 

const numList = [1, 3, 55, 22, 44]

function oddAndEvenReducer(acc, value) {
    if(value % 2 === 0) {
        return { ...acc, even: acc.even + value }
    } else {
        return { ...acc, even: acc.odd + value }
    }
}

const initialAccumulator = { odd: 0, even: 0 }
numList.reduce(oddAndEvenReducer, initialAccumulator);