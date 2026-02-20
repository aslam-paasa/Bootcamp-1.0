/**
 * 1. Object Destructuring Introduction:
 * - JavaScript ka ek feature hai jo humein objects se data extract karne 
 *   mein help karta hai.
 * - Isse hum object ke properties ko alag variables mein store kar sakte 
 *   hain easily.
 */


/**
 * 2. Sample Object:
*/
const cartoonDataOne = {
    id: 1,
    title: "Tom and Jerry",
    createdIn: "1940",
    createdBy: "William Hanna and Joseph Barbera",
    isAired: true,
    famousCharacters: [
        "Tom-Cat",
        "Jerry-Mouse",
        "Spike",
        "Tyke",
        "Toddles Galore",
        "Quacker",
        "Jeannie",
        "Mammy Two Shoes",
    ],
    books: {
        English: {
            book1: "There's a Mouse Hiding in This Book",
            book2: "This Book Is Not a Piece of Cheese!",
        },
        Hindi: "Available in hindi",
        French: "",
    },
    channel: "cartoon network",
    NoOfEpisode: 2736,
    reviews: {
        tv_review: {
            rating: 8.2,
            NoOfRatings: 564345,
            NoOfFeedback: 0,
        },
        IMDb: {
            rating: 8.4,
            NoOfRatings: 657678,
            NoOfFeedback: 35465,
        },
    },
};

/**
 * 3. Object Destructuring ke 2 tarike hain:
 * a. Old Way (Before ES6)
 * b. Modern Way (ES6+)
*/

/**
 * a. Old Way (Before ES6)
 *    - Har property ke liye alag line likhni padti thi
 *    - const createdIn = cartoonData.createdIn;
 *    - const createdBy = cartoonData.createdBy;
*/

// const createdIn = cartoonData.createdIn;
// const createdBy = cartoonData.createdBy;


/**
 * b. Modern Way (ES6+)
 *    - Ek hi line mein multiple properties extract kar sakte hain
 *    - const { createdIn, createdBy, title } = cartoonData;
 *    - console.log(createdBy, createdIn, title);
 */

const { createdIn, createdBy, title } = cartoonDataOne;
console.log(createdBy, createdIn, title);


/**
 * 4. Benefits of Object Destructuring:
 *    - Code kam likhna padta hai
 *    - API se data handle karna aasan ho jata hai
 *    - Code clean aur readable ban jata hai
 */

/**
 * 5. Real World Example:
 *    - Jab bhi hum API se data fetch karte hain (jaise Weather API, Movie API)
 *      to wo data object ke form mein aata hai
 *    - Object destructuring se hum easily specific data extract kar sakte hain
 */





/**
 * 6. Accessing nested objects:
 *    a. Old way
 *    b. New way: Object Destructuring
*/

const cartoonDataTwo = {
    id: 1,
    title: "Tom and Jerry",
    createdIn: "1940",
    createdBy: "William Hanna and Joseph Barbera",
    isAired: true,
    famousCharacters: [
        "Tom-Cat",
        "Jerry-Mouse",
        "Spike",
        "Tyke",
        "Toddles Galore",
        "Quacker",
        "Jeannie",
        "Mammy Two Shoes",
    ],
    books: {
        English: {
            book1: "There's a Mouse Hiding in This Book",
            book2: "This Book Is Not a Piece of Cheese!",
        },
        Hindi: "Available in hindi",
        French: "",
    },

    channel: "cartoon network",
    NoOfEpisode: 2736, // random number
    reviews: {
        tv_review: {
            rating: 8.2,
            NoOfRatings: 564345, // random number
            NoOfFeedback: 0, // random number
        },
        IMDb: {
            rating: 8.4,
            NoOfRatings: 657678, // random number
            NoOfFeedback: 35465, // random number
        },
    },
};

/**
 * a. Old Way:
 * - Ab object ke andar humare paas ek array hai aur ek object bhi hai,
 *   agar hum is data ko access karna chahte hain -
 *   
 * Step-1 : Object ka naam likho : "cartoonDataTwo"
 * Step-2 : Object ke andar property ka naam likho i.e. "famousCharacters"
 *          - console.log(cartoonDataTwo.famousCharacters); 
 *   
 * Jaise humne seekha, API ke saath kaam karte time "cartoonData.famousCharacters"
 * likhna bahut tedious aur irritating ho sakta hai
*/

console.log(cartoonDataTwo.famousCharacters);

/**
 * b. New Way: Destructuring
 * Step-1 : Object ka naam likho : "cartoonDataTwo"
 * Step-2 : Break the object into smaller parts
 *          - const { famousCharacters } = cartoonDataTwo;
 * 
 */
const { famousCharacters } = cartoonDataTwo;
console.log(famousCharacters);



/**
 * 7. Renaming the properties:
 *    a. createdIn        -> createdYear
 *    b. title            -> heading
 *    c. famousCharacters -> characters
*/
const {
    createdIn: createdYear,
    title: heading,
    famousCharacters: characters
} = cartoonDataOne;

/**
 * Now, we can't use original property names:
 * - console.log(createdIn); => Error: createdIn is not defined
 */

/**
 * Use the new names:
 * - console.log(createdYear, heading, characters);
 */
console.log(createdYear, heading, characters);



/**
 * 8. Revisiting Object Destructuring:  Renaming + Default Values
 *    a. Property names ko rename karna
 *    b. Default values ka use karna
 *    c. Existing property ke liye default value set karna
*/

const cartoonDataRevisiting = {
    ...cartoonDataOne,
    endEpisodeDate: "1970-09-01",
};


/**
 * 9. Default Value Even if Property Exists:
 *    - Jab API se data nahi milta to 'undefined' ki jagah default value dikhani hai
 *    - This is useful when we want to display data to the user but the data is not
 *      present in the API.
 */
const {
    createdIn: createdYearRevisiting,
    title: headingRevisiting,
    famousCharacters: charactersRevisiting,
    endEpisodeDate: endYearRevisiting = "1970-09-01"
} = cartoonDataRevisiting;

console.log(endYearRevisiting);     // Will show: 1970-09-01
console.log(charactersRevisiting); // Will show array of characters

/**
 * 10. Existing property ke liye default value set karna:
 *    - Agar property exist karti hai to original value dikhegi, default value ignore hogi
 */
const { famousCharacters: characterRevisiting = [] } = cartoonDataRevisiting;
console.log(characterRevisiting);






/**
 * 11. Mutating Variables:
 *    - When we want to change the value of a variable that is already declared.
 *    - We can do this by using object destructuring.
 */

let titleMutating = "Tom and Jerry - Childhood favourite";

const cartoonDataMutating = {
    ...cartoonDataOne,
    title: "Tom and Jerry",
};

/**
 * Mutating existing variable
 */
({ title: titleMutating } = cartoonDataMutating);
console.log(titleMutating); // Output: Tom and Jerry


/**
 * Example: Mutating variables:
 * - We have a variable title which is already declared.
 * - We want to change the value of this title variable.
 * - We can do this by using object destructuring.
 */
let a = 45;
let b = 32;

const obj = {a: 11, b: 17};


/**
 * Object destructuring ke time variables ko mutate karne ke liye:
 * 1. Variables already declared hain
 * 2. Object ke properties same naam ke hain
 * 3. Destructuring ke liye parentheses ka use karna hoga
 */

/**
 * Wrong Approach:
 * - const {a, b} = obj;  => Error: cannot redeclare block-scoped variable
 * - let {a, b} = obj;    => Error: same reason
 * - {a, b} = obj;        => Error: declaration expected
 */

/**
 * Correct Approach:
 */

({a, b} = obj);
console.log(a, b);  // 11 17


/**
 * Real world example:
 * - title variable ko cartoonData se update karna
 */
({ title: titleMutating } = cartoonDataMutating);
console.log(titleMutating);  // "Tom and Jerry"




/**
 * Original Nested Object:
*/

const cartoonDataNested = {
    title: "Tom and Jerry",
    books: {
        English: {
            book1: "There's a Mouse Hiding in This Book",
            book2: "This Book Is Not a Piece of Cheese!",
        },
        Hindi: "Available in hindi",
        French: "",
    }
};


/**
 * 13. Basic Destructuring: Get books object
 * - We are extracting the whole books object from cartoonData.
*/

const { books } = cartoonDataNested;
console.log(books);

/**
 * Output:
 * - {
 *     English: { book1: "...", book2: "..." },
 *     Hindi: 'Available in hindi',
 *     French: ''
 * }
*/



/**
 * 14. Destructure Individual Book Categories:
 * - We are going on level deeper to directly pull out
 *   English, Hindi, and French sections from books object.
*/

const {
    books: { English, Hindi, French },
} = cartoonDataNested;

console.log(English, Hindi, French);

/**
 * Output:
 * - { book1: "...", book2: "..." }
 * - 'Available in hindi'
 * - ''
*/




/**
 * 15. Destructure Specific Books from English:
 * - We are going two levels deep:
 *   a. "From cartoonData    - to books"
 *   b. "From books.English" - to book1 and book2"
*/

const {
    books: {
        English: { book1, book2 },
        Hindi: hindiBooks,
        French: frenchBooks
    },
} = cartoonDataNested;

console.log(book1, book2, hindiBooks, frenchBooks);

/**
 * Output:
 * - There's a Mouse Hiding in This Book
 * - This Book Is Not a Piece of Cheese!
 * - Available in hindi
 * - (empty string)
*/



/**
 * Summary:
 * 1. Level-1: Extract the whole object
 *    - const { books } = cartoonDataNested;
 * 
 * 2. Level-2: Extract English, Hindi, and French books
 *    - const { books: { 
 *                English, 
 *                Hindi, 
 *                French 
 *              } 
 *      } = cartoonDataNested;
 * 
 * 3. Level-3: Extract specific properties from nested objects
 *    - const { books: { 
 *                English: { book1, book2 },
 *                Hindi: hindiBooks,
 *                French: frenchBooks
 *              } 
 *      } = cartoonDataNested;
*/



/**
 * 16. Object Destructuring with Functions
 * - We can also destructure objects inside functions.
 * - This allows us to pass an object as an argument and destructure it inside the function.
 * 
 * Syntax:
 * - const { property1, property2, ... } = object;
 * 
 * Example:
 * - const { director, producer = "Hanna and Barbera(Default value)", musicBy } = object;
 */

const cartoonDataFunction = {
    id: 1,
    title: "Tom and Jerry",
    createdIn: "1940",
    createdBy: "William Hanna and Joseph Barbera",
    isAired: true,
    famousCharacters: [
        "Tom-Cat",
        "Jerry-Mouse",
        "Spike",
        "Tyke",
        "Toddles Galore",
        "Quacker",
        "Jeannie",
        "Mammy Two Shoes",
    ],
    books: {
        English: {
            book1: "There's a Mouse Hiding in This Book",
            book2: "This Book Is Not a Piece of Cheese!",
        },
        Hindi: "Available in hindi",
        French: "",
    },

    channel: "cartoon network",
    NoOfEpisode: 2736, // random number
    reviews: {
        tv_review: {
            rating: 8.2,
            NoOfRatings: 564345, // random number
            NoOfFeedback: 0, // random number
        },
        IMDb: {
            rating: 8.4,
            NoOfRatings: 657678, // random number
            NoOfFeedback: 35465, // random number
        },
    },

    /**
     * Object destructuring - Individual data we can get
     */
    SeriesData: function ({ director, producer = "Hanna and Barbera(Default value)", musicBy }) {
        console.log(director, musicBy, producer);
        console.log(`Tom and Jerry was directed by ${director}`);
    }
};

/**
 * Function call with object destructuring
 * - We can pass an object as an argument and destructure it inside the function.
 * - We can also provide default values to the properties that are not present in the object.
 */
cartoonDataFunction.SeriesData({
    director: "William Hanna",
    musicBy: "Scott Bradley"
});