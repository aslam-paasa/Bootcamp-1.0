/**
 * Step 7: reverse() - Array ko reverse karna
 * > reverse() array ke elements ki order ko ulta kar deta hai.
*/



/**
 * Example 1: Basic Reverse
*/

const numbers = [1, 2, 3, 4, 5];

console.log("Original:", numbers);

/* Array ko reverse karo */
numbers.reverse();
console.log("Reversed:", numbers); // [5, 4, 3, 2, 1]



/**
 * Example 2: Real World - Message Display
*/

const messages = [
    "Hello!",
    "How are you?",
    "I'm learning JavaScript",
    "Arrays are powerful!"
];

console.log("Original messages:", messages);

/* Messages ko reverse karo (newest first) */
messages.reverse();
console.log("Reversed (newest first):", messages);

/* Specific use case - Palindrome check */
function isPalindrome(word) {
    const chars = word.split('');
    const reversed = [...chars].reverse(); /* Copy bana ke reverse karo */
    return chars.join('') === reversed.join('');
}

console.log("Is 'madam' palindrome?", isPalindrome("madam")); // true
console.log("Is 'hello' palindrome?", isPalindrome("hello")); // false