/**
 * trim(), trimStart(), trimEnd() - Space Removal
 * > trim()      - Dono ends se spaces remove karta hai
 * > trimStart() - Sirf start se spaces remove karta hai
 * > trimEnd()   - Sirf end se spaces remove karta hai
*/

/**
 * Ex 1: Basic Trim Operations
*/
const spacedText = "   Hello World   ";

console.log("📏 Original with spaces:", `"${spacedText}"`);

// ✅ trim() - both ends
console.log(`trim(): "${spacedText.trim()}"`); // "Hello World"

// ✅ trimStart() - only start
console.log(`trimStart(): "${spacedText.trimStart()}"`); // "Hello World   "

// ✅ trimEnd() - only end  
console.log(`trimEnd(): "${spacedText.trimEnd()}"`); // "   Hello World"

// ✅ Chaining operations
console.log(`Chained: "${spacedText.trim().toUpperCase()}"`); // "HELLO WORLD"


/**
 * Ex 2: Real World - Form Data Cleaning
*/
class FormDataCleaner {
    static cleanUserInput(input) {
        console.log(`🧹 Cleaning input: "${input}"`);
        
        const cleaned = input.trim();
        console.log(`✅ Cleaned: "${cleaned}"`);
        return cleaned;
    }
    
    static cleanEmail(email) {
        console.log(`📧 Cleaning email: "${email}"`);
        
        const cleaned = email.trim().toLowerCase();
        console.log(`✅ Cleaned email: ${cleaned}`);
        return cleaned;
    }
    
    static cleanMultiLineText(text) {
        console.log("📝 Cleaning multi-line text...");
        
        // Trim each line and remove empty lines
        const lines = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        const cleaned = lines.join('\n');
        console.log(`✅ Cleaned text (${lines.length} lines):\n${cleaned}`);
        return cleaned;
    }
    
    static normalizeSpacing(text) {
        console.log(`🔧 Normalizing spacing: "${text}"`);
        
        // Replace multiple spaces with single space
        const normalized = text
            .trim()
            .replace(/\s+/g, ' ');
        
        console.log(`✅ Normalized: "${normalized}"`);
        return normalized;
    }
    
    static validateRequiredField(fieldName, value) {
        console.log(`✅ Validating ${fieldName}: "${value}"`);
        
        const trimmed = value.trim();
        const isEmpty = trimmed.length === 0;
        
        if (isEmpty) {
            console.log(`❌ ${fieldName} is required`);
            return false;
        }
        
        console.log(`✅ ${fieldName} is valid`);
        return true;
    }
}

// Usage
console.log("--- Form Data Cleaning Tests ---");
FormDataCleaner.cleanUserInput("   Rahul Kumar   ");
FormDataCleaner.cleanUserInput("  ");

console.log("\n--- Email Cleaning ---");
FormDataCleaner.cleanEmail("  User@EXAMPLE.com  ");

console.log("\n--- Multi-line Text Cleaning ---");
const messyText = `
   Hello World   
   
   This is a test   
   with extra spaces
   
`;
FormDataCleaner.cleanMultiLineText(messyText);

console.log("\n--- Spacing Normalization ---");
FormDataCleaner.normalizeSpacing("Hello    World   with   multiple   spaces");

console.log("\n--- Required Field Validation ---");
FormDataCleaner.validateRequiredField("Username", "  rahul  ");
FormDataCleaner.validateRequiredField("Email", "   ");


/**
 * Ex 3: CSV Data Processor
*/

class CSVProcessor {
    static cleanCSVRow(row) {
        console.log(`📊 Cleaning CSV row: "${row}"`);
        
        // Trim each field in CSV
        const fields = row.split(',')
            .map(field => field.trim());
        
        const cleaned = fields.join(',');
        console.log(`✅ Cleaned row: "${cleaned}"`);
        return cleaned;
    }
    
    static parseCSVData(csvData) {
        console.log("📈 Parsing CSV data...");
        
        const rows = csvData.split('\n')
            .map(row => row.trim())
            .filter(row => row.length > 0) // Remove empty lines
            .map(row => this.cleanCSVRow(row));
        
        console.log(`✅ Parsed ${rows.length} rows:`);
        rows.forEach((row, index) => {
            console.log(`   ${index + 1}. ${row}`);
        });
        
        return rows;
    }
    
    static removeExtraWhitespace(text) {
        console.log(`🎯 Removing extra whitespace: "${text}"`);
        
        const cleaned = text
            .trim() // Remove surrounding spaces
            .replace(/\s+/g, ' ') // Multiple spaces to single space
            .replace(/\s+([.,!?])/g, '$1'); // Remove space before punctuation
        
        console.log(`✅ Cleaned: "${cleaned}"`);
        return cleaned;
    }
}

// Usage
console.log("--- CSV Processing Tests ---");
CSVProcessor.cleanCSVRow("  John, 25,  Engineer  ");
CSVProcessor.cleanCSVRow("Alice, 30 , Doctor ");

console.log("\n--- CSV Data Parsing ---");
const csvData = `
   Name, Age, Profession   
   Rahul, 25, Developer
   Priya, 30, Designer   
   
   Amit, 28, Manager
`;
CSVProcessor.parseCSVData(csvData);

console.log("\n--- Whitespace Removal ---");
CSVProcessor.removeExtraWhitespace("  Hello   World  !   How  are  you ?  ");