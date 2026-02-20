/**
 * Context:
 * - Today we want to understand the most basic way to do authentication
 *   in a Node.js app.
*/

/**
 * What is Authentication?
 * - The process of letting users sign-in/sign-out of your website.
 * - Making sure your routes are protected and user can only get back
 *   their own data and not the data from a different user.
*/

/**
 * What we will learn:
 * 1. Auth Basics
 * 2. JWT(JSON Web Tokens)
 * 3. Authorization Header (Custom Header)
 * 4. Creating your own auth middleware
 * 5. localStorage
*/

/**
 * Auth Approaches:
 * 1. Username and Password in DB
 * 2. JWT Approach
 * 3. Cookie
 * 4. OTP on email
 * 5 OAuth(login with google, login with fb)
*/

/**
 * Understand Authentication through an example:
 *            /signup
 * [Browser]------------------->[FB Server]------------------->[Database]
 *           {
 *              username: "harkirat"
 *              password: "123456"
 *           }
 * 
 * - We send a HTTP request from our browser to this server with username and
 *   password and facebook stores this information their database.
 * - Now we will have similar page for /signin. We send a similar HTTP request
 *   with username and password and facebook checks if the user exists in their
 *   database, if yes, then it will generate a token and send it back to us.
 * 
 *            /signin
 * [Browser]------------------->[FB Server]------------------->[Database]
 *           {
 *              username: "harkirat"
 *              password: "123456"  
 * 
 * - This token we need to keep very safe in our browser's local storage.
 * - This token identifies us as a user of facebook in the future. 
 * - And now in every request we send, we need to send this token back to the
 *   server, for example, GET: /posts, we send this token in the header of the
 *   request along with the request. And this is how facebook knows that this
 *   is a valid user and it can return the data accordingly, because this
 *   token is issues to Harkirat when they signin.
 * - So, when we are signin in a website, whenever we send our username and
 *   password, the server returns a token. We store this token in our browser
 *   and in every subsequent request we send this token to the server along
 *   with the request, and that is why we need to keep this token very safe,
 *   because it gives us persistence of our session. Means we login once and
 *   we can use that token to access our account until we logout.
 * Note: Everytime we signin, we get a new token.
*/

/**
 * Auth workflow (Bank Example)
 * When you go to open a bank account in a bank, you
 * 1. Go to the bank and give your information.
 * 2. They give you back a 'check book'
 * 3. Every time you want to send money, you sign it in the cheque
 *    book i.e. JWT Token, and send it over to the bank.
 * 4. That is how the bank identifies you.
 * 
 * Similarly,
 *                     username & password
 * [Signin Page]<------------------------------------->[Backend Server]
 *                            token
 *                        GET /courses
 * [Website]<----------------------------------------->[Backend Server]
 *                        courses = []
 * 
 * 1. The user comes to your website(courses.com)
 * 2. The user sends a request to /signin with the username and password.
 * 3. The user gets back a 'token'
 * 4. In every subsequent request, the user sends the token to identify
 *    itself to the backend.
 * => Think of the token like a 'secret' that the server has given you.
 *    You send the 'token' back to the server in every request so that
 *    the server knows who you are.
 * => [Token is the aadhar card of the user]
*/


