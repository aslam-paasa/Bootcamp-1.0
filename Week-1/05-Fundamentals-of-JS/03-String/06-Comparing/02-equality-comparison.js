/**
 * == vs === - Equality Comparison:
 * > == (Loose Equality)   - Type coercion allow karta hai
 * > === (Strict Equality) - Type coercion allow nahi karta hai
*/

/**
 * Ex 1: Basic Equality Operations
*/
console.log("⚖️ Equality Comparison:");

// ✅ Same type, same value
console.log(`"hello" === "hello": ${"hello" === "hello"}`); // true
console.log(`"hello" == "hello": ${"hello" == "hello"}`); // true

// ❌ Different type, same "value" (type coercion)
console.log(`"5" == 5: ${"5" == 5}`); // true (type coercion)
console.log(`"5" === 5: ${"5" === 5}`); // false (different types)

// ❌ Truthy/falsy comparisons
console.log(`"0" == false: ${"0" == false}`); // true (type coercion)
console.log(`"0" === false: ${"0" === false}`); // false

console.log(`"" == false: ${"" == false}`); // true (type coercion)  
console.log(`"" === false: ${"" === false}`); // false

// ✅ null and undefined
console.log(`null == undefined: ${null == undefined}`); // true
console.log(`null === undefined: ${null === undefined}`); // false

// ❌ Objects (reference comparison)
const obj1 = { name: "John" };
const obj2 = { name: "John" };
const obj3 = obj1;

console.log(`obj1 == obj2: ${obj1 == obj2}`); // false (different references)
console.log(`obj1 === obj2: ${obj1 === obj2}`); // false (different references)
console.log(`obj1 == obj3: ${obj1 == obj3}`); // true (same reference)


/**
 * Ex 2: Real World - Input Validation
*/
class InputValidator {
    static validateStringEquality(input1, input2, strict = true) {
        console.log(`✅ Validating equality: "${input1}" vs "${input2}" (strict: ${strict})`);

        const areEqual = strict ? input1 === input2 : input1 == input2;

        if (areEqual) {
            console.log("✅ Inputs are equal");
        } else {
            console.log("❌ Inputs are not equal");
        }

        return areEqual;
    }

    static checkPasswordConfirmation(password, confirmation) {
        console.log("🔐 Checking password confirmation...");

        // Always use strict equality for passwords
        const isValid = password === confirmation;

        if (isValid) {
            console.log("✅ Passwords match!");
        } else {
            console.log("❌ Passwords do not match");
        }

        return isValid;
    }

    static compareUserInput(input, expected) {
        console.log(`🔍 Comparing: "${input}" with expected: "${expected}"`);

        // For user input, we might want case-insensitive comparison
        const normalizedInput = input.trim().toLowerCase();
        const normalizedExpected = expected.trim().toLowerCase();

        const isMatch = normalizedInput === normalizedExpected;

        console.log(isMatch ? "✅ Match found!" : "❌ No match");
        return isMatch;
    }

    static validateNumberInput(input) {
        console.log(`🔢 Validating number input: "${input}"`);

        // Check if input can be converted to number (loose equality)
        const asNumber = Number(input);
        const isNumeric = input == asNumber && input.trim() !== "";

        // But for actual value comparison, use strict
        const isValid = isNumeric && typeof input === 'string';

        console.log(isValid ? "✅ Valid number input" : "❌ Invalid number input");
        return isValid;
    }
}

// Usage
console.log("--- String Equality Validation ---");
InputValidator.validateStringEquality("hello", "hello", true);
InputValidator.validateStringEquality("5", 5, false);
InputValidator.validateStringEquality("5", 5, true);

console.log("\n--- Password Confirmation ---");
InputValidator.checkPasswordConfirmation("secret123", "secret123");
InputValidator.checkPasswordConfirmation("secret123", "Secret123");

console.log("\n--- User Input Comparison ---");
InputValidator.compareUserInput("  JavaScript  ", "javascript");
InputValidator.compareUserInput("Python", "java");

console.log("\n--- Number Input Validation ---");
InputValidator.validateNumberInput("42");
InputValidator.validateNumberInput("42abc");
InputValidator.validateNumberInput(" 123 ");


/**
 * Ex 3: Configuration System
*/
class ConfigValidator {
    static validateConfig(config, expected) {
        console.log("⚙️ Validating configuration...");

        const issues = [];

        for (const [key, expectedValue] of Object.entries(expected)) {
            const actualValue = config[key];

            if (actualValue === undefined) {
                issues.push(`❌ Missing key: ${key}`);
            } else if (actualValue !== expectedValue) {
                issues.push(`⚠️ Value mismatch for ${key}: expected ${expectedValue}, got ${actualValue}`);
            } else {
                console.log(`✅ ${key}: ${actualValue}`);
            }
        }

        if (issues.length === 0) {
            console.log("🎉 All configuration values are correct!");
        } else {
            console.log("Configuration issues found:");
            issues.forEach(issue => console.log(`   ${issue}`));
        }

        return issues.length === 0;
    }

    static mergeConfigs(defaultConfig, userConfig) {
        console.log("🔄 Merging configurations...");

        const merged = { ...defaultConfig };

        for (const [key, userValue] of Object.entries(userConfig)) {
            if (userValue !== undefined) {
                // Use strict equality to avoid replacing with undefined
                merged[key] = userValue;
            }
        }

        console.log("✅ Merged configuration:", merged);
        return merged;
    }

    static compareApiResponses(response1, response2) {
        console.log("🔗 Comparing API responses...");

        // Convert both to JSON string for deep comparison
        const str1 = JSON.stringify(response1);
        const str2 = JSON.stringify(response2);

        const areEqual = str1 === str2;

        console.log(areEqual ? "✅ API responses are identical" : "❌ API responses differ");
        return areEqual;
    }
}

// Usage
console.log("--- Configuration Validation ---");
const defaultConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};

const userConfig = {
    apiUrl: "https://api.test.com",
    timeout: 5000
};

ConfigValidator.validateConfig(userConfig, defaultConfig);

console.log("\n--- Configuration Merging ---");
ConfigValidator.mergeConfigs(defaultConfig, userConfig);

console.log("\n--- API Response Comparison ---");
const response1 = { data: { user: "John", age: 30 } };
const response2 = { data: { user: "John", age: 30 } };
const response3 = { data: { user: "Jane", age: 30 } };

ConfigValidator.compareApiResponses(response1, response2);
ConfigValidator.compareApiResponses(response1, response3);