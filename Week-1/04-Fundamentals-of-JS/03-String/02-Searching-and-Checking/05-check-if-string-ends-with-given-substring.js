/**
 * endsWith() - Suffix Checking 
 * > endsWith() check karta hai ki string specific substring se end 
 *   hoti hai ya nahi.
 * > Syntax: string.endsWith(searchValue, length)
*/

/**
 * Ex 1: Basic endsWith Operations
*/
const filename = "document.pdf";
const sentence = "I love JavaScript programming";

console.log("📝 Examples:");
console.log(`"${filename}" endsWith(".pdf"): ${filename.endsWith(".pdf")}`); // true
console.log(`"${filename}" endsWith(".doc"): ${filename.endsWith(".doc")}`); // false
console.log(`"${sentence}" endsWith("programming"): ${sentence.endsWith("programming")}`); // true

// ✅ With length parameter (check first n characters)
console.log(`"${sentence}" endsWith("love", 8): ${sentence.endsWith("love", 8)}`); // true


/**
 * Ex 2: Real World - File Type Validation
*/
class FileTypeValidator {
    static validateFileType(filename, allowedExtensions) {
        console.log(`📁 Validating file: ${filename}`);
        
        const isValid = allowedExtensions.some(ext => 
            filename.toLowerCase().endsWith(ext.toLowerCase())
        );
        
        if (isValid) {
            console.log("✅ Valid file type");
        } else {
            console.log(`❌ Invalid file type. Allowed: ${allowedExtensions.join(', ')}`);
        }
        
        return isValid;
    }
    
    static isImageFile(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        return this.validateFileType(filename, imageExtensions);
    }
    
    static isDocumentFile(filename) {
        const docExtensions = ['.pdf', '.doc', '.docx', '.txt', '.rtf'];
        return this.validateFileType(filename, docExtensions);
    }
    
    static isCodeFile(filename) {
        const codeExtensions = ['.js', '.html', '.css', '.py', '.java', '.cpp'];
        return this.validateFileType(filename, codeExtensions);
    }
    
    static getFileCategory(filename) {
        if (this.isImageFile(filename)) return "Image";
        if (this.isDocumentFile(filename)) return "Document";
        if (this.isCodeFile(filename)) return "Code";
        return "Other";
    }
    
    static analyzeFiles(fileList) {
        console.log("📊 File Analysis Report:");
        
        const categories = {
            Image: 0,
            Document: 0,
            Code: 0,
            Other: 0
        };
        
        fileList.forEach(file => {
            const category = this.getFileCategory(file);
            categories[category]++;
            console.log(`   ${file} → ${category}`);
        });
        
        console.log("\n📈 Summary:");
        Object.entries(categories).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} files`);
        });
        
        return categories;
    }
}

// Usage
console.log("--- File Type Validation Tests ---");
FileTypeValidator.isImageFile("photo.jpg");
FileTypeValidator.isImageFile("document.pdf");
FileTypeValidator.isDocumentFile("report.pdf");
FileTypeValidator.isCodeFile("script.js");

console.log("\n--- File Category Tests ---");
console.log(`Category: ${FileTypeValidator.getFileCategory("image.png")}`);
console.log(`Category: ${FileTypeValidator.getFileCategory("code.py")}`);
console.log(`Category: ${FileTypeValidator.getFileCategory("data.xlsx")}`);

console.log("\n--- Bulk File Analysis ---");
const files = ["app.js", "style.css", "photo.jpg", "report.pdf", "data.txt", "video.mp4"];
FileTypeValidator.analyzeFiles(files);


