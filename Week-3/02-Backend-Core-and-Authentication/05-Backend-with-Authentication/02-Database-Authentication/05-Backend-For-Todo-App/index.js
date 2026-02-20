/**
 * Create the skeleton of the 4 routes:
 * 1. POST/signup 
 * 2. POST/login 
 * 3. POST/todo(authenticated)
 * 4. GET/todos(authenticated)
*/


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

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })
    res.send("You are logged in");
})

app.post('/signin', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    if (user) {
        token = jwt.sign({
            id: user._id // _id is the unique id of the user in DB
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
