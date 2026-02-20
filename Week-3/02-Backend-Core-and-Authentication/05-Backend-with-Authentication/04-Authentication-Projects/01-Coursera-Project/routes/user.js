const { Router } = require('express');
const { userModel } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
const userRouter = Router();
const { userMiddleware } = require('../middlewares/user');
const { purchaseModel } = require('../db');
const { courseModel } = require('../db');



userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        });

        res.json({
            message: "User created successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
})



userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email, password: password });

    /**
     * If the username & password is correct, then generate a token
    */
    if(user) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        // Do cookie logic

        res.json({
            message: "You are logged in ",
            token: token
        })
    } else {
        res.status(403).json({
            message: "Invalid credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const purchases = await purchaseModel.find({ 
        userId: userId 
    });

    const courses = await courseModel.find({
        _id: { $in: purchases.map(purchase => purchase.courseId) }
    });

    res.json({
        purchases,
        courses
    })
})


module.exports = {
    userRouter: userRouter
}