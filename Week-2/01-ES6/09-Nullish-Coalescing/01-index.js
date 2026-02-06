/**
 * The nullish coalescing operator(??):
 * - The nullish coalescing operator(??) is used to check if a value is
 *   null or undefined and return a default value if it is. The operator
 *   is useful when you want to provide a fallback value only whem a
 *   variable is not null or undefined.
*/

const myVariable = null;
const myDefault = 5;

const myValue = myVariable ?? myDefault;
console.log(myValue); // Output: 5


/**
 * Challenge:
 * Suppose you have an object that contains user data with properties
 * like name, age, and email. Write a function getUserData that takes 
 * the object as an argument and returns the user's name, age, and
 * email with default values of unknown, 0, and no email provided if
 * any of the properties are null or undefined.
*/

const getUserData = (user) => {
    return {
        name: user.name ?? 'unknown',
        age: user.age ?? 0,
        email: user.email ?? 'no email provided'
    };
};

// Test cases
const user1 = {
    name: 'John',
    age: 25,
    email: 'john@example.com'
};

const user2 = {
    name: null,
    age: undefined,
    email: null
};

console.log(getUserData(user1)); // { name: 'John', age: 25, email: 'john@example.com' }
console.log(getUserData(user2)); // { name: 'unknown', age: 0, email: 'no email provided' }