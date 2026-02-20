/**
 * MongoDB Deep Dive :
 * => Understanding CRUD, mongoose and building an end-to-end authenticated app.
*/

/** Understand Databases with real life examples :
 * => Let's say you are an angry person who want to go court for some legislative
 *    things like divorce, file an fir etc. We will first go to our local court
 *    and submit some document and sit in some central place. If we lose from the
 *    court or new judge appointed because the old judge retired then you will
 *    dealing with him. If we loose in the local court, we might go to High Court
 *    and if we loose in High Court we can go to Supreme Court. Throughout you are
 *    interacting with 10 different judges but there will be a central place where
 *    all of our data will be stored like evidences (Photos of partner cheating
 *    on you). This place is incredibly secure. Courts/Judges can change but the
 *    data will be fine. Courts are transient, but this data is permanent.
*/ 

/**
 * Q. What is a database?
 * => It is a place where data is stored persistently.
 * => The browser interacts with http servers and http servers are transient.
 *    It might go up and down, infact server autoscale. We migh hit one
 *    server first which interacts with our database, we might hit some
 *    other server another time. But database is the thing that always
 *     the same.
 * => Server are transient, means it can goes down but database is persistent.
 *    It will stay there forever, but if we loose data because of natural
 *    calamities like earthquake or tsunami or volcanic eruption and our
 *    database is burnt down then the data is lost forever. This is why
 *    databases are replicated in multiple places.
 * 
 * =>                            HTTP Servers
 *                               +---------+
 *                               | Express |
 *                               +---------+
 * +---------+ Server autoscale  +---------+         +----------+
 * | Browser |------------------>| Express |-------->| Database |
 * +---------+                   +---------+         +----------+
 *                               +---------+
 *                               | Express |
 *                               +---------+
 * 
 * 
 * =>                         Servers are transient 
 * +---------+                   +---------+         +----------+
 * | Browser |------------------>| Express |-------->| Database |
 * +---------+                   +---------+         +----------+
 *                               +---------+
 *                               | Express |
 *                               +---------+
 * 
 * 
 * =>                                               Database is persistent
 *  +---------+                   +---------+         +----------+
 *  | Browser |------------------>| Express |-------->| Database |
 *  +---------+                   +---------+         +----------+
 *                                +---------+
 *                                | Express |
 *                                +---------+
 * 
 * => If all of our data stored in server at one single place, then an earthquake
 *    or tsunami etc hits, we will loose our data forever. That's why we keep 
 *    our data at different different servers [cluster of servers] at different 
 *    locations.
*/

/**
 * Examples of data stored in databases - For linkedin :
 * 1. User data
 * 2. User posts
 * 3. Users connection relationships
 * 4. Messages
 * 
 *            Get me my feed     Does auth checks     Give me all posts for this server
 *    [LinkedIn]---------------->[Express]-------------------->[Database]

*/

/**
 * Good question to have at this point :
 * Q. Why don't we let the user hit the database directly?
 * Q. Why do we need http layer in the middle?
 * Q. Why can't the user talk directly to the database?
 * Q. What extra does the http server provide exactly?
 * 
 *  1. Database were created using protocols that browsers don't understand.
 *  2. Databases don't have granual access as a first class citizen. Very hard
 *     to do user specific access in them.
 *  => When we say granual access, it means databases are like whoever has my
 *     password has access to the whole database means all userdata, user posts,
 *     user connections, messages etc. Databases either gives you access to
 *     everything or nothing. So, if the users who is hitting the request has
 *     the password, they have access to the whole thing. So, if we expose it
 *     directly to the browser, browser can directly talk to the database, that
 *     means whoever is present here like, Harkirat Singh can ask the database
 *     for any data. This is why we needs layer in the middle which "does auth
 *     checks". Express Server has complete access to the database, it needs to
 *     restrict access based on whoever is sending the request. If the request
 *     sending by Harkirat, he will see his own post, even though Express has
 *     access to the whole database.
 *  3. There are some databases (firebase) that lets you get rid of the http
 *     server and try their best to provide granola access.
 *
 *             Give me all posts for myself
 *  [LinkedIn]------------------------------>[Database]
 * 
 * 
 * Databases usually allow access to 4 primitives :
 *    1. Create Data
 *    2. Read Data
 *    3. Update Data
 *    4. Delete Data
 * => Popularly known as CRUD
*/

/**
 * Let's see the "API" for the mongoose library :
 * => Eventually, we'll be using PRISMA(which is the industry standard way of doing this),
 *    a library to talk to the database.
 * 
 * => In mongoose, first you have to define the schema. This sounds counter intuitive since
 *    mongodb is schemaless.
 * => That is true, but mongoose makes you define schema for things like:
 *    (a) automcompletions,
 *    (b) data validations etc... , before it goes in the DB to make sure you're doing things
 *        right.
 *
 * => Schamesless DBs can be very dangerous, using Schema in mongoDB makes it slightly less 
 *    dangerous.
 * => Mongoose may the first step is to define your schema(structure).
 * => Schema  means "what is the structure of our data that we are putting
 *    inside our database". 
 * => For example, users can have :
 *    (a) email
 *    (b) password
 *    (c) firstName
 *    (d) city
 *    (e) age
 *    These are the 5 things that our needs to have and this is our schema.
 * => Now some database will tell you if you want to store data in me, you
 *    have to upfront tell me this is what the users table looks like. And
 *    this is called SQL Database (Structured Query Language).
 * => But MongoDB says send me whatever you want :
 *    (a) Request-1 :
 *          {
 *              email: "harkirat",
 *              password: "******",
 *          }
 *    (b) Request-2 :
 *          {
 *              username: "harkirat",
 *              password: "******",
 *          }
 * => Database doesn't differentiate/discriminate, we can send whatever we want.
 * => Even though MongoDB is this cool, it let us define any sort of schema/structure.
 * => Mongoose is a library that we will export in our ExpressJS Server.
 *    It says first tell me your schema/structure. Once you tell the schema
 *    then you can put whatever data you want into the database using some
 *    functions that mongoose provide us.
 * 
 * Q) Does that means the database suddenly become strict?
 * => No! We can still insert random data into the database using the GUI
 *    library, but our express server will not let us put anything outside
 *    of schema that we have defined. And that is the benefit of mongoose.
 * 
 * Q) How is this even a benefit?
 * => MongoDB is a database which lets us put anything inside it.
 * => We brought a library that is making is loose it feature that of putting
 *    anything inside it. But that's not completely true.
 * 
 * Q) This sounds intuitive since mongodb is schemaless?
 * => That is true, but mongoose makes you define schema for things like
 *    (a) autocompletion/autosuggestion in IDE(VS Code) : We are dump developer
 *        so mongoose provide autosuggestions while writing schema code.
 *        This provides type safety on top of MongoDB
 *    (b) validating data before it goes in the database to make sure we're
 *        doing things right.
 * => Schemaless DBs can be very dangerous, using schemas in MongoDB makes
 *    it slightly less dangerous.
*/

/** 
 * Q) How would we define schema inside mongoDB?
 * => I have a course selling application like Udemy, what would our database
 *    look like in that case?
 * */  


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
 * Q. Now we have these 2 schemas, how would we store in the database that harkirat has purchased 
 * these 2 courses?
 * => In the MongoDB we can create very nested objects, which SQL doesn't
 *    let us do. In SQL, generally we have tables to store values, so we
 *    never see complex objects here. But mongoDB let's us do it.

 *    _id: "ObjectId"("658c0972e1458e4e7d08ade")
 *    name: "harkirat"
 *    V courses: Array
 *        0:"Full Stack Course"
 *        1: "Web Course"

 * => So, the way to create relationships in MongoDB is just by creating an
 *    array of things that harkirat wants. And that is why there is this
 *    3rd field. This says every user has an email and password and they
 *    have purchasedCourses which is an array of "type: ObjectId" and
 *    "ref: Course", and this is the relationship:
 *
 *    purchasedCourses: [{
 *        type: mongoose.Schema.Types.ObjectId,
 *        ref: 'Course'
 *    }]

 * => It says every user has email & password and they have purchasedCourses
 *    which is an array of type "ObjectId" and "ref: 'Course'"

 *       user                                         courses
 * +-------------------------------------+         +-----------------------+
 * | Id | username | password | firstName|         | Id | Title   | Course |
 * +-------------------------------------+         +-----------------------+
 * | 1  | harkirat | 123      | carl     |<------->| 1  | Web Dev | 5000   |
 * | 2  |          |          |          |         | 2  | DSA     | 3999   |
 * +-------------------------------------+         +-----------------------+

 * => Now we have to create relationship that what all courses harkirat want.
 * => We can create a new table called "purchased_courses" and here we can 
 *    store user_id & courses. And this is how we do in SQL Database.

 *  purchased_courses:
 * +-----------------------+
 * | user_id | course_id   |
 * +-----------------------+
 * |   1     |    1        |
 * |   1     |    2        |
 * +-----------------------+
 * This means harkirat has bought course having course_id: 1 & 2.

 * Whenever harkirat goes to the website and hit website & does payment
 * we would put entries in this table. And this is our SQL Schema (one of the
 * way to structure Course Selling App)
 *
*/


/**
 * Q. What is the other way of doing it?
 * => Use a NoSQL Property :
 *    {
 *        username:
 *        password:
 *        purchasedCourses: []
 *    }
 * => And this array is references to another table i.e. "Courses". It basically
 *    means this purchasedCourse points to Courses. We can just store the
 *    "id" of course here in purchaseCourses. So, we create purchaseCourses
 *    as an array of individual courses.
 *
 * V courses: Array
 *     0:"Full Stack Course"
 *     1: "Web Course"
 *
 * => And mongoDB this is how we define Schema.
 *
 * Note : Now we understood "ref: 'Course'"
 *
 * And understood that :
 * (a) const User = mongoose.model('User', UserSchema);  // User Table
 *     => UserSchema points to User table
 * (b) const Course = mongoose.model('Course', CourseSchema); // Course Table
 *     => CourseSchema points to Course table
 *
*/


/**
 * Q. What is this => type: mongoose.Schema.Types.ObjectId?
 * => Whenever we are creating a new field in mongoDB, the randomly generated
 *    Id for that is called ObjectId. purchasedCourses will have an ID/reference
 *    to Course Schema.
 *
 *    _id: "ObjectId"("658c0972e1458e4e7d08ade")
 *    name: "harkirat"
 *    V courses: Array
 *        0:"Full Stack Course"
 *        1: "Web Course"
 *
*/