/**
 * Step 6: indexOf() - First Occurrence Index
 * > indexOf() - first occurrence ka index return karta hai
 * > Return -1 if value not found
 * > Syntax: array.indexOf(value, fromIndex)
*/



/**
 * Example 1: Basic Index Search
 */

const numbers = [10, 20, 30, 20, 40, 20, 50];

console.log("🔢 Numbers:", numbers);

/* indexOf - first occurrence */
console.log("indexOf(20):", numbers.indexOf(20)); // 1
console.log("indexOf(99):", numbers.indexOf(99)); // -1 (not found)

/* lastIndexOf - last occurrence */
console.log("lastIndexOf(20):", numbers.lastIndexOf(20)); // 5
console.log("lastIndexOf(20, 3):", numbers.lastIndexOf(20, 3)); // 3 (search up to index 3)

/* From specific index */
console.log("indexOf(20, 2):", numbers.indexOf(20, 2)); // 3



/**
 * Example 2: Real World - Duplicate Removal
*/

class ArrayUtils {
    static removeDuplicates(arr) {
        const unique = [];
        
        arr.forEach(item => {
            if (unique.indexOf(item) === -1) {
                unique.push(item);
            }
        });
        
        return unique;
    }
    
    static findAllIndexes(arr, value) {
        const indexes = [];
        let currentIndex = -1;
        
        while ((currentIndex = arr.indexOf(value, currentIndex + 1)) !== -1) {
            indexes.push(currentIndex);
        }
        
        return indexes;
    }
    
    static countOccurrences(arr, value) {
        return arr.filter(item => item === value).length;
    }
}

/* Usage */
const withDuplicates = [1, 2, 3, 2, 4, 2, 5, 3, 6];
console.log("Original:", withDuplicates);

const unique = ArrayUtils.removeDuplicates(withDuplicates);
console.log("Without duplicates:", unique);

const allTwos = ArrayUtils.findAllIndexes(withDuplicates, 2);
console.log("All indexes of 2:", allTwos);

const countTwos = ArrayUtils.countOccurrences(withDuplicates, 2);
console.log("Count of 2:", countTwos);