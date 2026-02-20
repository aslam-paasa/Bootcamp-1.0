/**
 * Objects ke through loop karna (Looping through Objects)
 * - Objects mein key-value pairs hote hain. Jaise ek student ka object:
 *   {
 *       name: "Rahul",
 *       age: 20,
 *       marks: 85
 *   }
 *
 * Yahan 'name', 'age', 'marks' keys hain aur "Rahul", 20, 85 values hain.
*/


/**
 * Ways to loop through objects:
 * 1. for...in loop    - Basic way to loop through object keys
 * 2. Object.keys()    - Sirf keys ko array mein convert karta hai
 * 3. Object.entries() - Keys aur values dono ko array mein convert karta hai
 * 4. Object.values()  - Sirf values ko array mein convert karta hai
*/

/**
 * Real World Example 1: Student Database
*/
const student = {
    name: "Rahul",
    rollNo: 101,
    subjects: ["Math", "Science", "English"],
    marks: {
        math: 85,
        science: 90,
        english: 88
    }
};



/**
 * Method 1: for...in loop
 * - Sabse basic aur purana tarika hai objects ke through loop karne ka
 * - Sirf keys ke through iterate karta hai
 * - Prototype properties ko bhi iterate karta hai (inherited properties)
 *
 * Kab use karein:
 * - Simple iteration ke liye
 * - Jab sirf keys chahiye ho
 * - Performance critical code mein (kyunki ye sabse fast hai)
 *
 * Kab na use karein:
 * - Jab prototype properties ko skip karna ho
 * - Jab keys aur values dono ek saath chahiye ho
 * - Jab array methods (map, filter etc.) use karne ho
*/

console.log("Using for...in loop:");
for(const key in student) {
    console.log(`${key}: ${student[key]}`);
}



/**
 * Real World Example 2: E-commerce Product
*/
const product = {
    id: "P001",
    name: "Smartphone",
    price: 15000,
    inStock: true,
    features: ["4G", "Dual Camera", "Fingerprint"]
};

/**
 * Method 2: Object.keys()
 * - Object ke keys ko array mein convert karta hai
 * - Prototype properties ko ignore karta hai
 * - Array methods (forEach, map, filter etc.) use kar sakte hain
 *
 * Kab use karein:
 * - Jab array methods use karne ho
 * - Jab sirf keys chahiye ho array format mein
 * - Jab prototype properties ko skip karna ho
 *
 * Kab na use karein:
 * - Jab performance critical code ho
 * - Jab keys aur values dono ek saath chahiye ho
*/

console.log("\nUsing Object.keys():");
Object.keys(product).forEach(key => {
    console.log(`Product ${key}: ${product[key]}`);
});

/**
 * Method 3: Object.entries()
 * ---------------------------
 * - Keys aur values dono ko array pairs mein convert karta hai
 * - Destructuring ka use karke clean code likh sakte hain
 * - Array methods use kar sakte hain
 *
 * Kab use karein:
 * - Jab keys aur values dono ek saath chahiye ho
 * - Jab array methods use karne ho
 * - Jab clean, modern code likhna ho
 *
 * Kab na use karein:
 * - Jab sirf keys chahiye ho
 * - Jab performance critical code ho
*/

console.log("\nUsing Object.entries():");
Object.entries(product).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

/**
 * Real World Example 3: Employee Management System
*/
const employee = {
    id: "E001",
    name: "Priya",
    department: "IT",
    salary: 50000,
    skills: ["JavaScript", "React", "Node.js"]
};

/**
 * Object.entries() with for...of loop
 * - Keys aur values dono ko array pairs mein convert karta hai
 * - Destructuring ka use karke clean code likh sakte hain
 * - Array methods use kar sakte hain
 *
 * Kab use karein:
 * - Jab keys aur values dono ek saath chahiye ho
 * - Jab array methods use karne ho
 * - Jab clean, modern code likhna ho


/**
 * Method 4: Object.values()
 * - Sirf values ko array mein convert karta hai
 * - Prototype properties ko ignore karta hai
 * - Array methods use kar sakte hain
 *
 * Kab use karein:
 * - Jab sirf values chahiye ho
 * - Jab performance critical code ho
 * 
 * Kab na use karein:
 * - Jab keys aur values dono ek saath chahiye ho
 * - Jab array methods use karne ho
 * - Jab clean, modern code likhna ho
*/

console.log("\nUsing Object.values():");

Object.values(employee).forEach(value => {
    console.log(`${value}`);
});


/**
 * Real World Example 4: Product Inventory
*/
const inventory = {
    id: "I001",
    name: "Laptop",
    price: 15000,
    quantity: 10,
    inStock: true
};






/**
 * Performance Comparison:
 * 1. for...in loop: Fastest but includes prototype properties
 * 2. Object.keys(): Medium speed, no prototype properties
 * 3. Object.entries(): Slowest but most flexible
 * 4. Object.values(): Sirf values ko array mein convert karta hai
 *
 * Best Practices: 
 * 1. Simple iteration     -> for...in 
 * 2. Array methods needed -> Object.keys() or Object.entries() 
 * 3. Keys + Values needed -> Object.entries() 
 * 4. Performance critical -> for...in
 * 5. Values needed        -> Object.values()
*/
