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
 * 2. Design Our Schema with built-in validators:
 *    > required: [true, "Please username is required"]
 *    > unique: true
 *    > minLength: 3
 *    > maxLength: 10
 *    > match: /@/
 *    > min: 18
 *    > max: 65
 *    > enum: ["Male", "Female", "Other"]
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please username is required"],
      unique: true,
      minLength: 3,
      maxLength: 10,
    },
    email: {
      type: String,
      required: [true, "Please email is required"],
      match: /@/,
    },
    age: {
      type: Number,
      min: 18,
      max: 65,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 3. Compile the schema to create the model
 */
const User = mongoose.model("User", userSchema);

/**
 * 4. Create user
 */
const createUser = async () => {
  try {
    await User.create({});
  } catch (error) {
    console.log(error);
  }
};
createUser();

/**
 * Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
