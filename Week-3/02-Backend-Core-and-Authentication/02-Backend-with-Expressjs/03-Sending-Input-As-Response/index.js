/**
 * Q. How can we sending inputs to backend?
 * => These are 3 ways using which we can send some more data to the backend:
 *     (a) Query params 
 *     (b) Headers
 *     (c) Body
 * 
 * 1. Query Parameter:
 *    a. What it is: Like giving specific instructions in the web address.
 *    b. Example: In 'www.example.com/search?topic=animals', the query
 *       parameter is 'topic' with the value 'animals'. 
 *    c. Use Case: Good for simple stuff you want everyone to see, like
 *       search terms in a URL.
 * 
 * 2. Body:
 *    a. What it is: Imagine it as the hidden part of the request, carrying
 *       more detailed information. 
 *    b. Example: When you fill out a form on a website, the details you
 *       enter (name, email) go in the body of the request.
 *    c. Use Case: Great for sending lots of information, especially when
 *       you're submitting something like a form. 
 * 
 * 3. Headers:
 *    a. What it is: Extra information attached to the request, kind of
 *       details about a letter.
 *    b. Example: Headers could include things like your identity or the
 *       type of data you're sending.
 *    c. Use Case: Perfect for passing along special information that
 *       doesn't fit neatly in the URL or body, like who you are or how
 *       to handle the data.
 * 
 * Bottom Line:
 * 1. Query Parameters: Simple instructions visible in the web address.
 * 2. Body: Hidden part of the request for more detailed info, great for
 *    forms.
 * 3. Headers: Extra details about the request, useful for special
 *    information.
*/