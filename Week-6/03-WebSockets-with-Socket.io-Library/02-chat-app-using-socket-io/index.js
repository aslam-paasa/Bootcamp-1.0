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

    // Broadcast message to all connected clients including the sender
    // socket.on('message', (data) => {
    //     io.emit('new-message', data);
    // });

    // Broadcast message to all connected clients except the sender
    socket.on('message', (data) => {
        socket.broadcast.emit('new-message', data);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});