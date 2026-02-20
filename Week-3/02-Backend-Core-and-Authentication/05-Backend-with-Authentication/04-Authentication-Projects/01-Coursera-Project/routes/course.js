/**
 * We have two types of people on our platform, and they have different
 * permissions:
 * 1. Admins: Can create courses
 * 2. Users : Can purchase courses
 * 
 * We have to separate the password section for:
 * a. Admins
 * b. Users
*/

const { Router } = require('express');
const courseRouter = Router();
const { userMiddleware } = require('../middlewares/user');
const { purchaseModel } = require('../db');
const { courseModel } = require('../db');


courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    // should check that the user has actually paid the price
    // then create entry in the database
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    res.json({
        message: "You have successfully purchased the course",
    })
})

courseRouter.get("/preview",  async (req, res) => {

    const courses = await courseModel.find({});

    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}