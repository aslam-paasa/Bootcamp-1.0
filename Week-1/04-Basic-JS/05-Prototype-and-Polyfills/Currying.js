/**
 * Currying:
 * - In currying, at a time humaare paas saara data nahi hota. So, we create
 *   a chain of functions where each function returns a function.
 * 
 * - Currying is a process in functional programming where a function that 
 *   takes multiple arguments is converted into a sequence of functions that 
 *   each take a single argument.
 * 
 * - Currying helps in creating more flexible and reusable functions by 
 *   breaking down complex operations into simpler ones.
*/


/**
 * Normal Function:
*/

function sumOne(a, b) {
    return a + b;
}

const result = sumOne(1, 2); // calling fn once


/**
 * Currying Level-1:
 * - Sum all the parameter that are provided in the function call
*/

console.log("Variant-1: Currying");
function sumTwo(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}

const sum2 = sumTwo(1)(2)(3); // calling fn thrice, each time for one argument
console.log(sum2);



/**
 * Currying Level-2:
 * Initialize the function once and then call it multiple times:
 * a) evaluate("sum")(4)(2)      => 6
 * b) evaluate("multiply")(4)(2) => 8
 * c) evaluate("divide")(4)(2)   => 2
 * d) evaluate("subtract")(4)(2) => 2
*/

console.log("Variant-2: Currying");
function evaluate(operation) {
    return function (a) {
        return function (b) {
            if (operation === "sum") {
                return a + b;
            } else if (operation === "multiply") {
                return a * b;
            } else if (operation === "divide") {
                return a / b;
            } else if (operation === "subtract") {  
                return a - b;
            }
            return "Invalid Operation";
        }
    }
}

const add = evaluate("sum");
console.log('Sum:', add(4)(2));
console.log('Sum:', add(3)(3));
console.log('Sum:', add(3)(5));

const mult = evaluate("multiply");
console.log('Multiply:', mult(4)(2));
console.log('Multiply:', mult(3)(3));
console.log('Multiply:', mult(3)(5));

const div = evaluate("divide");
console.log('Divide:', div(4)(2));
console.log('Divide:', div(3)(3));
console.log('Divide:', div(3)(5));

const sub = evaluate("subtract");
console.log('Subtract:', sub(4)(2));
console.log('Subtract:', sub(3)(3));
console.log('Subtract:', sub(3)(5));


/**
 * Currying Level-3: Infinite Currying
*/

console.log("Variant-3: Infinite Currying");

function addInfinite(a) {
    return function (b) {
        if(b) return addInfinite(a + b);
        return a;
    }
}

console.log(addInfinite(5)(2)(4)(8)());


/**
 * Variant 4: Currying vs Partial Application
 * Look, in normal currying we have as many nested functions as arguments
 * Like if there are 3 arguments, there will be 3 nested functions
 * 
 * But here it's a bit different:
 * - We are taking 3 arguments (a, b, c)
 * - But only have 2 functions:
 *   1. First function takes 'a'
 *   2. Second function takes 'b' and 'c' together
 * 
 * That's why this is called Partial Application, not pure currying
*/

console.log("Variant-4: Currying vs Partial Application");

function sumWithCurrying(a) {
    return function(b, c) {
        return a + b + c; // Sum of all three numbers
    }
}

/**
 * Ex-1:
 */
const x = sumWithCurrying(10); // First store 10
console.log(x(5, 6));          // Then add 5,6, output: 21
console.log(x(3, 2));          // Now add 3,2, output: 15

/**
 * Ex-2: All in one line
 */
console.log(sumWithCurrying(20)(1, 4)); // Output: 25



/**
 * Currying Level-5: Currying + DOM Manipulation
 * This example shows how to use currying in a real webpage to update text.
 * 
 * First, we have this HTML:
 * <h1 id="heading">Hello Mohammad</h1>
 * 
 * Let's break down how our code works:
 * 1. We create updateElementText() that takes an element's ID
 * 2. It returns a new function that takes the text we want to show
 * 3. When called, it finds the element and updates its text
 * 
 * The benefit? Once we select an element, we can update it many times
 * without having to find it again and again!
*/

function updateElementText(id) {
    return function (content) {
        document.querySelector("#" + id).textContent = content;
    }
}

/**
 * First select the heading element:
 */
const updateHeading = updateElementText("heading");

/**
 * Now we can update its text whenever we want
 */
updateHeading("Hello Mohammad");




/**
 * Currying Level-6: Currying
 * - Converts f(a, b, c) to f(a)(b)(c)   [VVI]
*/

function curry(func) {
    return function curriedFunc(...args) {

        console.log(args.length, func.length);

        /**
         * If the number of arguments passed is equal to the number of 
         * arguments required by the function, then call the function
        */
        if(args.length >= func.length) {
            return func(...args);
        }

        /**
         * If the number of arguments passed is less than the number of 
         * arguments required by the function, then collect all the arguments 
         * passed to the curried function then call the curried function again
        */
        else {
            return function(...next) {
                return curriedFunc(...args, ...next);
            }
        }
    }
}

const sumCurr = (a, b, c) => a + b + c;
const totalSum = curry(sumCurr);
console.log(totalSum(1)(2)(3));
