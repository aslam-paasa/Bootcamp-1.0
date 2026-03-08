/**
 * Prototype - The Backbone of JavaScript Objects
 * 1. Understanding Prototypes in JavaScript
 * 2. The Prototype Chain - How Inheritance Works
 * 3. Modifying Prototypes - Do's and Don'ts
 * 4. Use a simple analogy, like a blueprint for houses, to explain
 *    prototypes
 * 5. Show practical examples of prototype-based inheritance
 * 6. Compare Object.create(), __proto__, and prototype properties
*/

/**
 * Prototype Introduction:
 * > A Prototype in JavaScript is a mechanism that allows objects to 
 *   inherit properties and methods from other objects.
 * > In simple words, Prototype allows one object to use properties and
 *   methods of another object. 
 * > This is called Inheritance in JavaScript.
*/

/**
 * Problem Statement (Why Prototypes were needed):
 * > Imagine you are creating multiple objects like users.
 * > Example:
 *   const user1 = {
 *     name: "Mohammad",
 *     greet: function() {
 *       console.log("Hello");
 *     }
 *   };
 *   
 *   const user2 = {
 *     name: "Rahul",
 *     greet: function() {
 *       console.log("Hello");
 *     }
 *   };
 *   
 * > Problem Here:
 *   - The greet function is duplicated in every object. 
 *   - If you create 1000 users, greet function created 1000 times.
 *   - This causes:
 *     - Memory wastage
 *     - Code duplication
 *     - Slower performance
 *     - Higher execution time
 * 
 * > We need a way where:
 *   All objects share one common function instead of creating duplicate
 *   copies. And this is why Prototypes were introduced.
*/

/**
 * Solution: Why Prototype was introduced?
 * > Prototype allows objects to share properties and methods.
 * > Instead of creating copy of every object, JS stores methods in
 *   Prototype.
 * > All objects access it from there.
 * > This save memory and improve performance.
*/

/**
 * What Prototype does?
 * > Prototype allows:
 *   a. Object to inherit properties
 *   b. Object to inherit methods
 *   c. Share common functionality
 * > This creates a chain called: Prototype Chain.
*/

/**
 * How JavaScript Objects work Internally?
 * > Every JavaScript object has a hidden property called: [[Prototype]]
 *   This hidden property points to another object. And this creates
 *   inheritance.
 * > You can access it using: __proto__
 * 
 * Example:
 * const obj = {};
 * console.log(obj.__proto__);
 * 
 * Output: Object.prototype
 * > This means every object inherits from Object.prototype. 
 * > Object.prototype is the top of the prototype chain.
*/

/**
 * Prototype Chain:
 * > const arr = [1, 2, 3]
 * > When you use: arr.push(4);
 *   - Question: Where does push() come from?
 *   - Answer  : JS searches in prototype chain
 *     Step-1  : Check inside arr object
 *     Step-2  : Not found
 *     Step-3  : Check Array.prototype
 *     Step-4  : Found push()
 *   - Execution happens
 *   - This is called Prototype Chain.
*/

/**
 * Prototype Chain Flow:
 * > arr.toString()
 *   - Search Order:
 *     Step-1  : Check inside arr object
 *     Step-2  : Array.prototype
 *     Step-3  : Object.prototype
 *     Step-4  : null
 *   - If found -> execute
 *   - If not found -> error
*/


/**
 * Real-Life Analogy:
 * > Imagine:
 *   - Parent - has house
 *   - Child  - inherits house
 * 
 * > Child does not build new house.
 * > Child uses parent's house.
 * 
 * > Parent = Prototype
 * > Child  = Object
 * 
 * Inheritance happens
*/


/**
 * Example using Constructor Function:
 * > function User(name) {
 *      this.name = name;
 *   }
 * 
 * > Add method using prototype:
 *   User.prototype.greet = function() {
 *      console.log("Hello" + this.name);
 *   };
 * 
 * > Create object:
 *   const user1 = new User("Mohammad");
 *   const user2 = new User("Rahul");
 * 
 * > Inheritance happens
 *   - user1 and user2 inherit greet method from User.prototype
 *   - greet() exists only once in memory.
 *   - But both objects use it via prototype.
 * > This is called: Prototype Inheritance.
*/


/**
 * Internal Structure Visualization:
 * > User1 object:
 *   {
 *      name: "Mohammad",
 *      __proto__: User.prototype
 *   }
 * 
 * > User.prototype:
 *   {
 *      greet: function() {}
 *   }
 * 
 * > So user1 access greey via prototype.
 * > This is called: Delegation.
*/


/**
 * Why Prototype is Important?
 * > Without Prototype: Every object would create duplicate methods.
 * > With Prototype   : Methods shared across objects.
 * > Benefits:
 *   - Memory Efficient
 *   - Faster Performance
 *   - Supports Inheritance
 *   - Cleaner Code
*/


/**
 * Connection b/w Prototype and JavaScript Engine:
 * > JS Engine uses Prototype Chain to:
 *   - Find properties
 *   - Find methods
 *   - Execute functions
 * > If engine does not find property in object, it searches prototype
 *   chain.
 * > This is called: Delegation.
*/



/**
 * Practical Example of Prototype Based Inheritance:
 * > Example: Animal -> Dog Inheritance
 * 
 *   a. Parent:
 *      function Animal(name) {
 *        this.name = name;
 *      }
 *      
 *      Animal.prototype.eat = function() {
 *        console.log(this.name + " is eating");
 *      };
 * 
 *   b. Child:
 *      function Dog(name, breed) {
 *        this.name = name;
 *        this.breed = breed;
 *      }
 *      
 *   c. Inheritance Setup:
 *      Dog.prototype = Object.create(Animal.prototype);
 * 
 *   d. Add child method:
 *      Dog.prototype.bark = function() {
 *        console.log(this.name + " is barking");
 *      };
 *      
 *   e. Create object:
 *      const dog1 = new Dog("Buddy", "Golden Retriever");
 *      dog1.eat();
 *      dog1.bark();
 *      
 *   f. Output:
 *      Buddy is eating
 *      Buddy is barking
 * 
 * > Flow:
 *   dog1 > Dog.prototype > Animal.prototype > Object.prototype
 *   This is inheritance
*/


/**
 * Object.create() vs proto vs prototype:
 * > This is the most confusing part:
 * 
 * 1. prototype (Used in constructor functions):
 *    - prototype is property of constructor function.
 * 
 *    - Example: Define shared methods
 *      function User() {}
 *      console.log(User.prototype);
 * 
 *    - Example: Add method to prototype
 *      User.prototype.sayHello = function() {
 *        console.log("Hello");
 *      };
 * 
 *    - Objects created using new User() inherit from User.prototype
 *      const user1 = new User("Mohammad");
 *      user1.sayHello();
 * 
 * 2. proto (Used in Object.create):
 *    - proto is hidden property in every object.
 *    - It points to prototype
 * 
 *    - Example: 
 *      const obj = {}
 *      console.log(obj.__proto__);
 * 
 *    - Output: Object.prototype
 *      It shows from where object inherits.
 * 
 *    - Example Connection:
 *      function User() {}
 *      const user1 = new User();
 *      console.log(user1.__proto__ === User.prototype);
 * 
 *    - Output: true (user1 inherits from Users.prototype)
 *      It shows connection between object and its prototype.
 * 
 * 
 * 3. Object.create() [Best modern way to create inheritance]
 *    - Object.create() creates new object with specificed prototype.
 *    - Example:
 * 
 *      const animal = {
 *        eat: function() {
 *          console.log("Eating");
 *        }
 *      };
 *      
 *      const dog = Object.create(animal);
 *      dog.eat();
 * 
 *    - Output: Eating
 *      dog inherits from animal
 * 
 *    - Prototype Chain:
 *      dog > animal > Object.prototype
 *      
*/