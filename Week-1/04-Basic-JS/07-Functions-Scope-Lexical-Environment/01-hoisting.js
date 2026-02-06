/**
 * Previously humne pdha tha ki:
 * 1. Pehle Callstack bnti hai
 * 2. Fir usme GEC jaati hai
 * 3. Fir humaari LEC jaati hai
 * 4. Fir return statement aati hai to LEC destroy ho jaati hai.
 * 
 * Fir humne pdha:
 * 1. During Memory Creation Phase, pehle 'a = undefined' aata hai
 * 2. Fir Code Execution Phase mai yhi 'a = undefined' value kat k 10
 *    ho jaata hai.
 * 
 * Example:
 * 1. var x = 1
 * 2. function greet() {
 * 3.    console.log("Hello");
 * 4. }
 * 5. console.log(x);
 * 6. greet();
 * 
 * Phase-1: Memory Creation Phase
 * Step-1 : Memory is allocated to x variable and set it as 'undefined'
 * Step-2 : console.log(x) box k andr x = undefined ho jaega
 * Step-3 : greet() function ki variable bnega, uske andr function poori
 *          as it is copy ho jaegi 
 * 
 * Phase-2: Code Execution Phase
 * Step-1 : variable x = undefined -> 1 ho jaega
 * Step-2 : console.log box k andr x ki value 1 print ho jagei
 * Step-3 : greet variable k andr search krega lekin isko koi variable 
 *          allot ni hua then ye function k liye search krne lgega. Fir 
 *          function k andr console.log("Hello") to wo print kr dega 
 *          console box pe.
 * 
 * Output:
 * - 1
 * - Hello
 * 
*/



/**
 * Hoisting:
 * - Jb humne ye code likha, aur fir isko run kiya to pta hai ki 10
 *   print hoga
 *      var a = 10;
 *      console.log(a); => 10
 * 
 * - But agar mai ye likh du aur run karu to ye v 10 print krta hai:
 *      console.log(a);
 *      var a = 10;
 * 
 * Note: Hoisting is variable ko pehle value assign krna aur baad v define krna.
 * */ 


/**
 * Hoisting: (Bookish Definition)
 * - JavaScript Hoisting refers to the behavior where the JavaScript 
 *   engine moves the declaration of functions, variables, or classes
 *   to the top of their respective scopes (global or local) before 
 *   executing the code.
 * 
 * Explanation in simple terms:
 * - Normally jb hum coding krte hai to usme ye hote hai ki koi variable
 *   declare krne se pehle console.log kr dete to wo bolta hm print ni 
 *   kr skte qki ye to defined hi nhi h or cannot find variable likha 
 *   aaega. But in JS jitni v declarations hoti h variables and functions
 *   ki unko upar pahucha diya jaata hai, means phle JS saare declarations
 *   pdh leta whether it is variable or function hai fir code chalta hai.
 * - Hoisting allows functions to be safely used in code before they are 
 *   declared.
 * - Variables and class declarations are also hoisted, so they too can 
 *   be referenced before they are declared. 
 * 
 * Note: 
 * 1. Doing so can lead to unexpected error, and is not generally 
 *    recommended.
 * 2. Hoisting was thought up as a general way of thinking about how 
 *    execution contexts (specifically the creation and execution phases)
 *    work in JavaScript.
 * 
 * 
 * Example: 
 * - Due to hoisting, there won't be an error even though the variable-a
 *   is used before it's declared. However, it will return `undefined` 
 *   because the declaration is hoisted but the value is assigned after
 *   the `console.log(a)` call.
 * 
 *   console.log(a); //undefined 
 *   greet();
 *   var a = 10;
 *   function greet() {
 *      console.log("hello pepcoders");
 *   }
 * 
 * 
 * Hoisting Explanation:
 * 1. console.log(x);
 * 2. greet();
 * 3. var x = 10;
 * 4. function greet() {
 * 5.     console.log("Hello"); 
 * 6. }
 * 
 * 
 * Phase-1: Memory Creation Phase
 * Step-1 Variable aaega then function So, variable x ko line-1 m 
 * already memory allot ho chuki hai to uske var x = 10; k liye dobara memory
 * allot ni hoga. So, line-3 skip ho jaega qki ek variable k liye ek memory h
 * 
 * Step-2 function aaega -> greet() function ka ek greet variable memory
 * banega aur uske andar poori function utha k as it is daal di jaegi -
 *    
 *     function greet() {
 *        console.log("Hello"); 
 *     }
 * 
 * Phase-2: Code Execution Phase
 * Now in Code Execution -> console.log(x); (line-1) par gye, to yha
 * code console krne bol rha, to hum x pe gye to dikha undefined h ye to 
 * humne console box k andr undefined print kr diya. 
 * Then hum greet pe aae to dekhe function call hai aur mujhe pta h ki 
 * mere greet k andr poori function daali hui h to hm usko call kr dnge, 
 * aur jb call hoga to LEC banega jiske andr local memory and code banega.
 * Ab isme memory execution ka jb phase chlega to ye dhundega lekin 
 * koi variable h ni to humari iss function k andr kisi ko koi memory 
 * allocate hui nai, now wo code execution m aa jaega jaha wo
 * dekhta h console.log("Hello"). To console box k andar hello print kr dega.
 * Now comes the var x = 10; yaha x = undefined se 10 ho jaega leki humein
 * dikhega nai qki console ne x ki value pehle hi print kr di uske baad x
 * ki value change hui.
 * To fir humara answer 'undefined' and 'Hello' print ho jaega.
 * Aur jaise hi bahar aae to dekhe program hi khatm ho gya to mera execution context global wala v destroy ho gya aur humara console m undefined and hello print ho gya.
 * 
 * Output:
 * - Undefined
 * - Hello
*/

/**
 * Hoisting (Our Definition):
 * - We can access the variables and functions even before we have 
 *   declared them.
 *
 * a. Variables Hoisting:
 * -  We can access variables before declaring them, but they will have
 *    the value `undefined` until their assignment occurs.
 * 
 * - Example code (demonstrating hoisting and lexical scope chaining):
 * 
 * 1. function outer() {
 * 2.    inner();
 * 3.    function inner() {
 * 4.        console.log(b); // Will log `10` due to scope chaining.
 * 5.    }
 * 6. }
 * 7. var b = 10; // Declaration is hoisted, initialization happens during code execution.
 * 8. outer();
 * 9. console.log(b); // Will log `10` after the `outer()` function completes execution.
 * 
 * 
 * Memory Creation and Execution Context:
 * --------------------------------------
 * 1. Call Stack has a Global Execution Context (GEC) which contains two phases:
 *    (a) Memory Creation Context
 *    (b) Code Execution Context
 * 
 * Memory Creation Context:
 * ------------------------
 * - The JavaScript engine first allocates memory to all variables and functions before executing the code.
 * - Here's how memory allocation happens in your example:
 * 
 * Line-1: `function outer()` is declared:
 * -> The engine allocates memory for `outer`, and its function definition is stored.
 * 
 * Line-7: `var b = 10;`
 * -> `b` is declared, and its initial value is `undefined` due to hoisting. Assignment happens later.
 * 
 * Code Execution Context:
 * ------------------------
 * - In this phase, the code is executed line by line.
 * - Let's break down the steps:
 * 
 * Step-1: `var b = undefined` -> `10`
 * -> The engine updates the value of `b` from `undefined` to `10` as it encounters the assignment.
 * 
 * Step-2: `outer();`
 * -> A new Local Execution Context (LEC) is created when `outer()` is called.
 *    It also has two phases: (a) Memory Creation and (b) Code Execution.
 * 
 * Memory Creation Phase - Outer Execution Context:
 * ------------------------------------------------
 * 1) `inner();` -> No action yet, as `inner` is a function call.
 * 2) `function inner()` -> The engine allocates memory for the `inner` function inside the `outer` function.
 * 
 * Code Execution Phase - Outer Execution Context:
 * ----------------------------------------------
 * -> The `inner();` function is called.
 * -> When a new function is called, a new LEC (Local Execution Context) is created.
 * 
 * Memory Creation Phase - Inner Execution Context:
 * ------------------------------------------------
 * -> There are no new variables to allocate in `inner()`.
 * -> The function proceeds to the next line: `console.log(b);`
 * 
 * Code Execution Phase - Inner Execution Context:
 * ----------------------------------------------
 * -> `console.log(b);` tries to access `b`:
 *    - First, it checks the `inner()`'s local scope but doesn't find `b`.
 *    - Then, it looks into `outer()`'s local scope but still doesn't find `b`.
 *    - Finally, it checks the Global Scope (GEC) and finds `b = 10`.
 *    - So, it prints `10`.
 * 
 * Step-3: `console.log(b);`
 * -> After the `outer()` function call completes, the program continues to the next line.
 * -> `console.log(b);` prints `10` again, as the value of `b` has been updated in the GEC.
 * 
 * Lexical Scope and Lexical Environment Chaining:
 * ----------------------------------------------
 * - When a function is called, it has access to:
 *   (a) Its own local memory (local variables).
 *   (b) Its parent function's memory (lexical environment).
 *   (c) The Global Execution Context (GEC).
 * 
 * Lexical Environment:
 * -> It refers to the environment (variables and scope) in which a function is created.
 * -> For example, `inner()` has access to its own memory and the `outer()` function's memory.
 * 
 * Scope Chaining:
 * ---------------
 * -> When `inner()` is called, it searches for variables starting in its local scope.
 * -> If it doesn't find the variable, it looks at its parent (outer function) scope.
 * -> If it still doesn't find it, it goes up to the Global Scope.
 * -> This chain of searching from local to parent to global is called Scope Chaining.
 * 
 * Example - Scope Chaining Analogy:
 * ---------------------------------
 * Grandparent: Owns a house.
 * Parent: Inherits the house and adds some property.
 * You: Have your own money but also inherit the house and property.
 * 
 * In the same way, `inner()` has access to its own memory, `outer()`'s memory, 
 * and finally the Global Scope memory.
 * 
 * Final Output:
 * --------------
 * - `10` is printed twice, once inside the `inner()` function and once after the `outer()` function call.
 * 
 * Program completion:
 * -> After the entire code is executed, the Call Stack is cleared, and
 *    all execution contexts are destroyed.
 * 
 * 1. function outer() {
 * 2.    inner();
 * 3.    function inner() {
 * 4.        console.log(b);
 * 5.    }
 * 6. }
 * 7. var b = 10;
 * 8. outer();
 * 9. console.log(b);
 * 
 * 
 * Call Stack k andar GEC ek box banegi usme two parts create hnge
 * (a) Memory
 * (b) Code
 * -------------------------
 * Memory Creation Context -
 * -------------------------
 * Line-1 : function outer() {
 *     -> Mujhe memory allocate krni hai aur function outer aaya. To ye ek variable bana dega outer k naam se aur uske andar poora function ka code de dnge -
 *                     inner();
 *                     function inner() {
 *                         console.log(b);
 *                     }
 * Line-7 : var b = 10;
 *     -> Next variable is b, to maine 'b' ko 'undefined' kr diya.
 * Line-8 : outer();
 *     -> Memory creation m function call ho ni skta to skip
 * Line-9 : console.log(b);
 *     -> skip
 * ------------------------
 * Code Execution Context -
 * ------------------------
 * Step-1 var b = undefined -> 10
 * Step-2 outer();
 *     -> Whenever we call a new function, a new Local Execution Context (LEC) box will be created inside call stack-
 *     (a) Memory Creation Context 
 *     (b) Code Execution Context
 *     -> Ab hum outer k andar dekhnge humein kaha kaha memory allocate krni hai
 *     -----------------------
 *     Memory Creation Phase - Outer Execution Context
 *     -----------------------
 *     1) inner(); -> iska avi kaam nhi hai
 *     2) function inner () {...} dekhnge -> ye function outer k andar ban rha hai jiska naam hai inner. To hum inner naam ka variable bana k uske andar inner function poora ka poora store kr dnge. Fir aage aaye to kuch v nahi h to wahi tk khatm ho gya.
 *     ----------------------
 *     Code Execution Phase -
 *     ----------------------
 *     Ab hum code execution phase m aae. To ab wapas se dkhe to inner(); call hua hai. Aur jb new function call hota hai to execution context banta hai. To Call Stack k andar ek aur Local Execution Context (LEC) create hoga -
 *             -----------------------
 *             Memory Creation Phase - (Inner Execution Context)
 *             -----------------------
 *             -> Iss Memory Creation mai humein koi variable nahi mila mjhe. Ab next line pe aaya to waha console tha, to humein ek v variable nahi mila memory allocate krne k liye aur ye memory creation process khatm ho jaega.
 *             -----------------------
 *             Code Execution Phase -
 *             -----------------------
 *             -> Ab code execution dkhnge i.e. console.log(b);
 *             Note : Ab kahani m twist hai.
 *             -> Ab pehle ye check krega apne 'LOCAL SCOPE' mai. But iske local scope m kuch v nahi hai to ye apne parent k local scope m check krega ki uske andar koi memory h -> 'b' naam ki variable.
 *             -> Agar usme v nahi h to wo apne parent k andar dekhega. Outer k parent k andar 'b' variable ki value hai, to ye value Outer apne parent se lega then inner apne parent outer se lega, then mere console m 10 print ho jaega.
            
 *             Note : Jaise hi ye complete hua to iski LEC destroy ho jaega then fir wo apne parent k paas jaega but wo v complete ho gya to Outer ki LEC v destroy ho jaega.
 *             Ab hum outer k baad console.log(b); pe jaenge
    
 *     Note : We call this 'LEXICAL SCOPE LEXICAL ENVIRONMENT CHAINING' (vvi)

 * Step-3 : console.log(b);
 *         -> humare paas 'b' to hi to hum 10 print kr dnge.
 *         Now program v complete ho gya h to GEC v destroy ho jaega.


 * NOTE : LEXICAL SCOPE LEXICAL ENVIRONMENT CHAINING (Explanation) :
 * Jb GEC se koi function call hoga to uska Child LEC banta h na to wo Execution COntext apni Local Memory ko saath m leta hai aur saath m apne parent ki lexical environment(local memory) le k chalta hai. Ab iss outer function se inner function call hua to inner function k paas apni local memory 
 * Note : Local Environment -
 * -> It means jiss environment se isko call kiya gya hai uss environment ko kehte hai Lexical Environment
 * -> Scope means waha par jo jo (parent variables) variables the ye unko inherit kr lete hai.

 * ->To fir outer k paas apni khud ki local memory aur apne parent ka lexical environement mil gya.
 * -> To Inner wale ko apni local memory + parent ka lexical environment(outer ka lexical environment-> aur outer ki local memory + GEC ka lexical environment = all these are combined together and knows as 'Scope Chaining')

 * Example -
 * ---------
 * Grandparent - House
 * Parent - House + Property
 * Me - My money + House + Property -> Scope Chaining
 */