/**
 * Resumable Uploads:
 * > Resumable Upload is a technique where a file is uploaded in small parts
 *   (chunks), and if the upload stops in between, it can continue from where
 *   it stopped instead of starting from the beginning.
 * > The file is divided into multiple chunks and each chunk is uploaded
 *   separately.
 * > The server keeps track of uploaded chunks and combines them to create
 *   the final file.
 */

/**
 * Why Resumable Upload is needed:
 * > Suppose we are uploading a large file of size 1GB.
 * > If the internet disconnects after uploading 700MB, without resumable
 *   upload, we must restart from 0MB.
 * > With resumable upload:
 *   - Only the remaining 300MB will be uploaded.
 *   - Already uploaded 700MB is not uploaded again.
 * > This saves:
 *   - Time
 *   - Bandwidth
 *   - User effort
 *
 * Real-world examples:
 * > Google Drive file upload
 * > YouTube video upload
 * > Dropbox file upload
 * > Any large file upload system
 */

/**
 * Complete Code Explanation:
 * > This server allows uploading large files in small parts (chunks).
 *   - Each chunk is uploaded separately.
 *   - The server stores chunks temporarily.
 *   - When all chunks are uploaded, the server combines them into the
 *     final file.
 * > This allows resumable uploads.
 *
 * Important Concepts:
 * 1. uploadId              : Unique ID for each upload session
 * 2. chunkIndex            : Position of chunk
 * 3. totalChunks           : Total number of chunks
 * 4. req.file              : Uploaded chunk file
 * 5. fs.renameSync()       : Moves file to new location
 * 6. fs.createWriteStream(): Creates final file
 * 7. Resumable Upload      : Upload can continue from last chunk
 */

/**
 * Resumable Uploads:
 * > This server allows uploading large files in small parts called chunks.
 * > Instead of uploading the full file at once, the client uploads:
 *   - chunk-0, chunk-1, chunk-2, ...
 * > The server stores each chunk temporarily.
 * > When all chunks are uploaded, the server combines them into the final file.
 * > This allows resumable uploads.
 */

/**
 * Step 1: Import required modules
 * a. express       → used to create server and APIs
 * b. cors          → allows frontend (React, browser, Postman) to access server
 * c. fs            → used to read, write, delete files
 * d. path          → used to safely create file paths
 * e. multer        → middleware used to handle file uploads
 * f. fileURLToPath → used to create __dirname in ES Modules
 */

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

/**
 * Step 2: Create __filename and __dirname (ES Module Fix)
 * a. In CommonJS  : __dirname is available by default
 * b. In ES Modules: __dirname is NOT available, So we create it manually.
 *    __filename → full path of this file
 *    __dirname  → folder path of this file
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Step 3: Create Express server
 */

const app = express();
const port = 3000;

/**
 * Step 4: Enable middleware
 * a. cors(): Allows frontend from different origin to access server
 * b. express.json()      : Allows reading JSON data from req.body
 * c. express.urlencoded(): Allows reading form-data
 */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Step 5: Create required folders
 * > uploads/     : Final merged files stored here
 * > tempUploads/ : Temporary storage for uploaded chunks
 */

const uploadsRoot = path.join(__dirname, "uploads");
const tempUploadsRoot = path.join(__dirname, "tempUploads");

/* Create uploads folder if not exists */
if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot, { recursive: true });
}

/* Create tempUploads folder if not exists */
if (!fs.existsSync(tempUploadsRoot)) {
  fs.mkdirSync(tempUploadsRoot, { recursive: true });
}

/**
 * Step 6: Configure multer (file upload middleware)
 * > multer handles file upload automatically
 * > destination → where temporary chunk is stored
 * > filename    → unique file name for temporary storage
 */

const storage = multer.diskStorage({
  /* Store chunk in tempUploads folder */
  destination: (req, file, cb) => {
    cb(null, tempUploadsRoot);
  },

  /* Create unique name using timestamp ( Ex: 1699999999-video.mp4) */
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

/* upload middleware used in API */
const upload = multer({ storage });

/**
 * Step 7: Upload chunk API
 * a. upload.single("chunk") : receives one chunk file
 * b. req.file               : uploaded file
 * c. req.body contains:
 *    - chunkIndex
 *    - totalChunks
 *    - fileName
 *    - uploadId
 */

app.post("/upload-chunk", upload.single("chunk"), async (req, res) => {
  try {
    /* Step 8: Read chunk information from request */
    const chunkIndex = Number(req.body.chunkIndex);
    const totalChunks = Number(req.body.totalChunks);
    const fileName = req.body.fileName;
    const uploadId = req.body.uploadId;

    /**
     * Step 9: Create upload session folder
     * > uploads/uploadId/
     *   - Example: uploads/abc123/
     *   - This folder stores all chunks of this upload session
     */

    const uploadDir = path.join(uploadsRoot, uploadId);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    /**
     * Step 10: Move chunk from tempUploads → uploadDir
     * tempUploads/file-temp: uploads/abc123/chunk-0
     */

    const chunkPath = path.join(uploadDir, `chunk-${chunkIndex}`);
    fs.renameSync(req.file.path, chunkPath);
    console.log(`Chunk ${chunkIndex} saved`);

    /* Step 11: If not last chunk, stop here */
    if (chunkIndex + 1 !== totalChunks) {
      return res.json({
        success: true,
        message: `Chunk ${chunkIndex} uploaded`,
      });
    }

    /* Step 12: All chunks received → start merging */
    console.log("All chunks received. Merging...");
    const finalFilePath = path.join(uploadsRoot, fileName);
    const writeStream = fs.createWriteStream(finalFilePath);

    /**
     * Step 13: Merge chunks sequentially using streams
     * - chunk-0 → write
     * - chunk-1 → write
     * - chunk-2 → write
     *   ...
     */
    async function mergeChunks() {
      for (let i = 0; i < totalChunks; i++) {
        const chunkFile = path.join(uploadDir, `chunk-${i}`);

        await new Promise((resolve, reject) => {
          const readStream = fs.createReadStream(chunkFile);

          /* Pipe chunk into final file */
          readStream.pipe(writeStream, { end: false });

          /* After writing chunk → delete it */
          readStream.on("end", () => {
            fs.unlinkSync(chunkFile);
            resolve();
          });

          readStream.on("error", reject);
        });
      }
    }

    await mergeChunks();

    /* Step 14: Close final file stream */
    writeStream.end();

    writeStream.on("finish", () => {
      console.log("Merge complete");

      /* Delete temporary upload session folder */
      fs.rmSync(uploadDir, { recursive: true, force: true });
      console.log("Temporary chunks cleaned");
    });

    /* Step 15: Send success response */
    return res.json({
      success: true,
      message: "File uploaded and merged successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
});

/**
 * Step 16: Start server
 */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/**
 * Complete Flow Example
 * > File = video.mp4 (100MB)
 * > Client splits into:
 *   - chunk-0
 *   - chunk-1
 *   - chunk-2
 *   - chunk-3
 *   - chunk-4
 *
 * > Upload process:
 *   - upload chunk-0 → saved
 *   - upload chunk-1 → saved
 *   - upload chunk-2 → saved
 *
 * internet disconnects
 *
 * resume upload:
 * - upload chunk-3 → saved
 * - upload chunk-4 → saved
 *
 *
 * Server merges:
 * > chunk-0 + chunk-1 + chunk-2 + chunk-3 + chunk-4 = video.mp4
 * > Final file ready inside uploads folder
 */
