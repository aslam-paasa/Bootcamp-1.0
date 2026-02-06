/**
 * Returning Objects in Arrow Functions:
 * - In JavaScript, when you use an arrow function to return an object,
 *   you need to be careful about the syntax.
*/

/**
 * 1. Arrow Function Returning an Object:
 * Can you convert the below arrow function into function declaration
 * (normal function) format?
*/

const giveMeAndObject = a => ({ value: a })
console.log(giveMeAndObject(5)); // { value: 5 }


/**
 * Understanding:
 * To return an object in an arrow fn, you must wrap the object in
 * parentheses. This tells JS that you're returning an object, not
 * starting a function block.
*/ 

/**
 * Why parentheses?
 * Without parentheses, JavaScript thinks the curly braces {} are the 
 * start of a function block, not an object.
*/



/**
 * 2. Arrow Function Without Parentheses(Wrong Syntax):
*/

const giveMeAndObject2 = a => { value: a }
console.log(giveMeAndObject2(5)); // undefined

/**
 * Understanding:
 * This won't work because JS sees { value: a } as a block of code, not
 * an object. So, it doesn't return anything.
*/


/**
 * 3. Challenge: Convert to normal fn declaration
*/

const giveMeAndObjectArrow = a => ({ value: a });
console.log(giveMeAndObjectArrow(5));


function giveMeAndObjectNormal(a) {
    return { value: a };
}
console.log(giveMeAndObjectNormal(5));

/**
 * Both fns now do the same thing, they return an object with the value
 * passed in as a parameter.
*/