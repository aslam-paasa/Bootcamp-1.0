const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Schema Level Validation:
*/
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
        min: 14,
        max: 70,
        required: true,
    },
    gender: {
        type: String,
        // enum: ["male", "female", "other"],
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Invalid Gender");
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "https://via.placeholder.com/150",
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

module.exports = User;