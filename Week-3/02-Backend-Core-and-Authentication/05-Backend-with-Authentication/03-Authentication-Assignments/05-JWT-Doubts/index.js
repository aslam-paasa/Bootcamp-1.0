/**
 * JWT (JSON Web Token) ki Important Properties:
 * 
 * 1. JWT ka Basic Structure:
 *    - Header: Token ka type aur signing algorithm
 *    - Payload: Actual data jo store karna hai
 *    - Signature: Digital signature for verification
 * 
 * 2. JWT ki Analogy - Sealed Letter:
 *    - Public Nature:
 *      > Koi bhi letter ko padh sakta hai (decode kar sakta hai)
 *      > Base64 encoding use hoti hai, encryption nahi
 *      > Content publicly readable hai
 * 
 *    - Security Concerns:
 *      > Sensitive data store nahi karni chahiye:
 *        - Passwords
 *        - Credit card details
 *        - Personal information
 *      > Sirf non-sensitive data store karein:
 *        - User ID
 *        - Username
 *        - Basic preferences
 * 
 *    - Authentication Process:
 *      > Original server verification kaise karta hai:
 *        - Server ke paas secret key hoti hai
 *        - JWT.verify() function use karke signature check karta hai
 *        - Agar signature match nahi karta, toh token invalid hai
 *      > Decode karne wale kyu use nahi kar sakte:
 *        - Signature create karne ke liye secret key chahiye
 *        - Secret key sirf server ke paas hai
 *        - Bina secret key ke naya valid token nahi bana sakte
 *      > Digital signature se tampering detect hoti hai
 * 
 * 3. Real World Example - Movie Theater:
 *    - Ticket System:
 *      > Koi bhi ticket ko dekh/padh sakta hai
 *      > Basic details hoti hain:
 *        - Show time
 *        - Seat number
 *        - Movie name
 *      > Verification sirf theater kar sakta hai
 *        - Special watermark/barcode se
 *        - Unique verification system se
 * 
 * 4. Best Practices:
 *    - Minimal data store karein
 *    - Regular token rotation
 *    - Short expiration time
 *    - Secure secret key management
*/

/**
 * Comparison to a cheque:
 * If you ever sign a cheque, you can show it to everyone and everyone can
 * see that you are transferring $20 to a friend. But only the bank needs
 * to verify before debiting the users account.
 * 
 * Doesn't matter if anyone sees the cheque, they can't do anything with
 * this information. But the bank can verify the signature and do whatever
 * the end users asked to do.
 * 
 * JWTs can be coded by everyone:
 * JWTs can be verified by only the person who issues them(using JWT secret).
*/