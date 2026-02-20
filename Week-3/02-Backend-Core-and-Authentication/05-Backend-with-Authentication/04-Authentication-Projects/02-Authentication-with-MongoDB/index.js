/**
 * 1. How to create a new project?
 *    a. Initialize the node environment project using npm:
 *       - npm init -y :
 *         - npm is a package manager for javascript.
 *         - init is used to initialize a new project.
 *         - -y is used to forcefully accept all the default values.
 * 
 *    b. Version of node:
 *       - version: 1.0.0 - Version is always written in the format of x.x.x.
 *       - Read: https://semver.org/ - Read Introduction to SemVer
 * 
 *    c. Main:
 *       - Main is the entry point of the project.
*/

/**
 * 2. ExpressJS:
 *    a. ExpressJS is a framework for building web applications using Node.js.
 *    b. It is a server-side framework for Node.js.
 *    c. NPM Command: npm install express
*/

/**
 * 3. How to understand any new project before working on it?
 *    a. Go to .env file or .env.sample file:
 *       - .env is an environment variable file, which stores the sensitive
 *         data like services, databases, API Keys, etc. 
*/

/**    
 * 4. How to store sensitive data?
 *    a. dotenv:
 *       - Dotenv is a zero-dependency module that loads environment variables
 *         from a .env file into process.env. 
 *       - Storing configuration in the environment separate from the code is
 *         based on The Twelve-Factor App methodology.
 *       - NPM Command: npm install dotenv
 * 
 *    b. How to use dotenv?
 *       - import dotenv from "dotenv";
 *       - dotenv.config();
 *       - Agar hum kisi particular folder k andr apna dotenv file store kr
 *         rakha hai to hm .config() k andr uska path name v daal skte hai.
 *       - Example: Folder: SecretFile, File: .env
 *         - dotenv.config({ path: "./SecretFile/.env" });
 * 
*/

/**
 * 5. How to prevent other frontend from accessing my backend?
 *    a. Pehle k time pe backend and frontend ek saath hote the, tb humein CORS
 *       ki koi dikkat nhi hoti thi qki frontend and backend ekhi jagha se 
 *       serve hota tha. Eventually fir humne backend and frontend ko alag alag
 *       detach kr diya, ab humaara backend ho skta hai AWS, Azure, etc pe ho,
 *       aur frontend ho skta hai netlify, vercel, etc pe ho. Lekin mai ye chahta
 *       hu ki sirf mera frontend baat kare mere backend se aur kisi ka frontend
 *       mere backend se nhi baat kare. How to prevent this?
 * 
 *    b. CORS: 
 *       - CORS stands for Cross-Origin Resource Sharing.
 *       - It is a security feature implemented by the browser to prevent
 *         malicious websites from accessing resources from a different origin.
 *       - CORS actually works on the server side or backend side.
 * 
 *    c. How to use CORS?
 *       - NPM Command: npm install cors
 *       - import cors from "cors";
 *       - app.use(cors()); 
 *         - Iske andr hum configurations likh skte hai:
 *           1. Request kaha se aane dena chahta hu:
 *              - origin: "http://localhost:5173"   (We can write multiple origins)
 *           2. Request kis methods ko accept karegi:
 *              - methods: ["GET", "POST", "PUT", "DELETE"]   (Keep them inside an array)
 *           3. Request kis headers ko accept karegi:
 *              - allowedHeaders: ["Content-Type", "Authorization"]  
 *           4. Credentials me kya likhna hai?
 *              - credentials: true
 *              - It means that the request will be sent with credentials like
 *                cookies, authorization headers, etc.
*/

/**
 * 6. How many types of data we can send from frontend to backend?
 *    a. Text data:
 *       - Nothing special, just send the text data.
 * 
 *    b. JSON data:
 *       - app.use(express.json()); 
 * 
 *    c. URL encoded data:
 *       - app.use(express.urlencoded({ extended: true }));
 *       - extended: true => Means support latest version of URL encoded 
 *         data.
 *       - http://localhost:3000/piyush%20garg => piyush garg
 *  
 *    etc... 
*/

/**
 * 7. How to store the data?
 *    a. Temporary storage:
 *       - In memory storage:
 *         - In memory storage is a temporary storage that is stored in the
 *           memory of the server.
 *         - It is not permanent, it is lost when the server restarts.
 *       - File system:
 *         - File system is a permanent storage that is stored in the file system
 *           of the server.
 * 
 *    b. Permanent storage:
 *       - Database:
 *         - Database is a permanent storage that is stored in the database.
 *         - It is not lost when the server restarts.
 *         - It is more secure than the file system.
 *         - It is more efficient than the file system.
 *         - Ex: MongoDB, MySQL, etc.
*/

/**
 * 8. What is ORM?
 *    - ORM stands for Object-Relational Mapping.
 *    - It is a technique that allows us to map the objects of our programming
 *      language to the tables of our database.
 *    - Ex: Mongoose ORM, Sequelize ORM, etc.
 * 
 *    What is ODM?
 *    - ODM stands for Object-Document Mapping.
 *    - It is a technique that allows us to map the objects of our programming
 *      language to the documents of our database.
 *    - Ex: Mongoose ODM, Sequelize ODM, etc.
 * 
 *    How to use Mongoose ODM?
 *    - Technically, Mongoose humaara backend m hota hai.
 *       a. npm install mongoose
 *       b. import mongoose from "mongoose";
 *       c. mongoose.connect("mongodb://localhost:27017/mydatabase");
 *       d. mongoose.connect(process.env.MONGO_URI);
*/

/**
 * 9. Database Modelling: [Model]
 * -  We are done with the static part of the project. Now we will start
 *    working on the dynamic part of the project.
 * 
 * What to build? (Database Modelling)
 * - Management System: (StartUp and Paisa isi m hai like JIRA, Notion, etc.)
 *      a. LMS
 *      b. CMS
 *      c. HMS
 *      d. BMS
 *      etc... 
 * 
 *    - Data to Host: 
 *      - We have to figure out "Kya data rakhna chahte hai".
 *      - Ex: We have to store the data of the:
 *            - Users
 *            - Products
 *            - Orders
 *            - etc...
 *      - Suppose we have to verify the user, but if we don't have verified
 *        field in the user schema(Structure), then we cannot verify the user.
 *      
 *      - User Schema:
 *        a. name
 *        b. email
 *        c. password 
 *        d. role: USER, ADMIN
 *        e. isVerified
 *        f. passwordResetToken
 *        g. passwordResetExpires
 *        h. verificationToken (OTP Token)   
 *        i. createdAt
 *        j. updatedAt
 * 
 * Authentication Explanation:
 * 
*/

/**
 * 10. Controller: An API has two parts:
 *     a. Route: The path of the route.
 *     b. Controller: The callback fn handles the functionality of the route.
 * 
 *    How to separate the routes and controllers?
 *    a. controllers folder:
 *       - Create a new folder named "controller".
 *       - Create a new file named "User.controller.js".
 *       - Create a new function named "registerUser".
 *           const registerUser = async (req, res) => {
 *             res.send("Registered");
 *           }
 *       - Export the "registerUser" function.
 * 
 *    b. routes folder:
 *       - Import the "express" module.
 *       - Import the "registerUser" function from the "User.controller.js" file.
 *       - Use the router object to create a new route:
 *           const router = express.Router();
 *           router.post("/register", registerUser);
 *       - Export the router object.
 * 
 *    c. index.js file:
 *       - Import the "router" object from the "User.routes.js" file.
 *       - Use the router object to create a new route:
 *         - app.use("/api/user", UserRoutes);
 *            a. /api/user + /register (id = register)
 *            b. /api/user + /login    (id = login)
 * 
 *    d. How to handle multiple dynamic routes?
 *       - app.use("/api/user/:id", UserRoutes);
 *         - It means '/api/user/:id' route pe koi v request aayega to UserRoutes
 *           pe jayega.
 *         - Now it id parameter == 'register' : registerUser fn
 *         - Now it id parameter == 'login'    : loginUser fn
 *       
 * 
*/

/**
 * 10. Controller Designing (Functionality):
 *     a. Register User (Signup)
 *     b. Verify Email (Verify User)
 *     c. Login User (Login)
*/


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";


/**
 * Import all the routes:
*/
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors(
  {
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Now we can access cookies in the req obj.

const PORT = process.env.PORT || 4000;


app.get("/", (req, res) => {
  res.send("Cohort");
});

app.get("/hitesh", (req, res) => {
  res.send("Hitesh");
});

app.get("/piyush", (req, res) => {
  res.send("Piyush!");
});


/**
 * Connect to the server and database:
*/
connectDB();

/**
 * User Routes:
 * - Jb v koi request /api/v1/user k route pe aayega to UserRoutes pe jayega.
*/
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});