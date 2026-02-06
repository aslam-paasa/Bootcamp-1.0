/**
 * Currying:
 * - Currying is a technique in functional programming where a function that 
 *   takes multiple arguments is transformed into a sequence of functions, 
 *   each taking a single argument.
 * 
 * - The process of converting a function with multiple arguments into a 
 *   sequence of functions, each taking a single argument, is called currying.
 * 
 * - Two ways to implement currying:
 *   a. Using closure
 *   b. Using arrow function
*/

/**
 * Example:
 * - Non-Currying function
 * - Currying function (using closure)
 * - Currying function (using arrow function)
 */
console.log("Currying");



/**
 * Example-1: Non-Currying function
 * - We use this function when we have all the arguments at once.
 */
function add(a,b,c) {
    return a + b + c;
}
add(1,2,3);

console.log("Addition without Currying : " + add(1,2,3));



/**
 * Example-2: Currying function (using closure)
 * - Let's say mujhe first parameter kisi API se milta hai, and second
 *   parameter kisi aur API se milta hai, and third parameter wo use type
 *   karta hai. And mujhe inn teeno inputs ko gather karna hai uske baad
 *   hi iss particular function ko execute karna hai.
 * 
 * Solution: Currying function
 * - First fn ek parameter leta ha i.e. 'a'
 * - First fn return a fn jo ek parameter leta hai i.e. 'b'
 * - Second fn return a fn jo ek parameter leta hai i.e. 'c'
 * - And finally we return a+b+c
 * - add(2)(3)(4) = 9 => Ye fn tbtk execute nhi hoga jbtk teeno arguments
 *                       naa mil jae. 
 * 
 */
function curryAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        }
    }
}
curryAdd(1)(2)(3);

console.log("Addition with Currying : " + curryAdd(1)(2)(3));


/**
 * Real-World Use Case:
 * Let's say humaare paas ek fn hai i.e. sendAutoEmail. Ab jb hum iss email
 * ko send karnge to humaare paas 3 params hai jo kahi na kahi se calculate
 * ho k aaenge:
 * a. to
 * b. subject
 * c. body
 * Hum iski curry bna sakte hai.
*/

function sendAutoEmail(to) {
    return function(subject) {
        return function(body) {
            return `Email sent to ${to} with subject ${subject} and body ${body}`;
        }
    }
}

let stepOne = sendAutoEmail("aslampaasa@gmail.com"); // developer-1 
let stepTwo = stepOne("New Order Confirmation"); // developer-2
let stepThree = stepTwo("Thank you for your order. It will be delivered soon."); // developer-3

const sendEmail = stepThree;
console.log(sendEmail);


/**
 * Example-3: Currying function (using arrow function)  [ES6+]
 * Note: Single statement ho to return lagaane ki jarurt nhi hai
 */
const curryAddVersion2 = (a) => (b) => (c) => a + b + c;

curryAddVersion2(1)(2)(3);

console.log("Addition with Currying : " + curryAddVersion2(1)(2)(3));



/**
 * Real-life Example :
 * - Humaari clothing store hai aur isme hm kuch price pass krnge
 * - Aur iske andr ek function pass krwaenge
 * - Jb koi cutomer aaenge clothes kharidne to iss "price" pe mai kuch discount dunga
 * - To kitna % discount dunga wo "discountPar" mai inner function m pass karunga
 * - And then ye function "discountedAmount" return krega
 */

function dressPrice(price) {
    return function(discountPar) {
        return price - (price * discountPar / 100)
    }
}

/**
 * Calculated Amount
 */
const calcAmount = dressPrice(100);

console.log(calcAmount(20));      // customer-1 has to pay 80 only
console.log(calcAmount(30));      // customer-2 has to pay 70 only
console.log(dressPrice(100)(20)); // customer-3 has to pay 80 only
console.log(dressPrice(100)(30)); // customer-4 has to pay 70 only

/**
 * "calAmount" m humne price set kr diya aur fir aage usko reuse kr rhe hai 
 *  uspe discountedAmount calculate krne k liye
*/

/**
 * Note : Isse "Function Factory" v bolte hai. Means "dressPrince()" naam se 
 *        ek factory bna di aur uske baad hm sirf reuse kr rhe hai means 
 *        original cloth price k upar alag alag customer ko alag alag 
 *        discount/output mil rha hai.
*/




/**
 * Assignment: Currying in JavaScript
 * - Currying ek aisa technique hai jahan hum ek function ko multiple chote
 *   functions mein tod dete hain
 * - Har function sirf ek argument leta hai
 * - Ye code ko more manageable aur reusable banata hai
 */

/**
 * Example 1: Normal function vs Curried function
 */

/**
 * Normal function - saare arguments ek saath lete hain
 */
const normalAdd = (a, b, c) => a + b + c;
console.log("Normal function:", normalAdd(2, 3, 4)); // Output: 9



/**
 * Curried function - ek ek karke arguments lete hain
 */
const curriedAdd = (a) => {
    return (b) => {
        return (c) => {
            return a + b + c;
        }
    }
}
console.log("Curried function:", curriedAdd(2)(3)(4)); // Output: 9


/**
 * Real life example samjhne ke liye:
 * - Socho aapko chai banani hai. Isme 3 steps hain:
 *   a. Pani ubalna 
 *   b. Chai patti dalna
 *   c. Doodh dalna
 * 
 * 1. Normal function mein:
 *    - makeTea(pani, chaiPatti, doodh) 
 *      a. Saare ingredients ek saath chahiye
 * 
 * 2. Curried function mein:
 *    - makeTea(pani)(chaiPatti)(doodh)
 *      a. Ek ek step kar sakte hain
 *      b. Har step ke baad check kar sakte hain
 *      c. Zyada flexible hai
 */


/**
 * Chai example in code
 */
const makeTea = (water) => {
    return (teaLeaves) => {
        return (milk) => {
            return `Chai is ready with ${water}ml water, ${teaLeaves}g tea leaves, and ${milk}ml milk`;
        }
    }
}

console.log(makeTea(100)(10)(50));
/**
 * Output: Chai is ready with 100ml water, 10g tea leaves, and 50ml milk
 */





