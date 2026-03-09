/**
 * Agenda:
 * - We'll learn 
 *   - SQL vs NoSQL
 *   - How to create PostgreSQL Databases
 *   - How to do CRUD on them
 *   - Advance Topics: Relationships, Joins, Transactions etc.
*/

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
import { Client } from 'pg'

/**
 * 1. Database Connection String:
*/
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_ouM0yCUPX5wb@ep-little-bird-a1mlb6dz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})

async function connectToNeonDB() {

  try {
    /**
     * 2. Connect to the database:
    */
    await client.connect();
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
    // const updateQuery = "UPDATE users SET password = $1 WHERE email = $2";
    // const updateValues = ['doctorstrange123', 'doctorstrange@gmail.com'];
    // const updateRes = await client.query(updateQuery, updateValues);
    // console.log('Update success:', updateRes);


    /**
     * 6. Query data from the users table:
    */
    // const queryData = await client.query(`
    //   SELECT * FROM users;
    // `)
    // console.log(queryData.rows);


    /**
     * 7. Create a relationship between the users and address table:
     *    a. Create a users table:
     *    b. Create a addresses table:
     *       - user_id field has the reference to the users table's id field.
     *       - ON DELETE CASCADE means that if a user-X is deleted, all their
     *         linked addresses will also be deleted.
    */

    const createUsersTable = await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    const createAddressTable = await client.query(`
      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `)

    console.log(createUsersTable);
    console.log(createAddressTable);

  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

connectToNeonDB();