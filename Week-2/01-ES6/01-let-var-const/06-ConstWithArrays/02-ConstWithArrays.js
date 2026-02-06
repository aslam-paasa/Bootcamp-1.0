/**
 * Will we get an error?
*/
const array = [1,2,3,4]
array = array.push(55)

/** 
 * Understanding :
 * - We will get an error. The 'const' declaration creates a constant 
 *   reference to the array and attempts to reassign that reference to
 *   the result of 'array.push(55)' will result in a 'TypeError'.
 * - The 'const' declaration makes the reference itself constant, so it
 *   cannot be changed to point to a different array.
 * - The 'array.push' method does not return a new array but returns the
 *   new length of the array after the "push" operation, which is not 
 *   valid value for any array reference.
*/