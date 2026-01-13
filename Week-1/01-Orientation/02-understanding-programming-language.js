/**
 * Basic Introduction:
 * > During 1950s and 1960s, people realised we have machines and 
 *   machines have hardware that can used to churn out code and create
 *   programs
 * > Our machine is very dump, it only understands 0s and 1s.
 *
 * What does that mean?
 * > It means that if you basically look inside the hardware of your 
 *   machine, it understands binary which means it understands 0s and 1s.
 * > It does not understand the code that we write. And our machine was
 *   never meant to understand the code and code was always meant to be
 *   written in 0s and 1s.
 * > So, the people who would write code would write 0's and 1's, 
 *   something called as "Assembly Language". And that was the way to 
 *   write programs back in the day.
 * > But people realized this is very hard for a developer to do and 
 *   hence programming languages were introduced for you to write code 
 *   in some fashion that look like we do today. And that's easy for 
 *   you to write and then it will get converted into 0's and 1's and 
 *   machine will understand it.
 *   
 * > Today with ChatGPT, we write it in english and it will sort of
 *   give you second layer of code and using this second layer of code,
 *   third layer of code is created.
 *      
 * > But in the day of 1950s, most probably programming languages 
 *   wouldn't have been a thing. People who would have described the 
 *   program in English, which would have been converted to 0's and 1's
 *   and how would it be robust.
 * > But since you did not have machine learning back then, people 
 *   thought of the most optimal solution which was writing code in 0's
 *   and 1's which was really hard and hence we are not going to write 
 *   in 0's and 1's. We are going to write code in high level languages,
 *   which are easy for humans to write, and then we have something 
 *   called "compiler", which converts it to 0's and 1's. And Assembly 
 *   Language was the thing that was suppose to be written eventually
 *   high level programming languages were introduced and hence we sort
 *   of are where we are today, and we have Java, Python, JavaScript etc.
 * > Every Programming languages were written in different ways and each
 *   have their own Pros and Cons.
*/

/**
 * JS Architecture:
 * Now we are discussing the pros and cons and the general architecture:
 * > JS was introduced around 1990s, when someone realised there are 
 *   bunch of languages and they used to be like Fortran back then etc.
 *   But there is nothing yet written for the browser.
 * > In fact, th browser doesn't exist in 1900. The web itself was a 
 *   very vague phenomenon back then. 
 * > Some people realized that we need a language that a website used 
 *   to do a bunch of things, so website needs to have elements, it needs
 *   to be styled but needs to have some functionality as well.
 * 
 * What's functionality?
 * > Clicking on a button should do something when I am typing using my
 *   keyboard, something should happen, these are things for which we 
 *   need something that's called "Scripting Language", a language in 
 *   which you can define what happens when something is clicked or when
 *   something the key is pressed. And these things we cannot do in HTML,
 *   CSS, even though HTML, CSS are "trade languages" and needed for the
 *   web, they cannot cover every use case. And hence we introduced 
 *   JavaScript.
 * 
 * >  JavaScript is the scripting language of the web, it's the thing 
 *    our browser understands and it was meant to be only undertstood 
 *    by browsers. Back in the day there was an organization that said 
 *    this is the introduced a format to write a compiler for javascript
 *    that every one need to follow a "Standard". And for that they 
 *    introduced a "guidelines and rules" which every JS developer needs
 *    to follow known as "ECMAScript Standard". Companies follow this 
 *    guidelines and rules to create compilers/engines to create browsers. 
*/

/**
 * Understanding JavaScript Ecosystem using a Factory Analogy
 * 1. City & Factory Setup:
 *    - Imagine ek city hai - Jaipur, jisme mera ek dost Vikash rehta hai.
 *      Uska ek wood factory hai:
 *      a. Raw wood Gujarat se aata hai
 *      b. Us wood ko uski factory mein process kiya jaata hai
 *      c. Yani, ek mini industry system chl rha hai.
 *    - Same waise hi humne bhi ek mega-factory setup ki, jo ek programming
 *      concept ko represent karta hai.
 * 
 * 2. Roles in our Factory:
 *    - Humne factory k andr kaam easy banane k liye usse divide kiya 2 parts
 *      mein:
 *      a. Showroom (Front Display):
 *         - Yahaan ready-made cheezein dikhai jaati hai.
 *         - Customer yahi aake maal dekhte hai.
 * 
 *      b. Workshop (Backend Processing):
 *         - Yahaan real kaam hota hai - jaise customized furniture banana,
 *           painting, cushion fitting, etc.
 * 
 * 3. Main Characters in Factory:
 *    a. Manager (Main Control)              : Node.js
 *    b. Sales Person (Customer Interaction) : Libuv/Express.js (Backend)
 *    c. Showroom                            : Frontend/Pre-built responses
 *    d. Workshop                            : Backend Logic(file/db tasks)
 *    e. Mini Factories                      : Functions or Helper Modules
 *    f. External Services                   : APIs/AI Tools
 * 
 * 4. Real-Life Flow - Sofa Making Example
 *    a. Customer showroom aata hai: "Bhai, mujhe ek customized sofa chahiye."
 *    b. Manager (Node.js) usse greet karta hai but actual work sales person
 *       (Express.js) ko deta hai.
 *    c. Sales person dekhta hai:
 *       - Agar simple maal hai     → showroom se de do.
 *       - Agar customized maal hai → workshop mein bhej do.
 * 
 * 5. Workshop Process (Backend Logic):
 *    - Workshop mein hum karte hai:
 *      a. Sofa frame banana       : function: createFrame()
 *      b. Paint Check karna       : function: checkPaint()
 *      c. Cushion fitting         : function: fitCushion()
 *    - Ye saare tasks chhoti chhoti mini-factories(functions) mein hote hai.
 *    - Jab sofa ready ho jaata hai:
 *      Workshop -> Showroom -> Sales Person -> Customer
 * 
 * 6. External Services:
 *    - Kuch cheezein hum khud nhi karte, jaise:
 *      a. Leather fitting
 *      b. AI-based work
 *      c. External APIs like ChatGPT, Payment Gateways, etc.
 *    - Toh hum ye city se bahar bhej dete hain:
 *      a. Jaipur se bahar
 *      b. Jaipur = JS Ecosystem
 *      c. City ke bahar wale = 3rd party systems/tools (AI, Payment, etc.)
 * 
 * Note: Full Stack Project is a factory setup.
*/





/**
 * Introduction to Node.js :
 * People realized that JavaScript is a powerful language. JS can run 
 * very well in browsers and it's been running for really long time. 
 * Why not let it run on backend machines?
 * 
 * > Backend machines are any program that we run other than websites 
 *   on a machine is a "native program/backend program" like PC Games,
 *   VLC Player, even the browser itself are called native application,
 *   these are not web app.
 * > Any playlist we run code, other than websites (HTML, CSS, JS) assume
 *   that to be backend code. And then companies realise why not create
 *   games, machine learning in NodeJS? NodeJS is nothing but the 
 *   compiler that Google wrote for google chrome and was pulled out and
 *   created a new backend framework called Node.js.
 * > So, Node.js is only one thing, which is "JavaScript Runtime". 
 *   It is just a engine which Chrome uses called "V8 Engine".
*/