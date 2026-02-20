/**
 * Cookies:
 * > Cookies are a way to store data on the client side, similar to local 
 *   storage, session storage, and Indexed DB, but they have some key 
 *   differences:
 *   - Storage Limit: Not more than 4KB
 *   - Creation     : Can be created by both Client and Server 
 *                    (server instructs the client to create cookies)
 *   - Format       : Key-Value Pair (Both are stored as strings)
 * 
 * > Cookies are sent with every HTTP request to the domain that set them, 
 *   which can impact performance and increase request sizes.
*/

/**
 * Cookie Attributes:
 * 1. HttpOnly (Server Side): 
 *    - Cannot be accessed by Client-Side JavaScript.
 *    - This helps prevent XSS attacks. 
 *    - To send them with requests, use credentials:
 *      'include' in fetch or 
 *       withCredentials: true in axios.
 * 
 * 2. SameSite:
 *    - Restricts how cookies are sent with cross-site requests to help
 *      prevent CSRF attacks.
 *      a. SameSite=Strict : 
 *         - The cookie is only sent in requests originating from the\
 *           same site (main domain and subdomains).
 *      b. SameSite=Lax : 
 *         - The cookie is sent in same-site requests (main domain & subdomains)
 *           and some cross-site requests (like links or top-level navigation).
 *      c. SameSite=None : 
 *         - The cookie is sent in all requests (client and server can have 
 *           different main domains) but must also have the Secure flag set.
 * 
 * 3. Secure: Ensures the cookie is only sent over HTTPS.
 * 
 * 4. Max-Age: Defines the duration (in seconds) until the cookie expires.
 * 
 * 5. Expires: Defines a specific expiration date and time for the cookie.
 * 
 * 6. Path: 
 *    - Specifies the request path for which the cookie is valid. 
 *    - A cookie with Path=/app is sent with requests to /app/* but 
 *      not /dashboard .
 * 
 * 7. Domain: 
 *    - Specifies the domain for which the cookie is valid. 
 *    - To make it available for all subdomains, use Domain=.codersgyan.com.
*/


/**
 * Why we need cookies?
 * 1. Authentication: 
 *    - Cookies are widely used to store session tokens, allowing users to 
 *      stay logged in.
 * 
 * 2. User Preferences:
 *    - They can store user settings and preferences, such as language 
 *      choices or theme settings.
 * 
 * 3. Tracking: 
 *    - Third-party cookies are often used for tracking users across different
 *      websites to improve ad targeting and user experience.
*/


/**
 * Etag:
 * > ETag is a Server-Side Header.
 * > It identifies whether the version of a resource cached in the browser
 *   matches the resource on the web server.
 * 
 * How Etag works?
 * 1. When a client visits a web page, the server sends an ETag value.
 * 2. Weak ETags: Indicate that a cached resource is semantically equivalent
 *    to the server version but may not be byte-for-byte identical.
 * 3. Strong ETags: Ensure the resource in the browser cache and on the web
 *    server are byte-for-byte identical.
 * 4. When the client makes a request, it may send an If-None-Match header 
 *    with the previously received ETag value.
 * 5. If this value matches the server’s ETag, the server responds with a 
 *    304 Not Modified status, meaning the client can use the cached resource.
 * 
 * Why we need Etag?
 * > Caching and Performance Optimization: 
 *   Reduces bandwidth usage and improves resource management efficiency.
*/


/**
 * TLS:
 * > TLS (Transport Layer Security) and SSL (Secure Sockets Layer) are
 *   cryptographic protocols used to secure communication over a network, 
 *   most commonly the internet.
 * > They ensure encryption of data exchanged between a client and a server.
 * > HTTPS uses TLS for encryption, not SSL.
 * > SSL was the original protocol for secure communication but is now 
 *   outdated and insecure.
 * > TLS was developed as the successor to SSL and is now the standard 
 *   protocol used to secure HTTPS connections.
 * > Although HTTPS uses TLS, it is still sometimes referred to as SSL in 
 *   everyday conversations.
 * > HTTP/1.0 & 1.1: Technically support TLS 1.0-1.3, but should use 1.2 or
 *   1.3 due to security risks with older versions. 1.0 and 1.1 are deprecated.
 * > HTTP/2: Requires TLS 1.2 or 1.3.
 * > HTTP/3: Uses only TLS 1.3.
*/