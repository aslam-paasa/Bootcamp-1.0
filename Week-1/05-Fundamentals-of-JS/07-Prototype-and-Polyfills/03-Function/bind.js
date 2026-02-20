/**
 * bind() method in JavaScript:
 *
 * bind() is used to CREATE a new function
 * with a fixed value of `this`.
 *
 * Simple meaning:
 * - It does NOT call the function immediately
 * - It returns a NEW function
 * - That new function remembers:
 *   → what `this` should be
 *   → optional preset arguments
 *
 * Important points:
 * 1. bind() is available on all functions.
 * 2. It does NOT execute the function immediately.
 * 3. It returns a NEW function.
 * 4. `this` value is permanently fixed for that new function.
 */

/**
 * Syntax:
 * function.bind(thisObj, arg1, arg2, ...);
 *
 * Parameters:
 *
 * thisObj:
 * - The object that should become `this` inside the function.
 *
 * arg1, arg2, ... (optional):
 * - Arguments that are pre-filled (partial application).
 */

/* Simple Example */
let car = {
    color: "Red",
    company: "Ferrari"
};

function purchaseCar(price) {
    console.log(`I have purchased ${this.color} ${this.company} for Rs. ${price}`);
}

let getCarInfo = purchaseCar.bind(car, "70 lakh");
getCarInfo();

// Output:
// I have purchased Red Ferrari for Rs. 70 lakh

/**
 * Step-by-step flow:
 *
 * purchaseCar.bind(car, "70 lakh"):
 * - Creates a NEW function
 * - this → car
 * - price → "70 lakh"
 *
 * getCarInfo():
 * - Executes purchaseCar later
 */

/**
 * bind() with arguments passed later:
 */
let buyLater = purchaseCar.bind(car);

buyLater("80 lakh");

// Output:
// I have purchased Red Ferrari for Rs. 80 lakh

/**
 * Why bind() is useful:
 *
 * - Fix `this` permanently
 * - Useful in callbacks & event handlers
 * - Avoid losing `this` reference
 */

/**
 * bind() vs call() vs apply():
 *
 * call():
 * - Executes immediately
 * - Arguments passed individually
 *
 * apply():
 * - Executes immediately
 * - Arguments passed as array
 *
 * bind():
 * - Does NOT execute immediately
 * - Returns a new function
 */

/* Comparison Example */
purchaseCar.call(car, 500000);        // immediate
purchaseCar.apply(car, [500000]);     // immediate

let purchase = purchaseCar.bind(car, 500000);
purchase();                           // executed later

/**
 * Step 1: Create your own bind() (Polyfill)
 */
Function.prototype.bind = function (context, ...args) {

    const originalFn = this;

    return function (...laterArgs) {
        return originalFn.apply(context, [...args, ...laterArgs]);
    };
};

/* Step 2: Use custom bind() */
let boundFn = purchaseCar.bind(car, "90 lakh");
boundFn();

// Output:
// I have purchased Red Ferrari for Rs. 90 lakh

/**
 * Important note:
 *
 * bind() creates a NEW function.
 * Original function is NOT modified.
 */

/**
 * Final understanding:
 *
 * call()  → call now
 * apply()→ call now (array args)
 * bind() → call later
 *
 * bind() = "fix this and reuse later"
 */
