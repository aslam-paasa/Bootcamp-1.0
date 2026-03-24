# Roadmap for Backend:
 - Node Basic Structure
 - Coding Part
 - Introducing ExpressJS
 - Creating a basic server
 - Validation through Postman
 - Database Connection (MongoDB)
 - CRUD Operations
 - File Uploading
 - Credentials Validation(Email/Password)

# Folder Structure:
 1. Assets:
    - Uploading related files:
      a. Images
      b. Videos etc.
2. Config:
   - Database logic
   - Schema
   - DB Model
3. Controllers:
   - Business Logic
4. .env file:
   - This is required for dotenv package to work.
   - npm i dotenv
   - This file is used to store confidential configuration information.
   - Ex: Port No, JWT, etc.
5. Middleware:
   - Goods from one place to another
   - Client(req) <-----> Middleware <-----> Server(res)
   - Middleware are fns that have access to req-res and can modify/
     manipulate the request in-between req-res cycle.
   - Middleware fns have next() fn to pass the control.


# Database Connection:
1. Connected to the database
2. Defining Schemas
3. Defining Models
4. Creating data and saving in database

# Middleware:
- Goods from one place to another
- Client(req) <-----> Middleware <-----> Server(res)
- Middleware are fns that have access to req-res and can modify/
  manipulate the request in-between req-res cycle.
- Middleware fns have next() fn to pass the control.

# Types of Middleware: ARBET 
1. Application Level Middleware
2. Router Level Middleware
3. Built-in Middleware
4. Error Handling Middleware
5. Third-Party Middleware 

Application Level Middleware: 
- Application Level Middleware are those middleware which are used in
  the whole application.
- Isse hm HTTP Methods k saath likhte hai like GET, POST etc.
- Example: Authentication, Authorization etc.

Error Handling Middleware:
- Error handling middleware are those middleware which are used to
  handle the error in the application.
- Iss hm app.use() m likhte hai.

Built-in Middleware:
- Built-in middleware are use to parse the incoming data.
- For example, mere ek friend ko sirf hindi aati hai aur dusre dost ko
  sirf english aati hai, to ye dono aapas mai communicate nhi kar
  paenge. To mai as a middleman banunga jo dono k language ko parse
  (translate) karunga. Basically, ye incoming request data ko convert
  krta hai.
- Example: app.use(express.json()); 
  => Always use this whenever we use POST Method. This built-in method 
     converts the POST data into JSON format.

Router Level Middleware:
- Router Level middleware are used to handle the request of a 
  particular route.
- Router Level Middleware ek aisa fn hai jo route se aane wale saare
  request ko handle krta hai.
- For ex, mere home page route pe koi request aa rha hai Client-Side
  se to uss home page k route ko hm handle kaise krnge?

# Data Validation:
1. Sending & Receiving JSON data:
   {
      "email": "mohammad@gmail.com"
   }

2. Sending & Receiving data at query format:
=> localhost:4000/Route/?name=mohammad&age=28
                  |     |             |
                  |     V             V
                  V    Query String   Sending query data more than one
              "/login" 

Note: HTTP  - Hypertext Transfer Protocol and is used locally.
      HTTPS - Hypertext Transfer Protocol Secure and is used globally.
            - Whenever we buy domain/hosting, company registers our
              website name globally and provide that address with some
              security.
            - Ex: https://www.amazon.in/
      SSL   - Company provide a security certificate which is a 
              guarantee that our data will be kept safe and secure.

      Status Code:
      a. 100 - Informational
      b. 200 - Success
         201 - Created
         202 - Accepted
      c. 300 - Redirection [Moving to some other page]
      d. 400 - Client Error
      e. 500 - Server Error

# Data Validation before or after sending it to the DB:
Two Types of Validation:
1. Client-Side Validation:
 - login => fill form => submit => validation => submit => validation

2. Server-Side Validation:
   - Backend Validation[Database Validation]
     a. Custom Validation
     b. Third Party Library/Validator: express-validator
        - npm install express-validator

# Some common validations:
  1. Required Validation
  2. Length Validation
  3. Email Validation
  4. Password Validation
  5. Number Validation
  6. Date Validation
  7. Phone Number Validation
  8. Pattern Validation
  9. Custom Validation

# File Upload in Backend:
- We will be using a library called multer.
- Install: npm i multer
- File Upload in web applications can be stored in different places:
  a. Server-side Storage (local server folder), 
  b. Client-side Storage, 
  c. Cloud Storage (AWS S3, GCP, etc).
- Multer is a Node.js middleware used with  Express to handle 'multipart/form-data', which is the format used when uploading files from HTML forms.
- Multer processes incoming files and stores them based on the configuration we provide.

Basic Multer Setup:
- Multer can be used with a simple configuration where we can just define the upload folder.

Multer Middleware:
 const uploads = multer({dest:'./uploads'})
 - dest means the folder where uploaded files will be stored.
 - Multer will automatically generate a random file name.


Applying Multer middleware in API Route:
- uploads.single() means we want to upload only one file.
- The argument is the name of the file field coming from the form.

Ex: app.post('/fileUpload', uploads.single('sampleUploadFile'), fileUpload)
- `sampleUploadFile` is the field name in the form-data.
- Multer will process the file before the controller runs.

Postman:
- POST: localhost:4000
- Body -> form-data:
  Key                           :   Value
  fileName to upload(text/file) : Select text/file
  sampleUploadFile              : C:\Users\download\uploads
- Send Request

Q. How to check file upload detail in console?
 - console.log(req.file)
 - {
     fieldname: 'sampleUploadFile',
     originalname: 'sampleUploadFile.pdf',
     encoding: '7bit',
     mimetype: 'application/pdf',
     destination: './uploads',
     filename: '5e13ad5646026b5f6f5c7659e8b80b2a',
     path: 'uploads\\5e13ad5646026b5f6f5c7659e8b80b2a',
     size: 246805
   }

Q. How to set original name to uploaded file?
 -  const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
 -  const uploads = multer({storage: storage});


Q. How to override new file with same name?
 - If two users upload files with same name: sampleUploadFile.pdf
 - This new file will override the old file.
 - This can cause data loss.

Q. How to avoid overriding files?
 - We usually generate unique filenames.

 - Method-1: Add Random Number
   filename: (req, file, cb) => {
     cb(null, Math.ceil(Math.random() * 100) + file.originalname);
   }
 - Example: 45sampleUploadFile.pdf

 - Method-2: Add Timestamp (Better)
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
 - Example: 171984394234-sampleUploadFile.pdf 

 - Method-3: Use UUID (Best Practice)
   const { v4: uuidv4 } = require('uuid');
   filename: (req, file, cb) => {
       cb(null, uuidv4() + "-" + file.originalname);
   }
 - Example: a3f2c7e2-94ab-4d52-b5fd-sampleUploadFile.pdf


Other Multer Upload Methods:
1. uploads.single('file'): Upload one file
2. uploads.array('files', 5): Upload multiple files (max 5)
3. uploads.fields([
      { name: 'profile', maxCount: 1 },
      { name: 'documents', maxCount: 3 },
   ]) : Upload files from multiple fields


