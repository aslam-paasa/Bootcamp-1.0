const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = 8082;


/**
 * Step-1: Define the MongoDB Connection URL
 * > mongodb+srv://twentekghana:xWzu0Yn69lU7yU9K@mongodb-basics.8pldozv.mongodb.net/?retryWrites=true&w=majority
 * > username = twentekghana
 * > pass = xWzu0Yn69lU7yU9K
*/
const mongodbURL = "mongodb+srv://twentekghana:xWzu0Yn69lU7yU9K@mongodb-basics.8pldozv.mongodb.net/?retryWrites=true&w=majority";


/**
 * Step-2: Create a MongoDB Client
 * > The MongoDB client configuration is essential for establishing a 
 *   connection to MongoDB. It ensures a secure and reliable connection.
 * > Key Components:
 *   - MongoClient: Main class used to create a client instance
 *   - Connection URL: URL containing credentials and database location
 *   - Server API Settings:
 *      • version: Specifies MongoDB API version (v1)
 *      • strict: Enables strict mode for better error checking
 *      • deprecationErrors: Shows warnings for deprecated features
 * > This configuration ensures:
 *   - Secure connection to MongoDB
 *   - Proper error handling
 *   - Compatibility with MongoDB features

*/
const client = new MongoClient(mongodbURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Step-3: Connect to MongoDB
 * > The connectDB function is an async function that establishes 
 *   connection with MongoDB using the MongoDB client.
*/
const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Step-4: Run the function
 * > The connectDB function is called to initiate the database connection.
*/
connectDB();

/**
 * Step-5: Start the server
*/
app.listen(PORT, console.log(`The server is up and running on port ${PORT}`));
