/**
 * EXISTS Operator:
 * > Check if a subquery returns any rows. 
 * > Find users who have placed at least one order.
 * 
 * > EXISTS returns true if the subquery finds any matching rows. 
 * > This identifies customers who have purchased something.
*/

/**
 * Q. Select name and email of users who exist in the orders table 
 *    (have made orders).
 * 
 * > Hint: Use WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id)
*/