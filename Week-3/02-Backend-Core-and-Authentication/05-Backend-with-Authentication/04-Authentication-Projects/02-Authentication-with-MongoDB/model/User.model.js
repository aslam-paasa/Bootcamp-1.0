import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * 1. Define the schema (Structure of the data):
 *    - enum: We can only choose the values from the list.
 *    - default: If we don't provide the value, then the default value will
 *               be used.
*/

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  }
}, {
    timestamps: true,
});

/**
 * 2. Password hashing with hooks:
 * - We need to hash the password before & after saving the user in database,
 *   and for that we need to use hooks.
 * 
 * Hooks: 
 * - Hooks are functions that are called before & after saving the user in 
 *   database.
 * - Hooks are of two types:
 *   1. Pre-save hook:
 *      - This hook is called before saving the user in database.
 *   2. Post-save hook:
 *      - This hook is called after saving the user in database.
 * 
 * Note: When all the activities are done then we need to call next() to call
 *       the next hook. And ye hook sirf tab chalana hai jb v mere password
 *       field m koi modification ho rhi ho.
*/

/**
 * Pre-save hook:
 * - Agar humara password field modify(touch) ho rha ho to iss password field
 *   ki value ko hash karna hai.
 */
userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

/**
 * 3. Create the model using mongoose:
 *    a. Parameters:
 *       - 1. Name of the model (String) : User
 *       - 2. Schema (userSchema)      : userSchema
 *    b. Return:
 *       - Model
*/
const User = mongoose.model("User", userSchema);


export default User;
