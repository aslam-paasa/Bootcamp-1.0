/**
 * Step 8: at() - Access Element by Index
 * > at() positive aur negative dono indexes support karta hai element 
 *   access ke liye.
 * > Syntax: array.at(index)
*/


/**
 * array[index] vs array.at(index) comparison:
 */

const fruits = ["Apple", "Banana", "Orange", "Mango"];

console.log("🍎 Fruits:", fruits);

/* Positive indexes - same as array[index] */
console.log("fruits[0]:", fruits[0]);     // "Apple"
console.log("fruits.at(0):", fruits.at(0)); // "Apple"

console.log("fruits[2]:", fruits[2]);     // "Orange"  
console.log("fruits.at(2):", fruits.at(2)); // "Orange"

/* Negative indexes - NEW FEATURE! */
console.log("fruits.at(-1):", fruits.at(-1)); // "Mango" (last element)
console.log("fruits.at(-2):", fruits.at(-2)); // "Orange" (second last)
console.log("fruits.at(-3):", fruits.at(-3)); // "Banana"

/* Traditional way for last element (verbose) */
console.log("fruits[fruits.length - 1]:", fruits[fruits.length - 1]); // "Mango"



/**
 * Example 1: Circular Navigation
*/

class CircularList {
    constructor(items) {
        this.items = items;
    }
    
    getNext(currentIndex) {
        /* Circular next - agar last element hai toh first par chala jaye */
        return this.items.at((currentIndex + 1) % this.items.length);
    }
    
    getPrevious(currentIndex) {
        /* Circular previous - agar first element hai toh last par chala jaye */
        return this.items.at((currentIndex - 1 + this.items.length) % this.items.length);
    }
    
    getRelative(index, offset) {
        /* Kisi bhi index se relative position par element */
        return this.items.at((index + offset) % this.items.length);
    }
}

/* Usage */
const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
const carousel = new CircularList(slides);

console.log("🔄 Circular Navigation:");
console.log("Next from index 0:", carousel.getNext(0));               // "Slide 2"
console.log("Next from index 3:", carousel.getNext(3));               // "Slide 1" (circular)
console.log("Previous from index 0:", carousel.getPrevious(0));       // "Slide 4" (circular)
console.log("Relative +2 from index 1:", carousel.getRelative(1, 2)); // "Slide 3"



/**
 * Example 2: Safe Array Access
*/

function getSafeElement(arr, position) {
    /* at() automatically handles out-of-bounds gracefully */
    const element = arr.at(position);
    
    if (element === undefined) {
        console.log(`⚠️ Position ${position} out of bounds. Array length: ${arr.length}`);
        return null;
    }
    
    return element;
}

/* Test with different positions */
const colors = ["Red", "Green", "Blue"];

console.log("🎨 Safe Array Access:");
console.log("Position 1:", getSafeElement(colors, 1));    // "Green"
console.log("Position -1:", getSafeElement(colors, -1));  // "Blue" 
console.log("Position 5:", getSafeElement(colors, 5));    // null (out of bounds)
console.log("Position -5:", getSafeElement(colors, -5));  // null (out of bounds)