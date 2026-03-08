import mongoose, { model, Schema } from "mongoose";

/**
 * Connecting DB to the backend:
*/

mongoose
    .connect("mongodb+srv://admin:admin123@cluster0.goyedz2.mongodb.net/cohort-second-brain")
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((e) => {
        console.log("Error connecting to DB", e);
    });

/**
 * Schema-1: User Schema
*/
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
});

export const UserModel = model("User", UserSchema);


/**
 * Schema-2: Content Schema
*/
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

export const ContentModel = model("Content", ContentSchema);


/**
 * Schema-3: Link Schema
*/
const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

export const LinkModel = model("Links", LinkSchema);
