/**
 * includes:
 * - It returns true if the array contains the element.
 * - If the element is not found, it returns false.
 * 
 * Real World Banking Example:
 * - Check if user has specific account type
 * - Verify if transaction type is allowed for user
 */

/**
 * Ex-1: Account Type Check
 */
const userAccounts = ["Savings", "Current", "Fixed Deposit", "Recurring Deposit"];
const requestedAccount = "Savings";

if (userAccounts.includes(requestedAccount)) {
    console.log(`User ke pass ${requestedAccount} account already hai!`);
} else {
    console.log(`User ${requestedAccount} account open kar sakta hai!`);
}


/**
 * Ex-2: Transaction Type Verification
 */
const allowedTransactions = ["NEFT", "RTGS", "IMPS", "UPI"];
const transactionType = "UPI";

if (allowedTransactions.includes(transactionType)) {
    console.log(`${transactionType} transaction allowed hai!`);
} else {
    console.log(`${transactionType} transaction allowed nahi hai!`);
}
