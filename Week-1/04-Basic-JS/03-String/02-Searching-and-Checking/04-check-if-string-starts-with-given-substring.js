/**
 * startsWith() - Prefix Checking
 * > startsWith() check karta hai ki string specific substring se start
 *   hoti hai ya nahi.
 * > Syntax: string.startsWith(searchValue, position)
*/

/**
 * Ex 1: Basic startsWith Operations
*/
const text = "JavaScript is amazing";

console.log("📝 Text:", text);

// ✅ Basic startsWith check
console.log(`startsWith("Java"): ${text.startsWith("Java")}`); // true
console.log(`startsWith("Script"): ${text.startsWith("Script")}`); // false
console.log(`startsWith("JavaScript"): ${text.startsWith("JavaScript")}`); // true

// ✅ Case sensitive
console.log(`startsWith("java"): ${text.startsWith("java")}`); // false

// ✅ With position parameter
console.log(`startsWith("is", 11): ${text.startsWith("is", 11)}`); // true
console.log(`startsWith("amazing", 13): ${text.startsWith("amazing", 13)}`); // true


/**
 * Ex 2: Real World - Protocol & URL Validation
*/
class URLValidator {
    static validateProtocol(url) {
        console.log(`🌐 Validating URL protocol: ${url}`);
        
        const protocols = ['https://', 'http://', 'ftp://', 'file://'];
        const isValid = protocols.some(protocol => url.startsWith(protocol));
        
        if (isValid) {
            console.log("✅ Valid URL protocol");
        } else {
            console.log("❌ Invalid URL protocol");
        }
        
        return isValid;
    }
    
    static isSecure(url) {
        const isSecure = url.startsWith('https://');
        console.log(`🔒 Is secure (HTTPS)? ${isSecure ? '✅' : '❌'}`);
        return isSecure;
    }
    
    static isLocalFile(url) {
        const isLocal = url.startsWith('file://') || url.startsWith('/');
        console.log(`💾 Is local file? ${isLocal ? '✅' : '❌'}`);
        return isLocal;
    }
    
    static getProtocol(url) {
        const protocols = ['https://', 'http://', 'ftp://', 'file://'];
        const protocol = protocols.find(p => url.startsWith(p));
        
        console.log(`🔧 Protocol: ${protocol || 'None'}`);
        return protocol;
    }
}

// Usage
console.log("--- URL Protocol Tests ---");
URLValidator.validateProtocol("https://example.com");
URLValidator.validateProtocol("http://google.com");
URLValidator.validateProtocol("ftp://files.com");
URLValidator.validateProtocol("invalid-url");

console.log("\n--- Security Checks ---");
URLValidator.isSecure("https://bank.com");
URLValidator.isSecure("http://site.com");

console.log("\n--- Local File Checks ---");
URLValidator.isLocalFile("file:///documents/report.pdf");
URLValidator.isLocalFile("/home/user/file.txt");
URLValidator.isLocalFile("https://remote.com/file.pdf");


/**
 * Ex 3: Command Line Interface
*/
class CommandProcessor {
    static processCommand(input) {
        console.log(`💻 Processing command: ${input}`);
        
        const command = input.trim();
        
        if (command.startsWith("git ")) {
            this.processGitCommand(command);
        } else if (command.startsWith("npm ")) {
            this.processNpmCommand(command);
        } else if (command.startsWith("docker ")) {
            this.processDockerCommand(command);
        } else if (command.startsWith("cd ")) {
            this.processChangeDirectory(command);
        } else if (command.startsWith("echo ")) {
            this.processEchoCommand(command);
        } else {
            console.log("❌ Unknown command");
        }
    }
    
    static processGitCommand(command) {
        console.log("🔧 Git command detected");
        
        if (command.startsWith("git clone")) {
            const repo = command.slice(10);
            console.log(`📥 Cloning repository: ${repo}`);
        } else if (command.startsWith("git push")) {
            console.log("📤 Pushing changes to remote");
        } else if (command.startsWith("git pull")) {
            console.log("📥 Pulling latest changes");
        } else if (command.startsWith("git commit")) {
            const message = command.slice(12, -1); // Remove git commit and quotes
            console.log(`💾 Committing changes: ${message}`);
        } else {
            console.log("✅ Executing git command");
        }
    }
    
    static processNpmCommand(command) {
        console.log("📦 NPM command detected");
        
        if (command.startsWith("npm install")) {
            const packageName = command.slice(12);
            if (packageName) {
                console.log(`📥 Installing package: ${packageName}`);
            } else {
                console.log("📥 Installing dependencies from package.json");
            }
        } else if (command.startsWith("npm run")) {
            const script = command.slice(8);
            console.log(`🚀 Running script: ${script}`);
        } else if (command.startsWith("npm start")) {
            console.log("🎬 Starting application");
        } else {
            console.log("✅ Executing npm command");
        }
    }
    
    static processChangeDirectory(command) {
        const path = command.slice(3);
        console.log(`📁 Changing directory to: ${path}`);
    }
    
    static processEchoCommand(command) {
        const message = command.slice(5);
        console.log(`📢 Echo: ${message}`);
    }
}

// Usage
console.log("--- Command Processor Tests ---");
CommandProcessor.processCommand("git clone https://github.com/user/repo.git");
CommandProcessor.processCommand("npm install react");
CommandProcessor.processCommand("docker run nginx");
CommandProcessor.processCommand("cd /home/user/projects");
CommandProcessor.processCommand("echo Hello World");
CommandProcessor.processCommand("unknown command");