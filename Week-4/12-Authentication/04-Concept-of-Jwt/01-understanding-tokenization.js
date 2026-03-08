/**
 * Understanding Tokenization:
 * 1. User Registration and Verification:
 * - Jb v koi user register krega kisi website pe to pehle verification
 *   hogi ki user valid hai ya nhi. Jo humne mongodb m pehle kr rhe
 *   hai using findOne(). It is a mongoDB method jiske through hm ye
 *   verify krte hai ki current user ne jo credentials bheja hai wo
 *   pehle se database m hai ya nhi.
 *   a. Agar hai: User already registered!
 *   b. Agar nhi: Register user
 * 
 * 2. Password Security:
 * - To register a new user, we have to convert the password into hash 
 *   [secret code] and store it in the database.
 * - Once user gets registered, now we will provide a token.
 * 
 * 3. Tokenization or Token Creation:
 * - After the user is registered, we give them a token.
 * 
 * Q. Why do we give tokens?
 * => Tokens are used for validation:
 *    After registering, the user needs to login, and during login, the
 *    system gives a token to the user.
 * => This token is then used to verify the user whenever they perform
 *    any action on the website, like making a purchase, adding items
 *    to the cart, etc.
 * => Think of it like a Digitial ID Card that proves the xyz user is 
 *    logged in and he can perform actions like buying products, viewing
 *    order history, etc.
*/ 

/** 
 * Q. How the token works on Flipkart:
 * => Now once we logged in and have the token, here's how it plays a role
 *    in various actions you take on Flipkart:
 * 
 * Ex-1: Browsing and Adding a Cart
 * - When you browse Flipkart and add items to your shopping cart, each
 *   time you add an item, Flipkart checks your token to confirm it's
 *   you(the logged-in user) making the changes.
 * - The token is sent in the background with each action(such as adding
 *   an item to the cart). This let's Flipkart verify:
 *   a. "Yes, this is the person who is logged in."
 *   b. The server uses the token to identify your session and knows
 *      what items belong in your cart.
 * 
 * Ex-2: Checkout and Purchasing
 * - When the proceed to checkout to buy items, Flipkart again checks
 *   your token to ensure:
 *   a. It's you who's placing the order, not someone else who might
 *      have gained unauthorized access to your account.
 *   b. The token allows Flipkart to securely tie your order and payment
 *      information to your account.
 * 
 * Ex-3: Payment
 * - After choosing your items, you enter your payment details
 *   (e.g., credit card or UPI).
 * - Flipkart uses the token to ensure that the request is coming from
 *   your account. Without the token to ensure the request is coming
 *   from your account. Without the token, the payment request could be
 *   sent by someone else pretending to be you.
 * 
 * Ex-4: Tracking Orders
 * - Once your payment is successful and the order is placed, you can
 *   track the status of your order.
 * - Flipkart again verifies your token to check that you're the one
 *   who placed the order, so it shows you to correct order status
 *   and shipping details. 
 * */ 