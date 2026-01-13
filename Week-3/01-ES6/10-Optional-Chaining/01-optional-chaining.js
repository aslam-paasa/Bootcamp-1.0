/**
 * Optional Chaining(?.) Introduction:
*/

/**
 * Problem: Accessing Deeply Nested Properties
 * - When objects have other objects inside them (nested objects), it 
 *   can be hard to safely access properties that are deep inside. You
 *   might need to check every level to see if it exists before accessing
 *   the next one.
 * - For example:
 * */

var obj = {};
if (obj && obj.data && obj.data.person && obj.data.person.name) {
    // Do something with obj.data.person.name
}

/**
 * Why is this a problem?
 * a. Repetition: 
 *    You have to repeatedly check if each part of the object exists 
 *    (obj, obj.data, obj.data.person). This becomes very long and hard
 *    to maintain.
 * b. Risk of Errors: 
 *    If any part is missing (for example, if `obj.data` is `null`), 
 *    your code will crash.
*/

/**
 * Solution: Optional Chaining(?.)
 * - Optional Chaining is a feature in JavaScript that allows you to 
 *   safely access deeply nested properties without needing to check
 *   each part manually.
*/

/**
 * Q. How does Optional Chaining work?
 *  1. ?.: checks if the part before it exists. 
 *  2. If it exists, it moves on and tries to access the next part.
 *  3. If any part is `null` or `undefined`, it returns `undefined` 
 *     without causing an error.
*/

var obj = {};
if (obj?.data?.person?.name) {
    // Do something with obj.data.person.name
}



/**
 * Challenge: Accessing nested properties
*/

var user = {
    profile: {
        details: {
            name: "John",
            age: 30
        }
    }
};

console.log(user?.profile?.details?.name); // Output: "John"
console.log(user?.profile?.details?.email); // Output: undefined (because email doesn't exist)


/**
 * Challenge: Handling null values
 * - If a part of the object is `null`, it will return `undefined` safely,
 *   instead of causing an error.:
*/

var user = {
    profile: null
};

console.log(user?.profile?.details?.name); // Output: undefined (because profile is null)



/**
 * Challenge: Array
 * - Optional chaining also works with arrays.
 * - If you try to access an array index that doesn't exist, it returns
 *   `undefined` instead of throwing an error.
*/

var data = {
    items: [{ name: "Item 1" }, { name: "Item 2" }]
};

console.log(data?.items?.[0]?.name); // Output: "Item 1"
console.log(data?.items?.[5]?.name); // Output: undefined (because index 5 doesn't exist)
