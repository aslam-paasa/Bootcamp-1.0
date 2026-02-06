/**
 * lastIndexOf() - Finding last occurrence:
 * - Finding last like on a post
 * - Finding last purchase of a product
 */

/**
 * Ex-1: Social Media Example - Last Like
 * - We have an array of post likes.
 * - We want to find when user123 last liked the post.
 */
const lastLikeByUser = postLikes.lastIndexOf("user123");
console.log("User123 ne last baar like kiya:", lastLikeByUser); // 3

/**
 * Ex-2: E-commerce Example - Last Purchase
 * - We have an array of product purchases.
 * - We want to find when user1 last purchased the product.
 */
const lastPurchaseByUser = productPurchases.lastIndexOf("user1");
console.log("User1 ne last baar product kharida:", lastPurchaseByUser + '\n'); // 3

