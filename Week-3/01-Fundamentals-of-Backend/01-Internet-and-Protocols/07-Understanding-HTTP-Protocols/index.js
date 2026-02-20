/**
 * HTTP (Hypertext Transfer Protocol):
 * > HTTP was invented because prior to HTTP there are not standard way to
 *   send web pages over the internet b/w browsers and servers.
 * 
 * > HTTP stands for Hypertext Transfer Protocol. It is a set of rules used
 *   to transfer hypertext (like clickable links) between a client and server
 *   over the internet. Hypertext is more than just regular text because it
 *   includes elements like hyperlinks that let you navigate to other pages
 *   or sections.
 * 
 * > HTTP is an Application Layer Protocol, and it uses TCP (Transmission
 *   Control Protocol) to transfer data. However, with HTTP/3, the transport
 *   protocol changes to QUIC, which is based on UDP (User Datagram Protocol).
 * 
 * > Example: Client Request
 *   
 *     Method
 *      | Path
 *      |  |  Protocol Version
 *      |  |   |
 *      V  V   V
 *   +---------------------+
 *   | GET / HTTP/1.1      |
 *   +---------------------+
 *   | Host: codergyan.com |
 *   | Accept-Language: en |  (Headers)
 *   +---------------------+
 * 
 * > Example: Client Response
 * 
 *     Protocol Version
 *       |    Status Code
 *       |        |  Status Message
 *       |        |   |
 *       V        V   V
 *   +----------------------------------------------+
 *   | HTTP/1.1  200  OK                            |
 *   +----------------------------------------------+
 *   | Date: Sat, 09 Jan 2025 14:28:02 GMT          |
 *   | Server: Nginx                                |
 *   | Last-Modified: Tue, 01 Jan 2025 13:18:22 GMT |
 *   | ETag: "51142bc1-7449-479b075b2891b"          | (Headers)
 *   | Accept-Ranges: bytes                         |
 *   | Content-Length: 29769                        |
 *   | Content-Type: text/html                      |
 *   +----------------------------------------------+
 *   | <html>                                       |
 *   | <head>                                       |
 *   | <title> Coder's Gyan</title>                 |
 *   | </head>                                      | (Body)
 *   | <body>                                       |
 *   | <h1> Welcome to Coder's Gyan </h1>           |
 *   | </body>                                      |
 *   | </html>                                      |
 *   +----------------------------------------------+
 * 
 * > It is also known as Request-Response Protocol, where client who needs
 *   data send a request to server and server who owns the data, processes
 *   that request and sends the response which has the requested data.
 * 
 * > HTTP is a stateless protocol. It means it does not store any information
 *   regarding the previous requests. To make our web applications stateful
 *   either client or server or both needs to save some information and needs
 *   to send it with each request or response. e.g., Token Authentication
 *   management.
 * 
 * > The reason why HTTP is made stateless so it can be scaled easily.
*/


/**
 * HTTP/0.9: 
 * > HTTP/0.9 was the first version of the Hypertext Transfer Protocol (HTTP),
 *   introduced in 1991 by Tim Berners-Lee. It was very simple protocol
 *   designed for retrieving HTML documents.
 *   a. Simple request format: Only supported GET requests 
 *      - no headers, 
 *      - no status codes
 *   b. Response: Only returned raw HTML
 *      - no metadata
 *      - no images
 *      - no other media types
 *   c. Connection Handling: A single request per connection; after sending
 *      the response, the connection was closed.
 *   d. No HTTP headers: No support for additional data like content type,
 *      caching, or cookies.
 * 
 *                       GET
 *   +--------+ ---------------------> +--------+
 *   | Client |                        | Server |
 *   +--------+ <--------------------- +--------+
 *                 Raw HTML Content
 *         (No images, media, files or metadata)
 *   
*/

/**
 * HTTP/1.0:
 * > HTTP/1.1, introduced in 1997 (defined in RFC 2068 and later updates in
 *   RFC 2616), brought major performance improvements and new features over
 *   HTTP/1.0. It became the most widely used HTTP version for decades.
 * 
 * > Persistent Connection (Keep-Alive by Default)
 * 
 * > Unlike HTTP/1.0, where each request required a new TCP connection,
 *   HTTP/1.1 keeps connections open for multiple requests.
 * 
 * > Allow servers to send response in smaller chunks instead of a single
 *   large response.
 * 
 * > Allows sending multiple requests without waiting for previous responses.
 * 
 * > Unlike HTTP/1.0, where a separate IP was needed for each website,
 *   HTTP/1.1 introduced the mandatory Host header, allowing multiple domains
 *   to share a single IP address. 
 *   a. Cache-Control: Fine-grained control over caching
 *      - max-age 
 *      - no-cache
 *   b. ETag: Helps prevent unnecessary re-downloads by validating if a
 *      resource has changed.
 * 
 *   c. New Methods Introduced:
 *      OPTIONS: Lists allowed methods for a resource
 *      PUT    : Uploads/replaces a resource
 *      DELETE : Removes a resource
 *      TRACE  : Debugging tool to see how a request is processed by 
 *               intermediate servers
 *      CONNECT: Used for establishing a tunnel (e.g., for HTTPS proxies)
 * 
 *   d. No Multiplexing: But have Persistent Connection (How many parallel
 *      requests allowed & does it uses same TCP Connection)
 *   e. Request 1-6 > Wait for response > Request 6-12 > Wait for Response, etc.
 *   f. Optional Encryption via TLS
 *   g. Head of Line Blocking = If one request or packet is delayed, all
 *      subsequent requests must wait (even if unrelated).
 *   h. No header compression
 *   i. Slower due to No Multiplexing and Head of Line Blocking and no
 *      header compression
*/

/**
 * HTTP/1.1 (Introduced in 1997)
 * > HTTP/1.1 was introduced in 1997 (RFC 2068, later RFC 2616).
 * > It brought major performance improvements over HTTP/1.0 and became
 *   the most widely used HTTP version for many years.
 *
 * 1. Persistent Connection (Keep-Alive by Default)
 *    > In HTTP/1.0:
 *      - Each request required a new TCP connection.
 *      - Request → TCP connect → Response → TCP close
 *    > In HTTP/1.1:
 *      - Connection remains open for multiple requests.
 *        TCP connect once
 *        Request 1 → Response
 *        Request 2 → Response
 *        Request 3 → Response
 *        TCP close later
 *    > Benefit:
 *      - Reduces connection overhead
 *      - Faster communication
 *
 * 2. Chunked Transfer Encoding
 *    > Server can send response in smaller chunks instead of waiting
 *      to prepare full response.
 *    > Example:
 *      - Chunk 1 → sent immediately
 *      - Chunk 2 → sent later
 *      - Chunk 3 → sent later
 *    > Benefit:
 *      - Faster response start
 *      - Better for large data
 *
 * 3. Host Header (Virtual Hosting Support)
 *    > HTTP/1.0 required separate IP for each website.
 *    > HTTP/1.1 introduced mandatory Host header.
 *    > Example: Host: example.com
 *    > Benefit:
 *      - Multiple websites can share one IP
 * 
 *    > Example:
 *      - Same IP → google.com
 *      - Same IP → facebook.com
 *      - Same IP → amazon.com
 *
 *
 * 4. New HTTP Methods Introduced
 *    a. OPTIONS: Used to check allowed methods on resource
 *    b. PUT    : Used to upload or replace resource
 *    c. DELETE : Used to delete resource
 *    d. TRACE  : Used for debugging request path
 *    e. CONNECT: Used to create tunnel (used in HTTPS proxy)
 *
 * 5. Improved Caching Mechanism
 *    > Cache-Control header added for better cache control
 *    > Examples:
 *     a. Cache-Control: max-age=3600
 *        - Cache valid for 1 hour
 *     b. Cache-Control: no-cache
 *        - Always check server before using cache
 *
 *    > ETag introduced:
 *      Example: ETag: "abc123"
 * 
 *    > Benefit:
 *     - Browser checks if resource changed
 *     - Avoids unnecessary re-download
 *
 *
 * 6. No Multiplexing (Major Limitation)
 *    > Multiplexing means sending multiple requests simultaneously
 *      on same TCP connection.
 *    > HTTP/1.1 does NOT support true multiplexing.
 *    > Actual behavior:
 *      - Request 1 → wait for response
 *      - Request 2 → wait for response
 *      - Request 3 → wait for response
 *    > Even though connection is persistent, requests are handled 
 *      sequentially.
 *
 * 7. Head-of-Line (HOL) Blocking Problem
 *    > If one request is slow, all subsequent requests must wait.
 *    > Example:
 *      - Request 1 → slow response
 *      - Request 2 → waiting
 *      - Request 3 → waiting
 *    > Result: Overall performance slows down
 *
 * 8. No Header Compression
 *    > Headers sent in plain text every time.
 *    > Example:
 *      - User-Agent
 *      - Cookie
 *      - Authorization
 *    > Problem: Same headers sent repeatedly → increases size and latency
 *
 * 9. Optional Encryption using TLS
 *    > HTTP/1.1 can use TLS to become HTTPS.
 *    > Example:
 *      - HTTP  → Not secure
 *      - HTTPS → Secure (HTTP + TLS)
 *
 *
 * Summary of HTTP/1.1 Improvements over HTTP/1.0:
 * a. ✔ Persistent connections
 * b. ✔ Chunked transfer encoding
 * c. ✔ Host header support
 * d. ✔ Improved caching (Cache-Control, ETag)
 * e. ✔ New HTTP methods
 *
 * Limitations of HTTP/1.1:
 * a. ✖ No multiplexing
 * b. ✖ Head-of-line blocking
 * c. ✖ No header compression
 * d. ✖ Slower compared to HTTP/2 and HTTP/3
 */


/**
 * HTTP/2:
 * > HTTP/2, introduced in 2015 (standardized in RFC 7540), was designed
 *   to improve the performance limitations of HTTP/1.1. It introduced
 *   multiplexing, header compression, and server push, making web communication
 *   faster and more efficient.
 *   a. Multiplexing:
 *      - Parallel http requests not sequential over same TCP connection
 *   b. Optional Encryption via TLS
 *   c. Head of Blocking in TCP Level:
 *      - Since same TCP connection is used if any segment is lost then TCP
 *        stop all other resources to send and first retry that packet until
 *        receives.
 *   d. Header Compression
 *   e. Comparatively faster than HTTP/1.1 dues to multiplexing but it gets
 *      limited by TCP.
 * 
 * > Pipelining vs Multiplexing:
 *   a. TCP Connections:
 *      - HTTP/1.1 Pipelining: uses a single TCP Connection
 *      - HTTP/2 Multiplexing: uses a single TCP connection but more efficiently
 *   b. Request Handling:
 *      - HTTP/1.1 Pipelining: Requests are sent sequentially without waiting for responses.
 *      - HTTP/2 Multiplexing: Requests are sent in parallel (simultaneously)
 *   c. Response Order:
 *      - HTTP/1.1 Pipelining: Responses must be returned in order
 *      - HTTP/2 Multiplexing: Responses can be returned out of order.
 *   d. Head-of-Line (HOL) Blocking:
 *      - HTTP/1.1 Pipelining: Yes, if one request is slow, others must wait.
 *      - HTTP/2 Multiplexing: No, independent streams prevent blocking.
 *        However, because it still relies on TCP, packet loss in one stream
 *        blocks all other streams in that connection.
 *   e. Efficiency & Performance:
 *      - HTTP/1.1 Pipelining: Inefficient, as slow requests cause delays.
 *      - HTTP/2 Multiplexing: Highly efficient, allowing multiple requests
 *        & responses at the same time.
*/

/**
 * HTTP/2 (Introduced in 2015)
 * > HTTP/2 was introduced in 2015 (RFC 7540).
 * > It was designed to fix the performance limitations of HTTP/1.1,
 *   especially slow loading due to sequential request handling.
 * > HTTP/2 introduced major improvements like:
 *     - Multiplexing
 *     - Header compression
 *     - Server push
 *
 *
 * 1. Multiplexing (Major Improvement)
 *    > HTTP/1.1 behavior:
 *        Request 1 → wait for response
 *        Request 2 → wait for response
 *        Request 3 → wait for response
 *   
 *    > HTTP/2 behavior:
 *        Request 1 ┐
 *        Request 2 ├── sent in parallel on same TCP connection
 *        Request 3 ┘
 *   
 *        Responses can arrive in any order.
 *   
 *    > Benefit:
 *      - Multiple parallel requests over single TCP connection
 *      - Faster page loading
 *
 *
 * 2. Uses Streams (Internal mechanism)
 *    > HTTP/2 divides communication into independent streams.
 *    > Example:
 *      - Stream 1 → HTML
 *      - Stream 2 → CSS
 *      - Stream 3 → JS
 *      - Stream 4 → Images
 *    > All streams share same TCP connection but operate independently.
 *
 *
 * 3. Header Compression (HPACK)
 *    > HTTP/1.1 sends headers as plain text repeatedly.
 *    > Example headers:
 *      - Cookie
 *      - Authorization
 *      - User-Agent
 *    > HTTP/2 compresses headers using HPACK compression.
 *
 *    > Benefit:
 *      - Reduces data size
 *      - Reduces latency
 *      - Improves performance
 *
 * 4. Server Push
 *    > Server can send resources before browser requests them.
 *    > Example:
 *      - Browser requests: index.html
 *      - Server automatically sends: style.css, script.js
 *    > Benefit:
 *      - Reduces request-response delay
 *      - Faster page loading
 *
 * 5. Optional Encryption using TLS
 *    > HTTP/2 supports both:
 *      - HTTP/2 → without encryption
 *      - HTTPS/2 → with TLS encryption
 *    > In practice, most browsers use HTTP/2 only with HTTPS.
 *
 * 
 * 6. Head-of-Line Blocking at TCP Level (Limitation)
 *    > HTTP/2 removes application-level blocking.
 *    > But still uses single TCP connection.
 *    > Problem:
 *      - If one TCP packet is lost, TCP must retransmit that packet first,
 *        All other streams must wait.
 *      - This is called: TCP-level Head-of-Line Blocking
 *
 *
 * 7. Performance Compared to HTTP/1.1
 *    > HTTP/2 is faster because:
 *      ✔ Multiplexing
 *      ✔ Header compression
 *      ✔ Single connection reuse
 *   > But still limited by TCP blocking.
 *
 *
 * 8. Pipelining vs Multiplexing
 *
 * HTTP/1.1 Pipelining:
 *
 *     Uses single TCP connection
 *
 *     Requests sent sequentially:
 *
 *         Request 1 → Request 2 → Request 3
 *
 *     Responses must return in same order
 *
 *     Blocking occurs if one request is slow
 *
 *
 *
 * HTTP/2 Multiplexing:
 *
 *     Uses single TCP connection
 *
 *     Requests sent in parallel:
 *
 *         Request 1 ┐
 *         Request 2 ├─ simultaneously
 *         Request 3 ┘
 *
 *     Responses can return in any order
 *
 *     No application-level blocking
 *
 *
 *
 * 9. Example Visual Comparison
 *
 * HTTP/1.1:
 *
 *     TCP Connection
 *         ↓
 *     Request 1 → Response 1
 *     Request 2 → Response 2
 *     Request 3 → Response 3
 *
 *
 *
 * HTTP/2:
 *
 *     TCP Connection
 *         ↓
 *     Request 1 ┐
 *     Request 2 ├── parallel streams
 *     Request 3 ┘
 *
 *     Response 2
 *     Response 1
 *     Response 3
 *
 *
 *
 * Improvements over HTTP/1.1:
 *
 * ✔ Multiplexing
 * ✔ Header compression
 * ✔ Faster communication
 * ✔ Server push support
 *
 *
 *
 * Limitation:
 *
 * ✖ Still affected by TCP-level Head-of-Line blocking
 *
 *
 *
 * Final takeaway:
 *
 * HTTP/2 significantly improves performance over HTTP/1.1 by allowing
 * parallel requests over a single connection, but still inherits TCP-level
 * blocking limitations, which HTTP/3 solves using QUIC.
 *
 */



/**
 * HTTP/3:
 * > HTTP/3, introduced in 2018 and standardized in RFC 9114, is the latest
 *   version of HTTP. It replaces TCP with QUIC (Quick UDP Internet Connections)
 *   to improve speed, reliability, and security.
 *   a. Supports Multiplexing
 *   b. Build in Encryption via TLS
 *   c. No Head of Line Blocking = QUIC (UDP-based) handles lost packets
 *      independently in each stream, so one delay packet doesn't block
 *      other streams.
 *   d. Header Compression
 *   e. Faster than both HTTP/1.1 & HTTP/2. 
 *   f. QUIC = Quick UDP Internet Connection, Unlike UDP it has retry 
 *      mechanism for lost packets
 *   g. Requires support for QUIC (UDP-based), which may not be fully
 *      supported by older networks or devices.
 *   h. May have compatability issues with certain middleboxes (like firewalls
 *      or proxies) that are not QUIC-aware.
 *   i. Requires more resources due to additional complexity of QUIC,
 *      impacting performance on resource-constrained devices.
*/


/**
 * HTTP/3 (Introduced in 2018, Standardized in RFC 9114)
 *
 * > HTTP/3 is the latest version of HTTP.
 *
 * > It replaces TCP with QUIC (Quick UDP Internet Connections),
 *   which runs on top of UDP instead of TCP.
 *
 * > Main goal:
 *     - Faster communication
 *     - Lower latency
 *     - Better handling of packet loss
 *     - Improved reliability
 *
 *
 *
 * 1. Uses QUIC instead of TCP (Major Change)
 *
 * > HTTP/1.1 and HTTP/2 use TCP
 *
 * > HTTP/3 uses QUIC, which is built on UDP
 *
 *
 * Comparison:
 *
 *     HTTP/1.1 → TCP
 *     HTTP/2   → TCP
 *     HTTP/3   → QUIC (UDP-based)
 *
 *
 * Benefit:
 *
 *     - Faster connection establishment
 *     - Better performance on slow or unstable networks
 *
 *
 *
 * 2. Multiplexing without Blocking
 *
 * > HTTP/3 supports multiplexing like HTTP/2.
 *
 * > Multiple streams can send data in parallel.
 *
 * Example:
 *
 *     Stream 1 → HTML
 *     Stream 2 → CSS
 *     Stream 3 → JS
 *     Stream 4 → Image
 *
 *
 * But unlike HTTP/2:
 *
 *     Packet loss in one stream does NOT block others.
 *
 *
 *
 * 3. No Head-of-Line Blocking (Major Advantage)
 *
 * Problem in HTTP/2:
 *
 *     Uses TCP
 *
 *     If one packet is lost → TCP stops all streams
 *
 *
 * Solution in HTTP/3:
 *
 *     QUIC handles each stream independently
 *
 *     Lost packet affects only that stream
 *
 *     Other streams continue normally
 *
 *
 * Benefit:
 *
 *     - Faster loading
 *     - Better performance on poor networks
 *
 *
 *
 * 4. Built-in Encryption (TLS 1.3 Mandatory)
 *
 * > HTTP/3 always uses encryption.
 *
 * > TLS 1.3 is built directly into QUIC.
 *
 *
 * Comparison:
 *
 *     HTTP/1.1 → optional encryption
 *     HTTP/2   → optional encryption
 *     HTTP/3   → mandatory encryption
 *
 *
 * Benefit:
 *
 *     - More secure communication
 *     - Faster secure connection setup
 *
 *
 *
 * 5. Faster Connection Establishment
 *
 * > QUIC combines:
 *
 *     TCP connection setup
 *     + TLS handshake
 *
 * Into a single step.
 *
 *
 * Benefit:
 *
 *     - Faster connection startup
 *     - Reduced latency
 *
 *
 *
 * 6. Header Compression (QPACK)
 *
 * > HTTP/3 compresses headers using QPACK.
 *
 * Similar to HTTP/2 HPACK but optimized for QUIC.
 *
 *
 * Benefit:
 *
 *     - Smaller data size
 *     - Faster transmission
 *
 *
 *
 * 7. QUIC Provides Reliability (Unlike Traditional UDP)
 *
 * > UDP normally does NOT guarantee delivery.
 *
 * > QUIC adds reliability features:
 *
 *     - Packet retransmission
 *     - Error correction
 *     - Packet ordering
 *
 *
 * So QUIC provides:
 *
 *     Speed of UDP
 *     + Reliability of TCP
 *
 *
 *
 * 8. Performance Improvement over HTTP/1.1 and HTTP/2
 *
 * HTTP/3 is faster because:
 *
 * ✔ No TCP-level blocking
 * ✔ Faster connection setup
 * ✔ Independent streams
 * ✔ Built-in encryption
 *
 *
 *
 * 9. Limitations of HTTP/3
 *
 * > Requires QUIC support in:
 *
 *     - Browser
 *     - Server
 *     - Network
 *
 *
 * > Some older systems may not support QUIC.
 *
 *
 * > Firewalls or proxies may block UDP traffic.
 *
 *
 * > Slightly higher CPU usage due to QUIC complexity.
 *
 *
 *
 * 10. Protocol Comparison Summary
 *
 * HTTP/1.1:
 *
 *     Transport: TCP
 *     Multiplexing: No
 *     Blocking: Yes
 *
 *
 * HTTP/2:
 *
 *     Transport: TCP
 *     Multiplexing: Yes
 *     Blocking: Yes (TCP-level)
 *
 *
 * HTTP/3:
 *
 *     Transport: QUIC (UDP-based)
 *     Multiplexing: Yes
 *     Blocking: No
 *
 *
 *
 * Final takeaway:
 *
 * HTTP/3 is the fastest and most efficient HTTP version because it uses
 * QUIC instead of TCP, eliminating head-of-line blocking and providing
 * faster, secure, and reliable communication.
 *
 */



/**
 * HTTP Request Methods:
 * > HTTP request methods tell the server what action the client wants to 
 *   perform.
 * > Each method has a different purpose and behavior. 
 * > It defines the action the client wants to perform on the server. 
 * > It helps manage data retrieval, creation, modification, and deletion 
 *   efficiently.
 *   a. GET: Retrieves data from the server. No req body is allowed.
 *   b. POST: Sends new data to the server (e.g.,submit form data or new data)
 *   c. PUT : Updates existing data by replacing the entire resource.
 *   d. PATCH: Partially updates existing data, modifying only specific fields.
 *   e. DELETE: Removes data from the server. No req body is allowed.
 *   f. HEAD: Similar to GET, but only returns response header, not the body. 
 *   g. OPTIONS: Retrieves allowed nethods for a resource, often used in
 *      CORS preflight requests.
*/

/**
 * Question: To create a search API for an e-commerce platform, which
 * request method should be used?
 * > Although GET seems appropriate, it has a character limit of 256 bytes.
 *   Since search API's can have multiple filters, POST is a better choice.
*/


/**
 * HTTP Headers:
 * > HTTP headers are key-value pairs sent between the client 
 *   (e.g., a browser) and the server to provide additional information about
 *   the request or response.
 * 
 *   a. Request Headers: 
 *      - Sent by the client to provide metadata about the request.
 * 
 *   b. Response Headers: 
 *      - Sent by the server to provide metadata about the response.
*/


/**
 * How HTTP Headers Work?
 * 
 * > Common Request Headers:
 *   a. Connection: Keep-Alive / Close:
 *      - Allows the HTTP connection to persist across multiple requests.
 *      - If Keep-Alive is set, subsequent requests do not need to establish
 *        a new connection.
 *      - If the server sends this header in the response, it can be used 
 *        for Server-Sent Events (SSE) to enable real-time updates on the 
 *        client side.
 * 
 *   b. Accept: 
 *      - Specifies the types of content the client can process.
 *      - Example: Accept: text/html, application/json .
 * 
 *   c. Authorization:
 *      - Contains credentials for authenticating the client.
 *      - Example: Authorization: Bearer <token> .
 * 
 *   d. Cookie:
 *      - Sends stored cookies from the client to the server.
 *      - Example: Cookie: sessionId=abc123 .
 * 
 *   e. User-Agent:
 *      - Provides information about the client making the request.
 *      - Example: User-Agent: Mozilla/5.0
 * 
 * 
 * > Common Response Headers:
 *   a. Set-Cookie:
 *      - Used by the server to set cookies on the client.
 *      - Example: Set-Cookie: sessionId=abc123; HttpOnly 
 * 
 *   b. Content-Type:
 *      - Specifies the type of content being returned.
 *      - Example: Content-Type: application/json 
 *  
 *   c. ETag:
 *      - Used for cache validation and content optimization.
 *      - Helps browsers determine whether content has changed since the last
 *        request.
 * 
 * 
 * > Custom Headers:
 *   - Developers can define custom headers for application-specific needs.
 *   - Example: X-Custom-Header: customValue
*/


/**
 * Why are HTTP Headers Important?
 * > HTTP is a stateless protocol, meaning the server does not retain session
 *   information.
 * > Headers provide additional metadata to make requests statefull, enabling
 *   functionalities like:
 *   - Authentication
 *   - Caching
 *   - Content Negotiation
 *   - Real-time Communication
*/


/**
 * Status Codes:
 * > HTTP status codes are three-digit numbers included in the HTTP response
 *   from a server to indicate the result of the request made by the client.
 * > Status Codes:
 *   - 1xx - information server has sent but not data that client is using
 *   - 2xx - Success
 *   - 3xx - Redirection
 *   - 4xx - You are Wrong (page not found, unauthorized, forbidden)
 *   - 5xx - I am wrong (Bad Gateways, Internal server error)
*/

/**
Code   Meaning                              Category
100 :  Continue                             1xx (Informational)
101 :  Switching Protocols                  1xx (Informational)
102 :  Processing                           1xx (Informational)
200 :  OK                                   2xx (Success)
201 :  Created                              2xx (Success)
202 :  Accepted                             2xx (Success)
204 :  No Content                           2xx (Success)
301 :  Moved Permanently                    3xx (Redirection)
302 :  Found                                3xx (Redirection)
303 :  See Other                            3xx (Redirection)
304 :  Not Modified                         3xx (Redirection)
307 :  Temporary Redirect                   3xx (Redirection)
308 :  Permanent Redirect                   3xx (Redirection)
400 :  Bad Request                          4xx (Client Error)
401 :  Unauthorized                         4xx (Client Error)
403 :  Forbidden                            4xx (Client Error)
404 :  Not Found                            4xx (Client Error)
405 :  Method Not Allowed                   4xx (Client Error)
406 :  Not Acceptable                       4xx (Client Error)
408 :  Request Timeout                      4xx (Client Error)
409 :  Conflict                             4xx (Client Error)
410 :  Gone                                 4xx (Client Error)
411 :  Length Required                      4xx (Client Error)
412 :  Precondition Failed                  4xx (Client Error)
413 :  Payload Too Large                    4xx (Client Error)
414 :  URI Too Long                         4xx (Client Error)
415 :  Unsupported Media Type               4xx (Client Error)
429 :  Too Many Requests                    4xx (Client Error)
500 :  Internal Server Error                5xx (Server Error)
501 :  Not Implemented                      5xx (Server Error)
502 :  Bad Gateway                          5xx (Server Error)
503 :  Service Unavailable                  5xx (Server Error)
504 :  Gateway Timeout                      5xx (Server Error)
505 :  HTTP Version Not Supported           5xx (Server Error)
*/