/**
 * Till now we have done:
 * [Frontend] --------------> [NodeJS/Express] ------------> [MongoDB]
 *            a. POST/signup   a. Auth                        a. users (tables/collections)
 *            b. POST/signin   b. Storing data in DB          b. todos (tables/collections)
 *            c. POST/todo                                         |
 *            d. GET/todos                                         |
 *                                                                 |
 *                                +--------------------------------+
 *                                |
 *  Table-1: Users Collection:    V      Table-2: Todo Collection:                 |
 * +------------------------------+-------------------------------------+
 * |  id: 1 (userId)              |    title: "go to gym"               |
 * |  name: "Harkirat"            |    userId: 1 (foreign key)          |
 * |  email: "harkirat@gmail.com" |                                     |
 * |  password: "123456"          |                                     |
 * +------------------------------+-------------------------------------+
 * => Table-1 is the parent table and Table-2 is the child table    
 * => Table-2 has a foreign key called 'userId' which references the id of the 
 *    user in Table-1.
 * 
 * 
 * Improvements we need to do:
 * 1. Password is not hashed(visible in DB)
 * 2. A single crash(duplicate email) crashes the entire app
 * 3. Add more endpoints(mark todo as done)
 * 4. Add timestamp at which todo was created/the time it needs to be done by
 * 5. Relationships in Mongo
 * 6. Add validations to ensure email and password are correct format
 * 
*/

/**
 * Hashing Password:
 * - Password hashing is a technique used to securely store passwords in a
 *   way that makes them difficult to recover or misuse. Instead of storing
 *   the actual password, you store a hashed version of it.
 * 
 * [Frontend] ---------> [NodeJS/Express] ---------------> [MongoDB]
 *             Signup     harkirat@gmail.com               harkirat@gmail.com
 *             Signin     password: 123456   ==> hash ==>  password: avdksd
 * 
 * - Whenever a user sends a request from frontend to backend with their
 *   email and password, then this password should be hashed before it 
 *   reaches the database. Means plain text password should be converted
 *   to random string, and the database should only have this random string.
 * - Now when the user signin, how will we compare the original plain text
 *   password with the hash in the database? Whatever the hashing algorithm
 *   that converted plain text to hash, run that algorithm again and then
 *   then compare the hash in backend with the hash in the database.
 * 
 * Q. What if there are two people with same hash in db, which means their
 *    password is same? Doesn't that mean if I guess one password correctly,
 *    I can access both accounts? So, we need to figure out a way if their
 *    password is same, then their hash is different.
 * A. Salting:  
 *    - Imagine we have a very big dish, and in that dish put sprinkle
 *      some salt on it. Similarly, in the context of hashing, salt is
 *      following.
 *    - Salting is a technique where we add a random string to the password
 *      before hashing it. This random string is called salt.
 *    - We are storing two things in the database:
 *      a. Salt
 *      b. Hashed Password
 *    - Now even if two passwords are same, their hashes will be different
 *      because they will have different salts.
 * 
 * [Frontend] --------> [NodeJS/Express] - -------------> [MongoDB]
 *             Signup    harkirat@gmail.com               harkirat@gmail.com
 *             Signin    password: 1234568
 *                       Salt with pass: 1234568xl190 ==> hash ==> password: lengyqpuzmch
 * 
 *                       bill@gmail.com                   bill@gmail.com
 *                       password: 1234568
 *                       Salt with pass: 1234568fdal123 ==> hash ==> password: uskjdfscjkb
 * 
 * - When the user signin, we will again add the salt to the password and then  
 *   hash it and then compare the hash in backend with the hash in the database.
 * 
 * Note: SHA256 is famous hashing algorithm which is used to hash the password.
 *       But if we don't want to use SHA256, we can use bcrypt.
 * 
 * Bcrypt: 
 * - It is a cryptographic hashing algorithm designed for securely hashing
 *   passwords.
 * - Developed by Niels Provos and David Mazières in 1999, bcrypt incorporates
 *   a salt and is designed to be computationally expensive, making
 *   brute-force attacks more difficult.
 * - npm i bcrypt
*/

/**
 * Adding Password Encryption using Bcrypt Library: npm i bcrypt
 * Technique-1: Do it step by step
 * - First, we create a random string (called salt) using genSalt()
 * - The more times we run genSalt (using saltRounds), the more secure it is
 * - After salt is made, we mix it with the password and make it unreadable
 * - It looks like this:
 * 
 *    bcrypt.genSalt(saltRounds, function(err, salt) {
 *        bcrypt.hash(password, salt, function(err, hash) {
 *            // Save this secret code in database
 *        });
 *    });
 * 
 * Technique-2: Do everything in one go (easier way!)
 * - Just use hash() directly with password and number 10 (saltRounds = 10)
 * - The number 10 tells how strong to make the password, means how many
 *   rounds we should run the algorithm to add salt or random string to the
 *   password.
 * 
 *    bcrypt.hash(password, 10, function(err, hash) {
 *        // Save this secret code in database
 *    });
 * 
 * That's it! Your passwords are now safe and secure 😊
*/


const bcrypt = require('bcrypt');
const express = require('express');
const { UserModel, TodoModel } = require('./db');
const { auth, JWT_SECRET } = require('./auth');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aslampaasa420:Sy**********er@cluster0.goyedz2.mongodb.net/todosdb");
const app = express();
app.use(express.json());


/**
 * Non-Authenticated Routes:
 * 1. POST/signup
 * 2. POST/login
*/
app.post('/signup', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    /**
     * Step-1: Hashing the password:
    */
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    })
    res.send("You are logged in");
})

app.post('/signin', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    /**
     * Step-1: Check if user exists:
    */
    const user = await UserModel.findOne({
        email: email,
    })

    /**
     * Step-2: If user does not exist:
    */
    if (!user) {
        return res.status(403).json({
            message: "User does not exist in our db"
        })
    }

    /**
     * Step-3: If the user exists, then compare the password: 
     * - We compare the password with the hashed password in the database.
     * - If the password is correct, then the isPasswordCorrect will be true.
     * - If the password is incorrect, then the isPasswordCorrect will be false.
    */
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);

    /**
     * Step-4: If the password is correct, then generate a token:
    */  
    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString() // _id is the unique id of the user in DB
        }, JWT_SECRET);
        
        res.send({
            token: token,
            message: "You are logged in"
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})


/**
 * Authenticated Routes:
 * 1. POST/todo: Create a todo
 * 2. GET/todos: Get todo by userId
*/

app.post('/todo', auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    
    await TodoModel.create({
        title,
        userId,
        done
    })

    res.json({
        message: "Todo created successfully"
    })
})  

app.get('/todos', auth, async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    });

    res.json({
        todos
    })
})  

app.listen(3000);