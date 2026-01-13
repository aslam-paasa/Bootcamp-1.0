/**
 * reverse() Method:
 * - Array ke elements ko ulta kar deta hai
 * - Original array ko modify karta hai (in-place)
 * - Return value bhi modified array hoti hai
 */

/**
 * Example 1: Basic Usage
 */
const numbers = [2, 5, 1, 6];
console.log("Original:", numbers); // [2, 5, 1, 6]

numbers.reverse();
console.log("Reversed:", numbers); // [6, 1, 5, 2]

/**
 * Example 2: Real World Problem - Palindrome Checker
 * - Check if a word is palindrome (same from both sides)
 * - Example: "madam" is palindrome, "hello" is not
 * 
 * - Steps:
 *   a. Convert word to array of characters
 *   b. Create a copy and reverse it
 *   c. Compare original and reversed
 */
function isPalindrome(word) {
    const chars = word.split('');
    const reversedChars = [...chars].reverse();
    return chars.join('') === reversedChars.join('');
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


/**
 * Example 3: Real World Problem - Message Encryption
 * - Simple encryption by reversing message
 * - In real world, more complex encryption is used
 */
function encryptMessage(message) {
    return message.split('').reverse().join('');
}

function decryptMessage(encryptedMessage) {
    return encryptedMessage.split('').reverse().join('');
}

const secretMessage = "Hello World!";
const encrypted = encryptMessage(secretMessage);
console.log("Encrypted:", encrypted); // "!dlroW olleH"

const decrypted = decryptMessage(encrypted);
console.log("Decrypted:", decrypted); // "Hello World!"