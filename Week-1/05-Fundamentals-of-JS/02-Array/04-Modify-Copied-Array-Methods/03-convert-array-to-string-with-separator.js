/**
 * Step 3: join() - Array Ko String Mein Convert Karna
 * > join() array ke elements ko string mein convert karta hai with 
 *   specified separator.
 * 
 * Syntax: array.join(separator) // default separator is comma
*/



/**
 * Example 1: Basic Joining
*/

const fruits = ["Apple", "Banana", "Orange"];

console.log("🍎 Fruits array:", fruits);

/* Default join (comma) */
const defaultJoin = fruits.join();
console.log("Default join:", defaultJoin); /* "Apple,Banana,Orange" */

/* Space se join */
const spaceJoin = fruits.join(" ");
console.log("Space join:", spaceJoin); /* "Apple Banana Orange" */

/* Hyphen se join */
const hyphenJoin = fruits.join(" - ");
console.log("Hyphen join:", hyphenJoin); /* "Apple - Banana - Orange" */

/* No separator */
const noSeparator = fruits.join("");
console.log("No separator:", noSeparator); /* "AppleBananaOrange" */



/**
 * Example 2: Real World - CSV Generation
*/

class CSVGenerator {
    static generateCSV(data) {
        if (!Array.isArray(data) || data.length === 0) {
            console.log("❌ No data to generate CSV");
            return "";
        }
        
        /* Headers */
        const headers = Object.keys(data[0]);
        const headerRow = headers.join(",");
        
        /* Data rows */
        const dataRows = data.map(item => 
            headers.map(header => item[header]).join(",")
        );
        
        /* Combine header and data */
        const csvContent = [headerRow, ...dataRows].join("\n");
        
        console.log("📊 Generated CSV:");
        console.log(csvContent);
        
        return csvContent;
    }
    
    static generateReadableList(items, separator = ", ", lastSeparator = " and ") {
        if (items.length === 0) return "";
        if (items.length === 1) return items[0];
        
        const allButLast = items.slice(0, -1).join(separator);
        const lastItem = items[items.length - 1];
        
        return `${allButLast}${lastSeparator}${lastItem}`;
    }
}

/* Usage */
const students = [
    { name: "Rahul", age: 20, grade: "A" },
    { name: "Priya", age: 19, grade: "B" },
    { name: "Amit", age: 21, grade: "A" }
];

CSVGenerator.generateCSV(students);

const fruitsList = ["Apple", "Banana", "Orange", "Mango"];
console.log("Natural language list:", CSVGenerator.generateReadableList(fruitsList)); 
/* "Apple, Banana, Orange and Mango" */