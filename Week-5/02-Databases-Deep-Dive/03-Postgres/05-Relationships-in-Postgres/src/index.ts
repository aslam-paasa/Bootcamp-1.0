/**
 * Relationships in SQL:
 * 1. One-to-One
 * 2. One-to-Many
 * 3. Many-to-Many
 * 
 * Ex: Below is the relationship, which means that the Address table is
 *     related to the User table. And when defining the table, we need to
 *     define the relationship.
 * 
 *         Relationships
 *         +------------+  
 *         |  Users     |
 *         +------------+  
 *         |  Address   |
 *         +------------+  
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

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_ouM0yCUPX5wb@ep-little-bird-a1mlb6dz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})

async function connectToNeonDB() {

  try {
    /**
     * 1. Connect to the database:
    */
    await client.connect();
    console.log('Connected to NeonDB');

    /**
     * 2. Create a relationship between the users and address table:
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