/**
 * Programming Language kya hota hai?
 * - Ek aisa language jo decisions le sake aur un decisions ke basis par 
 *   different actions perform kar sake
 * - Ye decisions conditional statements ke through aate hain
*/

/**
 * Conditional Statements kya hote hain?
 * - Ye statements hain jo conditions check karte hain
 * - Conditions ke basis par hum different actions perform kar sakte hain
*/

/**
 * Example 1: Chai ya Coffee Banana
 * Pehle kuch basic steps same hote hain:
 * 1. Pan lena
 * 2. Gas pe rakhna
 * 3. Gas on karna
 * 4. Doodh dalna
 * 5. Doodh ko boil hona
 * 
 * Ab decision lena hai:
 * - "Kya chai banani hai?"
 *   a. Agar haan -> Chai patti dalo
 *   b. Agar nahi -> Coffee powder dalo
*/

/**
 * Example 2: Amazon Prime
 * Jab koi user Amazon Prime pe content dekhne ki koshish karta hai:
 * - Agar user ke pass Prime subscription hai      - Content dekh sakta hai
 * - Agar user ke pass Prime subscription nahi hai - Subscription purchase 
 *                                                   karne ka popup dikhega
*/




/**
 * Programming mein conditions check karne ke liye kuch mechanism hona chahiye
 * jisse hum different conditions ke basis par different actions perform kar 
 * sakein:
 * 1. If-Else Statements
 */

/**
 * 1. If-Else Statements:
 *    - Ye statements hume decisions lene mein help karte hain
 *    - Syntax: if(condition) {
 *                 // agar condition true hai to ye code execute hoga
 *              }
 */

console.log("Start");
if (10 > 5) {  // ye condition true hai
    console.log("Yes");
}
console.log("End");

/**
 * Truthy/Falsy Values:
 * - JavaScript mein numbers ko boolean mein convert karta hai
 * - 0, -0, aur NaN ke alawa sab numbers truthy hote hain
 * - Is example mein 12 truthy hai, isliye if block execute hoga
 */

if (12) {
    console.log("printed 12");
}
console.log("End");
console.log();

/**
 * Else Statement:
 * - Agar if condition false ho to kya karna hai, ye else block mein define
 *   karte hain
 * - Syntax: if(condition) {
 *              // agar condition true hai to ye code execute hoga
 *           } else {
 *              // agar condition false hai to ye code execute hoga
 *           }
 */

console.log("Welcome to Prime Video");

let isPrimeMember = false;
if (isPrimeMember) {
    console.log("Enjoy the content");
} else {
    console.log("Please buy the subscription to enjoy the content");
}

/**
 * Important Points:
 * 1. Agar condition true hai to sirf if block execute hota hai, else block 
 *    skip hota hai
 * 2. Agar condition false hai to if block skip hota hai, sirf else block 
 *    execute hota hai
 * 3. If block else block ke bina exist kar sakta hai, lekin else block 
 *    if block ke bina exist nahi kar sakta
 */


/*
 * Odd-Even Problem:
 * - Ek number x diya gaya hai, check karo ki number even hai ya odd
 * 
 * - Example : x = 27 
 *   Output : Odd
 * 
 * - Example : x = 54
 *   Output : Even
*/

/**
 * Even numbers kya hote hain?
 * - Jo number 2 se completely divide ho jaye, wo even number hota hai
 * - Jo number 2 se completely divide na ho, wo odd number hota hai
*/

/**
 * Kya number 2 se divisible hai?
 * - Haan(even) : Nahi(odd)
*/

/**
 * Number 2 se divisible hai ya nahi, kaise check karein?
 * - Remainder (modulo Operator) : "%" ka use karke
*/

/**
 * Example: 7 % 2 -> 1 (remainder)
 * "==" operator se check karein ki remainder 0 hai ya nahi
*/

let x = 341;

if (x % 2 == 0) {
    console.log("Even Number");
} else {
    console.log("Odd Number");
}





/**
 * 2. Else If and Nested Conditions:
 * - Else If is used to check multiple conditions.
 * - It is used to check multiple conditions and execute different blocks of code
 *   based on the condition.
*/

/**
 * Why we are not using "isPrimeMember == true" in the condition?
 * - Because JavaScript if-else statement mein condition ko evaluate karne ke
 *   baad usko boolean mein convert karta hai. 
 * - Yahan "isPrimeMember" ki value "false" hai jo already boolean hai. Agar
 *   value boolean nahi hoti to JavaScript internally usko boolean mein 
 *   convert karta hai.
*/

console.log("Welcome to Prime Video");
let primeMember = false;
if (primeMember) {
    console.log("Enjoy the content");
} else {
    console.log("Please buy the subscription to enjoy the content");
}


/**
 * Example:
 * - Hotstar mein user ke pass subscription nahi ho sakta, ya VIP subscription
 *   ho sakta hai (cheaper version) ya Premium subscription ho sakta hai.
 * 
 * - isPremium Member
 *   1. Haan (Premium Member)
 *   2. Nahi 
 *      a. Haan (VIP Member)
 *      b. Nahi (Free user)
*/

/**
 * - Hum multiple conditions ke basis par different actions perform kar sakte hain
 * - Agar user "Premium Member" hai to kuch specific content dikhao
 * - Ya agar user VIP member hai to kuch aur content dikhao
 * - Ya agar user free user hai to kuch aur content dikhao
 * 
 * - Iske liye hum else-if ka use karte hain:
 *   if(condition1) {
 *      // code for condition1
 *   } else if(condition2) {
 *      // code for condition2
 *   } else {
 *      // code for default case
 *   }
*/

console.log("Welcome to Hotstar");

let isUserPremium = false;
let isVIPPremium = false;

if (isUserPremium) {
    console.log("Enjoy the premium content on hotstar");
} else if (isVIPPremium) {
    console.log("Enjoy the VIP content on hotstar, for more subscribe to premium");
} else {
    console.log("Please purchase either VIP or Premium Subscription to enjoy content on hotstar");
}

console.log("END");

/**
 * Agar multiple conditions true hain to pehli true condition wala block 
 * execute hoga
 * 
 * - Important Rules:
 *   1. if else-if aur else ke bina exist kar sakta hai
 *   2. else if ke bina exist kar sakta hai lekin if ke bina nahi
 *   3. else-if if ke bina exist nahi kar sakta lekin else ke bina kar sakta hai
*/

/**
 * Nested if-else:
 * - If-else mein if-else bhi use kar sakte hain
*/

if (isUserPrime) {
    if (isUserDiscovery) {
        console.log("Enjoy both content");
    } else {
        console.log("Enjoy Prime Content");
    }
} else {
    console.log("Please buy a subscription to enjoy content");
}

/**
 * Note: In Programming, one problem can have multiple solutions
*/

console.log("Welcome to Disney+ Hotstar");

let isUserPrime = true;
let isUserDiscovery = true;
let isUserAccorn = true;

if (isUserPrime) {
    if (isUserDiscovery) {
        if (isUserAccorn) {
            console.log("Enjoy all Disney+ Hotstar content");
        } else {
            console.log("Enjoy Disney+ Hotstar content");
        }
    } else if (isUserAccorn) {
        console.log("Enjoy Disney+ Hotstar content");
    } else {
        console.log("Enjoy Disney+ Hotstar content");
    }
} else {
    console.log("Please buy a subscription to enjoy content");
}




/** 
 * Humko 3 sides diye gaye hain (a, b, c). Hume check karna hai ki triangle 
 * equilateral hai, scalene hai ya isosceles hai.
*/

/**
 * Types of Triangles:
 * 1. Equilateral Triangle - Saare sides equal hote hain
 *    - Example: a=5, b=5, c=5
 *    - Condition: a==b && b==c
 *
 * 2. Isosceles Triangle - Do sides equal hote hain, third side different hota
 *    - Example: a=5, b=5, c=7
 *    - Condition: a==b || b==c || a==c
 *
 * 3. Scalene Triangle - Saare sides different hote hain
 *    - Example: a=3, b=4, c=5
 *    - Condition: Jab koi bhi side equal nahi hai
 * 
 * Note: Diya gaya input hamesha valid triangle hoga
*/

let a = 5;
let b = 5;
let c = 5;

if (a == b && b == c) {
    console.log("Equilateral Triangle");
} else if (a == b || b == c || a == c) {
    console.log("Isosceles Triangle");
} else {
    console.log("Scalene Triangle");
}