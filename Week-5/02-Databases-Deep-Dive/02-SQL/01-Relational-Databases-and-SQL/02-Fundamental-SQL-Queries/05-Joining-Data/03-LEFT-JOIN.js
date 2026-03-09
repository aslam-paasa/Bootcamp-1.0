/**
 * LEFT JOIN:
 * > Get all rows from the left table, plus matching rows from right 
 *   table. 
 * > Shows products even without reviews.
 * 
 * > LEFT JOIN keeps all products (left table), showing NULL for rating
 *   when there's no review. 
 * > Only 12 of 20 products have reviews.
 * 
 * > Hint: Use FROM products LEFT JOIN reviews ON products.id = reviews.product_id
*/

/**
 * Q. Left join products with reviews. 
 *    Select product name and review rating. 
 *    Include products with no reviews.
*/