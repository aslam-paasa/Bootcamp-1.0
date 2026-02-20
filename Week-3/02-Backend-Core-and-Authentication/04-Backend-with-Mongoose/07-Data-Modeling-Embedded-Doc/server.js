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
 * 2. Design Our Schema with embedded document
 *    > street: String
 *    > city: String
 *    > state: String
 *    > zip: Number
 */
const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
  {
    timestamps: true,
  }
);

/**
 * 3. Design Our Schema with embedded document
 *    > name: String
 *    > email: String
 *    > address: addressSchema
 */
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    address: addressSchema, //embedded approach
  },
  {
    timestamps: true,
  }
);

/**
 * 4. Compile the schema to create the model
 */
const User = mongoose.model("User", userSchema);

/**
 * 5. Create user
 */
const createUser = async () => {
  try {
    const newUser = await User.create({
      name: "Emmanuel",
      email: "emma@gmail.com",
      address: {
        street: "Kumasi OT2",
        city: "Camp",
        state: "Ghana",
        zip: 1122,
      },
    });
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
};
createUser();

/**
 * Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
