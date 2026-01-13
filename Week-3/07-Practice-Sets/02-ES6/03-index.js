/**
 * Write a fn that takes an object person and a number num as arguments
 * and returns true if the person's age plus name is greater than 21.
 * Otherwise, it should be false.
*/

const person1 = { name: 'Ajay', age: 20 }
console.log(isEligible(person1, 1)) // false
console.log(isEligible(person1, 2)) // true
