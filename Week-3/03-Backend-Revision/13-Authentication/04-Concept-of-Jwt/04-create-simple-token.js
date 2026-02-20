/**
 * Create a simple token:
 * Q. Create a simple JWT token without an expiration time.
 * 1. jsonwebtoken library is used to create a JWT token.
 * 2. The jwt.sign method takes two main arguments:
 *    a. the payload(in this case, { foo: 'bar' })
 *    b. the secret key used for signing.
 * 3. This produces a signed token that contains the payload data. The
 *    resulting token can be shared with clients or stored for later use.
 * 4. Keep in mind that this token does not have an expiration time, so
 *    it will remain valid until it's manually invalidated or revoked.
 * Note: npm i jsonwebtoken
*/

const jwt = require('jsonwebtoken');
const secret = "your-secret-goes-here"; // Replace with your secret key

/**
 * Generating a token using jwt.sign():
 * a. req.body: Jo token generate krwana hai to req.body se aaega i.e.
 *    {
 *       "username": "mahadev",
 *       "email": "mahadev@gmail.com",
 *       "password": "mahadev"
 *    }
 *    Aur iss poore data k compilation k liye humein ek token chaiye.
 * b. secret key: Secret Key should be inside quotes.
*/
const token = jwt.sign({ foo: 'bar' }, secret); // foo: 'bar' is payload
console.log({ token }); 
