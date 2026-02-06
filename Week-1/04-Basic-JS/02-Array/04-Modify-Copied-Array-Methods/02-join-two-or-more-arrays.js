/**
 * Step 2: concat() - Multiple Arrays Ko Join Karna
 * > concat() do ya zyada arrays ko join karke naya array return karta hai.
 * 
 * Syntax: const newArray = array1.concat(array2, array3, ...)
*/



/**
 * Example 1: Basic Concatenation
*/

const fruits = ["Apple", "Banana"];
const vegetables = ["Carrot", "Potato"];
const grains = ["Rice", "Wheat"];

console.log("🍎 Fruits:", fruits);
console.log("🥕 Vegetables:", vegetables);
console.log("🌾 Grains:", grains);

/* Sabhi arrays ko combine karo */
const allFood = fruits.concat(vegetables, grains);
console.log("All food items:", allFood);
/* ["Apple", "Banana", "Carrot", "Potato", "Rice", "Wheat"] */

/* Original arrays unchanged */
console.log("Fruits after concat:", fruits); /* Same */



/**
 * Example 2: Real World - Data Merging
*/

class StudentManager {
    constructor() {
        this.scienceStudents = ["Rahul", "Priya", "Amit"];
        this.commerceStudents = ["Neha", "Raj", "Sonia"];
        this.artsStudents = ["Karan", "Pooja"];
    }
    
    getAllStudents() {
        return this.scienceStudents.concat(this.commerceStudents, this.artsStudents);
    }
    
    addNewStudents(newStudents, stream) {
        console.log(`🎓 Adding ${newStudents.length} students to ${stream} stream`);
        
        const allStudents = this.getAllStudents();
        const updatedStudents = allStudents.concat(newStudents);
        
        console.log(`Total students now: ${updatedStudents.length}`);
        return updatedStudents;
    }
    
    createCombinedClass(stream1, stream2) {
        let combined = [];
        
        if (stream1 === "science") combined = combined.concat(this.scienceStudents);
        if (stream1 === "commerce") combined = combined.concat(this.commerceStudents);
        if (stream1 === "arts") combined = combined.concat(this.artsStudents);
        
        if (stream2 === "science") combined = combined.concat(this.scienceStudents);
        if (stream2 === "commerce") combined = combined.concat(this.commerceStudents);
        if (stream2 === "arts") combined = combined.concat(this.artsStudents);
        
        console.log(`👥 Combined ${stream1} + ${stream2}:`, combined);
        return combined;
    }
}

/* Usage */
const manager = new StudentManager();
console.log("All students:", manager.getAllStudents());

manager.addNewStudents(["Ravi", "Sunita"], "science");
manager.createCombinedClass("science", "commerce");