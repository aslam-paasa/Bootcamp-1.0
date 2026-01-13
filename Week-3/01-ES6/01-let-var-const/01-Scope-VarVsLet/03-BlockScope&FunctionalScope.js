/**
 * Q. What will be the output and why?
*/

let a = 100;
function App(){

    console.log("1", a);
    let a = 42;
    console.log("2", a);

    {
        let a = 100;
    }

    console.log("3", a);
}

console.log(a);

/**
 * Explanation:
 * 1. The 1st console.log() will result in a refError, because 'a' is
 *    referenced before it is declared within the 'App' function using
 *    the 'let' keyword.
 * 2. In 2nd console.log(), 'a' is already been declared within the 'App'
 *    fn and is assigned the value '42'. 
 * 3. The block inside the 'App()' fn creates a new block-scope variable-a
 *    with the value-100, but this new variable is only accessible within
 *    the block or curly braces and does not affect the value of 'a'
 *    declared within the fn.
 * 4. When 'console.log('3', a) is executed outside of the block, it logs
 *    ('3', 42).
*/