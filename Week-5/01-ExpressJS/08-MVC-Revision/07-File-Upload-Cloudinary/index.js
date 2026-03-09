const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { body, query } = require('express-validator');

require('dotenv').config();
require('./config/cloudinary');
require('./config/db');

const Router = require('./middlewares/mid');
const { home, details, fileUpload, login } = require('./controllers/userController')

const app = express();
const PORT = process.env.PORT || 3000; // Use 3000 if PORT is not set


/**
 * Built-in Middleware:
*/
app.use(express.json());
app.use(Router);

/**
 * Multer Storage Logic (multer.diskStorage):
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
        /* Generate UUID filename */
        const uniqueName = uuidv4();
        cb(null, uniqueName);
    }
})

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
 * Routes:
*/
app.get('/', home)
app.post('/details', details)
app.get('/login', query('email').notEmpty(), login)

/**
 * Multer Middleware: Store image in cloudinary
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
 * Error Handling Middleware:
*/
app.use((err, req, res, next) => {
    console.log("Global Error", err.message);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});


/**
 * Port Number:
*/
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});