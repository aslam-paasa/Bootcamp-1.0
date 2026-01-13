/**
 * Slice Method: 
 * - Array ka ek portion copy karke new array mein return karta hai
 * - Original array ko modify nahi karta (immutable)
 * - Syntax: array.slice(startIndex, endIndex)
 * 
 * Parameters:
 * a. startIndex: Kahan se copy karna shuru karna hai (inclusive)
 * b. endIndex  : Kahan tak copy karna hai (exclusive)
 * 
 * Note:
 * - It returns a shallow copy of a portion of an array into a new array.
 * - Shallow Copy means:
 *   a. Sirf upar-upar se copy hoti hai (top-level copy). 
 *   b.  Agar array ke andar primitive values (number, string, boolean) hain,
 *      to unki exact copy milti hai.
 *   c. Lekin agar array k andr objects, arrays, ya fns hai to unka reference 
 *      copy hota hai, value nhi.
 *   d. Agar original array mein koi change hota hai:
 *      i. Agar change primitive value par hota hai,
 *         to copied array mein koi farak nahi padega.
 *      ii. Agar change non-primitive value (like object ya array) ke andar hota hai,
 *          to copied array bhi affected hoga, kyunki reference same hai.
 * 
 * Real World Example - E-commerce Product Categories:
 * a. Website pe products ko different categories mein show karna
 * b. Featured products, New arrivals, Best sellers etc.
 */


/**
 * Product Data:
*/
const products = [
    { id: 1, name: "iPhone 13", category: "Electronics", price: 799 },
    { id: 2, name: "Samsung TV", category: "Electronics", price: 599 },
    { id: 3, name: "Nike Shoes", category: "Fashion", price: 99 },
    { id: 4, name: "Levis Jeans", category: "Fashion", price: 49 },
    { id: 5, name: "MacBook Pro", category: "Electronics", price: 1299 }
];


/**
 * Scenario 1: Featured Products (First 2 products)
*/
console.log("\n1. Featured Products:");
const featuredProducts = products.slice(0, 2);
console.log(featuredProducts);


/**
 * Scenario 2: Latest Arrivals (Last 2 products)
*/
console.log("\n2. Latest Arrivals:");
const latestProducts = products.slice(-2);
console.log(latestProducts);


/**
 * Scenario 3: Mid-range Products (Middle 3 products)
*/
console.log("\n3. Mid-range Products:");
const midRangeProducts = products.slice(1, 4);
console.log(midRangeProducts);




/**
 * Original array remains unchanged
*/
console.log("\nOriginal Products Array:");
console.log(products);



/**
 * Subarray using slice:
 * - Subarray is a portion of an array that is copied into a new array.
 * - Hum array ka koi bhi part copy karke new array bana sakte hain
*/

/** 
 * Negative Indexing:
 *  - Negative indexing ka use karke hum array ke end se elements access kar sakte hain
 *   - -1 last element ko represent karta hai
 *   - -2 second last element ko represent karta hai
 *   - Aise hi aage bhi
 * 
 * Real World Example - Social Media Posts:
 * - User ke posts ko different sections mein show karna
 * - Recent posts, Popular posts, Archived posts etc.
 */

/**
 * Social Media Posts Example
*/
const userPosts = [
    { id: 1, content: "First post", likes: 100, date: "2024-01-01" },
    { id: 2, content: "Second post", likes: 200, date: "2024-01-02" },
    { id: 3, content: "Third post", likes: 300, date: "2024-01-03" },
    { id: 4, content: "Fourth post", likes: 400, date: "2024-01-04" },
    { id: 5, content: "Fifth post", likes: 500, date: "2024-01-05" }
];

/**
 * Recent Posts (Last 3 posts using negative indexing)
*/
console.log("\nRecent Posts (Last 3):");
const recentPosts = userPosts.slice(-3);
console.log(recentPosts);

/**
 * Last 2 posts using negative indexing
*/
console.log("\nLast 2 Posts:");
const lastTwoPosts = userPosts.slice(-2);
console.log(lastTwoPosts);

/**
 * Last post using negative indexing
*/
console.log("\nLast Post:");
const lastPost = userPosts.slice(-1);
console.log(lastPost);

/**
 * Middle posts (from -4 to -2)
*/
console.log("\nMiddle Posts:");
const middlePosts = userPosts.slice(-4, -1);
console.log(middlePosts);

/**
 * Original array remains unchanged
*/
console.log("\nOriginal Posts Array:");
console.log(userPosts);

/**
 * Negative-Positive index mapping:
 *       -5  -4  -3  -2  -1
 * arr = [10, 20, 30, 40, 50]
 *       0    1   2   3   4  
 */