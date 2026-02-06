/**
 * indexOf() - Finding first occurrence:
 * - Finding first like on a post
 * - Finding first purchase of a product
 */

/**
 * Ex-1: Social Media Example - Post Likes
 * - We have an array of post likes.
 * - We want to find when user123 first liked the post.
 */
const postLikes = ["user123", "user456", "user789", "user123", "user456"];
const firstLikeByUser = postLikes.indexOf("user123");
console.log("User123 ne pehli baar like kiya:", firstLikeByUser); // 0

/**
 * Ex-2: E-commerce Example - Product Purchase History
 * - We have an array of product purchases.
 * - We want to find when user1 first purchased the product.
 */
const productPurchases = ["user1", "user2", "user3", "user1", "user4"];
const firstPurchaseByUser = productPurchases.indexOf("user1");
console.log("User1 ne pehli baar product kharida:", firstPurchaseByUser + '\n'); // 0
