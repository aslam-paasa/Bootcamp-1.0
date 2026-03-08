const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();
const { redisClient } = require("../config/redis");

/**
 * Redis Token Validation:
 * Jab user logout karta hai, toh uska token Redis mein store ho jata hai as
 * "blocked". Yeh middleware check karta hai ki kya user ka token Redis mein
 * blocked hai ya nahi:
 * 
 * 1. Agar token Redis mein hai:
 *    - Iska matlab hai ki yeh ek blocked/invalid token hai
 *    - User ko authenticate nahi kiya jayega
 * 
 * 2. Agar token Redis mein nahi hai:
 *    - Iska matlab hai ki yeh ek valid token hai
 *    - User ko authenticate kiya jayega
 * 
 * Security Feature:
 * - Yeh ensure karta hai ki logged out users ka token reuse nahi ho sakta
 * - Blocked tokens se koi bhi API access nahi kar sakta
*/
const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token does not exist");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { _id } = decoded;
        if(!_id) {
            throw new Error("Id is missing");
        }


        const result = await User.findById(_id);
        if(!result) {
            throw new Error("User does not exist");
        }

        const isTokenBlocked = await redisClient.exists(`token:${token}`);
        if(isTokenBlocked) {
            throw new Error("Invalid token");
        }

        req.user = result;
        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

module.exports = userAuth;