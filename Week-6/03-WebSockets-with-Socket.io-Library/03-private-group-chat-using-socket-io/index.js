import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {

    // Creating room for private group chat
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
    });

    // Broadcast message to all connected clients in the room except the sender
    socket.on('message', ({message, roomId}) => {
        socket.to(roomId).emit('new-message', {message, roomId}); 
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});