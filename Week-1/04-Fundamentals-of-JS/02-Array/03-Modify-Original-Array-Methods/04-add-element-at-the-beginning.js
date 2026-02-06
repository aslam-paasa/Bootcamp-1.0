/**
 * Step 3: unshift() - Start mein element add karna
 * > unshift() array ke start mein elements add karta hai. 
 * > Return karta hai nayi length.
 * 
 * Syntax: array.unshift(element1, element2, ..., elementN)
*/


/**
 * Example 1: Basic Unshift Operation
*/

const queue = ["Customer2", "Customer3"];

console.log("Original queue:", queue);

/* Start mein naya customer add karo (priority) */
const newLength = queue.unshift("VIP Customer");
console.log("Updated queue:", queue);    // ["VIP Customer", "Customer2", "Customer3"]
console.log("Queue length:", newLength); // 3



/**
 * Example 2: Real World - Message Queue
*/

class MessageQueue {
    constructor() {
        this.messages = [];
    }
    
    /* Normal message - end mein add karo */
    addMessage(message) {
        this.messages.push(message);
        console.log(`📨 Queued: ${message}`);
    }
    
    /* Urgent message - start mein add karo */
    addUrgentMessage(message) {
        const newLength = this.messages.unshift(`🚨 URGENT: ${message}`);
        console.log(`🚨 Added urgent: ${message}`);
        console.log(`Total messages: ${newLength}`);
    }
    
    processNext() {
        if (this.messages.length === 0) {
            console.log("No messages to process");
            return null;
        }
        const message = this.messages.shift();
        console.log(`📤 Processing: ${message}`);
        return message;
    }
    
    showQueue() {
        console.log("📋 Message Queue:");
        this.messages.forEach((msg, index) => {
            console.log(`${index + 1}. ${msg}`);
        });
    }
}

/* Usage */
const msgQueue = new MessageQueue();
msgQueue.addMessage("Welcome message");
msgQueue.addMessage("Notification update");
msgQueue.addUrgentMessage("Server down!"); // Priority message
msgQueue.showQueue();
msgQueue.processNext(); // Urgent message process hoga pehle