/**
 * lastIndexOf() - Substring ki Last Position Dhundhna
 * > lastIndexOf() substring ki last occurrence ka index return karta hai 
 * > End se search start karta hai.
 * > Syntax: string.lastIndexOf(searchValue, fromIndex)
*/

/**
 * Ex 1: Basic lastIndexOf Operations
*/

const text = "JavaScript is great. JavaScript is amazing. JavaScript is powerful.";

console.log("📝 Text:", text);

// ✅ Basic search
console.log(`lastIndexOf("JavaScript"): ${text.lastIndexOf("JavaScript")}`); // 46
console.log(`lastIndexOf("is"): ${text.lastIndexOf("is")}`); // 57
console.log(`lastIndexOf("Python"): ${text.lastIndexOf("Python")}`); // -1

// ✅ With fromIndex (search backwards from this position)
console.log(`lastIndexOf("JavaScript", 30): ${text.lastIndexOf("JavaScript", 30)}`); // 23
console.log(`lastIndexOf("JavaScript", 20): ${text.lastIndexOf("JavaScript", 20)}`); // 0

// ✅ Comparison with indexOf
console.log(`indexOf("JavaScript"): ${text.indexOf("JavaScript")}`); // 0
console.log(`lastIndexOf("JavaScript"): ${text.lastIndexOf("JavaScript")}`); // 46


/**
 * Ex 2: File Path Analysis
*/
class FilePathAnalyzer {
    static getFileName(filePath) {
        console.log(`📁 Analyzing file path: ${filePath}`);
        
        // ✅ Last slash se filename extract karo
        const lastSlashIndex = filePath.lastIndexOf('/');
        const fileName = lastSlashIndex !== -1 ? 
            filePath.slice(lastSlashIndex + 1) : filePath;
        
        console.log(`📄 File name: ${fileName}`);
        return fileName;
    }
    
    static getFileExtension(filePath) {
        // ✅ Last dot se extension extract karo
        const lastDotIndex = filePath.lastIndexOf('.');
        if (lastDotIndex === -1) {
            console.log("❌ No file extension found");
            return "";
        }
        
        const extension = filePath.slice(lastDotIndex + 1);
        console.log(`🔧 File extension: .${extension}`);
        return extension;
    }
    
    static getParentDirectory(filePath) {
        const lastSlashIndex = filePath.lastIndexOf('/');
        if (lastSlashIndex === -1) {
            console.log("❌ No parent directory");
            return "";
        }
        
        const parentDir = filePath.slice(0, lastSlashIndex);
        console.log(`📂 Parent directory: ${parentDir}`);
        return parentDir;
    }
    
    static isImageFile(filePath) {
        const extension = this.getFileExtension(filePath).toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        
        const isImage = imageExtensions.includes(extension);
        console.log(`🖼️ Is image file? ${isImage ? '✅' : '❌'}`);
        return isImage;
    }
}

// Usage
console.log("--- File Path Analysis Tests ---");
FilePathAnalyzer.getFileName("/home/user/documents/report.pdf");
FilePathAnalyzer.getFileName("simple.txt");

console.log("\n--- File Extension Tests ---");
FilePathAnalyzer.getFileExtension("/path/to/image.jpg");
FilePathAnalyzer.getFileExtension("no-extension");

console.log("\n--- Parent Directory Tests ---");
FilePathAnalyzer.getParentDirectory("/home/user/documents/file.txt");
FilePathAnalyzer.getParentDirectory("standalone-file");

console.log("\n--- Image Check Tests ---");
FilePathAnalyzer.isImageFile("photo.jpg");
FilePathAnalyzer.isImageFile("document.pdf");


/**
 * Ex 3: URL Parser
*/
class URLParser {
    static parseURL(url) {
        console.log(`🌐 Parsing URL: ${url}`);
        
        const parsed = {
            protocol: "",
            domain: "",
            path: "",
            query: "",
            fragment: ""
        };
        
        // ✅ Protocol extract karo
        const protocolEnd = url.indexOf('://');
        if (protocolEnd !== -1) {
            parsed.protocol = url.slice(0, protocolEnd);
        }
        
        // ✅ Domain and path extract karo
        const domainStart = protocolEnd !== -1 ? protocolEnd + 3 : 0;
        const pathStart = url.indexOf('/', domainStart);
        const queryStart = url.indexOf('?', domainStart);
        const fragmentStart = url.indexOf('#', domainStart);
        
        if (pathStart !== -1) {
            parsed.domain = url.slice(domainStart, pathStart);
            const pathEnd = queryStart !== -1 ? queryStart : fragmentStart !== -1 ? fragmentStart : url.length;
            parsed.path = url.slice(pathStart, pathEnd);
        } else {
            const domainEnd = queryStart !== -1 ? queryStart : fragmentStart !== -1 ? fragmentStart : url.length;
            parsed.domain = url.slice(domainStart, domainEnd);
        }
        
        // ✅ Query parameters extract karo
        if (queryStart !== -1) {
            const queryEnd = fragmentStart !== -1 ? fragmentStart : url.length;
            parsed.query = url.slice(queryStart + 1, queryEnd);
        }
        
        // ✅ Fragment extract karo
        if (fragmentStart !== -1) {
            parsed.fragment = url.slice(fragmentStart + 1);
        }
        
        console.log("✅ Parsed URL components:");
        Object.entries(parsed).forEach(([key, value]) => {
            if (value) console.log(`   ${key}: ${value}`);
        });
        
        return parsed;
    }
    
    static getQueryParam(url, paramName) {
        const queryStart = url.indexOf('?');
        if (queryStart === -1) {
            console.log(`❌ No query parameters in URL`);
            return null;
        }
        
        const queryString = url.slice(queryStart + 1);
        const fragmentStart = queryString.indexOf('#');
        const cleanQuery = fragmentStart !== -1 ? queryString.slice(0, fragmentStart) : queryString;
        
        const params = new URLSearchParams(cleanQuery);
        const value = params.get(paramName);
        
        console.log(`🔍 Query parameter "${paramName}": ${value || 'Not found'}`);
        return value;
    }
}

// Usage
console.log("--- URL Parsing Tests ---");
URLParser.parseURL("https://www.example.com/path/to/page?name=John&age=30#section1");
URLParser.parseURL("https://google.com/search?q=javascript");

console.log("\n--- Query Parameter Tests ---");
URLParser.getQueryParam("https://example.com?search=nodejs&page=1", "search");
URLParser.getQueryParam("https://example.com?name=Alice", "age");