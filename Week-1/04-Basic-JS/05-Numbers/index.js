/**
 * JavaScript Numbers
*/

/**
 * 1. Basics of Numbers in JS:
 *    - JS has only one number type: Number
 *    - Numbers can be:
 *      > Integers: 42
 *      > Floats(decimals): 3.14
 *      > Scientific Notation: 1.5e3 (i.e, 1500)
*/

let num1 = 10;
let num2 = 3.14;
let sci = 2.5e6;


/**
 * 2. Special Number Values:
 *    a. Infinity: Larger than any other number
 *    b. -Infinity: Smaller than any other number
 *    c. NaN      : "Not-a-Number" (invalid number result)
 *    d. Number.MAX_VALUE: Largest possible number
 *    e. Number.MIN_VALUE: Smallest possible number > 0
 *    f. Number.MAX_SAFE_INTEGER:  2^53 - 1  (largest safe integer)
 *    g. Number.MIN_SAFE_INTEGER: -(2^53 - 1)
*/

console.log(1 / 0);       // Infinity
console.log(-1 / 0);      // -Infinity
console.log("abc" * 2);   // NaN


/**
 * 3. Number Conversion
 *    a. Number(value)    : Converts to number
 *    b. parseInt(value)  : Parses integer from string
 *    c. parseFloat(value): Parses float from string
*/

Number("42");         // 42
parseInt("42px");     // 42
parseFloat("3.14abc") // 3.14
    + "123";               // 123


/**
 * 4. Checking Numbers
*/

isNaN(NaN);                             // true
Number.isNaN(NaN);                      // true
Number.isNaN("abc");                    // false

isFinite(100);                          // true
Number.isFinite(100);                   // true
Number.isFinite("100");                 // false

Number.isInteger(42);                   // true
Number.isSafeInteger(9007199254740991); // true


/**
 * Number Methods:
 * 1. toFixed(n)
 * 2. toPrecision(n)
 * 3. toExponential(n)
 * 4. toString(base)
 * 5. valueof()
*/

/* 1. toFixed(n): Returns a string with n digits after the decimal */
let n1 = 3.14159;
n1.toFixed(2);  // "3.14"


/* 2. toPrecision(n): Returns a string with a total of n significant digits */
let n2 = 123.456;
n2.toPrecision(4); // "123.5"


/* 3. toExponential(n): Converts to exponential notation */
let n3 = 12345;
n3.toExponential(2); // "1.23e+4"


/* 4. toString(base): Converts number to string in given base (2 to 36) */
(255).toString(2);  // "11111111"
(255).toString(16); // "ff"


/* 5. valueOf(): Returns the primitive value of a number object */
let n = new Number(5);
n.valueOf(); // 5


/**
 * Math Methods (commonly used):
*/
Math.round(4.7);      // 5
Math.floor(4.7);      // 4
Math.ceil(4.1);       // 5
Math.trunc(4.9);      // 4
Math.abs(-7);         // 7
Math.sqrt(16);        // 4
Math.pow(2, 3);       // 8
Math.random();        // 0 <= x < 1
Math.min(1, 3, -5);   // -5
Math.max(1, 3, -5);   // 3


/**
 * BigInt (for large integers):
 * > Used when numbers exceed 2^53 - 1
*/
const big = 1234567890123456789012345678901234567890n;
typeof big; // "bigint"


/**
 * Common Issues with Numbers:
 * > Floating Point Precision: 
 *   0.1 + 0.2 === 0.3; // false
 * 
 * > Use Number.EPSILON to compare safely: 
 *   Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
*/


/**
 * Useful Constants:
*/
Number.EPSILON             // Smallest difference between 1 and next number
Number.MAX_SAFE_INTEGER    // 9007199254740991
Number.MIN_SAFE_INTEGER    // -9007199254740991
Number.POSITIVE_INFINITY
Number.NEGATIVE_INFINITY
Number.NaN



/**
 * Summary:
 * 1. Check NaN                : isNaN(), Number.isNaN()
 * 2. Check finite number      : Number.isFinite()
 * 3. Convert to Number        : Number(), +value(), parseInt()
 * 4. Fix decimal places       : .toFixed(n)
 * 5. Format significant digits: .toPrecision(n)
 * 6. Convert to base          : .toString(base)
 * 7. Random Number            : Math.random()
 * 8. Handle large integers    : BigInt
*/