/**
 * length Property - String ki Length Pata Karna
 * > length property string mein kitne characters hain yeh batati hai.
 * > Important:
 *   - length ek property hai, method nahi (parentheses nahi lagate)
 *   - Spaces bhi count hote hain
 *   - Special characters bhi count hote hain
*/

/**
 * Ex 1: Basic Length Operations
*/
const simpleString = "Hello";
const withSpaces = "Hello World";
const withSpecialChars = "Hello@123";
const emptyString = "";

console.log("String Length Examples:");

console.log(`"${simpleString}" length: ${simpleString.length}`); // 5
console.log(`"${withSpaces}" length: ${withSpaces.length}`);     // 11
console.log(`"${withSpecialChars}" length: ${withSpecialChars.length}`); // 9
console.log(`Empty string length: ${emptyString.length}`);       // 0


/**
 * Ex 2: Real World - Form Validation
*/
class FormValidator {
    static validateUsername(username) {
        console.log(`👤 Username Validation: "${username}"`);
        
        const minLength = 3;
        const maxLength = 20;
        const length = username.length;
        
        if (length < minLength) {
            console.log(`❌ Too short! Minimum ${minLength} characters required`);
            return false;
        }
        
        if (length > maxLength) {
            console.log(`❌ Too long! Maximum ${maxLength} characters allowed`);
            return false;
        }
        
        console.log(`✅ Valid username! Length: ${length}`);
        return true;
    }
    
    static validatePassword(password) {
        console.log(`🔐 Password Validation: "${'*'.repeat(password.length)}"`);
        
        const minLength = 8;
        const length = password.length;
        
        if (length < minLength) {
            console.log(`❌ Weak password! Minimum ${minLength} characters required`);
            return false;
        }
        
        // Strength analysis based on length
        let strength = "Weak";
        if (length >= 12) strength = "Strong";
        else if (length >= 8) strength = "Medium";
        
        console.log(`✅ ${strength} password! Length: ${length}`);
        return true;
    }
    
    static validateTweet(tweet) {
        console.log(`🐦 Tweet Validation: "${tweet}"`);
        
        const maxLength = 280;
        const length = tweet.length;
        const remaining = maxLength - length;
        
        if (length > maxLength) {
            console.log(`❌ Too long! ${length - maxLength} characters over limit`);
            return false;
        }
        
        console.log(`✅ Valid tweet! ${remaining} characters remaining`);
        return true;
    }
}

// Usage
console.log("--- Form Validation Tests ---");
FormValidator.validateUsername("raj"); // Valid
FormValidator.validateUsername("a"); // Too short
FormValidator.validateUsername("verylongusernameindeed"); // Too long

console.log("\n--- Password Tests ---");
FormValidator.validatePassword("12345"); // Weak
FormValidator.validatePassword("12345678"); // Medium
FormValidator.validatePassword("strongpassword123"); // Strong

console.log("\n--- Tweet Tests ---");
FormValidator.validateTweet("Hello Twitter!"); // Valid
FormValidator.validateTweet("A".repeat(300)); // Too long



/**
 * Ex 3: Text Analysis Tool
*/
class TextAnalyzer {
    static analyzeText(text) {
        if (!text || text.length === 0) {
            console.log("❌ No text to analyze");
            return;
        }
        
        const length = text.length;
        const wordCount = text.split(' ').filter(word => word.length > 0).length;
        const spaceCount = (text.match(/ /g) || []).length;
        const charCountWithoutSpaces = length - spaceCount;
        
        console.log("📊 Text Analysis Report:");
        console.log(`   📏 Total characters: ${length}`);
        console.log(`   📝 Word count: ${wordCount}`);
        console.log(`   ␣ Spaces: ${spaceCount}`);
        console.log(`   🔤 Characters (without spaces): ${charCountWithoutSpaces}`);
        
        // Length category
        let category = "Short";
        if (length > 500) category = "Very Long";
        else if (length > 200) category = "Long";
        else if (length > 100) category = "Medium";
        
        console.log(`   📋 Category: ${category} text`);
        
        return {
            length,
            wordCount,
            spaceCount,
            charCountWithoutSpaces,
            category
        };
    }
    
    static getReadingTime(text, wordsPerMinute = 200) {
        const wordCount = text.split(' ').filter(word => word.length > 0).length;
        const readingTimeMinutes = wordCount / wordsPerMinute;
        
        console.log(`⏰ Estimated reading time: ${readingTimeMinutes.toFixed(1)} minutes`);
        return readingTimeMinutes;
    }
}

// Usage
console.log("--- Text Analysis Tests ---");
const shortText = "Hello World";
const mediumText = "JavaScript is a programming language used for web development.";
const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10);

TextAnalyzer.analyzeText(shortText);
TextAnalyzer.getReadingTime(shortText);

console.log("\n--- Medium Text ---");
TextAnalyzer.analyzeText(mediumText);
TextAnalyzer.getReadingTime(mediumText);

console.log("\n--- Long Text ---");
TextAnalyzer.analyzeText(longText);
TextAnalyzer.getReadingTime(longText);