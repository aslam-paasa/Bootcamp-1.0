/**
 * Basics of Prototype:
*/

const arr = [1, 2, 3];
const str = 'Piyush';
const obj = { x: 1 };

/**
 * Agar hum arr. karte hai to bahut saare functions aate hai, aur same kaam
 * hum str. karte hai to string k andr different function aate hai, ya fir
 * const obj = { x: 1 } karte hai to iss 'x' ko hum dot operator se access
 * krte hai (obj.x). So, this dot operator is used to access the properties
 * of the object.
 * 
 * But agar object k properties ko hum dot operator se access krte hai, to
 * fir string or array k properties ko hum dot operator se kaise access kr
 * paa rhe hai? Because of the prototype.
 * 
 * Jab hum ek array banate hai, iss array k andr kuch functions already
 * defined hai like .map, .filter, .reduce, etc. Aur jab array banate hai
 * to ye sabhi functions iss array k andr available hote hai:
 * 
 * const arr = [1, 2, 3];
 *                   .map()
 *                   .filter()
 *                   .reduce()
 *                    etc
 *
 * Ye saare functions array k andr kaise available hote hai?
 * - Prototype ek object hai jo JavaScript k andr bahut important role play 
 *   karta hai. Jab hum const arr = [1, 2, 3] likhte hai, to JavaScript 
 *   automatically iss arr k andr ek special property __proto__ add kar 
 *   deti hai.
 * 
 * - Ye __proto__ property Array.prototype ko point karti hai, jahan pe saare 
 *   array methods (.map, .filter etc) defined hote hai. Important baat ye hai
 *   ki __proto__ ek reference pointer hai - matlab ye directly Array.prototype
 *   ko point karta hai, copy nahi banata.
 * 
 * - Iska kya fayda hai?
 *   1. Har naya array jo banta hai, usko automatically saare array methods 
 *      mil jaate hai
 *   2. Memory efficient hai kyunki:
 *      - Har array sirf ek pointer (__proto__) store karta hai
 *      - Saare methods ek hi jagah (Array.prototype) mein defined hai
 *      - Koi method update hua to sabhi arrays ko automatically update milta hai
 *   3. Isliye jab hum arr. likhte hai, to JavaScript pehle arr object mein 
 *      dekhti hai, fir uske __proto__ reference ko follow karke Array.prototype
 *      mein check karti hai ki kya method available hai
 * 
 *   const arr = [1, 2, 3];
 * 
 *   arr.__proto__ => {
 *      map: function() {
 *          // logic for map
 *      },
 *      filter: function() {
 *          // logic for filter
 *      }
 *   }
 * 
 *   Array.prototype => {
 *      map: function() {
 *          // logic for map
 *      },
 *      filter: function() {
 *          // logic for filter
 *      }
 *   }
 * 
 *   arr.__proto__ === Array.prototype; // true
 *   - Ye isliye true hai kyunki jab hum array banate hai, to JS uske andr
 *     ek __proto__ property add krti hai jo Array.prototype ko point krti hai.
 *     Isse array ko saare array methods mil jaate hai.
 * 
 *   arr.__proto__ === Object.prototype; // false
 *   - Ye false hai kyunki arr.__proto__ directly Object.prototype ko point
 *     nahi karta. Pehle ye Array.prototype ko point karta hai, fir
 *     Array.prototype Object.prototype ko point karta hai. Ye ek chain
 *     banati hai jise prototype chain kehte hai.
*/

/**
 * Array.prototype ko samjhe:
 * 
 * 1. Kya hai Array.prototype?
 *    - Ye ek special object hai jo JavaScript ke andar built-in hai
 *    - Har array ka "blueprint" hai, jisme common methods store hote hai
 * 
 * 2. Kaha se aata hai?
 *    - JavaScript engine ke andar pre-defined hai
 *    - Browser ya Node.js ke saath automatically aata hai
 * 
 * 3. Object hai ya Class?
 *    - Ye ek object hai, class nahi
 *    - JavaScript prototype-based language hai, class-based nahi
 * 
 * 4. Functions kaise store hote hai?
 *    - Array.prototype ke andar methods as properties store hote hai:
 *      {
 *         map: function() { ... },
 *         filter: function() { ... },
 *         reduce: function() { ... }
 *         // and many more...
 *      }
 * 
 * 5. Iska faayda?
 *    - Memory bachti hai - har array ko methods ki copy nahi banani padti
 *    - Code reuse hota hai - ek jagah define, har jagah use
 *    - Consistency - sabhi arrays ke paas same methods hote hai
*/

/**
 * Array.prototype object kaha store hota hai aur Object.prototype se kaise connect hai?
 * 
 * Memory me storage ka concept:
 * - JavaScript engine ke memory me ek special jagah hai jaha ye store hoti hai
 * - Jaise library me books ki shelves hoti hai, waise hi memory me different 
 *   prototypes ki shelves hai
 * 
 * Prototype Chain ka concept (Important hai!):
 * - Sabse upar Object.prototype shelf hai
 * - Uske niche Array.prototype shelf hai
 * - Connection kuch aise hota hai:
 * 
 *   [Your Array] --> Array.prototype --> Object.prototype --> null
 *      ^               ^                    ^
 *      |               |                    |
 *    Aapka Array    Array ke         Sabhi objects ka  
 *                   functions         final parent
 * 
 * Real life example:
 * - Socho ek family tree:
 *   • Object.prototype = Dada ji (sabse upar)
 *   • Array.prototype = Papa (middle me)
 *   • Aapka array = Aap (bottom pe)
 * 
 * - Jab aap koi method use karte ho:
 *   1. Pehle check hota hai aapke array me
 *   2. Fir Array.prototype me check hota hai
 *   3. Agar waha nahi mila to Object.prototype me check hota hai
 *   4. Agar kahi nahi mila to error aa jata hai
*/

/**
 * Similarly, strings k case m v same concept hai:
 * 
 * const str = "Piyush";
 * 
 * str.__proto__ => {
 *    toUpperCase: function() {
 *        // logic for toUpperCase
 *    },
 *    toLowerCase: function() {
 *        // logic for toLowerCase
 *    }
 * }
 * 
 * String.prototype => {
 *    toUpperCase: function() {
 *        // logic for toUpperCase
 *    }, 
 *    toLowerCase: function() {
 *        // logic for toLowerCase
 *    }
 * }
 * 
 * str.__proto__ === String.prototype; // true
 * 
 * - Jab hum string banate hai, JS uske andr __proto__ property add krti hai
 *   jo String.prototype ko point krti hai
 * - String.prototype m saare string methods defined hote hai
 * - Har string ko ek hi __proto__ pointer rakhna padta hai, methods ki copy nahi
 * - Isliye jab str. likhte hai, to JS pehle str object m dekhti hai, fir
 *   __proto__ ko follow karke String.prototype m check krti hai
*/

/**
 * Prototype Chain:
 * - Ye ek simple concept hai - jaise family tree hota hai, waise hi hai
 * - Har object ka ek __proto__ hota hai jo uske parent ko point karta hai
 * - Jab hum koi method use karte hai (jaise arr.push() ya str.toUpperCase()):
 *   1. Pehle wo khud ke paas check karta hai
 *   2. Nahi mila toh parent (__proto__) ke paas check karta hai  
 *   3. Waha bhi nahi mila toh parent ka parent check karta hai
 *   4. Aise chain banti hai - isiliye ise prototype chain kehte hai!
 * 
 * Example:
 * myArray -> Array.prototype -> Object.prototype -> null
 * myString -> String.prototype -> Object.prototype -> null
*/

/**
 * __proto__ ko samjhte hai bilkul simple tarike se:
 * 
 * 1. __proto__ kya hai?
 *    - Ye ek special property hai jo har JavaScript object mein automatically add hoti hai
 *    - Ye ek pointer ki tarah kaam karti hai jo parent object ko point karti hai
 * 
 * 2. Ye object hai ya class?
 *    - __proto__ ek object hai, class nahi
 *    - Ye parent object ka reference store karta hai
 * 
 * 3. Kahan se aata hai?
 *    - Jab bhi hum koi object/array/string banate hai, JS automatically __proto__ add kar deta hai
 *    - Example: Array banane pe __proto__ Array.prototype ko point karega
 * 
 * 4. Reference type ya value type?
 *    - Ye reference type hai
 *    - Kyunki ye parent object ka reference store karta hai, actual copy nahi
 * 
 * 5. Kaise kaam karta hai? (Chain Process)
 *    Example: arr.push(4) ko execute karne ka process
 *    
 *    Step 1: arr object mein push() dhundega
 *            ❌ Nahi mila
 *    
 *    Step 2: arr.__proto__ (Array.prototype) mein push() dhundega
 *            ✅ Mil gaya! Execute kar diya
 *    
 *    Agar push() Array.prototype mein nahi milta to:
 *    Step 3: Array.prototype.__proto__ (Object.prototype) mein dhundta
 *    Step 4: Object.prototype.__proto__ (null) tak jata
 *    Step 5: Agar kahi nahi mila to error de deta hai
 * 
 * 6. Internal Structure:
 *    const arr = [1, 2, 3];
 *    
 *    arr = {
 *      0: 1,
 *      1: 2, 
 *      2: 3,
 *      length: 3,
 *      __proto__: Array.prototype  // Points to Array methods
 *    }
 * 
 *    Array.prototype = {
 *      push: function() { ... },
 *      pop: function() { ... },
 *      map: function() { ... },
 *      __proto__: Object.prototype  // Points to Object methods
 *    }
 * 
 *    Object.prototype = {
 *      toString: function() { ... },
 *      valueOf: function() { ... },
 *      __proto__: null  // Chain ends here
 *    }
 * 
 * Important Points:
 *   1. Browser engine provides these prototype values
 *   2. Har browser ka apna implementation hota hai
 *   3. Purane browsers jinko update nahi kiya gaya hai,
 *      unme ye values nahi milti
 *   4. Developers ke liye ye ek badi problem hai
 *   5. Isliye hum polyfills banate hai taki purane browsers 
 *      me bhi code sahi se chale
*/


/**
 * Prototype Inheritance:
 * 
 * 1. Ye kya hai?
 *    - Ye ek tarika hai jisse JS mein ek object dusre object ki properties aur methods use kar sakta hai
 *    - Jaise bacche apne parents se kuch inherit karte hai, waise hi objects bhi karte hai
 * 
 * 2. Kaise kaam karta hai?
 *    - Jab hum koi property/method use karte hai:
 *      a. Pehle wo current object mein dhundta hai
 *      b. Nahi mila toh parent object mein check karta hai
 *      c. Waha bhi nahi mila toh parent ka parent check karta hai
 *      d. Ye chain tab tak chalta hai jab tak mil na jaye ya null tak pahunch jaye
 * 
 * 3. Kaha store hota hai?
 *    - Har object ke pass __proto__ naam ki property hoti hai
 *    - Ye property parent object ka reference store karti hai
 * 
 * 4. Example se samjhe:
 *    const animal = { 
 *      eats: true 
 *    };
 *    
 *    const rabbit = { 
 *      jumps: true,
 *      __proto__: animal  // rabbit ko animal se connect kiya
 *    };
 *    
 *    console.log(rabbit.eats);  // true - animal se mila
 *    console.log(rabbit.jumps); // true - khud ke pass hai
*/

/**
 * Kya saare variables JavaScript mein object hote hai?
 * 
 * 1. Primitive Types (Basic types jo object nahi hai):
 *    - Number:   1, 2, 3.14
 *    - String:   "hello", 'world'
 *    - Boolean:  true/false
 *    - null:     null
 *    - undefined: undefined
 * 
 * 2. Primitive se Object mein conversion ka process:
 * 
 *    Example 1 - String:
 *    let str = "hello"
 *    
 *    // Jab hum str.length likhte hai:
 *    Step 1: JS temporary wrapper object banata hai
 *            let temp = new String("hello")
 *    
 *    Step 2: temp object ka prototype chain set hota hai
 *            temp.__proto__ = String.prototype
 *            temp.__proto__.__proto__ = Object.prototype
 *            temp.__proto__.__proto__.__proto__ = null
 *    
 *    Step 3: Method execution ka flow
 *           - Pehle temp object mein length check hota hai
 *           - Fir String.prototype mein check hota hai
 *           - Agar waha nahi mila to Object.prototype mein check hota hai
 *           - Last mein null tak pahunchta hai
 *    
 *    Step 4: Cleanup process
 *           - Result return hota hai (5 in this case)
 *           - temp object garbage collection mein chala jata hai
 *           - Memory free ho jati hai
 * 
 *    Example 2 - Number:
 *    let num = 100
 *    
 *    // Jab hum num.toString() likhte hai:
 *    Step 1: let temp = new Number(100)
 *    
 *    Step 2: Prototype chain banti hai
 *           temp.__proto__ = Number.prototype
 *           temp.__proto__.__proto__ = Object.prototype
 *           temp.__proto__.__proto__.__proto__ = null
 *    
 *    Step 3: toString() ka search flow
 *           - temp object mein check
 *           - Number.prototype mein check
 *           - Object.prototype mein check
 *           - Null tak search
 *    
 *    Step 4: Cleanup
 *           - "100" string return hota hai
 *           - temp object delete ho jata hai
 *           - Memory clear ho jati hai
 * 
 * Simple words mein:
 * JS engine automatically primitive values ko object mein wrap karta hai,
 * methods execute karta hai, aur fir cleanup kar deta hai. Ye process itni
 * speed se hota hai ki hume dikhai nahi deta!
*/

