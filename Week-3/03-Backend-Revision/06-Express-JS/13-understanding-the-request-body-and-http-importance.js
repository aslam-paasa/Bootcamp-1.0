/**
 * Understanding the request body and HTTP importance:
 * => Now, let's break down what happened in the previous exercise, 
 *    focusing on the request body and the importance of using HTTPS.
 * 
 * Understanding:
 * 1. Request Body:
 * => In a POST request, data is sent in the request body. The server
 *    decodes this data and processes it based on the route.
 * 
 * 2. Security Concerns:
 * => Sending data via the request body isn't inherently secure, especially
 *    when dealing with sensitive information.
 * => HTTPS(SSL/TLS) encryption is essential to secure data during 
 *    transmission.
 * */ 