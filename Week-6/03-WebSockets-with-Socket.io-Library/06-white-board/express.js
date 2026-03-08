const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("size", (size) => {
    socket.broadcast.emit("onsize", size);
  });
  socket.on("color", (color) => {
    socket.broadcast.emit("oncolor", color);
  });

  socket.on("toolchange", (tool) => {
    socket.broadcast.emit("ontoolchange", tool);
  });
  socket.on("hamburger", () => {
    socket.broadcast.emit("onhamburger");
  });
  socket.on("mousedown", (point) => {
    socket.broadcast.emit("onmousedown", point);
  });
  socket.on("mousemove", (point) => {
    socket.broadcast.emit("onmousemove", point);
  });
  socket.on("undo", () => {
    socket.broadcast.emit("onundo");
  });
  socket.on("redo", () => {
    socket.broadcast.emit("onredo");
  });
});


const port = process.env.PORT || 3000;
server.listen(port, (req, res) => {
  console.log("Server has started at port 3000");
});
