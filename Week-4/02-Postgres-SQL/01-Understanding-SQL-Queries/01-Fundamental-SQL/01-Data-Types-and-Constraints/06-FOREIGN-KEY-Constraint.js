/**
 * Understanding FOREIGN KEY Constraint:
 * > FOREIGN KEY creates relationships between tables. 
 * > Ensures referential integrity - can't reference non-existent IDs.
 * 
 * > FOREIGN KEY links tables. 
 * > orders.user_id references users.id. 
 * > Can't insert order with user_id=999 if that user doesn't exist. 
 * > Maintains data integrity!
*/

/**
 * Q. Select order id, user_id, and user name. 
 *    orders.user_id is a FOREIGN KEY referencing users.id.
*/