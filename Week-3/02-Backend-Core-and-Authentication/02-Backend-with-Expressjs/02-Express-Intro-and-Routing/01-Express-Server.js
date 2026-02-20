/** 
 * Node.js | HTTP :
 * - We will understand the NodeJS runtime :
 *  (1) How is Node.js different from JavaScript?
 *  (2) Why were they introduced?
 *  (3) How were they introduced?
 *  (4) What is Bun?
 *  (5) How is it different?
 *  (6) HTTP
*/

/**
 * Today's Session : 
 * We will understand : 
 * 1. Node.js and its runtime
 * 2. Backend Communication Protocols :
 *    a. What are HTTP Servers?
 *    b. Why we need them?
 *    c. What specifically these 3 things :
 *       i. Client Server Model
 *       ii. HTTP Servers
 *       iii. Express (Basics)
*/


/**
 * Node.js and its runtime :
*/

/**
 * Q. What is ECMAScript?
 * - ECMAScript is a scripting language specification on which JavaScript is based.
 *   "Ecma International" is in charge of standardizing ECMAScript.
 * - It serve as a guideline or the 'rules' for scripting language design.
 * - So it is a documentation website which tells this is how JavaScript should
 *   look like. Means whoever wants to write a JS Compiler/Engine should make sure 
 *   they support all of these things.
*/

/**
 * Q. What is JavaScript?
 * - JavaScript is a scripting language which is created following the ECMAScript 
 *   rules/guidelines.
 * - For example, ECMAScript defined the rules of : date, var, const, let, function etc.
 * - But there are certain things which are very common use case in browser and the
 *   browser introduced certain features on top of the ECMAScript (beyond ECMAScript)
 *   like the DOM Manipulation (setTimeout in DOM, fs,readFile in NodeJSetc). 
*/

/**
 * Q. What is JavaScript Engine?
 * - A JavaScript engine is a program that converts JavaScript code that 
 *   developers write into machine code that allows a computer to perform specific 
 *   tasks.
 *   a. A JavaScript engine is a program that executes JavaScript code.
 *   b. In 2008, Google created its own JavaScript engine called V8.
 *   c. V8 is written in C++ and can be used independently or can be embedded 
 *      into other C++ programs.
 *
 * - JavaScript Engines are typically developed by web browser vendors :
 *   1.V8 - Open-source JavaScript Engine developed by Google for Chrome.
 *   2.SpiderMonkey - The JavaScript Engine powering Mozilla Firefox.
 *   3.JavaScriptCore - Open-source JavaScript Engine Developed by Apple for Safari.
 *   4.Chakra - A JavaScript Engine for the original Microsoft Edge
 *
 * - JavaScript runtime is an environment which provides all the nesessary components
 *   in order to use and run a JavaScript Program.
 * - Every browser has a JavaScript Engine.
 * - JavaScript Engine is one compnent in JavaScript Runtime.
*/

/**
 * Q. What else does JavaScript Runtime consist of?
 * - Example Chrome Browser JavaScript Runtime
 * - The JavaScript Code we write is executed in Chrome's JavaScript 
 * - Runtime that consists of the following components.
 *    a. V8 JavaScript Engine
 *       - Memory (Heap)
 *       - Call Stack
 *    b. Web/ Browser API's
 *       - DOM
 *       - Timers (SetTimeout, SetInterval, Promises)
 *       - Browser Storage
 *    c. Queue - Asynchronous tasks wait before they are executed.
 *       - Microtask Queue
 *       - Callback / Task Queue 
 *    d. Event Loop
 *       - Ensure Async Tasks are executed in the Right Order.
*/

/**
 * Q. What is Node.js?
 * - Some smart people took out the V8 engine, added some backend things
 *   (filesystem reads) on top to create a new "runtime" to complete with Backend 
 *   languages like Java.
 * - So, runtime basically means something which can run/compile JavaScript.
 * - JS was never meant to be run in the backend. Eventually became very popular
 *   and is a popular and is a popular choice of runtime on the backend.
 *
 * - Anyone can write a compiler and there is no single compiler for JS. 
 * - Two most popular ones are :
 *   (a) V8 - Used by Google Chrome/Chromium - [C] (https://github/v8/v8)
 *   (b) SpiderMonkey - Used by Firefox - [C + Rust] (https://spidermonkey.dev/)
 * - Whoever is writing the code for this compiler needs to make sure that whenever
 *   the ECMAScript Standard is updating, they are updating their C code here and
 *   introduce those constructs.
 * - These are not written in JS, these are compilers which compiler the JS Code
 *   into 0s and 1s.
 *
 * Note: Node.js is not a language, it is not a framework.
 *  =>  It can execute not only the standard ECMAScript language but also new 
 *      features that are made available through C++ bindings using the V8 engine.
 *  =>  It consists of C++ files which form the core features and JavaScript 
 *      files which expose common utilities and some of the C++ features for easier 
 *      consumption.
*/

/**
 * Q. What is Bun?
 * - Other than the fact that JS is single threaded, Node.js is slow(multiple reasons
 *   for it). Some smart people said they wanted to re-write the JS runtime for
 *   the backend and then introduced Bun.
 * - It is significantly faster runtime
 * - It is written in Zig (https://github.com/oven-sh/bun)
 * 
 * Note : We will be focusing on Node.js. Specifically, how to write Backend applications
 * using JavaScript
*/

/**
 * Q. What can you do with Node.js?
 * 1. Create clis (Command Line Interface)
 * 2. Create a video player
 * 3. Create a multiplayer game
 * 4. Create an "HTTP server" (generally we use this)
 * 5. Streaming Services
 * 6. Backend Services like APIs
 * 7. Traditional Websites
*/

/**
 * Backend : 
 * - Backend is divided into 4 parts :
 * (a) HTTP Servers
 * (b) Authentication
 * (c) Databases
 * (d) Middlewares
*/

/**
 * Q. What is an HTTP Server?
 * - HTTP : Hyper text transfer protocol
 *   (1) A protocol that is defined for machines to communicate 
 *      (Machines talking to each other i.e. Internet)
 *   (2) Specifically for websites, it is the most common way for your website's
 *       frontend to talk to its backend
 *
 * Note : First let's understand what are frontends and backends.
 * (i) Frontend/Client : Browser/Client which we can see & feel and we can send response
 *    HTML/CSS/JS.
 * (ii) Backend/Server : The place where a request goes and some response comes back
 *     and renders the search result. This place is a very big data center somewhere
 *     at some place like California is "Server" (Node.js)
 *
 * => So, when we click on the search button in browser, the protocol that lets this
 *    frontend communicate to the backend and get back a response is HTTP Protocol.
 *    (95% protocols are HTTP protocols)
*/

/**
 * HTTP Servers : How to communicate
 * - HTTP Servers in themselves comprises of 5 things :
 *   (a) Request methods
 *   (b) URL Route
 *   (c) Query params Headers body
 *   (d) Status Codes
 *   (e) Response HTML JSON Text
 *   (f) OORS
*/

/**
 * History of Internet:
 *  - A few years back when we didn't have internet. Internet is a lot of wires and
 *    and very big companies like Airtel, Jio etc that sort of own these wires and
 *    they provide an internet connection into our house. We have a router/ethernet
 *    cable and that cable connects everyone around the world.
 *  - But before where were these machines (pre-internet days), we only had machines
 *    existed independently. They could not talk to each other.
 *  - MIT, UCLA, USC had big machines that were running algorithms but the problem
 *    was these machine never talked to each other in the pre-internet work. But
 *    there is no way for someone in UCLA to ask MIT what's running in your machine?
 *    or for me in India to run an expensive operation there. Today this is possible.
*/

/**
 * Q. How do frontend talk to backend?
 * - Wires/Routers
 * 
 * - Eventually people realised we can connect computers with wires :
 * 
 *   +-----+              +------------+
 *   | MIT |--------------| My Machine |
 *   +-----+              +------------+
 *
 *  - I want to run an algorithm in MIT's machine but we don't have the capability to
 *    do it. When people realized that we can connect machines with wires then they
 *    realise computers can talk to each other. Aslam can ask CHAT GTP server for
 *    something and MIT Server can run that calculation here and then respond back 
 *    the calculation result.
 * 
 *   +-----+   input      +------------+
 *   | MIT |<------------>| My Machine |
 *   +-----+   output     +------------+
 *
 * - Until last class this is how we would call function, it would do something
 *   and return something. Now my machine needs a browser and the browser will
 *   simply ask CHATGPT machine to find the sum from 1to10 and CHATGPT machine
 *   will return the output and Aslam can show that in the browser.
 *
 * Q) How do we do that? 
 * Q) How do we communicate with each other?
 * - There is a way called as "Protocol" and every machine implements that protocol.
 * - These are defined set of rules how two machines communicate.
 * - There are many protocols like TCP, UDP etc and most famous protocol is "HTTP". 
 * - It's a defined set of rules around how machines need to communicate and every 
 *   machine that exist out there, if they want to allow this sort of communication
 *   has in-built rules on :
 *   (a) how to handle incoming traffic
 *   (b) how to send out outgoing traffic
 *
Q) How can we write some code in MIT so Aslam can access an algorithm and get back
   a response?
 - Client Server Model :
    +-----------------------------+          +----------+
    | Client (browser, mobile app,|--------->|  Server  |
    |           desktop app)      |          +----------+
    +-----------------------------+ 

 - The people who defined this protocol said whenever you want to communicate
   between two machines, one needs to be a server and one need to be a client.
 - In realworld, Client(AWS Machines in datacenter) and client(browser, mobile, etc)

Q) What is an HTTP Server?
Q) How can we as a backend developer write code so that we can accept inputs
   from the Client, process the algorithm and return output to the client?
 - Some code that follows the HTTP Protocol and is able to communicate with clients
   (browsers/mobile apps...)
 - Client send some request to the server, it gives you back some data.
 - Think of it to be similar to the call app in your phone which lets you
   communicate with your friends.

HTTP Protocol :
 - In the end, it's the client throwing some information at a server.
 - Server doing something with that information
 - Server responding back with the final result
 - Have you seen this before until now?
 - Think of them as functions, where :
 (1) Arguments are something the client sends
 (2) Rather than calling a function using its name, the client uses a URL
 (3) Rather than the function body, the server does something with the request
 (4) Rather then the function returning a value, the server responds with some data

Q) How to communicate?

HTTP Protocol (Client) :
Q) What are the things client needs to worry about?
 (a) Protocol (HTTP/HTTPS)
 (b) Address(URL/IP/PORT)
 (c) Route
 (d) Headers Body Query Params
 (e) Response HTML JSON Text
 (f) Method

Q) Assume CHAT GPT has a good server. How will you send it a request?
 - We need to know what protocol they are exposed on.
 - We need to know URL which maps to the backend server.

HTTP Protocol (Servers) :
Q) What are the things server needs to worry about?
(a) Response Headers
(b) Response Body
(c) Status Codes

 - Whenever a server receives a request, it does some maths. Once it is done,
   it is responding with some "response headers", "response body" and "status codes".

Understand Client Side in more detail (How communication happens):

=> https://chat.openai.com/backend-api/conversation
(a) Protocol : https:// 
(b) URL : chat.openai.com
(c) Route : /backend-api/conversation

(d) Header - Cookie - 123as@332SD3@/E223 (Authorisation Cookie helps to login (JWT Token))
(e) Body - What is 2 + 2 (usually in JSON) : We send argement/request here
(f) Method: POST (what kind of request we are sending)

Browser -> Inspect -> Network Tab :
 - We are sending a request to the CHATGPT server asking : "hi what is 2+2?"
 - When we press enter a lot of request went out. Focus on "converation"
 - Click on "converation" then you can see :
        (a) Headers
        (b) Payload
        (c) EventStream
        (d) Initiator
        (d) Timing
        (e) Cookies
 - Go to the "Payload", here we can see we are sending out a "message" and if
   we open the complex object, we can see "hi what is 2+2?"
 - This is me sending out the request to 
   "https://chat.openai.com/backend-api/conversation" and we can see it in 
   "headers" section
 - Then the backend-api return "2+2 is 4". 
 - And this is how we are communicating with CHATGPT Server. And this is the
   basics of how website works, which is same for LinkedIn, Facebook, Instagram etc.
   means we talk to the backend server.



Q) What happens when we go to "google.com" and press enter?
 - Things that happen in your browser after you fire this request (we will get
    to know how to fire request to a backend server later)
 (1) Browser parses the URL (finding out where we are sending our request)
 (2) Does a DNS Lookup (Converts google.com to IP) => DNS lookup basically means
     under the hood where the request goes out is actually an IP address like 
     phoneNo. The way to find a server is to actually specify IP.

     When we go to "google.com", the first thing happens is DNS Resolution (Domain
     Name Service Resolution). Actually IPs are hard to remember to find machines,
     so a system was created where people can come and buy domain names and they
     can map their domain names with IP. It is same as if we call my friend
     'Raman' but under the hood it realises that this is '987654XXX' and makes
     the call their.

 (3) Establishes a connection to the IP (does handshake...)
     Once call gets connected we can talk (handshake)

Q) What is DNS resolution?
 - URLs are just like contacts in your Phone
 - In the end, they map to an IP
 - If you ever buy a URL of your own, you will need to point it to the IP of your
   server. 


Note : Things that happens on you server after the request is received :
1. You get the inputs (route, body, headers)
2. You do some logic on the input, calculate the output
3. You return the output body, headers and status code

+----------------+        +--------+
| Browser/Client |--------| Server |
+----------------+        +--------+

We are sending a request to our server, what the request looks like is now what
   we need to discuss :
 - To send the request, first we need to know where we need to send the request
   because there is so many servers available in the internet like Facebook server,
   Instagram Server, CHAT GTP Server etc.
(a) URL :
 - So, frontend & backend have one very important thing called "URL". This is how
   we identify who you want to talk to. In case of CHATGPT, we write :
   URL : https://chat.openai.com/backend-api 
 - Similarly, when we want to talk to specific backend server on the internet, we
   need to know its URL.

(b) Route :
 - Route is basically what appears after the URL : http://chat.openai.com thats is
   "/backend-api/". And this is the route that we are hitting.
 - URL : http://chat.openai.com server can do 10 thing/ run 10 different algorithms
   but this route basically tells out of those 10 algorithm, what algorithm I want
   to run now.
 - So, URL+Route is most important thing when we are talking to backend server.

 - Requested URL :  https://chat.openai.com/backend-api 
 -                  <---------URL---------><---Route-->
                    <----HTML Response----><---Data--->

HW : Write a backend server on the "/" route returns the sum from 1 to 10

(c) status code 

Q) What are the common methods you can send to your backend server?
1. GET
2. POST
3. PUT
4. DELETE

Q) What are the common status codes the backend responds with?
1. 200 - Everything is OK
2. 404 - Page/route not found
3. 403 - Authentication issues (if our cookie was wrong => request forbidden)
4. 500 - Internal Server Error (If there is some bug in our backend)

Q) Why do we need status codes?
Q) Why can't we just return in the body something like : true/false 
Q) Why do we need so many types of request methods? 
Q) Why can't just one work?
Q) Why do we need body/headers/query params, why can't just one work?
=> These are standard practices, you don't need all of it, but it is what is 
   mentioned in the spec and hence is good to follow.

Q) How do I create an HTTP Server of my own?
Q) How do I expose it over the internet like chapgpt.com?


Q) Can server serve my application?
Q) How it realises for which application this request is for?
 - A server a host multiple requests
 - There is something called PORT (Address(URL/IP/PORT))
 - So, if we have multiple backends we can run them on different inputs and whoever
   is calling our backend will specify a PORT. And this is how we can multiple
   processor on the same server.
   
Structure of Node.js :
(a) package.json
(b) npm modules
(c) .js files

   */
