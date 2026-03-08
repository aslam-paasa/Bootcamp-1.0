/**
 * Pehle, hum ek UserMap type banayenge jisme user ki basic details hongi:
 * > name: string  => User ka naam
 * > age: number   => User ki umar
 * > email: string => User ka email address
 */
type UserMap = {
    name: string;
    age: number;
    email: string;
}

/**
 * Map ka use karke hum ek data structure banayenge:
 * 
 * > Map<Keys, Type> ka matlab hai:
 *   - Keys: Map ke keys ka type (yahan string)
 *   - Type: Map ke values ka type (yahan UserMap)
 * 
 * Jaise ek phone book me har naam ke saamne uski details hoti hai!
 */
const users = new Map<string, UserMap>();

/**
 * Map me data add karte hain set() method se
 * Har user ko ek unique key (jaise "A", "B") ke saath store karte hain
 */
users.set("A", { name: "Rohan", age: 25, email: "rohan@example.com" });
users.set("B", { name: "Gaurav", age: 23, email: "gaurav@example.com" });

/**
 * get() method se hum kisi specific key ka data nikal sakte hain
 * Yahan "A" key ke user ki details nikali hai
 */
const selectedUser = users.get("A");

/**
 * Console me dekhte hain hamara selected user
 * "A" key ke user (Rohan) ki saari details dikhegi
 */
console.log(selectedUser);
