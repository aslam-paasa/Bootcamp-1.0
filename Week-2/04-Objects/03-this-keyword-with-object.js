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
 * Step 1: this ka basic concept
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
 * Step 2: Global Context - Jab koi owner nahi hota
 * 1. Browser Environment Mein
 *    
 *    a. Browser mein global context = window object
 *       console.log(this === window); // ✅ true
 * 
 *    b. Global variable banayein
 *       var globalName = "Global Rahul";
 *       console.log(this.globalName);   // "Global Rahul"
 *       console.log(window.globalName); // "Global Rahul" - same cheez
 * 
 *    c. Function directly call karein
 *       function globalFunction() {
 *           console.log("Global function mein this:", this); // Window object
 *       }
 *       globalFunction();
 * 
 * 2. Node.js Environment Mein
 *    > Node.js mein global context different hota hai
 *    > {} (empty object in module scope)
 * 
 *    console.log(this); // {} (empty object in module scope)
*/


/**
 * Step 3: Object Context - this ka asli kaam
*/

/**
 * Basic Object Method Mein 'this':
*/
const student = {
    name: "Amit",
    age: 20,
    
    /* 'this' in method: current object ko refer karta hai */
    introduce: function() {
        console.log(`Hello, mera naam ${this.name} hai`);
        console.log(`Meri umar ${this.age} saal hai`);
    },
    
    celebrateBirthday: function() {
        this.age += 1; /* Current object ki age update karo */
        console.log(`Happy Birthday! Ab aapki umar ${this.age} saal hai`);
    }
};

/* Object methods ko call karein */
student.introduce();         // this = student object
student.celebrateBirthday(); // this = student object

/**
 * Output:
 * > Hello, mera naam Amit hai
 * > Meri umar 20 saal hai
 * > Happy Birthday! Ab aapki umar 21 saal hai
*/


/**
 * Multiple Objects ke Saath 'this' ka power:
*/

/* Ek hi function ko multiple objects use kar sakte hain */
function showInfo() {
    console.log(`Name: ${this.name}, City: ${this.city}`);
}

/* Alag-alag objects banayein */
const person1 = {
    name: "Rahul",
    city: "Delhi",
    display: showInfo  /* Same function ko assign kiya */
};

const person2 = {
    name: "Priya", 
    city: "Mumbai",
    display: showInfo  /* Same function ko assign kiya */
};

/* Dono objects ke saath same function use karein */
person1.display(); /* this = person1 → "Name: Rahul, City: Delhi" */
person2.display(); /* this = person2 → "Name: Priya, City: Mumbai" */



/**
 * Step 4: this kyu important hai? Problem aur Solution
*/

/**
 * Problem: Bina 'this' ke code duplication
 * > ❌ (Wrong Approach) - Code repetition
 * > Har object ke liye alag function likhna padega!
*/
/*  */
const student1 = {
    name: "Amit",
    getDetails: function() {
        return `Student: ${student1.name}`; /* Hardcoded student1 */
    }
};

const student2 = {
    name: "Neha", 
    getDetails: function() {
        return `Student: ${student2.name}`; /* Hardcoded student2 */
    }
};


/**
 * Solution: 'this' k saath reusable function
*/
function getStudentDetails() {
    return `Student: ${this.name}`;
}

const student3 = {
    name: "Amit",
    getDetails: getStudentDetails  /* Same function */
};

const student4 = {
    name: "Neha",
    getDetails: getStudentDetails  /* Same function */
};

console.log(student3.getDetails()); /* "Student: Amit" - this = student3 */
console.log(student4.getDetails()); /* "Student: Neha" - this = student4 */


/**
 * Summary:
 * 1. Context : Refers to how and where a function is executed.
 * 2. Problem : Fn ka context hone se this unpredictable ho jata hai.
 * 3. Solution: this keyword automatically points to the current context
 *              (object/global) at runtime.
 * 4. why introduced:
 *    Taakin functions ka reusable banaya jaa sake without hardcoding object
 *    names.
*/



/**
 * Why this keyword is needed?
 * JavaScript me functions ko alag-alag jagha se call kiya jaa skta hai:
 * a. Kabhi kisi object ke andar
 * b. Kabhi directly global scope me
 * c. Kabhi kisi event k andr
 * d. Kabhi kisi timer k andr
 * 
 * Aise multiple jagha par function call karte waqt hum "current context"
 * pata karna pdta hai - jaha se function call hua hai.
 * Toh this ko introduced kiya gya to dynamically track the "calling object".
*/


/**
 * What problem does this solve?
 * - Agar this nahi hota, toh har method/function ke andr manually batana
 *   padta:
*/

const personObj = {
    firstName: "Mohammad",
    lastName: "Aslam",
    fullName: function () {
        return personObj.firstName + " " + personObj.lastName; // har jagah "personObj" likhna padta
    }
}

/**
 * Ab socho agar object ka naam badal diya? Code toot jaata.
 * ✅ "this" use karne se dynamic reference milta hai — safer & reusable
 *     code!
*/

const personObjWithThis = {
    firstName: "Mohammad",
    lastName: "Aslam",
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}



/**
 * Advantages of this:
 * a. Dynamic Access : Same method ko multiple objects me reuse kar skte h
 * b. Better Reusability: Agar object ka naam change bhi ho gya, this se
 *    koi farak nahi padta.
 * c. OOP Support : Object-Oriented Programmin ke patterns k liye perfect h.
 * d. Context Awareness : Function kis object se call hua, uska context
 *    batata hai.
*/


/**
 * Disadvantage of this:
 * a. Confusing behavior: this behaves differently based on where and how 
 *    it's used (arrow function, strict mode, etc.)
 * b. Arrow functions don't have their own this, beginner ko confusion hota
 *    hai.
 * c. Dynamic nature: Kabhi Kabhi code debugging muskil ho jaata hau because
 *    this is not static. 
*/


/**
 * When to use this?
 * 1. Inside Object methods : To refer to object's own properties.
 * 2. Inside constructor functions: For assigning properties to new instance.
 * 3. Inside class methods: For OOP-style programming.
 * 4. Reusable functions across multiple objects : Makes the function
 *    context-aware. 
*/

/**
 * When not to use this?
 * a. Inside arrow functions(for object context): They don't have their own this.
 * b. In tightly coupled functions: If function relies on one object only,
 *    this adds confusion.
 * c. Global Scope(in script mode): this is undefined in strict mode.
*/


/**
 * Quick Comparison:
 * 1. In object method : That object
 * 2. In global scope(browser) : window
 * 3. In global scope(strict mode) : undefined
 * 4. In constructor function : New object being created
 * 5. In arrow function : Lexical/parent scope's this
*/


/**
 * Step 5: Different Scenarios of this keyword
*/

/**
 * 1. In object method - That object
 *    > this keyword is used to refer to the current object.
 *    > this keyword is used to access the properties of the current object.
 *    > this keyword is used to call the methods of the current object.
*/

/* Example 1: 'this' pointing to the current object */
const userObj = {
    name: "Ali",
    greet: function() {
        return `Hello, ${this.name}!`;
    }
}

console.log(userObj.greet()); /* Hello, Ali! */


/* Example 2: 'this' pointing to the current object */
const car = {
    brand: "Toyota",
    model: "Fortuner",
    
    showDetails: function() {
        console.log(`Ye hai ${this.brand} ${this.model}`);
        /* this = car object */
    }
};

car.showDetails(); /* "Ye hai Toyota Fortuner" */


/**
 * 2. In global scope(browser) - window
 *    > In browser, this refers to the window object.
*/

/* 'this' pointing to the window object */
console.log(this); /* window */



/**
 * 3. In global scope(strict mode) - undefined
 *    > In strict mode, this is undefined.
*/

(function() {
    console.log(this); /* undefined */
})();



/**
 * 4. In constructor function - New object
 *    > When used inside a constructor function, this refers to the newly
 *      created object.
*/

/* Example 1: 'this' pointing to the newly created object */
function UserCreatedWithThis(name) {
    this.name = name;
}

const userWithThis = new UserCreatedWithThis("Ali");
console.log(userWithThis); // User { name: "Ali" }


/* Example 2: 'this' pointing to the newly created object */
function Student(name, age) {
    /* this = naya blank object jo create hoga */
    this.name = name;
    this.age = age;
    this.grade = "A";
    
    this.introduce = function() {
        return `Mera naam ${this.name} hai, umar ${this.age} saal`;
    };
}

/* new keyword use karenge */
const student5 = new Student("Rahul", 20);
const student6 = new Student("Priya", 19);

console.log(student5.introduce()); /* this = student5 */
console.log(student6.introduce()); /* this = student6 */


/**
 * 5. In arrow function - Lexical/parent scope's this
 *    > Arrow functions don't have their own this, they inherit it from the
 *      parent scope.
*/

/* Example 1: 'this' pointing to the parent scope */
const userWithArrow = {
    name: "Ali",
    greet: () => {
        return `Hello, ${this.name}!`;
    }
}

console.log(userWithArrow.greet()); /* Hello, undefined! */



/* Example 2: 'this' pointing to the parent scope */
const person = {
    name: "Rahul",
    
    /* Regular function - this = current object */
    regularFunction: function() {
        console.log("Regular:", this.name); /* "Rahul" */
    },
    
    /* Arrow function - this = parent scope (window) */
    arrowFunction: () => {
        console.log("Arrow:", this.name); /* undefined */
    }
};

person.regularFunction(); /* ✅ Works */
person.arrowFunction();   /* ❌ Doesn't work as expected */


/**
 * 6. Event Listeners mein 'this'
 *    > When used inside an event listener, this refers to the element that
 *      triggered the event.
*/

/* Example 1: 'this' pointing to the element that triggered the event */
{/* <button id="myBtn">Click Me!</button>

<script>
document.getElementById('myBtn').addEventListener('click', function() {
    console.log(this); // this = button element jis par click hua
    this.style.backgroundColor = 'red'; // Button ka color change karo
});
</script> */}



/**
 * Step 6: Common this problems and unke solutions
*/

/* Problem 1: Function ko alag se call karna */
const userObjProblem = {
    name: "Rahul",
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};

/* ✅ Sahi tarika - object ke through call karo */
userObjProblem.greet();    /* "Hello, Rahul" - this = userObjProblem */

/* ❌ Galat tarika - function ko alag se call karo */
const greetFunction = userObjProblem.greet;
greetFunction(); /* "Hello, undefined" - this = window */


/* Solution: bind() method use karna */
const userObjSolution = {
    name: "Rahul",
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};

/* Function ko bind karo taki this fixed rahe */
const boundGreet = userObjSolution.greet.bind(userObjSolution);
boundGreet(); /* "Hello, Rahul" - this = userObjSolution (fixed) */


/* Problem 2: Callback Functions mein this loss */
const studentObjProblem = {
    name: "Amit",
    subjects: ["Math", "Science"],
    
    showSubjects: function() {
        /* ❌ Problem: forEach ke andar this change ho jata hai */
        this.subjects.forEach(function(subject) {
            console.log(`${this.name} studies ${subject}`); /* this.name = undefined */
        });
    }
};

studentObjProblem.showSubjects();

/* Solution: Arrow Function use karna */
const studentObjSolution = {
    name: "Amit",
    subjects: ["Math", "Science"],
    
    showSubjects: function() {
        /* ✅ Solution: Arrow function use karo */
        this.subjects.forEach((subject) => {
            console.log(`${this.name} studies ${subject}`); /* this.name = "Amit" */
        });
    }
};

studentObjSolution.showSubjects();



/**
 * Step 7: Real World Examples
*/

/* Example 1: E-commerce Shopping Cart */
const shoppingCart = {
    items: [],
    total: 0,
    
    addItem: function(item, price) {
        this.items.push(item);
        this.total += price;
        console.log(`${item} added. Total: ₹${this.total}`);
    },
    
    checkout: function() {
        console.log(`Checkout complete! ${this.items.length} items, Total: ₹${this.total}`);
        this.items = [];
        this.total = 0;
    }
};

shoppingCart.addItem("Laptop", 50000); // this = shoppingCart
shoppingCart.addItem("Mouse", 1500);   // this = shoppingCart
shoppingCart.checkout();               // this = shoppingCart


/* Example 2: Game Character System */
function GameCharacter(name, health) {
    this.name = name;
    this.health = health;
    
    this.attack = function() {
        console.log(`${this.name} ne attack kiya!`);
    };
    
    this.takeDamage = function(damage) {
        this.health -= damage;
        console.log(`${this.name} ko ${damage} damage. Health: ${this.health}`);
    };
}

const hero = new GameCharacter("Superman", 100);
const villain = new GameCharacter("Joker", 80);

hero.attack();        // this = hero
villain.takeDamage(20); // this = villain


/**
 * Quick Reference:
 * 1. Object Method:
 *    > this = Object itself
 *    > Ex: obj.method > this = obj
 * 2. Constructor:
 *    > New object
 *    > Ex: new Person() > this = new Person
 * 3. Global Function:
 *    > Window/Global
 *    > function() > this = window
 * 4. Arrow Function:
 *    > Parent's this
 *    > Ex: () => { } > parent ka this
 * 5. Event Listener:
 *    > Target element
 *    > Ex: click > this = clicked element
*/