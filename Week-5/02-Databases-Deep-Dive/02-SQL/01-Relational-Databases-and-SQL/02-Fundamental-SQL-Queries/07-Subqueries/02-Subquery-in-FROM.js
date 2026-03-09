/**
 * Subquery in FROM:
 * > Use a subquery as a temporary table (derived table). 
 * > Query the results of another query.
 * 
 * > The subquery creates a temporary result set that we can query. 
 * > This finds USA users, then counts them.
 * 
 * > Hint: Use SELECT COUNT(*) FROM (SELECT * FROM users WHERE country = 'USA') AS usa_users
*/

/**
 * Q. Create a subquery that selects users from USA, then count how 
 *    many there are.
*/