/**
 * Prototype & Inheritance in JavaScript:
 * 1. Prototype Inheritance with analogy-based story
 * 2. prototype vs __proto__
 *    a. What does new do in realtion to __proto__ when two objects are
 *       created from one class?
 *    b. Acheive inheritance without using extend
 * 3. Analogy-Based "Events" in JavaScript
 * 4. Use analogies like blueprints or genetic traits to explain prototypes
 * 5. Demonstrate inheritance without extends
 * 6. Explain JavaScript events using real-world examples.
*/

/**
 * Prototype Inheritance using Blueprint Analogy:
 * > Imagine you are building houses.
 * > You create a blueprint:
 *   - Blueprint defines structure
 *   - All houses built from blueprint follow same structure
 * > In JS:
 *   - Blueprint = Prototype
 *   - House     = Object
 *   - Inheritance = Sharing blueprint
 * 
 * Example:
 * function House(color, rooms) {
 *   this.color = color;
 *   this.rooms = rooms;
 * }
 * 
 * Blueprint(Prototype):
 * House.prototype.describe = function() {
 *   console.log(`This house has ${this.rooms} rooms and color ${this.color}`);
 * };
 * 
 * Create Houses:
 * const house1 = new House("Blue", 3);
 * const house2 = new House("Red", 5);
 * 
 * house1.describe();
 * house2.describe();
 * 
 * 
 * Important:
 * - describe() exists only once in prototype.
 * - All houses inherit it
 * - Memory efficient
*/


/**
 * Genetic Traits Analogy (Inheritance):
 * 
*/