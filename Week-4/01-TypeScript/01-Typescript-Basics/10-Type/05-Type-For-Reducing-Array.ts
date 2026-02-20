/**
 * Type for Reducing Array:
 * Q. Define a type reduceFunction for a function that takes an array
 *    of values(of any type), an accumulator fn, and an initial value
 *    for the accumulator. The accumulator fn should take the current
 *    accumulator value and a value from the array, and return a new
 *    accumulator value. The main fn should return the initial 
 *    accumulator value.
 * => const sumAccumulator = (acc: number, num: number) => acc + num;
 *    const numbers = [1, 2, 3, 4, 5];
 *    console.log(reduceArray(numbers, sumAccumulator, 0)); // Output: 15
 * 
 * => acc = [1,2,3,4,5,6].reduce((acc, item) => {}, initialValue)
 *    "tanay is amazing".split(" ").reduce((acc, item) => acc + item.length, 0)) //
 * => reduce<T, R> = array: T[], (acc:R, item: T) => R, R => R
*/

type reduceFunction<T, R> = (
    array: T[],
    accumulator: (acc: R, value: T) => R,
    initialValue: R,
) => R


const reduceArray: reduceFunction<number, number> = (
    array,
    accumulator,
    initialValue,
) => {
    return array.reduce(accumulator, initialValue)
}


// const sumAccumulator = (acc: number, num: number) => acc + num
// const numbers = [1, 2, 3, 4, 5]
// console.log(reduceArray(numbers, sumAccumulator, 0)) // Output: 15

