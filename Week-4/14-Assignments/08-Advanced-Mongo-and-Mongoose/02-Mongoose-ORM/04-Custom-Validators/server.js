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
 * 2. Design Our Schema with custom validators:
 *    > validate: { validator: function (value) { return /^[a-zA-Z0-9]+$/.test(value); }, message: "Username can only contain alphanumeric character" }
 *    > validate: { validator: function (value) { return value.endsWith("@gmail.com"); }, message: "Email must be from the domain @gamil.com" }
 */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please username is required"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]+$/.test(value); //only alphameric
        },
        message: "Username can only contain alphanumeric character",
      },
    },
    email: {
      type: String,
      required: [true, "Please email is required"],
      validate: {
        validator: function (value) {
          return value.endsWith("@gmail.com"); //email must end with @gmail.com
        },
        message: "Email must be from the domain @gamil.com",
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
      email: "emm@yahoo.com",
      username: "#ben",
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
