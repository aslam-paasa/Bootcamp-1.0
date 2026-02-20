/**
 * Authorization Header:
 * Authorization Header is a crucial component of HTTP request that
 * plays a key role in authenticating and authorizing users or clients
 * to access certain resources on a server.
 * 
 * The Authorization header is used to transmit credentials(such as
 * tokens or API keys) from the client to the server. These credentials
 * are then verified by the server to determine whether the client has
 * the necessary permission to access ther requested resource.
 * 
 * The Authorization header typically follows this basic structure:
 * 
 *    Authorization: <type> <credentials>
 * 
 *    1. Type: 
 *       Specifies the type of credentials being sent. Common types 
 *       include "Bearer" for token-based authentication and "Basic" for
 *       basic authentication.
 * 
 *    2. Credentials:
 *       The actual credentials, which could be a token, username and
 *       password combination, or other relevant information, depending
 *       on the chosen authentication type.
 * 
 * Bearer Token Authentication Type:
 * 1. Example:
 *    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * 2. Used in token-based authentication(e.g., JSON Web Tokens or OAuth)
 *    where a token represents the user's identity and permissions.
 * */ 

/**
 * Q. How does it works:
 * 1. Client Request:
 *    The client includes the Authorization header in an HTTP request
 *    when accessing a secured resource.
 * 
 * 2. Server Verification:
 *    The server receives the request and extracts the credentials from
 *    the Authorization header. 
 * 
 * 3. Credential Verification:
 *    The server verifies the credentials, usually by checking against
 *    a user database, validating a token, or using other authentication
 *    mechanisms.
 * 
 * 4. Access Decision:
 *    Based on the verification result, the server decides whether to
 *    grant or deny access to the requested resource.
*/

/**
 * Example: Node.js using Axios:
*/
const axios = require('axios');

const url = '<https://api.example.com/resource>';
const token = 'your-access-token';

axios.get(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));

/**
 * In this example, the Bearer token is included in the Authorization
 * header of an Axios HTTP GET request.
*/




/**
 * Cookies vs Local Storage for Storing JWT Tokens:
 * When it comes to storing JWT(JSON Web Tokens), both cookies and
 * local storage are commonly used, but they have distinct charactertics
 * are use cases. Here's a comparison to help you choose the appropriate
 * option for your specific scenario:
 * 
 * 1. Cookies:
 *    a. Security:
 *       Cookies can be more secure than local storage because they have
 *       an additional security feature called HTTP-only. When a cookie
 *       is marked as HTTP-only, it cannot be accessed by JS, reducing
 *       the risk of cross-site scripting(XSS) attacks.
 * 
 *    b. Automatic Handling:
 *       Cookies are automatically sent with every HTTP request to the
 *       domain, including requests for images, stylesheets, and scripts.
 *       This automatic handling can be advantageous for authenticating
 *       API requests made by the browser.
 * 
 *    c. Expiration:
 *       Cookies can have an expiration date, allowing the server to set
 *       a specific duration for which the token is valid. After expiration,
 *       the browser automatically removes the cookie.
 * 
 *    d. Domain Restriction:
 *       Cookies can be set to be domain-restricted, meaning they are
 *       only sent to the server from the same domain that set the cookie.
 *       This provdes a level of security.
 * 
 * 2. Local Storage:
 *    a. Ease of Use:
 *       Local Storage is easier to use from a JS perspective. You can
 *       set, get and remove items directly using JS without additional
 *       HTTP requests.
 * 
 *    b. Capacity:
 *       Local Storage generally has a larger storage capacity compared
 *       to cookies.
 * 
 *    c. No Automatic Handling:
 *       Unlike cookies, local storage data is not automatically sent
 *       with every HTTP request. This means you need to manually attach
 *       the token to the headers of your API requests if you're using
 *       it for authentication.
 * 
 *    d. No Expiration Handling:
 *       Local Storage does not provide built-in expiration handling.
 *       If you want to implement token expiration, you need to manage
 *       it manually in your code. 
*/

/**
 * Choosing between Cookies and Local Storage:
 * 1. For Authentication:
 *    Use cookies with HTTP-only flag for enhanced security, especially
 *    if you need to make authenticated API requests directly from the
 *    browser.
 * 
 * 2. For Client-Side Interactions:
 *    Use local storage if you primarily need to access the token on the
 *    client side and manage API requests manually.
 * 
 * 3. Considerations:
 *    Consider factors like security, automatic handling, and token
 *    expiration requirements when making your decision.
 * 
 * In many cases, a combination of both cookies and local storage might
 * be used. Cookies can be employed for secure, HTTP-only storage, while
 * local storage can be used for easy client-side access.
*/