/**
 * padStart() & padEnd() - String Padding 
 * > padStart() - String ko start mein padding add karta hai
 * > padEnd()   - String ko end mein padding add karta hai
*/


/**
 * Ex 1: Basic Padding Operations
*/
const text = "Hello";

console.log("🔤 Original:", text);

// ✅ padStart() - add padding at start
console.log(`padStart(10, "*"): "${text.padStart(10, "*")}"`); // "*****Hello"
console.log(`padStart(8, "123"): "${text.padStart(8, "123")}"`); // "123Hello"

// ✅ padEnd() - add padding at end  
console.log(`padEnd(10, "-"): "${text.padEnd(10, "-")}"`); // "Hello-----"
console.log(`padEnd(12, "!?"): "${text.padEnd(12, "!?")}"`); // "Hello!?!?!?!"

// ✅ Default padding (space)
console.log(`padStart(10): "${text.padStart(10)}"`); // "     Hello"


/**
 * Ex 2: Real World - Data Formatting
*/
class DataFormatter {
    static formatID(id, length = 6) {
        console.log(`🆔 Formatting ID: ${id}`);

        const formatted = id.toString().padStart(length, '0');
        console.log(`✅ Formatted ID: ${formatted}`);
        return formatted;
    }

    static createProgressBar(percentage, length = 20) {
        console.log(`📊 Creating progress bar: ${percentage}%`);

        const filled = Math.round((percentage / 100) * length);
        const empty = length - filled;

        const bar = '█'.repeat(filled) + '░'.repeat(empty);
        const padded = `[${bar}]`.padEnd(length + 3, ' ');

        console.log(`✅ Progress: ${padded} ${percentage}%`);
        return padded + ` ${percentage}%`;
    }

    static alignColumns(data, columnWidth = 15) {
        console.log("📋 Aligning columns...");

        const aligned = data.map(row =>
            row.map(cell =>
                cell.toString().padEnd(columnWidth, ' ')
            ).join(' | ')
        ).join('\n');

        console.log(`✅ Aligned columns:\n${aligned}`);
        return aligned;
    }

    static formatTime(hours, minutes, seconds) {
        console.log(`⏰ Formatting time: ${hours}:${minutes}:${seconds}`);

        const formatted = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');

        console.log(`✅ Formatted time: ${formatted}`);
        return formatted;
    }
}

// Usage
console.log("--- ID Formatting ---");
DataFormatter.formatID(42);
DataFormatter.formatID(1234, 8);

console.log("\n--- Progress Bars ---");
DataFormatter.createProgressBar(75);
DataFormatter.createProgressBar(25);
DataFormatter.createProgressBar(100);

console.log("\n--- Column Alignment ---");
const tableData = [
    ["Name", "Age", "City"],
    ["Rahul", "25", "Delhi"],
    ["Priya", "30", "Mumbai"],
    ["Amit", "28", "Bangalore"]
];
DataFormatter.alignColumns(tableData);

console.log("\n--- Time Formatting ---");
DataFormatter.formatTime(9, 5, 3);
DataFormatter.formatTime(14, 30, 45);


/**
 * Ex 3: Receipt Generator
*/
class ReceiptGenerator {
    static generateReceipt(items, total) {
        console.log("🧾 Generating receipt...");

        const receipt = [];
        const lineLength = 30;

        // Header
        receipt.push("=".repeat(lineLength));
        receipt.push("RECEIPT".padStart((lineLength + 7) / 2).padEnd(lineLength));
        receipt.push("=".repeat(lineLength));

        // Items
        items.forEach(([item, price]) => {
            const itemPart = item.padEnd(20, '.');
            const pricePart = `$${price.toFixed(2)}`.padStart(8);
            receipt.push(itemPart + pricePart);
        });

        // Separator
        receipt.push("-".repeat(lineLength));

        // Total
        const totalText = "TOTAL:";
        const totalAmount = `$${total.toFixed(2)}`;
        receipt.push(totalText.padEnd(22, '.') + totalAmount.padStart(8));

        // Footer
        receipt.push("=".repeat(lineLength));

        const finalReceipt = receipt.join('\n');
        console.log(`✅ Receipt:\n${finalReceipt}`);
        return finalReceipt;
    }

    static formatCurrency(amount, currency = 'USD') {
        console.log(`💰 Formatting currency: ${amount}`);

        const symbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'INR': '₹'
        };

        const symbol = symbols[currency] || currency;
        const formatted = `${symbol}${Math.abs(amount).toFixed(2)}`;

        // Pad for alignment in statements
        const padded = amount >= 0 ?
            formatted.padStart(10, ' ') :
            `-${formatted}`.padStart(10, ' ');

        console.log(`✅ Formatted: ${padded}`);
        return padded;
    }
}

// Usage
console.log("--- Receipt Generation ---");
const items = [
    ["Coffee", 4.50],
    ["Sandwich", 8.75],
    ["Cookie", 2.25],
    ["Tax", 1.20]
];
ReceiptGenerator.generateReceipt(items, 16.70);

console.log("\n--- Currency Formatting ---");
ReceiptGenerator.formatCurrency(42.50);
ReceiptGenerator.formatCurrency(-15.75);
ReceiptGenerator.formatCurrency(1234.56, 'INR');