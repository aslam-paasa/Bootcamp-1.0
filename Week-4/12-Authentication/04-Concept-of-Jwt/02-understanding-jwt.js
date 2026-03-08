/**
 * Understanding JWT:
 * - A JWT is a secure, compact token used to verify the identity of
 *   users and to transfer information between a client(like a browser)
 *   and a server. It's often used for authentication(like when you
 *   log in to a website).
 * - A JWT consists of three parts:
 *   1. Header
 *   2. Payload
 *   3. Signature
 * - These three parts are separated by dots(.). For example,
 *   => header.payload.signature 
*/

/**
 * Header:
 * - The header tells us how the token is signed.
 * - It contains two pieces of information:
 *   a. Type of the token: It's always JWT is this case.
 *   b. Signing Algorithm: The algorithm used to "sign" the token and
 *      keep it secure. (e.g. HMAC SHA256 or RS256).
 * - Example:
 *   {
 *      "alg": "HS256",
 *      "typ": "JWT"
 *   }
 * 
 * Explanation:
 * - "alg": "HS256" means the algorithm used to sign the token is
 *   HMAC SHA256(a secure way to sign the token).
 * - "typ": "JWT" means is a JSON Web Token.
 * 
 * So, the header simply tells us how the token is created and how to
 * verify its authenticity.
*/

/**
 * Payload:
 * - The Payload contains the actual data or claims you want to send,
 *   like the user's identity, permissions, or any information you
 *   want to include.
 * - The Payload often includes things like:
 *   - User ID(sub): A unique identifier for the user.
 *   - Email: The user's email address.
 *   - Expiration Time(exp): How long the token is valid for.
 * - The Payload is not encrypted, so anyone with the token can read it,
 *   but they cannot change it unless they also have the secret key(which
 *   is where the Signature comes in).
 * - Example:
 *   {
 *      "sub": "1234567890",
 *      "email": "user@example.com",
 *      "exp": 1624238477
 *   }
 * 
 * Explanation:
 * - "sub": "1234567890" is the user ID (the user's unique identifier).
 * - "email": "user@example.com" is the user’s email address.
 * - "exp": 1624238477 is the expiration time in Unix timestamp (the 
 *   token will expire at this time).
 * 
 * So, the Payload carries the data that needs to be shared between the
 * Client and Server.
*/

/**
 * Signature:
 * - The Signature is used to verify that the token hasn't been altered
 *   in transit and that it was created by a trusted source.
 * - To create the Signature, we take:
 *   1. The 'encoded Header' and 'encoded Payload'(these are Base64-encoded
 *      strings).
 *   2. We then combine them and apply a 'secret key' (which only the
 *      server knows) and the algorithm in the Header.
 * - The result is the 'Signature', which is a secure code that ensures
 *   the token is authentic and hasn't been tampered with.
 * - Example:
 *   HMACSHA256(
 *     base64UrlEncode(header) + "." +
 *     base64UrlEncode(payload),
 *     your-256-bit-secret
 *   )
 * 
 * Explanation:
 * - The 'Signature' makes sure that no one can change the 'Header' or
 *   'Payload' of the JWT without knowing the 'secret key'. If even a
 *   tiny part of the token is changed, the 'Signature' will not match,
 *   and the server will reject it.
*/

/**
 * Putting all together:
 * eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiSlNUIn0.eyJzdWIiOiAiMTIzNDU2Nzg5MCIsImVtYWlsIjogImZpcGthcnQxMjM0QGdtYWlsLmNvbSIsImV4cCI6IDE1MTYyMzk5Mjd9.MpLk1rYkPaHxq9DZp3WmfZj2TqpuPYUJtFZCjZT8Ftg
 * <-------------------------------------> <----------------------------------------------------------------------------------------------> <----------------------------------------->
 *             Header                                                                  Payload                                                              Signature
*/

/**
 * Q. Why JWT is important?
 * => Authentication: JWT helps websites verify that the person performing
 *    an action(like purchasing something on Flipkart) is who they say
 *    they are.
 * => Stateless: Once the server creates the JWT, it doesn't need to
 *    store any session data, making the system more efficient.
 * => Security: The security ensures that the token hasn't been 
 *    tampered with, so only trusted tokens are used.
 * => Ease of Use: With JWT, the user doesn't need to keep logging in
 *    every time they want to interact with Flipkart. The token acts
 *    like a digital ID Card that proves they're authenticated.
*/