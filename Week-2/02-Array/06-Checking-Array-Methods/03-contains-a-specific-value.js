/**
 * Step 3: includes() - Specific Value Existence Check 
 * > includes() check karta hai ki array mein specific value exist karti hai ya nahi.
 * > Syntax: array.includes(value, fromIndex)
*/



/**
 * Example 1: Basic Includes Operations
*/

const fruits = ["Apple", "Banana", "Orange", "Mango"];

console.log("🍎 Fruits:", fruits);

/* Basic includes check */
console.log("Includes 'Apple'?", fruits.includes("Apple")); // true
console.log("Includes 'Grapes'?", fruits.includes("Grapes")); // false

/* Case sensitive check */
console.log("Includes 'apple'?", fruits.includes("apple")); // false

/* ✅ With fromIndex */
console.log("Includes 'Banana' from index 2?", fruits.includes("Banana", 2)); // false
console.log("Includes 'Orange' from index 2?", fruits.includes("Orange", 2)); // true



/**
 * Example 2: Real World - Blacklist/Whitelist System
*/

class AccessControl {
    constructor() {
        this.blacklistedIPs = ["192.168.1.100", "10.0.0.5", "172.16.0.10"];
        this.adminUsers = ["admin", "superuser", "root"];
        this.allowedFileTypes = [".jpg", ".png", ".pdf", ".doc", ".txt"];
    }

    checkIPAccess(ipAddress) {
        const isBlacklisted = this.blacklistedIPs.includes(ipAddress);
        
        console.log(`🌐 IP Access Check: ${ipAddress}`);
        console.log(isBlacklisted ? "❌ Access DENIED - Blacklisted IP" : "✅ Access GRANTED");
        
        return !isBlacklisted;
    }

    checkAdminAccess(username) {
        const isAdmin = this.adminUsers.includes(username.toLowerCase());
        
        console.log(`👨‍💼 Admin Check: ${username}`);
        console.log(isAdmin ? "✅ Admin access granted" : "❌ Regular user access");
        
        return isAdmin;
    }

    validateFileUpload(filename) {
        const fileExtension = filename.toLowerCase().slice(filename.lastIndexOf('.'));
        const isValidType = this.allowedFileTypes.includes(fileExtension);
        
        console.log(`📁 File Upload Check: ${filename}`);
        console.log(isValidType ? "✅ File type allowed" : "❌ File type not allowed");
        
        return isValidType;
    }

    bulkIPCheck(ipList) {
        console.log("🔍 Bulk IP Check:");
        
        ipList.forEach(ip => {
            const status = this.blacklistedIPs.includes(ip) ? "❌ BLOCKED" : "✅ ALLOWED";
            console.log(`   ${ip}: ${status}`);
        });

        const blockedCount = ipList.filter(ip => this.blacklistedIPs.includes(ip)).length;
        console.log(`📊 Result: ${blockedCount}/${ipList.length} IPs blocked`);
    }
}

// Usage
const accessControl = new AccessControl();

// Single checks
accessControl.checkIPAccess("192.168.1.100");
accessControl.checkIPAccess("192.168.1.200");
accessControl.checkAdminAccess("admin");
accessControl.checkAdminAccess("rahul");
accessControl.validateFileUpload("document.pdf");
accessControl.validateFileUpload("script.exe");

// Bulk check
console.log("\n--- Bulk Check ---");
const ipList = ["192.168.1.100", "10.0.0.5", "192.168.1.101", "172.16.0.10", "10.0.0.6"];
accessControl.bulkIPCheck(ipList);



/**
 * Example 3: Shopping Cart Features
*/

class ShoppingCartFeatures {
    constructor() {
        this.supportedCoupons = ["WELCOME10", "SUMMER25", "FESTIVE50", "NEWUSER15"];
        this.expressShippingProducts = ["Laptop", "Phone", "Tablet", "Camera"];
        this.giftWrapEligibleProducts = ["Watch", "Jewelry", "Perfume", "Chocolate"];
    }

    checkCouponValidity(couponCode) {
        const isValid = this.supportedCoupons.includes(couponCode.toUpperCase());
        
        console.log(`🎫 Coupon Check: ${couponCode}`);
        console.log(isValid ? "✅ Valid coupon" : "❌ Invalid coupon");
        
        return isValid;
    }

    checkExpressShipping(productName) {
        const hasExpressShipping = this.expressShippingProducts.includes(productName);
        
        console.log(`🚚 Express Shipping Check: ${productName}`);
        console.log(hasExpressShipping ? 
            "✅ Express shipping available" : 
            "📦 Standard shipping only"
        );
        
        return hasExpressShipping;
    }

    checkGiftWrapEligibility(productName) {
        const isEligible = this.giftWrapEligibleProducts.includes(productName);
        
        console.log(`🎁 Gift Wrap Check: ${productName}`);
        console.log(isEligible ? 
            "✅ Gift wrap available" : 
            "❌ Gift wrap not available for this product"
        );
        
        return isEligible;
    }

    getCartFeatures(cartItems) {
        console.log("🛒 Cart Features Analysis:");
        
        const features = {
            hasExpressShipping: cartItems.some(item => 
                this.expressShippingProducts.includes(item.name)
            ),
            hasGiftWrapItems: cartItems.some(item => 
                this.giftWrapEligibleProducts.includes(item.name)
            ),
            totalItems: cartItems.length,
            itemNames: cartItems.map(item => item.name)
        };

        console.log(`   Express Shipping: ${features.hasExpressShipping ? '✅' : '❌'}`);
        console.log(`   Gift Wrap Options: ${features.hasGiftWrapItems ? '✅' : '❌'}`);
        console.log(`   Total Items: ${features.totalItems}`);
        console.log(`   Items: ${features.itemNames.join(', ')}`);

        return features;
    }
}

// Usage
const cartFeatures = new ShoppingCartFeatures();

// Individual checks
cartFeatures.checkCouponValidity("welcome10");
cartFeatures.checkCouponValidity("INVALIDCODE");
cartFeatures.checkExpressShipping("Laptop");
cartFeatures.checkExpressShipping("Book");
cartFeatures.checkGiftWrapEligibility("Watch");
cartFeatures.checkGiftWrapEligibility("Laptop");

// Cart analysis
console.log("\n--- Cart Analysis ---");
const cartItems = [
    { name: "Laptop", price: 50000 },
    { name: "Watch", price: 5000 },
    { name: "Book", price: 500 }
];
cartFeatures.getCartFeatures(cartItems);