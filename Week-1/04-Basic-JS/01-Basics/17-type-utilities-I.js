/**
 * Type Utilities:
 * > JS is a dynamically typed language, which means the types of variables
 *   can be changed during runtime.
 * > Many interview questions involve recursion of values that contain
 *   values that contain values of different types and how to handle each
 *   value type (e.g., different code is needed to iterate over an array vs
 *   an object).
 * > Knowledge of handling the JS types is crucial to solving questions like
 *   Deep Clone and Deep Equal.
*/

/**
 * > Implementing these utility functions won't be an entire interview
 *   question itself, but you likely need to implement some of these
 *   utility functions as part of solving more complex interview questions.
 * 
 * > Most of the functions involve only one line and you might not even
 *   need to write a separate function for a single line of logic.
 * 
 * > It's also important to note that the difference b/w null and undefined.
 * > null == undefined is true, so we need to use === if the intention is
 *   to check for exact null and undefined values.
*/

/**
 * In this question, we will implement the following utility functions to 
 * determine the types of primitive values:
 * 
 * a. isBoolean(value): 
 *    > Returns true if value is a boolean, false otherwise.
 * 
 * b. isNumber(value): 
 *    > Returns true if value is a number, false otherwise. Note that NaN is 
 *      considered a number.
 * 
 * c. isNull(value): 
 *    > Returns true if value is null, false otherwise.
 * 
 * d. isString(value): 
 *    > Returns true if value is a String, else false.
 * 
 * e. isSymbol(value): 
 *    > Returns true if value is a Symbol primitive, else false.
 * 
 * f. isUndefined(value): 
 *    > Returns true if value is undefined, else false.
*/



export function isBoolean(value) {
  return value === true || value === false;
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isNull(value) {
  return value === null;
}

export function isString(value) {
  return typeof value === 'string';
}

export function isSymbol(value) {
  return typeof value === 'symbol';
}

export function isUndefined(value) {
  return value === undefined;
}
  