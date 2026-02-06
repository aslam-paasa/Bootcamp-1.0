/**
 * String() - Universal String Converter 
 * > String() kisi bhi data type ko string mein convert kar sakta hai,
 *   chahe woh primitive ho ya object.
*/

/**
 * Ex 1: Basic String Conversion
*/
console.log("🔤 String() - Universal Conversion:");

// ✅ Numbers
console.log(`String(42): "${String(42)}"`); // "42"
console.log(`String(3.14): "${String(3.14)}"`); // "3.14"
console.log(`String(0): "${String(0)}"`); // "0"
console.log(`String(-10): "${String(-10)}"`); // "-10"

// ✅ Booleans
console.log(`String(true): "${String(true)}"`); // "true"
console.log(`String(false): "${String(false)}"`); // "false"

// ✅ Special values
console.log(`String(null): "${String(null)}"`); // "null"
console.log(`String(undefined): "${String(undefined)}"`); // "undefined"
console.log(`String(NaN): "${String(NaN)}"`); // "NaN"

// ✅ Arrays
console.log(`String([1, 2, 3]): "${String([1, 2, 3])}"`); // "1,2,3"
console.log(`String(["a", "b"]): "${String(["a", "b"])}"`); // "a,b"

// ✅ Objects
console.log(`String({name: "John"}): "${String({ name: "John" })}"`); // "[object Object]"

// ✅ Functions
console.log(`String(function() {}): "${String(function () { })}"`); // "function() {}"


/**
 * Ex 2: Real World - Safe Data Display
*/
class SafeDisplay {
    static displayValue(value, fallback = "N/A") {
        console.log(`📱 Displaying value:`, value);
        
        // ✅ Safely convert any value to string
        let displayText;
        
        if (value === null || value === undefined) {
            displayText = fallback;
        } else {
            displayText = String(value);
        }
        
        console.log(`✅ Display: "${displayText}"`);
        return displayText;
    }
    
    static createUserProfile(user) {
        console.log("👤 Creating user profile...");
        
        const profile = {
            name: this.displayValue(user.name, "Unknown User"),
            age: this.displayValue(user.age, "Not specified"),
            email: this.displayValue(user.email, "No email"),
            city: this.displayValue(user.city, "Unknown location")
        };
        
        console.log("✅ User Profile:", profile);
        return profile;
    }
    
    static formatProductDetails(product) {
        console.log("🏷️ Formatting product details...");
        
        const details = `
Product: ${String(product.name || "Unnamed Product")}
Price: $${String(product.price || 0)}
Category: ${String(product.category || "Uncategorized")}
In Stock: ${String(product.inStock ? "Yes" : "No")}
        `.trim();
        
        console.log("✅ Product Details:\n" + details);
        return details;
    }
    
    static generateErrorMessage(error, context = "") {
        console.log("🚨 Generating error message...");
        
        let message = "An error occurred";
        
        if (context) {
            message += ` in ${context}`;
        }
        
        if (error) {
            message += `: ${String(error)}`;
        }
        
        console.log(`✅ Error message: ${message}`);
        return message;
    }
}

// Usage
console.log("--- Safe Value Display ---");
SafeDisplay.displayValue(42);
SafeDisplay.displayValue(null);
SafeDisplay.displayValue(undefined, "Not available");
SafeDisplay.displayValue([1, 2, 3]);

console.log("\n--- User Profile Creation ---");
const user1 = { name: "Rahul", age: 25, email: "rahul@example.com" };
const user2 = { name: null, age: undefined, city: "Mumbai" };
SafeDisplay.createUserProfile(user1);
SafeDisplay.createUserProfile(user2);

console.log("\n--- Product Details Formatting ---");
const product1 = { name: "Laptop", price: 999, category: "Electronics", inStock: true };
const product2 = { name: "", price: null, inStock: false };
SafeDisplay.formatProductDetails(product1);
SafeDisplay.formatProductDetails(product2);

console.log("\n--- Error Message Generation ---");
SafeDisplay.generateErrorMessage("File not found", "file upload");
SafeDisplay.generateErrorMessage(new Error("Network timeout"));