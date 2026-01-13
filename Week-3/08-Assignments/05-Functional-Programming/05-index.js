/**
 * Write an ES6 fn that takes an array of strings and returns an array
 * with only the strings that have a length greater than 5.
*/

const cities = [
    { name: 'New York', population: 8538000 },
    { name: 'Los Angeles', population: 3976000 },
    { name: 'Bangalore', population: 13608000 },
]

console.log(getCityNames(cities))
// Output: ["New York", "Los Angeles", "Bangalore"]
