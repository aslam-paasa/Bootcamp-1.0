/**
 * Q. URL Params kya hai?
 *  - URL params ka use hum tab karte hain jab kisi specific resource 
 *    (jaise user, product) ko uniquely identify karna ho. Yeh data URL
 *    path mein directly diya jata hai aur mostly GET requests mein use
 *    hota hai.
 * 
 * URL Params ka Use Kab Karna Chahiye?
 * 1. Identify Specific Resource:
 *    - Jab kisi ek specific resource ka data fetch karna ho, jise 
 *      unique ID se identify kiya ja sake.
 *    - Example: /users/123 - yeh particular user "123" ka data laayega.
 * 
 * 2. Non-sensitive Data:
 *    - Agar data sensitive nahi hai (like user token ya password nahi 
 *      hai).
 * 
 * 3. Bookmark & Share URL:
 *    - Agar aap chahte hain ki yeh URL bookmark/shareable ho jise user 
 *      same page ya data par waapas aa sake.
 * 
 * 4. Read-Only Requests:
 *    - Mostly GET requests mein use hota hai jahan data sirf retrieve 
 *      kiya jata hai.
 * 
 * Kab Use Nahi Karna Chahiye?
 * 1. Sensitive Data:
 *    - Jab data sensitive ho, like passwords, tokens, etc. URL params
 *      mein data exposed hota hai aur network ke har point par visible
 *      rehta hai.
 * 2. Large Data:
 *    - Agar aapko kaafi large ya complex data bhejna hai toh URL params
 *      ki length limit hoti hai, isliye ye suitable nahi hai.
 * 3. POST/PUT Requests:
 *    - Agar request mein data ko update ya change karna hai toh ye URL 
 *      params ke through nahi bhejna chahiye. Yeh insecure ho sakta hai
 *      aur best practice nahi hai.
 * 
 * Disadvantages:
 * a. Security Risk:
 *    - Kyunki URL har network layer pe visible hai, sensitive data ke 
 *      liye yeh unsafe hai.
 * b. Limited Length:
 *    - URL ki ek length limit hoti hai, toh zyada data send karna 
 *      problematic ho sakta hai.
*/ 


const express = require('express');
const app = express();

/**
 * 1. GET request with URL Params (Good for non-sensitive, specific 
 *    resource identification)
*/
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // id retrieve karte hain URL se => /users/123
  res.send(`User ID: ${userId}`);
});


/**
 * 2. GET request with sensitive data (Avoid sending passwords, tokens 
 *    in URL Params)
 *  - Soln: Instead, token should be sent in headers or request body 
 *    for security.
*/
app.get('/users/:id/:token', (req, res) => {
  // Avoid this: URL Param se sensitive data bhejna
  const userId = req.params.id;
  const token = req.params.token;
  res.send(`User ID: ${userId} | Token: ${token}`);
});


/**
 * 3. POST request - avoid using URL params for data that modifies 
 *    resources.
 *  - Soln: Better to use req.body instead of URL param for update requests
*/
app.post('/update-user/:id', (req, res) => {
  res.send("User updated!");
});