const express = require("express");
const User = require("../models/user.model");
const Post = require("../models/post.model");

const router = express.Router();

// User wise posts
router.get("/user-posts", async(req, res) => {

    try{

        const postsData = await User.aggregate([
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "postData"
                }
            }
        ]);

        return res.json({
            status: true,
            posts: postsData
        });
    } catch(error){
        return res.json({
            status: false,
            message: error
        });
    }
});

// Get Male Users
router.get("/male-users", async(req, res) => {

    const users = await User.find({
        gender: "female"
    });

    if(users.length > 0){

        return res.json({
            status: true,
            message: "Male Users",
            users
        });
    }  else {
        return res.json({
            status: false,
            message: "No male users found"
        });
    }
});

// Get Users where email contains "example.com"
router.get("/filtered-email", async(req, res) => {
    const users = await User.find({
        email: {
            $regex: "example.com$", 
            $options: "i"
        }
    });

    return res.json({
        status: true,
        message: "Users found",
        users
    });
});

// Get Users where email contains a substring "jay"
router.get("/user-substring", async(req, res) => {

    const users = await User.find({
        email: {
            $regex: "jay",
            $options: "i"
        }
    });

    return res.json({
        status: true,
        message: "Users found",
        users
    });
});

// Get Post with User Information
router.get("/all-posts-with-user", async(req, res) => {

    const posts = await Post.find({}).populate("userId");

    return res.json({
        status: true,
        message: "Posts found",
        posts
    });
});

module.exports = router;