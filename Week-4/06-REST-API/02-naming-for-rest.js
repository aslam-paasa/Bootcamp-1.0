/**
 * Naming for REST:
 * 1. Nouns:
 * => Use descriptive nouns for endpoints that represent resources.
 * => Correct: /orders Incorrect: /order-management
 * => Correct: /employees Incorrect: /employee-list
 * => Correct: /departments Incorrect: /dept
 * 
 * 2. Plurals:
 * => Use plural forms for resource names to maintain consistency.
 * => This leads to /products instead of /product and /customers instead of /customer.
 * => Correct: /tasks Incorrect: /task
 * => Correct: /comments Incorrect: /comment-section
 * => Correct: /articles Incorrect: /article-list
 * 
 * 3. Predictable:
 * => Make your API endpoints easy to predict and follow logical patterns.
 * => This helps users anticipate and remember the structure,
 *    (a) like /products/:id for a specific product.
 *    (b) /users/:id/orders - Retrieves orders for a specific user. user-orders/:id
 *    (c) Correct: /users/:id/orders/:orderId/items
 *    (d) Incorrect: /user/:id/order/:orderId/item
 * => /products/:id/reviews - Retrieves reviews for a specific product.
 * 
 * 4. Consistent:
 * => Maintain consistency in endpoint structure and naming conventions throughout your API.
 * => Use the same format and style for similar resources,
 *    e.g., e.g., /invoices/:id and /invoices/:id/items
 * 
 * 5. Understandable:
 * => Prioritize clarity over brevity.
 * => Use clear and readable names such as /card-number instead of abbreviations like /pan-no.
 *    (a) Avoid technical jargons
 *    (b) Correct: /customer-details Incorrect: /cust-info
 *    (c) Correct: /product-reviews Incorrect: /prod-comms
 * 
 * 6. Hirearchical:
 * => /customers then individual product related stuff should be done.
 *    (a) /customers/:id
 *    (b) Correct: /customers/:id/addresses
 *    (c) Incorrect: /customers-addresses/:customerId
 *    (d) /customers/:id/addresses/:addressId
 * 
 * 📌 Rule: Think of someone else using your API. And this is not just for web services.
 * 
 **/ 