/**
 * Q. Write a function that takes an object with name and age as input and
 *    logs a greeting message with the user's name and age.
 * 
 *    a. Arguments - user
 *    b. Returns  - void
 *    c. Logs     - Hello {name}, you are {age} years old.
 * 
 * 1. Declare the function
 * 2. Invoke the function with an object
 *    a. Arguments - user
 *    b. Returns  - void
 *    c. Logs     - Hello {name}, you are {age} years old.
*/

function wish(user: {
    name: string;
    age: number
}) {
    console.log(`Hello ${user.name}, you are ${user.age} years old.`);
}

wish({
    name: "Gaurav",  // User's name
    age: 22,         // User's age
});


let user = {
    name: "Rohan Dev",  // User's name
    age: 23,            // User's age
};

wish(user);
