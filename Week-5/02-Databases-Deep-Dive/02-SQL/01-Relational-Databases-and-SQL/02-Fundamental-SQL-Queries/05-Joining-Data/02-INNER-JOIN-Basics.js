/**
 * INNER JOIN Basics:
 * > Combine rows from two tables based on a related column. 
 * > Orders link to users through user_id.
 * 
 * > INNER JOIN returns only rows where there's a match in both tables. 
 * > orders.user_id links to users.id.
 * 
 * > Hint: SELECT columns 
 *         FROM table1 
 *         INNER JOIN table2 
 *           ON table1.column = table2.column
*/

/**
 * Q. Join orders with users. Select order id, user name, and order quantity.
*/

// SELECT
//   orders.id AS order_id,
//   users.name AS user_name,
//   orders.quantity
// FROM orders
// INNER JOIN users
//   ON orders.user_id = users.id;