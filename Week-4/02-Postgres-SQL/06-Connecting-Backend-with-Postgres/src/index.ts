/**
 * 
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


import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

/**
 * 1. Create Postgres Client:
*/
const pgClient = new Client({
  connectionString: "postgresql://neondb_owner:npg_ouM0yCUPX5wb@ep-little-bird-a1mlb6dz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})


/**
 * 2. Init DB + Start Server
 *    > Create users table
 *    > Create addresses table with foreign key reference
*/
async function createDatabase() {
  try {
    /**
     * 2.a. Connect once:
    */
    await pgClient.connect();
    console.log("Connected to database");

    /**
     * 2.b. Creating Tables
    */
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("Database tables created successfully");

    app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
  } catch (err) {
    console.error("Failed to start app:", err);
    process.exit(1);
  }
}

createDatabase();


/**
 * 3. Signup Route (without Transaction):
*/
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const city = req.body.city;
  const country = req.body.country;
  const street = req.body.street;
  const pincode = req.body.pincode;

  try {

    /**
     * Step-1: Insert user
     * > RETURNING id is IMPORTANT
     * > This gives us the newly created user's id
     * > Example: 
     *   - userResult.rows[0].id -> 5
     *   - This address belongs to user with id = 5
    */
    const userInsertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;

    const userResult = await pgClient.query(userInsertQuery, [
      username,
      email,
      password,
    ]);

    const userId = userResult.rows[0].id;

    /**
     * Step-2: Insert address using user_id
     * > We pass userId = 5
     *   -  Foreign Key match
     *   - Address linked to correct user
     *   - Clean relational data
    */
    const addressInsertQuery = `
      INSERT INTO addresses (user_id, city, country, street, pincode)
      VALUES ($1, $2, $3, $4, $5);
    `;

    await pgClient.query(addressInsertQuery, [
      userId,
      city,
      country,
      street,
      pincode,
    ]);

    res.json({ message: "User and address created successfully" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Error while signing up" })
  }

})
