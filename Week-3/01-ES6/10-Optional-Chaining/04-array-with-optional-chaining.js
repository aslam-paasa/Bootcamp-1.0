/**
 * Why do we use Optional Chaining with Arrays?
 * - In JavaScript, arrays are just objects with numbered indexes.
 *   You often deal with arrays of objects, like this:
*/

const users = [
    { name: "Arjun" },
    { name: "Mira" }
];


/**
 * But sometime:
 * a. The array might be missing (undefined or null).
 * b. The arrat might be empty ([]).
 * c. An element like users[0] may exist, but its properties may not.
*/

/**
 * Issue:
 * - If you try something like this: - users[0].name
 *   and users is undefined or user[0] is undefined, your code
 *   crashed with an error like:
 * - TypeError: Cannot read properties of undefined (reading 'name')
*/


/**
 * When to use Optional Chaining with Arrays?
 * - Use ?. when you're not sure whether the array or element you're
 *   trying to access exists or not.
 * - users?.[0]?.name
 * 
 * a. This will return "Arjun" if everything is fine.
 * b. This will return undefined (safely) if users is undefined, or
 *    empty, or [0] is missing.
*/


/**
 * When not to use Optional Chaining with Arrays?
 * a. When you are 100% sure the array and its items exist - don't overuse it.
 * b. When you're writing values (assigning value) - optional chaining is for
 *    reading only.
 * 
 * => users?.[0]?.name = "New Name"; // ❌ Not allowed!
*/




/**
 * Assignment: Ecommerce Access Reviewer Name Safely
 * You're building a product review system for an e-commerce app. Every
 * product may have:
 * a. Zero or more reviews.
 * b. A reviewer object inside the review.
 * c. A name inside the reviewer object.
 * 
 * Your goal is to print the first reviewer's name using optional chaining,
 * without causing any error if some data is missing.
*/

/**
 * Product Object Data:
*/

const product1 = {
    name: 'T-Shirt',
    reviews: [
        {
            rating: 4,
            reviewer: {
                name: 'Aman'
            }
        }
    ]
};

const product2 = {
    name: 'Sneakers',
    reviews: [] // No reviews
};

const product3 = {
    name: 'Backpack',
    reviews: [
        {
            rating: 5
            // reviewer key missing
        }
    ]
};


/**
 * Expected Output:
 * Product: T-Shirt
 * Top Reviewer: Aman
 * 
 * Product: Sneakers
 * Top Reviewer: Not Available
 * 
 * Product: Backpack
 * Top Reviewer: Not Available
*/


/**
 * Solution:
 * a. reviews?.[0] : Check if reviews array exist AND has a first element.
 * b. ?.reviewer?.name : Check if the reviewer and their name exist.
 * c. || 'Not Available' : Show fallback value if anything is missing.
*/

function showTopReviewer(product) {
    // Optional chaining used to safely access deeply nested value
    const reviewerName = product.reviews?.[0]?.reviewer?.name || 'Not Available';

    console.log(`Product: ${product.name}`);
    console.log(`Top Reviewer: ${reviewerName}`);
    console.log('-----------------');
}

showTopReviewer(product1);
showTopReviewer(product2);
showTopReviewer(product3);
