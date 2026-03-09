/**
 * Database Transactions:
 * > A database transaction is a sequence of one or more operations performed
 *   as a single logical unit of work. 
 * > These operations typically include reading, writing, updating, or 
 *   deleting data in the database. 
 * > A transaction ensures that all the operations within it are executed 
 *   successfully or none at all, thereby maintaining the integrity and 
 *   consistency of the data.
*/

/**
 * Key Characteristics of a Transaction:
 * a. It involves multiple steps or operations.
 * b. It must be treated as an indivisible unit of work.
 * c. It interacts with the database to perform read/write operations.
 * d. It can either succeed completely (commit) or fail entirely (rollback).
*/

/**
 * Problem Statement:
 * 
 * In real-world applications, databases often face challenges such as:
 * 1. Partial Updates:
 *    - If a system crash occurs during a transaction, some changes might be
 *      applied while others are not, leaving the database in an inconsistent
 *      state.
 *    - Example: In a banking system, if money is deducted from Account A 
 *      but not added to Account B due to a crash, the accounts will be out
 *      of sync.
 * 
 * 2. Concurrency Issues:
 *    - When multiple users or processes access and modify the same data
 *      simultaneously, conflicts may arise.
 *    - Example: Two users trying to book the last available seat on a flight
 *      could result in double bookings if transactions are not isolated.
 * 
 * 3. Data Loss:
 *    - After a system failure, committed changes might vanish, leading to
 *      data loss and unreliability.
 *    - Example: After confirming an order in an e-commerce system, if the 
 *      system crashes before saving the order details, the customer's order
 *      will be lost.
*/


/**
 * ACID Properties:
 * 
 * 1. Atomicity:
 * 2. Consistency
 * 3. Isolation
 * 4. Durability
*/