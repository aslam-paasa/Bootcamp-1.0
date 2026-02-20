/**
 * UNION ALL:
 * > Combine results from multiple queries, keeping all duplicates. 
 * > Faster than UNION.
 * 
 * > UNION ALL combines results but keeps duplicates. 
 * > It's faster than UNION since it doesn't check for duplicates. 
 * > USA appears multiple times.
*/

/**
 * Q. Select all countries from users and all countries from suppliers. 
 *    Keep all rows including duplicates.
 * 
 * > Hint: Use SELECT column FROM table1 UNION ALL SELECT column FROM table2
*/