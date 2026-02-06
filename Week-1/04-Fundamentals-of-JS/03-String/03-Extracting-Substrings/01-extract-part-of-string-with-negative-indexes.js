/**
 * slice() - Flexible Substring Extraction
 * > slice() start aur end index ke beech ka part return karta hai. 
 * > Negative indexes bhi support karta hai.
 * > Syntax: string.slice(startIndex, endIndex) // endIndex exclusive
*/

/**
 * Ex 1: Basic Slice Operations
*/
const language = "JavaScript";

console.log("🔤 Original string:", language);

// ✅ Positive indexes
console.log(`slice(0, 4): "${language.slice(0, 4)}"`); // "Java"
console.log(`slice(4, 10): "${language.slice(4, 10)}"`); // "Script"

// ✅ Negative indexes (end se count karo)
console.log(`slice(-6): "${language.slice(-6)}"`); // "Script" (last 6 characters)
console.log(`slice(-6, -1): "${language.slice(-6, -1)}"`); // "Scrip" 
console.log(`slice(0, -1): "${language.slice(0, -1)}"`); // "JavaScrip" (all except last)

// ✅ Single parameter
console.log(`slice(4): "${language.slice(4)}"`); // "Script" (4 se end tak)
console.log(`slice(-3): "${language.slice(-3)}"`); // "ipt" (last 3 characters)

// ✅ Original string unchanged
console.log("Original after slice:", language); // "JavaScript"



/**
 * Ex 2: Real World - File Name Processing
*/
class FileProcessor {
    static getFileNameWithoutExtension(filename) {
        console.log(`📁 Processing: ${filename}`);
        
        const lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex === -1) {
            console.log(`✅ No extension: ${filename}`);
            return filename;
        }
        
        const nameWithoutExt = filename.slice(0, lastDotIndex);
        console.log(`✅ Name without extension: ${nameWithoutExt}`);
        return nameWithoutExt;
    }
    
    static getFileExtension(filename) {
        const lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex === -1) {
            console.log("❌ No file extension");
            return "";
        }
        
        const extension = filename.slice(lastDotIndex + 1);
        console.log(`✅ File extension: .${extension}`);
        return extension;
    }
    
    static getParentFolder(path) {
        const lastSlashIndex = path.lastIndexOf('/');
        if (lastSlashIndex === -1) {
            console.log("❌ No parent folder");
            return "";
        }
        
        const parentFolder = path.slice(0, lastSlashIndex);
        console.log(`✅ Parent folder: ${parentFolder}`);
        return parentFolder;
    }
    
    static extractMiddlePart(text, startPattern, endPattern) {
        const startIndex = text.indexOf(startPattern);
        if (startIndex === -1) {
            console.log(`❌ Start pattern "${startPattern}" not found`);
            return "";
        }
        
        const endIndex = text.indexOf(endPattern, startIndex + startPattern.length);
        if (endIndex === -1) {
            console.log(`❌ End pattern "${endPattern}" not found`);
            return "";
        }
        
        const middlePart = text.slice(startIndex + startPattern.length, endIndex);
        console.log(`✅ Middle part: "${middlePart}"`);
        return middlePart;
    }
}

// Usage
console.log("--- File Processing Tests ---");
FileProcessor.getFileNameWithoutExtension("document.pdf");
FileProcessor.getFileNameWithoutExtension("script.js");
FileProcessor.getFileNameWithoutExtension("no-extension");

console.log("\n--- File Extension Tests ---");
FileProcessor.getFileExtension("image.jpg");
FileProcessor.getFileExtension("archive.tar.gz");

console.log("\n--- Path Processing ---");
FileProcessor.getParentFolder("/home/user/documents/file.txt");
FileProcessor.getParentFolder("relative/path/image.png");

console.log("\n--- Middle Part Extraction ---");
FileProcessor.extractMiddlePart("Hello [name] World", "[", "]");
FileProcessor.extractMiddlePart("Price: $50.00 USD", "$", " ");


/**
 * Ex 3: Text Truncation System
*/
class TextTruncator {
    static truncateText(text, maxLength, suffix = "...") {
        if (text.length <= maxLength) {
            console.log(`✅ Text within limit: "${text}"`);
            return text;
        }
        
        const truncated = text.slice(0, maxLength - suffix.length) + suffix;
        console.log(`✂️ Truncated: "${truncated}" (Original: ${text.length} chars)`);
        return truncated;
    }
    
    static smartTruncate(text, maxLength) {
        if (text.length <= maxLength) return text;
        
        // Last space ke around truncate karo taki words cut na hon
        const truncated = text.slice(0, maxLength - 3);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        
        if (lastSpaceIndex > maxLength * 0.7) { // Agar space reasonable position par hai
            return text.slice(0, lastSpaceIndex) + "...";
        }
        
        return truncated + "...";
    }
    
    static extractPreview(text, sentenceCount = 1) {
        let endIndex = 0;
        let sentencesFound = 0;
        
        for (let i = 0; i < text.length && sentencesFound < sentenceCount; i++) {
            if (text[i] === '.' || text[i] === '!' || text[i] === '?') {
                sentencesFound++;
                endIndex = i + 1; // Include the punctuation
            }
        }
        
        const preview = text.slice(0, endIndex);
        console.log(`📖 Preview (${sentenceCount} sentence(s)): "${preview}"`);
        return preview;
    }
    
    static getFirstWords(text, wordCount) {
        const words = text.split(' ');
        if (words.length <= wordCount) {
            console.log(`✅ All words within limit: "${text}"`);
            return text;
        }
        
        const firstWords = words.slice(0, wordCount).join(' ');
        console.log(`🔤 First ${wordCount} words: "${firstWords}"`);
        return firstWords;
    }
}

// Usage
console.log("--- Text Truncation Tests ---");
const longText = "This is a very long text that needs to be truncated for display purposes.";

TextTruncator.truncateText(longText, 30);
TextTruncator.truncateText("Short", 10);

console.log("\n--- Smart Truncation ---");
console.log("Smart:", TextTruncator.smartTruncate(longText, 30));
console.log("Smart:", TextTruncator.smartTruncate("This sentence has multiple words", 20));

console.log("\n--- Preview Extraction ---");
const multiSentence = "This is first sentence. This is second sentence! And this is third?";
TextTruncator.extractPreview(multiSentence, 2);
TextTruncator.getFirstWords("JavaScript is a programming language", 3);