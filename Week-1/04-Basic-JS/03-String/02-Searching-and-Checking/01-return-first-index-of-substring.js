/**
 * indexOf() - Substring ki First Position Dhundhna 
 * > indexOf() substring ki first occurrence ka index return karta hai. 
 * > Agar nahi milta toh -1 return karta hai.
 * > Syntax: string.indexOf(searchValue, fromIndex)
*/

/**
 * Ex 1: Basic indexOf Operations
*/

const sentence = "JavaScript is fun and JavaScript is powerful";

console.log("📝 Sentence:", sentence);

// ✅ Basic search
console.log(`indexOf("JavaScript"): ${sentence.indexOf("JavaScript")}`); // 0
console.log(`indexOf("is"): ${sentence.indexOf("is")}`); // 11
console.log(`indexOf("Python"): ${sentence.indexOf("Python")}`); // -1 (not found)

// ✅ With fromIndex
console.log(`indexOf("JavaScript", 5): ${sentence.indexOf("JavaScript", 5)}`); // 20
console.log(`indexOf("is", 15): ${sentence.indexOf("is", 15)}`); // 24

// ✅ Single character search
console.log(`indexOf("J"): ${sentence.indexOf("J")}`); // 0
console.log(`indexOf("z"): ${sentence.indexOf("z")}`); // -1


/**
 * Ex 2: Real World - Email Validation
*/
class EmailValidator {
    static validateEmail(email) {
        console.log(`📧 Validating email: ${email}`);
        
        // ✅ @ symbol check
        const atIndex = email.indexOf('@');
        if (atIndex === -1) {
            console.log("❌ Invalid email: Missing @ symbol");
            return false;
        }
        
        // ✅ Dot check after @
        const dotIndex = email.indexOf('.', atIndex);
        if (dotIndex === -1) {
            console.log("❌ Invalid email: Missing domain");
            return false;
        }
        
        // ✅ Username should not be empty
        if (atIndex === 0) {
            console.log("❌ Invalid email: Missing username");
            return false;
        }
        
        // ✅ Domain should have proper length
        const domain = email.slice(dotIndex + 1);
        if (domain.length < 2) {
            console.log("❌ Invalid email: Domain too short");
            return false;
        }
        
        console.log("✅ Valid email format!");
        return true;
    }
    
    static extractUsername(email) {
        const atIndex = email.indexOf('@');
        if (atIndex === -1) return email;
        
        const username = email.slice(0, atIndex);
        console.log(`👤 Username: ${username}`);
        return username;
    }
    
    static extractDomain(email) {
        const atIndex = email.indexOf('@');
        if (atIndex === -1) return "";
        
        const domain = email.slice(atIndex + 1);
        console.log(`🌐 Domain: ${domain}`);
        return domain;
    }
}

// Usage
console.log("--- Email Validation Tests ---");
EmailValidator.validateEmail("user@example.com");
EmailValidator.validateEmail("invalid-email");
EmailValidator.validateEmail("@example.com");
EmailValidator.validateEmail("user@.com");

console.log("\n--- Email Parsing ---");
EmailValidator.extractUsername("rahul.kumar@company.com");
EmailValidator.extractDomain("priya@startup.co.in");


/**
 * Ex 3: Document Search Tool
*/

class DocumentSearcher {
    constructor(content) {
        this.content = content;
    }
    
    searchAllOccurrences(searchTerm) {
        console.log(`🔍 Searching for "${searchTerm}" in document`);
        
        const occurrences = [];
        let position = -1;
        let fromIndex = 0;
        
        while ((position = this.content.indexOf(searchTerm, fromIndex)) !== -1) {
            occurrences.push(position);
            fromIndex = position + searchTerm.length;
        }
        
        console.log(`✅ Found ${occurrences.length} occurrences at positions: ${occurrences.join(', ')}`);
        return occurrences;
    }
    
    getContext(searchTerm, contextLength = 20) {
        const positions = this.searchAllOccurrences(searchTerm);
        
        console.log(`📖 Context for "${searchTerm}":`);
        positions.forEach((position, index) => {
            const start = Math.max(0, position - contextLength);
            const end = Math.min(this.content.length, position + searchTerm.length + contextLength);
            const context = this.content.slice(start, end);
            
            console.log(`   ${index + 1}. ...${context}...`);
        });
        
        return positions;
    }
    
    findFirstSentenceWith(searchTerm) {
        const position = this.content.indexOf(searchTerm);
        if (position === -1) {
            console.log(`❌ "${searchTerm}" not found`);
            return "";
        }
        
        // Find sentence start
        let sentenceStart = this.content.lastIndexOf('.', position);
        if (sentenceStart === -1) sentenceStart = 0;
        else sentenceStart += 1; // Move past the dot
        
        // Find sentence end
        let sentenceEnd = this.content.indexOf('.', position);
        if (sentenceEnd === -1) sentenceEnd = this.content.length;
        else sentenceEnd += 1; // Include the dot
        
        const sentence = this.content.slice(sentenceStart, sentenceEnd).trim();
        console.log(`📝 First sentence with "${searchTerm}": ${sentence}`);
        return sentence;
    }
}

// Usage
console.log("--- Document Search Tests ---");
const document = `JavaScript is a programming language. JavaScript is used for web development. 
Many developers love JavaScript because it is versatile. JavaScript runs in browsers.`;

const searcher = new DocumentSearcher(document);
searcher.searchAllOccurrences("JavaScript");
searcher.getContext("development");
searcher.findFirstSentenceWith("developers");