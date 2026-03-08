/**
 * Simple Function with Generics:
 * - function functionName<T>(arg: T): T {
 *      => fn logic here
 *   }
 */

/**
 * Q. Create a fn named identity that makes a parameter value of any
 *    type and returns the same value.
*/

function identity<T>(value: T): T {
    return value
}

// identity<number>('22') // do you see an error?