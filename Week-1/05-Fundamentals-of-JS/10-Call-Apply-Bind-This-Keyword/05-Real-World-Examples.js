/**
 * Same Example - Different Methods
*/

function showStudentInfo(subject1, subject2, grade) {
    console.log(`
    Student: ${this.name}
    Age: ${this.age}
    Subjects: ${subject1}, ${subject2}
    Grade: ${grade}
    `);
}

const studentObject = { name: "Amit", age: 20 };

console.log("1. Using call():");
showStudentInfo.call(studentObject, "Math", "Science", "A");

console.log("2. Using apply():");
showStudentInfo.apply(studentObject, ["Math", "Science", "A"]);

console.log("3. Using bind():");
const boundFunc = showStudentInfo.bind(studentObject);
boundFunc("Math", "Science", "A");



/**
 * Real World Example:
*/

/**
 * Ex-1: E-commerce - Different Tax Calculations
*/
function calculateFinalPrice(price, discount, taxRate) {
    const discountedPrice = price - (price * discount / 100);
    const finalPrice = discountedPrice + (discountedPrice * taxRate / 100);
    
    console.log(`
    ${this.category} - ${this.productName}
    Original Price: ₹${price}
    After ${discount}% discount: ₹${discountedPrice}
    After ${taxRate}% tax: ₹${finalPrice}
    `);
}

const electronics = { category: "Electronics", productName: "Smartphone" };
const clothing = { category: "Clothing", productName: "T-Shirt" };
const books = { category: "Books", productName: "JavaScript Guide" };

/* Different tax rates for different categories */
calculateFinalPrice.call(electronics, 25000, 10, 18);
calculateFinalPrice.apply(clothing, [1500, 20, 12]);
const calculateBookPrice = calculateFinalPrice.bind(books);
calculateBookPrice(500, 15, 5);


/**
 * Example-2: Student Management System
*/
function addMarks(...newMarks) {
    this.marks = this.marks || [];
    this.marks.push(...newMarks);
    
    const total = this.marks.reduce((sum, mark) => sum + mark, 0);
    const average = total / this.marks.length;
    
    console.log(`
    ${this.name} ke marks: ${this.marks.join(', ')}
    Total: ${total}, Average: ${average.toFixed(2)}
    `);
}

const student1 = { name: "Rahul", marks: [85, 90] };
const student2 = { name: "Priya", marks: [78, 82] };

/* call() - individual arguments */
addMarks.call(student1, 88, 92);

/* apply() - array arguments */
addMarks.apply(student2, [85, 90, 95]);

/* bind() - for repeated use */
const addMarksToRahul = addMarks.bind(student1);
addMarksToRahul(95, 98);


/**
 * Example-3: Utility Functions Library
*/

/* Utility functions jo kisi bhi object ke saath use ho sakte hain */
const utilities = {
    formatCurrency: function(amount) {
        return `₹${amount.toLocaleString('en-IN')}`;
    },
    
    getSummary: function() {
        return `
        Product: ${this.name}
        Price: ${this.formatCurrency(this.price)}
        Category: ${this.category}
        In Stock: ${this.inStock ? 'Yes' : 'No'}
        `;
    }
};

const products = [
    { name: "Laptop", price: 75000, category: "Electronics", inStock: true },
    { name: "Desk", price: 12000, category: "Furniture", inStock: false },
    { name: "Book", price: 500, category: "Education", inStock: true }
];

/* Har product ke liye summary generate karo */
products.forEach(product => {
    const summary = utilities.getSummary.call(product);
    console.log(summary);
});
