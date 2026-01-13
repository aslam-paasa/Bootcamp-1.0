/**
 * Optional Chaining (?.)
 * - Agar hum kisi nested object property ko access kar rhe h,
 *   toh har level pe check karna pdta hai ki wo property exist 
 *   karti hai ya nhi. 
 * - Agar bich m undefined ho gya to poora code crash ho jata hai.
 * - Optional Chaining help karta hai safely access karne k liye
 *   without writing many checks.
 * 
 * Syntax:
 * - object?.property?.property?.property  (object k liye) 
 * - object?.[index]                       (array ke liye)
 * - object?.function()                    (function ke liye)
*/


/**
 * Kab use karte hai Optional Chaining?
 * 1. Accessing Deep Nested Object Properties:
 *    const user = {
 *       address: {
 *          city: 'Mumbai'
 *       }
 *    };
 *    console.log(user.address?.city); // Mumbai
 * 
 * - Agar address exist nhi karta, toh undefined return karega
 *   lekin code crash nahi hoga.
 * 
 * 
 * 2. Accessing Array Index:
 *    const users = [{ name: 'Nish' }];
 * 
 *    console.log(users[0]?.name); // Nish
 *    console.log(users[1]?.name); // undefined (no error)
 * 
 * 
 * 3. Calling functions (only if they exist):
 *    const obj = {
 *       greet: () => 'Hello'
 *    };
 *    console.log(obj?.greet?.()); // Hello
 *    console.log(obj?.greet?.()); // undefined (no error)
*/


/**
 * Where not to use:
 * - While assigning values - Optional Chaining is only for reading,
 *   not writing.
 * 
 *   obj?.name = 'Mohammad';  => Invalid
 *   obj.name = obj?.name || 'Guest';  => Valid
*/


/**
 * Problem: Accessing Deep Nested Properties in JS Objects
 * - Imagine you're working on a frontend project and you're
 *   getting a user object from the backend API.
*/

const user = {
    name: 'Nish',
    address: {
        city: 'Delhi'
    }
};

/**
 * Situation:
 * - Some users will have 'address', some users won't.
 * - Now you try to access 'user.address.city', and BOOM - if
 *   address is missing, your code crashes.
*/

console.log(user.address.city); // ❌ error if address doesn't exist


/**
 * Why this happens?
 * - JS tries to read 'address'city' but agar address undefined hai, to
 *   undefined.city kaam nhi karega.
 * - Isliye milta hai error: "Cannot read properties of undefined". 
*/



/**
 * Approach-1: Ternary Operator (Traditional Way)
 * - Check if address exists, then access city, otherwise return undefined
*/

console.log(user.address ? user.address.city : undefined);


/**
 * Approach-2: Logical AND Operator (&&)
 * - Use && to check if address exists before accessing city
 * - Ye kaafi long aur boring lagta hai, especially if you're
 *   accessing deep nested properties again and again.
*/

console.log(user.address && user.address.city);



/**
 * Example of deeply nested object:
*/

const customerDetail = {
    userId: '123456',
    account: {
        accountToken: 'ABC1234',
        holder: {
            profile: {
                firstName: 'Mahi',
                lastName: 'Khurana',
                birthDate: '1990-10-10',
            }
        }
    }
};


/**
 * Suppose you want to access firstName:
 * a. Painful Way
 * b. Using Optional Chaining
*/

/**
 * Approach-1: Painful Way
*/
console.log(customerDetail.account && customerDetail.account.holder && customerDetail.account.holder.profile && customerDetail.account.holder.profile.firstName);


/**
 * Approach-2: Using Optional Chaining
 * - Simple, clean, and easy to read
*/
console.log(customerDetail?.account?.holder?.profile?.firstName);



