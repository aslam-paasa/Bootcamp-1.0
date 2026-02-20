/**
 * Shallow Copy means:
 * - Sirf upar-upar se copy hoti hai (top-level copy). 
 * - Agar array ke andar primitive values (number, string, boolean) hain,
 *   to unki exact copy milti hai.
 * - Lekin agar array k andr objects, arrays, ya fns hai to unka reference 
 *   copy hota hai, value nhi.
 * - Agar original array mein koi change hota hai:
 *   a. Agar change primitive value par hota hai, to copied array mein 
 *      koi farak nahi padega.
 *   b. Agar change non-primitive value (like object ya array) ke andar hota hai,
 *      to copied array bhi affected hoga, kyunki reference same hai.
*/ 
    
/**
 * Example: Student Records System using slice():
 * 
 * Imagine ek school ka database hai jisme students ke records hain
 * Har student ka naam, age, aur marks ka object hai
*/
const students = [
    { 
        name: "Rahul", 
        age: 15,
        marks: {
            math: 85,
            science: 90
        }
    },
    { 
        name: "Priya", 
        age: 16,
        marks: {
            math: 95,
            science: 88
        }
    }
];

/**
 * Shallow copy using slice():
 * Ab hum students array ka ek copy banayenge
 */
const studentsCopy = students.slice();

/**
 * Primitive value change - age (won't affect original)
 * Age ek primitive value hai (number), isliye original array mein change nahi hoga
 */
studentsCopy[0].age = 16;
console.log("After changing age:");
console.log("Original:", students[0].age);     // Still 15
console.log("Copy:", studentsCopy[0].age);     // Changed to 16

/**
 * Non-primitive value change - marks (will affect original)
 * Marks ek object hai (non-primitive), isliye original array bhi change hoga
 */
studentsCopy[0].marks.math = 95;
console.log("\nAfter changing marks:");
console.log("Original:", students[0].marks.math);     // Changed to 95
console.log("Copy:", studentsCopy[0].marks.math);     // Changed to 95



/**
 * Shallow Copy using spread operator:
 * Spread operator (...) ka use karke bhi shallow copy bana sakte hain
*/
const studentsCopy2 = [...students];

/**
 * Primitive value change - age (won't affect original)
 */
studentsCopy2[1].age = 17;
console.log("\nAfter changing age in copy2:");
console.log("Original:", students[1].age);     // Still 16
console.log("Copy2:", studentsCopy2[1].age);   // Changed to 17

/**
 * Non-primitive value change - marks (will affect original)
 */
studentsCopy2[1].marks.science = 95;
console.log("\nAfter changing marks in copy2:");
console.log("Original:", students[1].marks.science);     // Changed to 95
console.log("Copy2:", studentsCopy2[1].marks.science);   // Changed to 95

/**
 * Final state of both arrays:
 */
console.log("\nFinal state:");
console.log("Original:", students);
console.log("Copy:", studentsCopy);
console.log("Copy2:", studentsCopy2);
