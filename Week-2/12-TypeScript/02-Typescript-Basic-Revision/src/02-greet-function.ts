/**
 * Hello World: 
 * 1. Things to learn - How to give types to arguments of a function.
 * 2. Write a function that greets a user given their first name.
 *    a. Argument - firstName
 *    b. Logs     - Hello, {firstName}
 *    c. Doesn't return anything.
 * 3. Invoke the function with a sample name.
*/


function greet(firstName: string): void {
    console.log(`Hello, ${firstName}!`);
}
greet('Rohan');


let greetUser = (firstName: string): void => {
    console.log(`Hello, ${firstName}!`);
}


greetUser('Gaurav');
