/**
 * HTTP (Hyper Text Transfer Protocol)
 
1. What is HTTP?
 * - HTTP is a protocol that helps transfer text/data between devices
 * - It's like a set of rules for how computers talk to each other over the internet
 * - When you visit a website, your browser uses HTTP to request and receive data

2. Client-Server Model
 *  +--------+                +--------+
 *  |        | -------------->|        |
 *  | Client |                | Server |
 *  |        |<---------------|        |
 *  +--------+                +--------+

 * - Client: Your device (phone, computer, etc.)
 * - Server: The computer that hosts the website
 * - They communicate using HTTP

3. Important Terms
 * - URL: The address of a website (like www.google.com)
 * - URI: A way to identify a resource
 * - URN: A name for a resource

4. HTTP Headers
 * - Headers are like labels that come with requests and responses
 * - They contain important information about the data being sent
 * - Example: Content-Type: application/json

Common Headers:
* - Accept       : Tells server what type of data you can handle
* - User-Agent   : Identifies your browser/device
* - Authorization: For security (like login tokens)
* - Content-Type : Specifies the type of data (images, text, etc.)
* - Cookies      : Stores user information
* - Cache-Control: Manages how data is stored temporarily

5. HTTP Methods (Common Operations)
* - GET: Get data from server
* - POST: Send new data to server
* - PUT: Update existing data
* - DELETE: Remove data
* - PATCH: Update part of data

6. HTTP Status Codes
* - 1XX: Information
* - 2XX: Success (200 OK, 201 Created)
* - 3XX: Redirection
* - 4XX: Client Errors (404 Not Found)
* - 5XX: Server Errors (500 Internal Server Error)

Common Status Codes:
* - 200: OK (Everything worked)
* - 201: Created (New resource created)
* - 400: Bad Request (Something wrong with request)
* - 401: Unauthorized (Not logged in)
* - 404: Not Found (Resource doesn't exist)
* - 500: Server Error (Something went wrong on server)

Note: This is a basic overview. More details will be covered in backend development.
*/