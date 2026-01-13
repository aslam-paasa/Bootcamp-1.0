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
 * In Type Utilites, we have implemented utility functions to determine
 * the types of primitive values. In this question, we will implement the
 * following utility functions to determine the types of non-primitive values:
 * 
 * a. isArray(value):
 *    > Returns true if value is an array, false otherwise.
 * 
 * b. isFunction(value):
 *    > Returns true if value is a function, false otherwise.
 * 
 * c. isObject(value):
 *    > Returns true if value is an object (e.g. arrays, functions, objects,
 *      etc, but not including null and undefined), false otherwise.
 * 
 * d. isPlainObject(value):
 *    > Returns true if value is a plain object, false otherwise (for arrays,
 *      functions, etc).
 *    > A plain object, or what is commonly known as a Plain Old JavaScript 
 *      Object (POJO) is any object whose prototype is Object.prototype or 
 *      an object created via Object.create(null).
*/


/**
 * Explanation:
 * a. isArray:
 *    > Since ES5, there exists an Array.isArray() function which does 
 *      exactly what we need here.
 *    > However, if we're not allowed to use this or need to support old 
 *      browsers, we can check the constructor of the object. However, some 
 *      values like null and undefined have to be specially handled.
 * 
 * b. isFunction:
 *    > We can simply use typeof value === 'function' to check.
 * 
 * c. isObject:
 *    > null and undefined are considered Objects, so we need to handle them
 *      specially as well. Functions are also objects.
 * 
 * d. isPlainObject:
 *    > There are two types of plain objects:
 *      - Objects without prototypes, created using Object.create(null)s.
 *      - Object defined using literals (e.g. let a = {}).
 *    > To check for the first case, Object.getPrototypeOf(value) will be 
 *      exactly null.
 *    > To check for the second case, we can use the constructor of its 
 *      prototype, similar to how we check if an object is an Array.
 *    > Lodash's implementation of isPlainObject traverses the object's 
 *      prototype chain but that's unnecessary if we check the constructor.
*/

export function isArray(value) {
  return Array.isArray(value);
}

// Alternative to isArray.
export function isArrayAlt(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  return value.constructor === Array;
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const type = typeof value;
  return type === 'object' || type === 'function';
}

export function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

// Alternative to isPlainObject, Lodash's implementation.
export function isPlainObjectAlternative(value) {
  if (!isObject(value)) {
    return false;
  }

  // For objects created via Object.create(null);
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}
  