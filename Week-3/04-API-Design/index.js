/**
 * API:
 * > An API is a set of rules that allow different software applications
 *   to communicate with each other. 
 * > It defines how one app can request data from another app and how 
 *   the data should be returned.
 * 
 * > API stands for Application Programming Interface. 
 * > It allows different software systems to interact by defining how 
 *   requests and responses should be structured between them.
*/

/**
 * How to APIs work?
 * > APIs work by having a client (the app making the request) send a 
 *   request to a server (the app or system providing the data or service).
 * > The server then processes the request and sends back a response 
 *   with the requested data.
*/


/**
 * Types of APIs:
 * 1. SOAP APIs : 
 *    - Older type, uses XML to exchange data between client and server.
 * 
 * 2. RPC APIs:
 *    - The client sends a request to the server to perform a task, and
 *      the server sends the result back.
 * 
 * 3. REST APIs:
 *    - The most common type, where the client sends a request with data,
 *      and the server responds with data.
 * 
 * 4. WebSocket APIs:
 *    - Supports two-way communication between client and server,
 *      where the server can send updates to the client.
*/


/**
 * REST Principles:
 * > REST (Representational State Transfer) is an architectural style 
 *   used for designing networked applications. 
 * > It operates over HTTP and is based on a set of principles and
 *   constraints that define how clients and servers communicate. 
 * > RESTful APIs are commonly used in web development.
*/

/**
 * Constraints of REST:
 * 1. Client-Server
 * 2. Statelessness
 * 3. Cacheability
 * 4. Uniform Interface
 * 5. Layered System
 * 6. Code on Demand (optional)
*/

/**
 * HTTP Verbs (methods) and their meanings:
 * 1. GET   : Retrieve a resource
 * 2. POST  : Create a new resource
 * 3. PUT   : Update or replace an existing resource
 * 4. DELETE: Remove a resource
 * 5. PATCH : Partially update an existing resource
*/

/**
 * API Versioning:
 * > API versioning is the process of managing changes to an API while 
 *   ensuring that existing clients continue to work even as new 
 *   functionality or updates are introduced. 
 * > This allows developers to improve or modify their API without 
 *   breaking existing integrations.
 * 
 * Why Versioning is Necessary?
 * 1. Backward Compatability
 * 2. Controlled Upgrades
 * 3. Deprecation Strategy
*/

/**
 * API Versioning Strategies:
 * 1. URL-Based Versioning
 * 2. Header-Based Versioning
 * 3. Query Parameter Versioning
 * 
 * Controlled upgrades allow new features or improvements to be introduced
 * gradually, without affecting existing functionality. This enables
 * users to adopt changes at their own pace, reducing the risk of
 * brealing existing integrations.
 * 
 * Key Point: Choose a versioning strategy that suits your organization's
 * workflow and is easy for external integrators to adopt.
*/


/**
 * Designing URL Structures:
 * > Designing clean, intuitive, and consistent URL (Uniform Resource 
 *   Locator) structures is crucial when building RESTful (and other) 
 *   APIs. 
 * > A well-designed URL structure makes your API easier to understand,
 *   adopt, and maintain.
 * 
 * 1. Resource-Oriented Design:
 *    a. Use nouns instead of verbs
 *       - Wrong  : /getProducts
 *       - Correct: /products
 *    
 *    b. Keep it hierarchical to reflect real-world realtionships
 *       - /users/{userId}/orders
 *       - /orders/{orderId}/items
 * 
 * 2. URL Naming Conventions:
 *    > Plural vs Singular:
 *       - Consistency is key.
 *       - Decide on once convention and stick to it.
 *       - Ex: /users, /orders
 *    > Avoid special characters or multiple levels of nesting that
 *      become unwieldly.
*/


/**
 * Filtering, Sorting, and Pagination:
 * 
 * Imagine you are building an online store API:
 * - You have 10,000 products in your database.
 * - Users will ask:
 *   > "Show only shoes"
 *   > "Sort by price"
 *   > "Give me page 2"
 * - Instead of creating different APIs for everything, we use 
 *   QUERY PARAMETERS.
 * 
 * > Query Parameters (Talking to the API):
 *    - /products?sort=price&order=desc&limit=10&page=2
 *    - Breakdown:
 *      > sort  = price -> Sort by Price
 *      > order = desc  -> Descending order
 *      > limit = 10    -> Only 10 results
 *      > page  = 2     -> Second page
 * 
 *    - Best Practice:
 *      > Keep your query parameters consistent across all endpoints.
 *      > Example:
 *        - /users?sort=name&order=asc&limit=5&page=1
 *        - /products?sort=price&order=desc&limit=10&page=2
 *      > Same structure → Easy to maintain → Clean API design
 * 
 * 1. Filtering (Narrowing Results):
 *    > Filtering means: "Only show me items that match a condition."
 *    > Example: /products?category=shoes
 *    > Meaning: Only return products where category = shoes
 *    > Multiple Filters: /products?category=shoes&brand=nike
 *    > That means: category = shoes AND brand = nike
 * 
 * 2. Sorting (Arranging Data):
 *    > Sorting means: "Arrange results in a specific order."
 *    > Example: /products?sort=price&order=asc
 *    > Meaning: Sort by price in ascending order (low → high)
 *    > Common Sorting Fields:
 *      - Price
 *      - createdAt
 *      - name
 *      - rating
 * 
 * 3. Pagination (Breaking Big Data into Pages):
 *    > If you return 10,000 products at once:
 *      - Slow response
 *      - High memory use
 *      - Bad user experience
 *    > So  we divide data into small chunks.
 * 
 *    There are two main strategies:
 *    a. Offset-Based Pagination (Simple but can be slow)
 *       - Uses offset and liit to fetch a specific set of records.
 *       - URL: /users?offset=20&limit=10
 *       - This means: Skip the first 20 users, then return the next 10.
 *       - Internally: SELECT * FROM users LIMIT 10 OFFSET 20;
 * 
 *       - Pros: Easy to implement, works well for small datasets.
 *       - Cons: Slow for large datasets because skipping many records
 *         takes time. 
 * 
 *       Imagine flipping pages in a book. If you want page 100, you
 *       still have to turn every page before it! 
 * 
 *    b. Page-Based Pagination (Commong Variation):
 *       - URL: /users?page=2&limit=10
 *       - Backend converts it to: offset = (page - 1) * limit
 *       - For page=2, limit=10: offset=10
 * 
 *    c. Cursor-based Pagination (Efficient for Large Data)
 *       - Uses a cursor (a unique ID from the last item) to fetch the
 *         next set.
 *       - URL: /users?cursor=abc123&limit=10
 *       - This means: 
 *         > "Start from the user with ID abc123" and 
 *         > "Return the next 10 users."
 *       - Internally:
 *         SELECT * FROM users
 *         WHERE id > 'abc123'
 *         ORDER BY id
 *         LIMIT 10;
 * 
 *       - Pros: Faster and more efficient for large datasets.
 *       - Cons: More complex to implement, requires sorting by a unique
 *         column (like ID).
 * 
 *    d. When to use What?
 *       > Small dataset: Offset pagination is fine
 *       > Large dataset: Cursor-based is better
 *       > Infinite Scrolling (like instagram): Cursor-based in ideal
 * 
*/

/**
 * API Documentation:
 * 1. OpenAPI:
 *    - OpenAPI Specification (formerly Swagger Specification) is an 
 *      API description format for REST APIs.
 *    - A specification that defines how to describe RESTful APIs in a
 *      machine readable format (using YAML/JSON).
 *    - Helps generate human-readable docs, interactive UIs, client
 *      libraries, and server stubs.
 * 
 *    Benefits of OpenAPI:
 *    a. Generate a Server Stub: 
 *       - Automatically create backend server code.
 *       - Tool: Swagger Codegen
 *    b. Generate Client Libraries:
 *       - Create client SDKs for multiple languages.
 *       - Tool: Swagger Codegen
 *    c. Interactive API Documentation:
 *       - Provides an easy-to-use interface for API exploration.
 *       - Tool: Swagger UI
 *    d. Automated Testing:
 *       - Simplifies API testing workflows.
 *       - Tool: SoapUI 
 * 
 *    Why use OpenAPI?
 *    - Standardized API Documentation
 *    - Enhances Developer Experience
 *    - Reduces Development Time
 *    - Supports Multiple Programming Languages
 *    - Facilitates Automated Testing & Validation
 *       
 * 
 *    swagger.json: Here is a sample swagger.json file
 *    {
 *      "openapi": "3.0.0",
 *      "info": {
 *        "title": "UserAPI",
 *        "version": "1.0.0",
 *        "description": "API for retrieving users"
 *      },
 *      "servers": [
 *        {
 *          "url": "http://localhost:3000",
 *          "description": "Local server"
 *        }
 *      ],
 *      "paths": {
 *        "/api/users": {
 *          "get": {
 *            "summary": "Get list of users",
 *            "description": "Returns a list of users",
 *            "responses": {
 *              "200": {
 *                "description": "A list of users",
 *                "content": {
 *                  "application/json": {
 *                    "schema": {
 *                      "type": "array",
 *                      "items": {
 *                        "type": "object",
 *                        "properties": {
 *                          "id": {
 *                            "type": "integer"
 *                          },
 *                          "name": {
 *                            "type": "string"
 *                          }
 *                        }
 *                      }
 *                    }
 *                  }
 *                }
 *              }
 *            }
 *          }
 *        }
 *      }
 *    }
 * 
 * 
 *                   /api-docs
 *    +--------+ ------------------> +--------+
 *    | Google |                     | Server |
 *    +--------+ <-----------------  +--------+
 *                 Response with     swagger.json
 *                Swagger html page
 *    
*/


/**
 * Request Validation:
 * > Request validation is the process of verifying that incoming request
 *   data conforms to predefined rules, formats, and constraints before 
 *   being processed by an application. 
 * > It helps ensure that only well-structured, expected, and safe data
 *   enters the system.
 * 
 * Key Aspects of Request Validation:
 * 1. Type Checking:
 *    - Ensures values match expected data types 
 *    - Ex: a string for names, integers for IDs.
 * 2. Required Fields:
 *    - Verifies that all necessary fields are present in the request.
 * 3. Data Format:
 *    - Ensures values follow the correct format 
 *    - Ex: email, date, phone number.
 * 4. Business Rules:
 *    - Validates domain-specific constraints 
 *    - Ex: age must be greater than 18.
 * 
 * Why is Request Validation Important?
 * 1. Consistency:
 *    - Ensures that the database or business logic only processes 
 *      well-formed data.
 *    - Prevents unexpected errors due to invalid input.
 * 
 * 2. Security:
 *    - Protects against SQL injection, XSS, and other malicious attacks
 *      by rejecting invalid or harmful input.
 *    - Reduces the risk of attackers exploiting weaknesses in your API.
 * 
 * 3. Better Client Experience:
 *    - Provides instant feedback to users when they send incorrect or 
 *      incomplete data.
 *    - Helps prevent unnecessary API failures and improves usability.
*/

/** 
 * Validation Approaches:
 * 1. Schema-Based Validation:
 *    - Uses JSON Schema or built-in validation frameworks 
 *    - Ex: Joi, Zod & Express - Validator etc.
 *    - Automatically enforces data structure, types, and constraints.
 * 2. Custom Validation Middleware:
 *    - Allows for custom business logic not covered by standard schema 
 *      validation.
 *    - Useful when dealing with complex or conditional validations.
*/


/** 
 * Response Optimization:
 * > Response Optimization is the process of refining how your server or
 *   API sends responses to clients. 
 * > The goal is to :-
 *   1. Improve performance
 *   2. Reduce latency
 *   3. Decrease server load and costs
 *   4. Enhance the user experience
 * 
 * Key Techniques of Response Optimization:
 * 1. Pagination and Limits:
 *    - Instead of sending all data at once, responses should include 
 *      only a subset of records.
 * 2. Data Compression:
 *    - Compress response payloads using Gzip, Brotli, or Deflate to 
 *      minimize data transfer size.
 * 3. Caching:
 *    - Store frequently accessed data to avoid unnecessary processing.
 * 4. Optimized Serialization:
 *    - Convert objects to efficient data formats before sending them to
 *      clients.
 *    - Reduce unnecessary fields in responses.
 *    - Use lightweight formats like MessagePack or Protocol Buffers 
 *      instead of JSON where needed.
 * 5. Efficient Data Structures:
 *    - Choose optimized data structures to store and retrieve data faster.
 *    - Avoid sending nested or deeply linked objects when unnecessary.
*/


/** 
 * Error Handling:
 * > Error handling in REST APIs is the process of capturing, processing,
 *   and communicating errors that occur during API requests.
 * > A well-structured error handling mechanism ensures:
 *   1. Better debugging
 *   2. Improved developer experience
 *   3. Clear and consistent error responses
 * 
 * Key Principles of Error Handling:
 * 1. Response Codes:
 *    - HTTP status codes should accurately reflect the type of error.
 *    - Common Error codes:
 *      a. 400 - Bad Request
 *      b. 401 - Unauthorized
 *      c. 404 - Not Found
 *      d. 500 - Internal Server Error
 *      e. 403 - Forbidden (Access Denied)
 * 
 * 2. Error Messages:
 *    - Provide clear and human-readable error messages.
 *    - Avoid vague messages like "Something went wrong".
 *    - Use standardized response structure.
 * 
 * 3. Consistency:
 *    - Maintain a consistent structure for error responses.
 *    - Ensure all endpoints follow the same format.
 * 
 * 4. Do not leak internal details:
 *    - Avoid exposing stack traces, database errors, or sensitive
 *      details in responses.
 *    - Bad practice (Exposes internal logic):
 *      {
 *         "error": "Database connection failed: Connection refused"
 *      }
 * 
 * 5. Logging and Monitoring:
 *    - Capture errors using logging tools like Winston, Morgon, or Sentry.
 *    - Helps in troubleshooting and debugging API failures.
*/