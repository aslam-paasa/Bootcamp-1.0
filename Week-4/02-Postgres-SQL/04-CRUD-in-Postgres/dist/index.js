"use strict";
/**
 * Agenda:
 * - We'll learn
 *   - SQL vs NoSQL
 *   - How to create PostgreSQL Databases
 *   - How to do CRUD on them
 *   - Advance Topics: Relationships, Joins, Transactions etc.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Step-1: Types of Databases
 * There are a few types of databases, all serve different types of use-cases:
 * 1. NoSQL Databases:
 *    a. Store data in a schema-lesss fashion. Extremely lean and fast way to
 *       store data.
 *    b. Examples: MongoDB, Firebase, etc.
 *
 * 2. Graph Databases:
 *    a. Data is stored in the form of a graph. Specially useful in cases
 *       where relationships need to be stored (social networks)
 *    b. Examples: Neo4j
 *
 * 3. Vector Databases:
 *    a. Stores data in the form of vectors
 *    b. Useful in Machine Learning
 *    c. Examples: Faiss, Pinecone, etc.
 *
 * 4. SQL Databases:
 *    a. Stores data in the form of rows
 *    b. Most full stack applications will use this
 *    c. Examples: MySQL, PostgreSQL, etc.
*/
/**
 * Step-2: Why not NoSQL
 * You might've used MongoDB:
 * - It's schema-less properties make it ideal to for bootstrapping a
 *   project fast.
 * - But as your app grows, this property makes it very easy for data to
 *   get corrupted.
*/
/**
 * What is schemaless?
 * - Different rows can have different schema (keys/types).
 * - Example:
 *
 *   a. Case-1: Correct
 *      _id: ObjectId('65b3f3319e01786d275501c8')
 *      userId: 65b3f3319e01786d275501c8
 *      balance: 5885.875967139374
 *      __v: 0
 *
 *   b. Case-2: Incorrect
 *      _id: ObjectId('65b3f3319e01786d275501c8')
 *      userId: 65b3f3319e01786d275501c8
 *      __v: 0
 *      amountBalance: 720.3759487457523
 *
 *   c. Case-3: Incorrect
 *      _id: ObjectId('65b3f3319e01786d275501c8')
 *      userId: 65b3f3319e01786d275501c8
 *      balance: "harkirat"
 *      __v: 0
 *
 * Problem:
 * 1. Can lead to inconsistent database
 * 2. Can cause runtime errors
 * 3. Is too flexible for an app that needs strictness.
 *
 * Mongoose Schema Solution:
 * - For Case-2: Mongoose schema would enforce 'balance' field name,
 *   preventing incorrect 'amountBalance' field
 * - For Case-3: Mongoose schema would enforce number type for balance,
 *   preventing string value "harkirat"
 * - Example schema:
 *   {
 *     userId: { type: Schema.Types.ObjectId, required: true },
 *     balance: { type: Number, required: true }
 *   }
 *
 * Note: You might think that mongoose does add strictness to the codebase
 *       because we used to define a schema there. That strictness is
 *       present at the Node.js level, not at the DB level. You can still
 *       put an erroneous data in the database that doesn't follow that
 *       schema.
 *
 * Upsides:
 * 1. Can move very fast.
 * 2. Can change schema very easily.
 *
 * Downsides:
 * 1. Data Integrity Issues:
 *    - Without strict schema enforcement, data can become inconsistent over time
 *    - Different teams/developers might store same data in different formats
 *    - Makes data aggregation and reporting extremely difficult
 *
 * 2. Performance Problems:
 *    - Varying document structures cause memory fragmentation
 *    - Indexes become less effective as data structure varies
 *    - Query optimization becomes challenging with inconsistent data shapes
 *
 * 3. Maintenance Nightmares:
 *    - Hard to track what shape of data exists in production
 *    - Data migrations become complex without clear schema
 *    - Debugging production issues takes longer
 *
 * 4. Application Level Issues:
 *    - More defensive coding needed to handle varying data shapes
 *    - Higher chance of runtime errors
 *    - Increased testing complexity to cover all data variations
*/
/**
 * Step-3: Why SQL?
 * SQL databases have a strict schema. They require you to:
 * 1. Define your schema
 * 2. Put in data that follows that schema
 * 3. Update the schema as your app changes and perform migrations.
 *
 * So there are 4 parts when using a SQL database (not connecting it to
 * Node.js, just running it and putting data in it)
 * 1. Running the database
 * 2. Using a library that let's you connect and put data in it.
 * 3. Creating a table and defining it's schema.
 * 4. Running queries on the database to interact with the data.
 *    (Insert, Update, Delete)
*/
/**
 * Step-4: Creating a database
 * You can start a PostgresSQL database in a few ways:
 * 1. Using NeonDB
 * 2. Using docker locally
 * 3. Using docker on windows
 *
 * Note: The connection string is similar to the string we have in mongoose.
*/
/**
 * Connection String:
 * - postgressql://username:password@host:port/databaseName
 *
 * Example:
 * - postgressql://postgres:postgres@localhost:5432/postgres
*/
/**
 * Step-5: Using a library that let's you connect and put data in it:
 * 1. psql:
 * - psql is a terminal-based front-end to PostgreSQL.
 * - It provides an interactive command-line interface to the PostgreSQL
 *   (or TimescaleDB) database.
 * - With psql, you can type in queries interactively, issue them to
 *   PostgreSQL, and see the query results.
 *
 * How to connect to the database:
 * - psql comes bundled with postgressql.
 * - You don't need it for this tutorial.
 * - We will directly be communicating with the database from Node.js
 *
 * Ex: psql -h p-broken-frost-69135494.us-east-2.aws.neon.tech -d database1 -U 100xdevs
 *
 * 2. pg:
 * - pg is a Node.js library that you can use in the backend app to store
 *   data in the Postgres DB(similar to mongoose).
 * - We will be installing this eventually in our app.
*/
/**
 * Step-6: Creating a table and defining it's schema:
 * Tables in SQL:
 * - A single database can have multiple tables inside. Think of them as
 *   collections in a MongoDB database.
 *
 * - Example: SQL Database Vs NoSQL Database
 *   +---------------------------------------------------+
 *   | +-------------+  +------------+  +--------------+ |      +----------------+
 *   | | Users Table |  | Todos Table|  | Admins Table | |      | V paytm        |
 *   | |             |  |            |  |              | | Vs   +----------------+
 *   | |             |  |            |  |              | |      |   - accounts   |
 *   | |             |  |            |  |              | |      |   - users      |
 *   | +-------------+  +------------+  +--------------+ |      +----------------+
 *   +---------------------------------------------------+
 *
 * - Until now, we have a database that we can interact with.
 * - The next step in case of postgres is to define the schema of your
 *   tables.
 *
 * - SQL stands for Structured Query Language. It is a language in which
 *   you can describe what/how you want to put data in the database.
 * - Example:
 *   CREATE TABLE users (
 *       id SERIAL PRIMARY KEY,
 *       username VARCHAR(50) UNIQUE NOT NULL,
 *       email VARCHAR(255) UNIQUE NOT NULL,
 *       password VARCHAR(255) NOT NULL,
 *       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 *   );
 *
 * There are a few parts of this SQL statement, let's decode them one by one:
 * 1. CREATE TABLE user:
 *    - This command initiates the creation of a new table in the database
 *      named 'users'.
 * 2. id SERIAL PRIMARY KEY:
 *    a. id:
 *       - The name of the first column in the users table, typically used
 *         as a unique identifier for each row(user). Similar to _id in
 *         MongoDB.
 *    b. SERIAL:
 *       - A PostgreSQL-specific data type for creating an auto-incrementing
 *         integer.
 *       - Every time a new row is inserted, this value automatically
 *         increments, ensuring each user has a unique id.
 *    c. PRIMARY KEY:
 *       - This constraint specifies that the id column is the primary key
 *         for the table, meaning it uniquely identifies each row.
 *       - Values in this column must be unique and not null.
 * 3. email VARCHAR(50) UNIQUE NOT NULL:
 *    a. email:
 *       - The name of the second column, intended to store the user's username.
 *    b. VARCHAR(50):
 *       - A variable character string data type that can store up to 50
 *         characters.
 *       - It's used here to limit the length of the username.
 *    c. UNIQUE:
 *       - This constraint ensures that all values in the username column are
 *         unique across the table.
 *       - No two users can have the same username.
 *    d. NOT NULL:
 *       - This constraint prevents null values from being inserted into the
 *         username column.
 *       - Every row must have a username value.
 *    e. password VARCHAR(255) NOT NULL:
 *       - Same as above, can be non-unique.
 *    f. created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP:
 *       # created_at:
 *         - The name of the fifth column, intended to store the timestamp
 *           when the user was created.
 *       # TIMESTAMP WITH TIME ZONE:
 *         - This data type stores both a timestamp and a time zone, allowing
 *           for the precise tracking of when an event occurred, regardless
 *           of the user's or server's time zone.
 *       # DEFAULT CURRENT_TIMESTAMP:
 *         - This default value automatically sets the created_at column to the
 *           date and time at which the row is inserted into the table, using
 *           the current timestamp of the database server.
 *
 * Note: If you have access to a database right now, try running this
 *       command to create a simple table in there.
*/
/**
 * Step-7: Interacting with the database:
 * There are 4 things you'd like to do with a database:
 * 1. Insert
 * 2. Update
 * 3. Delete
 * 4. Select
 *
 *
 * 1. Insert:
 *    INSERT INTO users (username, email, password)
 *    VALUES ('username_here', 'user@example.com', 'user_password');
 *
 * Note: You didn't have to specify the id because it auto-increments.
 *
 * 2. Update:
 *    UPDATE users
 *    SET password = 'new_password'
 *    WHERE email = 'user@example.com';
 *
 * 3. Delete:
 *    DELETE FROM users
 *    WHERE id = 1;
 *
 * 4. Select:
 *    SELECT * FROM users
 *    WHERE id = 1;
 *
 * Try running all 4 of these in your terminal if you have psql installed
 * locally. If not, that's fine, we'll eventually be doing these through
 * the pg library.
*/
/**
 * Step-8: How to do queries from a Node.js app?
 * In the end, postgres exposes a protocol that someone needs to talk to
 * be able to send these commands (update, delete) to the database.
 *
 * psql is one of such library that takes commands from your terminal and
 * sends it over to the database.
 *
 * To do the same in a Node.js, you can use one of many Postgres clients.
 *
 * Note: pg library
 * 1. https://www.npmjs.com/package/pg : npm i pg
 * 2. Non-blocking PostgreSQL client for Node.js
 * 3. Documentation: https://node-postgres.com/
*/
/**
 * Command:
 * 1. npm init -y
 * 2. npm install typescript
 * 3. npx tsc --init
 *    - Go to tsconfig.json:
 *      - "rootDir": "./src",
 *      - "outDir": "./dist"
 * 4. Create a src folder
 * 5. Create a index.ts file
 * 6. npm install pg
 * 7. npm install @types/pg
 * 8. package.json:
 *    - "scripts": {
 *        "dev": "tsc && node dist/index.js"
 *      }
 *    - This will compile the typescript code and run the javascript code.
*/
/**
 * Connecting to postgres: (Same as mongoose)
*/
const pg_1 = require("pg");
/**
 * 1. Database Connection String:
*/
const client = new pg_1.Client({
    connectionString: "postgresql://neondb_owner:npg_ouM0yCUPX5wb@ep-little-bird-a1mlb6dz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});
function connectToNeonDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /**
             * 2. Connect to the database:
            */
            yield client.connect();
            console.log('Connected to NeonDB');
            /**
             * 3. Write a fn to create a users table in the database:
            */
            // const createUsersTable = await client.query(` 
            //     CREATE TABLE users (
            //       id SERIAL PRIMARY KEY,
            //       username VARCHAR(50) UNIQUE NOT NULL,
            //       email VARCHAR(255) UNIQUE NOT NULL,
            //       password VARCHAR(255) NOT NULL
            //     );
            //   `)
            // console.log(createUsersTable);
            /**
             * 4. Insert data into the users table:
             *    This is an insecure way to store data in your tables.
             *    When you expose this functionality, eventually via HTTP, someone
             *    can do SQL Injection to get access to your data/delete your data.
             *
             * Solution:
             * - Use parameterized queries.
             * - Use a library like pg-promise or node-postgres.
            */
            // const insertData = await client.query(`
            //   INSERT INTO users (username, email, password)
            //   VALUES ('username_here', 'user@example.com', 'user_password');
            // `)
            // console.log(insertData);
            // const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
            // const values = ['black widow', 'blackwidow@gmail.com', 'blackwidow123'];
            // const res = await client.query(insertQuery, values);
            // console.log('Insertion success:', res);
            /**
             * 5. Update data in the users table:
            */
            const updateQuery = "UPDATE users SET password = $1 WHERE email = $2";
            const updateValues = ['doctorstrange123', 'doctorstrange@gmail.com'];
            const updateRes = yield client.query(updateQuery, updateValues);
            console.log('Update success:', updateRes);
            /**
             * 5. Query data from the users table:
            */
            const queryData = yield client.query(`
      SELECT * FROM users;
    `);
            console.log(queryData.rows);
        }
        catch (err) {
            console.error('Error during the insertion:', err);
        }
        finally {
            yield client.end();
            console.log('Connection closed');
        }
    });
}
connectToNeonDB();
/**
 * Querying:
 * - const result = await client.query('SELECT * FROM USERS;')
 * - console.log(result)
 *
 *
 * Q. Write a function to create a users table in the database:
 * -  import { Client } from 'pg'
 *
 *    const client = new Client({
 *      connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
 *    })
 *
 *    async function createUsersTable() {
 *      await client.connect()
 *      const result = await client.query(`
 *        CREATE TABLE users (
 *          id SERIAL PRIMARY KEY,
 *          username VARCHAR(50) UNIQUE NOT NULL,
 *          email VARCHAR(255) UNIQUE NOT NULL,
 *          password VARCHAR(255) NOT NULL,
 *          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 *        );
 *      `)
 *      console.log(result)
 *    }
 *
 *    createUsersTable();
*/
/**
 * Step-9: Creating a simple Node.js app:
 * 1. Initialize an empty typescript project:
 *    - npm init -y
 *    - npm tsc --init
 *
 * 2. Change the rootDir and outDir in the tsconfig.json file:
 *    - "rootDir": "./src",
 *    - "outDir": "./dist",
 *
 * 3. Install the pg library and it's types(because we're using TS):
 *    - npm install pg
 *    - npm install @types/pg
 *
 * 4. Create a simple Node.js app that let's you put data:
 *
 *    a. Create a function that let's you insert data into a table.
 *    b. Make it async, make sure client.connect resolves before you do the
 *       insert.
 *     - This is an insecure way to store data in your tables.
 *     - When you expose this functionality, eventually via HTTP, someone
 *       can do SQL Injection to get access to your data/delete your data.
 *
 *    c. More secure way to store data:
 *     - Update the code so you don't put 'user provided fields' in the
 *       SQL string.
 *
 * Solution:
 * - import { Client } from 'pg';
 *
 * - Async function to insert data into a table:
 *   async function insertData(username: string, email: string, password: string) {
 *     const client = new Client({
 *       host: 'localhost',
 *       port: 5432,
 *       database: 'postgres',
 *       user: 'postgres',
 *       password: 'mysecretpassword',
 *     });
 *
 *   try {
 *     - Ensure client connection is established
 *       await client.connect();
 *
 *     - Use parameterized query to prevent SQL injection
 *       const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
 *       const values = [username, email, password];
 *       const res = await client.query(insertQuery, values);
 *       console.log('Insertion success:', res); // Output insertion result
 *     }
 *
 *   catch (err) {
 *       console.error('Error during the insertion:', err);
 *   } finally {
 *       await client.end(); // Close the client connection
 *   }
 * }
 *
 * - Example usage
 *   insertData('username5', 'user5@example.com', 'user_password').catch(console.error);
*/
/**
 * Query Data:
 * Write a function getUser that let's you fetch data from the database
 * given an email as input:
 *
 * Solution:
 * - import { Client } from 'pg';
 *
 * - Async function to get user by email:
 *   async function getUserByEmail(email: string) {
 *     const client = new Client({
 *       host: 'localhost',
 *       port: 5432,
 *       database: 'postgres',
 *       user: 'postgres',
 *       password: 'mysecretpassword',
 *     });
 *
 *     try {
 *       - Ensure client connection is established
 *         await client.connect();
 *
 *       - Use parameterized query to prevent SQL injection
 *         const query = 'SELECT * FROM users WHERE email = $1';
 *         const values = [email];
 *         const result = await client.query(query, values);
 *
 *       - Check if the user exists, if not return null:
 *         if (result.rows.length > 0) {
 *           console.log('User found:', result.rows[0]); // Output user data
 *           return result.rows[0];                      // Return the user data
 *         } else {
 *           console.log('No user found with the given email.');
 *           return null; // Return null if no user was found
 *         }
 *
 *     } catch (err) {
 *       console.error('Error during the query:', err);
 *       throw err;
 *     } finally {
 *       - Close the client connection
 *       await client.end();
 *     }
 *   }
 *
 * - Example usage:
 *   getUser('user5@example.com').catch(console.error);
*/
/**
 * Step-10: Relationships and Transactions:
 *
 */
/**
 * Step-11: Joins:
*/
