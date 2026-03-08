/**
 * Interfaces with Functions
 * - You can create interfaces that contain functions.
 * 
 *   interface People {
 *     name: string;
 *     age: number;
 *     greet: () => string;
 *   }
*/

/**
 * Q. Define an interface named People to enforce a specific structure for objects
 * 
 *    a. Arguments - People
 *    b. Returns  - void
 *    c. Logs     - Hi Rohan Dev
*/
interface People{
    name: string;
    age: number;
    greet: () => string, // greet is a arrow function that returns a string value

}

/**
 * Q. Create an object named 'person' that adheres to the People interface
 * 
 *    a. Arguments - People
 *    b. Returns  - void
 *    c. Logs     - Hi Rohan Dev
*/
let person: People = {
    name: "Rohan Dev",
    age: 23,
    greet: () => {
        return "Hi " + person.name;
    }
};


console.log(person.greet());