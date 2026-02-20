const { Router } = require('express');
const adminRouter = Router();

const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminModel } = require("../db");
const { adminMiddleware } = require('../middlewares/admin');
const { courseModel } = require('../db');

/**
 * adminRouter is protected by adminMiddleware:
 * - adminMiddleware is a middleware that checks if the user is an admin.
 * - If the user is not an admin, the user will not be able to access the routes.
*/

adminRouter.post("/signup", async (req, res) => {
    /**
     * 1. Get the data from the request body
     */
    const { email, password, firstName, lastName } = req.body;

    /**
     * 2. Check if the email and password are provided
     */
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    /**
     * 3. Check if the admin already exists
     */
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }
    
    try {
        await adminModel.create({
            email,
            password,
            firstName,
            lastName
        });

        res.json({
            message: "Admin created successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
});


adminRouter.post("/signin", async (req, res) => {
    /**
     * 1. Get the data from the request body
    */
    const { email, password } = req.body;

    /**
     * 2. Check if the user exists in the database
    */
    const admin = await adminModel.findOne({ 
        email: email,
        password: password
    });
    

    /**
     * 2. If the password is correct, then generate a token
    */
    if(admin) {
        const token = jwt.sign({
            id: admin._id,
        }, JWT_ADMIN_PASSWORD);

        res.json({
            message: "You are logged in as admin",
            token: token
        })
    } else {
        res.status(403).json({
            message: "Invalid credentials"
        })
    }
})


/**
 * Create a course:
 * 1. Go to headers in postman
 * 2. Add Authorization header with value: Bearer <token>
 * 3. Add token in body
 * 4. Add title, description, imageUrl, price in body
 * 5. Send the request
 * 6. Resonse:
 *      message: "Course created successfully",
 *      courseId: "6825b04a695f2db1c7d8eaf0"
 * 7. Signin from other creator's account
 * 8. Try to update the course
 * 9. If it will throw error, then it is working
 * 
*/
adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    const { title, description, imageUrl, price } = req.body;

    try {
        const course = await courseModel.create({
            title,
            description, 
            imageUrl,
            price,
            creatorId: adminId
        });

        res.json({
            message: "Course created successfully",
            courseId: course._id
        });
    } catch(err) {
        res.status(500).json({
            message: "Error creating course",
            error: err.message
        });
    }
})



adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const { title, description, imageUrl, price, courseId } = req.body;

    try {
        const course = await courseModel.findOne({
            _id: courseId,
            creatorId: adminId
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const updatedCourse = await courseModel.updateOne(
            {
                _id: courseId,
                creatorId: adminId
            },
            {
                title,
                description,
                imageUrl,
                price
            }
        );

        res.json({
            message: "Course updated successfully",
            courseId: courseId
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
});


adminRouter.get("/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "All courses fetched successfully",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}