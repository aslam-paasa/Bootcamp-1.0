/**
 * Write an ES6 fn that takes an array of objects and a property name
 * and returns a new array with only the values of that property. 
 * Avoid using in-built methods.
*/

console.log(
    getValues(
        [
            { name: 'John', age: 21 },
            { name: 'Mary', age: 22 },
            { name: 'Peter', age: 23 },
        ],
        'name',
    ),
) // ["John", "Mary", "Peter"]
