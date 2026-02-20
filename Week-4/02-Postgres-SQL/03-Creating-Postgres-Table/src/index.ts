/**
 * 1. Creating a database
 *    > You can start a PostgresSQL database in a few ways:
 *      a. Using NeonDB
 *      b. Using docker locally
 *      c. Using docker on windows
 *    > The connection string is similar to the string we have in 
 *      mongoose: postgressql://username:password@host:port/databaseName
 *    > Example : postgressql://postgres:postgres@localhost:5432/postgres
*/

/**
 * 2. Using a library that let's you connect and put data in it:
 *    a. psql:
 *       > psql is a terminal-based front-end to PostgreSQL. 
 *       > It provides an interactive command-line interface to the 
 *         PostgreSQL (or TimescaleDB) database.
 *       > With psql, you can type in queries interactively, issue them
 *         to PostgreSQL, and see the query results.
 * 
 *    b. How to connect to the database:
 *       > psql comes bundled with postgressql.
 *       > You don't need it for this tutorial.
 *       > We will directly be communicating with the database from Node.js
 *       > Ex: psql -h p-broken-frost-69135494.us-east-2.aws.neon.tech -d database1 -U 100xdevs
 * 
 *    c. pg:
 *       > pg is a Node.js library that you can use in the backend app
 *         to store data in the Postgres DB(similar to mongoose).
 *       > We will be installing this eventually in our app.
*/


/**
 * 3. Creating a table and defining it's schema:
 *    a. Tables in SQL:
 *       > A single database can have multiple tables inside. 
 *       > Think of them as collections in a MongoDB database.
 *       > Ex: SQL Database Vs NoSQL Database
 *         +---------------------------------------------------+     
 *         | +-------------+  +------------+  +--------------+ |      +----------------+
 *         | | Users Table |  | Todos Table|  | Admins Table | |      | V paytm        |
 *         | |             |  |            |  |              | | Vs   +----------------+
 *         | |             |  |            |  |              | |      |   - accounts   |
 *         | |             |  |            |  |              | |      |   - users      |
 *         | +-------------+  +------------+  +--------------+ |      +----------------+
 *         +---------------------------------------------------+
 * 
 *       > Until now, we have a database that we can interact with.
 *       > The next step in case of postgres is to define the schema
 *         of your tables.
 * 
 *    b. Command:
 *       > SQL stands for Structured Query Language. 
 *       > It is a language in which you can describe what/how you want
 *         to put data in the database.
 *       > Example:
 *         CREATE TABLE users (
 *             id SERIAL PRIMARY KEY,
 *             username VARCHAR(50) UNIQUE NOT NULL,
 *             email VARCHAR(255) UNIQUE NOT NULL,
 *             password VARCHAR(255) NOT NULL,
 *             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 *         );
 * 
 *    c. Explanation:
 *       1. CREATE TABLE users:
 *          - Creates a new table named users in the database.
 *       2. id SERIAL PRIMARY KEY:
 *          - id         : Unique ID for each user (like _id in MongoDB)
 *          - SERIAL     : Auto-incrementing (1, 2, 3, ...)
 *          - PRIMARY KEY:
 *            > Must be unique
 *            > Cannot be null
 *            > Used to uniquely identify each row
 *       3. email VARCHAR(50) UNIQUE NOT NULL:
 *          - email      : stores user's email/username
 *          - VARCHAR(50): Max 50 chars
 *          - UNIQUE     : No two users can have the same email
 *          - NOT NULL   : Email is mandatory
 *       4. password VARCHAR(255) NOT NULL:
 *          - Stores user's password (usually hashed)
 *          - NOT NULL  : Password is required
 *          - Not unique: Multiple users can have different passwords
 *       5. created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 *          - created_at               : Stores when the user was created
 *          - TIMESTAMP WITH TIME ZONE : Saves date + time with timezone
 *          - DEFAULT CURRENT_TIMESTAMP: 
 *            > Automatically sets current data & time
 *            > No need to manually insert this value
 * 
 * Note: If you have access to a database right now, try running this 
 *       command to create a simple table in there.
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
    const createUsersTable = await client.query(` 
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `)
    console.log(createUsersTable);
  } catch (error) {
    console.error("Database Error:", error)
  } finally {
    /**
     * 4. Close connection:
     */
    await client.end()
    console.log("🔌 DB connection closed")
  }
}

connectToNeonDB();