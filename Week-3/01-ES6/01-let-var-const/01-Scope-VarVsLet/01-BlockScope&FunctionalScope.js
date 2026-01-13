/**
 * Section-1: let, const and var
*/

/**
 * Functional Scope:
 * 1. var work outside 'if-block' as well. It has a functional scope.
 * 2. If a var is defined inside fn, then that var is accessible inside
 *    the function anywhere.
 * 
 * Block Scope:
 * 1. let work only inside 'if-block'. It has a block scope.
 * 2. let keyword is used to declare the variable within the 'if-block'
 *    and the scope of 'b' is limited to 'if-block' only. As a result,
 *    attempting to access 'b' outside of the block will result in
 *    'ReferenceError'. 
*/

function understandingScope() {
    if(true) {
        var a = 2;
        let b = 2;
    }
    console.log(a); // => undefined (Reference Error)
    console.log(b); // => 2
}

/**
 * 'let' is a var with boundaries.
*/
