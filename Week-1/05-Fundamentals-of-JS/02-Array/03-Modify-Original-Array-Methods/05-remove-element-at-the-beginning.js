/**
 * Step 4: shift() - First element remove karna
 * > shift() array ke first element ko remove karta hai aur use return karta
 *   hai.
 * 
 * Syntax: const removedElement = array.shift()
*/


/**
 * Example 1: Basic Shift Operation
*/

const students = ["Rahul", "Priya", "Amit", "Neha"];

console.log("Original students line:", students);

/* First student remove karo (jo sabse pehle aaya tha) */
const firstStudent = students.shift();
console.log("First student:", firstStudent);  // "Rahul"
console.log("Remaining students:", students); // ["Priya", "Amit", "Neha"]



/**
 * Example 2: Real World - Ticket Booking System
*/

class TicketQueue {
    constructor() {
        this.queue = [];
    }
    
    bookTicket(name) {
        this.queue.push(name);
        console.log(`🎫 ${name} ne ticket book kiya. Position: ${this.queue.length}`);
    }
    
    serveNext() {
        if (this.queue.length === 0) {
            console.log("❌ Koi customer nahi hai!");
            return null;
        }
        
        const servedCustomer = this.queue.shift();
        console.log(`✅ ${servedCustomer} ko ticket mil gaya!`);
        
        /* Baaki customers ki position update karo */
        this.queue.forEach((customer, index) => {
            console.log(`   ${customer} ab position ${index + 1} par hai`);
        });
        
        return servedCustomer;
    }
    
    showQueue() {
        console.log("👥 Current Queue:");
        this.queue.forEach((customer, index) => {
            console.log(`${index + 1}. ${customer}`);
        });
    }
}

/* Usage */
const ticketCounter = new TicketQueue();
ticketCounter.bookTicket("Rahul");
ticketCounter.bookTicket("Priya");
ticketCounter.bookTicket("Amit");

ticketCounter.serveNext(); // Rahul ko ticket milega
ticketCounter.serveNext(); // Priya ko ticket milega
