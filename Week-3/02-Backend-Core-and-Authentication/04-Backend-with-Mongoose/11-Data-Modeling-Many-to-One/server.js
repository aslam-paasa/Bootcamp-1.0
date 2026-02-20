const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;


/**
 * 1. Connect to mongodb using mongoose
 */
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/masynctech");
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();


/**
 * 2. Design Our Schema with embedded document (many-to-one relationship)
 *    Many-to-One relationship means multiple comments can be associated with
 *    a single post.
 *
 *     For example:
 *     - One blog post can have many comments
 *     - Each comment belongs to only one post
 *     - The relationship is maintained by storing the post's ID in each 
 *       comment
 *    
 *    commentSchema: many-to-one relationship with Post
 */

const commentSchema = new mongoose.Schema(
  {
    text: String,
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // This creates the relationship with Post model
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 3. Compile the schema to create the model
 */
const Comment = mongoose.model("Comment", commentSchema);

/**
 * 4. Design Our Schema with embedded document (many-to-one relationship)
 *    The Post schema represents the "one" side of the many-to-one relationship
 *    - One post can have multiple comments referencing it
 *    - We don't need to store comments here since they reference the post
 */

const blogPostSchema = new mongoose.Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);

/**
 * 5. Compile the schema to create the model
 */
const Post = mongoose.model("Post", blogPostSchema);

/**
 * 6. Create Post
 */
const createPost = async () => {
  try {
    const newPost = await Post.create({ title: "Awesome Fullstack course" });
    console.log(newPost);
  } catch (error) {
    console.log(error);
  }
};
createPost();

/**
 * 7. Create Comment
 */
const createComment = async () => {
  try {
    //Create the comment
    const newComment = await Comment.create({
      text: "Awesome post 2",
      postId: "6533b3acca3ab8685234c0dd",
    });
    console.log(newComment);
  } catch (error) {
    console.log(error);
  }
};
createComment();

/**
 * 8. Fetch Comments
 */
const fetchComments = async () => {
  try {
    //!Find the post
    const comments = await Comment.find().populate("postId");
    console.log(comments);
  } catch (error) {
    console.log(error);
  }
};
fetchComments();

/**
 * 9. Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
