/**
 * str[index] - Bracket Notation se Access
 * > Square brackets [] use karke kisi bhi index par character access 
 *   kar sakte hain.
 * > Important:
 *   - Index 0 se start hota hai
 *   - Agar index out of bounds hai toh undefined return karta hai
 *   - Strings immutable hain, directly change nahi kar sakte
*/

/**
 * Ex 1: Basic Bracket Access
*/
const language = "JavaScript";

console.log("🔤 String:", language);
console.log("📏 Length:", language.length);

// ✅ Positive indexes
console.log(`language[0]: "${language[0]}"`); // "J"
console.log(`language[4]: "${language[4]}"`); // "S"
console.log(`language[9]: "${language[9]}"`); // "t"

// ❌ Out of bounds access
console.log(`language[20]: "${language[20]}"`); // undefined
console.log(`language[-1]: "${language[-1]}"`); // undefined

// ✅ Last character access
console.log(`Last character: "${language[language.length - 1]}"`); // "t"


/**
 * Ex 2: Real World - Initials Generator
*/
class InitialsGenerator {
    static getInitials(fullName) {
        console.log(`👤 Generating initials for: "${fullName}"`);
        
        if (!fullName || fullName.length === 0) {
            console.log("❌ Invalid name");
            return "";
        }
        
        const words = fullName.split(' ').filter(word => word.length > 0);
        
        if (words.length === 0) {
            console.log("❌ No valid words found");
            return "";
        }
        
        // ✅ Pehle word ka pehla character + last word ka pehla character
        const firstInitial = words[0][0].toUpperCase();
        const lastInitial = words[words.length - 1][0].toUpperCase();
        
        const initials = words.length > 1 ? `${firstInitial}${lastInitial}` : firstInitial;
        
        console.log(`✅ Initials: ${initials}`);
        return initials;
    }
    
    static getFirstLetters(sentence) {
        console.log(`📝 Getting first letters from: "${sentence}"`);
        
        const words = sentence.split(' ').filter(word => word.length > 0);
        const firstLetters = words.map(word => word[0].toUpperCase());
        
        console.log(`✅ First letters: ${firstLetters.join('')}`);
        return firstLetters.join('');
    }
    
    static analyzeName(name) {
        console.log(`🔍 Analyzing name: "${name}"`);
        
        const firstChar = name[0];
        const lastChar = name[name.length - 1];
        const middleIndex = Math.floor(name.length / 2);
        const middleChar = name[middleIndex];
        
        console.log(`   First character: "${firstChar}"`);
        console.log(`   Last character: "${lastChar}"`);
        console.log(`   Middle character (index ${middleIndex}): "${middleChar}"`);
        console.log(`   Name length: ${name.length}`);
        
        return { firstChar, lastChar, middleChar, length: name.length };
    }
}

// Usage
console.log("--- Initials Generator Tests ---");
InitialsGenerator.getInitials("Rahul Kumar Sharma");
InitialsGenerator.getInitials("Priya");
InitialsGenerator.getInitials("");

console.log("\n--- First Letters Tests ---");
InitialsGenerator.getFirstLetters("JavaScript Array Methods");
InitialsGenerator.getFirstLetters("Hello World");

console.log("\n--- Name Analysis Tests ---");
InitialsGenerator.analyzeName("JavaScript");
InitialsGenerator.analyzeName("Rahul");


/**
 * Ex 3: Password Strength Checker
*/
class PasswordChecker {
    static checkPasswordStrength(password) {
        if (!password || password.length === 0) {
            console.log("❌ No password provided");
            return "Very Weak";
        }
        
        console.log(`🔐 Checking password: "${'*'.repeat(password.length)}"`);
        
        let score = 0;
        const feedback = [];
        
        // ✅ Length check
        if (password.length >= 8) {
            score += 2;
            feedback.push("✅ Good length");
        } else if (password.length >= 6) {
            score += 1;
            feedback.push("⚠️ Medium length");
        } else {
            feedback.push("❌ Too short");
        }
        
        // ✅ Uppercase check
        if (password[0] && password[0] === password[0].toUpperCase() && password[0] !== password[0].toLowerCase()) {
            score += 1;
            feedback.push("✅ Starts with uppercase");
        } else {
            feedback.push("❌ No uppercase start");
        }
        
        // ✅ Special character check (last character)
        const lastChar = password[password.length - 1];
        const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        if (lastChar && specialChars.includes(lastChar)) {
            score += 1;
            feedback.push("✅ Ends with special character");
        } else {
            feedback.push("❌ No special character at end");
        }
        
        // ✅ Contains number check
        let hasNumber = false;
        for (let i = 0; i < password.length; i++) {
            if (!isNaN(password[i]) && password[i] !== ' ') {
                hasNumber = true;
                break;
            }
        }
        
        if (hasNumber) {
            score += 1;
            feedback.push("✅ Contains numbers");
        } else {
            feedback.push("❌ No numbers");
        }
        
        // Determine strength
        let strength = "Very Weak";
        if (score >= 4) strength = "Strong";
        else if (score >= 3) strength = "Medium";
        else if (score >= 2) strength = "Weak";
        
        console.log(`📊 Password Strength: ${strength} (Score: ${score}/5)`);
        feedback.forEach(item => console.log(`   ${item}`));
        
        return strength;
    }
    
    static maskPassword(password) {
        if (!password) return "";
        
        // ✅ First and last character show karo, baaki mask karo
        const firstChar = password[0];
        const lastChar = password[password.length - 1];
        const maskedMiddle = '*'.repeat(Math.max(0, password.length - 2));
        
        return firstChar + maskedMiddle + lastChar;
    }
}

// Usage
console.log("--- Password Strength Tests ---");
PasswordChecker.checkPasswordStrength("Password123!");
PasswordChecker.checkPasswordStrength("weak");
PasswordChecker.checkPasswordStrength("MediumPass1");
PasswordChecker.checkPasswordStrength("StrongPassword123!");

console.log("\n--- Password Masking ---");
console.log("Masked password:", PasswordChecker.maskPassword("SuperSecretPassword"));
console.log("Masked short:", PasswordChecker.maskPassword("Hi"));
console.log("Masked single:", PasswordChecker.maskPassword("A"));