/**
 * Understanding INTEGER Types:
 * > Integers store whole numbers.
 * > Our database uses INTEGER for age, quantities, and IDs.
 * > INTEGER/INT stores:
 *   - whole numbers (-2147483648 to 2147483647). 
 *   - SERIAL is auto-incrementing integer. 
 * > Good for IDs, counts, ages.
*/

/**
 * Q. Select name and age from users where age is an integer greater 
 *    than 30. Then try to insert a decimal age to see type constraints.
*/