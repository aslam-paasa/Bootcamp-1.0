/**
 * Call, apply, bind:
*/

/**
 * 1. Create a function ptaNhi which takes two parameters:
 *    a. superman
 *    b. delay
 *    But avi humein inki property nhi pta, superman & delay kuch v ho skta
 *    hai like function, object, string, number, etc.
 * 2. Create a variable myId wo kya krta hai usko idea nhi hai
 * 3. Return a function which make our ptaNhi HOC, meaning function returning
 *    a function called HOC and that returned fn is called callback.
*/

// function ptaNhi(superman, delay) {
//     let myId;

//     return function() {}
// }


/**
 * Function k andr agar console.log(args) karnge to wo kya print karega?
 * - ReferenceError: args is not defined.
 * 
 * But of we do console.log(arguments) to wo kya print karega?
 * - Object {0: 'superman', 1: 'delay'}
 * - Arguments is an object that contains all the arguments passed to the 
 *   function.
 * 
 * If we do console.log(arguments[0]) to wo kya print karega?
 * - 'superman', means that the first argument is 'superman'.
 * 
 * Note: Kabhi humein arguments pta karna ho to hum arguments ka use kr k
 *       pta kar skte hai.
*/

// function ptaNhi(superman, delay) {
//     // console.log(args); // ReferenceError: args is not defined.
//     console.log(arguments);
//     console.log(arguments[0]);
//     console.log(arguments[1]);

//     let myId;

//     return function() {}
// }

// ptaNhi('superman', 'delay');


/**
 * How can we understand this function?
 * - Tiffin Box Concept:
 * - Consider ptaNhi() fn as pitaji ka ghr and function() ek baccha hai jo
 *   se school jaata hai aur saath m tiffin le k jaata hai aur tiffin m jitna
 *   v item hai sab pack kr k le jaata hai:
 *   a. console.log(arguments);
 *   b. let myId;
 *   Aur ye capability return function() ko sirf milti hai, kisi aur ko nhi
 *   milti. Aur iss function ko reference jiske paas hai wo 'myId' ko access
 *   and manipulate kar skta hai. Aur isi ko closure, lexical scope bolte
 *   hai.
*/

// function ptaNhi(superman, delay) {
//     console.log(arguments);
//     let myId;

//     return function() {}
// }


/**
 * How can we use those arguments in return function?
 * Jab v hum setTimeout aise use karte hai to sbse bda concern datatype pta
 * krna rehta hai, agar value paas kr rha hu to kaisi value paas kr rha hu,
 * aur agar value return ho rhi hai to humein pta krna hai kon si value return
 * aa rhi hai, like map use krte hai to return m kya aa rha hai, reduce use
 * krte hai to return m kya aa rha hai, usi tarah humein setTimeout() m return
 * mai kya milta hai.
 * 
 * Jab v hum iss tarah k timer par methods lagate hai to wo v memory m kahi
 * gye honge, aur uss memory ka agr reference chaiye to kaise lenge? Wo
 * referene humein return m milta hai jisse humein kisi variable ko assign
 * kar dete hai.
 * 
 * Agar multiple setTimeout() calls hote hai hum usse kisi bhi variable ko
 * assign nhi krte to kon se timer lena hai aur kisse hatana hai pta nhi hoga.
 * Kis setTimeout ki kon si value hai we don't know. Aur agar kisi setTimeout
 * ko bich m rokna pad gya to uska koi zariya hi nhi hai. Isliye jydatar
 * jagha jab v hum iss tarh k setTimeout ya koi v timer function dete hai
 * to hum unka reference hold kar k rkhte hai kisi variable mai.
*/

// function ptaNhi(superman, delay) {
//     console.log(arguments);
//     let myId;

//     return function() {
//         myId = setTimeout(() => {
//             console.log(arguments);
//         }, delay);
//     }
// }


/**
 * Kya hum iss fn() ko directly call kar skte hai?
 * - Yes, but iss fn() ko pta hi nhi hai ki wo kis duniya m rehta hai means
 *   usko context ka gyan nhi hai.
 * 
 * Fn() ko context ka gyan kaise diya jae? Yha pe call, apply, bind m se kya
 * krnge?
 * a. call ko call krne ki kya requirement hai?
 *    - call direct this keyword le k call krega.
 * 
 * b. bind ko call krne ki kya requirement hai?
 *    - bind direct this keyword le k call krega aur usko new fn m return krega.
 *    - fn.bind(this) kar dete to ye apne parent context m call karta aur
 *      waha se usse arguments pass krta hai aur execute ho k ek new fn return
 *      kr deta. But problem ye hai ki arguments k andr multiple values hai.
 *    - Sol: function(...args) se hum array ko spread kar denge wo spreaded
 *           args ko hum fn.bind(this, args) m paas kr dete hai.
 *    - Note: fn.bind('this') se ptaNhi k andr ka context paas ho jaata hai
 *            lekin arguments paas nhi hote, isliye hum function(...args)
 *            use krte hai jis se hum arguments ko spread kr dete hai aur
 *            wo spreaded args ko hum fn.bind(this, args) m paas kr dete hai.
 * 
 *           return function(...args) {
 *              myId = setTimeout(() => {
 *                  fn.bind(this, args);
 *              }, delay);
 *           }
 * 
 * c. apply ko call krne ki kya requirement hai?
 *    - Agar array ki kahi baat ho rhi ho to humein apply use krna hai.
*/

/**
 * Ab humare paas ek clearTimeout() fn hota hai jiske andr hum agar reference
 * paas kr de myId ka to iss poore setTimeout() ko dustbin m daal dega.
*/

// function ptaNhi(superman, delay) {
//     console.log(arguments);
//     let myId;

//     return function(...args) {
//         clearTimeout(myId);
//         myId = setTimeout(() => {
//             fn.bind(this, args);
//         }, delay);
//     }
// }


/**
 * Step 1: Function Declaration
 * - Ek parent function banaya 'ptaNhi' naam se
 * - Isme 2 parameters hai:
 *   a) superman: ye ek function hai jo execute hoga
 *   b) delay: kitne milliseconds baad function run hoga
 * 
 * Step 2: Variable Setup
 * - console.log(arguments) se hum check kar sakte hai ki kya parameters mile
 * - myId variable banaya jo setTimeout ka reference store karega
 * 
 * Step 3: ...args ka use
 * - Iss case mai jab hum ptaNhi('superman', 4) call karte hai to:
 *   - 'superman' first argument hai
 *   - 4 second argument hai
 *   - ye dono arguments ...args mai aa jaenge as array
 *   - ...args = ['superman', 4]
 * 
 * Step 4: bind ka use
 * - fn.bind(this, args) kyu use kiya?
 *   - bind humein 2 cheezein provide karta hai:
 *     1. function ka context set karta hai (this keyword)
 *     2. arguments ko bind karta hai
 *   - Iss case mai:
 *     - this: parent function ka context
 *     - args: ['superman', 4] jo ...args se aaya
 * 
 * Step 5: Debouncing Logic
 * - clearTimeout(myId) pehle existing timer ko clear karta hai
 * - Fir naya setTimeout create hota hai:
 *   - Arrow function (() =>) use kiya hai callback ke liye
 *   - fn.bind(this, args) se function ko current context aur arguments diye
 *   - delay time ke baad ye execute hoga
 * 
 * Important Note:
 * - Iss specific example mai:
 *   ptaNhi('superman', 4) call karne pe
 *   - arguments object mai: { '0': 'superman', '1': 4 }
 *   - ...args mai: ['superman', 4]
 *   - bind ke through ye arguments function ko mil jaenge
 * 
 * - Agar hum aur arguments add karte:
 *   ptaNhi('superman', 4, 'extra1', 'extra2')
 *   - arguments mai: { '0': 'superman', '1': 4, '2': 'extra1', '3': 'extra2' }
 *   - ...args mai: ['superman', 4, 'extra1', 'extra2']
*/

// function ptaNhi(superman, delay) {
//     console.log(arguments);
//     let myId;

//     return function(...args) {
//         clearTimeout(myId);
//         myId = setTimeout(() => {
//             fn.bind(this, args);
//         }, delay);
//     }
// }

// ptaNhi('superman', 4);


/**
 * Debounce: debounce is a technique used to prevent a function from being
 * called multiple times in a short period of time.
 * 
 * This fn.bind(this, args) has small bug. Humein nhi pta ki hum yha call,
 * apply, ya bind likhnge?
 * - Yha pe fn.bind() sirf function ko bind kar rha hai lekin usse execute nhi kar rha
 * - Iske liye humein fn.call() ya fn.apply() use karna chahiye
 * - fn.call(this, ...args) ya fn.apply(this, args) dono same kaam karenge
 * - call() individual arguments leta hai aur apply() array of arguments leta hai
 * - Iss case mai dono chal jaenge kyunki ...args already array hai
*/

function ptaNhi(fn, delay) {
    console.log(arguments);
    let myId;

    return function (...args) {
        clearTimeout(myId);
        myId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

function greet(name) {
    console.log(`Hello ${name}`);
}

/**
 * How does this callback triggers?
 * 
 * Ye callback kaise trigger hota hai:
 * 1. ptaNhi() ko ek arrow function aur 4000ms delay ke saath call kiya jata hai
 * 2. arguments object mein:
 *    - [0]: arrow function jo greet('superman') ko call karta hai 
 *    - [1]: 4000 (delay in milliseconds)
 * 
 * 3. ptaNhi() ek closure return karta hai jo:
 *    - Existing timer ko clear karta hai (clearTimeout)
 *    - Naya timer set karta hai 4000ms ke liye
 *    - Timer expire hone par fn.apply() ko call karta hai
 * 
 * 4. Lekin iss implementation mein ek bug hai - 'fn' undefined hai
 *    Sahi implementation mein 'superman' parameter ka use hona chahiye
 *    fn.apply() ki jagah
 * 
 * 5. Expected behavior ye hona chahiye ki 4 second ke baad
 *    "Hello superman" print ho
*/

const sachMeNhiPta = ptaNhi(() => greet('superman'), 4000);
sachMeNhiPta();

/**
 * Basically user request pe request bheje jaa rha hai within the delay time
 * to puraani wali sb hata do aur last wali ko process kro after the delay
 * time. It is called debouncing.
*/

// remove past request => keep a reference of the request
// fire a new request  
// ptaNhi()      => sachMeNhiPta()
// userRequest() => debouncedUserRequest()





/**
 * Meri website pe koi aaya aur usne koi resource request kara, ab wo resource
 * aa rha hai utni der mai humne dobara se resource ki request kar di, lekin
 * humne kaha ki hum x-delay time m ek hi request process karnge. This is
 * 'sabr karo concept' called 'throttling'.
*/

const ptaNahi = (fn, delay) => {
    let myId = null;

    return () => (...args) => {
        if (myId === null) {
            fn(...args);
            myId = setTimeout(() => {
                myId = null;
            }, delay);
        }
    }
}

ptaNahi();