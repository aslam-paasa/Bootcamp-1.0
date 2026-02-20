/**
 * Important Jargons:
 * 1. Stream:
 *    > Continuous flow of data over time.
 *    > Example: Video streaming
 * 2. Chunk:
 *    > Small piece of data.
 *    > Large file is divided into chunks.
 * 3. Readable Stream:
 *    > Used to read stream data chunk-by-chunk.
 *    > Example: fs.createReadStream()
 * 4. Writable Stream:
 *    > Used to write stream data in a file chunk-by-chunk.
 *    > Example: HTTP response (res)
 * 5. Pipe:
 *    > Connects readable stream to writable stream.
 *    > Automatically transfers data.
 * 6. Buffer:
 *    > Temporary memory storage.
 * 7. highWaterMark:
 *    > Defines chunk size.
 * 8. TCP Stream:
 *    > Continuous connection for sending/receiving data.
*/

/**
 * HTTP Streaming:
 * > HTTP Streaming is a data transfer technique where data is sent from the
 *   server to the client in smaller chunks, instead of loading the entire
 *   data into memory first.
 *
 * > Problem with Buffered Response:
 *   - Suppose we have a file of size 1GB.
 *   - If we use buffered response, the entire 1GB file will first load into
 *     server memory before sending.
 *   - If 10 users request the same file at the same time, then 10GB memory
 *     will be required.
 *   - But most servers have only 2GB–4GB RAM.
 *   - This can overload the server and cause it to crash.
 *
 * > Solution: Streaming
 *   - Instead of loading the entire file into memory,
 *   - The file is divided into smaller chunks.
 *   - Each chunk is sent to the client immediately.
 *   - The connection remains open until all chunks are sent.
 *
 * > Why Streaming works:
 *   - HTTP uses TCP underneath.
 *   - TCP provides a continuous two-way connection called a stream.
 *   - Streams allow reading and writing data gradually.
 *   - So, we do not need to load the entire file into memory.
 *
 * > Real-world examples:
 *   - Video streaming (YouTube, Netflix)
 *   - Audio streaming (Spotify)
 *   - File downloads
 *   - File uploads
 *
 * > Benefits of Streaming:
 *   - Uses less memory
 *   - Faster response start time
 *   - Prevents server crashes due to memory overload
 *   - Efficient for large files
 *
 * > Node.js Streaming:
 *   - Node.js provides built-in streaming APIs.
 *   - These APIs allow sending data chunk by chunk.
 *   - We can directly connect file streams to HTTP responses.
*/


import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * 1. fileURLToPath(import.meta.url)
 *    > Converts module URL to file path.
 *    > Needed because __filename is not available in ES modules.
 * 2. path.dirname(__filename)
 *    > Gets directory path of current file.
 *    > Equivalent to __dirname in CommonJS.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(cors());

/* For parsing JSON and form data */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Route for streaming text file
 * 1. Set response header:
 *    - Content-Type tells browser what type of data is coming
 * 2. Create readable stream from file
 *    a. fs.createReadStream()
 *       - Reads 'largeTextFile.txt' file in small chunks instead of loading
 *         full file into memory (create stream)
 *    b. Options:
 *       - encoding: "utf8"
 *       - Converts binary data into readable text
 *    c. highWaterMark: 1024
 *       - Defines chunk size (1024 bytes = 1KB)
 *       - File will be read in 1KB chunks
 * 3. Pipe stream to response:
 *    > readStream.pipe(res)
 *      - res object is a writeable stream
 *      - Sends file chunk by chunk directly to client (readStream <--> res)
 *      - No full file loading into memory
 *      - Efficient and fast
 */
app.get("/stream-text", (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  const readStream = fs.createReadStream(
    path.join(__dirname, "largeTextFile.txt"),
    {
      encoding: "utf8",
      highWaterMark: 1024,
    },
  );

  readStream.pipe(res);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
