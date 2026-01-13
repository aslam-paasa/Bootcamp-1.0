/**
 * Introduction to apply() method:
 * 1. apply() bhi call() jaise hi kaam karta hai, lekin arguments ko array 
 *    mein leta hai.
 * 2. Syntax: function.apply(thisArg, [arg1, arg2, ...])
 * 3. Real World Analogy:
 *    > call()  = Dukaan pe jaake individually cheezein kharidna (bread, milk, eggs)
 *    > apply() = Shopping list bana ke dena, cashier sab process kar dega
*/

/**
 * Step 1: Basic Syntax Comparison:
*/

function introduce(name, age, city) {
    console.log(`Hi, I'm ${name}, ${age} years old from ${city}`);
}

/* call() - individually arguments dena */
introduce.call(null, "Mohammad", 23, "Ranchi");

/* apply() - ek array mein sab arguments dena */
introduce.apply(null, ["Mohammad", 23, "Ranchi"]);

/**
 * Dono ka output same: "Hi, I'm Mohammad, 23 years old from Ranchi"
*/


/**
 * Example: call() vs apply() comparison
*/
function studentInfo(subject1, subject2, subject3) {
    console.log(`${this.name} ye subjects leta hai:`);
    console.log(`1. ${subject1}`);
    console.log(`2. ${subject2}`); 
    console.log(`3. ${subject3}`);
}

const studentObj = { name: "Amit" };

/* call() method - arguments individually */
studentInfo.call(studentObj, "Math", "Science", "English");
console.log("---");

/* apply() method - arguments as array */
studentInfo.apply(studentObj, ["Math", "Science", "English"]);


/**
 * Step 2: Real Problem: Jab Data Array Mein Aata Hai
*/

/** 
 * Problem: Manual Unpacking with call() 
 * > Agar 10-20 arguments hote to manually likhna tedious hota
 * > Code messy lagta hai
*/
function registerStudent(name, age, grade, city) {
    console.log(`Registered: ${name}, Age: ${age}, Grade: ${grade}, City: ${city}`);
}

// API se data aaya array mein
const studentData = ["Rahul", 20, "A", "Mumbai"];

// call() ke saath - manually unpack karna padega
registerStudent.call(null, 
    studentData[0],  // "Rahul"
    studentData[1],  // 20
    studentData[2],  // "A" 
    studentData[3]   // "Mumbai"
);


/**
 * Solution: apply() with Array
 * > Kitna Easy Hua? → Bahut easy! Direct array pass kar diya
*/
const studentData2 = ["Rahul", 20, "A", "Mumbai"];

// apply() - directly array pass karo
registerStudent.apply(null, studentData2);
// "Registered: Rahul, Age: 20, Grade: A, City: Mumbai"


/**
 * Step 3: apply() with this context
*/

/**
 * Example 1: Simple this Setting
*/
function greet() {
    console.log(`Hello, my name is ${this.name}`);
}

const person = {
    name: "Mohammad"
};

greet.apply(person);  // "Hello, my name is Mohammad"


/**
 * Example 2: this + Arguments
*/
function trackEvent(eventName, location, device) {
    console.log(`${this.username} triggered '${eventName}' from ${location} using ${device}`);
}

const user1 = { username: "Mohammad_Dev" };
const user2 = { username: "Zaid_Sharp" };

trackEvent.apply(user1, ["Login", "Delhi", "Mobile"]);
// "Mohammad_Dev triggered 'Login' from Delhi using Mobile"

trackEvent.apply(user2, ["Logout", "Mumbai", "Desktop"]);  
// "Zaid_Sharp triggered 'Logout' from Mumbai using Desktop"


/**
 * Step 4: Practical Use Cases
*/

/**
 * Use Case 1: Dynamic Form Data
*/
// Form se dynamic data aata hai array mein
function submitForm(name, email, phone, address) {
    console.log(`
        Form Submitted:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
    `);
}

// Form values array mein aayi hain
const formData = ["Priya Sharma", "priya@email.com", "9876543210", "Delhi"];

// apply() perfect hai iske liye
submitForm.apply(null, formData);


/**
 * Use Case 2: API Response Processing
*/
function createUserProfile(username, followers, posts, joinDate) {
    console.log(`
        Profile Created:
        Username: ${this.platform} - ${username}
        Followers: ${followers}
        Posts: ${posts}
        Member since: ${joinDate}
    `);
}

const platform = { platform: "Instagram" };
const apiResponse = ["travel_diaries", 15000, 340, "2022-05-15"];

createUserProfile.apply(platform, apiResponse);


/**
 * Use Case 3: Math Functions with Array
*/
// Math.max normally comma separated values leta hai
const nums1 = [45, 23, 78, 12, 89];

// ❌ Ye kaam nahi karega
// Math.max(nums1); // NaN

// ✅ apply() perfect solution
const maxNumber = Math.max.apply(null, nums1);
console.log(maxNumber); // 89


/**
 * Step 5: null ka concept
*/

/**
 * Kab null use karein?
*/
function addNumbers(a, b, c) {
    return a + b + c;
}

const nums2 = [10, 20, 30];

// Jab this ki value matter nahi karti
const result = addNumbers.apply(null, nums2);
console.log(result); // 60


/**
 * Kab null nahi use karein?
*/
const calculator = {
    brand: "Casio",
    multiply: function(a, b) {
        console.log(`${this.brand}: ${a} × ${b} = ${a * b}`);
    }
};

// this ki value matter karti hai
calculator.multiply.apply({ brand: "Scientific Calc" }, [5, 6]);
// "Scientific Calc: 5 × 6 = 30"

/**
 * Golden Rule:
 * a. Function mein this use ho raha hai → thisArg dena important
 * b. Function mein this use nahi ho raha → null de sakte hain
*/


/**
 * Step 6: When to use call() vs apply()?
*/

/**
 * Use call() when:
*/
// Arguments individually pata hain
function bookTicket(movie, time, seats) {
    console.log(`${this.name} booked ${movie} at ${time} for ${seats} seats`);
}

const customer = { name: "Raj" };

// Individual values hain - call() better
bookTicket.call(customer, "Avengers", "7:00 PM", 3);


/**
 * Use apply() when:
*/
// Arguments array mein hain
const ticketData = ["Avengers", "7:00 PM", 3];

// Array hai - apply() better
bookTicket.apply(customer, ticketData);


/**
 * Practice Exercises:
*/

/**
 * Exercise 1: Basic apply()
*/
function showDetails(course, duration) {
    console.log(`${this.name} is learning ${course} for ${duration} months`);
}

const student = { name: "Anjali" };
const courseInfo = ["JavaScript", 6];

// Yahan solution likhein:
showDetails.apply(student, courseInfo);
// "Anjali is learning JavaScript for 6 months"


/**
 * Exercise 2: Math Operations
*/
const nums3 = [12, 45, 23, 67, 34];

// Find minimum number using apply()
const minNumber = Math.min.apply(null, nums3);
console.log(minNumber); // 12


/**
 * Exercise 3: Dynamic Function Calling
*/
function processOrder(item, quantity, price) {
    console.log(`
        Order Processed by ${this.restaurant}:
        Item: ${item} × ${quantity}
        Total: ₹${quantity * price}
    `);
}

const restaurant = { restaurant: "Food Paradise" };
const orderData = ["Pizza", 2, 299];

// Use apply() to process order
processOrder.apply(restaurant, orderData);



/**
 * Modern Alternative: Spread Operator
 * 1. Farq Samjhe:
 *    > apply(): Purane JavaScript mein use hota tha
 *    > Spread operator: Modern JavaScript mein better alternative
 * 2. Par Phir Bhi apply() Kyun Sikhe?
 *    > Legacy code samajhne ke liye
 *    > Interview questions ke liye
 *    > Concept clear karne ke liye
*/

/**
 * ES6 Spread Operator
*/
const nums4 = [45, 23, 78, 12, 89];

// Purana tarika - apply()
const max1 = Math.max.apply(null, nums4);

// Naya tarika - spread operator
const max2 = Math.max(...nums4);

console.log(max1, max2); // 89, 89 (same result)


/**
 * Quick Reference:
 * 1. Syntax: functionName.apply(thisArg, [arg1, arg2, arg3, ...])
 * 2. Parameters:
 *    a. thisArg - Object jo this banega (ya null)
 *    b. Arguments array - Function ke saare arguments ek array mein
 * 3. When to use:
 *    > Jab arguments already array mein ho
 *    > Jab dynamic data process karna ho
 *    > Jab Math functions ke saath array use karna ho
 * 4. Final Summary:
 *    > apply() Ka Simple Rule:
 *      "Function ko bolo: Is object ke liye chal, aur ye array lekar arguments
 *       de de"
 *    > Key Points:
 *      a. apply() bhi call() ki tarah immediately execute karta hai
 *      b. Arguments array form mein leta hai
 *      c. null use karein jab this ki value matter nahi karti
 *      d. Modern JavaScript mein spread operator better alternative hai
 *    > Yaad Rakhein:
 *      a. apply() = A for Array arguments
 *      b. call() = C for Comma separated arguments
 * Ab aap apply() method confidently use kar sakte hain! 🎉
*/


/**
 * Example: Real World - Maximum Marks Finder
*/
/* Built-in Math.max function ko use karenge */
const marks = [85, 92, 78, 96, 88];

/* Normal tarika - spread operator */
console.log("Normal way:", Math.max(...marks));

/* apply() method se */
console.log("Using apply:", Math.max.apply(null, marks));

/* Real example with object context */
const studentObject = {
    name: "Rahul",
    findHighest: function(marksArray) {
        const highest = Math.max.apply(null, marksArray);
        console.log(`${this.name} ka highest score: ${highest}`);
    }
};

studentObject.findHighest(marks);

/**
 * Example: Calculator with Multiple Numbers
*/
function calculateAverage() {
    /* arguments object se numbers le rahe hain */
    const numbers = Array.from(arguments);
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const average = sum / numbers.length;
    
    console.log(`${this.subject} ka average: ${average.toFixed(2)}`);
}

const mathClass = { subject: "Mathematics" };
const scienceClass = { subject: "Science" };

/* apply() perfect hai jab arguments pata nahi kitne honge */
calculateAverage.apply(mathClass, [85, 92, 78, 88, 95]);
calculateAverage.apply(scienceClass, [90, 87, 92, 85]);