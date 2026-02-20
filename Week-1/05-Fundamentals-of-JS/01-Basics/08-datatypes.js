/** 
 * JavaScript Data Types
 * 
 * Data types are categories that tell JavaScript what kind of value we're 
 * working with. Think of them like different types of containers for storing
 * information.
 * 
 * 1. Numbers
 *    - Whole numbers: 42, -7, 1000
 *    - Decimal numbers: 3.14, -0.5
 *    - Example: let userAge = 25;
 * 
 * 2. Strings (Text)
 *    - Text wrapped in quotes
 *    - Can use single ('), double (") or backticks (`)
 *    - Example: let userName = "John";
 * 
 * 3. Boolean
 *    - Only two values: true or false
 *    - Used for yes/no decisions
 *    - Example: let isActive = true;
 * 
 * 4. Undefined
 *    - When a variable is declared but not given a value
 *    - Example: let userScore; // userScore is undefined
 * 
 * 5. Null
 *    - Represents an empty or non-existent value
 *    - Example: let currentUser = null;
 * 
 * 6. Objects
 *    - Store multiple values as key-value pairs
 *    - Example:
 *      let userProfile = {
 *        name: "John",
 *        age: 25,
 *        isActive: true
 *      };

 * 7. Arrays
 *    - Store multiple values in a list
 *    - Example: let favoriteColors = ["red", "blue", "green"];
 * 
 * 8. Symbols
 *    - Create unique identifiers
 *    - Example: let userId = Symbol("unique");
 * 
 * 9. BigInt
 *    - For very large numbers
 *    - Add 'n' at the end
 *    - Example: let largeNumber = 9007199254740991n;
*/

// Basic Examples
let userAge = 25;                   // Number
let userName = "John";              // String
let isActive = true;                // Boolean
let userScore;                      // Undefined
let currentUser = null;             // Null

// Object Example
let userProfile = {
    name: "John",
    age: 25,
    isActive: true
};

// Array Example
let favoriteColors = ["red", "blue", "green"];

// Type Checking
console.log(typeof userAge);        // "number"
console.log(typeof userName);       // "string"
console.log(typeof isActive);       // "boolean"
console.log(typeof userScore);      // "undefined"
console.log(typeof currentUser);    // "object"
console.log(typeof userProfile);    // "object"
console.log(typeof favoriteColors); // "object"

// Type Conversion Examples
let stringScore = "33";
let numericScore = Number(stringScore);
console.log(numericScore);          // 33

let loginStatus = 1;
let booleanLoginStatus = Boolean(loginStatus);
console.log(booleanLoginStatus);    // true

let numericValue = 33;
let stringValue = String(numericValue);
console.log(stringValue);           // "33"

// Basic Operations
console.log(2 + 2);    // Addition: 4
console.log(5 - 2);    // Subtraction: 3
console.log(4 * 2);    // Multiplication: 8
console.log(10 / 2);   // Division: 5
console.log(10 % 3);   // Modulus (remainder): 1

// String Operations
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName);  // "John Doe"

// Increment/Decrement
let counter = 0;
counter++;              // Increment by 1
console.log(counter);   // 1
counter--;              // Decrement by 1
console.log(counter);   // 0




/**
 * Special Characters in JavaScript:
 * 1. \\ - Backslash (escape character)
 * 2. \b - Backspace
 * 3. \r - Carriage return
 * 4. \" - Double quote
 * 5. \f - Form feed
 * 6. \n - New Line
 * 7. \' - Single quote
 * 8. \t - Tab
*/ 

/**
 * Example of new line character
*/
let text = "This new apple iphone \n has been launched";
console.log(text);

/**
 * Example of tab character
*/
let text2 = "This new apple iphone 15 \t has been launched";
console.log(text2);

/**
 * Example of combining variables with new line
*/
let age = 10;
let name = "Sanket";
console.log(name, "\n", age);

/**
 * Note: These special characters help format text output in JavaScript
*/



/* Why String to Number Conversion is difficult?
 * - JavaScript mein string se number mein conversion karna thoda confusing
 *   ho sakta hai
 * - Jab hum string ko number mein convert karte hain, toh JavaScript 
 *   automatically type coercion perform karta hai.
 * 
 * - Kuch common scenarios:
 *   1. "2" + "2" = "22" (string concatenation)
 *   2. "2" - "2" = 0    (number subtraction)
 *   3. "2" * "2" = 4    (number multiplication)
 *   4. "2" / "2" = 1    (number division)
 * 
 * - Isliye hum Number() function ya parseInt()/parseFloat() ka use karte hain
 *   explicit conversion ke liye
 * - NaN (Not a Number) result aata hai jab conversion possible nahi hota
 *   hai.
*/


/**
 * Example 1: String concatenation
*/
let num1 = "2";
let num2 = "2";

let sum = num1 + num2;
console.log(sum);


/**
 * Example 2: Number subtraction
*/
let num3 = "2";
let num4 = "2";

let diff = num3 - num4;
console.log(diff);


/**
 * Example 3: Number multiplication
*/
let num5 = "2";
let num6 = "2";

let product = num5 * num6;
console.log(product);


/**
 * Example 4: Number division
*/
let num7 = "2";
let num8 = "2";

let division = num7 / num8;
console.log(division);

/**
 * Example 5: NaN result
*/
let num9 = "2";
let num10 = "hello";

let result = num9 / num10;
console.log(result);


/**
 * Example 6: parseInt()
*/
let num11 = "123";
let num12 = "456";

let sum2 = parseInt(num11) + parseInt(num12);
console.log(sum2);



/**
 * Example 7: parseFloat()
*/
let num13 = "123.456";
let num14 = "789.123";

let sum3 = parseFloat(num13) + parseFloat(num14);
console.log(sum3);


/**
 * Example 8: Number()
*/
let num15 = "123";
let num16 = "456";

let sum4 = Number(num15) + Number(num16);
console.log(sum4);