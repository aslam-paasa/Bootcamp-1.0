/**
 * User Authentication: Implement JWT Verification
 * 1. Create a function called verifyToken that takes a JWT token
 *    and verifies it using the jwt.verify method.
 * 2. If the token is valid, the function should return the decoded
 *    payload(user ID).
 * 3. If the token is invalid, the function should throw an error.
 * Note: Earlier we have written token verification code. Now we will
 *       create an route and inside this route we will keep our
 *       verification token. And this route is known as login route.
*/

const jwt = require('jsonwebtoken');
const secret = 'ksdnfaisodjfaiofj';

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
}