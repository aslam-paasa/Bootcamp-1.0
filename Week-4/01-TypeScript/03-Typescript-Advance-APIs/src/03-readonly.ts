/**
 * Pehle, hum ek User3 interface banayenge jisme user ki basic details hongi:
 * > id: number    => User ka unique number
 * > name: string  => User ka naam
 */
interface User3 {
    id: number;
    name: string;
}

/**
 * Readonly utility type ka use karke hum User3 ki saari properties ko
 * read-only (immutable) bana denge
 * 
 * > Readonly<Type> ka matlab hai:
 *   - Type ki saari properties read-only ban jayengi
 *   - Properties ki value ek baar set hone ke baad change nahi kar sakte
 * 
 * Jaise kisi sealed letter ko khol kar edit nahi kar sakte!
 */
const ReadOnlyUser: Readonly<User3> = {
    id: 1,
    name: 'Rohan'
};

/**
 * Console mein dekhte hain hamara ReadOnlyUser object
 */
console.log(ReadOnlyUser);

/**
 * Ab hum properties ki values change nahi kar sakte
 * Niche ki lines error degi kyunki properties read-only hain:
 * 
 * ReadOnlyUser.id = 2;      // Error: Cannot assign to 'id' because it is a read-only property
 * ReadOnlyUser.name = 'Gaurav';  // Error: Cannot assign to 'name' because it is a read-only property
 */
