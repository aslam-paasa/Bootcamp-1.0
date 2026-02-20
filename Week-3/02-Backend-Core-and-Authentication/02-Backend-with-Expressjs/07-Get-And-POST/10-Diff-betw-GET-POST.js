/**
 * Difference between GET and POST:
 * GET and POST are two HTTP methods used to request and send data
 * between clients and servers. They differ in their purpose, the way
 * data is sent, and their impact on the server and the browser's
 * history.
 * */ 

/**
 * GET:
 * 1. Purpose:
 *    a. GET is used to request data from a specified resource.
 *    b. It is designed to retrieve information and should have no other
 *       effect.
 * 
 * 2. Data Submission:
 *    a. Data is appended to the URL as query parameters.
 *    b. Limited amount of data can be sent because data is included in
 *       the URL, and URLs have a maximum length.
 * 
 * 3. Visibility:
 *    a. Parameters are visible in the URL, which can impact security
 *       when dealing with sensitive information.
 * 
 * 4. Caching:
 *    a. Requests can be caches by the browser, and URLs can be bookmarked.
 *    b. It is idempotent, meaning multiple identical requests will have
 *       the same effect as a single request.
 * 
 * 5. Examples:
 *    a. Reading a blog post, searching on Google, fetching data from 
 *       an API.
*/

/**
 * POST:
 * 1. Purpose:
 *    a. POST is used to submit data to be processed to a specified 
 *       resource.
 *    b. It can be used to create or update a resource on the server.
 * 
 * 2. Data Submission:
 *    a. Data is sent in the body request body, not in the URL.
 *    b. Can send a large amount of data compared to GET.
 * 
 * 3. Visibility:
 *    a. Parameters are not visible in the URL, enhancing security.
 * 
 * 4. Caching:
 *    a. Requests are not caches by the browser, and URLs cannot be 
 *       bookmarked.
 *    b. It is not idempotent, multiple identical requests may have 
 *       different effects.
 * 
 * 5. Examples:
 *    a. Submitting a form, uploading a file, making a payment.
*/


/**
 * Q. When to use each?
 * 1. GET: Use when you want to retrieve data from the server, and the
 *    request has no side effects. It's suitable for safe and idempotent
 *    operations.
 * 2. POST: Use when you want to submit data to the server, especially
 *    when the operations has side effects(e.g., creating a new resource
 *    on the server). It's suitable for non-idempotent operations.
 * 
 * In Summary, the choice between GET and POST depends on the purpose
 * of the request and the type of operation you are performing.
*/