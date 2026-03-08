## Backend:
1. Signup
2. Signin
3. Add new content
4. Fetching all existing documents (no pagination)
5. Delete a document
6. Create a shareable link for your second brain


## Installation:
1. npm init -y
2. npm install -d typescript
3. npm tsc --init
4. Configure tsconfig.json
    a. "outDir": "./dist",
    b. "rootDir": "./src",
5. Configure package.json:
    a. "type": "module",
    b. "scripts": {
        "build": "tsc",
        "start": "node dist/index.js"
    },
6. Create src/index.ts
7. npm install express
8. npm install -D @types/express 
   [express ne alag se typescript file likhi h & we'll only use in 
    development, not in production]
9. npm install mongoose
10.npm install jsonwebtoken
11. npm install @types/jsonwebtoken