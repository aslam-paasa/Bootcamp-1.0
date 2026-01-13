/**
 * Write an ES6 fn that take an array of objects, each with name and
 * age properties, and returns an array containing the names of all
 * people whose age is greater than or equal to 60. Avoid using in-built
 * methods.
*/

const people = [
    { name: 'Alice', age: 69 },
    { name: 'Bob', age: 47 },
    { name: 'Charlie', age: 70 },
]

console.log(getNamesOfAdults(people)) // Output: ["Alice", "Charlie"]