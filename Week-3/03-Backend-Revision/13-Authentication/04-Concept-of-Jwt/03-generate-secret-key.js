/**
 * Generate a secret.
 * Q. Generate a secret for signing and verifying JWTs.
 * 
 * Understanding:
 * Node.js contains built-in crypto module to generate a random secret
 * key for signing and verifying JWTs.
 * 
 * The crypto module provides a secure way to generate random data, which
 * is crucial for maintaining the security of your JWTs.
 * 
 * Note: In the terminal, generate a secret and store it in your .env:
 *       node -e "console.log(require('crypto').randomBytes(256).toString('base64));"
*/