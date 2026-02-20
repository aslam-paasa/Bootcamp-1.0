/**
 * apply() method in JavaScript:
 *
 * apply() is used to INVOKE (call) a function
 * by manually setting the value of `this`,
 * and passing arguments as an ARRAY.
 *
 * Simple meaning:
 * - Call a function
 * - Decide what `this` should be
 * - Pass arguments inside an array
 *
 * Important points:
 * 1. apply() is available on all functions.
 * 2. It immediately executes the function.
 * 3. It allows function borrowing.
 * 4. Arguments are passed as an array (or array-like).
 * 5. It returns the result of the function call.
 */

/**
 * Syntax:
 * function.apply(thisObj, argsArray);
 *
 * Parameters:
 *
 * thisObj:
 * - The object that should become `this` inside the function.
 *
 * argsArray:
 * - An array (or array-like object) of arguments.
 * - Can be null or undefined if no arguments are needed.
 */

/* Simple Example */
let car1 = {
    color: "Red",
    company: "Ferrari"
};

let car2 = {
    color: "Blue",
    company: "BMW"
};

function purchaseCar(price) {
    console.log(`I have purchased ${this.color} ${this.company} for Rs. ${price}`);
}

purchaseCar.apply(car1, ["70 lakh"]);
purchaseCar.apply(car2, ["90 lakh"]);

// Output:
// I have purchased Red Ferrari for Rs. 70 lakh
// I have purchased Blue BMW for Rs. 90 lakh

/**
 * Step-by-step flow:
 *
 * purchaseCar.apply(car1, ["70 lakh"]):
 * - this → car1
 * - arguments taken from array
 *
 * purchaseCar.apply(car2, ["90 lakh"]):
 * - this → car2
 */

/**
 * Why apply() is useful:
 *
 * - Reuse same function for multiple objects
 * - Pass dynamic arguments as arrays
 * - Useful when arguments are already in array form
 */

/**
 * apply() vs call():
 *
 * call():
 * - Arguments passed one by one
 *
 * apply():
 * - Arguments passed as an array
 */

/* Example comparison */
purchaseCar.call(car1, "70 lakh");
purchaseCar.apply(car1, ["70 lakh"]);

/**
 * Step 1: Create your own apply() (Polyfill)
 */
Function.prototype.apply = function (context, args) {

    // If context is null or undefined, use global object
    context = context || globalThis;

    // If args not provided, use empty array
    args = args || [];

    // Attach function temporarily
    context.fn = this;

    // Call function with spread arguments
    const result = context.fn(...args);

    // Remove temporary function
    delete context.fn;

    return result;
};

/* Step 2: Use custom apply() */
purchaseCar.apply(car1, ["80 lakh"]);

// Output:
// I have purchased Red Ferrari for Rs. 80 lakh

/**
 * Important note:
 *
 * apply() changes `this` ONLY for that function call.
 * Original function remains unchanged.
 */

/**
 * Final understanding:
 *
 * call():
 * - Pass arguments individually
 *
 * apply():
 * - Pass arguments as array
 *
 * apply() = "borrow function with array arguments"
 */
