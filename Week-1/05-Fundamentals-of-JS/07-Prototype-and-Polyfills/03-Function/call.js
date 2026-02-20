/**
 * call() method in JavaScript:
 *
 * call() is used to INVOKE (call) a function
 * by manually setting the value of `this`.
 *
 * Simple meaning:
 * - Call a function
 * - Decide what `this` should point to
 * - Pass arguments ONE BY ONE
 *
 * Important points:
 * 1. call() is available on all functions.
 * 2. It immediately executes the function.
 * 3. It allows function borrowing.
 * 4. Arguments are passed individually (not in an array).
 * 5. It returns the result of the function call.
 */

/**
 * Syntax:
 * function.call(thisObj, arg1, arg2, ...);
 *
 * Parameters:
 *
 * thisObj:
 * - The object that should become `this` inside the function.
 *
 * arg1, arg2, ...:
 * - Arguments passed individually to the function.
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

purchaseCar.call(car1, "70 lakh");
purchaseCar.call(car2, "90 lakh");

// Output:
// I have purchased Red Ferrari for Rs. 70 lakh
// I have purchased Blue BMW for Rs. 90 lakh

/**
 * Step-by-step flow:
 *
 * purchaseCar.call(car1, "70 lakh"):
 * - this → car1
 * - this.color → "Red"
 * - this.company → "Ferrari"
 *
 * purchaseCar.call(car2, "90 lakh"):
 * - this → car2
 * - this.color → "Blue"
 * - this.company → "BMW"
 */

/**
 * Why call() is useful:
 *
 * - Reuse same function for multiple objects
 * - Avoid duplicate code
 * - Control `this` manually
 */

/**
 * call() vs apply():
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
 * Step 1: Create your own call() (Polyfill)
 */
Function.prototype.call = function (context, ...args) {

    // If context is null or undefined, use global object
    context = context || globalThis;

    // Attach function to context
    context.fn = this;

    // Call the function
    const result = context.fn(...args);

    // Remove temporary function
    delete context.fn;

    return result;
};

/* Step 2: Use custom call() */
purchaseCar.call(car1, "75 lakh");

// Output:
// I have purchased Red Ferrari for Rs. 75 lakh

/**
 * Important note:
 *
 * call() changes `this` ONLY for that function call.
 * The original function is NOT modified.
 */

/**
 * Final understanding:
 *
 * call():
 * - Calls function immediately
 * - Sets `this` manually
 * - Pass arguments individually
 *
 * call() = "borrow function and control this"
 */
