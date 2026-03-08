/**
 * Pehle, hum ek User1 interface banayenge jisme user ki details hongi:
 * > id: number       => User ka unique number
 * > name: string     => User ka naam
 * > age: number      => User ki umar
 * > email: string    => User ka email address
 * > password: string => User ka password
 */
interface User1 {
    id: number;
    name: string;
    age: number;
    email: string;
    password: string;
}

/**
 * Ab Pick utility type se hum User1 interface se kuch properties chunenge
 * Yahan id, name aur age ko select kiya hai
 */
type UpdateUser1 = Pick<User1, 'id' | 'name' | 'age'>;

/**
 * Partial utility type ka use karke hum UpdateUser1 ki saari properties ko 
 * optional bana denge
 * 
 * > Partial<Type> ka matlab hai:
 *   - Type ki saari properties optional (?) ban jayengi
 *   - Koi bhi property dena zaruri nahi hai
 * 
 * Jaise kisi menu se kuch bhi order kar sakte ho, sab optional hai!
 */
type UpdatePropsOptional = Partial<UpdateUser1>;

/**
 * Ab hum UpdatePropsOptional type ka ek object banayenge
 * Isme sirf name aur age diye hain, id nahi diya
 * Ye valid hai kyunki Partial ne saari properties optional bana di hain
 */
const User1: UpdatePropsOptional = {
    name: "Rohan",
    age: 23
};

/**
 * Console mein dekhte hain hamara User1 object
 * Sirf name aur age dikhega kyunki id nahi di hai
 */
console.log(User1);
