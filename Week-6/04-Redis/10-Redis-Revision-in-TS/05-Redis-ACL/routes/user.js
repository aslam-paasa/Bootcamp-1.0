const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const userAuth = require("../middleware/userAuth");
require("dotenv").config();


const userRouter = express.Router();


/**
 * 3. GET: /fetchAllUsers
 *    a. Validate the user using the token.
 *    b. Get all the users from the database.
 *    c. Return the users data.
*/
userRouter.get('/fetchAllUsers', userAuth, async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
})

/**
 * 4. GET: /user (User by Id)
 *    a. Validate the user using the token.
 *    b. Get the user by id using the token.
 *    c. Return the user data.
*/
userRouter.get('/', userAuth, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


userRouter.delete('/:id', userAuth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * In case of update, we need to pass the id in the body:
 * - const { _id, ...update } = req.body;
 * - await User.findByIdAndUpdate(_id, update);
 * 
 * In case of update, we need to run the validators again:
 * - runValidators: true
*/
userRouter.patch('/', userAuth, async (req, res) => {
    try {
        const { _id, ...update } = req.body; 
        await User.findByIdAndUpdate(_id, update, { runValidators: true });
        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = userRouter;