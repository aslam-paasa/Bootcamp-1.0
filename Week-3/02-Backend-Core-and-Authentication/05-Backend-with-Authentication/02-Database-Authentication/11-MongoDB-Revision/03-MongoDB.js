/**
 * Three Jargons to know in Databases:
 * 1. Cluster
 * 2. Database
 * 3. Table
 * 
 *                                     Cluster
 *          Database                   Database                  Database
 *    +---------------------+   +---------------------+   +---------------------+
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    | | Table | | Table | |   | | Table | | Table | |   | | Table | | Table | | 
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    | | Table | | Table | |   | | Table | | Table | |   | | Table | | Table | | 
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    +---------------------+   +---------------------+   +---------------------+
 * 
 * 
 * 1. Cluster:
 * => A Cluster basically is you have bought a AWS machine and jaha pe you
 *    can run multiple databases, and we can put multiple tables inside 
 *    databases. 
 * => A database cluster is a collection of databases managed by a single 
 *    database server.
 * => Using this inside MongoDB App we can connect to our MongoDB Cluster:
 *    mongodb+srv://aslampaasa420:*****@cluster0.goyedz2.mongodb.net/
 * 
 * 2. Database:
 * => Suppose we have one application, we might have a course selling,
 *    social network, ecommerce. Each one of them usually have separate
 *    database. For example, when we open mongoDB, on the side bar we
 *    can see studentDB, usersnewDB, courses etc databases.
 * 
 * 3. Table : 
 * => Inside every database there are multiple tables. 
 * => For example, inside studentDB database, we have movies table. 
 * 
 * So, Cluster, Database and Table are 3 high level jargons we have know
 * before we proceed to databases.
*/


/**
 * For Course Selling Applications like Udemy, we can structure it a few ways:
 * 
 *    V Cluster :
 *     V Database :
 *      V Table :
 *        +------------------------------+
 *        | +---------+    +-----------+ |
 *        | |  Users  |    |  Admins   | |
 *        | +---------+    +-----------+ |
 *        |                              |
 *        | +---------+    +-----------+ |
 *        | | Courses |    | Purchases | | 
 *        | +---------+    +-----------+ |
 *        +------------------------------+
 * 
 * => Purchases is a separate table and we don't store it directly in the
 *    Users table like we did before, like this :
*/

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


const CourseSchema = new mongoose.Schema({
    title: String,
    price: 5999
})


const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


/**
 * => Here, we are storing directly in the Users table. But there is a 
 *    new way to decide the schema, we can pick and choose whatever we 
 *    want:
 * 
 *                                     Cluster
 *          Database                   Database                  Database
 *    +---------------------+   +---------------------+   +---------------------+
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    | | Table | | Table | |   | | Table | | Table | |   | | Table | | Table | | 
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    | | Table | | Table | |   | | Table | | Table | |   | | Table | | Table | | 
 *    | +-------+ +-------+ |   | +-------+ +-------+ |   | +-------+ +-------+ |
 *    +---------------------+   +---------------------+   +---------------------+
 * 
 * 
 * => User Table would look something like this :
 *    [Purchases is a separate table, and don't want to store it directly
 *     in the Users table]
 * 
 *    V Cluster :
 *     V Database :
 *      V Table :
 *        +------------------------------+
 *        | +---------+    +-----------+ |
 *        | |  Users  |    |  Admins   | |
 *        | +---------+    +-----------+ |
 *        |                              |
 *        | +---------+    +-----------+ |
 *        | | Courses |    | Purchases | | 
 *        | +---------+    +-----------+ |
 *        +------------------------------+
 * 
 * => Users:
 *    +-----------------------------------------------------+
 *    | Id | Email              | Password | Name     | Age |
 *    +-----------------------------------------------------+
 *    |  1 | harkirat@gmail.com | 123123   | harkirat | 20  |
 *    |  2 | raman@gmail.com    | 123321   | harkirat | 22  |
 *    +-----------------------------------------------------+
 * 
 * => There is no need of storing purchased courses here. We have a 
 *    separate table that store them.
 * 
 * 
 * => Admins:
 * +------------------------------------------------+
 * | Id | Email               | Password | Name     |
 * +------------------------------------------------+
 * |  1 | admin@gmail.com     | 123123   | Raman    |
 * |  2 | admin2@gmail.com    | 123321   | harkirat |
 * +------------------------------------------------+
 * => In a course selling application, we would generally have admin.
 * 
 * 
 * => Courses :
 * +--------------------------------------------+
 * | Id | Title      | Description      | Price |
 * +--------------------------------------------+
 * | 1. | Full Stack | Learn Full Stack | 5000  |
 * | 2. | Web3       | Learn Web3       | 3999  |
 * +--------------------------------------------+
 * 
 * 
 * => Purchases :
 * +------------------------------------------------+
 * | user_id | course_id | timestamp  | payment_ref |
 * +------------------------------------------------+
 * | 1.      | 1         | 02/12/2024 | pay_123123  |
 * | 2.      | 1         | 02/12/2024 | pay_331213  |
 * +------------------------------------------------+
 * 
 * => This is how course selling application schema would look like if we
 *    are doing it this way.
*/


