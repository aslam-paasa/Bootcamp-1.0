/**
 * Reverse Transaction History:
 * Tumhaare paas ek transcation history hai jisme users ke
 * transcations ki list hoti hai. Ab user ko recent transcations
 * pehle dekhni hai. Isliye tumhein is list ko reverse order mai
 * sort karna ha, taaki sbse recent transaction sbse pehle aaye.
*/

const transactionHistory = [
    { id: 1, amount: 50, description: "Groceries" },
    { id: 2, amount: 200, description: "Electronics" },
    { id: 3, amount: 30, description: "Books" },
    { id: 4, amount: 100, description: "Clothing" }
];

/**
 * Reverse the transaction history to show most recent first
 */
transactionHistory.reverse();

console.log("Reversed Transaction History:", transactionHistory);
