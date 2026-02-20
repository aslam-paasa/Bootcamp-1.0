/**
 * Step 1: flat() - Nested Arrays Ko Flat Karna
 * > flat() nested arrays ko specified depth tak flatten karta hai.
 * > Syntax: array.flat(depth) => default depth = 1
*/


/**
 * Example 1: Basic Flattening
*/

const nestedArray = [1, 2, [3, 4], [5, [6, 7]]];

console.log("🎯 Original nested array:", nestedArray);

/* Default depth (1 level) */
const flat1 = nestedArray.flat();
console.log("flat() - depth 1:", flat1); // [1, 2, 3, 4, 5, [6, 7]]

/* Depth 2 (sab flatten) */
const flat2 = nestedArray.flat(2);
console.log("flat(2) - depth 2:", flat2); // [1, 2, 3, 4, 5, 6, 7]

/* Automatic deep flattening */
const deepFlat = nestedArray.flat(Infinity);
console.log("flat(Infinity):", deepFlat); // [1, 2, 3, 4, 5, 6, 7]



/**
 * Example 2: Real World - Multi-Level Categories
*/

const productCategories = [
    "Electronics",
    ["Mobile", ["Smartphone", "Tablet", "Accessories"]],
    "Clothing", 
    ["Men", ["Shirts", "Pants", "Shoes"]],
    ["Women", ["Dresses", "Bags", "Jewelry"]],
    "Home & Kitchen"
];

console.log("🏷️ Product Categories Structure:");
console.log(JSON.stringify(productCategories, null, 2));

/* Flatten karke saare categories ek list mein lao */
const allCategories = productCategories.flat(Infinity);
console.log("📋 All Categories (flat):", allCategories);

/* Specific depth se flatten karo */
const level1Categories = productCategories.flat(1);
console.log("Level 1 Categories:", level1Categories);

/* Count total categories */
console.log("Total unique categories:", allCategories.length);



/**
 * Example 3: Data Cleaning - Empty Slots Remove Karna
*/

const messyArray = [1, 2, , , 3, , 4, , 5];

console.log("🧹 Messy array with empty slots:", messyArray);
console.log("Length:", messyArray.length); // 9 (empty slots included)

/* flat() automatically empty slots remove karta hai */
const cleanedArray = messyArray.flat();
console.log("Cleaned with flat():", cleanedArray); // [1, 2, 3, 4, 5]
console.log("Cleaned length:", cleanedArray.length); // 5

/* Compare with filter */
const filteredArray = messyArray.filter(item => item !== undefined);
console.log("Cleaned with filter():", filteredArray); // Same result



/**
 * Example 4: Student Marks Processing
*/

class StudentMarksProcessor {
    constructor() {
        this.studentMarks = [
            {
                name: "Rahul",
                subjects: [
                    { name: "Math", marks: [85, 90, 88] },
                    { name: "Science", marks: [92, 87, 95] }
                ]
            },
            {
                name: "Priya", 
                subjects: [
                    { name: "Math", marks: [78, 82, 80] },
                    { name: "Science", marks: [88, 85, 90] }
                ]
            }
        ];
    }
    
    getAllMarks() {
        /* Sabhi students ke saare marks ek array mein */
        const allMarks = this.studentMarks.flatMap(student =>
            student.subjects.flatMap(subject => subject.marks)
        );
        
        console.log("📊 All marks:", allMarks);
        return allMarks;
    }
    
    getSubjectNames() {
        /* Sabhi subjects ke names */
        const allSubjects = this.studentMarks.flatMap(student =>
            student.subjects.map(subject => subject.name)
        );
        
        const uniqueSubjects = [...new Set(allSubjects)];
        console.log("📚 All subjects:", uniqueSubjects);
        return uniqueSubjects;
    }
    
    calculateOverallAverage() {
        const allMarks = this.getAllMarks();
        const total = allMarks.reduce((sum, mark) => sum + mark, 0);
        const average = total / allMarks.length;
        
        console.log(`🎯 Overall average: ${average.toFixed(2)}`);
        return average;
    }
}

/* Usage */
const processor = new StudentMarksProcessor();
processor.getAllMarks();
processor.getSubjectNames();
processor.calculateOverallAverage();