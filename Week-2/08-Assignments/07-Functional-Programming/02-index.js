/**
 * Write an ES6 fn that takes an array of objects containing car info
 * (make, model, year) and returns an array with only the cars that
 * were made after the year 2012.
*/

const cars = [
    { make: 'Toyota', model: 'Corolla', year: 2010 },
    { make: 'Honda', model: 'Civic', year: 2012 },
    { make: 'Toyota', model: 'Camry', year: 2015 },
    { make: 'Ford', model: 'Mustang', year: 2018 },
]


// Your code here


const getCars = getCarDetails(cars)
console.log(getCars)
// Output: [{ make: "Toyota", model: "Camry", year: 2015 }, { make: "Ford", model: "Musta