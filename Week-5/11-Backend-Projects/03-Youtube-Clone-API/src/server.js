require("dotenv").config(); //Load env variables
const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.routes");
const channelRouter = require("./routes/channel.routes");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middlewares/error.middleware");
const videoRouter = require("./routes/video.routes");
const notificationRouter = require("./routes/notitication.routes");
const playlistRouter = require("./routes/playlist.routes");
const likesRouter = require("./routes/like.routes");
const commentRouter = require("./routes/comment.routes");
const subscriptionRouter = require("./routes/susbscription.routes");

//Express Init
const app = express();
//Connect DB
connectDB();
//Middlewares
//Parse JSON and cookies
app.use(cookieParser());
app.use(express.json()); //Pass incoming data
//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/likes", likesRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

//Error handler
app.use(notFound);
app.use(errorHandler);
//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on the port... ${PORT}`));
