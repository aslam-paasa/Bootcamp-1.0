/**
 * Q. What will be the output, and why?
*/

let a = 100;
function App() {
    a = 42;
    console.log("1", a); // => '1', 42
}

App(); 

/**
 * Explanation:
 * 1. 'a' is declared outside of the 'App()' fn using the 'let' keyword
 *    which makes it a global variable, accessible within the 'App()' fn.
 * 2. Inside the 'App()' fn, the value of 'a' is changed to 42.
 * 3. When console.log('1', a) is executed, it logs ('1', 42), which is
 *    the value of 'a' assigned within the 'App()' fn.
*/


/**
 * Points to Remember:
 * 1. Always use const unless required otherwise
 * 2. Use let when you want to change the value
 * 3. Define all variables at the top of the scope
 * 4. Name your variables differently.
 * 5. Stop using var from now on.
*/