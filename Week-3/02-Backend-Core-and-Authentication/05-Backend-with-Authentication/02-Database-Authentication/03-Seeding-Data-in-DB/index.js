/**
 * Seeding data in the database:
 * Mongoose is an Object Data Modeling(ODM) library for MongoDB and Node.js. 
 * It provides a higher-level, schema-based abstraction over the MongoDB
 * JavaScript driver. Mongoose acts as a powerful bridge between Node.js
 * applications and MongoDB databases. It streamlines the data modelling 
 * process, simplifies interactions with the database, and enhances the
 * overall development experience when working with MongoDB in a Node.js
 * environment.
*/

/**
 * 1. We are building a backend logic/server that is somehow connected to 
 *    the database.
 * 2. The end-user can send one of three requests:
 *    (a) '/signup' => That will give us:
 *                     {
 *                        username
 *                        password
 *                        firstname
 *                     }
 *     => And when they give us these, we have to put them in the database,
 *        provided someone with this username doesn't already exist.
 * 
 *    (b) '/signin' => Our backend needs to check - does this user actually exist
 *        in the database and if their password correct then we return them back
 *        the jwt token, else stop them.
 * 
 *    (c) /user,(header) => Here we expect a header where the user sends us, the 
 *        jwt they got here, we hit the database, get back all the users.
*/

/**
 * => Writing MongoDB Validation, Casting and Business Logic boilerplate
 *    is a drag. That's why we use mongoose.
 * => Basically we can do it without mongoose also, but mongoose uses 
 *    some extra things also:
 *    1. MongoDB Validation: MongoDB is Schemaless so we can put anything
 *       there. But sometimes we need to verify we are putting certain
 *       format there.
 *    => Whenever we try to write to the database, first we have to tell
 *       what our model is, Schema looks like or what in this Cat database
 *       we are expecting to put in there.
 * 
 *             const mongoose = require('mongoose');
 *             mongoose.connect('mongodb://127.0.0.1:27017/test'); 
 * 
 *             const Cat = mongoose.model('Cat', { name: String});
 *    
 *    => Once we define the schema, then only we will put the data in the
 *       database.
 * 
 *             const kitty = new Cat({ name: 'Zildjian' });
 *             kitty.save().then(() => console.log('meow'));
 * 
 * Let's create a simple code that let's use write to the mongoDB database:
 * */ 


/**
 * 1. Importing mongoose library:
 * => npm install mongoose
*/
const mongoose = require('mongoose');

/**
 * 2. Connecting mongoDB using mongoose:
 * => mongoose.connect('mongodb_url');
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy**********er@cluster0.goyedz2.mongodb.net/usersnewdb");

/**
 * 3. Creating schema model inside mongoDB
*/
const User = mongoose.model('Users', { name: String, email: String, password: String});

/**
 * 4. Creating User in-memory
 * => It will not save it, it will not reach the database
*/
const user = new User({ 
    name: 'Mohammad Aslam', 
    email: 'mohammad@example.com', 
    password: '123456'});

/**
 * 5. Saving data to the database
 * => Once we npm run, schema will be created inside the mongodb
*/
user.save();