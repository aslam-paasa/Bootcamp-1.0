/**
 * Step 2: flatMap() - Map and Flatten in One Step
 * > flatMap() pehle har element par map function chalata hai, phir result 
 *   ko 1 level deep flatten karta hai.
 * > Syntax: 
 *   const result = array.flatMap(function(currentValue, index, array) {
 *       return mappedValue; // Can be array or single value
 *   });
*/



/**
 * Example: Basic flatMap vs Map Comparison
*/

const numbers = [1, 2, 3];

console.log("🔢 Original numbers:", numbers);

/* map() - nested arrays create karta hai */
const mapped = numbers.map(n => [n, n * 2]);
console.log("map() result:", mapped); // [[1, 2], [2, 4], [3, 6]]

/* flatMap() - automatically flatten karta hai */
const flatMapped = numbers.flatMap(n => [n, n * 2]);
console.log("flatMap() result:", flatMapped); // [1, 2, 2, 4, 3, 6]

/* Single values bhi return kar sakte hain */
const singleValues = numbers.flatMap(n => n * 2);
console.log("flatMap with single values:", singleValues); // [2, 4, 6]



/**
 * Example 2: Real World - Sentences ko Words mein Break Karna
*/

const sentences = [
    "Hello world",
    "JavaScript is awesome", 
    "Array methods are powerful",
    "Learn and grow"
];

console.log("💬 Original sentences:", sentences);

/* Har sentence ko words mein break karo aur flatten karo */
const allWords = sentences.flatMap(sentence => sentence.split(' '));
console.log("📝 All words:", allWords);

/* Filter karke specific words */
const longWords = sentences.flatMap(sentence => 
    sentence.split(' ').filter(word => word.length > 5)
);
console.log("🔤 Long words (>5 chars):", longWords);

/* Word count analysis */
const wordCount = allWords.length;
const uniqueWords = [...new Set(allWords.map(word => word.toLowerCase()))];
console.log(`📊 Total words: ${wordCount}, Unique words: ${uniqueWords.length}`);



/**
 * Example 3: E-commerce - Order Processing
*/

const orders = [
    {
        orderId: "ORD001",
        customer: "Rahul",
        items: [
            { product: "Laptop", quantity: 1, price: 50000 },
            { product: "Mouse", quantity: 2, price: 1500 }
        ]
    },
    {
        orderId: "ORD002", 
        customer: "Priya",
        items: [
            { product: "Phone", quantity: 1, price: 25000 },
            { product: "Case", quantity: 1, price: 500 },
            { product: "Charger", quantity: 1, price: 1500 }
        ]
    }
];

console.log("🛒 Original Orders:", orders);

/* Saare items ek array mein */
const allItems = orders.flatMap(order => order.items);
console.log("📦 All ordered items:", allItems);

/* Saare items ke total value */
const allItemsWithTotal = orders.flatMap(order =>
    order.items.map(item => ({
        ...item,
        orderId: order.orderId,
        customer: order.customer,
        total: item.quantity * item.price
    }))
);
console.log("💰 Items with totals:", allItemsWithTotal);

/* Revenue analysis */
const totalRevenue = allItemsWithTotal.reduce((sum, item) => sum + item.total, 0);
console.log(`💵 Total Revenue: ₹${totalRevenue}`);



/**
 * Example 4: Advanced Data Transformation Pipeline
*/

class DataTransformer {
    static transformStudentData(students) {
        return students.flatMap(student => {
            /* Har student ke liye multiple records banayein */
            return student.subjects.map(subject => ({
                studentName: student.name,
                subject: subject.name,
                averageMarks: subject.marks.reduce((a, b) => a + b) / subject.marks.length,
                grade: this.calculateGrade(subject.marks)
            }));
        });
    }
    
    static calculateGrade(marks) {
        const average = marks.reduce((a, b) => a + b) / marks.length;
        if (average >= 90) return 'A+';
        if (average >= 80) return 'A';
        if (average >= 70) return 'B';
        if (average >= 60) return 'C';
        return 'F';
    }
}

/* Usage */
const studentsData = [
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

console.log("🎓 Student Data Transformation:");
const transformedData = DataTransformer.transformStudentData(studentsData);
console.table(transformedData);