
/**
 * Creating a free MongoDB instance:
 * +-------------------------------+
 * Creating a free MongoDB instance typically involves using MongoDB
 * Atlas, the official cloud-based database service provided by MongoDB.
 * Follow these step-by-step instructions to create a free MongoDB instance
 * using MongoDB Atlas:
 * 
 * 1. Visit MongoDB Atlas:
 *    Open your browser and go to the MongoDB Atlas websites:
 *    https://www.mongodb.com/cloud/atlas
 * 
 * 2. SignUp or Log In:
 *    If you don't have an account, click on "Sign Up" to create a new
 *    account. If you already have an account, log in using your
 *    credentials.
 * 
 * 3. Choose a Plan:
 *    Once logged in, click on the "Get Started Free" button to initiate
 *    the process of creating a free MongoDB instance.
 * 
 * 4. Fill in the form:
 *    Provide the required information in the signup form. This includes
 *    your email, username and password.
 * 
 * 5. Create an Organization:
 *    After filling in your information, you'll be promoted to create an
 *    organization. Enter a name for your organization, and click "Next". 
 * 
 * 6. Create a Project:
 *    Inside your organization, you'll create a project. Choose a name
 *    for your project, and click "Next". 
 * 
 * 7. Create a Cluster:
 *    In the next step, you'll create a Cluster. A Cluster is a set of
 *    servers that will host your MongoDB databases. Choose the free
 *    tier(M0 Sandbox), and select you preferred cloud provider and
 *    region.
 * 
 * 8. Configure Cluster Settings:
 *    Configure additional settings for your cluster, such as the 
 *    cluster name, additional features, and whether you want to enable
 *    backups. You can stick with the default settings for now.
 * 
 * 9. Create Cluster:
 *    Click the "Create Cluster" button. MongoDB Atlas will start creating
 *    your cluster, and this process may take a few minutes.
 * 
 * 10. Wait for Cluster to Deploy:
 *     Once the cluster is created, you'll see it in the MongoDB Atlas
 *     dashboard. Wait for the cluster to be deployed and become available.
 * 
 * 11. Access Your Cluster:
 *     Once your cluster is ready, click on the "CONNECT" button. You
 *     can then choose to connect using MongoDB Compass(a GUI tool)
 *     or connect using application.
 * 
 * 12. Whitelist Your IP Address:
 *     Before connecting, you need to whitelist your IP Address to ensure
 *     secure access. Click on the "Add Your Current IP Address" button.
 * 
 * 13. Create a MongoDB User:
 *     Create a MongoDB user by entering a username and password. This 
 *     user will be used to connect to your MongoDB instance.
 * 
 * 14. Connect to your Cluster:
 *     After creating the user, click on the "Choose a Connection Method"
 *     button and follow the instruction to connect to your MongoDB
 *     cluster.
 * 
 * => Connection String:
 *    mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
 *                  
*/

/**
 * Q. How does the backend connect to the database?
 * => Using libraries!
 * 
 *    1. Express:
 *       a. Created an HTTP server to handle requests and responses.
 *       b. Express itself doesn't directly connect to the database,
 *          it provides a framework for building the server. 
 *          Endpoints/routes within Express handle requests, and these
 *          routes may involve interactions with the database using 
 *          other libraries like Mongoose.
 * 
 *    2. Jsonwebtokens (JWT) library:
 *       a. Allows the creating and verification of JSON Web Tokens
 *       b. JWTs are used for authentication. Once a user is authenticated,
 *          the backend can include a JWT in the response. This token can
 *          sent by the client in subsequent requests, allowing the backend
 *          to identify and authorize the user without the nedd to store
 *          session information on the server.
 * 
 *    3. Mongoose:
 *       a. An Object Data Modelling (ODM) library for MongoDB and Node.js. 
 *          It provides a structured way to interact with MongoDB.
 * 
 * In Summary, while Express sets up the server, JWT helps with user
 * authentication, and Mongoose facilitates interaction with the MongoDB
 * database. Together, these libraries form a robust backend infrastructure
 * for handling HTTP requests, securing routes, and managing data in the
 * database.
 * 
 * => Lets explore mongoose and do the next assignment:
 *    (a) https://mongoosejs.com/
 *    (b) https://gist.github.com/hkirat/23c42247d8a37de53b005d2668507a67
*/

const express = require("express");
const app = express();

/**
 * 1. Importing mongoose library:
 * => npm install mongoose
*/
const mongoose = require('mongoose');

/**
 * 2. Connecting mongoDB using mongoose:
 * => mongoose.connect('mongodb_url');
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy**********er@cluster0.goyedz2.mongodb.net/usersnewdb");



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});