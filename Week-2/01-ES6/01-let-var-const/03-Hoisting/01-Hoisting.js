/**
 * Hoisting:
 * - Hoisting is like moving the declarations of variables and functions
 *   to the top of your code before running it, so you can use them 
 *   earlier than where they appear in the code.
 * - Hoisting only moves declarations, not assignments or function 
 *   expressions.
 * 
 * Scoping:
 * - Scope is like the "area" or "zone" variable or fn can be used in
 *   our code.
 * - It tells us where a variable is 'accessible(can be used)' and where
 *   it is not accessible.
*/


/**
 * Q. Predict output and explain.
*/

function something() {
    // a = undefined
    console.log(a);
    var a = 2;
}

something()

/**
 * Understanding :
 * => In this code, the variable "a" is declared within the "something"
 *    function using the "var" keyword, which makes it function-scoped.
 * => In JavaScript, variables declared within "var" are hoisted to the
 *    top of their scope and are initialized with a value of "undefined"
 *    when they are declared.
 * */
