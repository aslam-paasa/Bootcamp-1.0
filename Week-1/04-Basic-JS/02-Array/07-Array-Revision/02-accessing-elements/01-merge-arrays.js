/**
 * Concat Method:
 * - Do ya do se zyada arrays ko ek saath merge karke new array banata hai
 * - Original arrays ko modify nahi karta
 * - Syntax: array1.concat(array2, array3, ...)
 * 
 * Real World Example - Social Media Feed:
 * - User ke different social media platforms se posts ko combine karna
 * - Trending posts aur user ke personal feed ko merge karna
 */

/**
 * Social Media Feed Example
*/
const personalFeed = [
    { id: 1, platform: "Facebook", content: "Family vacation photos", likes: 150 },
    { id: 2, platform: "Instagram", content: "Food blog post", likes: 200 }
];

const trendingPosts = [
    { id: 3, platform: "Twitter", content: "Breaking news", likes: 1000 },
    { id: 4, platform: "LinkedIn", content: "Tech article", likes: 500 }
];

/**
 * Combine personal feed with trending posts
*/
const completeFeed = personalFeed.concat(trendingPosts);
console.log("Complete Social Media Feed:");
console.log(completeFeed);

/**
 * Multiple feeds ko bhi combine kar sakte hain
*/
const suggestedPosts = [
    { id: 5, platform: "Instagram", content: "Travel recommendations", likes: 300 }
];

const finalFeed = personalFeed.concat(trendingPosts, suggestedPosts);
console.log("\nFinal Feed with Suggestions:");
console.log(finalFeed);

/**
 * Original arrays unchanged rahenge
*/
console.log("\nOriginal Arrays:");
console.log("Personal Feed:", personalFeed);
console.log("Trending Posts:", trendingPosts);
console.log("Suggested Posts:", suggestedPosts);