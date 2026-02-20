/**
 * Why input validation is important:
 * - The user can send any data in the request body(backend), we are not 
 *   validating it before saving it in the database.
 * - They can send malicious scripts to harm the database or the server. 
 * - Example:
 *   - They can send a malicious script to the server.
 *   - They can send a large number of requests to the server to crash it.
 *   - They can send a large number of requests to the database to crash it.
 *   - They can send a large number of requests to the file system to crash it.
 *   - They can send a large number of requests to the network to crash it.
 * 
 * Solution:
 * - We will use Zod to validate the data before saving it in the database.
 * - We will define the schema for the data and then validate the data before
 *   saving it in the database. 
 * - In TypeScript, Zod is a library used for schema validation and parsing.
 * - It's designed to help developers define, validate, and manage data
 *   structures in a type-safe manner.
 * - Docs : https://zod.dev/
 * - Install: npm install zod
*/

const bcrypt = require('bcrypt');
const express = require('express');
const { UserModel, TodoModel } = require('./db');
const { auth, JWT_SECRET } = require('./auth');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { z } = require('zod');

mongoose.connect("mongodb+srv://aslampaasa420:Sy**********er@cluster0.goyedz2.mongodb.net/todosdb");
const app = express();
app.use(express.json());


/**
 * Non-Authenticated Routes:
 * 1. POST/signup
 * 2. POST/login
*/
app.post('/signup', async function (req, res) {

    /**
     * Better way to validate the user input using Zod Library:
     * a. email : String, @, 5
     * b. password : String, 10 chars, 1 spl, 1 uppercase, 1 lowercase
     * c. name : String
    */

    /** 
     * Step-1: Defining the Schema
     * req.body 
     * {
     *  email: string,
     *  name: string,
     *  password: string
     * }
    */
   
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(10).max(30)
    });

    /**
     * Step-2: Parsing the user data by calling the safeParse fn
     * - The safeParse method returns two things:
     *   a. success
     *   b. data
     * - success means that the data is valid, and data contains the valid data.
     * - If the data is invalid, the success will be false, and data will 
     *   contain the error. 
    */
   const parsedDataWithSuccess = requiredBody.safeParse(req.body);
   
   if(!parsedDataWithSuccess.success) {
      res.json({
        message: "Incorrect format",
        error: parsedDataWithSuccess.error
      })
   }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    /**
     * Ugly way to validate the email & password:
     * a. Email:
     * if(typeof email !== 'string' || !email.includes('@') || email.length < 5) {
     *     return res.status(400).json({
     *         message: "Invalid email"
     *     });
     * }

     * b. Password:
     * if(typeof password !== 'string' || password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
     *     return res.status(400).json({
     *         message: "Invalid password"
     *     });
     * }
    */ 
    
    try {
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
        res.status(411).json({
            message: "Email already exists"
        });
    }
})

app.post('/signin', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await UserModel.findOne({
            email: email,
        })

        if (!user) {
            return res.status(403).json({
                message: "User does not exist in our db"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);

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