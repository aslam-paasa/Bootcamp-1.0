/**
 * IN Operator:
 * > Match against multiple values efficiently. 
 * > Cleaner than multiple OR conditions.
 * 
 * > IN is shorthand for multiple OR conditions. 
 * > Much cleaner than writing country = 'USA' OR country = 'Canada' OR country = 'UK'.
 * > Hint: Use WHERE column_name IN (value1, value2, value3)
*/

/**
 * Q. Select name and country from users where country is in 
 *    ('USA', 'Canada', 'UK').
*/