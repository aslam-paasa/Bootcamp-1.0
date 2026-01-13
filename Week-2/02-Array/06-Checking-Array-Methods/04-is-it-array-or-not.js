/**
 * Step 4: Array.isArray() - Type Checking
 * > Array.isArray() check karta hai ki given value array hai ya nahi.
 * > Why needed? typeof operator arrays ke liye sahi se kaam nahi karta.
 * > Syntax: Array.isArray(value)
*/


/**
 * Example 1: Basic Type Checking
*/

/* Different values check karein */
const realArray = [1, 2, 3];
const stringValue = "hello";
const numberValue = 42;
const objectValue = { key: "value" };
const nullValue = null;

console.log("realArray is array?", Array.isArray(realArray));     // true
console.log("stringValue is array?", Array.isArray(stringValue)); // false
console.log("numberValue is array?", Array.isArray(numberValue)); // false
console.log("objectValue is array?", Array.isArray(objectValue)); // false
console.log("nullValue is array?", Array.isArray(nullValue));     // false


/**
 * Example 2: typeof vs Array.isArray
*/

/* ❌ typeof problem with arrays */
const arr = [1, 2, 3];
console.log("typeof arr:", typeof arr);                 // "object" 😕

/* ✅ Array.isArray() - Correct checking */
console.log("Array.isArray(arr):", Array.isArray(arr)); // true ✅

const obj = { 0: 1, 1: 2, 2: 3, length: 3 };
console.log("typeof obj:", typeof obj);                 // "object"
console.log("Array.isArray(obj):", Array.isArray(obj)); // false ✅



/**
 * Real World Validation:
*/

/* Function jo array input leti hai */
function processStudentScores(scores) {
    /* Validation check */
    if (!Array.isArray(scores)) {
        console.log("❌ Error: Scores should be an array");
        return;
    }
    
    if (scores.length === 0) {
        console.log("⚠️ Warning: No scores provided");
        return;
    }
    
    /* Process scores */
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / scores.length;
    
    console.log(`📊 Total students: ${scores.length}`);
    console.log(`📈 Average score:  ${average.toFixed(2)}`);
    console.log(`🎯 Highest score:  ${Math.max(...scores)}`);
}

/* Test cases */
processStudentScores([85, 92, 78, 96, 88]);  // ✅ Works
processStudentScores("not an array");        // ❌ Error
processStudentScores([]);                    // ⚠️ Warning
processStudentScores({ scores: [1, 2, 3] }); // ❌ Error



/**
 * Real World Example: API Response Validation
*/

/* API se data receive karna aur validate karna */
function handleApiResponse(response) {
    console.log("🔍 Validating API response...");
    
    /* Check if response is array */
    if (!Array.isArray(response)) {
        console.log("❌ Invalid response: Expected array");
        return [];
    }
    
    /* Check if array has valid data */
    const validData = response.filter(item => 
        item && typeof item === 'object' && item.id && item.name
    );
    
    console.log(`✅ Valid items: ${validData.length}/${response.length}`);
    return validData;
}

/* Mock API responses */
const validResponse = [
    { id: 1, name: "Rahul", age: 25 },
    { id: 2, name: "Priya", age: 23 }
];

const invalidResponse = "Not an array";
const mixedResponse = [
    { id: 1, name: "Amit" },
    { invalid: "data" },
    null,
    { id: 2, name: "Neha" }
];

console.log("Test 1 - Valid response:");
handleApiResponse(validResponse);

console.log("\nTest 2 - Invalid response:");
handleApiResponse(invalidResponse);

console.log("\nTest 3 - Mixed response:");
handleApiResponse(mixedResponse);