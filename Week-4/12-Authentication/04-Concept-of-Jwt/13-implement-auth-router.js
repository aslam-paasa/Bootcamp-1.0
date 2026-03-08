/**
 * Understanding Flow:
 * Sign Up:
 * 1. user1 sign up, has a password
 * 2. password is saved in db using bcrypt
 * 
 * Login:
 * 3. user1 goes to /login, provides username and password(is hashed? No)
 * 4. Server on /login, checks the user if it exists.
 * 5. If user exists, it checks the password against hashed password.
 * 6. If the password is correct, then a token is created jwt.sign()
 * 7. This token is returned to the user. User saves the token.
 * 
 * Access Private Route Part-1: The Middleware Sage
 * 8. User goes to /order and sends token in the header.
 * 9. /order has a middleware 'authVerify'.
 * 10. authVerify checks if the token is valid.
 * 11. authVerify then decodes the userID from the token.
 * 12. authVerify then puts the userID in the req.user
 * 13. authVerify calls next()
 * 
 * Access Private Route Part-2: The Endpoint
 * 14. Goes to /order handler
 * 15. Here req.user.userID === req.params.userID
 * 16. Call to database to find user.findByID(req.user.userID)
 * 17. Get the data and send it to client
*/

/**
 * 
*/