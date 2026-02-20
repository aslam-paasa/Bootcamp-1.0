/**
 * Error Handling:
 * Right now, the server crashes if you sign up using duplicate email.
 * We want to handle this error gracefully.
 * 
 * Approach-1: Try-Catch Block:
 * - In JavaScript, a try-catch block is used for handling exceptions and
 *   errors that occur during the execution of code. 
 * - It allows you to write code that can manage errors gracefully rather
 *   than crashing the application or causing unexpected behavior.
 * 
 *   try {
 *       1. Attempt to execute this code
 *          let result = riskyFunction(); // This might throw an error
 *          console.log('Result:', result);
 *   } catch (error) {
 *       2. Handle the error if one is thrown
 *          console.log('An error occurred: ', error.message);
 *   } finally {
 *       3. This block will always execute
 *          console.log('Cleanup code or final steps.');
 *   }
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

    try {
        /**
         * Step-1: Hashing the password:
        */
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });

        res.json({
            message: "User created successfully"
        });
    } catch(e) {
        // MongoDB will throw error if email already exists (due to unique index)
        res.status(411).json({
            message: "Email already exists"
        });
    }
})

app.post('/signin', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
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
            
            res.json({
                token: token,
                message: "You are logged in"
            });
        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }
    } catch(e) {
        res.status(500).json({
            message: "Internal server error"
        });
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