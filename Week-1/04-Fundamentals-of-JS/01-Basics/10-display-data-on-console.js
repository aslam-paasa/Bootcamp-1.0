/**
 * Data ko User ko Dikhana:
 * - Functions ko hum ek black box ki tarah samajh sakte hain
 * - Example ke liye, maan lijiye hum bank jaate hain aur 100rs deposit 
 *   karna chahte hain. Hum kya karte hain? Hum bank jaate hain, kuch 
 *   steps follow karte hain jaise form bharna, phir cashier ke pass 
 *   jaate hain, slip aur 100rs cashier ko dete hain. Ab cashier kya 
 *   karta hai aur din ke end mein wo paisa kahan rakhta hai, yeh hume 
 *   nahi pata. Yeh information abstracted hai, matlab hume iske baare 
 *   mein nahi pata. Yeh functions ka concept hai.
 * 
 * - Hamara bank cashier function ki tarah hai, hume nahi pata wo kaise 
 *   kaam karte hain, hume sirf itna pata hai ki wo humse kuch input 
 *   expect karte hain jaise hum unhe paisa denge aur wo hume slip/receipt 
 *   denge, yani hamara function.
 * 
 * - Function kuch input leta hai, usko process karta hai lekin hume nahi 
 *   pata kaise, lekin hume sirf itna pata hai ki end mein hume kuch 
 *   output milega jaise wo receipt. Yeh basic functions ka concept hai.
 * 
 * - JavaScript ka pehla in-built function jo hume milta hai wo hai 
 *   "console.log". Yeh function kuch data input ke roop mein leta hai 
 *   aur phir use output mein display karta hai.
 * - f(x, y) function hai
 * - console.log multiple arguments le sakta hai, yeh arguments kuch bhi 
 *   ho sakte hain
 * - Agar humare pass 2 alag console.log() hain, to dono alag lines mein 
 *   output display/print karenge, lekin hum multiple values ek saath 
 *   console.log mein pass kar sakte hain aur sab ek hi line mein honge
 * - console.log(10, "starting", age);
*/

console.log(10);
console.log("Hello world!");

let age = 10;
console.log(age);

console.log(10, "starting", age);