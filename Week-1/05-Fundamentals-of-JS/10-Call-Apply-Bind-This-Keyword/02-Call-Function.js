/**
 * Step 1: call Method - Context Change karo
 * 1. Problem without call() method:
 *    > Jab hum function ko directly call karte hain, this window object ko 
 *      point karta hai.
 *    > Par hum chahte hain ki function different objects ke saath kaam kare
 * 
 * 2. Solution with call() method:
 *    > Context Change karna ka matlab hai ki function ko ek different object
 *      ke saath use karna.
 *    > call() method aapko allow karta hai kisi function ko kisi specific 
 *      object ke context mein call karne ka.
 * 
 * > Syntax: function.call(thisArg, arg1, arg2, ...)
 * 
 * 3. Real World Analogy:
 *    Socho aap ek doctor ho jiske paas stethoscope hai:
 *    > Aap kisi bhi patient ko check kar sakte ho
 *    > Stethoscope same hai, par patient change ho sakta hai
 *    > call() method aisa hi kaam karti hai!
*/

/**
 * Example 1: Basic call() usage 
*/

/* Ek general function banayein */
function introduce(language, experience) {
    console.log(`Mera naam ${this.name} hai`);
    console.log(`Main ${language} seekh raha hun, ${experience} mahine se`);
}

/* Alag-alag objects banayein */
const studentObj1 = { name: "Rahul" };
const studentObj2 = { name: "Priya" };

/* Normal call - this = window (problem) */
console.log("Normal call:");
introduce("JavaScript", 3); /* this.name = undefined */

/* call() use karke - this set karo */
console.log("call() use karke - this set karo:");
introduce.call(studentObj1, "JavaScript", 3);
introduce.call(studentObj2, "Python", 6);


/**
 * Output:
 * > Mera naam Rahul hai
 * > Main JavaScript seekh raha hun, 3 mahine se
 * > ---
 * > Mera naam Priya hai
 * > Main Python seekh raha hun, 6 mahine se
*/



/**
 * Example 2: Method Sharing Between Objects
*/

/* Ek common function banayein */
function calculateTotal(price, tax) {
    const total = price + (price * tax / 100);
    console.log(`${this.product} ka total price: ₹${total}`);
}

/* Alag-alag products */
const product1 = { product: "Laptop" };
const product2 = { product: "Mouse" };
const product3 = { product: "Keyboard" };

/* Same function ko different objects ke saath use karo */
calculateTotal.call(product1, 50000, 18); /* Laptop */
calculateTotal.call(product2, 1500, 12);  /* Mouse   */
calculateTotal.call(product3, 2500, 12);  /* Keyboard */


/**
 * Real World Example:
 * > Ek general doctor jo kisi bhi patient ko check kar sakta hai
*/
function checkUp() {
    console.log(`Dr. checking: ${this.name}`);
}

const patient1 = { name: "Rahul", age: 25 };
const patient2 = { name: "Priya", age: 30 };

checkUp.call(patient1); // "Dr. checking: Rahul"
checkUp.call(patient2); // "Dr. checking: Priya"


/**
 * Step 3: call() with Arguments (Multiple arguments k saath)
 * > Arguments Ka Order:
 *   a. Pehla parameter: jis object ko this banana hai
 *   b. Uske baad: function ke normal parameters
*/
function introduce(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Mohammad" };

// call(object, arg1, arg2, arg3, ...)
introduce.call(person, "Salaam", "!"); // "Salaam, Mohammad!"
introduce.call(person, "Hello", "!!"); // "Hello, Mohammad!!"


/**
 * Real World Example with Arguments:
 * > Waiter jo different tables ko serve karta hai
*/
function takeOrder(food, drink) {
    console.log(`${this.customerName} ordered: ${food} and ${drink}`);
}

const table1 = { customerName: "Ankit", tableNumber: 5 };
const table2 = { customerName: "Neha", tableNumber: 8 };

takeOrder.call(table1, "Pizza", "Coke");     // "Ankit ordered: Pizza and Coke"
takeOrder.call(table2, "Pasta", "Juice");    // "Neha ordered: Pasta and Juice"


/**
 * Step 4: Benefits of call() - Function Reuse
*/

/**
 * Benefit 1: Code Reusability
*/
// Ek hi function multiple objects ke saath use kar sakte hain
function showDetails() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
}

const student = { name: "Aarav", age: 20, grade: "A" };
const teacher = { name: "Mr. Sharma", age: 35, subject: "Math" };
const parent = { name: "Mrs. Gupta", age: 40, occupation: "Engineer" };

showDetails.call(student);  // "Name: Aarav, Age: 20"
showDetails.call(teacher);  // "Name: Mr. Sharma, Age: 35" 
showDetails.call(parent);   // "Name: Mrs. Gupta, Age: 40"


/**
 * Benefit 2: Method Borrowing
 * > Ek object ka method dusre object ke saath use karna
*/

const richPerson = {
    name: "Mr. Ambani",
    buyCar: function(carName) {
        console.log(`${this.name} bought a ${carName}`);
    }
};

const middleClassPerson = {
    name: "Ramesh",
    salary: 50000
};

// Middle class person bhi rich person ka method use kar sakta hai
richPerson.buyCar.call(middleClassPerson, "Maruti Suzuki"); 
// "Ramesh bought a Maruti Suzuki"


/**
 * Step 5: Practice Use Cases:
*/

/**
 * Use Case 1: Array-like Objects ko Real Array Banana
 * > HTML elements jo array jaisa dikhta hai par array nahi hai
*/
function convertToArray() {
    const realArray = Array.prototype.slice.call(this);
    console.log(realArray);
}

const divElements = document.querySelectorAll('div');
convertToArray.call(divElements); // Ab yeh real array ban gaya


/**
 * Use Case 2: Constructor Chaining
*/
function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Student(name, age, grade) {
    // Parent constructor ko call karna
    Person.call(this, name, age);
    this.grade = grade;
}

const student1 = new Student("Rohit", 20, "A");
console.log(student1); // {name: "Rohit", age: 20, grade: "A"}


/**
 * Common Mistakes & Solutions:
*/

/**
 * Mistake 1: call() ko bhool jaana
*/
// ❌ Galat
function greet() {
    console.log("Hello " + this.name);
}
const user = { name: "John" };
greet(); // "Hello undefined"

// ✅ Sahi
greet.call(user); // "Hello John"


/**
 * Mistake 2: Arguments ka galat order
*/
// ❌ Galat
function introduce(greeting, name) {
    console.log(`${greeting}, ${name}`);
}
introduce.call("Hello", user); // Galat order

// ✅ Sahi  
introduce.call(user, "Hello"); // Pehle object, phir arguments


/**
 * Practice Exercises:
*/

/**
 * Exercise 1: Basic call()
*/
function sayHi() {
    console.log(`Hi, I'm ${this.name}`);
}

const person1 = { name: "Ayaan" };
const person2 = { name: "Fatima" };

// Yahan solution likhein:
sayHi.call(person1); // "Hi, I'm Ayaan"
sayHi.call(person2); // "Hi, I'm Fatima"


/**
 * Exercise 2: call() with Arguments
*/
function bookTicket(movie, time) {
    console.log(`${this.name} booked ${movie} at ${time}`);
}

const customer = { name: "Raj" };

// Yahan solution likhein:  
bookTicket.call(customer, "Avengers", "7:00 PM");
// "Raj booked Avengers at 7:00 PM"


/**
 * Exercise 3: Method Borrowing
*/
const calculator = {
    multiply: function(a, b) {
        return a * b;
    }
};

const mathStudent = {
    name: "Anjali"
};

// Calculator ka multiply method mathStudent ke saath use karein
const result = calculator.multiply.call(mathStudent, 5, 6);
console.log(result); // 30


/**
 * Quick Reference:
 * 1. Syntax: functionName.call(thisValue, arg1, arg2, arg3, ...)
 * 2. Parameters:
 *    a. thisValue - Object jo this banega
 *    b. arg1, arg2... - Function ke normal arguments
 * 3. When to use:
 *    > Jab function ko different objects ke saath use karna ho
 *    > Jab method borrowing karna ho
 *    > Jab constructor chaining karna ho
 * 4. Final Summary:
 *    > call() Ka Simple Rule:
 *      "Function ko bolo: Is object ke liye chal, aur this ussi ko bana"
 *    > Key Points:
 *      a. call() immediately function execute karta hai
 *      b. Pehla parameter hamesha this value hoti hai
 *      c. Baaki parameters function ke normal arguments hote hain
 *      d. Code reuse aur method borrowing ke liye bahut useful hai
 *    > Yaad Rakhein:
 *      a. call() = C for Comma separated arguments
 *      b. Pehla parameter = jis object ko this banana hai
 * Ab aap call() method confidently use kar sakte hain! 🎉
*/
