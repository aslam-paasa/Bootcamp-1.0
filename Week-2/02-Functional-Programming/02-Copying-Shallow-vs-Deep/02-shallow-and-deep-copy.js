/**
 * JavaScript mein 2 tarah se copy hota hai: (VVI)
 * a. Shallow Copy (Reference Copy)
 * b. Deep Copy    (Value Copy)
*/ 



/**
 * 1. Shallow Copy (Reference Copy)
 *    - Jab hum kisi object ya array ko copy karte hain, to sirf uska reference copy hota hai
 *    - Dono variables (original aur copy) same memory location ko point karte hain
 *    - Agar copy mein koi change karenge to original bhi change ho jayega
 *    - Ye JavaScript mein default behavior hai non-primitive types ke liye:
 *      * Arrays
 *      * Objects 
 *      * Functions
*/ 

/**
 * Spread Operator kab use karein?
 * 1. Objects ke saath:
 *    - Jab objects ko merge karna ho
 *    - Jab object ko copy karna ho (shallow copy)
 *    - Jab nested objects ko deep copy karna ho
 * 
 * 2. Arrays ke saath:
 *    - Jab arrays ko combine karna ho
 *    - Jab array ke elements ko individual values mein convert karna ho
 *    - Jab array ko copy karna ho (shallow copy)
 * 
 * 3. Functions ke saath:
 *    - Jab array ke elements ko individual arguments ke roop mein pass karna ho
 *    - Jab multiple arguments ko ek array mein collect karna ho (rest parameters)
*/





/**
 * Example of Shallow Copy:
*/ 
let arr1 = [1, 2, 3];
let arr2 = arr1;  // Shallow copy
arr2.push(4);     // arr1 bhi change ho jayega
console.log(arr1); // [1, 2, 3, 4]



/**
 * 2. Deep Copy (Value Copy)
 *    - Isme puri value copy hoti hai
 *    - Dono variables alag memory locations par hote hain
 *    - Copy mein changes karne se original par koi effect nahi hota
 *    - Ye JavaScript mein default behavior hai primitive types ke liye:
 *      * Numbers
 *      * Strings
 *      * Booleans
 *      * null
 *      * undefined
*/ 

/**
 * Example of Deep Copy:
*/ 
let num1 = 5;
let num2 = num1;  // Deep copy
num2 = 10;        // num1 change nahi hoga
console.log(num1); // 5
