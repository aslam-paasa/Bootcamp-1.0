/**
 * Multicast (one to group):
 * > Send a message to MULTIPLE specific users.
 *  
 *   +--------------------+          +-------------------+
 * > | userId -> socketId |--------->| users.get(userId) |
 *   +--------------------+          +-------------------+
 *            |
 *            |
 *   +--------------------+
 *   | userId -> socketId |
 *   +--------------------+
 *
 * > client --> msg.type === 'multicast'
 *
 *   object
 *   {
 *      type: "multicast",
 *      userId: "123",
 *      text: "Hello group",
 *      to: ["234", "456", "789"]
 *   }
 *
 * > Server logic:
 *   Loop through the "to" array and send message only to those users.
 *
 *   if (msg.type === "multicast") {
 *       msg.to.forEach((userId) => {
 *           const targetClient = users.get(userId);
 *
 *           if (targetClient?.readyState === WebSocket.OPEN) {
 *               targetClient.send(JSON.stringify({
 *                   type: "multicast",
 *                   from: msg.userId,
 *                   text: msg.text
 *               }));
 *           }
 *       });
 *   }
 */