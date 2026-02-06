/**
 * substring() - Simple Substring Extraction
 * > substring() bhi slice() ki tarah kaam karta hai, lekin negative 
 *   indexes support nahi karta.
*/

/**
 * Important differences from slice():
 * > Negative indexes automatically 0 treat hote hain
 * > start > end ho toh automatically swap ho jate hain
*/

/**
 * Ex 1: Basic substring Operations
*/
const text = "JavaScript";

console.log("🔤 Original string:", text);

// ✅ Basic usage
console.log(`substring(0, 4): "${text.substring(0, 4)}"`); // "Java"
console.log(`substring(4, 10): "${text.substring(4, 10)}"`); // "Script"

// ❌ Negative indexes (automatically 0 ban jate hain)
console.log(`substring(-3): "${text.substring(-3)}"`); // "JavaScript" (-3 becomes 0)
console.log(`substring(2, -3): "${text.substring(2, -3)}"`); // "Ja" (2,0 becomes 0,2)

// ✅ start > end (automatically swap)
console.log(`substring(6, 2): "${text.substring(6, 2)}"`); // "vaSc" (becomes 2,6)

// ✅ Single parameter
console.log(`substring(4): "${text.substring(4)}"`); // "Script"


/**
 * Ex 2: slice() vs substring() Comparison
*/
const demoText = "Programming";

console.log("🔍 slice() vs substring() Comparison:");

console.log("Text:", demoText);
console.log("");

// ✅ Same behavior for positive indexes
console.log("Positive indexes (same):");
console.log(`  slice(3, 7): "${demoText.slice(3, 7)}"`); // "gram"
console.log(`  substring(3, 7): "${demoText.substring(3, 7)}"`); // "gram"

console.log("");

// ❌ Different behavior for negative indexes
console.log("Negative indexes (different):");
console.log(`  slice(-4): "${demoText.slice(-4)}"`); // "ming" (last 4)
console.log(`  substring(-4): "${demoText.substring(-4)}"`); // "Programming" (-4 becomes 0)

console.log(`  slice(2, -2): "${demoText.slice(2, -2)}"`); // "ogramm" 
console.log(`  substring(2, -2): "${demoText.substring(2, -2)}"`); // "Pr" (2,0 becomes 0,2)

console.log("");

// ❌ Different behavior for swapped indexes
console.log("Swapped indexes (different):");
console.log(`  slice(7, 3): "${demoText.slice(7, 3)}"`); // "" (empty)
console.log(`  substring(7, 3): "${demoText.substring(7, 3)}"`); // "gram" (swaps to 3,7)


/**
 * Ex 3: Real World - Username Generation
*/
class UsernameGenerator {
    static generateFromEmail(email) {
        console.log(`📧 Generating from email: ${email}`);
        
        const atIndex = email.indexOf('@');
        if (atIndex === -1) {
            console.log("❌ Invalid email format");
            return email;
        }
        
        const username = email.substring(0, atIndex);
        console.log(`✅ Username: ${username}`);
        return username;
    }
    
    static generateFromFullName(fullName) {
        console.log(`👤 Generating from full name: "${fullName}"`);
        
        const spaceIndex = fullName.indexOf(' ');
        if (spaceIndex === -1) {
            // Single name - first 8 characters
            const username = fullName.substring(0, 8).toLowerCase();
            console.log(`✅ Single name username: ${username}`);
            return username;
        }
        
        // First initial + last name
        const firstInitial = fullName.substring(0, 1).toLowerCase();
        const lastName = fullName.substring(spaceIndex + 1).toLowerCase();
        const username = firstInitial + lastName;
        
        console.log(`✅ Full name username: ${username}`);
        return username;
    }
    
    static generateDisplayName(fullName) {
        console.log(`🎭 Generating display name: "${fullName}"`);
        
        const firstSpace = fullName.indexOf(' ');
        if (firstSpace === -1) {
            console.log(`✅ Display name: ${fullName}`);
            return fullName;
        }
        
        const firstName = fullName.substring(0, firstSpace);
        const lastInitial = fullName.substring(firstSpace + 1, firstSpace + 2).toUpperCase() + ".";
        
        const displayName = `${firstName} ${lastInitial}`;
        console.log(`✅ Display name: ${displayName}`);
        return displayName;
    }
    
    static extractDomain(email) {
        const atIndex = email.indexOf('@');
        if (atIndex === -1) return "";
        
        const domain = email.substring(atIndex + 1);
        console.log(`🌐 Domain: ${domain}`);
        return domain;
    }
}

// Usage
console.log("--- Username Generation Tests ---");
UsernameGenerator.generateFromEmail("rahul.kumar@company.com");
UsernameGenerator.generateFromEmail("priya@startup.co");

console.log("\n--- Full Name Processing ---");
UsernameGenerator.generateFromFullName("Rahul Kumar");
UsernameGenerator.generateFromFullName("Priya Sharma");
UsernameGenerator.generateFromFullName("Amit");

console.log("\n--- Display Name Generation ---");
UsernameGenerator.generateDisplayName("Rahul Kumar Sharma");
UsernameGenerator.generateDisplayName("Priya Singh");

console.log("\n--- Domain Extraction ---");
UsernameGenerator.extractDomain("user@example.com");


/**
 * Ex 4: Text Formatting System
*/
class TextFormatter {
    static capitalizeFirstLetter(text) {
        if (!text) return text;
        
        const firstChar = text.substring(0, 1).toUpperCase();
        const rest = text.substring(1).toLowerCase();
        
        const result = firstChar + rest;
        console.log(`✨ Capitalized: "${text}" → "${result}"`);
        return result;
    }
    
    static extractInitials(name) {
        const words = name.split(' ').filter(word => word.length > 0);
        
        if (words.length === 0) return "";
        
        let initials = "";
        const maxInitials = Math.min(words.length, 3); // Max 3 initials
        
        for (let i = 0; i < maxInitials; i++) {
            initials += words[i].substring(0, 1).toUpperCase();
        }
        
        console.log(`🔤 Initials for "${name}": ${initials}`);
        return initials;
    }
    
    static createAbbreviation(phrase) {
        const words = phrase.split(' ').filter(word => word.length > 0);
        
        if (words.length === 0) return "";
        
        let abbreviation = "";
        words.forEach(word => {
            if (word.length > 3) { // Only long words get abbreviated
                abbreviation += word.substring(0, 3).toUpperCase();
            } else {
                abbreviation += word.toUpperCase();
            }
        });
        
        console.log(`📝 Abbreviation for "${phrase}": ${abbreviation}`);
        return abbreviation;
    }
    
    static maskSensitiveInfo(text, visibleChars = 4) {
        if (text.length <= visibleChars * 2) {
            console.log(`🔒 Text too short to mask: "${text}"`);
            return text;
        }
        
        const firstPart = text.substring(0, visibleChars);
        const lastPart = text.substring(text.length - visibleChars);
        const maskedMiddle = '*'.repeat(text.length - visibleChars * 2);
        
        const masked = firstPart + maskedMiddle + lastPart;
        console.log(`🔒 Masked: "${text}" → "${masked}"`);
        return masked;
    }
}

// Usage
console.log("--- Text Formatting Tests ---");
TextFormatter.capitalizeFirstLetter("hello world");
TextFormatter.capitalizeFirstLetter("jAVASCRIPT");

console.log("\n--- Initials Extraction ---");
TextFormatter.extractInitials("Rahul Kumar Sharma");
TextFormatter.extractInitials("Priya");
TextFormatter.extractInitials("Dr. John Michael Doe");

console.log("\n--- Abbreviation Creation ---");
TextFormatter.createAbbreviation("Artificial Intelligence");
TextFormatter.createAbbreviation("Content Management System");

console.log("\n--- Sensitive Info Masking ---");
TextFormatter.maskSensitiveInfo("4111111111111111"); // Credit card
TextFormatter.maskSensitiveInfo("rahul@email.com");