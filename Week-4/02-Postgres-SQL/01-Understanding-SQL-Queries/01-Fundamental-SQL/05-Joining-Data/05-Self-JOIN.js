/**
 * Self JOIN:
 * > Join a table with itself. 
 * > Useful for hierarchical data like employee-manager relationships.
 * 
 * > Self JOIN uses aliases to treat one table as two. 
 * > employees.manager_id references employees.id for the manager.
 * 
 * > Hint: Use FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id
*/

/**
 * Q. Join employees with themselves to show each employee and their 
 *    manager name. Select employee name and manager name.
*/