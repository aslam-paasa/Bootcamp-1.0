/**
 * What are interfaces?
 * - How can you assign types for object? For example, a user object that 
 *   looks like this:
 * 
 *   const user = {
 *     firstName: "Mohammad",
 *     lastName: "Aslam",
 *     email: "mohammad.aslam@gmail.com",
 *     age: 28
 *   }
 * 
 * - To assign a type to the user object, you can use interfaces.
 * 
 *   interface User {
 *     firstName: string;
 *     lastName: string;
 *     email: string;
 *     age: number;
 *   }
 * 
*/

/**
 * Q. Create a function isLegal that returns true or false if a user is 
 *    above 18. It takes a user as an input.
 * 
 *    a. Arguments - user
 *    b. Returns  - boolean
 *    c. Logs     - true if user is above 18, false otherwise
*/

interface User {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

function isLegal(user: User) {
    if (user.age > 18) {
        return true;
    } else {
        return false;
    }
}


/**
 * Nested interfaces:
 * You can also create interfaces that contain other interfaces.
*/
interface UserWithAddress {
    name: string; 
    age: number; 
    address: { 
        city: string; 
        country: string; 
        pincode: number; 
    };
}


let user: UserWithAddress = {
    name: "Rohan Dev", 
    age: 23, 
    address: { 
        city: "Panagarh", 
        country: "India", 
        pincode: 713148 
    }
};

if (user.age > 18) {
    console.log("User is an adult!");
}