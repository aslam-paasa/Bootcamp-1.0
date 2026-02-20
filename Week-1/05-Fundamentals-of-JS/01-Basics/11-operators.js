/**
 * Operators in Programming:
 * - Har programming language mein complex operations perform karne ki 
 *   capability hoti hai
 * - Ye operations simple addition se lekar complex calculations tak ho 
 *   sakte hain
 * - Programming languages mein hume kuch pre-defined operations milte hain
 *   jo hum "operators" ke through use kar sakte hain
 * 
 * Types of Operators:
 * 1. Arithmetic Operators:
 *    (a) + : Jodna (Addition)
 *    (b) - : Ghataana (Subtraction) 
 *    (c) / : Bhaag (Division)
 *    (d) * : Guna (Multiplication)
 *    (e) % : Shesh (Remainder)
 * 
 * Operators ka Use:
 * - Operators ko "operands" par apply kiya jata hai
 * - Operator wo operation hai jo hum perform karna chahte hain
 * - Operands wo values hain jinke upar hum operation perform karte hain
 * 
 * Example:
 *    10 + 3
 *    |   |
 *    |   |
 * Operands Operator
*/

// Arithmetic Operators ka Example
let x = 10;
let y = 3;

console.log("x ki value = 10, y ki value = 3");
console.log("Jodna (Addition) : " + x + y);
console.log("Ghataana (Subtraction) : " + (x - y));
console.log("Guna (Multiplication) : " + x * y);
console.log("Bhaag (Division) : " + x / y);
console.log("Shesh (Remainder) : " + x % y);
console.log("Ghatank (Exponent) : " + y**2); // y^2




/**
 * 1.Arithmetic Operators : 
 *   a + : addition
 *   b - : Subtraction
 *   c / : Division
 *   d * : Multiplication
 *   e % : Remainder
 *    
 * Q. Where do we apply operators?
 * - We apply operators on some "operands". 
 * - Operator is the operation that we want to do.
 * - Operands are the value on which we want to execute the operator.
 *        Operands
 *           ^
 *           |
 * Ex : 10 + 3
 *       |   |
 *       |   |
 *     Operator    
*/ 

// Arithmetic Operators
let num1 = 10;
let num2 = 3;

console.log("Value of num1 = 10, Value of num2 = 3");
console.log("Addition : " + num1 + num2); 
console.log("Subtraction : " + (num1 - num2));
console.log("Multiplication : " + num1 * num2);
console.log("Quotient : " + num1 / num2);
console.log("Remainder : " + num1 % num2);
console.log("Exponent : " + num2**2); // num2^2




/**
 * 2. Assignment Operators (Aatmakaran Operators) :
 *    - Jaise naam se pata chal raha hai "assignment" ka matlab hai kisi value
 *      ko assign karna
 *    - Jaise '=', '+=', '-=', '*=', '/=', '%='

 * let a = 10;
 *         |
 *         V
 *         Assignment Operator : '=' seedhe RHS se LHS mein value assign karta hai
 * 
 * - a += 2 ka matlab hai a = a + 2 -> a = 12
 * - a ki pehli value le, usme 2 add kar, aur phir nayi value ko wapas 'a' 
 *   mein assign kar
 * - Agar a ki pehli value 10 thi to is operator ke baad wo 12 ho jayegi
   
 * - a -= 2 -> a = a - 2 -> a = 8
 * - a *= 2 -> a = a * 2
 * - a /= 3 -> a = a / 3
 * - a %= 3 -> a = a % 3*/ 

// Assignment Operators :
let a = 10; // yahan = RHS se LHS mein value assign kar raha hai

a += 10; // yahan += asal mein a = a + 10 kar raha hai
console.log("Jodne ke baad a ki value hai", a);

a -= 3;
console.log("Ghataane ke baad a ki value hai", a);

a *= 2;
console.log("Guna karne ke baad a ki value hai", a);

a /= 3;
console.log("Bhaag karne ke baad a ki value hai", a);

a %= 3;
console.log("Shesh store karne ke baad a ki value hai", a);

a **= 2;
console.log("Ghatank karne ke baad a ki value hai", a);



/** 
 * 3. Relational Operators (Sambandh Operators) :
 *    - Ye operators comparison ke liye use hote hain
 *    - <, >, <=, >=
 *    - Relational Operators do operands lete hain aur unke beech mein 
 *      comparison karte hain
 *   
 *   Operand1  >  operand2
 *             <
 *             >=
 *             <=
 *             
 * - JS in statements ke basis par true/false return karta hai*/ 

let num01 = 10;
let num02 = 20;
let num03 = 5;
let num04 = 10;

console.log("num01 < num03 where num01 = 10, num02 = 20 :", num01 < num03); // chota hai
console.log("num02 > num03 where num01 = 10, num02 = 20 :", num02 > num03); // bada hai
console.log("num01 <= num03 where num01 = 10, num02 = 20 :", num01 <= num03); // chota ya barabar hai
console.log("num01 >= num03 where num01 = 10, num02 = 20 :", num01 >= num03); // bada ya barabar hai




/** 
 * 4. Logical Operators (Tarkik Operators) :
 *    - 9th aur 10th class mein humne "Boolean logic gates" ke baare mein 
 *      suna hai
 *    - Logic Gates electronic circuits hote hain jo boolean input lete 
 *      hain - "true/false"
 *    - True ka matlab hai current wire mein flow ho raha hai, false ka 
 *      matlab hai current nahi hai
 *    - Aur inke andar ke logic ke basis par ye output dete hain jo ki 
 *      boolean hota hai
 *   
 * a. AND Gate (AUR Gate):
 *    - Do inputs lete hain: X aur Y
 *    - Output true tabhi hota hai jab dono inputs true hon
 *    - Baaki sab cases mein output false hota hai
 *    - Example: Agar dono switches ON hain tabhi bulb jale, warna nahi
   
 *   Truth Table:
 *   X      Y      X AND Y
 *   false  false  false
 *   true   false  false
 *   false  true   false
 *   true   true   true

 * b. OR Gate (YA Gate):
 *    - Do inputs lete hain: X aur Y
 *    - Output true hota hai agar koi bhi ek input true ho
 *    - Sirf tabhi false hota hai jab dono inputs false hon
 *    - Example: Agar koi bhi ek switch ON hai to bulb jale
   
 *   Truth Table:
 *   X      Y      X OR Y
 *   false  false  false
 *   true   false  true
 *   false  true   true
 *   true   true   true

 * c. NOT Gate (NAHI Gate):
 *    - Sirf ek input leta hai: X
 *    - Output input ka ulta hota hai
 *    - True input pe false output, false input pe true output
 *    - Example: Switch ON hai to bulb OFF, switch OFF hai to bulb ON
   
 *   Truth Table:
 *   X      Output (NOT)  
 *   false  true  
 *   true   false 

 * JavaScript mein in gates ko represent karne ke liye:
 * +---------------------------------+
 * |1. AND Gate -> && (Double And)   |
 * |2. OR Gate  -> || (double pipe)  |
 * |3. NOT Gate -> !                 |
 * +---------------------------------+

 * - Jo operands hum pass karte hain wo hamesha boolean type ke hote hain
 *   Operand1(boolean)      Operand2(boolean)
   
 * - Jaise, console.log(true && false); // false
 *          console.log((10 > 5) && (6 < 3)); Relational+Logical
 *                          |          |
 *                          V          V
 *                        True   &&   False => false
 * - Hum jaante hain ki relational operators hamesha boolean value return 
 *   karte hain isliye true && false => false
*/ 

/**
 * a. AND Gate
*/
console.log(true && false);       // false
console.log(false || false);      // false
console.log(true && true);        // true
console.log((5 < 10) && (6 < 3)); // false

/**
 * b. OR Gate
*/
console.log(true || false);       // true
console.log(false || false);      // false
console.log(true || true);        // true
console.log(~true);              // false
console.log(~(3 > 4));           // true

/**
 * c. NOT Gate
*/
console.log(!false);             // true
console.log(!true);              // false





/** 
 * Hum 2 concepts seekhenge:
 * 1. Short Circuiting
 * 2. Boolean mein Values ka Conversion

 * Introduction:
 * - Maan lijiye humare paas 5 steps hain aur pehle step mein hi result mil 
 *   gaya, toh hum aage ke steps par nahi jayenge. Isi wajah se hume pure 
 *   expression ko evaluate karne ki zarurat nahi hai. Jab result mil jaye, 
 *   hum evaluation ko rok sakte hain. Ye logical operators "&&" (AND) aur 
 *   "||" (OR) mein bahut useful hota hai.
 * - JavaScript mein, logical operators jaise "&&" ya "||" mein "short-circuiting" 
 *   naam ka feature hota hai.
 * - Short-circuiting ka matlab hai ki kuch conditions mein, operator pehli 
 *   value ko turant return kar deta hai aur dusri value ko check bhi nahi 
 *   karta.

 * Boolean mein Values ka Conversion:
 * - Jab bhi hum logical && ya || use karte hain, humare paas left side aur 
 *   right side par values hoti hain:
 *   LeftSide && RightSide
 *   LeftSide || RightSide
 * - Agar ye values boolean nahi hain, jaise numbers (10 && 6, 10 || 6)
 *   Toh JavaScript inhe Boolean mein convert karta hai

 * Q. JavaScript mein kaun se values falsy hain?
 *    - Null -> false
 *    - undefined -> false
 *    - "" (khali string) -> false
 *    - +0, -0, NaN -> false
 * Note: Inke alawa sab truthy values hain

 * Q. JavaScript conversion kaise karta hai?
 *    - Iske liye "Coercion" ya "Type Conversion" ka concept use hota hai
 *    - Har programming language ka apna type conversion hota hai
 * 
 * - Simple example: 10 && 6 mein, dono values truthy hain, lekin output 6 
 *   aata hai kyunki AND operator ka rule hai ki agar pehli value true hai 
 *   toh dusri value return karo

 * AND Gate ka Short-Circuiting:
 *   X      Y      X AND Y
 *   false  false  false
 *   true   false  false
 *   false  true   false
 *   true   true   true
 * 
 * - AND Gate mein, agar pehli input false hai, toh output false hoga. Dusri 
 *   input kya hai, ye dekhne ki zarurat nahi hai
 * - Agar pehli input true hai, toh dusri input check hogi aur wahi return 
 *   hogi
*/

/**
 * AND Gate ka Short-Circuiting:
 * X      Y      X AND Y
 * false  false  false
 * true   false  false
 * false  true   false
 * true   true   true
 * 
 * AND Gate ke Rules:
 * 1. Agar pehli value false hai:
 *    - Dusri value check nahi hogi
 *    - Pehli value (false) return hogi
 * 
 * 2. Agar pehli value true hai:
 *    - Dusri value check hogi
 *    - Dusri value return hogi
 * 
 * Examples:
 * 1. 6 && 10:
 *    - 6 truthy hai (non-zero number)
 *    - 10 check hoga
 *    - Output: 10
 * 
 * 2. (10 > 6) && (6 < 7):
 *    - (10 > 6) true hai
 *    - (6 < 7) check hoga
 *    - Output: true
*/

console.log(6 && 10);  // Output: 10
console.log((10 > 6) && (6 < 7));  // Output: true

/**
 * OR Gate ka Short-Circuiting:
 * X      Y      X OR Y
 * false  false  false
 * true   false  true
 * false  true   true
 * true   true   true
 * 
 * OR Gate ke Rules:
 * 1. Agar pehli value true hai:
 *    - Dusri value check nahi hogi
 *    - Pehli value return hogi
 * 
 * 2. Agar pehli value false hai:
 *    - Dusri value check hogi
 *    - Dusri value return hogi
 * 
 * Examples:
 * 1. 10 || 0:
 *    - 10 truthy hai
 *    - Output: 10
 * 
 * 2. 6 || 19:
 *    - 6 truthy hai
 *    - Output: 6
 * 
 * 3. 0 || -0:
 *    - 0 falsy hai
 *    - -0 check hoga
 *    - -0 bhi falsy hai
 *    - Output: -0
*/
console.log(10 || 0);    // Output: 10
console.log(6 || 19);    // Output: 6
console.log(0 || -0);    // Output: -0




/**
 * Nullish Coalescing Operator (??):
 * - Ye operator null ya undefined values ke liye use hota hai
 * - Ye operator sirf null ya undefined ko falsy maanta hai
 * - Baaki sab values (0, '', false) ko truthy maanta hai
 * 
 * Syntax: leftValue ?? rightValue
 * 
 * Rules:
 * 1. Agar leftValue null ya undefined hai:
 *    - rightValue return hogi
 * 
 * 2. Agar leftValue null ya undefined nahi hai:
 *    - leftValue return hogi
 * 
 * Examples:
 * 1. null ?? "default":
 *    - null falsy hai
 *    - Output: "default"
 * 
 * 2. undefined ?? "default":
 *    - undefined falsy hai
 *    - Output: "default"
 * 
 * 3. 0 ?? "default":
 *    - 0 null/undefined nahi hai
 *    - Output: 0
 * 
 * 4. "" ?? "default":
 *    - Empty string null/undefined nahi hai
 *    - Output: ""
*/

console.log(null ?? "default");        // Output: "default"
console.log(undefined ?? "default");   // Output: "default"
console.log(0 ?? "default");           // Output: 0
console.log("" ?? "default");          // Output: ""





/**
 * JavaScript ke Special Numbers:
 * 
 * JavaScript hume 3 interesting numbers provide karta hai:
 * 1. 0 (Positive Zero)
 * 2. -0 (Negative Zero)
 * 3. NaN (Not a Number)
 * 
 * NaN ke baare mein:
 * - Jab koi valid number return nahi kar sakte, tab NaN use karte hain
 * - NaN ek aisa number hai jo invalid number ki situation ko represent karta hai
 * - NaN JavaScript ka ek unique number hai jo khud ke equal nahi hota
 * 
 * Real Life Example:
 * - Jab user se age input lete hain aur wo invalid value deta hai
 * - Ya phir jab database se price fetch karte hain aur wo null/undefined aata hai
 */

/**
 * Example 1: User Input Validation
 */
let userAge = "abc";
let numericAge = Number(userAge);
console.log(numericAge); // NaN

/**
 * Example 2: Price Calculation
 */
let productPrice = null;
let quantity = 2;
let totalPrice = productPrice * quantity;
console.log(totalPrice); // NaN

/**
 * Example 3: Division by Zero
 */
console.log(10/0); // Infinity
console.log(-10/0); // -Infinity

/**
 * Example 4: Undefined Operations
 */
let price;
console.log(price * 2); // NaN

/**
 * Example 5: NaN Comparison
 */
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true




/** 
 * 5. Bitwise Operators - Step by Step Guide:
 * - Computers internally work with binary (0s and 1s)
 * - For example, number 5 is stored as 101 in binary
 * - Bitwise operators perform operations on individual bits
 * 
 * Main Bitwise Operators:
 * a. & -> Bitwise AND (1 if both bits are 1, else 0)
 * b. | -> Bitwise OR  (1 if either bit is 1, else 0) 
 * c. ^ -> Bitwise XOR (1 if bits are different, 0 if same)
 * d. ~ -> Bitwise NOT (flips all bits)
 * 
 * 1. Bitwise AND (&):
 *    - Do numbers ko binary mein convert karke har bit par AND operation 
 *      perform karta hai
 *    - Agar dono bits 1 hain to result 1 aayega, warna 0
 *    - Example:
 *        5 & 3 = ?
 *        5 = 101 (binary)
 *        3 = 011 (binary)
 *        --------
 *        101 & 011 = 001 = 1

 * 2. Bitwise OR (|):
 *    - Do numbers ko binary mein convert karke har bit par OR operation 
 *      perform karta hai
 *    - Agar koi bhi bit 1 hai to result 1 aayega, dono 0 hone par hi 0 aayega
 *    - Example:
 *        5 | 3 = ?
 *        5 = 101 (binary)
 *        3 = 011 (binary)
 *        --------
 *        101 | 011 = 111 = 7

 * 3. Bitwise XOR (^):
 *    - Do numbers ko binary mein convert karke har bit par XOR operation 
 *      perform karta hai
 *    - Agar bits different hain to 1, same hain to 0
 *    - Example:
 *        5 ^ 3 = ?
 *        5 = 101 (binary)
 *        3 = 011 (binary)
 *        --------
 *        101 ^ 011 = 110 = 6

 * 4. Bitwise NOT (~):
 *    - Ek number ko binary mein convert karke har bit ko flip karta hai
 *    - 0 ko 1 aur 1 ko 0 mein convert karta hai
 *    - Example:  
 *        ~5 = ?
 *        5 = 101 (binary)
 *        --------
 *        ~101 = 010 = 2

 * 5. Left Shift (<<):
 *    - Binary number ke saare bits ko left side shift karta hai
 *    - Har shift number ko 2 se multiply karta hai
 *    - Example:
 *        5 << 1 = ?
 *        5 = 101 (binary)
 *        --------
 *        101 << 1 = 1010 = 10

 * 6. Right Shift (>>):
 *    - Binary number ke saare bits ko right side shift karta hai
 *    - Har shift number ko 2 se divide karta hai
 *    - Example:
 *        5 >> 1 = ?
 *        5 = 101 (binary)
 *        --------
 *        101 >> 1 = 10 = 2

 * Real World Examples:
 * 1. Checking if a number is even/odd:
 *    let num = 7;
 *    if(num & 1) {
 *      console.log("Odd number");  // Last bit 1 means odd
 *    } else {
 *      console.log("Even number"); // Last bit 0 means even
 *    }
 * 
 * 2. Multiplying/Dividing by 2:
 *    let num = 5;
 *    let double = num << 1;  // 5 * 2 = 10
 *    let half = num >> 1;    // 5 / 2 = 2
 * 
 * 3. Checking if a flag is set:
 *    const READ = 1;    // 001
 *    const WRITE = 2;   // 010
 *    const EXECUTE = 4; // 100
 *    
 *    let permissions = READ | WRITE; // 011
 *    if(permissions & READ) {
 *      console.log("Read permission granted");
 *    }
 * 
 * 4. Toggling a flag:
 *    let flags = 0;
 *    flags = flags ^ READ;  // Toggle READ flag
 * 
 * 
 * Use Cases:
 * a. File permissions check karna
 * b. RGB colors manipulate karna
 * c. Network protocols mein data pack/unpack karna
 * d. Game development mein collision detection
 * e. Memory optimization ke liye
*/

console.log('\n Bitwise Operators');


/**
 * Ex-1: File permissions check
 */
const READ = 1;
const WRITE = 2;
const EXECUTE = 4;

let permissions = READ | WRITE;
console.log(permissions); // 3

/**
 * Ex-2: RGB color manipulation
 */
let red = 255;
let green = 0;
let blue = 0;

let color = (red << 16) | (green << 8) | blue;
console.log(color); // 16711680

/**
 * Ex-3: Network protocol data packing
 */
let header = 0b1010; // 10 in binary
let payload = 0b1100; // 12 in binary

let packet = (header << 8) | payload;
console.log(packet); // 2620





/* 6. Equality Operators:
 * JavaScript mein 2 types ke equality operators hote hain:
 * (a) == (Abstract Equality Operator)
 * (b) === (Strict Equality Operator)
 * 
 * Common Misconception:
 * - "==" sirf value check karta hai aur "===" value aur datatype dono check 
 *   karta hai
 * - Ye statement 100% galat hai!
 * 
 * Sahi Vyakhya:
 * (a) == (Abstract Equality):
 *    - Pehle dono operands ka datatype check karta hai
 *    - Agar datatype same hai, to === ko call karta hai
 *    - Agar datatype different hai, to type conversion (coercion) karta hai
 *    - Phir comparison karta hai
 * 
 * (b) === (Strict Equality):
 *    - Agar datatype different hain, to turant false return karta hai
 *    - Agar datatype same hain, to value comparison karta hai
 * 
 * Mukhya Antar:
 * - == type conversion karta hai
 * - === type conversion nahi karta
 * 
 * NaN ka Special Case:
 * - NaN ek aisa number hai jo khud ke barabar nahi hota
 * - Agar pehla number NaN hai, to dusra check nahi hota
 * - Isliye NaN === NaN false return karta hai
*/

// Examples
console.log(1 == "1");     // true (type conversion hota hai)
console.log(1 == "sanket"); // false (1 == NaN)
console.log(NaN === NaN);  // false (NaN khud ke barabar nahi hota)




/**
 * 7. Unary Operators (Ek Operand Wale Operators):
 *    - Ye wo operators hote hain jo sirf ek value par kaam karte hain
 *    - Jaise: count++, ++count, count--, --count
*/

/**
 * a. Increment Operators (Badhane Wale Operators)
*/ 
let count = 10;

/**
 * Postfix Increment (count++): 
 * - Pehle count ki value result1 mein assign hogi, phir count badhega
 */ 
let result1 = count++;
console.log("Postfix Increment:");
console.log("count ki value:", count);    // 11
console.log("result1 ki value:", result1); // 10

/**
 * Prefix Increment (++count): 
 * - Pehle count badhega, phir nayi value result2 mein assign hogi
 */ 
let result2 = ++count;
console.log("\nPrefix Increment:");
console.log("count ki value:", count);    // 12
console.log("result2 ki value:", result2); // 12

/**
 * b. Decrement Operators (Ghatane Wale Operators)
*/ 
let number = 5;

/**
 * Postfix Decrement (number--): 
 * - Pehle number ki value result3 mein assign hogi, phir number ghatayega
 */ 
let result3 = number--;
console.log("\nPostfix Decrement:");
console.log("number ki value:", number);    // 4
console.log("result3 ki value:", result3);  // 5

/**
 * Prefix Decrement (--number): 
 * - Pehle number ghatayega, phir nayi value result4 mein assign hogi
 */ 
let result4 = --number;
console.log("\nPrefix Decrement:");
console.log("number ki value:", number);    // 3
console.log("result4 ki value:", result4);  // 3

/**
 * c. Unary Plus Operator (+)
 * - String ko number mein convert karta hai
 */ 
let stringNum = "42";
let convertedNum = +stringNum;
console.log("\nUnary Plus Operator:");
console.log("stringNum ka type:", typeof stringNum);      // String
console.log("convertedNum ka type:", typeof convertedNum); // Number

/**
 * d. Unary Minus Operator (-)
 * - String ko number mein convert karke negative bana deta hai
 */ 
let positiveNum = "42";
let negativeNum = -positiveNum;
console.log("\nUnary Minus Operator:");
console.log("positiveNum ka type:", typeof positiveNum);    // String
console.log("negativeNum ka type:", typeof negativeNum);    // Number
console.log("negativeNum ki value:", negativeNum);          // -42

/**
 * Note: Agar conversion possible nahi hai to NaN (Not a Number) return hoga
*/ 



/** 
 * 8. Ternary Operator (Teen Parti Operator):
 * - Ye ek special type ka operator hai jo 3 parts mein kaam karta hai
 * - Iska syntax hai: condition ? trueValue : falseValue
 * - Matlab: agar condition true hai to trueValue return karo, warna 
 *           falseValue return karo.
 * 
 * Example:
 * let result = (age >= 18) ? "Adult" : "Minor";
 * - Agar age 18 ya usse zyada hai to "Adult" return hoga
 * - Agar age 18 se kam hai to "Minor" return hoga
*/

/**
 * Ex-1: Simple comparison
 */
let ageCheck = ((20 > 18) ? "Adult" : "Minor");
console.log("Age Check Result:", ageCheck);  // Output: Adult

/**
 * Ex-2: False condition
 */
let scoreCheck = ((50 < 60) ? "Pass" : "Fail");
console.log("Score Check Result:", scoreCheck);  // Output: Fail

/**
 * Ex-3: Direct boolean condition
 */
let isEligible = ((true) ? "Yes" : "No");
console.log("Eligibility:", isEligible);  // Output: Yes

/**
 * Ex-4: With variable increment
 */
let currentValue = 10;
let finalValue = ((5 > 10) ? (5 - 3) : (++currentValue));
console.log("Final Value:", finalValue);  // Output: 11