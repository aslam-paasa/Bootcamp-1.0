/**
 * setTimeout and Closures: Interview Questions
*/

/**
 * Q1. SetTimeout and Closures:
*/

function x() {
    var i = 1;
    setTimeout(function () {
        console.log(i);
    }, 3000);
    console.log("Namaste JavaScript");
}

x();

/**
 * What happens when we call x()?
 * - A new execution context is created for function x.
 * - Inside that context:
 *   a. Variable 'i' is declared and assigned 1.
 *   b. A setTimeout() function is encountered with a delay of 3 seconds.
 *   c. A callback function (the one that logs 'i') is passed to setTimeout.
*/

/**
 * How setTimeout works behind the scenes?
 * - setTimeout is a Web API, not part of core JavaScript.
 * - It: 
 *   a. Starts a timer in browser's Web API environment.
 *   b. Registers the callback fn to be encounterd after the delay.
 *   c. The callback forms a closure, meaning it remembers i. 
 * 
 * Note: setTimeout is non-blocking, so JavaScript doesn't wait for 3 seconds.
*/

/**
 * What happens next?
 * - Right after setTimeout is registered:
 * 
 *   console.log("Namaste JavaScript")
 * 
 *   a. This line runs immediately, since it's synchronous code.
 *   b. Output so far: Namaste JavaScript
 * 
 * After 3 seconds:
 * - The timer completes.
 * - The callback function is moved to the Callback Queue.
 * - The Event Loop checks if the Call Stack is empty.
 * - If yes, the callback is moved into the stack and executed. 
 * 
 * Now, 
 *   console.log(i); // What does this print?
 * 
 * - Even though function x() has finished executing, the callback
 *   remembers the value of i because of closure. So, it prints: 1
*/

/**
 * What does this teach us?
 * 1. Closure: 
 *    The callback function remembers i, even though x() is no longer in
 *    stack.
 * 
 * 2. Asynchronous JavaScript:
 *    - setTimeout doesn't pause the code.
 *    - Code runs ahead, and the callback is handled later.
 * 
 * 3. Event Loop & Callback Queue:
 *    - JS handles async operations using Web APIs, Callback Queue, and the
 *      Event Loop to manage what runs when.
 * 
 * O/P: Namaste JavaScript
 *      1
*/




/**
 * Q.2. SetTimeout aur Closures ka interesting case:
 * 
 * Problem:
 * - Code 6, 6, 6, 6, 6 kyu print kar raha hai?
 * - Humne loop 1 se 5 tak chalaya, fir bhi 6 kyu?
*/

// function y() {
//     for(var i = 1; i <= 5; i++) {
//         setTimeout(function () {
//             console.log(i);
//         }, i * 1000);
//     }
//     console.log("Namaste JavaScript");
// }

// y();

/**
 * Explanation:
 * - 'var i' function scope mai hai, matlab poore function y() mai ek hi 'i'
 *   hai
 * - Loop jab complete hota hai tab 'i' ki value 6 ho chuki hai
 *   (i <= 5 false hone pe)
 * - setTimeout callbacks queue mai wait kar rahe hai
 * - Jab inko execute hone ka time aata hai (1s, 2s, etc), tab tak loop
 *   khatam ho chuka hai
 * - Har callback same 'i' ko refer kar raha hai (closure ke through)
 * - Aur tab 'i' ki value 6 hai, isliye har baar 6 print hota hai
 * 
 * Solution:
 * - 'let' keyword use karein 'var' ki jagah
 * - 'let' block scope create karta hai, matlab har iteration mai nya 'i'
 * - Har callback apne iteration ke 'i' ko remember karega
 * - Result: 1, 2, 3, 4, 5 print hoga
 * 
 * Note: Ye closure ka classic example hai - callback functions apne lexical scope 
 * ko yaad rakhte hai, chahe wo baad mai execute ho
*/

function y() {
    for(let i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
    console.log("Namaste JavaScript");
}

y();

