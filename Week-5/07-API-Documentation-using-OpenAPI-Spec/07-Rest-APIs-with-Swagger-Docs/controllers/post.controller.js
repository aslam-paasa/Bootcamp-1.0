const httpStatus = require("http-status-codes");
const { PostSchemaValidation } = require("../validation/post.validation");
const Post = require("../models/post.model");

const addPost = async(req, res) => {

    try{

        const bodyData = req.body;

        // Data Validation
        const { error } = PostSchemaValidation.validate(req.body);

        if(error){
            return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: error.details[0]?.message
            })
        }

        const bannerImage = req.file ? req.file.filename : null;

        const postObject = new Post({
            ...bodyData,
            userId: req.session.user.id,
            bannerImage
        });

        await postObject.save();

        return res.status(httpStatus.StatusCodes.CREATED).json({
            status: true,
            message: "Post created"
        });

    } catch(error){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
}

const listPosts = async(req, res) => {
    try{

        const userPosts = await Post.find({
            userId: req.user.id
        });

        if(userPosts.length > 0){

            return res.status(httpStatus.StatusCodes.OK).json({
                status: true,
                message: "Post found",
                posts: userPosts
            })
        }

        return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
            status: false,
            message: "No post found"
        });

    } catch(error){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        })
    }
}

const updatePost = async(req, res) => {

    try{

        const postId = req.params.id;

        const postData = await Post.findOne({
           _id: postId,
           userId: req.user.id 
        });

        if(postData){

            const { title, content, status } = req.body;

            postData.title = title || postData.title;
            postData.content = content || postData.content;
            postData.status = status || postData.status;

            if(req.file){
                postData.bannerImage = req.file.filename;
            }

            await postData.save();

            return res.status(httpStatus.StatusCodes.OK).json({
                status: true,
                message: "Post data updated successfully"
            });
        }

        return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
            status: false,
            message: "Post not found"
        });
    } catch(error){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
}

const deletePost = async (req, res) => {
    try{

        const postId = req.params.id;

        const postData = await Post.findOneAndDelete({
            _id: postId,
            userId: req.user.id
        });

        if(!postData){

            return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
                status: false,
                message: "Post not found"
            })
        }

        return res.status(httpStatus.StatusCodes.OK).json({
            status: true,
            message: "Post deleted"
        });
    } catch(error){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
}

const singlePost = async(req, res) => {
    try{

        const postId = req.params.id;

        const postData = await Post.findOne({ 
            _id: postId,
            userId: req.user.id
        });

        if(!postData){
            return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
                status: false,
                message: "Post not found"
            });
        }

        return res.status(httpStatus.StatusCodes.OK).json({
            status: true,
            message: "Post found",
            post: postData
        });
    } catch(error){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
}

module.exports = {
    addPost,
    listPosts,
    updatePost,
    deletePost,
    singlePost
}