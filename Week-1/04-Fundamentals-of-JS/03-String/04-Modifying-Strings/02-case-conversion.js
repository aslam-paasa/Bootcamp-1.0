/**
 * toUpperCase() & toLowerCase() - Case Conversion
 * > toUpperCase() - Saare letters uppercase mein convert karta hai
 * > toLowerCase() - Saare letters lowercase mein convert karta hai
*/

/**
 * Ex 1: Basic Case Operations
*/
const mixedCase = "JavaScript Programming";

console.log("🔤 Original:", mixedCase);

// ✅ toUpperCase()
console.log(`toUpperCase(): "${mixedCase.toUpperCase()}"`); // "JAVASCRIPT PROGRAMMING"

// ✅ toLowerCase()  
console.log(`toLowerCase(): "${mixedCase.toLowerCase()}"`); // "javascript programming"

// ✅ Original unchanged
console.log("Original after operations:", mixedCase); // "JavaScript Programming"


/**
 * Ex 2: Real World - Case-Insensitive Comparison
*/
class CaseInsensitiveValidator {
    static validateUsername(inputUsername, storedUsername) {
        console.log(`👤 Validating: "${inputUsername}" vs "${storedUsername}"`);
        
        const isMatch = inputUsername.toLowerCase() === storedUsername.toLowerCase();
        
        console.log(isMatch ? "✅ Username matches!" : "❌ Username doesn't match");
        return isMatch;
    }
    
    static normalizeEmail(email) {
        console.log(`📧 Normalizing email: ${email}`);
        
        const normalized = email.toLowerCase().trim();
        console.log(`✅ Normalized: ${normalized}`);
        return normalized;
    }
    
    static createCaseInsensitiveSearch(text, searchTerm) {
        console.log(`🔍 Case-insensitive search for "${searchTerm}" in "${text}"`);
        
        const lowerText = text.toLowerCase();
        const lowerSearch = searchTerm.toLowerCase();
        
        const position = lowerText.indexOf(lowerSearch);
        const found = position !== -1;
        
        if (found) {
            console.log(`✅ Found at position: ${position}`);
        } else {
            console.log("❌ Not found");
        }
        
        return found;
    }
    
    static generateDisplayName(name, style = "title") {
        console.log(`🎭 Generating ${style} case for: "${name}"`);
        
        let displayName;
        
        switch(style) {
            case "upper":
                displayName = name.toUpperCase();
                break;
            case "lower":
                displayName = name.toLowerCase();
                break;
            case "title":
                displayName = name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
                break;
            default:
                displayName = name;
        }
        
        console.log(`✅ ${style} case: ${displayName}`);
        return displayName;
    }
}

// Usage
console.log("--- Case Validation Tests ---");
CaseInsensitiveValidator.validateUsername("RAHUL", "rahul");
CaseInsensitiveValidator.validateUsername("Admin", "admin");

console.log("\n--- Email Normalization ---");
CaseInsensitiveValidator.normalizeEmail("  User@Example.COM  ");
CaseInsensitiveValidator.normalizeEmail("TEST@DOMAIN.COM");

console.log("\n--- Case-Insensitive Search ---");
CaseInsensitiveValidator.createCaseInsensitiveSearch("JavaScript Programming", "javascript");
CaseInsensitiveValidator.createCaseInsensitiveSearch("Hello World", "WORLD");

console.log("\n--- Display Name Generation ---");
CaseInsensitiveValidator.generateDisplayName("rahul kumar", "upper");
CaseInsensitiveValidator.generateDisplayName("JOHN DOE", "title");
CaseInsensitiveValidator.generateDisplayName("Priya Sharma", "lower");


/**
 * Ex 3: Text Formatting System
*/
class TextFormatter {
    static formatHeaders(text, level = 1) {
        console.log(`📋 Formatting header level ${level}: "${text}"`);
        
        const formatted = text.toUpperCase().trim();
        const prefix = '#'.repeat(level) + ' ';
        
        console.log(`✅ Formatted: ${prefix}${formatted}`);
        return prefix + formatted;
    }
    
    static createConstantName(text) {
        console.log(`🔧 Creating constant name from: "${text}"`);
        
        // Convert to UPPER_SNAKE_CASE
        let constant = text
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '_') // Non-alphanumeric to underscore
            .replace(/_+/g, '_')        // Multiple underscores to single
            .replace(/^_|_$/g, '');     // Remove leading/trailing underscores
        
        console.log(`✅ Constant: ${constant}`);
        return constant;
    }
    
    static formatProductCode(productName, category) {
        console.log(`🏷️ Formatting product code: ${productName} (${category})`);
        
        const categoryCode = category.toUpperCase().substring(0, 3);
        const productCode = productName
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .substring(0, 5);
        
        const code = `${categoryCode}_${productCode}`;
        console.log(`✅ Product code: ${code}`);
        return code;
    }
    
    static compareCaseInsensitive(strings) {
        console.log("🔍 Case-insensitive string comparison:");
        
        const uniqueStrings = [];
        const seen = new Set();
        
        strings.forEach(str => {
            const lower = str.toLowerCase();
            if (!seen.has(lower)) {
                seen.add(lower);
                uniqueStrings.push(str);
            }
        });
        
        console.log(`✅ Unique strings (case-insensitive): ${uniqueStrings.join(', ')}`);
        return uniqueStrings;
    }
}

// Usage
console.log("--- Text Formatting Tests ---");
TextFormatter.formatHeaders("important notice", 2);
TextFormatter.formatHeaders("chapter one", 1);

console.log("\n--- Constant Name Creation ---");
TextFormatter.createConstantName("max retry count");
TextFormatter.createConstantName("API Key Value");
TextFormatter.createConstantName("user-name");

console.log("\n--- Product Code Generation ---");
TextFormatter.formatProductCode("Wireless Mouse", "Electronics");
TextFormatter.formatProductCode("Office Chair", "Furniture");

console.log("\n--- Case-Insensitive Comparison ---");
TextFormatter.compareCaseInsensitive(["Hello", "HELLO", "hello", "World", "WORLD"]);