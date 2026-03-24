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
    strict: false,
    deprecationErrors: true,
  },
});


/**
 * Step-3: Connect to the database
*/
const connectDB = async () => {
  try {

    /**
     * a. Connect to the database
    */
    await client.connect();
    console.log("MongoDB Connected successfully");

    /**
     * b. Create your db (school)
    */
    const database = client.db("masynctech");

    /**
     * c. Create Collections:
     *    > Collections are like tables in a relational database
    */
    const employees = database.collection("employees");
    const books = database.collection("books");
    const students = database.collection("students");

    /**
     * d. Insert employeesDocs documents:
     *    const employeesDocs = [
     *      { name: "Alice", age: 25, department: "HR" },
     *      { name: "Bob", age: 30, department: "Finance" },
     *      { name: "Charlie", age: 35, department: "IT" },
     *      { name: "David", age: 40, department: "Operations" },
     *      { name: "Eva", age: 45, department: "IT" },
     *    ];
     *    const result = await employees.insertMany(employeesDocs);
     *    console.log(result);
    */

    /**
     * e. Insert booksDocs documents:
     * 
     *    const booksDocs = [
     *      {
     *        title: "To Kill a Mockingbird",
     *        author: "Harper Lee",
     *        year: 1960,
     *        genre: "Dram",
     *      },
     *      {
     *        title: "The 1984",
     *        author: "Geaorge Orwell",
     *        year: 1949,
     *        genre: "Dystopian",
     *      },
     *
     *      {
     *        title: "The Catcher in the Rye",
     *        author: "JD",
     *        year: 1951,
     *        genre: "Drama",
     *      },
     *      {
     *        title: "The Brave World",
     *        author: "Huxley",
     *        year: 1932,
     *        genre: "Dysptopian",
     *      },
     *      {
     *        title: "The Hobbit",
     *        author: "J.R.R",
     *        year: 1937,
     *        genre: "Fantasy",
     *      },
     *    ];
     *    const result = await books.insertMany(booksDocs);
     *    console.log(result);
    */


    /**
     * f. Querying the database + Comparison Operators:
     *    > Querying is the process of retrieving data from the database
     *    > Querying is done using the find() method
    */

    /**
     * g. Comparison Operators:
     *    > $gt: Greater than
     *      - It is used to query documents where the value of the field is 
     *        greater than the value specified in the query.
     * 
     *      const employeesCursor = employees.find({ age: { $gt: 30 } });
     *      const results = await employeesCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $gte: Greater than or equal to
     *      - It is used to query documents where the value of the field is 
     *        greater than or equal to the value specified in the query.
     * 
     *      const employeesCursor = employees.find({ age: { $gte: 30 } });
     *      const results = await employeesCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $ne: Not equal to
     *      - It is used to query documents where the value of the field is 
     *        not equal to the value specified in the query.
     * 
     *      const employeesCursor = employees.find({ age: { $ne: 40 } });
     *      const results = await employeesCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $lt: Less than
     *      - It is used to query documents where the value of the field is 
     *        less than the value specified in the query.
     * 
     *      const employeesCursor = employees.find({ age: { $lt: 40 } });
     *      const results = await employeesCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $lte: Less than or equal to
     *      - It is used to query documents where the value of the field is 
     *        less than or equal to the value specified in the query.
     * 
     *      const employeesCursor = employees.find({ age: { $lte: 40 } });
     *      const results = await employeesCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $nin: Not in
     *      - It is used to query documents where the value of the field is 
     *        not in the array specified in the query.
     * 
     *      const employeesCursor = employees.find({ age: { $nin: [25, 45, 30] } });
     *      const results = await employeesCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $multiple conditions:
     *      - It is used to query documents where the value of the field is 
     *        greater than the value specified in the query and less than or equal to the value specified in the query.
     * 
     *      const employeesCursor = employees.find({ age: { $gt: 30, $lte: 45 } });
     *      const results = await employeesCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $or: Or
     *      - Used when we need any one of the conditions to be true
     *      - For example: Either the genre should be Drama OR the year should
     *        be less than 1950
     * 
     *      const booksCursor = books.find({
     *        $or: [{ genre: "Drama" }, { year: { $lt: 1950 } }],
     *      });
     *      const results = await booksCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $and: And
     *      - Used when we need all the conditions to be true
     *      - For example: Both the genre should be Drama AND the year should
     *        be greater than 1930
     * 
     *      const booksCursor = books.find({
     *        $and: [{ genre: "Dystopian" }, { year: { $gt: 1930 } }],
     *      });
     *      const results = await booksCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $nor: Nor
     *      - Used when we need none of the conditions to be true
     *      - For example: Neither the genre should be Drama NOR the year 
     *        should be greater than 1930
     * 
     *      const booksCursor = books.find({
     *        $nor: [{ genre: "Drama" }, { year: { $gt: 1930 } }],
     *      });
     *      const results = await booksCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
     * 
     *    > $not: Not
     *      - Used when we need to exclude the value specified in the query
     *      - For example: The year should not be less than 1950
     * 
     *      const booksCursor = books.find({ year: { $lt: 1950 } })  
     *      const results = await booksCursor.forEach((doc) => console.log(doc));
     *      console.log(results);
    */

    /**
     *    const studentsDocs = [
     *      {
     *        name: "Alice",
     *        age: 25,
     *        grades: [90, 85, 88],
     *        sports: ["soccer", "basketbal"],
     *      },
     *      {
     *        name: "Bob",
     *        age: 30,
     *        grades: [70, 75, 80],
     *        sports: ["basketbal"],
     *      },
     *      {
     *        name: "David",
     *        age: 28,
     *        grades: [80, 90, 92],
     *        sports: ["basketbal", "soccer", "tennis"],
     *      },
     *      {
     *        name: "Prince",
     *        age: 25,
     *        grades: [85],
     *        sports: [],
     *      },
     *      {
     *        name: "Emily",
     *        age: 27,
     *        grades: [90, 95],
     *        sports: ["soccer", "tennis"],
     *      },
     *    ];
     *    const result = await students.insertMany(studentsDocs);
     *    console.log(result);
     * 
     * 
     * h. Array Queries Operators:
     *   - It is used to query documents where the value of the field is an
     *     array and the query is applied to the array elements.
     * 
     *    > $in: In
     *      - Used when we need to query documents where the value of the 
     *        field is in the array specified in the query.
     *      - For example: The sport should be soccer or tennis
     * 
     *       const studentsCursor = students.find({
     *         sports: { $in: ["soccer", "tennis"] },
     *       });
     *       const results = await studentsCursor.forEach((doc) => console.log(doc));
     *       console.log(results);
     * 
     * 
     *    > $all: All
     *      - Used when we need to query documents where the value of the 
     *        field is in the array specified in the query.
     *      - For example: The sport should be soccer and tennis
     * 
     *       const studentsCursor = students.find({
     *         sports: { $all: ["soccer", "tennis"] },
     *       });
     *       const results = await studentsCursor.forEach((doc) => console.log(doc));
     *       console.log(results);
     * 
     *    > $size: Size
     *      - Used when we need to query documents where the value of the 
     *        field is an array and the size of the array is specified in the query.
     *      - For example: The size of the array should be 1
     * 
     *       const studentsCursor = students.find({ grades: { $size: 1 } });
     *       const results = await studentsCursor.forEach((doc) => console.log(doc));
     *       console.log(results);
     * 
     *    > $elemMatch: ElemMatch
     *      - Used when we need to query documents where the value of the 
     *        field is an array and the query is applied to the array elements.
     *      - For example: The grade should be greater than 90 and less than 95
     * 
     *       const studentsCursor = students.find({
     *         grades: { $elemMatch: { $gt: 90, $lt: 95 } },
     *       });
     *       const results = await studentsCursor.forEach((doc) => console.log(doc));
     *       console.log(results);
    */

    /**
     * i. Searching Operators:
     *    > $regex: Regex (String Pattern Matching)
     *      - We use this when we need to search for specific patterns in text
     *      - For example:
     *        > How a word starts ("Har" -> matches "Harry", "Harsh")
     *        > How a word ends ("ing" -> matches "Running", "Walking")
     *        > Or if a word exists anywhere in the text (does "the" exist?)
     *      - Simple example: If you have a list of books and you want to find
     *        all books that have "The" in their title
     *        ("The Alchemist", "Lord of The Rings", etc.)
     * 
      *      const studentsCursor = books.find({
      *        title: { $regex: /THE/, $options: "i" },
      *      });
      *      const studentsCursor = books.find({
      *        title: { $regex: /n/, $options: "i" },
      *      });
      *      const results = await studentsCursor.forEach((doc) => console.log(doc));
      *      console.log(results);
      * 
      * 
      *    > $text: Text Search Operator
      *      - Used for full-text search functionality in MongoDB
      *      - Requires creating a text index before using
      *      - Case-insensitive by default
      *      
      *      Main features:
      *      # $search - For searching words
      *         - Single word: "book"
      *         - Multiple words: "harry potter" 
      *         - Exact phrase: "\"harry potter\""
      *      
      *      # $language - Supports different languages
      *         Example: { $text: { $search: "book", $language: "english" } }
      *      
      *      # $caseSensitive - For case sensitivity
      *         Example: { $text: { $search: "Book", $caseSensitive: true } }
      *      
      *      # $diacriticSensitive - For handling accent marks
      *         Example: { $text: { $search: "café", $diacriticSensitive: true } }
      *
      * 
      *      Example usage:
      *      # 1. What is an Index? (Real Life Example)
      *           Think of a library:
      *           - Without index: Need to check every book to find one
      *           - With index: Go directly to 'H' section for books starting
      *             with 'H' (title starts with 'H')
      *      
      *      # 2. Index in MongoDB:
      *           - Without index: MongoDB checks every document
      *           - With index: MongoDB jumps straight to relevant documents
      *           - Result: Searches become 100x faster!
      *      
      *      # 3. Creating Text Index:
      *      const indexCreated = await books.createIndex({ 
      *        title: "text",       // Enable text search on "title" field
      *        description: "text"  // Enable text search on "description" field
      *      });
      *      console.log("Index created:", indexCreated); // Sample output: "title_text_description_text"
      *       
      *      # 4. Basic text search
      *      const basicSearch = books.find({ 
      *        $text: { 
      *          $search: "kill mockingbird",
      *          $caseSensitive: false,
      *          $language: "english"
      *        } 
      *      });
      *
      *      # 5. Print results
      *      const results = await basicSearch.forEach(doc => console.log(doc));
      *      console.log("Search complete:", results);
     */

    /**
     * j. Sorting Operators:
     *    > $sort: Sort documents
     *      - 1 for ascending order, -1 for descending order
     *      - Multiple fields mein sort kar sakte hain
     *      - Performance ke liye index use karein
     * 
     *      Case 1: Basic sorting by single field
     *      const employeesCursor = employees.find().sort({ age: 1 });
     * 
     *      Case 2: Multiple fields sorting
     *      const employeesCursor = employees.find().sort({ 
     *        department: 1,    // Pehle department ke hisaab se
     *        salary: -1        // Phir salary ke hisaab se descending
     *      });
     *
     *      Case 3: Sorting with text fields
     *      const nameSort = employees.find().sort({ 
     *        "name.lastName": 1,  // Last name se sort
     *        "name.firstName": 1  // Same last name ho toh first name se
     *      });
    */

    /**
     * k. Limit Operators:
     *    > $limit: Results ko limit karein  
     *      - Kitne documents chahiye wo specify karein
     *      - Sort ke saath use karne pe top N results milte hain
     * 
     *      Case 1: Simple limit
     *      const first10 = employees.find().limit(10);
     *
     *      Case 2: Top performers
     *      const topEmployees = employees.find()
     *        .sort({ performance: -1 })
     *        .limit(5);
     *
     *      Case 3: Department wise top 3
     *      const topByDept = employees.aggregate([
     *        { $sort: { performance: -1 } },
     *        { $group: { 
     *          _id: "$department",
     *          topEmployees: { $push: "$$ROOT" }
     *        }},
     *        { $project: {
     *          topEmployees: { $slice: ["$topEmployees", 3] }
     *        }}
     *      ]);
    */
   
    /**
     * l. Skip Operators:
     *    > $skip: Operator to skip documents
     *      # What does it do?
     *        - Skips a specified number of documents when retrieving results
     *          from database
     *      
     *      # Where is it used?
     *        - Mainly used for implementing pagination
     *        - Like how Instagram/Facebook loads posts page by page
     *      
     *      # How to use it?
     *        - Skip + Limit combo is most common:
     *            * .skip(10) = skip first 10 documents
     *            * .limit(5) = then show 5 documents
     *      
     *      Example:
     *      - If you want to show 10 posts per page:
     *        Page 1 = skip(0).limit(10)  // first 10 posts
     *        Page 2 = skip(10).limit(10) // next 10 posts
     *        Page 3 = skip(20).limit(10) // next 10 posts
     * 
     * 
     *      Case 1: Basic pagination
     *      const pageSize = 10;
     *      const pageNum = 2;
     *      const page2 = employees.find()
     *        .skip((pageNum - 1) * pageSize)
     *        .limit(pageSize);
     *
     * 
     *      Case 2: Sorted pagination
     *      const sortedPage = employees.find()
     *        .sort({ joinDate: -1 })
     *        .skip(20)
     *        .limit(10);
     *
     * 
     *      Case 3: Filtered pagination
     *      const filteredPage = employees.find({ 
     *        department: "Engineering",
     *        status: "active" 
     *      })
     *      .sort({ salary: -1 })
     *      .skip(5)
     *      .limit(5);
     * 
     *      const results = await filteredPage.forEach(doc => console.log(doc));
    */

  } catch (error) {
    console.log(error);
  }
};

/**
 * Run the function
 */
connectDB();

/**
 * Start the server
 */
app.listen(PORT, console.log(`The server is up and running on port ${PORT}`));
