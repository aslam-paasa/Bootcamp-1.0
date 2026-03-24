/*
  ASSIGNMENT 24 — File Uploads: multer — Handling Files/Images
  =============================================================

  WHAT IS FILE UPLOADING?
  When a user submits a form with a profile picture or a document,
  the file is sent inside the HTTP request body as binary data.
  Normal express.json() cannot read binary file data — we need multer.

  WHAT IS MULTER?
  Multer is an npm package that handles file uploads in Express.
  It reads the incoming file from the request and either:
  - Saves it to a folder on your server (disk storage)
  - Keeps it in memory as a buffer (memory storage)

  HOW IT WORKS:
  1. Client sends a request with Content-Type: multipart/form-data
     (this is how browsers and Postman send files)
  2. Multer reads the file from the request
  3. Saves it to the uploads/ folder with a unique filename
  4. Attaches the file info to req.file (single) or req.files (multiple)
  5. Your route handler can then use req.file to get the file details

  AFTER UPLOADING:
  The file is saved on your server inside the uploads/ folder.
  You serve that folder as static files using express.static()
  so anyone can access the uploaded file via a URL like:
  http://localhost:3000/uploads/filename.jpg

  FOLDER STRUCTURE:
  ------------------
  assignment-24/
  ├── server.js      ← you are here
  └── uploads/       ← multer saves files here automatically

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express multer
  node server.js
*/

const express = require("express");
const multer = require("multer");
const path = require("path"); // built into Node.js — no install needed

const app = express();
const PORT = 3000;

app.use(express.json());

/*
  Serve the uploads folder as static files.
  This lets you access uploaded files in the browser via:
  http://localhost:3000/uploads/your-filename.jpg
*/
app.use("/uploads", express.static("uploads"));

/* ---------------------------------------------------------------
  MULTER STORAGE CONFIGURATION
  ------------------------------
  multer.diskStorage() lets you control:

  destination → which folder to save files in
                cb(null, "uploads/") means save in the uploads/ folder

  filename    → what to name the saved file
                We use Date.now() to make it unique so two uploads
                with the same original name never overwrite each other.
                path.extname() extracts the file extension (.jpg, .png etc.)

  Example saved filename: 1714500000000-profile.jpg
                           ↑timestamp    ↑original name
---------------------------------------------------------------- */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // save files inside the uploads/ folder
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

/* ---------------------------------------------------------------
  FILE FILTER
  ------------
  fileFilter lets you REJECT files that are not the type you want.
  Here we only allow image files (jpeg, jpg, png, gif).

  file.mimetype is the file type detected by the browser.
  If the type is not in our allowed list → we call cb with an
  Error object to reject the file.
  If it is allowed → we call cb(null, true) to accept it.
---------------------------------------------------------------- */
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // accept the file
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed!"), false);
    }
};

/* ---------------------------------------------------------------
  CREATE THE MULTER INSTANCE
  ---------------------------
  We pass in our storage config, fileFilter, and a size limit.

  limits.fileSize is in BYTES.
  2 * 1024 * 1024 = 2MB maximum file size.
  Any file larger than this will be rejected automatically.
---------------------------------------------------------------- */
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
});

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  GET /
  ------
  Test in browser → http://localhost:3000
*/
app.get("/", (req, res) => {
    res.send(`
    <h2>File Upload Demo</h2>
    <p>Use Postman to upload files to the routes below.</p>
    <p>After uploading, visit: <a href="/uploads">/uploads</a></p>
  `);
});

/*
  POST /upload/single — Upload ONE file
  --------------------------------------
  upload.single("image") is multer middleware.
  "image" is the FIELD NAME the client uses in the form data.
  It must match what you send in Postman (the key in form-data).

  After multer runs, req.file contains:
  - fieldname   → "image"
  - originalname → original filename from the client
  - filename    → the new unique name multer saved it as
  - path        → full path on disk e.g. "uploads/1714500000-photo.jpg"
  - size        → file size in bytes
  - mimetype    → "image/jpeg" etc.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/upload/single
  - Body → form-data
  - Add a key called "image", change type from Text to File
  - Select an image file from your computer
  - Hit Send!
*/
app.post("/upload/single", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    res.status(201).json({
        message: "File uploaded successfully!",
        fileName: req.file.filename,
        fileUrl: fileUrl,  // visit this URL in browser to see the image
        size: `${(req.file.size / 1024).toFixed(2)} KB`,
    });
});

/*
  POST /upload/multiple — Upload MULTIPLE files at once
  -------------------------------------------------------
  upload.array("images", 5) accepts up to 5 files.
  "images" is the field name — use this as the key in Postman.
  req.files (plural) is an array of all uploaded files.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/upload/multiple
  - Body → form-data
  - Add multiple keys all named "images", type File
  - Select different image files for each key
*/
app.post("/upload/multiple", upload.array("images", 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded." });
    }

    const uploadedFiles = req.files.map((file) => ({
        fileName: file.filename,
        fileUrl: `http://localhost:${PORT}/uploads/${file.filename}`,
        size: `${(file.size / 1024).toFixed(2)} KB`,
    }));

    res.status(201).json({
        message: `${req.files.length} file(s) uploaded successfully!`,
        uploadedFiles,
    });
});

/*
  POST /upload/profile — Upload file alongside text data
  -------------------------------------------------------
  In real apps you often upload a file WITH other form data
  like a name or a description at the same time.

  req.body → contains the text fields (name, bio etc.)
  req.file → contains the uploaded file

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/upload/profile
  - Body → form-data
  - Add key "name"   → type Text  → value "Alice"
  - Add key "avatar" → type File  → select an image
*/
app.post("/upload/profile", upload.single("avatar"), (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required." });
    }

    if (!req.file) {
        return res.status(400).json({ error: "Avatar image is required." });
    }

    const avatarUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    res.status(201).json({
        message: "Profile created!",
        name,
        avatarUrl,
    });
});

/*
  Global error handler — catches multer errors like file too large
  or wrong file type and sends a clean error response.
*/
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // multer-specific errors e.g. file too large
        return res.status(400).json({ error: err.message });
    }
    if (err) {
        // our custom fileFilter error
        return res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Uploaded files served at http://localhost:${PORT}/uploads`);
});