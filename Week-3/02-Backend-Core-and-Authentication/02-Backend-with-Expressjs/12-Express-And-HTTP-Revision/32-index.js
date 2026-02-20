/**
 * Assignment: FileServer.js
 * Q. You need to create an express HTTP Server in Node.js which will handle
 *    the logic of a file server - Use built in Node.js 'fs' module
 * => The expected API endpoints are defined below:
 *    1. GET /files - Returns a list of files present in './files/' directory
 *       Response: 200 OK with an array of file names in JSON format.


/**
 * We will use built-in NodeJS 'fs' module to create File System HTTP Server.
 * => So, there is a file folder, whenever someone hits a get endpoint, they should
 *    see all the files from that folder:
 *    1. GET /files - Returns a list of files present in './files/' directory
 *       Response: 200 OK with an array of file names in JSON format.
 * => Whenever someone hits /file/:filename, they should
 *    return the content of the file by filename.
 *    2. GET /file/:filename - Returns content of given file by name
 *       Description: Use the filename from the request path parameter to read the file from './files/' directory
 *       Response: 200 OK with the file content as the response body if found, or 4040 Not Found if not found, Should return "File Not Found"
 *       Example: GET http://localhost:3000/file/example.txt
 *     - For any other route not defined in the server return 404
 *    Testing the server - run 'npm run test-fileServer' command in terminal.
 * */ 


const express = require('express');
const app = express();


app.get("files/:filename", function(req, res) {
    /**
     * filaname: pageOne = req.params.pageOne 
     * filenames: pageTwo = req.params.pageTwo
    */
    const name = req.params.filename;

    /**
     * https://localhost:3000/pageOne
    */
    console.log(name);
    res.json({});
    
})

app.listen(3000);