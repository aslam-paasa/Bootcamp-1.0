/**
 * ORDER BY Multiple Columns:
 * > Sort by multiple columns to create a hierarchical order. 
 * > First by one column, then by another for ties.
 * 
 * > Multiple column sorting applies the second sort within groups of 
 *   the first. 
 * > Users from the same country will be ordered by age.
 * > Use ORDER BY column1 ASC, column2 ASC
*/

/**
 * Q. Select name, country, and age from users. 
 *    Sort first by country (A-Z), then by age (youngest first) within 
 *    each country.
*/