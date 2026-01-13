/**
 * Mutable vs Immutable Objects in JavaScript
 * 
 * Mutable = Change ho sakta hai
 * Immutable = Change nahi ho sakta
 */

/**
 * JavaScript mein 2 types ke data types hote hain:
 * 
 * 1. Primitive Types (Immutable):
 *    - string, number, boolean, symbol, null, undefined
 *    - Inka value change nahi hota, new value create hota hai
 * 
 * 2. Non-Primitive Types (Mutable):
 *    - Array aur Objects
 *    - Inka value change ho sakta hai
 */

/**
 * Ex-1: Primitive Type (Immutable)
*/ 
let x = 20;
let y = x;  // y ko x ki value copy ho gayi
y = y + 1;  // y ki value change ki

console.log(x); // 20 (x ki value same rahi)
console.log(y); // 21 (y ki value change ho gayi)


/**
 * Ex-2: Array (Mutable)
*/ 
let fruits = ['apple', 'banana'];
let fruitsCopy = fruits;  // fruitsCopy ab fruits ko point kar raha hai

fruitsCopy.pop();        // last element remove kiya

console.log(fruits);     // ['apple'] (fruits bhi change ho gaya)
console.log(fruitsCopy); // ['apple'] (fruitsCopy bhi change ho gaya)


/**
 * Ex-3: Object (Mutable)
*/ 
let person = {
    name: 'Rahul',
    city: 'Mumbai'
}

let personCopy = person;  // personCopy ab person ko point kar raha hai

personCopy.age = 25;      // new property add ki

console.log(person);     // { name: 'Rahul', city: 'Mumbai', age: 25 }
console.log(personCopy); // { name: 'Rahul', city: 'Mumbai', age: 25 }