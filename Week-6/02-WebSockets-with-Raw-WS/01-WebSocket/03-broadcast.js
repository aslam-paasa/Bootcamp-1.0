/**
 * Broadcast (one to many):
 * > Send a message to ALL connected users.
 *  
 *   +--------------------+
 * > | userId -> socketId |
 *   +--------------------+
 *            |
 *            v
 *       WebSocket Server
 *        /     |     \
 *       v      v      v
 *     user1  user2  user3
 * 
 * > client --> msg.type === 'broadcast'
 * 
 *   object
 *   {
 *      type: "broadcast",
 *      userId: "123",
 *      text: "Hello everyone"
 *   }
 *
 * > Server logic:
 *   Loop through all users in the Map and send message.
 *
 *   if (msg.type === "broadcast") {
 *       users.forEach((clientSocket) => {
 *           if (clientSocket.readyState === WebSocket.OPEN) {
 *               clientSocket.send(JSON.stringify({
 *                   type: "broadcast",
 *                   from: msg.userId,
 *                   text: msg.text
 *               }));
 *           }
 *       });
 *   }
 */

// Send message to all connected clients
function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}