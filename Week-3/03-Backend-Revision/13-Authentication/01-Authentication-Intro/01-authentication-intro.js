/**
 * Authentication:
 * In spy movies, we have seen:
 * - secret code
 * - code word
 * - passcode
 * 
 * There are two systems, and both these systems have 0-trust environment
 * means System-A doesn't trust System-B & System-B doesn't trust System-A.
 * Now, to establish trust, passcode is decided before hand like in Harry 
 * Potter movies, we have seen Painting Passcode system. So, if the
 * passcodes are exchanged then they will trust each other.
 * 
 * PassCode: Budhiya k baal kaale hai
 * 
 * And these passcodes should be absurd, so people cannot guess easily.
 * If the passcode is correct then we will exchange confidential info.
 * And this exactly how authentication works.
*/

/**
 * There are two ways in which authentication works:
 * 1. Database-based Authentication(In-Memory DB):
 *    (a) There is a database and generally these are in-memory databases.
 *        So, if someone says "Budhiya k baal kaale hai" then System-B
 *        (server) will verifies and approve the passcode to login.
 *    (b) The system then assigns a random key "ref345i890" to "aslam",
 *        which is stored both in the database and in browser cookies or
 *        session storage.
 *    (c) For user: "aslam" there is a unique id and that is stored in the
 *        database. 
 *    (d) Now everytime System-B receives a request from "aslam",the
 *        system checks if "aslam" has the corresponding "ref345i890" 
 *        cookie, and if the key or cookie (e.g., "ref345i890") matches
 *        what's stored in the database, System-B retrieves the necessary
 *        data and send it to "aslam". 
 * 
 *    a. Aslam gives a password
 *    b. Server checks it against user db
 *    c. Server creates a cookie and gives it to Tanay
 *    d. Server saves the cookie in an in-memory db
 *    e. Aslam requests some confidential information
 *    f. Aslam sends the cookie with it
 *    h. Server checks the cookie against in-memory db
 *    i. Server takes the data from user db(normal db)
 *    j. Server sends data to Aslam.
 * 
 *    In-Memory DB:
 *    => Memory = RAM, Hard Disk = Storage.
 *    => In-memory = Database which operates on RAM (bcoz that is fast)
 *    
 * Q. Why we need two db(in-memory & hard disk)? Why don't we use hard
 *    disk one?
 * => A hard disk is slower and cheaper compared to RAM because it has 
 *    moving parts. RAM (used by in-memory databases) is faster, which is
 *    why we use it for quick access. When a request comes in, the server
 *    needs to quickly check for the session cookie in the RAM (in-memory
 *    database) before retrieving additional data from the hard disk 
 *    (persistent database).
 * 
 * => Each time 'aslam' requests confidential information, we first check
 *    if the cookie exists in the in-memory database (RAM). If it's there,
 *    we then fetch the necessary data from the hard disk (persistent 
 *    database). Using only the hard disk would make this process much 
 *    slower, possibly 2x slower, because the hard disk holds a lot of 
 *    data such as user addresses, order history, etc., whereas the 
 *    in-memory database (RAM) holds only small data like session cookies
 *    for faster access.
 * 
 * Note: Earlier, this is how authentication use to happen.
 * 
 * 2. System-A & System-B, both are trustless system.
 *    a. Aslam sends password and logs in
 *    b. Server checks password and creates a token
 *       - a token is a hash for specific user.
 *    c. We have a magical token which can only be decoded by the server
 *       and no one else.
 *       - Server can put the userID also in the token before locking/
 *         signing/hashing it.
 *    d. Next time when you want confidential information, send this token
 *       with it. Client has to store it for future requests.
 *    e. Since the token is stateless and contains all the necessary
 *       authentication data, the server doesn't need to store the token
 *       in any database(including in-memory).
 * 
 * Q. If the user details are in the token as well, then if someone else
 *    were to use the same token, wouldn't the server give response to 
 *    that user as well?
 * => Server will give it, but it will give answer for that user only.
 * => You have to check "/orders/:userId, whether 
 *    req.params.userId === req.token.decoded.userId
 * 
*/