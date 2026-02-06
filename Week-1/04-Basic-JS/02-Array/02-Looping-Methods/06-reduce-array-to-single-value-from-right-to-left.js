/**
 * Step 5: reduceRight() - Right se Left Process karna
 * > reduceRight() bhi reduce() jaise hi hai, lekin right se left process 
 *   karta hai.
*/

/**
 * Example 1: 
*/

const numbers = [1, 2, 3, 4];


/* reduce() - left to right */
const leftToRight = numbers.reduce((acc, curr) => {
    console.log(`Acc: ${acc}, Curr: ${curr}`);
    return acc - curr;
}, 0);
// 0-1=-1, -1-2=-3, -3-3=-6, -6-4=-10


/* reduceRight() - right to left   */
const rightToLeft = numbers.reduceRight((acc, curr) => {
    console.log(`Acc: ${acc}, Curr: ${curr}`);
    return acc - curr;
}, 0);
// 0-4=-4, -4-3=-7, -7-2=-9, -9-1=-10


console.log("Left to Right:", leftToRight); // -10
console.log("Right to Left:", rightToLeft); // -10



/**
 * Example 2: Real World Example - Mathematical Operations
*/

/* Power operations - right to left important hai */
const operations = [2, 3, 2]; // 2^3^2

/* Right to left: 2^(3^2) = 2^9 = 512 */
const powerResult = operations.reduceRight((acc, curr) => Math.pow(curr, acc));
console.log("Power result (2^3^2):", powerResult); // 512

/* String concatenation */
const words = ["World", " ", "Hello"];
const sentence = words.reduceRight((acc, word) => acc + word);
console.log("Reversed sentence:", sentence); // "Hello World"