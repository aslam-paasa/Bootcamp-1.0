/**
 * toString() - Object-Specific Conversion
 * > toString() specific objects ke liye designed hai aur different 
 *   data types different representations return karte hain.
 * 
 * Important:
 * > null aur undefined par toString() call nahi kar sakte (error aayega)
 * > Numbers, booleans, arrays par directly use kar sakte hain
*/

/**
 * Ex 1: Basic toString Operations
*/
console.log("🔤 toString() - Object-Specific Conversion:");

// ✅ Numbers
console.log(`(42).toString(): "${(42).toString()}"`); // "42"
console.log(`(3.14).toString(): "${(3.14).toString()}"`); // "3.14"
console.log(`(0).toString(): "${(0).toString()}"`); // "0"

// ✅ Number with radix (base)
console.log(`(10).toString(2): "${(10).toString(2)}"`); // "1010" (binary)
console.log(`(255).toString(16): "${(255).toString(16)}"`); // "ff" (hexadecimal)
console.log(`(15).toString(8): "${(15).toString(8)}"`); // "17" (octal)

// ✅ Booleans
console.log(`true.toString(): "${true.toString()}"`); // "true"
console.log(`false.toString(): "${false.toString()}"`); // "false"

// ✅ Arrays
console.log(`[1, 2, 3].toString(): "${[1, 2, 3].toString()}"`); // "1,2,3"
console.log(`['a', 'b', 'c'].toString(): "${['a', 'b', 'c'].toString()}"`); // "a,b,c"
console.log(`[1, 'hello', true].toString(): "${[1, 'hello', true].toString()}"`); // "1,hello,true"

// ❌ null and undefined (will throw error)
// console.log(null.toString()); // TypeError
// console.log(undefined.toString()); // TypeError


/**
 * Ex 2: Real World - Number Formatting
*/
class NumberFormatter {
    static formatNumber(number, options = {}) {
        console.log(`🔢 Formatting number: ${number}`);

        const {
            radix = 10,
            prefix = "",
            suffix = "",
            decimals = 0
        } = options;

        let formatted;

        if (radix !== 10) {
            // Different base conversion
            formatted = number.toString(radix);
        } else if (decimals > 0) {
            // Decimal formatting
            formatted = number.toFixed(decimals);
        } else {
            // Regular string conversion
            formatted = number.toString();
        }

        const result = prefix + formatted + suffix;
        console.log(`✅ Formatted: ${result}`);
        return result;
    }

    static createColorCode(red, green, blue) {
        console.log(`🎨 Creating color code: RGB(${red}, ${green}, ${blue})`);

        const hexRed = red.toString(16).padStart(2, '0');
        const hexGreen = green.toString(16).padStart(2, '0');
        const hexBlue = blue.toString(16).padStart(2, '0');

        const colorCode = `#${hexRed}${hexGreen}${hexBlue}`.toUpperCase();

        console.log(`✅ Color code: ${colorCode}`);
        return colorCode;
    }

    static formatFileSize(bytes) {
        console.log(`📁 Formatting file size: ${bytes} bytes`);

        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        const formatted = size.toFixed(2) + ' ' + units[unitIndex];
        console.log(`✅ File size: ${formatted}`);
        return formatted;
    }

    static generateSerialNumber(parts) {
        console.log("🏷️ Generating serial number...");

        const serial = parts.map(part => {
            if (typeof part === 'number') {
                return part.toString().padStart(2, '0');
            }
            return String(part).toUpperCase();
        }).join('-');

        console.log(`✅ Serial number: ${serial}`);
        return serial;
    }
}

// Usage
console.log("--- Number Formatting ---");
NumberFormatter.formatNumber(42);
NumberFormatter.formatNumber(42, { prefix: "Item #" });
NumberFormatter.formatNumber(10, { radix: 2, prefix: "0b" });
NumberFormatter.formatNumber(3.14159, { decimals: 2 });

console.log("\n--- Color Code Generation ---");
NumberFormatter.createColorCode(255, 0, 0); // Red
NumberFormatter.createColorCode(0, 255, 0); // Green
NumberFormatter.createColorCode(0, 0, 255); // Blue

console.log("\n--- File Size Formatting ---");
NumberFormatter.formatFileSize(1024); // 1 KB
NumberFormatter.formatFileSize(1048576); // 1 MB
NumberFormatter.formatFileSize(1536); // 1.50 KB

console.log("\n--- Serial Number Generation ---");
NumberFormatter.generateSerialNumber(["ABC", 12, 2024]);
NumberFormatter.generateSerialNumber([5, "XYZ", 99]);


/**
 * Ex 3: Array and Object Representation
*/
class DataRepresentation {
    static arrayToString(arr, separator = ", ") {
        console.log(`📋 Converting array to string:`, arr);

        const stringRepresentation = arr.toString();
        const customRepresentation = arr.join(separator);

        console.log(`✅ toString(): ${stringRepresentation}`);
        console.log(`✅ join("${separator}"): ${customRepresentation}`);

        return {
            toString: stringRepresentation,
            custom: customRepresentation
        };
    }

    static createReadableList(items, conjunction = "and") {
        console.log("📝 Creating readable list...");

        if (items.length === 0) {
            console.log("✅ Empty list");
            return "";
        }

        if (items.length === 1) {
            console.log(`✅ Single item: ${items[0]}`);
            return String(items[0]);
        }

        const allButLast = items.slice(0, -1).map(String);
        const lastItem = String(items[items.length - 1]);

        const readableList = allButLast.join(", ") + ` ${conjunction} ${lastItem}`;

        console.log(`✅ Readable list: ${readableList}`);
        return readableList;
    }

    static objectToDebugString(obj) {
        console.log("🔍 Creating debug string for object...");

        const debugInfo = [];

        for (const [key, value] of Object.entries(obj)) {
            let valueStr;

            if (value === null) {
                valueStr = "null";
            } else if (value === undefined) {
                valueStr = "undefined";
            } else if (typeof value === 'object') {
                valueStr = `{${Object.keys(value).join(', ')}}`;
            } else {
                valueStr = String(value);
            }

            debugInfo.push(`${key}: ${valueStr}`);
        }

        const debugString = `{ ${debugInfo.join(', ')} }`;
        console.log(`✅ Debug string: ${debugString}`);
        return debugString;
    }

    static formatBooleanForDisplay(value, options = {}) {
        console.log(`🔘 Formatting boolean: ${value}`);

        const {
            trueText = "Yes",
            falseText = "No",
            capitalize = true
        } = options;

        let displayText = value ? trueText : falseText;

        if (capitalize) {
            displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);
        }

        console.log(`✅ Display text: ${displayText}`);
        return displayText;
    }
}

// Usage
console.log("--- Array String Conversion ---");
DataRepresentation.arrayToString([1, 2, 3, 4, 5]);
DataRepresentation.arrayToString(["Apple", "Banana", "Orange"], " | ");

console.log("\n--- Readable List Creation ---");
DataRepresentation.createReadableList(["JavaScript", "Python", "Java"]);
DataRepresentation.createReadableList(["Rahul"]);
DataRepresentation.createReadableList([]);

console.log("\n--- Object Debug String ---");
const user = {
    name: "Rahul",
    age: 25,
    isActive: true,
    preferences: { theme: "dark", language: "en" },
    lastLogin: null
};
DataRepresentation.objectToDebugString(user);

console.log("\n--- Boolean Display Formatting ---");
DataRepresentation.formatBooleanForDisplay(true);
DataRepresentation.formatBooleanForDisplay(false, { trueText: "Active", falseText: "Inactive" });
DataRepresentation.formatBooleanForDisplay(true, { capitalize: false });

