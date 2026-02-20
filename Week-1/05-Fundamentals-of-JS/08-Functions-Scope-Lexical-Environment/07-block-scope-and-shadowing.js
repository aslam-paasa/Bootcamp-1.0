/**
 * What is block in JS?
 * - A block is defined by curly braces {}, and also known as compound
 *   statement.
 * - It is used to combine multiple javascript statement into one group,
 *   and we need to group them together so that we can use the multiple
 *   statements in a place where javascript expects only one statement.
*/

if(true) {
    console.log("Hello");
    console.log("World");
    console.log("Hello");
    console.log("World");
}


/**
 * What is block scope in JS?
 * - Block Scope means what all variables and functions we can access inside
 *   a block.
 * - And to understand block scope, we declare three types of variables 
 *   and see how they behave in a block.
 *   a. var 
 *   b. let
 *   c. const
*/

{
    var a = 10;
    let b = 20;
    const c = 30;
}

/**
 * When we debug, we can see let and const are inside the block scope and
 * assigned undefined, whereas var is hoisted inside the global scope. And
 * that's why we say "let & const are block scoped", means they are stored
 * in a separate memory space which is reserved for this block. 
 * 
 * We cannot access let & const outside the block, but we can access var
 * outside the block. Because var is hoisted to the top of the function scope
 * (global scope), and that's why we can access it outside the block.
*/

console.log(a); // 10
// console.log(b); // ReferenceError: b is not defined
// console.log(c); // ReferenceError: c is not defined



/**
 * What is shadowing in JS?
 * - Shadowing is a concept where a variable declared in an inner scope 
 *   "shadows" a variable with the same name in the outer scope
 * - Meaning the inner variable temporarily hides the outer variable
 * 
 * 1. Shadowing with var:
 * - In case of var, both inner and outer variables are stored in the same 
 *   memory space (global scope)
 * - Therefore when inner var changes value, outer var's value also changes 
 *   because both point to the same location
 * 
 * 2. Shadowing with let/const:
 * - With let/const, inner and outer variables are stored in separate 
 *   block scopes
 * - Changing value in inner block doesn't affect outer value
 * - Outside the block, outer variable maintains its original value
 * 
 * Example of var shadowing:
*/

var a = 10; 
let b = 20;
const c = 30;
{
    var a = 20;  
    let b = 40; 
    const c = 50;  
    console.log(a); // 20 : Global Memory
    console.log(b); // 40 : Block Memory
    console.log(c); // 50 : Block Memory
}

console.log(a); // 20 : Global Memory (shadowed)
console.log(b); // 20 : Global Memory 
console.log(c); // 30 : Global Memory


/**
 * Shadowing in functions:
 * - Shadowing behave the same way for functions as well.
 * 
 * Example 1: Simple Function Shadowing
 * - Global scope mein ek variable 'message' hai
 * - Function ke andar bhi 'message' hai jo global wale ko shadow karta hai
*/

let message = "Main bahar hun!";

function printMessage() {
    let message = "Main function ke andar hun!"; // shadowing
    console.log("Function ke andar:", message); // "Main function ke andar hun!"
}

printMessage();
console.log("Bahar:", message); // "Main bahar hun!"

/**
 * Example 2: Global vs Function vs Block Scope
 * - 'count' variable teeno jagah different hai
 * - Har scope mein uski apni value hai
*/

var count = 1; // global scope

function counter() {
    var count = 2; // function scope, shadows global count
    console.log("Function mein count:", count); // 2
    
    {
        var count = 3; // block scope, shadows function count
        console.log("Block mein count:", count); // 3
    }
    
    console.log("Function mein count (after block):", count); // 3
}

counter();
console.log("Global count:", count); // 1



/**
 * Illegal Shadowing:
 * - Kya hota hai jab hum 'let' variable ko 'var' se shadow karne ki koshish karte hain?
 * - Ye ek illegal shadowing ka case hai
 * - 'let' variable ko 'var' se shadow nahi kar sakte kyunki:
 *   a. 'let' block scope follow karta hai
 *   b. 'var' function scope follow karta hai
 *   c. 'var' declaration block scope ko ignore kar deta hai
 * - Agar aisa karne ki koshish karenge to SyntaxError milega
 * 
 * Example:
 * let x = 10;
 * {
 *    var x = 20; // SyntaxError: Cannot redeclare block-scoped variable 'x'
 * }
 * 
 * Note: Lekin 'var' ko 'let' se shadow kar sakte hain - ye legal hai
 * 
 * Hum in cases mein shadowing kar sakte hain:
 * a. var ko var se
 * b. let ko let se 
 * c. const ko const se
 * d. var ko let se
 * 
 * Lekin:
 * - let/const ko var se shadow nahi kar sakte (illegal shadowing)
 * - const ko let/var se shadow nahi kar sakte
*/

const u = 20;
{
    const u = 30;
    console.log(u); // 30
    {
        const u = 40;
        console.log(u); // 40
    }
}

console.log(u); // 20

