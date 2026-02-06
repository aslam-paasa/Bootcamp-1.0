/**
 * repeat() - String Repetition 
 * > repeat() string ko specified number of times repeat karta hai.
*/

/**
 * Ex 1: Basic Repeat Operations
*/
const text = "Hello";

console.log("🔤 Original:", text);

// ✅ Basic repetition
console.log(`repeat(3): "${text.repeat(3)}"`); // "HelloHelloHello"
console.log(`repeat(2): "${text.repeat(2)}"`); // "HelloHello"

// ✅ With spaces
console.log(`repeat with spaces: "${(text + " ").repeat(3)}"`); // "Hello Hello Hello "

// ✅ Zero repetition
console.log(`repeat(0): "${text.repeat(0)}"`); // ""


/**
 * Ex 2: Real World - Pattern Generation
*/
class PatternGenerator {
    static generateSeparator(length = 50, char = "-") {
        console.log(`📏 Generating separator: ${length} chars of ${char}`);
        
        const separator = char.repeat(length);
        console.log(`✅ Separator: ${separator}`);
        return separator;
    }
    
    static createLoadingDots(maxDots = 3, speed = 500) {
        console.log("⏳ Creating loading animation...");
        
        for (let i = 0; i <= maxDots; i++) {
            const dots = '.'.repeat(i);
            console.log(`Loading${dots}`);
        }
        
        const finalDots = '.'.repeat(maxDots);
        console.log(`✅ Loading${finalDots} Complete!`);
        return finalDots;
    }
    
    static generateProgressIndicator(current, total, width = 20) {
        console.log(`📊 Progress: ${current}/${total}`);
        
        const percentage = (current / total) * 100;
        const filled = Math.round((current / total) * width);
        const empty = width - filled;
        
        const bar = '█'.repeat(filled) + '░'.repeat(empty);
        console.log(`✅ Progress: [${bar}] ${percentage.toFixed(1)}%`);
        
        return bar;
    }
    
    static createTextArt(text, borderChar = "*") {
        console.log(`🎨 Creating text art: "${text}"`);
        
        const textLength = text.length;
        const border = borderChar.repeat(textLength + 4);
        
        const art = [
            border,
            `${borderChar} ${text} ${borderChar}`,
            border
        ].join('\n');
        
        console.log(`✅ Text art:\n${art}`);
        return art;
    }
}

// Usage
console.log("--- Pattern Generation ---");
PatternGenerator.generateSeparator(30);
PatternGenerator.generateSeparator(20, "=");
PatternGenerator.generateSeparator(15, "*");

console.log("\n--- Loading Animation ---");
PatternGenerator.createLoadingDots();

console.log("\n--- Progress Indicator ---");
PatternGenerator.generateProgressIndicator(7, 10);
PatternGenerator.generateProgressIndicator(3, 8);

console.log("\n--- Text Art ---");
PatternGenerator.createTextArt("HELLO");
PatternGenerator.createTextArt("WELCOME", "#");


/**
 * Ex 3: Data Visualization
*/
class DataVisualizer {
    static createBarChart(data, maxWidth = 40) {
        console.log("📈 Creating bar chart...");
        
        // Find maximum value for scaling
        const maxValue = Math.max(...data.map(item => item.value));
        
        const chart = data.map(item => {
            const barWidth = Math.round((item.value / maxValue) * maxWidth);
            const bar = '█'.repeat(barWidth);
            return `${item.label.padEnd(15, '.')} ${bar} ${item.value}`;
        }).join('\n');
        
        console.log(`✅ Bar chart:\n${chart}`);
        return chart;
    }
    
    static generateHistogram(values, char = "■") {
        console.log("📊 Generating histogram...");
        
        // Count frequency of each value
        const frequency = {};
        values.forEach(value => {
            frequency[value] = (frequency[value] || 0) + 1;
        });
        
        const maxFreq = Math.max(...Object.values(frequency));
        const histogram = Object.entries(frequency)
            .map(([value, count]) => {
                const bar = char.repeat(count);
                return `${value}: ${bar} (${count})`;
            })
            .join('\n');
        
        console.log(`✅ Histogram:\n${histogram}`);
        return histogram;
    }
    
    static createSparkline(values, width = 20) {
        console.log("📉 Creating sparkline...");
        
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1; // Avoid division by zero
        
        // Normalize values to fit in width
        const normalized = values.map(value => 
            Math.round(((value - min) / range) * (width - 1))
        );
        
        // Create sparkline using block characters
        const blocks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
        const sparkline = normalized.map(height => 
            blocks[Math.min(height, blocks.length - 1)]
        ).join('');
        
        console.log(`✅ Sparkline: ${sparkline}`);
        return sparkline;
    }
}

// Usage
console.log("--- Bar Chart ---");
const salesData = [
    { label: "January", value: 150 },
    { label: "February", value: 200 },
    { label: "March", value: 120 },
    { label: "April", value: 300 }
];
DataVisualizer.createBarChart(salesData);

console.log("\n--- Histogram ---");
const testScores = [85, 90, 78, 92, 85, 88, 90, 78, 85, 92];
DataVisualizer.generateHistogram(testScores);

console.log("\n--- Sparkline ---");
const stockPrices = [100, 105, 98, 110, 95, 108, 102, 115, 100, 120];
DataVisualizer.createSparkline(stockPrices);