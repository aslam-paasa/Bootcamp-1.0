/**
 * Advance Patterns with Best Practices:
*/

/**
 * Pattern-1: Method Borrowing
*/

/* Ek object se method dusre object mein use karna */
const richMenu = {
    name: "Premium Menu",
    items: ["Pizza", "Pasta", "Burger"],
    showMenu: function() {
        console.log(`${this.name} mein available hain:`);
        this.items.forEach(item => console.log(`- ${item}`));
    }
};

const cheapMenu = {
    name: "Budget Menu", 
    items: ["Sandwich", "Salad", "Soup"]
};

/* richMenu ka method cheapMenu ke liye use karo */
richMenu.showMenu.call(cheapMenu);


/**
 * Pattern-2: Constructor Function Chaining
*/
function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Student(name, age, grade) {
    /* Person constructor ko call karo with Student context */
    Person.call(this, name, age);
    this.grade = grade;
}

function Teacher(name, age, subject) {
    /* Person constructor ko call karo with Teacher context */
    Person.apply(this, [name, age]);
    this.subject = subject;
}

const studentObj = new Student("Rahul", 20, "A");
const teacherObj = new Teacher("Mr. Sharma", 35, "Math");

console.log(studentObj); // Student { name: "Rahul", age: 20, grade: "A" }
console.log(teacherObj); // Teacher { name: "Mr. Sharma", age: 35, subject: "Math" }


/**
 * Pattern-3: Partial Application with bind()
*/
function calculateEMI(principal, rate, time) {
    const monthlyRate = rate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, time) / 
                (Math.pow(1 + monthlyRate, time) - 1);
    
    console.log(`EMI: ₹${emi.toFixed(2)} (Principal: ₹${principal}, Rate: ${rate}%, Time: ${time} months)`);
}

/* Fixed interest rate ke saath naya function banayein */
const calculateWith12Percent = calculateEMI.bind(null, 100000, 12);
calculateWith12Percent(24); // 1 lakh, 12%, 24 months
calculateWith12Percent(36); // 1 lakh, 12%, 36 months

/* Fixed amount aur rate ke saath */
const calculateCarLoan = calculateEMI.bind(null, 500000, 8.5);
calculateCarLoan(60); // 5 lakh, 8.5%, 60 months
