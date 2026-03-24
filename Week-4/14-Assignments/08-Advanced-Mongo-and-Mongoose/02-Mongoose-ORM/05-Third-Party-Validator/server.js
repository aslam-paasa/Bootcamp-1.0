const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

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
 * 2. Design Our Schema with third-party validators:
 *    > validate: { validator: function (value) { return validator.isEmail(value); }, message: "Invalid Email" }
 *    > validate: { validator: function (value) { return validator.isInt(value, { min: 0, max: 120 }); }, message: "Invalid Age" }
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
      set: (value) => {
        return validator.escape(value);
      },
    },
    email: {
      required: true,
      type: String,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
      },
    },
    age: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return validator.isInt(value, { min: 0, max: 120 });
        },
        message: "Invalid Age",
      },
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
    await User.create({
      email: "emm@gmail.com",
      username: "John_Doe<",
      age: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
createUser();

/**
 * Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
