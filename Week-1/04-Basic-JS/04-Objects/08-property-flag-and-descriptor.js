/**
 * What are Property Flags and Descriptors?
 * - Every property in a JavaScript object has extra hidden settings, like:
 *   a. Can I change the value?          (writable)
 *   b. Can I see it in a loop?          (enumerable)
 *   c. Can I delete or re-configure it? (configurable)
 * - These are called property flags and descriptors.
*/


/**
 * How to view a property's descriptors?
 * - You can check a property's internal settings using:
 *   Object.getOwnPropertyDescriptor(object, "propertyName")
*/


const person = {
    name: "John",
    age: 20,
    city: "New York"
};

console.log(Object.getOwnPropertyDescriptor(person, "name"));


/**
 * Output:
 * {
 *   value: 'John',
 *   writable: true,
 *   enumerable: true,
 *   configurable: true
 * }
 * 
 * - By default, properties you can create with {} have:
 *   a. writable: true      [You can change the value]
 *   b. enumerable: true    [It shows up in for...in or Object.keys()]
 *   c. configurable: true  [You can delete or change its descriptor]
*/


/**
 * Let's change these flags:
 * - We'll use Object.defineProperty() method to update the flags of name:
*/

Object.defineProperty(person, "name", {
    value: "John",
    writable: false,       // Can't change value
    enumerable: false,     // Won't appear in loops
    configurable: false    // Can't delete or modify again
});

console.log(Object.getOwnPropertyDescriptor(person, "name"));


/**
 * Output:
 * {
 *   value: 'John',
 *   writable: false,
 *   enumerable: false,
 *   configurable: false
 * }
 * 
 * - Now, name is locked and can't be changed.
*/


/**
 * Typing to Change the Name:
 * - Why? Because writable is false.
 * - Cannot change the value of the property.
*/
person.name = "Jane";
console.log(person.name); // Still "John"


/**
 * Trying to Loop Over Keys:
 * - "name" won't show up. Why? Because enumerable is false.
*/
for (let key in person) {
    console.log(key);         // Output: age, city
}


/**
 * Trying to Delete the Property:
 * - Can't delete it. Why? Because configurable is false.
*/
delete person.name;
console.log(person.name); // Still "John"


/**
 * Based on this concept, Object Utility Methods are created:
 * 1. Object.freeze()
 * 2. Object.seal()
 * 3. Object.is()
 * 4. Object.isSealed()
 * 5. Object.isFrozen()
*/