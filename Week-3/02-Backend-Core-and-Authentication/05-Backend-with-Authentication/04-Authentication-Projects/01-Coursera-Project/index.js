require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')
const { adminRouter } = require('./routes/admin')
const app = express();

app.use(express.json());

const PORT = process.env.PORT;

/**
 * Routing:
 * - All the endpoints routes that starts with:
 *   a. "/user" are handled by userRouter
 *      "/user" + "signup"
 *      "/user" + "signin"
 *      "/user" + "purchases"
 *   b. "/course" are handled by courseRouter
 *      "/course" + "purchase"
 *      "/course" + "preview"
*/
app.use('/user', userRouter);
app.use('/admin', adminRouter)
app.use('/course', courseRouter);


/**
 * Connect Server and DB:
 * - Only start if database is up
*/
async function connectServerAndDB() {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

connectServerAndDB();