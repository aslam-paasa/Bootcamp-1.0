/**
 * Objects in Real World :
 * - In the real world any non-living entity can be referred to as an Object.
 *
 * - A car, boke, smartphone, laptop, chair, table and any simplest thing
 *   you can think of is basically an object.
 *
 * - These objects have some property and functionality. Consider a
 *   smartphone.
 *
 * - Its properties are -
 *   (a) Color
 *   (b) Size of the screen
 *   (c) Storage
 *   (d) Camera
 *   (e) Battery
 *
 * - Its functionalities are -
 *   (a) Calling
 *   (b) Running applications
 *   (c) Browsing
 *   (d) Taking pictures/videos
 *
 * - In the same way objects are used in JavaScript or in programming in
 *   general to represent it as a real world object. These objects also
 *   possess some properties and functionalities more commonly referred to
 *   as methods/functions which are discussed below.
 */

/**
 * Objects in JS :
 * - Objects in JavaScript is an entity which has properties and methods
 *   associated with it. These objects have properties in the form of
 *   "key : value" pairs.
 *   a. key is a string which can also be referred to as property name,
 *   b. value can be anything (e.g. string, number, null, array, function etc)
 *
 * - Everything in JavaScript is an object except the primitive data types
 *   that include number, string, boolean, null, undefined.
 */

/**
 * Q. Why do we use Objects in JS?
 * > Arrays mein hum sirf values store kar sakte hain
 * > Objects mein hum values ke saath uska context bhi store kar sakte hain
 *
 * Example:
 * a. Array - Sirf values, context nahi pata
 *    > const studentArray = ["Rahul", 20, "Math"];
 *
 * b. Object - Values ke saath context bhi
 *    > const studentObject = {
 *          name: "Rahul",
 *          age: 20,
 *          subject: "Math"
 *      };
 */

/**
 * Ways to create an object :
 * 1. Using Object literal
 * 2. Using new keyword
 * 3. Using constructor function
 * 4. Using Object.create() method
 * 5. Using class
 */

/**
 * Creating objects using Object literal :
 * - Choti applications ye simple data structure bana rahe hote hai tab
 *   Object literal perfect hota hai.
 * - Lekin jaise-jaise project bada hota hai, repeat hone wala code, reusable
 *   code, reusable structure, flexibility, aur inheritance ki need hoti
 *   ho toh Object literal ko use nahi karte.
 * - Tabhi baaki methods ka use shuru hota hai -
 *   a. new Object()
 *   b. constructor functions
 *   c. Object.create()
 *   d. class
 */

/**
 * 1. Object Literal - Sabse simple tarika
 *    a. Kab use kare?
 *       > Jab v object banana ho
 *       > Jab code chota aur simple ho
 *       > Jab same structure ko multiple objects na banane ho
 *       > Example:
 *         const objectName = {
 *             key1: value1,
 *             key2: value2,
 *             key3: value3
 *         };
 *
 *         const carObjectLiteral = {
 *           brand: "Toyota",
 *           model: "Fortuner",
 *           color: "Black",
 *         };
 *
 *    b. Kab nahi use kare?
 *       > Jab multiple similar objects banane ho
 *       > Jab methods ke through behavior define karna ho
 */

/**
 * Example 1:
 */
const studentObjectLiteral = {
  name: "Amit",
  rollNumber: 15,
  isDayScholar: true,
  subjects: ["Math", "English", "Hindi"],
  address: {
    city: "Delhi",
    pincode: 110001,
  },
};

/* Object ko use kaise karein */
console.log(
  `Student ${studentObjectLiteral.name} ki roll number hai ${studentObjectLiteral.rollNumber}`
);
console.log(
  `Ye ${studentObjectLiteral.isDayScholar ? "Day Scholar" : "Hosteller"} hai`
);
console.log(`Ye padhta hai: ${studentObjectLiteral.subjects.join(", ")}`);

/**
 * Example 2:
 */
const laptop = {
  make: "Dell",
  model: "Alienware",
  memory: ["SSD", "HDD"],
  cores: 8,
  memorySize: [256, 512],
};

console.log(`Recently, I bought a ${laptop.model} ${laptop.make} Laptop. 
This model has amazing features like : 
1. ${laptop.memory} Memory,
2. ${laptop.cores} Cores, 
3. ${laptop.memorySize} GB Memory Sizes`);

/**
 * Example 3:
 */
const student = {
  name: "abc",
  rno: 5,
  isDayScholar: true,
  subject: ["maths", "english", "hindi"],
};

console.log(student);
console.log(`student ${student.name} has roll number ${student.rno}
and isDayScholar : ${student.isDayScholar == true ? "yes" : "no"},
having subjects ${student.subject}`);

/**
 * 2. new Object() : Dynamic Object banana
 *    a. Kab use kare?
 *       > Jab runtime pe dynamically properties add karni ho
 *       > Jab object ki structure pehle se fixed nahi hai
 *       > Jab external library/object structure follow karna ho
 *
 *       > Syntax:
 *         const objectName = new Object();
 *         objectName.key1 = value1;
 *         objectName.key2 = value2;
 *
 *       > Example:
 *         const carNewObject = new Object();
 *         carNewObject.brand = "Toyota";
 *         carNewObject.model = "Fortuner";
 *         carNewObject.color = "Black";
 *
 *    b. Kab nahi use kare?
 *       > Jab stucture predefined ho - Object literal better rahega
 *       > Kyuki ye thoda verbose hota hai (zyada likhna padta hai)
 *       > Verdict: Rarely used, mostly for dynamic object creation
 */

/**
 * Example 1:
 */
/* Khali object banayein */
const mobile = new Object();

/* Properties dynamically add karein */
mobile.brand = "Samsung";
mobile.model = "Galaxy S23";
mobile.price = 70000;
mobile.features = ["5G", "128GB Storage", "Triple Camera"];

console.log(mobile);
console.log(`Mera naya mobile: ${mobile.brand} ${mobile.model}`);
console.log(`Iski features: ${mobile.features.join(", ")}`);

/**
 * Example 2:
 */

/* Khali object banae */
const newStudent = new Object();

/* Properties dynamically add kare */
newStudent.name = "abc";
newStudent.rno = 15;
newStudent.isDayScholar = true;
newStudent.subject = new Array("maths", "english", "hindi");

console.log(newStudent);
console.log(`Student ${newStudent.name} has roll number ${newStudent.rno}
and isDayScholar : ${newStudent.isDayScholar == true ? "yes" : "no"},
having subjects ${newStudent.subject}`);

/**
 * 3. Using constructor function - Reusable Object Blueprint (Old school class)
 *    a. Kab use kare?
 *       > Jab same structure ke multiple objects banane ho
 *       > Jaise ek class se multiple students
 *
 *       > Syntax:
 *         function ConstructorName(param1, param2) {
 *             this.property1 = param1;
 *             this.property2 = param2;
 *         }
 *         const object1 = new ConstructorName(value1, value2);
 *
 *       > Example:
 *         function CarUsingConstructor(brand, model, color) {
 *           this.brand = brand;
 *           this.model = model;
 *           this.color = color;
 *         }
 *
 *    b. Kab nahi use kare?
 *       > Modern JS mein class zyada readable aur easy hai
 *       > new keyword galat use kar diya toh 'this' se dikkat ho skta hai
 *       > Verdict: Good, but class is preferred in modern code
 */

/**
 * Example 1:
 */

/* Blueprint banae */
function CarUsingConstructor(brand, model, color) {
  this.brand = brand;
  this.model = model;
  this.color = color;

  /* Method bhi add kar sakte hain */
  this.getDetails = function () {
    return `${this.brand} ${this.model} (${this.color})`;
  };
}

/**
 * Multiple objects banayein:
 */
const carOne = new CarUsingConstructor("Toyota", "Fortuner", "Black");
const carTwo = new CarUsingConstructor("BMW", "X5", "White");

console.log(carOne);
console.log(carTwo);
console.log(carOne.getDetails());
console.log(carTwo.getDetails());

/**
 * Example-2:
 */
function Laptop(ram, processor, screenSize) {
  this.ram = ram;
  this.processor = processor;
  this.screenSize = screenSize;
}

/**
 * Creating the objects by calling the constructor:
 */
let myLaptop = new Laptop(16, "i7", 14);

console.log(myLaptop);
console.log(myLaptop.processor);

/**
 * 4. Using Object.create(proto) - Inheritance ka simple tarika
 *    a. Kab use kare?
 *       > Jab kisi existing object se naya object banana ho
 *         (Prototypal inheritance)
 *       > Jab inheritance chahiye par class use nahi karna ho
 *         (Prototype-based system samjhana ho)
 *
 *       > Syntax:
 *         const parentObject = {
 *             // properties and methods
 *         };
 *
 *         const childObject = Object.create(parentObject);
 *         childObject.newProperty = value;
 *
 *    b. Kab nahi use kare?
 *       > Jab class ya constructor zyda readable ho
 *       > Beginners k liye thoda confusing lag skta hai
 *       > Verdict: Used when you want inheritance without class
 */

/**
 * Example 1:
 */

/* Base (Parent) Object */
const vehicle = {
  type: "vehicle",
  wheels: 4,
  start: function () {
    console.log(`${this.type} started!`);
  },
  stop: function () {
    console.log(`${this.type} stopped!`);
  },
};

/* Child Object banayein */
const car = Object.create(vehicle);
car.type = "Car";
car.brand = "Toyota";
car.model = "Fortuner";

/* Use karein */
car.start(); // "Car started!"
console.log(car.brand); // "Toyota"
console.log(car.wheels); // 4 (inherited from vehicle)

/**
 * Example 2:
 */
const baseCar = {
  wheels: 4,
  start() {
    console.log("Car started!");
  },
};

const myCar = Object.create(baseCar);
myCar.brand = "Toyota";

console.log(myCar);

/**
 * Example 3:
 */
const laptop2 = {
  make: "Dell",
  model: "Alienware",
  memory: ["SSD", "HDD"],
};

const laptop3 = Object.create(laptop2);

console.log(laptop3);

/**
 * 5. Using class - Modern and readable way (Professional way)
 *    a. Kab use kare?
 *       > Jab multiple objects same structure ke chaiye (Reusable)
 *       > Jab methods bhi add karne ho (like drive(), stop())
 *       > Jab clean and modern code likhna ho
 *       > Modern Projects mein yahi prefer kiya jata hai
 *
 *       > Syntax:
 *         class ClassName {
 *             constructor(param1, param2) {
 *                 this.property1 = param1;
 *                 this.property2 = param2;
 *             }
 *
 *             method1() {
 *                 // method code
 *             }
 *         }
 *         const object1 = new ClassName(value1, value2);
 *
 *    b. Kab nahi use kare?
 *       > Jab sirf ek chotta sa static object banana ho
 *       > Jab aapko class ki power (like inheritance/polymorphism) nahi
 *         chaiye
 *       > Verdict: Best and most modern way for OOP in JS
 */

/**
 * Example 1:
 */

class Car {
  constructor(brand, model, color, year) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.year = year;
  }

  /* Methods */
  drive() {
    console.log(`${this.brand} ${this.model} is driving!`);
  }

  getAge() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.year;
  }

  getDetails() {
    return `${this.brand} ${this.model} - ${this.color} (${this.year})`;
  }
}

/* Objects banayein */
const myCar = new Car("Toyota", "Fortuner", "Black", 2022);
const friendCar = new Car("Hyundai", "Creta", "White", 2023);

myCar.drive();
console.log(myCar.getAge());
console.log(myCar.getDetails());

/**
 * Example 2:
 */

class Student {
  constructor(name, rollNo, grade) {
    this.name = name;
    this.rollNo = rollNo;
    this.grade = grade;
    this.subjects = [];
  }

  addSubject(subject) {
    this.subjects.push(subject);
    console.log(`${subject} added to ${this.name}'s subjects`);
  }

  getStudentInfo() {
    return `
      Student Name: ${this.name}
      Roll Number: ${this.rollNo}
      Grade: ${this.grade}
      Subjects: ${this.subjects.join(", ")}
      `;
  }
}

/* Use karein */
const student1 = new Student("Amit", 101, "A");
student1.addSubject("Math");
student1.addSubject("Science");
student1.addSubject("English");

console.log(student1.getStudentInfo());

/**
 * Example 3:
 */
class Laptop {
  constructor(ram, processor, screenSize) {
    this.ram = ram;
    this.processor = processor;
    this.screenSize = screenSize;
  }
}

const myLaptop2 = new Laptop(16, "i7", 14);

console.log(myLaptop2);
console.log(myLaptop2.processor);

/**
 * Summary:
 * 1. Ek object?                  - Object literal
 * 2. Reusable & similar objects? - Class or Constructor Function
 * 3. Inheritance se kaam?        - Object.create() or Class extends
 * 4. Super dynamic structure?    - new Object()
 */




/**
 * Exercise 1: Book Object 
*/

/* Book object banayein Object Literal se */
const book = {
  title: "JavaScript Guide",
  author: "John Doe",
  pages: 300,
  isAvailable: true
};

/* Yahan apna code likhein */
console.log(book.title);
console.log(book.author);
console.log(book.pages);
console.log(book.isAvailable);



/**
 * Exercise 2: Product Constructor
*/

/* Product constructor banayein */
function Product(name, price, category) {
  /* Yahan apna code likhein */
}

/* Test karein */
const laptopTest = new Product("Laptop", 50000, "Electronics");
console.log(laptopTest.name);



/**
 * Exercise 3: Bank Account Class
*/

class BankAccount {
  constructor(accountHolder, initialBalance) {
      /* Yahan apna code likhein */
  }
  
  deposit(amount) {
      /* Yahan apna code likhein */
  }
  
  withdraw(amount) {
      /* Yahan apna code likhein */
  }
}