/**
 * Partial Content Response:
 * > Partial Content Response is a data transfer technique where the server
 *   sends only a specific part of the data instead of sending the entire data.
 * > This is useful when the client does not need the full file, but only a
 *   portion of it.
 * > This technique is mainly used for large files like videos, audio, and
 *   large downloads.
 * > Instead of sending the whole file, the server sends only the requested
 *   byte range.
 * > This is supported by HTTP using the Range header.
 *
 * Why Partial Content Response is needed:
 * > Suppose we have a video file of size 1GB.
 * > If the user watches from the middle of the video, there is no need to
 *   send the full 1GB file.
 * > The client requests only the required portion.
 * > The server sends only that part.
 * > This saves:
 *   - Memory
 *   - Bandwidth
 *   - Time
 *
 * Real-world examples:
 * - Video streaming (YouTube seek forward/backward)
 * - Audio streaming (Spotify)
 * - Resume download
 *
 * Important HTTP Status Code:
 * > 206 Partial Content
 * > This status code indicates that only part of the resource is sent.
 */

/**
 * Code Explanation:
 * 1. Range Header:
 *    - Sent by client to request specific bytes.
 *    - Example: Range: bytes=0-1023
 * 2. fs.statSync():
 *    - Gets file information like file size.
 * 3. start and end:
 *    - Define which part of file to send.
 * 4. status(206):
 *    - Indicates Partial Content Response.
 * 5. Content-Range:
 *    - Specifies which bytes are sent.
 * 6. Accept-Ranges:
 *    - Tells client server supports range requests.
 * 7. fs.createReadStream({ start, end }):
 *    - Reads only specific part of file.
 * 8. pipe():
 *    - Sends data chunk by chunk to client.
 */

/**
 * Important Jargons:
 * 1. Partial Content:
 *    > Sending only part of resource.
 * 2. Range Header:
 *    > Request specific bytes from file.
 * 3. Content-Range:
 *    > Response header specifying sent range.
 * 4. Byte Range:
 *    > Portion of file defined by start and end.
 * 5. Seek:
 *    > Jump to specific part of media.
 */

/**
 * Code Explanation:
 * > This API sends an audio file to the client.
 * > If the client asks for a specific part of the audio, the server sends
 *   only that part (Partial Content).
 * > Otherwise, the server sends the full audio file.
 */

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static("public"));

/* For parsing JSON and form data */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/download-audio", (req, res) => {
  /**
   * Step 1: Get full path of audio file
   * > path.join(__dirname, "public/music.mp3")
   *   - __dirname          → current folder path
   *   - "public/music.mp3" → audio file location
   * > This creates the complete path of the audio file.
   */
  const filePath = path.join(__dirname, "public/music.mp3");

  /**
   * Step 2: Get file information
   * > fs.statSync(filePath)
   *   - This gives details about the file.
   *   - We use it to get file size.
   * > Example: fileSize = 5000000 bytes (5MB)
   */
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  /**
   * Step 3: Check if client requested specific part of file
   * > req.headers.range
   *   - Browser sends Range header when:
   *     - User skips audio
   *     - User resumes audio
   * > Example Range header:
   *   - Range: bytes=0-1023
   * > This means client wants bytes from 0 to 1023
   */
  const range = req.headers.range;

  /**
   * Step 4: If Range exists → send only requested part
   */
  if (range) {
    /**
     * > Remove "bytes=" and split start and end
     * > Example: "bytes=0-1023"
     *   - becomes:
     *     a. start = 0
     *     b. end = 1023
     */
    const parts = range.replace(/bytes=/, "").split("-");

    const start = parseInt(parts[0], 10);

    /* If end is not provided, send till end of file */
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    /* Calculate size of data to send */
    const chunkSize = end - start + 1;

    /**
     * Step 5: Create stream for only requested part
     * > fs.createReadStream(filePath, { start, end })
     *   - Reads only selected portion
     *   - Does NOT read full file
     * > This saves memory
     */
    const file = fs.createReadStream(filePath, { start, end });

    /**
     * Step 6: Set response headers
     * > These headers tell browser:
     *   - which part is sent
     *   - total file size
     *   - file type
     */
    const head = {
      /**
       * Example: bytes 0-1023/5000000
       * - sending bytes 0 to 1023
       * - total file size is 5000000
       */
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      /* Tells browser that server supports partial content */
      "Accept-Ranges": "bytes",
      /* Size of current chunk */
      "Content-Length": chunkSize,
      /* File type (audio) */
      "Content-Type": "audio/mpeg",
    };

    /**
     * Step 7: Send status code 206
     * > 206 means Partial Content
     */
    res.writeHead(206, head);

    /**
     * Step 8: Send file part to client
     * - pipe() sends data directly without loading full file into memory
     */
    file.pipe(res);
  } else {
    /**
     * Step 9: If Range does NOT exist → send full file
     * > This happens when user plays audio from start
     */
    const head = {
      /* Full file size */
      "Content-Length": fileSize,
      /* File type */
      "Content-Type": "audio/mpeg",
    };

    /**
     * Send status 200 (OK): Means full file is sent
     */
    res.writeHead(200, head);

    /**
     * Send full file using stream, Still uses stream to save memory
     */
    fs.createReadStream(filePath).pipe(res);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


/**
 * Simple Summary:
 * 1. Case 1: Client requests specific part
 *    → Server sends only that part
 *    → Status code = 206
 * 2. Case 2: Client requests full file
 *    → Server sends full file
 *    → Status code = 200
 *
 * 3. Real Example:
 *    - When you skip YouTube video to 10:00, browser requests only that part,
 *      not full video.
 *    - This is Partial Content Response.
*/