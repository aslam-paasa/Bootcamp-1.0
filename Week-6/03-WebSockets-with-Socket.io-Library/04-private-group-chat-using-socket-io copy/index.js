import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html"); // send frontend
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle private message
    socket.on("private-message", ({ recipientId, message }) => {
        io.to(recipientId).emit("private-message", { senderId: socket.id, message });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
