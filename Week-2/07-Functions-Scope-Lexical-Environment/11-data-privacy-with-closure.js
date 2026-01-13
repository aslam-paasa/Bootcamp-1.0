/**
 * Application of Closures:
 * - Data Privacy
 * - Encapsulation
 * - Memoization
*/

/**
 * 1. Data Privacy - Data ko private rakhne ke liye
 * 2. Encapsulation - Code ko organize karne ke liye
 */

/**
 * Example of Data Privacy & Encapsulation:
 * Problem: Maan lo humein ek bank account banana hai jahan balance private ho
 */


/**
 * Approach-1: Direct object use karna (Wrong Approach)
 * - Direct object use karna is a wrong approach because it allows direct
 *   access to the balance property.
*/
const account1 = {
    balance: 1000
};

account1.balance = 0; // Not safe!


/**
 * Approach-2: Closure use karna
 * - Closure use karna is a correct approach because it allows us to access
 *   the balance property only through the functions provided.
 */
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable
    
    return {
        getBalance: function() {
            return balance;
        },
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            return "Insufficient funds";
        }
    };
}

/**
 * Usage Example:
*/
const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance()); // 1000
myAccount.deposit(500); // 1500
myAccount.withdraw(200); // 1300

/**
 * - Ab balance ko direct access/modify nahi kar sakte
 * - This is the correct approach to maintain data privacy.
 */
console.log(myAccount.balance); // undefined


/**
 * Kya Seekha:
 * 1. Closure help karta hai private variables banane mein
 * 2. Data sirf functions ke through access ho sakta hai
 * 3. Bahar se koi direct data modify nahi kar sakta
 * 4. Code zyada secure aur organized ho jata hai
 */



/**
 * Disadvantages of Closures:
 * - Sometimes values in closures don't update as we expect them to.
 * - This especially happens when we declare variables outside functions.
 */

function show() {
    let count = 0;
    const message = `score: ${count}`; // Problem is here

    // Print function
    function print() {
        console.log(message);
    }

    // Increase function 
    function increase() {
        count++;
        // message won't update because it's const
    }

    return [print, increase];
}

/**
 * Let's use it:
 */
const [log, increase] = show();

log();        // Output: score: 0
increase();   // count increases
increase();   // count increases again
log();        // But still outputs: score: 0!

/**
 * How to Fix This Problem?
 * Solution 1: Using let
 */
function showFixed1() {
    let count = 0;
    let message = `score: ${count}`; // Using let instead of const
    
    function print() {
        console.log(message);
    }
    
    function increase() {
        count++;
        message = `score: ${count}`; // Now we can update message
    }
    
    return [print, increase];
}

/**
 * Solution 2: Keep Message Inside Print
 */
function showFixed2() {
    let count = 0;
    
    function print() {
        let message = `score: ${count}`; // Create message directly from count
        console.log(message);
    }
    
    function increase() {
        count++;
    }
    
    return [print, increase];
}

/**
 * Learning Points:
 * 1. Be careful when declaring variables in closures
 * 2. Use let instead of const if you need to update values
 * 3. Or keep variables inside functions where updates are needed
 */