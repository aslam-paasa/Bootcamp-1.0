/**
 * We have covered  "fetch":
 * => Fetch basically represents how can you send HTTP requests from real websites.
 * => Until now we are using POSTMAN to hit the browser, but how can we hit it from
 *    the browser like CHAT GPT when we click on a browser.
 * 
 * Authentication:
 * => We want to understand authentication because until now we have built very kiddy
 *    project, anybody can hit our end point to we have to fix that.
 * 
 * Database:
 * => We will understand MongoDB
 * => High Level differences between SQL/NoSQL/Graph Databases.
*/

/**
 * Authentication: [Important]
 * => If we go to facebook.com we don't always give your username & password.
 * => We give username & password once, it gets stores somewhere and in every
 *    subsequent request it is automatically send. And that is the right way to
 *    do authentication.
 * 
 * => As you can tell by now, anyone can send requests to your backend.
 *    They can just go to postman and send a request.
 * 
 * Q. How do you ensure that this user has access to a certain resources?
 * => Dumb way - Ask user to send username & password in all requests as headers.
 *  
 * => Slightly better way -
 *    1. Give the user back a token on signup/signin
 *    2. Ask the user to send back the token in all future requests
 *    3. When the user logs out, ask the user to forget the token (or revoke it from the backend).
 * 
 * => The first time we are in browser, we put in an email & password in input
 *    boxes then we click on a button that send the request to the backend with
 *    our email and password. The backend pick "app.get()", a callback gets called
 * => Here they check :
 *    (a) Whether the user is valid or not?
 *    (b) Once validated, it returns us back a "token". We store it somewhere
 *        (usually we store it in browser => localStorage). Now every request
 *        that we are sending "app.get(/profile"), we send this "token" along.
 *        Server doesn't check our username & password anymore, it just checks
 *        a token.
 *    
 * => If we copy the token from other's browser (Network => Headers => Authorization => Copy)
 *    And if we paste in my postman and click on send then CHAT GPT will think
 *    that Harkirt is sending request but actually we are. So, the right way
 *    to do authentication any website, every request that going out, once we
 *    signed in, it is sending either "authorization" header which means a header
 *    that has title authorization.
*/