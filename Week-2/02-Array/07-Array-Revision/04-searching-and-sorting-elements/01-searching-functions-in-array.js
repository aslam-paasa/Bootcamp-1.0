/**
 * JavaScript mein Array Searching ke liye 6 main functions hain:
 * 1. indexOf()     - Simple search from start
 * 2. lastIndexOf() - Simple search from end
 * 3. includes()    - Check if value exists
 * 4. find()        - Complex search for first match
 * 5. findIndex()   - Complex search for first match's index
 * 6. filter()      - Complex search for all matches
 * 7. some()        - Check if any element satisfies the condition
 * 8. every()       - Check if all elements satisfy the condition
 */

/**
 * Ex: Student Marks Database
 */
const studentMarks = [85, 92, 78, 95, 88, 78, 90];

/**
 * 1. Simple Searching from start:
 *    - indexOf() : Finds first occurrence
 */
const first78Index = studentMarks.indexOf(78);  // Returns idx-2 (first 78)
console.log("First occurrence of 78:", first78Index);




/**
 * 2. Simple Search from end:
 *    - lastIndexOf() : Finds last occurrence
 */
const last78Index = studentMarks.lastIndexOf(78);  // Returns idx-5 (last 78)
console.log("Last occurrence of 78:", last78Index);



/**
 * 3. Check if value exists:
 *    - includes() : Checks if value exists
 */
const has95 = studentMarks.includes(95);  // Returns true
console.log("Is 95 present?", has95);



/**
 * 4. Complex Search for first match:
 *    - find() : Finds first student with marks > 90
 */
const firstTopper = studentMarks.find(marks => marks > 90);
console.log("First student with marks > 90:", firstTopper);  // Returns 92



/**
 * 5. Complex Search for first match's index:
 *    - findIndex() : Finds index of first student with marks > 90
 */
const topperIndex = studentMarks.findIndex(marks => marks > 90);
console.log("Index of first student with marks > 90:", topperIndex);  // Returns 1


/**
 * 6. Complex Search for all matches:
 *    - filter() : Finds all students with marks > 85
 */
const goodPerformers = studentMarks.filter(marks => marks > 85);
console.log("All students with marks > 85:", goodPerformers);  // Returns [85, 92, 95, 88, 90]



/**
 * 7. Check if any element satisfies the condition:
 *    - some() : Checks if any element satisfies the condition
 */
const hasAnyTopper = studentMarks.some(marks => marks > 90);
console.log("Is there any topper?", hasAnyTopper);  // Returns true



/**
 * 8. Check if all elements satisfy the condition:
 *    - every() : Checks if all elements satisfy the condition
 */
const allToppers = studentMarks.every(marks => marks > 85);
console.log("Are all students toppers?", allToppers);  // Returns false


/**
 * Summary:
 * 1. Simple Search (indexOf, lastIndexOf, includes):
 *    - Jab aapko exact value search karni ho
 *    - Example: "Kya 78 marks wala koi student hai?"
 * 
 * 2. Complex Search (find, findIndex):
 *    - Jab aapko condition ke hisab se search karna ho
 *    - Example: "90 se zyada marks wala pehla student kaun hai?"
 * 
 * 3. Multiple Results (filter):
 *    - Jab aapko condition ke hisab se saare matches chahiye hon
 *    - Example: "85 se zyada marks wale saare students kaun hain?"
 * 
 * 4. Check if any element satisfies the condition:
 *    - some() : Checks if any element satisfies the condition
 * 
 * 5. Check if all elements satisfy the condition:
 *    - every() : Checks if all elements satisfy the condition
 */