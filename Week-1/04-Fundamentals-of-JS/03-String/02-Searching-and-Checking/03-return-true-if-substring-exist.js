/**
 * includes() - Substring Existence Check 
 * > includes() check karta hai ki string mein substring exist karti 
 *   hai ya nahi. 
 * > Boolean return karta hai.
 * > Syntax: string.includes(searchValue, position)
*/

/**
 * Ex 1: Basic includes Operations
*/
const sentence = "JavaScript is a powerful programming language";

console.log("📝 Sentence:", sentence);

// ✅ Basic includes check
console.log(`includes("JavaScript"): ${sentence.includes("JavaScript")}`); // true
console.log(`includes("Python"): ${sentence.includes("Python")}`); // false
console.log(`includes("powerful"): ${sentence.includes("powerful")}`); // true

// ✅ Case sensitive
console.log(`includes("javascript"): ${sentence.includes("javascript")}`); // false

// ✅ With position parameter
console.log(`includes("is", 5): ${sentence.includes("is", 5)}`); // true
console.log(`includes("JavaScript", 10): ${sentence.includes("JavaScript", 10)}`); // false


/**
 * Ex 2: Real World - Content Filter
*/
class ContentFilter {
    constructor() {
        this.bannedWords = ["spam", "scam", "fraud", "fake", "cheat"];
        this.sensitiveTopics = ["password", "credit card", "social security"];
    }
    
    checkContentSafety(content) {
        console.log("🔒 Checking content safety...");
        
        const lowerContent = content.toLowerCase();
        let isSafe = true;
        const foundIssues = [];
        
        // ✅ Banned words check
        this.bannedWords.forEach(word => {
            if (lowerContent.includes(word)) {
                isSafe = false;
                foundIssues.push(`Banned word: ${word}`);
            }
        });
        
        // ✅ Sensitive topics check
        this.sensitiveTopics.forEach(topic => {
            if (lowerContent.includes(topic)) {
                foundIssues.push(`Sensitive topic: ${topic}`);
                // Sensitive topics don't necessarily make content unsafe
            }
        });
        
        if (foundIssues.length > 0) {
            console.log("⚠️ Content review needed:");
            foundIssues.forEach(issue => console.log(`   - ${issue}`));
        } else {
            console.log("✅ Content is safe");
        }
        
        return { isSafe, issues: foundIssues };
    }
    
    categorizeArticle(content) {
        console.log("📰 Categorizing article...");
        
        const categories = [];
        const lowerContent = content.toLowerCase();
        
        if (lowerContent.includes("javascript") || lowerContent.includes("programming")) {
            categories.push("Technology");
        }
        
        if (lowerContent.includes("business") || lowerContent.includes("startup")) {
            categories.push("Business");
        }
        
        if (lowerContent.includes("health") || lowerContent.includes("fitness")) {
            categories.push("Health");
        }
        
        if (lowerContent.includes("travel") || lowerContent.includes("vacation")) {
            categories.push("Travel");
        }
        
        if (categories.length === 0) {
            categories.push("General");
        }
        
        console.log(`✅ Categories: ${categories.join(', ')}`);
        return categories;
    }
}

// Usage
console.log("--- Content Safety Tests ---");
const filter = new ContentFilter();

filter.checkContentSafety("This is a legitimate offer with no spam");
filter.checkContentSafety("This is a scam message with fake offers");
filter.checkContentSafety("Please share your credit card information");

console.log("\n--- Article Categorization ---");
filter.categorizeArticle("JavaScript programming tips for beginners");
filter.categorizeArticle("Startup business ideas for 2024");
filter.categorizeArticle("Health and fitness tips for busy professionals");
filter.categorizeArticle("General news about the world");


/**
 * Ex 3: Product Search System
*/
class ProductSearch {
    constructor(products) {
        this.products = products;
    }
    
    searchProducts(query) {
        console.log(`🔍 Searching products for: "${query}"`);
        
        const results = this.products.filter(product => {
            const searchText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });
        
        console.log(`✅ Found ${results.length} products:`);
        results.forEach(product => {
            console.log(`   - ${product.name} (${product.category}) - ₹${product.price}`);
        });
        
        return results;
    }
    
    searchByCategory(category) {
        return this.searchProducts(category);
    }
    
    findSimilarProducts(productName) {
        const targetProduct = this.products.find(p => 
            p.name.toLowerCase().includes(productName.toLowerCase())
        );
        
        if (!targetProduct) {
            console.log(`❌ Product "${productName}" not found`);
            return [];
        }
        
        console.log(`🔄 Finding products similar to: ${targetProduct.name}`);
        
        const similarProducts = this.products.filter(product => {
            if (product.name === targetProduct.name) return false;
            
            return product.category === targetProduct.category ||
                   Math.abs(product.price - targetProduct.price) < 1000;
        });
        
        console.log(`✅ Found ${similarProducts.length} similar products:`);
        similarProducts.forEach(product => {
            console.log(`   - ${product.name} - ₹${product.price}`);
        });
        
        return similarProducts;
    }
}

// Usage
console.log("--- Product Search Tests ---");
const products = [
    { name: "Wireless Mouse", category: "Electronics", price: 1500, description: "Bluetooth wireless mouse" },
    { name: "Gaming Keyboard", category: "Electronics", price: 3500, description: "Mechanical gaming keyboard" },
    { name: "Office Chair", category: "Furniture", price: 5000, description: "Ergonomic office chair" },
    { name: "Laptop Stand", category: "Electronics", price: 1200, description: "Adjustable laptop stand" },
    { name: "Desk Lamp", category: "Furniture", price: 800, description: "LED desk lamp" }
];

const searchSystem = new ProductSearch(products);
searchSystem.searchProducts("wireless");
searchSystem.searchByCategory("Electronics");
searchSystem.findSimilarProducts("Mouse");