/**
 * Introduction - The ES6 Revolution
 * 1. ES5 (Purana JavaScript) = Manual Gear Car
 *    > Har baar gear change karna padta hai (call/apply/bind)
 *    > Zyada effort, zyada code
 * 2. ES6 (Naya JavaScript) = Automatic Car
 *    > Automatic Context Handling (Arrow Functions)
 *    > Clean, Readable, Less Code
*/


/**
 * 1. Arrow Functions - 'this' Binding ka Natural Solution
*/

// ES5 - Problem: this lost is callbacks
// ❌ ES5 - Problem: this lost in callbacks
const studentObjES5 = {
    name: "Rahul",
    subjects: ["Math", "Science", "English"],
    showSubjects: function() {
        this.subjects.forEach(function(subject) {
            console.log(this.name + " studies " + subject); 
            // ❌ this.name = undefined (this = window)
        });
    }
};
studentObjES5.showSubjects();


/**
 * ES5 Solution: bind() use karna padta tha (Manual gear change)
*/
const studentObjES5WithBind = {
    name: "Rahul",
    subjects: ["Math", "Science", "English"],
    showSubjects: function() {
        this.subjects.forEach(function(subject) {
            console.log(this.name + " studies " + subject);
        }.bind(this)); // 🔧 Manual gear change
    }
};
studentObjES5WithBind.showSubjects(); // Works but verbose


/**
 * ES6 Solution: Arrow Functions - Automatic this Binding
 * > Why Arrow Functions Work?
 *   Arrow functions ka this parent scope se automatically inherit hota hai
*/
const studentObjES6 = {
    name: "Rahul",
    subjects: ["Math", "Science", "English"],
    showSubjects: function() {
        this.subjects.forEach((subject) => {
            console.log(`${this.name} studies ${subject}`);
            // ✅ this automatically parent scope se inherit hota hai
        });
    }
};
studentObjES6.showSubjects(); // Clean and simple!


/**
 * Real World Example: Time aur Event Handlers
*/

// ❌ ES5 - bind() required
const timerES5 = {
    count: 0,
    start: function() {
        setInterval(function() {
            this.count++; // ❌ this lost
            console.log("Count:", this.count);
        }.bind(this), 1000); // 🔧 Manual binding
    }
};

// ✅ ES6 - Arrow function automatic binding
const timerES6 = {
    count: 0,
    start: function() {
        setInterval(() => {
            this.count++; // ✅ this automatically preserved
            console.log("Count:", this.count);
        }, 1000);
    }
};



/**
 * 2. Spread Operator - apply() ka Replacement
*/

/**
 * ES5: apply() for Passing Array as Arguments
*/
function calculateTotalES5(a, b, c, d) {
    return a + b + c + d;
}

const numbersES5 = [10, 20, 30, 40];
const resultES5 = calculateTotalES5.apply(null, numbersES5);
console.log("ES5 Result:", resultES5); // 100


/**
 * ES6 Solution: Spread Operator - Clean Syntax
*/
function calculateTotalES6(a, b, c, d) {
    return a + b + c + d;
}

const numbersES6 = [10, 20, 30, 40];
const resultES6 = calculateTotalES6(...numbersES6); // 🚀 Clean syntax
console.log("ES6 Result:", resultES6); // 100


/**
 * Real World Example:
*/
const prices = [199, 299, 399, 499, 159];

/* ❌ ES5 - apply() required */
const maxPriceES5 = Math.max.apply(null, prices);
const minPriceES5 = Math.min.apply(null, prices);

/* ✅ ES6 - Spread operator */
const maxPriceES6 = Math.max(...prices);
const minPriceES6 = Math.min(...prices);

console.log(`Price Range: ₹${minPriceES6} - ₹${maxPriceES6}`);


/**
 * Advanced Example: Multiple Arrays Combine karna
*/

/* ✅ ES6 - Multiple arrays easily combine kar sakte hain */
const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Node.js", "Python", "Java"];
const databases = ["MongoDB", "MySQL"];

/* ES6 - Clean and readable */
const allTechnologiesES6 = [...frontend, ...backend, ...databases];
console.log("Technologies:", allTechnologiesES6);

/* ❌ ES5 - concat() method required */
const allTechnologiesES5 = frontend.concat(backend, databases);


/**
 * 3. Destructuring - Method Borrowing Ka Clean Alternative 
*/

/* ❌ ES5 - Method borrowing with call() */
const richPersonES5 = {
    name: "Mr. Ambani",
    buyItem: function(item, price) {
        console.log(`${this.name} bought ${item} for ₹${price}`);
    }
};

const middleClassES5 = { name: "Ramesh" };

/* Manual context setting with call() */
richPersonES5.buyItem.call(middleClassES5, "Bike", 50000);
/* "Ramesh bought Bike for ₹50000" */

/**
 * ES6: Destructuring + Direct Functions
*/

/* ✅ ES6 - Better approach: Generic functions */
function buyItem(person, item, price) {
    console.log(`${person.name} bought ${item} for ₹${price}`);
}

const middleClassES6 = { name: "Ramesh" };
buyItem(middleClassES6, "Bike", 50000); // 🚀 Clean and reusable

/* Agar phir bhi method borrowing chahiye */
const { buyItem: ambaniBuy } = richPersonES5;
ambaniBuy.call(middleClassES6, "Car", 500000); // Still works


/**
 * Real World Example: Utility Functions
*/
/* ✅ ES6 - Better approach: Generic functions */
function buyItem(person, item, price) {
    console.log(`${person.name} bought ${item} for ₹${price}`);
}

const middleClassObjES6 = { name: "Ramesh" };
buyItem(middleClassObjES6, "Bike", 50000); // 🚀 Clean and reusable

/* Agar phir bhi method borrowing chahiye */
const { buyItem: ambaniBuyItem } = richPersonES5;
ambaniBuyItem.call(middleClassObjES6, "Car", 500000); // Still works


/**
 * 4. Classes - Constructor Context Ka Natural Handling
*/

/**
 * ES5: call() for Constructor Chaining
*/

/* ❌ ES5 - Manual constructor chaining */
function PersonES5(name, age) {
    this.name = name;
    this.age = age;
}

function StudentES5(name, age, grade) {
    PersonES5.call(this, name, age); // 🔧 Manual context setting
    this.grade = grade;
}

function CollegeStudentES5(name, age, grade, college) {
    StudentES5.call(this, name, age, grade); // 🔧 Manual chaining
    this.college = college;
}

const studentES5 = new CollegeStudentES5("Rahul", 20, "A", "IIT");


/**
 * ES6: Classes with super() - Automatic Context
*/

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // 🚀 Automatic context
        this.grade = grade;
    }
}

class CollegeStudent extends Student {
    constructor(name, age, grade, college) {
        super(name, age, grade); // 🚀 Clean chaining
        this.college = college;
    }
}

const studentES6 = new CollegeStudent("Rahul", 20, "A", "IIT");
console.log(studentES6);


/**
 * Real World Example: E-commerce Product System
 * > ES6 clean class hierarchy
*/
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    getDiscountedPrice(discount) {
        return this.price - (this.price * discount / 100);
    }
}

class ElectronicProduct extends Product {
    constructor(name, price, warranty) {
        super(name, price);
        this.warranty = warranty;
    }
    
    getProductInfo() {
        return `${this.name} - ₹${this.price} (Warranty: ${this.warranty} years)`;
    }
}

const laptop = new ElectronicProduct("Gaming Laptop", 75000, 2);
console.log(laptop.getProductInfo());
console.log("Discounted:", laptop.getDiscountedPrice(10));


/**
 * 5. Modern Event Handlers - Arrow Functions & Classes
*/

/**
 * ES5: bind() for Event Handlers - Manual Binding
*/

/* ❌ ES5 - Manual binding for event handlers */
function CounterES5() {
    this.count = 0;
    
    this.increment = function() {
        this.count++;
        this.updateDisplay();
    }.bind(this); // 🔧 Manual binding
    
    this.updateDisplay = function() {
        console.log("Count:", this.count);
    }.bind(this); // 🔧 Manual binding
}

const counterES5 = new CounterES5();
document.getElementById('btn').addEventListener('click', counterES5.increment);


/**
 * ES6: Classes with Arrow Functions - Automatic Binding
*/
/* ✅ ES6 - Classes with arrow functions */
class CounterES6 {
    constructor() {
        this.count = 0;
        
        /* Arrow functions automatically bind 'this' */
        this.increment = () => {
            this.count++;
            this.updateDisplay();
        };
        
        this.updateDisplay = () => {
            console.log("Count:", this.count);
        };
    }
}

const counterES6 = new CounterES6();
document.getElementById('btn').addEventListener('click', counterES6.increment);


/**
 * React Example: Class Components
*/
/* ✅ ES6 - React class component */
class MyComponent extends React.Component {
    state = { count: 0 };
    
    /* Arrow function - automatic binding */
    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    };
    
    /* ❌ ES5 style - manual binding required in constructor */
    // handleClick() {
    //     this.setState({ count: this.state.count + 1 });
    // }
    // constructor() {
    //     super();
    //     this.handleClick = this.handleClick.bind(this);
    // }
    
    render() {
        return <button onClick={this.handleClick}>Click me</button>;
    }
}



/**
 * 6. Real World Complete Example Comparison
*/


/**
 * ES5 Approach: call/apply/bind Intensive
*/
// ES5 - Lots of manual binding
function DataProcessor(api) {
    this.api = api;
    this.data = [];
}

DataProcessor.prototype = {
    fetchData: function() {
        const self = this;
        $.get(this.api, function(response) {
            self.data = response;
            self.processData.call(self);
        });
    },
    
    processData: function() {
        const processed = this.data.map(function(item) {
            return item * 2;
        }.bind(this));
        
        this.displayData.apply(this, processed);
    },
    
    displayData: function() {
        const args = Array.prototype.slice.call(arguments);
        console.log.apply(console, ["Processed:", ...args]);
    }
};

const processor = new DataProcessor("/api/data");
processor.fetchData();


/**
 * ES6+ Approach: Clean and Simple
*/

// ES6+ - Clean and readable
class DataProcessor {
    constructor(api) {
        this.api = api;
        this.data = [];
    }
    
    async fetchData() {
        const response = await fetch(this.api);
        this.data = await response.json();
        this.processData();
    }
    
    processData() {
        const processed = this.data.map(item => item * 2);
        this.displayData(...processed);
    }
    
    displayData(...args) {
        console.log("Processed:", ...args);
    }
}

const processorES6 = new DataProcessor("/api/data");
processorES6.fetchData();


/**
 * Remember:
 * 1. Arrow Functions: Automatic 'this' binding
 * 2. Spread Operator: Clean alternative to apply()
 * 3. Classes with super(): Better than manual constructor chaining
 * 4. Destructuring: Clean method access
 * 5. Modern Syntax: Less Code + Mode readable + Fewer Bugs
*/


/**
 * Comparison Table:
 * 1. this Preservation:
 *    a. ES5(bind)           : .bind(this)
 *    b. ES6+                : Arrow Functions
 * 2. Array as arguments:
 *    a. ES5(apply)          : apply(null, array)
 *    b. ES6+                : ...arr (spread)
 * 3. Method Borrowing:
 *    a. ES5(call)           : .call(obj, args)
 *    b. ES6+                : Destructuring + Direct Call
 * 4. Constructor Chaining:
 *    a. ES5(call)           : Parent.call(this)
 *    b. ES6+                : super()
 * 5. Event Handlers:
 *    a. ES5(bind)           : .bind(this)
 *    b. ES6+                : Arrow Functions in Classes
 * 6. Callback Functions:
 *    a. ES5(bind)           : .bind(this)
 *    b. ES6+                : Arrow Functions
*/