/**
 * Functional Programming:
 * 1. What is Higher Order Function?
 * 2. Introduction to Functional Programming
 * 3. DRY Principle
 * 4. Polyfills
*/

/**
 * What is Higher Order Function?
 * - A function which takes another function as an argument or returns a
 *   function as an output is called Higher Order Function.
*/

/**
 * Example of HOF:
*/
function x() {
    console.log("Namaste");
}

function y(x) {  // <== Y is a HOF, X is callback fn
    x();
}



/**
 * Calculate the area of these 4-circles:
 * a. radius                : callback fn
 * b. calculateArea         : HOF
 * c. calculateCircumference: HOF
 * d. calculateDiameter     : HOF
 * 
 * Issue: DRY Violation : We have to write modular code
*/
const radius = [3, 1, 2, 4];

const calculateArea = function(radius) {
    const output = [];
    for(let i = 0; i < radius.length; i++) {
        output.push(Math.PI * radius[i] * radius[i]);
    }
    return output;
}

// console.log(calculateArea(radius));


const calculateCircumference = function(radius) {
    const output = [];
    for(let i = 0; i < radius.length; i++) {
        output.push(2 * Math.PI * radius[i]);
    }
    return output;
}

// console.log(calculateCircumference(radius));


const calculateDiameter = function(radius) {
    const output = [];
    for(let i = 0; i < radius.length; i++) {
        output.push(2 * radius[i]);
    }
    return output;
}

// console.log(calculateDiameter(radius));


/**
 * Optimized Code using DRY Principle:
 * a. calculate()     : HOF
 * b. area()          : callback fn
 * c. circumference() : callback fn
 * d. diameter()      : callback fn
 * 
 * Note: Write this code in interview.
*/

const area = function(radius) {
    return Math.PI * radius * radius;
}

const circumference = function(radius) {
    return 2 * Math.PI * radius;
}

const diameter = function(radius) {
    return 2 * radius;
}


const calculate = function(radius, logic) {
    const output = [];
    for(let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]));
    }
    return output;
}

console.log(calculate(radius, area));
console.log(calculate(radius, circumference));
console.log(calculate(radius, diameter));



/**
 * Map Function: 
 * a. radius: array data
 * b. map() : HOF
 * c. area  : callback fn
*/

console.log(radius.map(area));


/**
 * Let's try to make our own map function:
 * - When we put something to Array.prototype, it appears in all the arrays.
*/

Array.prototype.myMap = function(logic) {
    const output = [];
    for(let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
}

console.log(radius.myMap(area));
