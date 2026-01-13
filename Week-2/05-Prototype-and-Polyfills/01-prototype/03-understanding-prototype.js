/**
 * Agenda:
 * 1. Birth of a Star
 * 2. Is Everything in JavaScript is an object?
 * 3. 2 Special Properties
 * 4. Prototype Chain
 * 5. __proto__ [[ Prototype ]] prototype
 * 6. Benefit of having a prototype based language
 * 7. new keyword and Object.create() - Demystified
 * 8. Inheritance in Object (Prototypal Inheritance)
 * 9. Polyfill of Object.create and new keyword
 * 10. Classical Inheritance vs Prototypal Inheritance
 * 11. Example Why classes are not just syntactical sugar.
 * */ 

/**
 * JavaScript is Prototype based language.
*/

/**
 * Understanding Birth of Star will help us to understand Birth of Object.
 * Starting m humaare paas group of Nebula's hote hai i.e. huge clouds
 * of gas and dust jo planets k takraane se create hote hai. Ab jb 
 * 2 nebula aapas m takraate hai to bahut saare chain reaction aapas
 * m start hote hai, gravity chijo ko ek center of point ki taraf push
 * krne ki koshish krti hai jiske wajah se pressure create hota hai,
 * temperature badhta hai, gases aapas m react krna shuru krti hai
 * jinki wajah se chote chote 'proto start' banne lgte hai(Ye avi star
 * nhi bne hai) aur ab inme reaction start ho rhi hai. Aur million
 * years k baad jb pressure and temperature bahut jyda ho jaata hai,
 * saari gases ek center point pe focus krti hai, tb at the moment 
 * jaake humein ek star milta hai.
 * 
 * Q. Is everything in JS is an object?
 *  - No! Everything in JS tries to be an object. 
 *  - Jb v hm koi primitive value pe koi key access krte hai, uss 
 *    particular moment of time mai JS internally humaare liye ek
 *    object create krta hai, jiss v string pe maine property ko access
 *    kiya hai aur fir uss object pe wo property access krta hai,
 *    jo value return hoti hai wo value humein return kr k de deta hai
 *    aur fir jo newly created object hota hai usse garbage collect
 *    kr leta hai, and this concept is known as boxing.
 * 
 * Note: Everything is not an object in JS. Agar sb object hota to hm
 *       null & undefined pe v toString() call kr skte the. 
 *      (null.toString() && undefined.toString())
 * 
 * Birth of an object:
 * - In the beginning, Star banne pe pehle nebula hota hai. Similarly,
 *   JS mai sirf 2 chije hoti hai jisse sbkuch banta hai:
 *   a. Object Function(Capital object)
 *   b. prototype (Helper of Object)
 * - In JS, everything tries to be an object, even a function. Function
 *   mai hm koi v property add kr k, koi v property & information add kr
 *   skte hai.
 * 
 *      function test() {}
 *      -> undefined
 *   
 *      test.myrandomProperty = 'some random property'
 *      -> 'some random property'
 * 
 *      test.myrandomProperty
 *      -> 'some random property'
 * 
 * - Agar mai console m type karu 'Object' to humein milega: fn Object(),
 *   means this Capital Object is fn.
 * - Jb v code m hm likhte hai: const obj = {};
 *   Internally always JS calls the Object fn with new keyword to
 *   create an object: new Object();
 * - Agar iss Object fn k andr hm dekhe to humein ek 'prototype' key
 *   dikhega. Iss prototype key ki jo value hai wo ek object hai aur
 *   uss object m kuch default behaviors hai. Yhi default behavior 
 *   hmein apne 'obj' pe 'toString()' use krne de rha hai jbki humne
 *   to koi 'toString()' bnaya hi nhi.
 * 
 * Q. Iss obj m kaise toString() fn aata hai?
 *  - Object() fn k andr ek prototype key hoti hai jiski value ek object
 *    hoti hai, waha par ye default methods define hote hai. To jb v hm
 *    obj bnate hai to JS add this information in the newly created
 *    Object.
 * 
 *                                         (Object Function)
 *                                             Prototype
 *                                                 |
 *                             inject it           V
 *    const newObject = {}; <------------------ {toString}
 * 
 *  - Humne har ghr mai suna hai ki ye apne papa pe gya hai, ye apne
 *    mummy pe gyi hai, aur ye wahi chije krta hai to iske papa krte 
 *    hai. Aur aisa isliye ho paata hai qki humaare father ka kuch
 *    default behavior/DNA humaare andr aa chuka hai jisko hm badal
 *    nhi skte. Aur jb hm paida hote hai to parent ki saari behavior
 *    bundle ho k humaare andr aa jaati hai.
 * 
 *                 via DNA
 *    Son <------------------------- Father
 * 
 *  - Similarly, JS m Object() Fn sbka papa hai, aur jitne v object
 *    bnte hai ye unme apna DNA daal deta hai. But how? Har object 
 *    apne paas ek special key rkhta hai i.e. prototype, jisme default
 *    functions hoti hai aur during object creation ye saari fns bundle
 *    kr k humaare newly object m feed kr di jaati hai.
 * 
 *                   prototype
 *    object <------------------------- Object
 * 
 * Q. Ab father ki characteristics DNA se aati hai aur Son m save hoti
 *    hai. Similarly, Object ki characteristics prototype se aati hai
 *    wo object m kaha save hoti hai?
 *  - JS creates a hidden property called [[Prototype]] in every object
 *    and waha par wo default functionality inject kr deta hai.
 * 
 * We have learnt till now:
 * 1. Object Function
 * 2. A key prototype in Object function
 * 3. this prototype key contains default behaviors
 * 4. value of prototype key is object.  
 * => Ye 4 chije beginning m hoti hai jb hm 'const obj = {}' krte hai.
 * => And JS simply obj.[[prototype]] = Object.prototype; kr deta hai.
 * 
 * Q. How to access this [[prototype]]?
 *  - Jis tarah se hm apna DNA nhi dekh skte hai, usi tarah se we cannot
 *    see this [[prototype]] via JS. But DNA kr skte hai.
 *  - Type: obj
 *           V {}
 *              > [[prototype]]: Object
 *                      | 
 *                      V
 *                Iske expand krne pe hm property dekh skte hai
 * 
 *  - obj.__proto__ humein [[prototype]] ki value deta hai, means
 *    [[prototype]] k andr ki default functionalities dikhata hai.
 * 
 *  - So, if we do: obj.__proto__ === Object.prototype => true.
 *    And this is how JS works. Ye internally humare created object
 *    mai [[prototype]] key inject krta hai Object.prototype key m jo
 *    value hoti hai wo attach kr deta hai.
 * 
 *                                        toString etc... 
 *                                          |
 *                      prototype(link)     V
 *    ObjectFunction ---------------->     { }       (2. [[Prototype]] is then linked with this default functionalities)
 *                                          |
 *    const obj = {} ----------------> [[Prototype]] (1. hidden key added)
 * 
 * Note: For better understanding, we can say JS is link(prototype) based
 *       language. Means jb v hm object create krte hai to wo object
 *       internally uss fn se attach ho jaata hai jo usse bnata hai.
 *                             |
 *                             V
 *  - Jb v hm ek object bnate hai to wo object link ho jaata hai uss
 *    fn k prototype key se jisse wo object bna hua hai. (That means
 *    JS m harr fn k paas prototype key hoti hai, because JS m ek
 *    object humesa ek fn se bnta hai, aur jb v aisa hota hai to wo
 *    object uss prototype se attach ho jaata hai [DNA inserted], aur
 *    isi ko hm prototype chain bolte hai)
 * 
 * 3. Jis tarah se humein apne papa ka naam milta hai. Hm kisi fn m
 *    jaate hai to humse pucha jaata hai ki hm kispe ladke hai to hm
 *    apne papa ka naam btate hai. Similarly, agar mujhe ye pta krna
 *    ho ki ye prototype wala Object ka father kn hai, uske liye hm
 *    kya krnge? Jis tarah se fn k paas ek key hoti hai prototype
 *    jiski value ek object hoti hai. Ab iss Object k paas ek key hoti
 *    hai called Constructor and iss Contructor ki value hoti hai wo
 *    fn jisse Object prototype attached hai. Aur ye fn sirf isliye
 *    hai ki ye bta ske ki ye jo prototype object hai ye kis fn ka 
 *    prototype object hai.
 * 
 *    Object.prototype.constructor === Object => true
 *    [constructor is pointing its Object Fn]
 * 
 *  - Ye constructor hi saari sharing and linking ki wajah hai. 
 *    Har Fn m prototype hota hai.  
 * 
 *  - console.log(Array)
 *                  |
 *                  V
 *                prototype:
 *                a. at
 *                b. concat
 *                c. constructor
 *                d. copyWithin
 *                e...... 
 *                .....
 *  - Jb hm const arr = []; krte hai to JS aisa krta hai:
 *    arr.[[prototype]] = Array.prototype; (Array.prototype linked)
 * 
 * Summary:
 * 1. Every object in JS comes from a function.
 * 2. Base Function of every function is Object function.
 * 3. Whenever we create an object, internally JS will invoke new Object.
 * 4. obj.[[prototype]] = Object.prototype
 * 
 * 
*/

/** 
 * There are two ways to see kisi Object ka prototype kya hai:
 * 1. obj.__proto__ : It's not a property but getter & setter fn.
 * 
 * a. In function, we have a prototype.
 * b. In Objects, we have Hidden property [[Property]] and Getter Setter
 *    function is Object.prototype. 
 *  */

/**
 * Exercise:
 * 10000 students
 * we will consider n = 2
 * */ 

// Approach-1: Creating variable for 10000 students
// let student1Name = 'X';
// let student1Age  =  10;

// let student2Name = 'Y';
// let student2Age  =  20;


/**
 * Approach-2: 
 * Don't create same fn for 10000 objects
*/
// const student1 = {
//     age: 10,
//     checkAge: function() {
//         if(student1.age < 4) {
//             return 'Not Eligible';
//         }
//     }
// };

// const student2 = {
//     age: 10,
//     checkAge: function() {
//         if(student1.age < 4) {
//             return 'Not Eligible';
//         }
//     }
// };

/**
 * Approach-3:
 * Issue: But agar humaare paas 10000 students hai to 10000 fn bnenge
 *        to checkAge.
*/
// function createStudent(name, age) {
//     const obj = {};
//     obj.name = name;
//     obj.age = age;

//     obj. checkAge = function() {

//     }
// }

// const student1 = createStudent('x', 10);
// const student2 = createStudent('x1', 10);

/**
 * Approach-4: Create on fn, bind with all and reuse
*/
function createStudent(name, age) {
    const obj = Object.create(studentChecker);
    obj.name = name;
    obj.age = age;

    return obj;

    const studentChecker = {
        checkAge: function() {
            console.log("studentChecker");
            
        },
    }
}

const student1 = createStudent('x', 10);
const student2 = createStudent('x1', 10);