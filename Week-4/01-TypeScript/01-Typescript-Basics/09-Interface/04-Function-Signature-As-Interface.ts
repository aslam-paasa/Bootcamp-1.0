/**
 * Function Signature as an interface:
 * - interface InterfaceName {
 *      (parameter1: parameterType1, parameter2: parameterType2): returnType
 *   }
 * - const functionName: InterfaceName = () => {}
*/

/**
 * Q. Declare an interface MathFunction that defines a function signature
 *    for a function that takes two parameters of type number and returns
 *    a number. Then, define a function named add using interface.
 * => More:
 *    - A function to double the number
 *    - A function to return the square
*/

interface MathFunction {
    (a: number, b: number): number
}

const add: MathFunction = (a, b) => a + b


interface DoubleFunction {
    (a: number): number
}

const double: DoubleFunction = (a) => 2 * a
