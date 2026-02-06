/**
 * Object Destructuring
 * - Object destructuring is a feature that allows you to extract values
 *   from objects and assign them to variables.
 * 
 * Real World Example:
 * - Imagine aapke pass ek user object hai jisme user ki details hain.
 *   Destructuring se aap in details ko easily extract kar sakte hain.
 */

const destructExample = ({ a, b }) => {
    console.log(a, b);
}

const obj = { a: 1, b: 2 }
console.log(destructExample(obj));

/**
 * So, we can say:
 * - Destructuring is a way to unpack values from arrays or properties from 
 *   objects into distinct variables.
 * - In the above, example:
 *   "destructExample" takes an object as its argument and uses destructuring
 *   assignment to extract "a" and "b" properties from the object.
 *   This means that the function expects an object with "a" and "b" properties
 *   will extract those properties.
*/




/**
 * Real World Example:
 * Suppose aapke pass ek user object hai with name, age, and email
 */
const user = {
    name: "Rahul",
    age: 25,
    email: "rahul@example.com"
};

// Destructuring ka use karke values extract karna
const { name, age, email } = user;
console.log(name);  // Output: "Rahul"
console.log(age);   // Output: 25
console.log(email); // Output: "rahul@example.com"

/**
 * Kya fayda hai?
 * 1. Code clean aur readable hota hai
 * 2. Multiple lines ki jagah ek line mein kaam ho jata hai
 * 3. Object properties ko directly variables mein assign kar sakte hain
 */



/**
 * Another feature of destructuring is, we can rename the variables
 * while extracting the values.
*/

const userDetails = {
    name: "Rahul",
    age: 25,
    email: "rahul@example.com"
};

const { name: userName, age: userAge, email: userEmail } = userDetails;
console.log(userName, userAge, userEmail);