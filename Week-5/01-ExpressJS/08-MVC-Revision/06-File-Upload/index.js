require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const Router = require('./middlewares/mid');
const { body, query } = require('express-validator');

const { home, details, fileUpload, login } = require('./controllers/userController')
const PORT = process.env.PORT || 3000; // Use 3000 if PORT is not set

/**
 * Built-in Middleware:
*/
app.use(express.json());
app.use(Router);

/**
 * Error Handling Middleware:
*/
app.use((err, req, res, next) => {
    console.log("Working on Error");
    next();
});

/**
 * Storage Logic (multer.diskStorage):
 * > This configuration controls HOW and WHERE upload files are stored
 *   on the server.
 * > Multer allows us to customize two main things:
 *   1. destination: defines the folder where uploaded files are stored.
 *   2. filename   : defines the names of the file when it is stored.
*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        // cb(null, file.originalname); // Keep original file name
        cb(null, Math.ceil((Math.random() * 100)) + file.originalname); // add random no. avoid filename conflict
    }
});

/**
 * Performing File Upload:
 * - File Upload can be stored through:
 *   a. server side, 
 *   b. client-side, 
 *   c. Cloud Side-AWS, GCP etc.
 * - Multer is a server-side node.js middleware for handling form-data,
 *   which is primarily used for uploading files.
 * - It takes two argument in an object:
 *   a. destination: uploads [location]
 *   b. filename  
*/
const uploads = multer({storage: storage});


/**
 * Database Connection:
*/
const data = mongoose.connect('connection string');
data.then((d) => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log('Error connecting to Database');
});


/**
 * Defining Schema and Data Modelling:
*/
const Schema = mongoose.Schema({
    email: String
})

const detailsData = mongoose.model("detailsData", Schema);


/**
 * Creating and Saving Dummy Data:
*/
const createDetailsData = new detailsData({
    email: "mohammad@gmail.com"
})

createDetailsData.save()
.then((d) => {
    console.log('Data is saved');
})
.catch((err) => {
    console.log(err);    
});


/**
 * Application Level Middleware:
*/
app.get('/', home)


app.post('/details', details)

/**
 * Data Validation: express-validator
 * - body logic       : server
 * - validation logic : userController
*/
app.get('/login', query('email').notEmpty(), login)


/**
 * Multer Middleware:
 * - uploads.single(): Means we want to upload only one file and pass
 *   the file name as an argument.
 * - If file size is large then POST request should be preferred.
 * - Other Multer Upload Methods:
 *   a. uploads.single("file")   : Upload one file
 *   b. uploads.array("files", 5): Upload max 5 files
 *   c. uploads.fields([
 *         { name: "avatar", maxCount: 1 },
 *         { name: "documents", maxCount: 3 }
 *      ])
 *      - Upload multiple file fields
 * - Open Postman: If file size is large, always use POST
 *   POST: Body { sampleUploadFile (file): SelectFileToUpload }
 *                     |
 *                     V
 *               Key should match to upload file
*/
app.post('/fileUpload', uploads.single('sampleUploadFile'), fileUpload)

/**
 * Port Number:
*/
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});