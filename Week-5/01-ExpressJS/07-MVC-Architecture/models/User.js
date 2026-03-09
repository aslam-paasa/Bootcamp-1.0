/*
  models/User.js — User Model
  ============================
  Defines the shape and rules for a User document in MongoDB.
  Contains schema validation, password hashing hook, and
  a method to compare passwords at login.
*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email."],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [6, "Password must be at least 6 characters."],
            select: false, // never returned in queries by default
        },
        role: {
            type: String,
            enum: ["user", "moderator", "admin"],
            default: "user",
        },
        age: { type: Number, min: 1, max: 120 },
        city: { type: String, trim: true },
        avatar: { type: String, default: null }, // stores uploaded file path
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

/*
  Pre-save hook — hashes password before saving to DB.
  Runs automatically every time a user document is saved.
  "this.isModified" ensures we only re-hash if password changed.
*/
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

/*
  Instance method — compares a plain password with the stored hash.
  Called during login: user.comparePassword(plainPassword)
*/
userSchema.methods.comparePassword = async function (plain) {
    return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", userSchema);