/**
 * Project: Authenticated Website
 * 1. Let people sign up to your website
 * 2. Only allow signed-in users to see people
 *    (Create a dummy people list)
 * 3. Restriction + Fetch API
 * 
 * => Almost all websites have authentication
 * => There are complicated (Login with google...) ways to do authorization.
 * => Easiest is a username & password based authentication.
 * 
 * Before that, let's understand some cryptography jargon :
 * 1. Hashing
 * 2. Encryption
 * 3. Json Web tokens
 * 4. Local Storage
*/


/**
 * Authentication:
 * In a programming context, authentication refers to the process of
 * validating the identity of a user, system, or application attempting
 * to access a computer system, network, or online service. The primary
 * gloal is to ensure that the entity requesting access is indeed who
 * it claims to be. Authentication is a crucial aspect of software
 * development, especially in scenarios where user access to sensitive
 * data or functionalities needs to be controlled. Here's how 
 * authentication is typically implemented in programming:
*/

/**
 * 1. Hashing :
 * => Let's say we go to facebook.com, we put our username and password to the
 *    input field and hits the backend which stores these passwords somewhere
 *    centralised place inside the database where all the usernames and passwords
 *    are dumped. If our password is "ILoveKiara", do you think this password
 *    gets stored as in plain text here in facebook database? Or is it get
 *    converted into different form before its gets stored? If does get converted
 *    into some gibrish before it gets stored.
 *
 * Q. Why do we hash passwords before we store them into the database?
 * => "ILoveKiara" ====> "129R2RAM"
 * => There are multiple reasons and one of the biggest reason is, if there is
 *    a database out there and I store this password as common repeated password.
 * => So, it is standard practice that for any backend developer who puts the 
 *    password into the database, they hash it/converted into some wierd format
 *    but there are some constraints in that format like anytime we store the
 *    password "ILoveKiara", and it gives the same output "129R2RAM".
 * => Another reason is, if this database is ever breached by hackers then 
 *    they will see "harkirat" is a user here, but they won't be able to read
 *    our password because it is hashed.
 *
 * Q. What is hashing?
 * => Hashing is a one-way process that converts a password or any data
 *    into a fixed-size string of characters, which is typically a
 *    hash value. The primary purpose of hashing passwords before storing
 *    them in a database is to enhance security.
 * 
 * => In simple term we can say, Converting a simple string into some 
 *    complicated gibrish is called hashing.
 * => We can never guess the password just by simply looking at the hash. And
 *    even facebooks developer can never decrypt this to password.
 *
 *
 * => If the facebook has username "harkirat@gmail.com" and password is some
 *    random gibrish so, whenever we send some login request, how does the
 *    backend server validates the password is same as gibrish. Actually, the
 *    backend server reconverts that into the gibrish and then compare this
 *    gibrish with whatever is present in the database i.e. gibrish. And this
 *    is how we do real authentication.
 *
 * Property of hashing :
 * => hashing => one way
 * => We can only convert a string to hash. 
 * => We can never convert the hash back to a string.
*/

/**
 * How Hashing Works?
 * 1. When a user signs up and provides a password, the application 
 *    hashes the password using cryptographic hash function 
 *    (e.g., bcrypt, SHA-256)
 * 2. The resulting hash is a fixed-length string unique to the input,
 *    making it difficult to reverse engineer the original password.
*/

/**
 * Q. Why Hash Passwords?
 * 1. Security:
 *    Hashing prevents storing plaintext passwords in the database, 
 *    reducing the risk of data breaches. Even if the database is 
 *    compromised, attackers only obtain hashed values, which are
 *    challenging to convert back to the original passwords.
*/

/**
 * Example in Node.js using bcrypt:
*/
const bcrypt = require('bcrypt');

// Hashing a password
const plainPassword = 'user123';
bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);

  // Verify a password
  bcrypt.compare('user123', hash, (err, result) => {
    if (err) throw err;
    console.log('Password Match:', result);
  });
});


/**
 * 2. Encryption :
 * a. Purpose:
 *    Everything is same as hashing but it is "two way" process that
 *    involves converting data into a format that can be easily reversed
 *    using a decryption key.  
 * => Basically, String gets converted to some gibrish but we can also 
 *    convert this gibrish back to original string, provided we have a
 *    "key". It's like logged something. Someone gave us a string, we 
 *    logged it to the key.
 * => Encryption is used to protect the confidentiality of data.
 *
 * Note : 
 * => Hashing doesn't require a password but encryption does.
 * => Whoever has this password, if they see the encrypted string, they can decrypt it.
*/

/**
 * Q. How Encryption Works?
 * 1. User's sensitive information(e.g., credit card details) may be
 *    encrypted before storing it in a database.
 * 2. To view or use the original data, a decryption key is required.
*/

/**
 * Q. Why use Encryption:
 * 1. Confidentiality: 
 *    Encrypting sensitive data adds an extra layer of security. Even
 *    if authorized access occurs, the data remains unreadable without 
 *    the decryption key.
*/

/**
 * Example in Node.js using crypto:
*/

const crypto = require('crypto');

// Encryption
const dataToEncrypt = 'Sensitive information';
const encryptionKey = 'secretKey';
const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
let encryptedData = cipher.update(dataToEncrypt, 'utf-8', 'hex');
encryptedData += cipher.final('hex');
console.log('Encrypted Data:', encryptedData);

// Decryption
const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
decryptedData += decipher.final('utf-8');
console.log('Decrypted Data:', decryptedData);


/**
 *  3. Json Web Tokens (JWT):
 * 
 *    A JSON Web Token (JWT), is like a digital passport for information.
 *    It's a special kind of code that carries details about a user or
 *    some data. Imagine you have a passport when you travel to different
 *    countries - the passport holds your information and proves who you
 *    are. Similarly, a JWT carries information and proves certain things
 *    about you or the data it holds.
 * 
 *     a. Json : It will take some Json as input like "name: harkirat" and it will
 *        give us very long string which has some formats (actually it is in 3 
 *        parts)
 *     b. Web : We use this in the web
 *     c. Token : It take the long string and uses as token. So, basically
 *        whoever has this "output long string" can actually see the input.
 *        Its is not hashed or protected in any way, it is just converting a
 *        complex object into a long string.
 *
*/

/**
 * How do JWTs look?
 * A JWT is made up of three parts, and they are separated by dots:
 * 
 * 1. Header: This part says how the JWT is encoded(like secret coding
 *    instructions).
 * 
 * 2. Payload: This part holds the actual information or claims. For
 *    example, it might say who you are and when the JWT was created.
 * 
 * 3. Signature: This part ensures that the JWT hasn'y been tampered
 *    with. It's like a seal that shows the informaition is genuine.
 * 
 * When you put these parts together, you get a long string that looks
 * like a secret code. 
 * 
 *                        harkirat@gmail.com
 *                          1234561
 *                                   ^
 *                  +-----|----------|-----+
 *    password ---> |     |          |     |
 *                  +-----|----------|-----+
 *                        V
 * 
 * Note:
 * 1. It's neither of encryption or hashing (it's technically a digit signature).
 * 2. Anyone can see the original output given the signature.
 * 3. Signature can be verified only using the password.
*/


/**
 * How do JWTs work?
 * 1. Getting the JWT:
 *    Imagine you log in to a website. After you enter your username
 *    and password, the website creates a JWT just for you.
 * 
 * 2. Using the JWT:
 *    Now, instead of asking your for your username and password every
 *    time you click on something, the website sends your JWT with
 *    each request. It's like having a special pass - once you show
 *    it, the website knows it's you.
 * 
 * 3. Checking the JWT:
 *    The website has a special key to check if the JWT is real. If
 *    everything is okay, the website knows the information in the JWT
 *    is trustworthy.
*/


/**
 * 4. Local Storage :
 * => Local Storage is a client-side web storage mechanism that allows
 *    websites to store key-value pairs persistently on a user's device.
 * => In the realm of authentication, local storage often plays crucial
 *    role in maintaining user session and preserving authentication 
 *    tokens.
 * 
 * => Baiscally, it's a place inside browser where you can store some data.
 * => Using things that are stored include -
 *    (1) Authentication tokens
 *    (2) User language preference
 *    (3) User theme preference
 *
 * => When we go to facebook.com and sign-in, we get back a JSON Web Token, same
 *    as OpenAI.com. When we go to chat.OpenAI and sign-in with my username &
 *    password, is when the backend return me a token.
 *
 *  Q) That token string, how does it relaid back in every request?
 *  Q) Where is this token stored?
 *  => It can store in many places and one of the place is "local storage".
 *  => So, anytime we signin, they give me back a token and we store it in 
 *     local storage.
 *
 *  Q) What is the point of this local storage?
 *  => This is our browser's local storage, even if we close the tab and come
 *     back or restart the machine, this token will remain in the local storage.
 *  => And the frontend can relay back to this token in every request. And 
 *     when we logout, they just remove the token from this local storage.
 *  => That's high level one way of doing authentication. Other ways are :
 *     cookies, session storage etc.
 *
 *    +---------+   username              +---------+
 *    | Sign up |------------------------>| Backend |
 *    | Page    |<------------------------|         |
 *    +---------+                         +---------+
 *  => They send a request with their username, password to our backend. Our backend
 *     first converts this password into hash, then checks from the database
 *     "are these credentials correct?" If they are, backend creates a JWT and
 *     returns back.
 *
 * =>  When the client gets this JWT, it stores it in the browser memory 
 *    (localStorage.set("token", jwt)) and this gets stored in the browser
 *    almost forever, until the user logs out or clears out.
 *
*/

/**
 * Technical Implementation:
 * 1. Token Storage:
 *    a. After a successful authentication, the server generates an
 *       authentication token (e.g., JWT) for the user.
 *    b. This token is securely stored int the Local Storage for the
 *       user's browser.
 * 
 * 2. Session Persistence:
 *    Local Storage provides a means to persistently store this token
 *    across browser sessions. This persistence ensures that the user
 *    remains authenticated even if they closes the browser and return
 *    later.
 * 
 * 3. Reducing Authentication Overhead:
 *    Instead of requiring users to authenticate themselves on every
 *    interaction, the stored token allows the server to recognize and
 *    validate the user swiftly, enhancing the user experience.
*/

/**
 * Benefits of Local Storage in Authentication:
 * 1. Efficient Session Management:
 *    Local Storage facilitates efficient session management by enabling
 *    the storage of authentication tokens client-side. This reduces
 *    the need for frequent server-side authentication checks.
 * 
 * 2. Improved Performance:
 *    Since authentication tokens are readily available locally, the
 *    authentication process becomes faster, contributing to an improved
 *    overall performance of the application.
 * 
 * 3. Enhanced User Experience:
 *    Users experience the convenience of being automatically recognized
 *    and autenticated without the hassle of repeated logins, contributing
 *    to a seamless and user-friendly interface.
*/

/**
 * Local Storage serves as a valuable tool in the authentication landscape,
 * contributing to efficient session management and enchanced user
 * experiences. However, its use should be tampered with a keen awareness
 * of security considerations, adherence to best practices, and a strategic
 * approach to token management.
*/