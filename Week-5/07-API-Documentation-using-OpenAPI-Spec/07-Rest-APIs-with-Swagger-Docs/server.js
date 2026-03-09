require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
//const config = require("config");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const swaggerUi = require('swagger-ui-express');
const swaggerAPIOptions = require("./swagger/swagger.options");
const fs = require("fs");

const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");
const dataRouter = require("./controllers/data.controller");

const app = express();
// Middlewares
// Session Configuration
app.use(session({
    secret: process.env.SERVER_SESSION,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions"
    })
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1", dataRouter);

// Swagger Documentation Using Postman .json file
const swaggerDocumentationContent = JSON.parse(fs.readFileSync("./uploads/openapi.json", "utf-8"));
//app.use('/api-docs-method-1', swaggerUi.serve, swaggerUi.setup(swaggerDocumentationContent));


// Method 2 [ Swagger Anotations to Swagger Documentation ]
app.use('/api-docs-method-2', swaggerUi.serve, swaggerUi.setup(swaggerAPIOptions));

// Welcome Route
app.get("/", (req, res) => {
    res.send("This is a welcome message");
})

// Connect to Database
mongoose.connect(process.env.MONGODB_URI)
.then( (result) => console.log(`Database connected`) )
.catch( (error) => console.log( `Failed to connect with database` ))

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
})