/**
 * Real World Examples of reduce() Method:
 * 
 * 1. E-commerce Cart Total Calculation
 * 2. Social Media Engagement Analytics
 */


/**
 * Example 1: E-commerce Cart Total
 * - Calculate total price of items in cart
 * - Apply discounts based on quantity
 * - Add shipping cost
 */
const cartItems = [
    { name: "Laptop", price: 50000, quantity: 1 },
    { name: "Mouse", price: 1000, quantity: 2 },
    { name: "Keyboard", price: 2000, quantity: 1 }
];


/**
 * Calculate total with quantity discounts
 * - Apply 10% discount if quantity > 1
 * - Return total
 * - Initial value is 0
 */
const cartTotal = cartItems.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    const discount = item.quantity > 1 ? itemTotal * 0.1 : 0;
    return total + (itemTotal - discount);
}, 0);


/**
 * Add shipping cost
 * - Add 500 shipping cost if total < 10000
 * - Return final total
 */
const finalTotal = cartTotal + (cartTotal > 10000 ? 0 : 500);

console.log("Cart Total:", cartTotal); // 53900
console.log("Final Total with Shipping:", finalTotal); // 53900



/**
 * Example 2: Social Media Analytics
 * - Calculate total engagement across posts
 * - Find average engagement per post
 * - Identify most engaging post
 */
const socialMediaPosts = [
    { id: 1, likes: 100, comments: 20, shares: 5 },
    { id: 2, likes: 200, comments: 30, shares: 10 },
    { id: 3, likes: 150, comments: 25, shares: 8 }
];

/**
 * Calculate total engagement
 * - Return total
 * - Initial value is 0
 */
const totalEngagement = socialMediaPosts.reduce((total, post) => {
    return total + post.likes + (post.comments * 2) + (post.shares * 3);
}, 0);

/**
 * Calculate average engagement per post
 */
const averageEngagement = totalEngagement / socialMediaPosts.length;

/**
 * Find most engaging post
 * - Return most engaging post
 */
const mostEngagingPost = socialMediaPosts.reduce((max, post) => {
    const postEngagement = post.likes + (post.comments * 2) + (post.shares * 3);
    const maxEngagement = max.likes + (max.comments * 2) + (max.shares * 3);
    return postEngagement > maxEngagement ? post : max;
});

console.log("Total Engagement:", totalEngagement); // 790
console.log("Average Engagement per Post:", averageEngagement); // 263.33
console.log("Most Engaging Post:", mostEngagingPost); // { id: 2, likes: 200, comments: 30, shares: 10 }

/**
 * reduce() Method Explanation:
 * - Takes a callback function with 3 parameters:
 *   1. Previous Value (accumulator)
 *   2. Current Value (current element)
 *   3. Current Index
 * - Returns a single value by combining all elements
 * - Can be used with or without initial value
 * - Perfect for calculations like totals, averages, etc.
 */