/**
 * Pure Functions:
 * - For the same input, the output will always be the same.
 * - Three rules:
 *   1. Atleast one argument
 *   2. Return a value or other function
 *   3. Should not mutate any of its arguments
 * 
 * Note: If we give something to fetch(), it can give us either data or
 *       error. So, not all functions are pure function.
*/


/**
 * Challenge:
 * 1. Write a function birthday() to take a person's name and age in an
 *    object and then increase the age by 1. Return the updated object.
*/

/**
 * Way-1: Normal Function
*/
function wishMeBirthday(name) {
    console.log(`Happy Birthday ${name}`);
}
wishMeBirthday("Mohammad" + "\n");

/**
 * Way-2: ES6 Function
*/
const happyBirthday = ({ name, age }) => ({ name, age: age + 1 });

/**
 * Way-3: Spread Operator [Recommended]
*/
const birthday = person => ({...person, age: person.age + 1 });



/**
 * 2. Write an ES6 function increaseStock() to take a product's name
 *    and quantity in an object and then increase the quantity by 5.
*/




// const product = { name: "ruled notebook", quantity: 20 };
// const inventoryStock = increaseStock(product);
// console.log(inventoryStock); // { name: "ruled notebook", quantity: 25 }
