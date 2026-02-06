/**
 * split() - String Ko Array Mein Convert Karna 
 * > split() string ko specified separator ke basis par array mein 
 *   convert karta hai.
 * > Syntax: string.split(separator, limit)
*/

/**
 * Ex 1: Basic Split Operations
*/
const text = "JavaScript,Python,Java,C++";

console.log("🔤 Original:", text);

// ✅ Comma separator
console.log('split(","):', text.split(",")); 
// ["JavaScript", "Python", "Java", "C++"]

// ✅ Space separator
const sentence = "Hello World Programming";
console.log('split(" "):', sentence.split(" ")); 
// ["Hello", "World", "Programming"]

// ✅ Limit parameter
console.log('split(",", 2):', text.split(",", 2)); 
// ["JavaScript", "Python"] (only first 2)

// ✅ Empty string separator
console.log('split(""):', "Hello".split("")); 
// ["H", "e", "l", "l", "o"]

// ✅ No separator (whole string as single element)
console.log('split():', text.split()); 
// ["JavaScript,Python,Java,C++"]


/**
 * Ex 2: Real World - CSV Data Processing
*/
class CSVProcessor {
    static parseCSV(csvData) {
        console.log("📊 Parsing CSV data...");
        
        const rows = csvData.split('\n')
            .map(row => row.trim())
            .filter(row => row.length > 0); // Remove empty lines
        
        const data = rows.map(row => {
            const fields = row.split(',').map(field => field.trim());
            return fields;
        });
        
        console.log(`✅ Parsed ${data.length} rows:`);
        data.forEach((row, index) => {
            console.log(`   ${index + 1}. ${row.join(' | ')}`);
        });
        
        return data;
    }
    
    static extractEmails(text) {
        console.log(`📧 Extracting emails from: "${text}"`);
        
        // Simple email extraction using split and filter
        const words = text.split(/\s+/);
        const emails = words.filter(word => 
            word.includes('@') && word.includes('.')
        );
        
        console.log(`✅ Found emails: ${emails.join(', ')}`);
        return emails;
    }
    
    static parseURL(url) {
        console.log(`🌐 Parsing URL: ${url}`);
        
        const parts = {};
        
        // Extract protocol
        const protocolEnd = url.indexOf('://');
        if (protocolEnd !== -1) {
            parts.protocol = url.substring(0, protocolEnd);
            url = url.substring(protocolEnd + 3);
        }
        
        // Extract domain and path
        const pathStart = url.indexOf('/');
        if (pathStart !== -1) {
            parts.domain = url.substring(0, pathStart);
            parts.path = url.substring(pathStart);
            
            // Extract query parameters
            const queryStart = parts.path.indexOf('?');
            if (queryStart !== -1) {
                parts.query = parts.path.substring(queryStart + 1);
                parts.path = parts.path.substring(0, queryStart);
                
                // Parse query parameters
                parts.params = {};
                parts.query.split('&').forEach(pair => {
                    const [key, value] = pair.split('=');
                    parts.params[key] = value;
                });
            }
        } else {
            parts.domain = url;
        }
        
        console.log("✅ URL parts:", parts);
        return parts;
    }
}

// Usage
console.log("--- CSV Processing ---");
const csvData = `
Name, Age, City
Rahul, 25, Delhi
Priya, 30, Mumbai
Amit, 28, Bangalore
`;
CSVProcessor.parseCSV(csvData);

console.log("\n--- Email Extraction ---");
CSVProcessor.extractEmails("Contact us at support@company.com or sales@example.org for help");

console.log("\n--- URL Parsing ---");
CSVProcessor.parseURL("https://www.example.com/path/to/page?name=John&age=30");


/**
 * Ex 3: Text Analysis Tool
*/
class TextAnalyzer {
    static analyzeText(text) {
        console.log("🔍 Analyzing text...");
        
        const analysis = {
            characters: text.length,
            charactersWithoutSpaces: text.replace(/\s/g, '').length,
            words: 0,
            sentences: 0,
            paragraphs: 0,
            wordFrequency: {}
        };
        
        // Word count
        const words = text.split(/\s+/).filter(word => word.length > 0);
        analysis.words = words.length;
        
        // Sentence count (simple approach)
        analysis.sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        
        // Paragraph count
        analysis.paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
        
        // Word frequency
        words.forEach(word => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
            if (cleanWord) {
                analysis.wordFrequency[cleanWord] = (analysis.wordFrequency[cleanWord] || 0) + 1;
            }
        });
        
        console.log("📊 Text Analysis Results:");
        console.log(`   Characters: ${analysis.characters}`);
        console.log(`   Characters (no spaces): ${analysis.charactersWithoutSpaces}`);
        console.log(`   Words: ${analysis.words}`);
        console.log(`   Sentences: ${analysis.sentences}`);
        console.log(`   Paragraphs: ${analysis.paragraphs}`);
        
        // Top 5 most frequent words
        const topWords = Object.entries(analysis.wordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        console.log("   Top 5 words:");
        topWords.forEach(([word, count], index) => {
            console.log(`     ${index + 1}. "${word}": ${count} times`);
        });
        
        return analysis;
    }
    
    static splitIntoSentences(text) {
        console.log("📝 Splitting into sentences...");
        
        // More sophisticated sentence splitting
        const sentences = text.split(/(?<=[.!?])\s+/)
            .map(s => s.trim())
            .filter(s => s.length > 0);
        
        console.log(`✅ Found ${sentences.length} sentences:`);
        sentences.forEach((sentence, index) => {
            console.log(`   ${index + 1}. ${sentence}`);
        });
        
        return sentences;
    }
    
    static extractHashtags(text) {
        console.log(`🏷️ Extracting hashtags from: "${text}"`);
        
        const words = text.split(/\s+/);
        const hashtags = words.filter(word => 
            word.startsWith('#') && word.length > 1
        ).map(tag => tag.replace(/[^\w#]/g, '')); // Remove punctuation
        
        console.log(`✅ Hashtags: ${hashtags.join(', ')}`);
        return hashtags;
    }
}

// Usage
console.log("--- Text Analysis ---");
const sampleText = `Hello world! This is a sample text. 
It has multiple sentences and paragraphs.

We can analyze this text for various metrics.`;
TextAnalyzer.analyzeText(sampleText);

console.log("\n--- Sentence Splitting ---");
TextAnalyzer.splitIntoSentences("Hello! How are you? I'm fine. Thanks for asking.");

console.log("\n--- Hashtag Extraction ---");
TextAnalyzer.extractHashtags("Learning #JavaScript #programming is fun! #coding #webdev");