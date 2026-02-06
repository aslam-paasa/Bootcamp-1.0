/**
 * Introduction to this keyword:
 * > "Mera" (Mera ghar, mera phone, mera laptop) - Ye sab batata hai ki
 *   cheez kiski hai.
 * > JS mein 'this' bhi wahi kaam karta hai - batata hai ki 'current object'
 *   kaun hai.
 * > 'this' ek special keyword hai jo 'current context' ko point krta hai.
 *   Ye dynamically change ho sakta hai
 * 
 * > Example:
 *   Socho 'this' ek pointing finger hai. Aur yeh point karta hai current
 *   object ya context ko.
*/

/**
 * What is Context?
 * > Context simply means: "Kaun bol rha hai?"
 *                               Ya
 *                         "Kis object ke andar se function call ho rha hai?"
 * > Example:
 *   a. Agar main bolta hu "Mera naam Rahul hai"
 *      Yahan "main" context hu
 *   b. Agar tum bolte ho "Mera naam Priya hai"
 *      Yahan "tum" context ho
 * 
 * > JS mein 2 types ke context hote hai:
 * 
 *   a. Global Context: Jab koi owner nhi hota
 *      > console.log(this);    // Window object (browser mein)
 * 
 *   b. Object Context: 
 *      > const person = {
 *            name: "Rahul",
 *            introduce: function() {
 *                console.log(`Mera naam ${this.name} hai`); // this = person object
 *            }
 *        };
*/


/**
 * Step-1: Global Context - Sabse Basic
 * > console.log(this); => window object
 * > Jab koi function ya object ke andar nahi ho
 * > this always point karega global window object ko
 * > Browser mein yeh window hota hai, Node.js mein global
 */
this.car = "Mercedes";
console.log(window.car); // "Mercedes" - same cheez!

/**
 * Step-2: Function Context - Simple Function
 * > Simple function call (object ke through nahi)
 * > this window ko point karega
 * > Exception: "use strict" mode mein undefined hoga
 */

function driveCar() {
  console.log(this); // Window object
}
driveCar();

/**
 * Step-3: Method Context - Object ke Andar Function
 */

const person = {
  name: "Rahul",
  age: 25,
  introduce: function () {
    console.log(this); // person object
    console.log(this.name); // "Rahul"
  },
};
person.introduce();

/**
 * Important Rule:
 * > Jis object ne function call kiya, this ussi object ko point karega
 */

const restaurant = {
  name: "Spice Garden",
  welcomeCustomer: function () {
    console.log(`Welcome to ${this.name}!`); // "Welcome to Spice Garden!"
  },
};
restaurant.welcomeCustomer();

/**
 * Step-4: Arrow Functions - Special Case
 */

/**
 * Case 4.1: Object ke andar Arrow Function
 */

const personOne = {
  name: "Rahul",
  sayName: () => {
    console.log(this); // Window object
    console.log(this.name); // undefined
  },
};
personOne.sayName();


/**
 * Case 4.2: Regular Function ke andar Arrow Function
*/

const personTwo = {
    name: "Rahul",
    sayName: function() {
        const inner = () => {
            console.log(this.name); // "Rahul"
        }
        inner();
    }
}
personTwo.sayName();


/**
 * Golden Rule:
 * > Arrow function ka this uska parent scope se leta hai
 * > Samjhe Difference:
 *   - Regular function: this = jisne call kiya
 *   - Arrow function: this = parent ka this
*/



/**
 * Step-5: Event Handlers
 * > Event listener mein this uss element ko point karta hai jispe event 
 *   laga hai
*/

document.querySelector("button").addEventListener("click", function() {
    console.log(this); // Button element jispe click hua
});


/**
 * Step-6: Constructor Functions
 * > new keyword use karne pe ek naya object create hota hai
 * > this uss naye object ko point karta hai
*/

function Car(brand) {
    this.brand = brand;
    console.log(this); // New blank object
}

const myCar = new Car("Toyota");
console.log(myCar.brand); // "Toyota"



/**
 * Step-7: Explicit Binding
*/

/**
 * Case 7.1: call() method
*/

function introduceOne(language) {
    console.log(`I code in ${language} and I'm ${this.name}`);
}

const person1 = { name: "Amit" };
const person2 = { name: "Priya" };

introduceOne.call(person1, "JavaScript"); // "I code in JavaScript and I'm Amit"
introduceOne.call(person2, "Python");     // "I code in Python and I'm Priya"


/**
 * Case 7.2: apply() method
*/

function introduceTwo(language, experience) {
    console.log(`I code in ${language} with ${experience} years experience. I'm ${this.name}`);
}

const personName = { name: "Rohit" };
introduceTwo.apply(personName, ["JavaScript", 3]); // Array as arguments


/**
 * Case 7.3: bind() method
*/

function introduce(language) {
    console.log(`I code in ${language} and I'm ${this.name}`);
}

const personThree = { name: "Neha" };
const boundFunction = introduce.bind(personThree);
boundFunction("Java"); // "I code in Java and I'm Neha"


/**
 * Difference yaad rakhein:
 * a. call() : immediately call karta hai, arguments individually leta hai
 * b. apply(): immediately call karta hai, arguments array mein leta hai
 * c. bind() : naya function return karta hai, baad mein call kar sakte hain
*/


/**
 * Practice Problems with solutions:
*/

/**
 * Problem 1: Basic this
*/
this.car = "BMW";

function showCar() {
    console.log(this.car);
}
showCar(); // "BMW" (Window se)


/**
 * Problem 2: Object Method
*/
const student = {
    name: "Ankit",
    showName: function() {
        console.log(this.name);
    }
}
student.showName(); // "Ankit" (student object se)


/**
 * Problem 3: Nested Object
*/
const company = {
    name: "TechCorp",
    department: {
        name: "Engineering",
        showName: function() {
            console.log(this.name);
        }
    }
}
company.department.showName(); // "Engineering" (department se)


/**
 * Problem 4: Arrow Function in Object
*/
const user = {
    name: "Sneha",
    showName: () => {
        console.log(this.name);
    }
}
user.showName(); // undefined (Window se)



/**
 * Common Mistakes & Solutions:
*/

/**
 * Mistake 1: Callback functions mein this lose karna
*/

// ❌ Galat
const objWrong = {
    name: "John",
    delayedGreeting: function() {
        setTimeout(function() {
            console.log(this.name); // undefined
        }, 1000);
    }
}

// ✅ Sahi
const objCorrect = {
    name: "John", 
    delayedGreeting: function() {
        setTimeout(() => {
            console.log(this.name); // "John"
        }, 1000);
    }
}

/**
 * Mistake 2: Method ko alag variable mein store karna
*/

// ❌ Galat
const obj = {
    name: "John",
    greet: function() {
        console.log(this.name);
    }
}

const greetFuncWrong = obj.greet;
greetFunc(); // undefined

// ✅ Sahi
const greetFuncCorrect = obj.greet.bind(obj);
greetFunc(); // "John"


/**
 * Quick Reference:
 * a. Global Context:
 *    > this = window
 *    > console.log(this)
 * 
 * b. Simple Function:
 *    > this = window
 *    > function f() { console.log(this) }
 * 
 * c. Object Method:
 *    > this = object itself
 *    > obj.method()
 * 
 * d. Arrow Function:
 *    > this = Parent's this
 *    > () => { console.log(this) }
 * 
 * e. Event Handler:
 *    > this = Target element
 *    > button.addEventListener()
 * 
 * f. Constructor Function:
 *    > this = New instance
 *    > new Car()
 * 
 * g. Explicit Binding:
 *    > this = passed object (manually set)
 *    > func.call(obj)
*/

/**
 * Final Tips:
 * 1. "Jisne call kiya, wahi this" - yeh rule yaad rakhein
 * 2. Arrow functions parent ka this lete hain
 * 3. call/apply/bind se forcefully this set kar sakte hain
 * 4. Practice karte rahein - experience se samajh aayega!
 * 
 * Yaad Rakhein: JavaScript mein this ki value runtime mein decide hoti hai,
 * compile time mein nahi. Isliye practice zaroori hai!
*/