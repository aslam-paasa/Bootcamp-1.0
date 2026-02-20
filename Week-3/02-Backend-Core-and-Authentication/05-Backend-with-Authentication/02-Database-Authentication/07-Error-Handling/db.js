/**
 * 1. Initialize the database connection:  
*/
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://aslampaasa420:Sy**********er@cluster0.goyedz2.mongodb.net/todosdb");

/**
 * 2. Import the Schema and ObjectId from mongoose:
 * - Schema is used to create the blueprint for the todos
 * - ObjectId is used to create the unique id for the todos
*/
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * 3. Blueprint of database: Create the schema for the todos:
 * => Structure of the data that reaches the database
*/

const User = new Schema({
    username: String,
    email: String,
    password: String,
})  

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean,
})  

/**
 * 4. Create the model for the todos:
*/
const UserModel = mongoose.model('User', User);
const TodoModel = mongoose.model('Todo', Todo);

/**
 * Our Database is created. Now we can put it inside the POST request:
 * => We will post the username and password from the end user
 * => But before that we have to check, does someone with this username
 *    already exist.
*/

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel,
};