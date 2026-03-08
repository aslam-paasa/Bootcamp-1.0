/**
 * First, we'll define a User interface with several properties:
 * > id: number       => User's unique number
 * > name: string     => User's name
 * > age: number      => User's age
 * > email: string    => User's email address
 * > password: string => User's password
 */
interface User {
    id: number;
    name: string; 
    age: number;
    email: string;
    password: string;
}

/**
 * Ab Pick utility type ka use karke hum User interface se kuch specific 
 * properties ko chunenge:
 * 
 * > Pick<Type, Keys> ka matlab hai:
 *   a. Type: Wo interface jisse properties leni hai (yahan User)
 *   b. Keys: Wo properties jo hume chahiye (yahan id, name aur age)
 * 
 * Jaise kisi thaali mein se specific items chunna!
 */
type UpdateUser = Pick<User, 'id' | 'name' | 'age'>;

/**
 * Ab hum UpdateUser type ka ek object banayenge
 * Is object mein sirf wahi properties hongi jo humne Pick se chuni thi
 * Email aur password nahi daal sakte kyunki wo Pick mein nahi chune gaye
 */
const user: UpdateUser = {
    id: 9876,
    name: "Rohan",
    age: 23
};

/**
 * Console mein dekhte hain hamara user object
 * Sirf id, name, age dikhega - email aur password nahi!
 */
console.log(user);
