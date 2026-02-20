/**
 * Subscription Alert System:
 * You are working on a subscription-based streaming service like Netflix.
 * Each user has a list of active subscription, and every subscription has:
 * a. planName (like "Premium", "Basic", "Sports")
 * b. expiryDate (ISO string format)
 * 
 * Find: Kya kisi user ki koi subscription next 3 days k andr expire
 *       hone wali hai? 
*/


const users = [
    {
        name: "Aman",
        subscriptions: [
            { planName: "Premium", expiryDate: "2025-05-15T00:00:00Z" },
            { planName: "Sports", expiryDate: "2025-06-01T00:00:00Z" }
        ]
    },
    {
        name: "Neha",
        subscriptions: [
            { planName: "Basic", expiryDate: "2025-05-12T00:00:00Z" }
        ]
    },
    {
        name: "Tina",
        subscriptions: [
            { planName: "Kids", expiryDate: "2025-06-15T00:00:00Z" }
        ]
    }
];


/**
 * Goal:
 * - "Kya kisi user ki koi subscription next 3 days k andr expire
 *   hone wali hai?"
*/


function hasExpiringSubscriptions(users) {
    const now = new Date();
    const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

    return users.some(user => {
        return user.subscriptions.some(sub => {
            const expiry = new Date(sub.expiryDate);
            return expiry - now <= THREE_DAYS_MS && expiry - now >= 0;
        });
    });
}

const result = hasExpiringSubscriptions(users);
console.log("Kya koi subscription expire hone wali hai in next 3 days?", result); // true

