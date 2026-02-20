/**
 * Q. Write a function that generates a greeting message with the provided name.
 *    a. Arguments - name
 *    b. Returns  - string
 *    c. Logs     - Hello {name}
*/

function greet(name: string): string {
    return "Hello " + name;
}

let greeting = greet("Rohan");
console.log(greeting);



/**
 * Q. Write a function that calculates the sum of two numbers.
 *    a. Arguments - a, b
 *    b. Returns  - number
 *    c. Logs     - sum of a and b
*/

function sum(a: number, b: number): number {
    return a + b;
}

let result = sum(10, 20);
console.log(result);



/**
 * Q. Write a function that checks if a number is even.
 *    a. Arguments - num
 *    b. Returns  - boolean
 *    c. Logs     - "Even" if the number is even, "Odd" otherwise
*/

function isEven(num: number): boolean {
    return num % 2 === 0;
}

let even = isEven(10);
if (even) {
    console.log("Even");
} else {
    console.log("Odd");
}
console.log(even);