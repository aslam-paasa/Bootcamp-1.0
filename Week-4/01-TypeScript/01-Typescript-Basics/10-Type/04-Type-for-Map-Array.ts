/**
 * Type for Map Array:
 * Q. Define a type mapFunction for a function that takes an array of
 *    values(of any type) and a mapper fn. The mapper fn should take
 *    a single parameter and return a new value. The main fn should
 *    return an array containing the mapped values.
 * => const doubleToString = (num: number) => (num * 2).toString();
 *    const numbers = [1, 2, 3, 4, 5]; // number[] == T
 *    console.log(mapArray(numbers, doubleToString));
 *    // Output: ["2", "4", "6", "8", "10"] // string[] == R
 * 
 * => mapFunction<T,R> = (array: T[], mapper: (value: T) => R) => R[]
 *    [1,2,3,4,5,6].map() // number[]
 *    [1,2,3,4,5,6].map(() => "Tanay") // Output: ["Tanay", "Tanay", "Tanay"..] // string[]
 * 
 * => T[] => R[] // every Map function
 * => () => {} // predicate // (T) => R
 * => ["001", "002", "003"].map(id => `<li> ${id} </li>`) // T: string, R: string
*/

type mapFunction<T, R> = (array: T[], mapper: (value: T) => R) => R[]

const mapArray: mapFunction<number, string> = (array, mapper) => {
    return array.map(mapper)
}

// const doubleToString = (num: number) => (num * 2).toString()
// const numbers = [1, 2, 3, 4, 5]
// console.log(mapArray(numbers, doubleToString)) // Output: ["2", "4", "6", "8", "10"]
