/**
 * Controller Designing (Functionality):
 * 
 *    Q. Backend k paas data kaise or kaha aata hai?
 *    A. Backend k paas data 3 ways se aata hai:
 *       1. Body (JSON)  : req.body
 *       2. Params (URL) : req.params
 *       3. Query (URL)  : req.query
 * 
 *    Q. How to extract data from request?
 *    A. req.body, 
 *       req.params, 
 *       req.query
*/ 

/** 
 * Authentication & Middleware:
 * Q. How Authentication Works:
 *    - User sends request with token (in cookie)
 *    - Middleware checks if token is valid
 *    - If valid, adds user info to req.user
 *    - Request continues to controller
 * 
 *      [user] ----> [controller] ----> [middleware] ----> [route]
 *                                          verifyToken
 *                                          req, res, next
*/

/**
 * Flow of Authentication:
 * 1. Register         : DB + Send Email (with token)
 * 2. Click Email      : Token Verification (isVerified = true)
 * 3. Login            : Set JWT in Cookie
 * 4. Middleware       : Check Token
 * 5. Protected Routes : /me, /logout
*/

import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * 1. Register User (Signup)
 *   a. Get user data
 *   b. Validate required fields
 *   c. Check if user exists
 *   d. Create new user
 *   e. If user is not created, return error
 *   f. Generate and save verification token
 *   g. Send verification email to user
 *   h. Return success status
 */

const registerUser = async (req, res) => {
    /**
     * 1. Get user data
     */
    const {name, email, password} = req.body;

    /**
     * 2. Validate required fields
     */
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        /**
         * 3. Check if user exists
         */
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        /**
         * 4. Create new user
         */
        const user = await User.create({
            name, 
            email, 
            password
        });
        console.log(user);

        /**
         * 5. If user is not created
         */
        if(!user){
            return res.status(400).json({
                message: "User not registered"
            });
        }
        
        /**
         * 6. Generate and save verification token
         *    - Use crypto module to create a verification token which will
         *      create a random string of characters and numbers. 
         */
        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);

        user.verificationToken = token;
        await user.save();

        /**
         * 7. Send verification email (Nodemailer & Mailtrap)
         *    - Mailtrap is a fake SMTP server.
         *    - Nodemailer is a module that allows us to send emails.
         */
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "Verify your email",
            text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`
        };

        await transporter.sendMail(mailOptions);

        /**
         * 8. Send success status to user
         */
        return res.status(200).json({
            message: "User registered successfully"
        });

    } catch (error) {
        /**
         * 9. Send error status to user if any error occurs
        */
        return res.status(400).json({
            message: "User not registered",
            error,
            success: false
        });
    }
}

/**
 * 2. Verify Email (Verify User)
 *   a. Get token from request
 *   b. Validate token
 *   c. Find user with token
 *   d. If user not found, return error
 *   e. If user found, verify email
 *   f. Return success status 
*/

const verifyUser = async (req, res) => {
    /**
     * 1. Get token from request
    */
    const {token} = req.params;
    console.log(token);

    /**
     * 2. Validate token
    */
    if(!token){
        return res.status(400).json({
            message: "Token is required"
        });
    }

    /**
     * 3. Find user based on token
     *    - verificationToken: token, means token is matching with 
     *      verificationToken in database.
    */
    const user = await User.findOne({verificationToken: token});
    console.log(user);

    /**
     * 4. If user is not found, return error. 
     *    Else, verify user.
    */
    if(!user){
        return res.status(400).json({
            message: "User not found"
        });
    }

    user.isVerified = true;

    /**
     * 5. Remove verification token from database
    */
    user.verificationToken = undefined;

    /**
     * 6. Save user in database
    */
    await user.save();

    /**
     * 7. Return response to user
    */
    return res.status(200).json({
        message: "User verified successfully"
    });
}


/**
 * 3. Login User (Login)
 *   a. Get user data
 *   b. Validate required fields
 *   c. Check if user exists
 *   d. Check if password is correct
 *   e. Generate token
 *   f. Use cookieParser(access cookie) to set token in cookie 
 *   g. Return success status
 */
const loginUser = async (req, res) => {
    /**
     * 1. Get user data
     */
    const {email, password} = req.body;

    /**
     * 2. Validate required fields
     */
    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        /**
         * 3. Check if user exists
         */
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        /**
         * 4. Check if password is correct
         */
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        /**
         * 5. Generate token:
         *    - jwt.sign() is used to generate a token.
         *    - It takes 3 arguments:
         *       a. Payload: {id: user._id, role: user.role}
         *       b. Secret key: process.env.JWT_SECRET
         *       c. Options: {expiresIn: "1h"}
         *    - expiresIn: "1d" means the token will expire in 1 day.
         */
        const token = jwt.sign(
            {id: user._id, role: user.role}, 
            process.env.JWT_SECRET, 
            {expiresIn: "1h"}
        );

        /**
         * 6. Use cookieParser(access cookie) to set token in cookie 
         *    - First we need to use cookieParser middleware. (index.js)
         *    - Then we need to set the token in cookie. 
         *  
         * Note: Cookies are in key-value pair. It has 3 properties:
         *       a. name: accessToken
         *       b. value: token (generated token)
         *       c. Options:
         *          - httpOnly: true [normal user is cookie ko access nahi kar sakta]
         *          - secure: process.env.NODE_ENV !== "development" 
         *            [only send the cookie over HTTPS in production]
         *          - maxAge: 1 * 24 * 60 * 60 * 1000 (1 day)
         *          - sameSite: "strict" 
         *            [prevents the cookie from being sent along with requests to other sites]
        */
       const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "strict"
       }

        res.cookie("accessToken", token, cookieOptions);
        
        /**
         * 7. Return success status
         */
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "User not logged in",
            error
        });
    }
}


const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        } 

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user
        });
        
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "User profile not fetched",
            error
        });
    }
}


const logoutUser = async (req, res) => {
    try{
        res.clearCookie("accessToken");
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "User not logged out",
            error
        });
    }
}


/**
 * 4. Forgot Password Functionality:
 *   a. Get user's email from request body
 *   b. Find user in database using email
 *   c. Generate reset token and expiry time
 *   d. Save token and expiry in user document
 *   e. Send reset password email to user
 */
const forgotPassword = async (req, res) => {
    try {
        /**
         * 1. Get email from request
         */
        const { email } = req.body;

        /**
         * 2. Find user by email
         */
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }

        /**
         * 3. Generate reset token and expiry
         */
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

        /**
         * 4. Save token and expiry in user document
         */
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = resetExpiry;
        await user.save();

        /**
         * 5. Create reset URL and send email
         */
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        
        /**
         * 6. Send email using nodemailer
         */
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `
                <h1>Password Reset Request</h1>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in forgot password process",
            error: error.message
        });
    }
}

/**
 * 5. Reset Password Functionality:
 *   a. Get token from URL params and new password from request body
 *   b. Find user with valid reset token and expiry time
 *   c. Update user's password and clear reset token fields
 *   d. Save changes to database
 *   e. Return success response
 */
const resetPassword = async (req, res) => {
    try {
        /**
         * 1. Get token and new password
         */
        const { token } = req.params;
        const { password } = req.body;

        /**
         * 2. Find user with valid reset token
         */
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }

        /**
         * 3. Update user's password and clear reset fields
         */
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        /**
         * 4. Save changes
         */
        await user.save();

        /**
         * 5. Return success response
         */
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error resetting password",
            error: error.message
        });
    }
}


export { 
    registerUser, 
    verifyUser, 
    loginUser, 
    getUserProfile,  
    logoutUser, 
    forgotPassword, 
    resetPassword 
};
