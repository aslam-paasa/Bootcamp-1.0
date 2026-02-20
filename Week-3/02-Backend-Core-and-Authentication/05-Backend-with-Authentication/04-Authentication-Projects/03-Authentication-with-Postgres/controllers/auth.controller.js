import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

/**
 * Prisma Object connected to the database:
 * - Prisma Client library ko use krke hum database k saath baat karte hai
 * - And this prisma object is used to interact with the database
 * - No Database Connection is required
*/
const prisma = new PrismaClient();

/**
 * Route      : /api/v1/users/register
 * Method     : POST
 * Description: Register a new user
 * Access     : Public
 * Parameters : name, email, password, phone
 * Returns    : User object
*/
export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        console.log("Data is missing");
        return res.status(400).json({ 
            success: false,
            message: "All fields are required" 
        });
    }

    try {

        /**
         * Check if the user already exists
        */
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        /**
         * Hash the password
        */
        const hashedPassword = await bcrypt.hash(password, 10);

        /**
         * Generate a verification token
        */
        const verificationToken = crypto.randomBytes(32).toString("hex");

        /**
         * Create a user in the database
        */
        const user = await prisma.user.create({
            data: { 
                name, 
                email, 
                phone, 
                password: hashedPassword, 
                verificationToken,
            }
        });

        /**
         * Send a verification email
        */
        const verificationEmail = {
            from: "noreply@example.com",
            to: email,
            subject: "Verify your email",
            text: `Click here to verify your email: http://localhost:3000/verify-email?token=${verificationToken}`
        }

        // await sendEmail(verificationEmail);

        console.log(verificationEmail);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error,
            message: "Registration failed"
        });
    }
};


/**
 * Route      : /api/v1/users/login
 * Method     : POST
 * Description: Login a user
 * Access     : Public
 * Parameters : email, password
 * Returns    : User object
*/
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        const cookieOptions = {
            httpOnly: true,
        }
        res.cookie("token", token, cookieOptions);

        return res.status(201).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            message: "Login successful",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
}


/**
 * Route      : /api/v1/users/logout
 * Method     : GET
 * Description: Logout a user
 * Access     : Public
 * Returns    : Success message
*/
export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}