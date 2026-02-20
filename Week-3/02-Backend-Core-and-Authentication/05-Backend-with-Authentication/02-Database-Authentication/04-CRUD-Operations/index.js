/**
 * Put everything inside HTTP Server and expose it to the world:
*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/usersnewdb");


/**
 * Creating View (Blueprint of our database)
*/
const Schema = mongoose.Schema({
    name: String, 
    email: String, 
    password: String
})

/**
 * Creating Model:
*/
const User = mongoose.model('Users', Schema);

/**
 * Our Database is created. Now we can put it inside the POST request:
 * => We will post the username and password from the end user
 * => But before that we have to check, does someone with this username
 *    already exist.
*/

app.use(express.json());

app.post('/signup', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    /**
     * Check if user already exists or not
     * And if not exist then run our logic
    */
    const existingUser = await User.findOne({ email: username });
    /**
     * CRUD => Create, Read, Update, Delete
     *      => We have only created till now
    */
    if (existingUser) {
        return res.status(400).send("Username already exists");
    } else {
        const user = new User({
            name: 'Mohammad Aslam',
            email: 'mohammad@example.com',
            password: '123456'
        });

        user.save();
        res.json({ "msg": "User created successfully" });
    }
})

app.listen(3000);

/**
 * When we go to facebook.com, it ask me:
 * (a) firstName
 * (b) lastName
 * (c) password
 *  And after that once we click on signup, these 3 things go to facebook
 *  server. It would put me in their database and return me back a response.
 *  If it is already exisiting then it won't let me resignup. And similar
 *  thing we have done in our code.
*/