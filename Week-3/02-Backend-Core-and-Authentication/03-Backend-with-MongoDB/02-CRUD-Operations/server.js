const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId, Decimal128 } = require("mongodb");

const app = express();
const PORT = 8082;

/**
 * Step-1: Connect to mongodb
 * > mongodb+srv://twentekghana:xWzu0Yn69lU7yU9K@mongodb-basics.8pldozv.mongodb.net/?retryWrites=true&w=majority
*/
const mongodbURL = "mongodb://localhost:27017";

/**
 * Step-2: Create a MongoDB Client
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
 * 1. Connect to MongoDB
 * 2. Create your db 
 * 3. Create your collections
 * 4. Create your documents
*/
const connectDB = async () => {
  try {
    /**
     * 1. Connect to MongoDB
    */
    await client.connect();
    console.log("MongoDB Connected successfully");

    /**
     * 2. Create your db (school)
    */
    const database = client.db("masynctech");

    /**
     * 3. Create your collections:
     *    > students
     *    > books
    */
    const students = database.collection("students");
    const books = database.collection("books");

    /**
     * 4. Create your documents:
     *    a. Insert One Document    (Create)
     *    b. Insert Many Documents  (Create)
     *    c. Read Documents         (Read)
     *    d. Update Documents       (Update)
     *    e. Delete Documents       (Delete)
     *    f. Bulk Write Operations  (Create)
     *    g. Data Types Operations
    */

    /**
     * 4.a. Create Document (any student) - insertOne
     * 
     *      const result = await students.insertOne({
     *        name: "Agnes",
     *        age: 20,
     *        subjects: ["Math", "Physics"],
     *      });
     *      console.log(result);
    */


    /**
     * 4.b. Create Many Documents (any student) - insertMany
     * 
     *      const results = await students.insertMany([
     *        {
     *          name: "John",
     *          age: 26,
     *          subjects: ["Chemistry", "Biology"],
     *        },
     *      ]);
     *      console.log(results);
     *
     *      const results = await students.insertMany([
     *        {
     *          name: "John",
     *          age: 26,
     *          grade: "B",
     *          pass: false,
     *          subjects: ["Chemistry", "Biology"],
     *        },
     *        {
     *          name: "Joseph",
     *          grade: "B",
     *          pass: false,
     *          age: 30,
     *          subjects: ["Chemistry1", "Biology1"],
     *        },
     *        {
     *          name: "Prince",
     *          grade: "C",
     *          pass: true,
     *          age: 30,
     *          subjects: ["Chemistry1", "Biology1"],
     *        },
     *      ]);
     *      console.log(results);
    */

    /**
     * 4.c. Read Operation (any student) - find()
     *      The find() method is used to retrieve data from database:
     *      > Reads all documents from a collection
     *      > Can filter to find specific documents
     *      > Most basic way to fetch information from database
     *      
     *      Important: find() doesn't directly return documents, it returns a
     *      cursor. But what is a cursor?
     *      > A cursor is like a pointer that points to the list of documents
     *      > To directly access documents, we need to convert cursor to an 
     *        array.
     *      
     *      That's why we use toArray():
     *      > Converts cursor into a normal JavaScript array
     *      > After conversion to array, we can easily work with the data
     *      > But be careful - if there are too many documents, it will use 
     *        more memory
     * 
     *      const resultsCursor = students.find();
     *      const results = await resultsCursor.toArray();
     *      console.log(results);
    */

    /**
     * 4.d. Read Operation (any student) - findOne()
     *      The findOne() method is used to retrieve a single document from a collection:
     *      > Reads a single document from a collection
     *      > Can filter to find a specific document
     *      > Most basic way to fetch a single document from database
     * 
     *        const result = await students.findOne({
     *          age: 20,
     *        });
     *        console.log(result);
    */

    /**
     * 4.e. Update Operation (any student) - updateOne()
     *      The updateOne() method is used to update a single document in a 
     *      collection:
     *      > Updates a single document in a collection
     *      > Can filter to find a specific document
     *      > Most basic way to update a single document in database
     * 
     *      const result = await students.updateOne(
     *        { name: "Agnes" },
     *        { $set: { name: "Alice" } }
     *      );
     *      console.log(result);
    */

    /**
     * 4.f. Update Operation (any student) - updateMany()
     *      The updateMany() method is used to update multiple documents in a
     *      collection:
     *      > Updates multiple documents in a collection
     *      > Can filter to find specific documents
     *      > Most basic way to update multiple documents in database
     * 
     *      const result = await students.updateMany(
     *        { grade: "B" },
     *        { $set: { pass: true } }
     *      );
     *      console.log(result);
    */


    /**
     * 4.g. Update Operation (any student) - findOneAndUpdate()
     *      The findOneAndUpdate() method is used to update a single document
     *      in a collection:
     *      > Updates a single document in a collection
     *      > Can filter to find a specific document
     *      > Returns the original document before update
     *      > Useful when you need the document data before updating
     * 
     *      const result = await students.findOneAndUpdate(
     *        { name: "Emmanuel" },
     *        { $set: { name: "Emmanuel2" } }
     *      );
     *      console.log(result);
    */

    /**
     * 4.h. Difference between updateOne and findOneAndUpdate:
     * 
     * updateOne:
     * - Sirf update karta hai document ko
     * - Returns success/failure status
     * - Thoda fast hota hai kyunki document return nahi karta
     * 
     * findOneAndUpdate:
     * - Update karne ke saath original document return bhi karta hai
     * - Useful jab aapko pehle wala data bhi chahiye
     * - Thoda slow hai kyunki document find aur return bhi karta hai
     * 
     * Example: Agar aapko student ka grade update karna hai
     * - updateOne use karo agar sirf update karna hai
     * - findOneAndUpdate use karo agar purana grade bhi dekhna hai
    */

    /**
     * 4.i. Delete Operation (any student) - deleteOne()
     *      The deleteOne() method is used to delete a single document from a
     *      collection:
     *      > Deletes a single document from a collection
     *      > Can filter to find a specific document
     *      > Most basic way to delete a single document from database
     * 
     *      const result = await students.deleteOne({
     *        name: "Emmanuel2",
     *      });
     *      console.log(result);
    */

    /**
     * 4.j. Delete Operation (any student) - deleteMany()
     *      The deleteMany() method is used to delete multiple documents from a
     *      collection:
     *      > Deletes multiple documents from a collection
     *      > Can filter to find specific documents
     *      > Most basic way to delete multiple documents from database
     * 
     *      const result = await students.deleteMany({
     *        grade: "B",
     *      });
     *      console.log(result);
    */

    /**
     * 4.k. Delete Operation (any student) - findOneAndDelete()
     *      The findOneAndDelete() method is used to delete a single document
     *      from a collection:
     *      > Deletes a single document from a collection
     *      > Can filter to find a specific document
     *      > Most basic way to delete a single document from database
     * 
     *      const result = await students.findOneAndDelete({
     *        name: "Prince",
     *      });
     *      console.log(result);
    */

    /**
     * 4.l. Difference between deleteOne and findOneAndDelete:
     * 
     * 4.l.a. deleteOne:
     * - Sirf delete karta hai document ko
     * - Returns success/failure status
     * - Thoda fast hota hai kyunki document return nahi karta
     * 
     * 4.l.b. findOneAndDelete:
     * - Delete karne ke saath original document return bhi karta hai
     * - Useful jab aapko pehle wala data bhi chahiye
     * - Thoda slow hai kyunki document find aur return bhi karta hai
     * 
     * Example: Agar aapko student delete karna hai
     * - deleteOne use karo agar sirf delete karna hai
     * - findOneAndDelete use karo agar purana data bhi dekhna hai
    */

    /**
     * 4.m. Bulk Write Operations (any student) - bulkWrite()
     *      The bulkWrite() method is used to perform multiple write operations
     *      in a single request:
     *      > Performs multiple write operations in a single request
     *      > Can perform insert, update, and delete operations
     *      > Most basic way to perform multiple write operations in database
     * 
     *      const bulkWriteOperations = [
     *        
     *        // a. Creation stage
     *        {
     *          insertOne: {
     *            document: {
     *              name: "John",
     *              age: 20,
     *              grade: "A",
     *            },
     *          },
     *        },
     * 
     *        // b. update stage
     *        {
     *          updateOne: {
     *            filter: { name: "John" },
     *            update: { $set: { grade: "B" } },
     *          },
     *        },
     * 
     *        // c. delete stage
     *        {
     *          deleteOne: {
     *            filter: { name: "John" },
     *          },
     *        },
     *      ];
     * 
     *      const result = await students.bulkWrite(bulkWriteOperations);
     *      console.log(result);
    */


    /**
     * 4.n. How to Use Different Data Types in MongoDB:
     *      > MongoDB supports various data types that help you store your 
     *        data effectively:
     * 
     * 4.n.a. Basic Data Types:
     *        - String: For text data like "Hello World"
     *        - Number: For integer or decimal numbers
     *        - Boolean: For true/false values
     *        - Date: For dates and timestamps
     * 
     * 4.n.b. Complex Data Types:
     *        - Object/Document: For nested data structures
     *        - Array: For ordered lists of multiple values
     *        - ObjectId: For unique document identifiers
     *        - Decimal128: For high precision decimal numbers
     * 
     * 4.n.c. Special Data Types:
     *        - Null: For empty/missing values
     *        - Binary Data: For storing images/files
     *        - Regular Expression: For pattern matching
    */
    const result = await books.insertOne({
      _id: new ObjectId(), //object
      title: "To Kill a Mockingbird", //string
      author: {
        firstname: "Harper", //Embeded //string'
        lastname: "Lee",
      },
      isAvailable: true, //Boolean
      price: Decimal128.fromString("10.99"), //Decimal 128
      tags: ["Classic", "Literature"], //Array
      ratings: [4.5, 4.0, 5.0], //Array of doubles
      publisher: {
        name: "JB Lippicott",
        founded: "1982",
        isActive: true, // Boolean
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Run database function
*/
connectDB();

/**
 * Start the server
*/
app.listen(PORT, console.log(`The server is up and running on port ${PORT}`));
