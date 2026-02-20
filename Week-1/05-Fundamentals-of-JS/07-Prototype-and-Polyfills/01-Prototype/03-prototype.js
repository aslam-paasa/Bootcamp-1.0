/**
 * Prototype:
 * - In JavaScript, prototypes is an in-built object that other objects
 *   can inherit properties and methods from, allowing them to share 
 *   behavior. This concept help avoid duplicating the same code across
 *   multiple objects.
 * 
 * Example of Prototype in Action:
 * => Create a basic object (a simple car object)
 *    function Car(make, model) {
 *       this.make = make;
 *       this.model = model;
 *    }
 * 
 * => Add a method to the prototype of Car
 *    Car.prototype.displayInfo = function() {
 *       console.log(`Car make: ${this.make}, model: ${this.model}`);
 *    }
 * 
 * => Create an instance of Car
 *    const myCar = new Car('Toyota', 'Corolla');
 * 
 * => Call the method from the prototype
 *    myCar.displayInfo(); // Output: "Car make: Toyota, model: Corolla"
 * 
 * 1. Car is a constructor function used to create car objects.
 * 2. displayInfo is a method added to the Car prototype.
 * 3. myCar is an object created using the Car constructor. Even though
 *    displayInfo is not a direct property of myCar, it can still use it
 *    because the method is in Car.prototype. 
 * 
 * Q. Why use Prototypes?
 * => Memory Efficiency:
 *    Instead of defining the same method inside every object(which can
 *    take up more memory), we can define it once in the prototype. All
 *    objects created using the same constructor function can share that
 *    method.
 * => Prototype Inheritance:
 *    Prototypes enable inheritance in JS. When you create an object,
 *    it doesn't just have its own properties. It also has access to
 *    properties and methods defined on its prototype.
*/ 
