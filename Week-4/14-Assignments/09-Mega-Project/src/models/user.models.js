/**
 * 5. Designing Database Schema:
 * a. Import mongoose
 * b. Define the schema
 * c. Create the model
 * d. Export the model
 * e. Hooks in Mongoose
 *    - Prehook: Database mein data save/update hone se PEHLE execute hota hai
 *      - Example use cases:
 *        - Password hashing before saving
 *        - Data validation/modification before save
 *        - Kisi field ko modify karna before save
 *    - Posthook: Database operation ke BAAD mein execute hota hai
 *      - Example use cases:
 *        - Sending confirmation emails after user creation
 *        - Logging after data changes
 * f. Methods in Mongoose:
 *    - These are instance methods that are available on the model
 *    - These are used when we need to perform operations on the data
 *    - For example, we can use these methods to verify if the password is 
 *      correct or to send confirmation emails after user creation
*/

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: "https://via.placeholder.com/600x400",
                localPath: "",
            },
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
        refreshToken: {
            type: String,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
    },
    { timestamps: true }
);


/**
 * Prehook: Password hashing before saving
*/ 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


/**
 * Methods in Mongoose: (Boilerplate code)
 * This is a custom method that we are adding to the userSchema:
 * a. isPasswordCorrect     : Verify user password, if it is correct.
 * b. generateAccessToken   : Generate access token for the user.
 * c. generateRefreshToken  : Generate refresh token for the user.
 * d. generateTemporaryToken: Generate temporary token for the user.
*/
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
            email: this.email,
            username: this.username,
         }, 
        process.env.ACCESS_SECRET_TOKEN, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
            email: this.email,
            username: this.username,
        }, 
        process.env.REFRESH_SECRET_TOKEN, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateTemporaryToken = function () { 
    const unhashedToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex");
    const tokenExpiry = Date.now() + (20*60*1000); // 20 minutes
    return {
        unhashedToken,
        hashedToken,
        tokenExpiry,
    };
};


export const User = mongoose.model("User", userSchema);
