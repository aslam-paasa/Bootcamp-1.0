/** 
 * Prototype Inheritance:
 * - The main idea of Prototype Inheritance is that an object can point
 *   to another object and inherit all its properties and methods.
*/

/**
 * 1. Creating an Object:
 * => Every object in JS is created based on a 'constructor function'
 *    or via 'object literals'. Both mechanisms trigger the Prototype
 *    chain.
 * => Ex: Using Constructor Fn
 *    function Dog(name) {
 *       this.name = name;   // 'name' is a property set directly on the instance
 *    }
 * 
 *    a. Dog 'constructor fn' is used to create the 'dog' object.
 *    b. When the 'new Dog("Rex") is called:
 *       - The 'dog' object is created and the 'this' keyword inside the
 *         constructor refers to the new object.
 *       - The constructor fn initializes properties like 'name'. 
 * 
 * 2. The __proto__ Property(Prototype Link)
 * => Each object created in JS has a special internal property called
 *    [[Prototype]] (commonly accessed via __protp__ in most browsers).
 *    The property links the object to its prototype object. 
 * => When you create an new object via a constructor, that object's
 *    [[Prototype]] property points to the constructor's 'prototype object'.
 * => In case of dog, dog.__proto__ points to Dog.prototype. 
 *    dog --> [[Prototype]] --> Dog.prototype
 * 
 * 3. Prototype of Constructor Functions
 * => Each 'constructor function' (like Dog in the ex) has an associated
 *    'prototype object', whic is stored in the 'prototype' property of
 *    the constructor function itself.
 * 
 *    function Dog(name) {
 *       this.name = name;
 *    }
 * 
 *    const dog = new Dog("Rex");
 * 
 *    // dog.__proto__ points to Dog.prototype
 *    console.log(dog.__proto__ === Dog.prototype);  // true
 * 
 * 4. Adding Methods to the Prototype
 * => When methods are added to the 'constructor's prototype', all
 *    instances of that constructor(like dog) will inherit those methods.
 * 
 *    Dog.prototype.bark = function() {
 *       console.log(this.name + "barks!");
 *    };
 * 
 *    const dog = new Dog("Rex");
 *    dog.bark(); // "Rex barks!"
 * 
 * => Method bark() is added to Dog.prototype, not directly on the 
 *    dog object. 
 * => Since dog.__proto__ points to Dog.prototype, calling dog.bark()
 *    will search for bark() on Dog.prototype. 
 * 
 * 5. Prototype Chain Lookup:
 * => When you access a property or method on an object like dog, JS
 *    follows these steps:
 *    a. Step-1: Look on the object itself.
 *       - First JS checks if the property (or method) exists directly
 *         on the object(dog in this case). If found, it uses it.
 *       - Example: dog.name is found directly on dog.
 *    b. Step-2: Look on the object's prototype:
 *       - If the property or method isn't found directly on the object,
 *         JS looks at 'dog.__proto__', which points to Dog.prototype. 
 *         If it's there JS uses it.
 *       - Example: dog.bark() is not found directly on dog, so it is
 *         looked up on Dog.prototype. 
 *    c. Step-3: Continue up the prototype chain
 *       - If it's not found on Dog.prototype, JS looks at
 *         Dog.prototype.__proto__. This is the end of the prototype
 *         chain.
 *       - Object.prototype which is the root prototype for all objects
 *         in JS. All objects eventually inherit from Object.prototype.
 *       - If the property or method is still not found, JavaScript 
 *         returns undefined.
 * 
 *         dog.toString(); // Found on Object.prototype
 * 
 * 6. The Prototype Chain(from Object Creation to Object.prototype)
 * => Here is the flow of how JS Searches for properties and methods:
 *    1. dog(the object)
 *        |
 *        V
 *    2. Dog.prototype(methods shared by all Dog instances, like bark())
 *        |
 *        V
 *    3. Object.prototype(the ultimate base object for all objects in JS)
 *        |
 *        V
 *    4. null(End of the prototype chain)
 * 
 * 7. How the Prototype Chain supports Inheritance:
 * => This chain forms the basis of inheritance in JS. Each object can
 *    inherit properties and methods from its prototype. Inheritance
 *    flows from one object to another though the prototype chain.
 * 
 *    function Animal(name) {
 *       this.name = name;
 *    }
 * 
 *    Animal.prototype.sayHello = function() {
 *       console.log("Hello! I am " + this.name);
 *    }
 * 
 *    function Dog(name) {
 *       Animal.call(this, name); // Inherit properties from Animal
 *    }
 * 
 *    // Inherit methods from Animal prototype
 *    Dog.prototype = Object.create(Animal.prototype);
 *    Dog.prototype.constructor = Dog;
 * 
 *    const dog = new Dog("Rex");
 *    dog.sayHello(); // Output: "Hello, I am Rex"
 * 
 *    a. JavaScript first checks if sayHello exists on dog (it doesn't).
 *    b. JavaScript checks dog.__proto__, which points to Dog.prototype.
 *       sayHello is not there.
 *    c. JavaScript continues up to Dog.prototype.__proto__ (which is 
 *       Animal.prototype), and finds the sayHello method there.
 *    d. It calls sayHello() from Animal.prototype, and the method runs.
*/

/**
 * Example:
 * const obj1 = {
 *    name: "Akanksha",
 *    printName: function() {
 *       console.log(this.name);
 *    }
 * }
 * 
 * const obj2 = {
 *    city: "Bangalore",
 *    __proto__: obj1
 * }
 * 
 * => Inherited obj1 & obj2
 * const obj3 = {
 *    country: "India",
 *    __proto__: obj2
 * }
 * 
 * obj3.printName();  => Akanksha
 * 
 * Note: If we override any property, object or fn will choose the
 *       nearest key-value pair property.
*/