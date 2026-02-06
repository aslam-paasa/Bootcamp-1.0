/**
 * Section-1: let, const and var
*/

/**
 * Temporal Dead Zone(TDZ):
 * TDZ is an important concept in JS, because it helps to prevent 
 * accidental access to uninitialized variables which can lead to 
 * unexpected behaviour in your code.
*/


/**
 * Q. What will be the output of this? And why?
*/

function TDZ() {
    console.log(a);
    let a = 12;
}

/**
 * Explanation:
 * 1. JS Engine cannot access variable-a before initialization using
 *    'let' keyword, that's why this code will result in ReferenceError.
 * 2. In JS, the variables declared using the 'let' keyword are subject
 *    to the 'Temporal Dead Zone'. 
 * 3. In this code, the variable-a is declared within the 'TDZ()' fn
 *    using the 'let' keyword, and it is hoisted to the top of the fn
 *    scope. However, when console.log(a) is executed, the variable-a
 *    has not been initialized, so it has the value of 'undefined'.
*/