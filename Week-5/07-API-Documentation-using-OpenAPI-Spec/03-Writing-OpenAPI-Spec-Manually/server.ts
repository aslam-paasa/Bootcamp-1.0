/**
 * What we're building: A simple User API
 * > Imagine we're building a digital phonebook (our User API) that:
 *   1. Stores user information
 *   2. Lets you search for users
 *   3. Returns the results in a standard format
 * 
 * > We have two parts:
 *   1. server.ts    - The actual phonebook (the code that runs)
 *   2. openapi.yaml - The instruction manual for using the phonebook
 * 
 * Note: No, we can't see a UI page yet - but that doesn't mean it's 
 *       useless! We're currently in Phase 1: Creating the Blueprint.
*/

/**
 * Part-1: The Server Code (server.ts)
 * > Sets up a "phonebook service" at http://localhost:3000
 * > Has two contacts stored:
 *   a. John Doe (ID: 1)
 *   b. Jane Doe (ID: 2)
 * > One feature:
 *   a. Go to /users:
 *      - See all contacts
 *   b. Go to /users?name=John: 
 *      - See only contacts with "John" in their name
*/

/**
 * Part-2: The OpenAPI Specification (openapi.yaml) [Instruction Manual]
 * 1. Cover Page (Metadata)
 *    > Think of this as: The cover page of your phonebook manual
 * 
 *      openapi: 3.0.0     # Using OpenAPI instruction manual version 3
 *      info:
 *        title: User API                   # Name: "User Phonebook Service"
 *        description: API to manage users  # Purpose: "Manage contact information"
 *        version: "1.0.0"                  # Edition: "First edition"
 *      servers:
 *        - url: http://localhost:3000      # Location: "Find us at this address"
 * 
 * 2. How to Use It (Paths)
 *    > Think of this as: The "How to Search" section of your phonebook
 *      manual.
 * 
 *      paths:                              # All available features
 *        /users:                           # Feature 1: The "Lookup Users" feature
 *          get:                            # How to use it: GET request
 *            summary: Get a list of users  # Quick description
 *            description: Retrieves a list of users, optionally filtered by name.  # Detailed instructions
 *            
 *            parameters:                   # Options you can customize
 *              - in: query                 # Option type: "extra instructions"
 *                name: name                # Option name: "search by name"
 *                schema:
 *                  type: string            # Option format: "text input"
 *                required: false           # Is it mandatory? No
 *                description: Name filter for user lookup.  # What it does
 * 
 * 3. What You'll Get Back (Responses)
 *    > Think of this as: The "What the Results Look Like" section
 * 
 *      responses:
 *        '200':                           # If everything works perfectly
 *          description: A list of users   # What you'll receive
 *          content:
 *            application/json:            # Format: JSON (computer-friendly)
 *              schema:                    # Structure of what you'll get
 *                type: array              # You'll get a list
 *                items:                   # Each item in the list looks like this:
 *                  $ref: '#/components/schemas/User'  # → See "User" definition below
 * 
 * 4. Data Format (Components/Schemas)
 *    > Think of this as: The "User Contact Card Template" that shows 
 *      exactly what information each contact contains.
 * 
 *      components:
 *        schemas:                         # Data structure definitions
 *          User:                          # Definition of a "User" object
 *            type: object                 # It's an object (like a form)
 *            properties:                  # What information it contains
 *              id:
 *                type: integer            # Data type: number
 *                format: int64            # Number format: large integer
 *                description: The unique identifier of the user.  # Meaning: "User's ID number"
 *              name:
 *                type: string             # Data type: text
 *                description: The name of the user.  # Meaning: "User's name"
 *            required:                    # Must-have fields
 *              - id                       # Every user MUST have an ID
 *              - name                     # Every user MUST have a name
 * 
 * 5. Putting it all together: The Restaurant Menu
 *    > info       - Restaurant name     - "Joe's Pizza - Best pizza in town v1.0"
 *    > servers    - Restaurant address  - "123 Main Street"
 *    > paths      - Menu sections       - "Appetizers", "Main Course"
 *    > /users     - Specific menu item  - "Margherita Pizza"
 *    > get        - How to order it     - "Ask for it by name"
 *    > parameters - How to order it     - "Extra cheese? Yes/No"
 *    > responses  - What you receive    - "Hot pizza on a plate"
 *    > schemas    - Pizza description   - "Tomato sauce, cheese, basil on crust"
*/

/**
 * 1. Create a new folder for your project
 *    > mkdir my-first-api
 *    > cd my-first-api
 * 2. Create package.json file
 *    > npm init -y
 * 3. Install Express (our web server)
 *    > npm install express
 * 4. Install TypeScript tools (optional but recommended)
 *    > npm install --save-dev typescript @types/node @types/express ts-node nodemon
 * 5. Create tsconfig.json
 *    > npx tsc --init
 * 6. Update tsconfig.json:
 *    {
 *      "rootDir": "./src",
 *      "outDir": "./dist",
 *      "esModuleInterop": true,
 *      "moduleResolution": "node",
 *      "strict": true,
 *      "target": "ES6"
 *    }
 * 7. Create Project Structure:
 *    my-first-api/
 *    ├── src/
 *    │   └── server.ts     # Your server code
 *    ├── openapi.yaml      # Your OpenAPI specification
 *    ├── package.json
 *    └── tsconfig.json
 * 8. Add Start Scripts to package.json
 *    {
 *      "scripts": {
 *        "start": "ts-node src/server.ts",
 *        "dev": "nodemon src/server.ts"
 *      }
 *    }
 * 9. Run Your Server:
 *    > npm run dev
 *    > http://localhost:3000/users           → List all users
 *    > http://localhost:3000/users?name=John → Filter users by name
*/


import express from 'express';
const app = express();

const port = 3000;
app.use(express.json());

/* Our 'phonebook' data - stored in memory */
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

/* The 'lookup' feature of our phone */
app.get('/users', (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredUsers = users.filter(
      user => user.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(filteredUsers);
  } else {
    res.json(users);
  }
});

/* Start the phonebook service */
app.listen(port, () => { 
  console.log(`Phonebook is open at http://localhost:${port}`) 
});


/**
 * Test-1: See All Users
 * > URL: http://localhost:3000/users
 *   
 * > What happens:
 *   1. You visit the address
 *   2. Server says: "No name filter provided, showing all users"
 *   3. You get:
 *      [
 *        { "id": 1, "name": "John Doe" },
 *        { "id": 2, "name": "Jane Doe" }
 *      ]
*/

/**
 * Test-2: Search for Specific User
 * > URL: http://localhost:3000/users?name=John
 *   
 * > What happens:
 *   1. You visit with query parameter: name=John
 *   2. Server says: "Looking for users with 'John' in their name"
 *   3. You get:
 *      [
 *        { "id": 1, "name": "John Doe" }
 *      ]
*/

/**
 * Test-3: Search for Non-Existent User
 * > URL: http://localhost:3000/users?name=Alice
 *   
 * > What happens:
 *   1. You visit with query parameter: name=Alice
 *   2. Server says: "Looking for users with 'Alice' in their name"
 *   3. You get:
 *      []  (Empty array - no matches found)
*/