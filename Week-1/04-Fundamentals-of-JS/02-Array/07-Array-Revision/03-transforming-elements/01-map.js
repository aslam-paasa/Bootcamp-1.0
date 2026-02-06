/**
 * Map function:
 * - Map ek array method hai jo har element par operation perform
 *   karke naya array return karta hai.
 * - Original array ko modify nahi karta, naya array create karta hai
 * 
 * Note: That's the only difference between map and forEach.
 */


const numbers = [1, 2, 3, 4, 5];


/**
 * Map:
 * - It will return a new array.
 * - It takes 3 parameters:
 *   - item : current element            [1, 2, 3, 4, 5]
 *   - index: current element's position [0, 1, 2, 3, 4]
 *   - array: original array             [1, 2, 3, 4, 5]
*/

const newNums01 = numbers.map((item, index, array) => {
    console.log(item, index, array);
})

/**
 * Output explanation:
 * Har iteration mein map function 3 values print karega:
 * - item: current number (1, 2, 3, 4, 5)
 * - index: current number ka position (0, 1, 2, 3, 4)
 * - array: original array [1, 2, 3, 4, 5]
*/
console.log(newNums01);



/**
 * Ex: Add 5 to each element of the array
*/
const newNums02 = numbers.map((item, index, array) => {
    return item + 5;
})
console.log(newNums02); // Output: [6, 7, 8, 9, 10]



/**
 * Q. Ek array of objects hai, aur uss array mai hum logo ke paas kaafi data
 *    hai usse ek array banao jisme sirf name ho.
*/

let users = [
    { name: "John", age: 20, city: "New York" },
    { name: "Jane", age: 21, city: "Los Angeles" },
    { name: "Jim", age: 22, city: "Chicago" },
    { name: "Jill", age: 23, city: "Houston" },
    { name: "Jack", age: 24, city: "Miami" },
]

let names = users.map((user) => user.name);
console.log(names);


/**
 * Original products array with prices:
 */
const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 50 },
    { id: 3, name: "Keyboard", price: 100 },
    { id: 4, name: "Headphones", price: 200 }
];


/**
 * Map function ka use karke prices ko update karna
 * 1. Har product ka price 10% increase karna
 * 2. Log karna current product ka details
 * 3. Return karna updated product object
 *    - existing product properties copy karna
 *    - new price set karna
 * 4. Results display karna
 */
const updatedProducts = products.map(function(product, index) {
    const newPrice = product.price * 1.1;    
    console.log(`Processing product ${index + 1}: ${product.name}`);
    
    return {
        ...product,  
        price: newPrice
    };
});

console.log("\nOriginal Products:");
console.log(products);

console.log("\nUpdated Products (10% price increase):");
console.log(updatedProducts);


/**
 * Ex-1: Names se Initials Banana
 * - Is example mein hum full names se initials banayenge
 * - Jaise "Sumeet Malik" se "S. M." banega
 */

/**
 * 1. Ek array banaya full names ke saath
 */
let name = [
    "Sumeet Malik",
    "Amit Malik",
    "Inderjit Malik",
    "Daya Malik",
    "Kunal Malik",
    "Aryan Malik"
];

/**
 * 2. Map function ka use karke initials banayenge
 *    a. Split karo full name ko do parts mein
 *    b. Pehle naam ka pehla letter aur last name ka pehla letter lo
 *    c. Dono letters ko dots ke saath join karo
 *    d. Return karo initials
 */
let initials = name.map(function(fullName) {
    let nameParts = fullName.split(" ");
    
    let firstInitial = nameParts[0][0];  // firstName ka pehla letter
    let lastInitial = nameParts[1][0];   // lastName ka pehla letter
    
    return firstInitial + ". " + lastInitial + ".";
});

/**
 * 3. Final result print karo
 */
console.log("Original Names:", name);
console.log("Initials:", initials);

/**
 * Kya Hua Is Code Mein:
 * 1. Har full name ko split() se do parts mein tod diya
 * 2. Har part ka pehla letter liya
 * 3. Dono letters ko dots ke saath join kiya
 * 4. Map function ne har name ke liye ye process kiya
 * 5. Result mein ek naya array mila jisme sabke initials hain
 */


/**
 * Ex-2: Names se Initials Banana
*/

let arr = [
    "Sumeet Malik",
    "Amit Malik",
    "Inderjit Malik",
    "Daya Malik",
    "Kunal Malik",
    "Aryan Malik"
]

/**
 * 1. Split karo full name ko do parts mein
 * 2. Pehle naam ka pehla letter aur last name ka pehla letter lo
 * 3. Dono letters ko dots ke saath join karo
 * 4. Return karo initials
 */
let iarr = arr.map(function(name, index){
    let partsofname = name.split(" "); //["Sumeet", "Malik"]
    let fname = partsofname[0];
    let lname = partsofname[1];
    let ffc = fname[0];
    let lfc = lname[0];

    return ffc + "." + lfc + ".";
});

console.log(iarr);


/**
 * Ex-3: Name se initials banana (Using Arrow Function)
*/

let arr2 = [
    "Sumeet Malik",
    "Amit Malik",
    "Inderjit Malik",
    "Daya Malik",
    "Kunal Malik",
    "Aryan Malik"
]

let iarr2 = arr2.map(name => {  
    let partsofname = name.split(" ");
    let fname = partsofname[0];
    let lname = partsofname[1];
    let ffc = fname[0];
    let lfc = lname[0];

    return ffc + "." + lfc + ".";
});

console.log(iarr2);


let fullNames = [
    "Sumeet Malik",
    "Amit Malik",
    "Inderjit Malik",
    "Daya Malik",
    "Kunal Malik",
    "Aryan Malik"
]

/**
 * 1. Split the full name into first name and last name
 * 2. Get the first character of the first name and last name
 * 3. Join the first characters with a dot
 * 4. Return the initials
 */
let nameInitials = fullNames.map(function (fullName, index, originalArray) {
    /**
     * 1. Split the full name into first name and last name
    */
    let nameParts = fullName.split(" ");
    let firstName = nameParts[0];
    let lastName = nameParts[1];

    /**
     * 2. Get the first character of the first name and last name
     * 3. Join the first characters with a dot
     * 4. Return the initials
    */
    let firstNameInitial = firstName[0];
    let lastNameInitial = lastName[0];
    let formattedInitials = firstNameInitial + "." + lastNameInitial + ".";
    return formattedInitials;
})

console.log(nameInitials);

/**
 *  Output : ["S.M.", "A.M.", "I.M.", "D.M.", "K.M.", "A.M."]
 */


/**
 * Map Function ke Important Points:
 * 1. Original array ko modify nahi karta, naya array return karta hai
 * 2. Har element ke liye callback function ek baar chalta hai
 * 3. Return ki gayi values se naya array banta hai
 * 4. Array ke length ke equal hi naya array banta hai
 * 
 * Common Use Cases:
 * 1. Data transformation
 * 2. Price calculations
 * 3. Format changes
 * 4. Data cleaning
 */
