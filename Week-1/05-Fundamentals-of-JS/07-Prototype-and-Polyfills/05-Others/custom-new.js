/**
 * Polyfill of new:
 * Four things a new keyword do:
 * a. Create a brand new object
 * b. Link that object to another object
 * c. Call the function with 'this' set to newObject
 * d. If function does not return object, it return the newly created object
*/

function Superhero(name, power) {
    this.name = name;
    this.power = power;
}

const superhero = new Superhero("Silver Surfer", "Fly");
console.log(superhero);


/**
 * Custom new:
 * 1. Create a brand new object
 * 2. Link the new object to the constructor function
 * 3. Call the constructor function with the new object as the this value
 * 4. If the constructor function does not return an object, return the 
 *    new object
*/

function myNew(ConstructorFn, ...args) {
    const newObj = {};

    Object.setPrototypeOf(newObj, ConstructorFn.prototype);

    const result = ConstructorFn.apply(newObj, args);

    if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
        return result;
    }

    return newObj;
}


const superhero2 = myNew(Superhero, "Thor", "Thunder");
console.log(superhero2);