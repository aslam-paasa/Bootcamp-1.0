/**
 * Do numbers ko add karne ka ek interesting tarika (Interview Question)
 * Hum + operator ka use kiye bina numbers ko add karenge
 * 
 * Total three main cases hain:
 * 1. Dono numbers positive hain (jaise 5 + 2)
 * 2. Ek positive, ek negative number (jaise 5 + (-2))
 * 3. Dono numbers negative hain (jaise -2 + (-3))
*/

/**
 * Case 1: Dono numbers positive hain (jaise 5 + 2)
 * - Pehle number (num1) ko ek-ek karke increment karenge
 * - Kitni baar increment karna hai? Second number (num2) ke barabar
 * 
 * Example: 5 + 2
 * - num1 = 5, num2 = 2
 * - Loop 2 baar chalega:
 *   - Pehli baar: 5 + 1 = 6
 *   - Dusri baar: 6 + 1 = 7 (final answer)
*/

/**
 * Case 2: Ek positive, ek negative number (jaise 5 + (-2))
 * - Pehle dono numbers mein se minimum aur maximum find karenge
 * - Minimum number ko maximum number ke barabar increment karenge
 * 
 * Example: 5 + (-2)
 * - max = 5, min = -2
 * - Loop 5 baar chalega:
 *   - -2 + 1 = -1
 *   - -1 + 1 = 0
 *   -  0 + 1 = 1
 *   -  1 + 1 = 2
 *   -  2 + 1 = 3 (final answer)
*/

/**
 * Case 3: Dono numbers negative hain (jaise -2 + (-3))
 * - Pehle number ka absolute value le lenge (Math.abs)
 * - Second number ko decrement karenge
 * 
 * Example: -2 + (-3)
 * - Math.abs(-2) = 2
 * - Loop 2 baar chalega:
 *   - -3 - 1 = -4
 *   - -4 - 1 = -5 (final answer)
*/

let num1 = 22;
let num2 = 2;

if(num1 < 0 && num2 < 0) {  // Case 3: Dono numbers negative hain
    for(let i = 1; i < Math.abs(num2); i++) {
        num1--; // num1 ko decrement karenge
    } 
    console.log(num1);
}
else {  // Case 1 & 2: Dono positive ya ek positive ek negative
    let max = Math.max(num1, num2);  // Maximum number find karenge
    let min = Math.min(num1, num2);  // Minimum number find karenge
    
    for(let i = 1; i <= max; i++) {
        min++;  // Minimum number ko increment karenge
    }
    console.log(min);
}
