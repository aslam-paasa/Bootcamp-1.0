/**
 * Loops:
 * - In JavaScript, loops ko hum repetition k liye use karte hai.
 * - Jb ek kaam baar-baar karna ho (jaise counting, list traverse karna, etc.)
 *   toh loop ka use karte hai.
*/

/**
 * Types of Loops:
 * 1. while Loop
 * 2. do-while Loop
 * 3. for Loop
 * 4. for-in Loop    (array, objects)
 * 5. for-of Loop    (array, strings)
 * 6. for-each Loop  (for arrays)
*/


/**
 * 1. while Loop in JavaScript:
 *   - Jab tak condition true hai, tab tak loop chalega.
 *   - Agar starting mein hi false ho, toh ek baar bhi nhi chalega.
 * 
 * Syntax:
 * while(condition) {
 *    // repeat this block
 * }
*/

/**
 * Example 1: Count from 1 to 4
*/
let counter = 1;
while (counter < 5) {
    console.log(counter);
    counter++;
}
console.log("Final value: " + counter + '\n');


/**
 * Example 2: Starting condition is false
*/
let number = 10;
while (number < 5) {
    console.log(number); // won't run
    number++;
}
console.log("Final value: " + number + '\n');

/**
 * Example 3: Counting from 1 to 9
*/
let count = 1;
while (count < 10) {
    console.log(count);
    count += 1;
}
console.log("Loop ended");


/**
 * 2. Do-While Loop
 *   - Ye loop kam se kam ek baar chalta hi chalta hai, chahe condition
 *     false ho ya true.
 * 
 * Syntax:
 * do {
 *    // Code runs at least once
 * } while(condition);
*/

/**
 * Example-4: Condition false from start
*/
let value = 10;
do {
    value++;
} while (value < 5);
console.log("Final value: " + value); // runs once


/**
 * Example 5: Condition is true
*/
let startValue = 10;
do {
    startValue++;
} while (startValue < 15);
console.log("Final value: " + startValue);




/**
 * 3. For Loop:
 *    - Jab number of iterations pehle se pata ho (e.g., loop 5 baar chalega),
 *      tab for loop best hai.
 * 
 * Syntax:
 * for(initialization; condition; update) {
 *    // block of code
 * }
*/

/**
 * Example 6: Print 1 to 5
*/
for (let i = 1; i <= 5; i++) {
    console.log(i);
}




/**
 * 4. For-In Loop:
 *    - for-in ka use objects ya arrays k 'keys/indexes' par iterate karne
 *      ke liye hota hai.
 * 
 * Syntax:
 * for(let key in object) {
 *    // object[key]
 * }
*/

/**
 * Example-7: Loop through object keys
*/
const user = {
    name: "Ali",
    age: 24,
    city: "Mumbai"
};

for (let key in user) {
    console.log(`${key}: ${user[key]}`);
}




/**
 * 5. For-of Loop:
 *    - for-of ka use arrays, strings ya iterables ke 'values' par iterate
 *      karne k liye hota hai.
 * 
 * Syntax:
 * for(let item of iterable) {
 *    // use item
 * }
*/

/**
 * Example-8: Loop through array values
*/
const fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
    console.log(fruit);
}

/**
 * Example-9: Loop through string values
*/
const name = "John";
for (let char of name) {
    console.log(char);
}

/**
 * Example-10: Loop through object values
*/
const user2 = {
    name: "Ali",
    age: 24,
    city: "Mumbai"
};

for (let key of Object.keys(user2)) {
    console.log(`${key}: ${user2[key]}`);
}





/**
 * 6. forEach Loop (Array only):
 *    - forEach() ek method hai jo sirf arrays pe lagta hai.
 *    - Har element pe ek function call karta hai.
 * 
 * Syntax:
 * array.forEach(function(item) {
 *    // do something with item
 * });
*/


/**
 * Example-11: Print each element of array
*/
const numbers = [10, 20, 30];
numbers.forEach(function(num, index) {
    console.log(`Index ${index}: ${num}`);
});



/**
 * Note:
 * - Don't use for-in with arrays unless you specifically want the index keys,
 *   because it includes inherited properties too.
 * - It is also slower than for-of loop.
*/