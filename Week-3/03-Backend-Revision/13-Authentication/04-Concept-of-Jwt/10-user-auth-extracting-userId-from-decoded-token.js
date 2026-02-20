/**
 * User Auth: Extracting user ID from decoded token
 * Q. Create a fn called extractUserIDFromToken that takes a decoded 
 *    JWT token and returns the user ID contained in the payload.
 * */ 

const jwt = require('jsonwebtoken');

function extractUserIDFromToken(decodedToken) {
    if(decodedToken && decodedToken.userID) {
        return decodedToken.userID;
    } else {
        throw new Error('Invalid or missing user ID in token');
    }
}