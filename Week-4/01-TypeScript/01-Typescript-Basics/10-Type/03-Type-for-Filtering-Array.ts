/**
 * Type for Filtering Array:
 * Q. Define a type filterFunction for a fn that takes an array of values
 *    (of any type) and a predicate fn. The predicate fn should take a
 *    single parameter and return a boolean. The main fn should return
 *    an array containing only the values that satisfy the predicate.
 * => Write an implementation of filterArray function with types:
 *    - const isEven = (num: number) => num % 2 === 0
 *      const numbers = [1, 2, 3, 4, 5, 6]
 *      console.log(filterArray(numbers, isEven)) // Output: [2, 4, 6]
 *      filterArray(['a', 'bcd', 'efgh'], (str) => str.length > 3) // ["efgh"]
*/

type filterFunction<T> = (array: T[], predicate: (value: T) => boolean) => T[]

const filterArray: filterFunction<number> = (array, predicate) => {
    return array.filter(predicate)
}

const isEven = (num: number) => num % 2 === 0
const numbers = [1, 2, 3, 4, 5, 6]
// console.log(filterArray<number>(numbers, isEven)) // Output: [2, 4, 6]
