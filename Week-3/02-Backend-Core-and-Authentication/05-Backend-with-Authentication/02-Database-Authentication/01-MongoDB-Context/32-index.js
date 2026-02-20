/**
 * Context:
 * - In today's class, we'll understand about databases, and more specifically
 *   NoSQL databases. We'll learn about MongoDB, and how you can use it to
 *   persist data in your full stack app.
 * - Things to cover:
 *   1. Creating a free mongo db cloud server
 *   2. Connecting your full stack application to MongoDB
 *   3. Defining Schema
 *   4. Mongoose
 *   5. CRUD Operations
*/

/**
 * Why do we need databases?
 * Until now, we've been storing data in memory. This is bad for a few
 *    reasons - 
 * 1. Data can't be dynamic:
 *    Data can't be dynamic, if you update in memory objects, the updates
 *    are lost if the process restarts. Any updates or changes made to 
 *    in-memory objects are temporary and get lost if the process restarts.
 *    
 *    In real-world application, this limitation is significant because
 *    processes may restart due to various reasons such as: 
 *    a. server maintenance, 
 *    b. deployment, or 
 *    c. unexpected crashes.
 *    
 *    As a result, any dynamically updated information will be lost,
 *    leading to inconsistencies and potential data loss.
 * 
 * Ex: Imagine an application that keeps track of user sessions or 
 *     preferences. If this data is only stored in memory and the server
 *     restarts, all the user-related information would be reset, impacting
 *     the user experience.
 * 
 * 2. There are multiple servers in the real world:
 *    In real world, we don't have single backend server. We have multiple
 *    backend servers(cluster).
 * 
 *    Multiple servers may be used to distributed the load, enhance 
 *    performance, and ensure high availability. When data is confined 
 *    to the memory of  a single server, it becomes challenging to 
 *    maintain consistency and share data across the entire application
 *    infrastructure.
 * 
 *    a. How does it let the backend server put data in the database?
 *    b. How does it let the backend server to get data from the database?
 *    c. How does the backend server know that these are the credentials
 *       of the database, because database are hidden and we don't want to
 *       expose it to the user? We can only hit the backend server, not the
 *       database.
 *    d. How do we create data in the database?
 *    e. How do we store data in the database?
 *
 *    In real world, a basic architecture looks like this:
 *    +---------------------------------------------------------------+
 *    |                        +----------------------------------+   |
 *    | +---------+            |    +---------+    +----------+   |   |
 *    | | Browser |------------+--->| Backend |--->| Database |   |   |
 *    | +---------+            |    +---------+    +----------+   |   |
 *    |                        +----------------------------------+   |
 *    +---------------------------------------------------------------+
 * 1. User hits the backend
 * 2. Backend hits the database
 * 3. User doesn't have access to the database/can't talk to the DB directly.
 * */

/**
 * What are databases?
 * - Databases are organized collections of data that are structured to
 *   enable storage, retrieval, and management of information.
 * - Whenever you create a full-stack app, you persist data in databases.
 * - For example-
 *   1. User information
 *   2. TODOs of your todo app
 *   3. Posts for facebook
 *   4. Tweets for twitter
 * => [Frontend] ---------> [Backend] ---------> [Database]
*/

/**
 * Types of databases:
 * => There are various types of databases:
 *    1. Graph DBs
 *    2. Vector DBs
 *    3. SQL DBs
 *    4. NoSQL DBs
 * 
 * 1. Graph Databases:
 *    Graph Databases specialise in representing and navigating
 *    relationships between entities, making them ideal for applications
 *    emphasizing connected data.
 * Ex: Neo4j
 * 
 * 2. Vector Database:
 *    Vector databases effectively handle multidimensional and spatial
 *    relationships, particularly suited for applications dealing with
 *    spatial data.
 * Ex: InfluxDB
 * 
 * 3. SQL Databases:
 *    SQL databases follow a structured query language, maintaining a
 *    tabular structure for organized data storage, retrieval, and
 *    manipulation.
 * Ex: PostgreSQL
 * 
 * 4. NoSQL Databases:
 *    NoSQL databases offer flexibility in data modeling and are
 *    suitable for applications with evolving and diverse data needs.
 * Ex: MongoDB
*/


/**
 * NoSQL Databases:
 * NoSQL databases are a broad category systems that diverge from the
 * traditional relational mode used in SQL databases.
 * 
 * They are designed to handle a variety of data models and workloads that
 * may not fit neatly into the tabular schema of relational databases.
*/ 

/**
 * MongoDB:
 * MongoDB is a powerful and versatile NoSQL database that revolutionizes
 * data management with its flexible and scalable design. Here's a
 * breakdown of its key feature:
 * 
 * Properties of MongoDB(NoSQL DB):
 * 1. Database Creation:
 *    MongoDB allows users to create multiple databases, acting as distinct
 *    containers for organizing and storing data.
 * 
 * 2. Collection Creation:
 *    In each DB, it lets you create tables(collections)
 * 
 * 3. JSON Data Storage: Document-Oriented Model
 *    In each table, it lets you dump BSON(Binary JSON) data.
 *    This facilitates the storage of JSON-like documents in a flexible
 *    and readable manner.
 * 
 * 4. Schemaless Design:
 *    It is schemaless. Means documents within a collection can have
 *    varying structures, enabling easy adaptation to changing data
 *    requirements without grid schema constraints.
 * 
 * 5. Scalability:
 *    It is designed for horizontal scalibility, allowing the distribution
 *    of data across multiple servers or clusters. This horizontal scaling
 *    ensures optimal performance as data volumes and user loads increase.
 * 
 * 6. Versatility for Most Use Cases:
 *    MongoDB's adaptability makes it a reliable choice for a diverse
 *    range of use cases. Whether handling complex data structures or
 *    large datasets, MongoDB can efficiently meet the demands of 
 *    various applications.
*/

