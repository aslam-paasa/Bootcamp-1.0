# Backend Project Setup Guide:
This guide will help you quickly set up and run the backend for this project. It also includes best practices for maintaining consistent code formatting across your team.

## Project Tech Stack:
- Node.js – JavaScript runtime
- Express – Web framework for APIs
- MongoDB + Mongoose – Database + ODM
- dotenv – Manage environment variables
- CORS – Enable Cross-Origin Resource Sharing
- express-validator – Request validation

## 1. Dependencies Installation
Following dependencies are required for this project:
   - express (Web framework)
   - mongoose (MongoDB ODM)
   - dotenv (Environment variables)
   - cors (Cross Origin Resource Sharing)
   - express-validator (Request validation)
   - mailgen
   - nodemailer

## Development Tool:
Following developmeny tools are required for this project:
   1. Code Formatting with Prettier:
      - Why Prettier? When working with team, everyone may have different formatting style (2-space vs. 4-space tabs, semicolons vs no semicolons, etc). This creates unnecessary Git diffs and messy code.
      - Prettier solves that by automatically formatting your code based on consistent rule set - so your project stays clean and readable for everyone.

      - Setup Instructions:
        a. Install Prettier as a dev dependency:
           - npm install --save-dev prettier
        b. Create a .prettierrc file with the following config:
            {
                "tabWidth": 2,
                "useTabs": false,
                "semi": true,
                "singleQuote": false,
                "trailingComma": "all",
                "bracketSpacing": true,
                "jsxBracketSameLine": false,
                "arrowParens": "always"
            }
        c. Add a Prettier script in your package.json:
           "scripts": {
             "format": "prettier --write."
           }
        d. Run this to auto-format all files:
           - npm run format
        e. Run the Server
           - node server.js

    2. .prettierignore:
       - Here we mention the file where we don't want to apply prettier.
       - Example:
         - node_modules
         - .env

    3. Configure package.json:
       - "type": "module"

    4. Create environment variables:
       - Create `.env` file with following variables:
         ```
         # Server Configuration
         PORT=8000
         NODE_ENV=development

         # MongoDB Configuration
         MONGODB_URI=mongodb://localhost:27017/your_database_name

         # JWT Configuration
         JWT_SECRET=your_jwt_secret_key
         JWT_EXPIRY=7d

         # CORS Configuration
         CORS_ORIGIN=http://localhost:3000
         ```
       - Create `.env.example` with same structure but without actual values
       - Add `.env` to `.gitignore`
       - Never commit `.env` file to version control

    5. Create public folder for static files:
       - images:
        - .gitkeep (we cannot keep empty file in git, so we create .gitkeep)

    6. Create src folder:
       - Keep source code here:
         - controllers
         - db
         - middlewares
         - models
         - routes
         - config
         - validators
         - index.js
         - app.js
       
    7. Design Data Models
    8. Install bcrypt.js for hashing passwords
       - Jb v hum mongoose se koi data save karte hai, to use pehle aur uske baad mai, called Hooks.
       - Prehook, Posthook
    9. Install JWT Token