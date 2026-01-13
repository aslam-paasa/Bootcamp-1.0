/**
 * charAt(index) - Method se Access 
 * > charAt() method bhi bracket notation ki tarah kaam karta hai, 
 *   lekin yeh ek method hai.
*/

/**
 * str[index] vs charAt(index) Comparison:
*/
const text = "Hello";

console.log("🔍 Bracket Notation vs charAt() Comparison:");

// ✅ Same result for valid indexes
console.log(`text[1]: "${text[1]}"`); // "e"
console.log(`text.charAt(1): "${text.charAt(1)}"`); // "e"

// ❌ Different behavior for invalid indexes
console.log(`text[10]: "${text[10]}"`); // undefined
console.log(`text.charAt(10): "${text.charAt(10)}"`); // "" (empty string)

console.log(`text[-1]: "${text[-1]}"`); // undefined  
console.log(`text.charAt(-1): "${text.charAt(-1)}"`); // "" (empty string)


/**
 * Ex 1: Basic charAt Operations
*/
const programming = "JavaScript";

console.log("💻 String:", programming);

// ✅ Valid indexes
console.log(`charAt(0): "${programming.charAt(0)}"`); // "J"
console.log(`charAt(4): "${programming.charAt(4)}"`); // "S"

// ✅ Out of bounds - returns empty string
console.log(`charAt(20): "${programming.charAt(20)}"`); // ""
console.log(`charAt(-5): "${programming.charAt(-5)}"`); // ""

// ✅ Last character
console.log(`Last char: "${programming.charAt(programming.length - 1)}"`); // "t"


/**
 * Ex 2: Real World - Word Processor
*/
class WordProcessor {
    static capitalizeFirstLetter(sentence) {
        if (!sentence || sentence.length === 0) return sentence;
        
        const firstChar = sentence.charAt(0).toUpperCase();
        const restOfSentence = sentence.slice(1);
        
        return firstChar + restOfSentence;
    }
    
    static getEveryNthChar(text, n) {
        console.log(`📖 Getting every ${n}th character from: "${text}"`);
        
        let result = "";
        for (let i = 0; i < text.length; i += n) {
            result += text.charAt(i);
        }
        
        console.log(`✅ Result: "${result}"`);
        return result;
    }
    
    static countCharacter(text, charToCount) {
        if (!text || text.length === 0) return 0;
        
        let count = 0;
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) === charToCount) {
                count++;
            }
        }
        
        console.log(`🔍 Character '${charToCount}' appears ${count} times in "${text}"`);
        return count;
    }
    
    static reverseString(text) {
        let reversed = "";
        for (let i = text.length - 1; i >= 0; i--) {
            reversed += text.charAt(i);
        }
        
        console.log(`🔁 Original: "${text}", Reversed: "${reversed}"`);
        return reversed;
    }
}

// Usage
console.log("--- Word Processor Tests ---");

console.log("Capitalize First Letter:");
console.log(WordProcessor.capitalizeFirstLetter("hello world"));
console.log(WordProcessor.capitalizeFirstLetter("javascript"));

console.log("\nEvery Nth Character:");
WordProcessor.getEveryNthChar("JavaScript", 2); // JvSrp
WordProcessor.getEveryNthChar("Hello World", 3); // HlWl

console.log("\nCharacter Counting:");
WordProcessor.countCharacter("programming", "m");
WordProcessor.countCharacter("banana", "a");
WordProcessor.countCharacter("hello", "x");

console.log("\nString Reversal:");
WordProcessor.reverseString("Hello");
WordProcessor.reverseString("JavaScript");


/**
 * Ex 3: Text Encryption Tool
*/
class SimpleEncryptor {
    static caesarCipher(text, shift) {
        console.log(`🔐 Encrypting: "${text}" with shift ${shift}`);
        
        let encrypted = "";
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            
            if (char >= 'A' && char <= 'Z') {
                // Uppercase letters
                const shifted = String.fromCharCode(
                    ((char.charCodeAt(0) - 65 + shift) % 26 + 26) % 26 + 65
                );
                encrypted += shifted;
            } else if (char >= 'a' && char <= 'z') {
                // Lowercase letters
                const shifted = String.fromCharCode(
                    ((char.charCodeAt(0) - 97 + shift) % 26 + 26) % 26 + 97
                );
                encrypted += shifted;
            } else {
                // Non-alphabet characters
                encrypted += char;
            }
        }
        
        console.log(`✅ Encrypted: "${encrypted}"`);
        return encrypted;
    }
    
    static alternateCase(text) {
        console.log(`🔄 Alternating case: "${text}"`);
        
        let result = "";
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            result += i % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }
        
        console.log(`✅ Result: "${result}"`);
        return result;
    }
    
    static createPattern(text) {
        console.log(`🎨 Creating pattern from: "${text}"`);
        
        let pattern = "";
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            pattern += char + "-".repeat(i + 1);
        }
        
        console.log(`✅ Pattern: "${pattern}"`);
        return pattern;
    }
}

// Usage
console.log("--- Encryption Tests ---");

console.log("Caesar Cipher:");
SimpleEncryptor.caesarCipher("HELLO", 3); // KHOOR
SimpleEncryptor.caesarCipher("abc", 1); // bcd
SimpleEncryptor.caesarCipher("XYZ", 3); // ABC

console.log("\nAlternate Case:");
SimpleEncryptor.alternateCase("javascript");
SimpleEncryptor.alternateCase("hello world");

console.log("\nPattern Creation:");
SimpleEncryptor.createPattern("ABC");
SimpleEncryptor.createPattern("CODE");