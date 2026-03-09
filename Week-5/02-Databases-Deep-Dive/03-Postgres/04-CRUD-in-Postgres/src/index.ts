/**
 * Interacting with the database:
 * > There are 4 things you'd like to do with a database:
 *   a. Insert
 *   b. Update   
 *   c. Delete
 *   d. Select
 * > [Browser]--------> [Backend] ----CRUD----> [Postgres]
*/

/**
 * 
 * 1. Insert:
 *    INSERT INTO users (username, email, password)
 *    VALUES ('username_here', 'user@example.com', 'user_password');
 * 
 * Note: You didn't have to specify the id because it auto-increments.
*/

/**
 * 2. Update:
 *    UPDATE users
 *    SET password = 'new_password'
 *    WHERE email = 'user@example.com';
*/ 

/**
 * 3. Delete:
 *    DELETE FROM users
 *    WHERE id = 1;
*/ 

/**
 * 4. Select:
 *    SELECT * FROM users
 *    WHERE id = 1;
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

import { Client } from 'pg'

/* 1. Database Connection */
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_ouM0yCUPX5wb@ep-little-bird-a1mlb6dz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})

async function connectToNeonDB() {

  try {
    /* 2. Connect to the database */
    await client.connect();
    console.log('Connected to NeonDB');


    /* 3. Create the "users" table (if it doesn't exist) */
    const createUsersTableOne = await client.query(` 
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `)
    console.log(createUsersTableOne);


    /* 4. Insert users safely (parameterized query) */

    const insertData = await client.query(`
      INSERT INTO users (username, email, password)
      VALUES ('username_here', 'user@example.com', 'user_password');
    `)
    console.log(insertData);

    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = ['black widow', 'blackwidow@gmail.com', 'blackwidow123'];
    const res = await client.query(insertQuery, values);
    console.log('Insertion success:', res);


    /**
     * 5. Update data in the users table:
    */
    const updateQuery = "UPDATE users SET password = $1 WHERE email = $2";
    const updateValues = ['doctorstrange123', 'doctorstrange@gmail.com'];
    const updateRes = await client.query(updateQuery, updateValues);
    console.log('Update success:', updateRes);


    /**
     * 5. Query data from the users table:
    */
    const queryData = await client.query(`
      SELECT * FROM users;
    `)
    console.log(queryData.rows);

    /**
     * 6. Delete data from users table:
    */
    const deleteData = await client.query(`
      DELETE FROM users
      WHERE username = 'username_here'
    `)
    console.log('Deleted:', deleteData)


  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

connectToNeonDB();