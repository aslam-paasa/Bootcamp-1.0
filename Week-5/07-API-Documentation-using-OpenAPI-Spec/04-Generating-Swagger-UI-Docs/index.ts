/**
 * Generating Swagger UI Docs:
 * > We're going to turn our boring blueprint (openapi.yaml) into a 
 *   beautiful, interactive documentation website - automatically!
 * > Think of it like turning a recipe book into a cooking show where 
 *   you can:
 *   - See all the recipes
 *   - Understand each step clearly
 *   - Try making the dish yourself
 *   - Test if it works
*/

/**
 * Implementation of Swagger UI Docs:
 * 1. Install required packages:
 *    > These packages do the heavy lifting:
 *      npm install swagger-ui-express yamljs
 *    > What each package does:
 *      a. swagger-ui-express : Shows the beautiful documentation UI
 *      b. yamljs             : Reads our openapi.yaml file
 * 
 * 2. Create a openapi.yaml file:
 *    > Save your OpenAPI spec into a file called swagger.yaml in your 
 *      project root (or wherever you like):
 * 
 * 3. Update your Express App to Swagger UI:
*/

import express from 'express';
import swaggerUi from 'swagger-ui-express'; /* The UI display tool  */
import YAML from 'yamljs';                  /* The YAML file reader */
import path from 'path';                    /* Helps find files     */

const app = express();
const port = 3000;

app.use(express.json());

/** 
 * 2. Load your OpenAPI Spec File:
 *    > This reads your openapi.yaml like reading a recipe book
*/
const swaggerDocument = YAML.load(
    path.join(process.cwd(), 'openapi.yaml')  /* Finds your file */
);


/**
 * 3. Create the documentation website route:
 *    > "/api-docs" is like your API's homepage
 */
app.use('/api-docs',
    swaggerUi.serve,                  /* Serves the UI files    */
    swaggerUi.setup(swaggerDocument)  /* Sets up with your spec */
);


/* 4. Your existing API code stays the same */
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

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

/* 5. Start the server */
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Documentation: http://localhost:${port}/api-docs`);  // 🆕 New!
    console.log(`API Endpoint: http://localhost:${port}/users`);
});

/**
 * Open your browser and go to:
 * 1. API Docs     : http://localhost:3000/api-docs
 * 2. Actual API   : http://localhost:3000/users
 * 3. Try to search: http://localhost:3000/users?name=John
*/