/**
 * Q. How to start PORT on an env variable?
 * 1. Install dotenv package:
 * => Install the 'dotenv' package using npm. This package allows you
 *    to environment variables from a file:
 * 
 *    npm install dotenv
 * 
 * 2. Create a '.env' file:
 * => Create a file named '.env' in the root of your project. This file
 *    will contain your environment variables. Add a variable for the
 *    port, for example:
 * 
 *    PORT = 3000
 * 
 * 3. Load Environment Variables in your Express App:
 * => In your main Express application file(e.g., app.js or index.js),
 *    load the environment variables using 'dotenv'. Add the following
 *    lines at the top of your file:
 * 
 *    require('dotenv').config();
 * 
 * 4. Use the PORT Environment Variable:
 * 
 *    const express = require('express');
 *    const app = express();
 *    const port = process.env.PORT || 3000;
 * 
 *    // Rest of the Express code here...
 * 
 *    app.listen(port, () => {
 *       console.log(`Server is running on http://localhost:${port}`);
 *    });
 * 
 * 5. Run your Express App:
 *    
 *    node app.js
 * */ 