/**
 * Step 1: some() - Koi Bhi Ek Condition Satisfy Kare
 * > some() check karta hai ki array mein koi bhi ek element condition 
 *   satisfy karta hai ya nahi.
 * > Syntax:
 *   array.some(function(currentValue, index, array) {
 *       return condition;
 *   });
*/



/**
 * Example 1: Basic some() operations
*/

const numbers = [1, 2, 3, 4, 5];

console.log("🔢 Numbers:", numbers);

/* Koi bhi even number hai? */
const hasEven = numbers.some(num => num % 2 === 0);
console.log("Has even number?", hasEven); // true

/* Koi bhi number 10 se bada hai? */
const hasLargeNumber = numbers.some(num => num > 10);
console.log("Has number > 10?", hasLargeNumber); // false

/* Koi bhi negative number hai? */
const hasNegative = numbers.some(num => num < 0);
console.log("Has negative number?", hasNegative); // false



/**
 * Example 2: Real World - Form Validation
*/

class FormValidator {
    static validateFormFields(fields) {
        console.log("📝 Form Validation:");

        /* Koi bhi required field empty hai? */
        const hasEmptyRequired = fields.some(field => 
            field.required && !field.value.trim()
        );
        
        if (hasEmptyRequired) {
            console.log("❌ Error: Some required fields are empty");
            return false;
        }

        /* Koi bhi invalid email hai? */
        const hasInvalidEmail = fields.some(field => 
            field.type === 'email' && !this.isValidEmail(field.value)
        );
        
        if (hasInvalidEmail) {
            console.log("❌ Error: Invalid email format");
            return false;
        }

        /* Koi bhi password weak hai? */
        const hasWeakPassword = fields.some(field =>
            field.type === 'password' && field.value.length < 8
        );
        
        if (hasWeakPassword) {
            console.log("❌ Error: Password too weak");
            return false;
        }

        console.log("✅ All validations passed!");
        return true;
    }

    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

/* Usage */
const formFields = [
    { name: "username", value: "rahul123", required: true },
    { name: "email", value: "rahul@example.com", required: true, type: "email" },
    { name: "password", value: "weak", required: true, type: "password" },
    { name: "phone", value: "", required: false }
];

FormValidator.validateFormFields(formFields);   


/**
 * Example 3: E-commerce - Discount Eligibility
*/

class DiscountValidator {
    constructor() {
        this.products = [
            { id: 1, name: "Laptop", price: 50000, category: "electronics" },
            { id: 2, name: "Shirt", price: 1500, category: "clothing" },
            { id: 3, name: "Book", price: 500, category: "education" },
            { id: 4, name: "Headphones", price: 3000, category: "electronics" }
        ];
    }

    checkDiscountEligibility(cartItems, user) {
        console.log("🎫 Checking Discount Eligibility:");

        /* Cart mein koi electronics item hai? */
        const hasElectronics = cartItems.some(itemId => {
            const product = this.products.find(p => p.id === itemId);
            return product?.category === 'electronics';
        });
        
        if (hasElectronics) {
            console.log("✅ Eligible for electronics discount!");
        }

        /* Cart mein koi high-value item (₹10,000+) hai? */
        const hasHighValueItem = cartItems.some(itemId => {
            const product = this.products.find(p => p.id === itemId);
            return product?.price > 10000;
        });
        
        if (hasHighValueItem) {
            console.log("✅ Eligible for premium customer discount!");
        }

        /* User premium member hai? */
        if (user.isPremium) {
            console.log("✅ Eligible for premium member discount!");
        }

        /* Total cart value ₹5000 se zyada hai? */
        const totalValue = cartItems.reduce((sum, itemId) => {
            const product = this.products.find(p => p.id === itemId);
            return sum + (product?.price || 0);
        }, 0);
        
        if (totalValue > 5000) {
            console.log("✅ Eligible for bulk purchase discount!");
        }

        return { hasElectronics, hasHighValueItem, totalValue };
    }
}

/* Usage */
const validator = new DiscountValidator();
const user = { name: "Rahul", isPremium: true };
const cartItems = [1, 2, 4]; // Laptop, Shirt, Headphones

validator.checkDiscountEligibility(cartItems, user);