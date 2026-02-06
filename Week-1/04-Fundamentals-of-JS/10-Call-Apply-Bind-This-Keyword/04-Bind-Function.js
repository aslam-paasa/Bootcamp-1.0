/**
 * Introduction to bind():
 * 1. Problem Kya Hai?
 *    > call() aur apply() immediately function execute kar dete hain
 *    > Par kabhi hum chahte hain ki function ko baad mein execute karein, 
 *      lekin this ki value fix ho
 * 2. Solution: bind() method
 *    > bind() naya function return karta hai jiska this permanently set hota
 *      hai. 
 *    > Useful for callbacks aur event handlers.
 * 3. Syntax: const newFunction = originalFunction.bind(thisArg)
 * 
 * Real World Analogy:
 * > call()  = Abhi phone karo aur baat karo
 * > apply() = Abhi message bhejo aur reply lo
 * > bind()  = Ek permanent relationship banayo, baad mein bhi same person
 *             se baat kar sakte ho
*/

/**
 * Step 1: The Problem - this Lost Hona
*/

/** 
 * Problem Code: 
 * > personObj.sayHi ka this = personObj object
 * > Lekin greetOne variable mein store karne pe connection tut gaya
 * > greetOne() call karte time this = window object
 * > Simple Words mein: 
 *   Function ko alag nikal liya, uska owner bhool gaya! 😞
*/
const personObj = {
    name: "Mohammad",
    sayHi: function() {
        console.log("Hi, I am " + this.name);
    }
};

// Function ko alag variable mein store karna
const greetOne = personObj.sayHi;
greetOne(); // "Hi, I am undefined" 😞


/**
 * Solution - bind() method
 * > bind ka magic:
 *   "Function ki ek copy banao, aur usme this ki value permanently set kar do"
*/
const personObj2 = {
    name: "Mohammad",
    sayHi: function() {
        console.log("Hi, I am " + this.name);
    }
};

// bind() se permanent connection banao
const greetTwo = personObj2.sayHi.bind(personObj2);
greetTwo(); // "Hi, I am Mohammad" ✅


/**
 * Real World Analogy:
*/
// Doctor ka example
const doctor = {
    name: "Dr. Sharma",
    checkPatient: function() {
        console.log(`${this.name} is checking the patient`);
    }
};

// Normal way - connection lost
const generalCheck = doctor.checkPatient;
generalCheck(); // "undefined is checking the patient"

// bind() way - permanent connection
const drSharmaCheck = doctor.checkPatient.bind(doctor);
drSharmaCheck(); // "Dr. Sharma is checking the patient"


/**
 * Step 3: bind() vs call() vs apply()
*/

/* call() - Immediate Execution */
function introduce() {
    console.log(`I'm ${this.name}`);
}

const personRahul = { name: "Rahul" };

// call() - immediately execute
introduce.call(personRahul); // "I'm Rahul" (immediately)


/* apply() - Immediate Execution */
// apply() - immediately execute with array
introduce.apply(personRahul); // "I'm Rahul" (immediately)


/* bind() - Future Execution */
// bind() - create bound function for future
const boundIntroduce = introduce.bind(personRahul);
// Abhi execute nahi hua

// Baad mein kabhi bhi use kar sakte hain
boundIntroduce(); // "I'm Rahul" (whenever you want)
boundIntroduce(); // "I'm Rahul" (again)
boundIntroduce(); // "I'm Rahul" (as many times)


/**
 * Comparison between call(), apply() and bind():
 * a. call()  - Abhi kaam karo aur bhool jao
 * b. apply() - Abhi kaam karo (array ke saath) aur bhool jao
 * c. bind()  - Permanent employee banayo, jab chahe kaam le lo
*/


/**
 * Step 4: bind() with Arguments
*/

/**
 * Permanent Arguments k saath:
*/
function bookTicket(movie, time, seats) {
    console.log(`${this.name} booked ${movie} at ${time} for ${seats} seats`);
}

const customer = { name: "Priya" };

// bind() with arguments - sab kuch fix kar do
const bookForPriya = bookTicket.bind(customer, "Avengers", "7:00 PM", 2);

// Ab jab bhi call karenge, yehi arguments use honge
bookForPriya(); // "Priya booked Avengers at 7:00 PM for 2 seats"


/**
 * Partial Binding - Kuch Arguments fix karna:
*/
function calculateTotal(price, tax, discount) {
    const total = price + tax - discount;
    console.log(`Total: ₹${total}`);
}

// Sirf tax fix karna hai, baaki baad mein dena hai
const calculateWithGST = calculateTotal.bind(null, 0.18); // tax = 18%

// Ab price aur discount baad mein de sakte hain
calculateWithGST(1000, 100);  // Total: ₹1000 + 180 - 100 = ₹1080
calculateWithGST(2000, 200);  // Total: ₹2000 + 360 - 200 = ₹2160



/**
 * Practical Use Cases:
*/

/**
 * Use Case 1: Event Handlers
*/
const buttonHandler = {
    message: "Button clicked!",
    handleClick: function() {
        console.log(this.message);
    }
};

// ❌ Without bind() - this lost
document.querySelector('button').addEventListener('click', buttonHandler.handleClick);
// Click karne pe "undefined"

// ✅ With bind() - this preserved
document.querySelector('button').addEventListener('click', buttonHandler.handleClick.bind(buttonHandler));
// Click karne pe "Button clicked!"


/**
 * Use Case 2: setTimeout mein this preserve karna
*/
const student = {
    name: "Ankit",
    submitAssignment: function() {
        console.log(`${this.name} submitted assignment`);
    }
};

// ❌ Without bind()
setTimeout(student.submitAssignment, 1000); // "undefined submitted assignment"

// ✅ With bind()
setTimeout(student.submitAssignment.bind(student), 1000); // "Ankit submitted assignment"



/**
 * Use Case 3: Callback Functions
*/
const dataProcessor = {
    data: [1, 2, 3, 4, 5],
    multiplier: 10,
    process: function() {
        // map ke andar this lost ho jata hai
        return this.data.map(function(item) {
            return item * this.multiplier; // ❌ this undefined
        });
    }
};

// ✅ Solution with bind()
const dataProcessorFixed = {
    data: [1, 2, 3, 4, 5],
    multiplier: 10,
    process: function() {
        return this.data.map(function(item) {
            return item * this.multiplier;
        }.bind(this)); // ✅ this preserved
    }
};

console.log(dataProcessorFixed.process()); // [10, 20, 30, 40, 50]



/**
 * Step 6: Important Concepts
*/

/**
 * Concept 1: bind() creates a new function
 * > Meaning: bind() original function ki copy banata hai, original change
 *   nahi hota
*/
function sayHello() {
    console.log("Hello " + this.name);
}

const personAli = { name: "Ali" };

const boundFunction = sayHello.bind(personAli);

console.log(sayHello === boundFunction); // false
console.log(typeof boundFunction); // "function"


/**
 * Concept 2: Multiple bind() calls
 * > Rule: Pehla bind() permanent hota hai, uske baad change nahi ho sakta
*/
function showName() {
    console.log(this.name);
}

const person1 = { name: "Rahul" };
const person2 = { name: "Priya" };

const boundOnce = showName.bind(person1);
const boundTwice = boundOnce.bind(person2);

boundTwice(); // "Rahul" (first bind hi matter karta hai)


/**
 * Practice Exercises:
*/

/**
 * Exercise 1: Basic bind()
*/
const car = {
    brand: "Toyota",
    startEngine: function() {
        console.log(`${this.brand} engine started`);
    }
};

// Create a bound function that always refers to car
const startToyota = car.startEngine.bind(car);
startToyota(); // "Toyota engine started"


/**
 * Exercise 2: bind() with arguments
*/
function orderFood(item, quantity) {
    console.log(`Order: ${quantity} × ${item} for ${this.customerName}`);
}

const restaurant = { customerName: "Mr. Gupta" };

// Create bound function with fixed arguments
const orderPizza = orderFood.bind(restaurant, "Pizza", 2);
orderPizza(); // "Order: 2 × Pizza for Mr. Gupta"


/**
 * Exercise 3: Event Handlers
*/
const game = {
    score: 0,
    incrementScore: function() {
        this.score++;
        console.log(`Score: ${this.score}`);
    }
};

// Create bound function for click event
const boundIncrement = game.incrementScore.bind(game);

// Simulate button click
boundIncrement(); // "Score: 1"
boundIncrement(); // "Score: 2"
boundIncrement(); // "Score: 3"


/**
 * Quick Reference:
 * 1. Comparison Table:
 *    a. call():
 *       - Execution: Immediate
 *       - Returns  : Result
 *       - Arguments: Comma Separated
 *    b. apply():
 *       - Execution: Immediate 
 *       - Returns  : Result
 *       - Arguments: Array
 *    c. bind():
 *       - Execution: Future
 *       - Returns  : New Function
 *       - Arguments: Comma Separated
 * 2. Final Summary:
 *    a. bind() ka simple rule:
 *       "Function ki permanent copy banao, jiska this hamesha fixed rahe"
 *    b. Key Points:
 *       > bind() new function return karta hai, execute nahi karta
 *       > Returned function baad mein kabhi bhi call kar sakte hain
 *       > this ki value permanently set ho jati hai
 *       > Arguments bhi permanently set kar sakte hain
 *    c. When to use:
 *       > Event Handlers mein
 *       > setTimeout mein
 *       > Callback functions mein
 *       > Jab functions ko baad mein call krna ho with fixed context
 *    d. Yaad rakhein:
 *       > bind() = B for Bound function (future use ke liye)
 * 
 * Ab aap bind() method confidently use kar sakte hain! 🎉
*/


/**
 * Practical Example: bind() with Arguments
*/

function greet(timeOfDay) {
    console.log(`Good ${timeOfDay}, ${this.name}!`);
}

const user = { name: "Rahul" };

/* bind() se naya function banayein */
const greetUser = greet.bind(user);

/* Ab ye function kahi bhi call kar sakte hain */
greetUser("morning");    // Good morning, Rahul!
greetUser("evening");    // Good evening, Rahul!

/* Original function unchanged */
greet("morning");        // Good morning, undefined!


/**
 * Practical Example: Event Handlers with bind()
*/
// <button id="btn1">Button 1</button>
// <button id="btn2">Button 2</button>

// <script>
// class ButtonHandler {
//     constructor(buttonName) {
//         this.buttonName = buttonName;
//         this.clickCount = 0;
//     }
    
//     handleClick() {
//         this.clickCount++;
//         console.log(`${this.buttonName} clicked ${this.clickCount} times`);
//     }
// }

// const handler1 = new ButtonHandler("Submit Button");
// const handler2 = new ButtonHandler("Cancel Button");

// // bind() use karke permanent context set karo
// document.getElementById('btn1').addEventListener('click', 
//     handler1.handleClick.bind(handler1));

// document.getElementById('btn2').addEventListener('click', 
//     handler2.handleClick.bind(handler2));
// </script>


/**
 * Practical Example: setTimeout with bind()
*/
const studentObjWithTimeout = {
    name: "Priya",
    startStudy: function() {

        /* ❌ Problem: setTimeout ke andar this change ho jata hai */
        // setTimeout(function() {
        //     console.log(`${this.name} ne study start kardi`); // this.name undefined
        // }, 1000);
        
        /* ✅ Solution: bind() use karo */
        setTimeout(function() {
            console.log(`${this.name} ne study start kardi`);
        }.bind(this), 1000);
    }
};

studentObjWithTimeout.startStudy();


