/**
 * Subscriber – Listen to a Channel
 * > Subscriber future messages hi sunta hai
 */

const subscriber = new Redis()

subscriber.subscribe("notifications")

subscriber.on("message", (channel, message) => {
  console.log(`Received message from ${channel}:`, message)
})
