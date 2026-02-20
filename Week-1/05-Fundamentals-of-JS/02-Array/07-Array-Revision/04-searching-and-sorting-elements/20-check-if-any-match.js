/**
 * E-Commerce Fraud Detection System:
 * You are working on an e-commerce dashboard where admin wants to
 * check if any customer is possibly doing fraudulent activities.
 * 
 * Fraud Conditions:
 * 1. They placed more than 3 orders in the last 24 hours, AND
 * 2. The total amount of those orders is more than ₹50,000.
 * 
 * Your have a list of users with their order histories.
 * 
 * Task:
 * Implement a function hasFraudulentUser(users) that takes an array of user objects
 * and returns true if any user is found to be potentially fraudulent.
*/

const users = [
    {
        name: "Ali",
        orders: [
            { id: 1, amount: 10000, date: "2025-05-11T09:30:00Z" },
            { id: 2, amount: 20000, date: "2025-05-11T10:00:00Z" },
            { id: 3, amount: 18000, date: "2025-05-11T11:30:00Z" },
            { id: 4, amount: 9000, date: "2025-05-11T13:00:00Z" }
        ]
    },
    {
        name: "Neha",
        orders: [
            { id: 5, amount: 3000, date: "2025-05-10T10:00:00Z" }
        ]
    },
    {
        name: "Tina",
        orders: [
            { id: 6, amount: 20000, date: "2025-05-11T07:00:00Z" },
            { id: 7, amount: 25000, date: "2025-05-11T08:00:00Z" },
            { id: 8, amount: 10000, date: "2025-05-11T09:00:00Z" },
            { id: 9, amount: 6000, date: "2025-05-11T10:00:00Z" }
        ]
    }
];



/**
 * Goal:
 * Use .some() to check:
 * - "Kya koi aisa hai jisne last 24 hours me 3 se jyda orders place
 *   kiye ho + 50,000+ ka total amount ho?"
*/

function hasFraudulentUser(users) {
    const now = new Date();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  
    return users.some(user => {
      /**
       * Filter only those orders in last 24 hours
       */
      const recentOrders = user.orders.filter(order => {
        const orderDate = new Date(order.date);
        return now - orderDate <= ONE_DAY_MS;
      });
  
      const totalAmount = recentOrders.reduce((sum, order) => sum + order.amount, 0);
  
      /**
       * Fraud condition: more than 3 orders && ₹50,000+ value
       */
      return recentOrders.length > 3 && totalAmount > 50000;
    });
  }
  
  const result = hasFraudulentUser(users);
  console.log("Kya koi fraud user hai?", result); // true
  