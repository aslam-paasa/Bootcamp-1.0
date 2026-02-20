/**
 * Polyfills:
 * 1. Map     [done]
 * 2. Filter  [done]
 * 3. Reduce  [done]
 * 4. Some    [done]
 * 5. Slice   
 * 6. Splice
 * 7. CharAt
 * 8. Deep Copy
 * 9. Abstract Equality Comparison
 * 10. JSON Stringify
 * 11. JSON.parse
 * 12. Currying
 * 13. Debounce  [done]
 * 14. Throttle  [done]
 * 15. Flatten   [done]
 * 16. setTimeout
 * 17. setInterval
 * 18. Async Waterfall
 * 19. Object.assign
*/

/**
 * What is a Polyfill?
 * - Think of a polyfill like a translator:
 *   a. When new features come out, older browsers can't understand them.
 *   b. A polyfill translates these new features into code that older browsers
 *      can understand!
*/

/**
 * Why do we need Polyfills?
 * - www.example.com: Their users are using different browsers:
 *   a. 40% use 2-year-old Chrome on Linux
 *   b. 30% use 1-year-old Chrome on Mac
 *   c. 30% use latest Chrome on Windows
 * 
 * The Problem:
 * - New features only work for 30% of users (those with latest browsers).
 * - The other 70% can't use these features because their browsers are older.
 * 
 * The Solution:
 * - We write polyfills - custom code that makes new features work in old browsers.
 * - This way, ALL users can enjoy the website's features, regardless of their
 *   browser!
*/

/**
 * Why not just ask users to update their browsers?
 * - Many users can't update due to:
 *   • Old devices that don't support newer browsers
 *   • Company policies restricting updates
 *   • Limited internet access for large downloads
 *   • Some users simply prefer older versions
 * - As developers, we want our websites to work for everyone!
*/


/**
 * Two Core features of JS is used to write polyfills:
 * 1. Prototype
 *    - JS is a prototype based language.
 *    - Prototype is the example of wrong choice of word.
 *    - It should be renamed to 'link' so that the phrase becomes:
 *      "JS is a LINK based language."
 *    - Explanation with Real Life Examples:
 *      a. Object Creation (Birth of Child):
 *         - const obj = {}; is same as new Object()
 *         - Every Object is created from a function
 *         - Real Life Example: 
 *           Just like how a baby is born from parents,
 *           const baby = new Parent() creates a new object
 *      
 *      b. Parent-Child Relationship (Inheritance):
 *         - Function : Acts like a Father
 *         - Object   : Acts like a Child
 *         - Real Life Example:
 *           Just like how a child inherits eye color, height from parents,
 *           Array objects inherit push(), pop() from Array function
 *      
 *      c. Method Sharing (Inheritance):
 *         - Functions share Methods via prototype key
 *         - Real Life Example:
 *           Like how all Honda City cars share same engine design,
 *           all Array objects share same push() method design
 *      
 *      d. Prototype Chain (Inheritance Chain):
 *         - Every Function has a 'prototype' property
 *         - Real Life Example:
 *           Like Family Tree: 
 *           - Child -> Father -> Grandfather
 *           - Array -> Object -> null
 *           - When we call arr.toString(), if not found in Array,
 *             JS looks in Object, then null
 * 
 *      e. Example:
 *         Step-1: Create a Blueprint : Constructor Function
 *         - Every car will have a brand name when it's created.
 * 
 *           function Car(brand) {
 *            this.brand = brand;
 *           }
 *         
 *         Step-2: Share a Method with all instance Using prototype
 *         - All cars made from this blueprint will share the same "drive"
 *           behavior, just like how all cars have the ability to drive.
 * 
 *           Car.prototype.drive = function() {
 *             return `${this.brand} car is driving`;
 *           };
 *         
 *         Step-3: Create a New Car (Object)
 *         - You just built a car from the blueprint:
 *           "Honda" is born from Car!
 * 
 *           const myCar = new Car("Honda");
 *         
 *         Step-4: Prototype Chain - Look for method in prototype chain
 *         - Your car(myCar Object) didn't have drive method directly, so
 *           JS looked up the prototype chain and found it in Car.prototype.
 * 
 *           console.log(myCar.drive());  <== Output: Honda is driving
 * 
 *         - Visual:
 *           myCar -> Car.prototype -> Object.prototype -> null
 * 
 *         - In JS, whenever you call a method on an object, JS looks for that
 *           method in the object itself. If not found, it looks in the object's
 *           prototype. This continues up the prototype chain until the method is
 *           found or the chain ends at null.
 *         
 *         Step-5: Verify prototype chain
 *           console.log(myCar.__proto__ === Car.prototype);               // true
 *           console.log(Car.prototype.__proto__ === Object.prototype);    // true
 *           console.log(Object.prototype.__proto__ === null);             // true
 * 
 * Note: 
 * - Constructor is a fn (like Car) that creates objects.
 * - prototype is a shared place where method live (like drive)
 * - new Car() creates a new object (myCar) and link to Car.prototype
 * - Prototype Chain is a way to find methods up in the chain.
 * 
 * 2. this:
 *    - Value of this depends how you call a function.
 *    - Quick Tip:
 *      a. Agar function k left m kuch nhi hai to: this = window
 *      b. Agar function k left m kuch hai to: this = object
 *    - Example:
 *      a. function show() {
 *            console.log(this.frontendMaster);
 *         }
 *         window.frontendMaster = "Frontend Master";
 *         show(); // Output: Frontend Master
 * 
 *      b. function show() {
 *            console.log(this.frontendMaster);
 *         }
 * 
 *         const obj = {
 *           frontendMaster: "Frontend Master",
 *           show
 *         }
 *         obj.show(); // Output: Frontend Master
*/


/**
 * Two things to keep in mind before solving Polyfills:
 * 1. You have to use another alternative method of doing the same thing.
 *    a. Easy way to banao agar kuch samajh nhi aae to.
 *    b. If interviwers ask to try some other method, then you can do that.
 * 2. Some time you might have to implement that thing.
 *    a. Koi bahut basic chij puch le like map, forEach to humein wo bahut
 *       hi scratch se bnani hoti hai.
 *    b. Complex chije like call, apply, bind etc, m hum in-built fn use
 *       kar sakte hai.
*/

/**
 * How to proceed with Polyfills Question:
 * 1. You don't have to be 100% correct always. It's fine not to know something.
 * 2. Pehle pure function likho, to understand how that function is working.
 * 3. Fir pure function ko prototype chain mein attach karo.
 * 4. Agar humne 'this' ka use kar k solve kar diya to interviwer convinced
 *    hai ki humein chije aati hai.
 * 5. Re-visit logic to see if something can be changed, or needs implementation
 *    from scratch.
*/

/**
 * Mindset of Interviewer:
 * 1. Your understanding of the concept.
 * 2. Analytical thinking.
 * 3. Understanding of prototyoe and this.
*/




