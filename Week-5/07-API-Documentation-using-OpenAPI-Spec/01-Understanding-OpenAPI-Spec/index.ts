/**
 * What is OpenAPI Specification?
 * > It shows the shape of our backend like Swagger UI does.
 * > It's a standard format that describes exactly how your API works, 
 *   so anyone (or any computer) can understand it.
 * > It makes it easy for the developers to understand your backend.
*/

/**
 * The Problem OpenAPI Solves:
 * > Imagine you built an amazing vending machine (your backend API). 
 *   People know it dispenses snacks, but:
 *   1. Where do I put the money?
 *   2. What buttons do I press?
 *   3. What snacks are available?
 *   4. What happens if I press B4?
 * > Without instructions, people have to guess or ask you directly!
 * > OpenAPI is that instruction manual that tells everyone exactly 
 *   how to use your vending machine.
*/

/**
 * Real-World Example: Todo App API
 * > Without OpenAPI, your backend might look like this to others:
 *   "Hey, I have a Todo app backend. Use these endpoints:
 *   - POST /signup   (needs email, password)
 *   - POST /login    (needs email, password)
 *   - POST /todo     (needs title)
 *   - GET  /todo/all (returns todos)
 * 
 * > But what if they ask:
 *   1. What format should email be?
 *   2. Is password case-sensitive?
 *   3. What happens if I send wrong data?
 *   4. Can I see an example request?
 * 
 * > You'd have to answer these questions over and over again for every
 *   developer who wants to use your API!
*/

/**
 * OpenAPI to the Rescue:
 * > With OpenAPI, you create one detailed document that answers ALL 
 *   questions:
 * 
 *   # This is what an OpenAPI file looks like
 *   paths:
 *     /signup:
 *       post:
 *         summary: "Create a new user account"
 *         requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "user@example.com"
 *                   password:
 *                     type: string
 *                     minLength: 8
 *                     example: "SecurePass123!"
 *         responses:
 *           200:
 *             description: "User created successfully"
 *           400:
 *             description: "Invalid email or weak password"
 * 
 * > This document tells developers everything they need to know to use
 *   your API correctly.
*/

/**
 * The Three Superpowers of OpenAPI:
 * 1. Auto-Generated Documentation
 *    a. Problem: 
 *       > Writing and maintaining API docs is boring and you forget 
 *         to update them.
 *    b. Solution:
 *       > OpenAPI automatically creates beautiful docs that are always
 *         up-to-date!
 *    c. Example:
 *       > Without OpenAPI: Manual docs (gets outdated)
 *       > "POST /signup - Needs email and password"
 * 
 *       > With OpenAPI: Always current!
 *       > The docs update automatically when you change your code
 * 
 * 2. Interactive Playground (UI):
 *    > OpenAPI can create a playground where developers can:
 *      - See all your endpoints
 *      - Try them out with real data
 *      - Get example code in different languages
 *    > Imagine a webpage where you can click buttons to test your API!
 * 
 * 3. Auto-Generated Client Code:
 *    > The Coolest Part! OpenAPI can automatically write code for 
 *      developers in their favorite language!
 *    > The client library already knows:
 *      - All your endpoints
 *      - What data they need
 *      - How to handle responses
 *      - Error cases
*/

/**
 * Why This Matters for Real Businesses?
 * 
 * Example-1: Trading Platform (Zerodha/Binance)
 * > Traders want to build automated trading bots. They need to:
 *   a. Get stock prices
 *   b. Place buy/sell orders
 *   c. Check account balance
 * > Without OpenAPI:
 *   Every trader emails support: 
 *   - How do I place an order? 
 *   - What's the format?"
 * > With OpenAPI:
 *   Trader visits your docs page 
 *   - Reads OpenAPI spec 
 *   - Gets auto-generated Nodejs code 
 *   -  Builds bot in minutes!
 * 
 * Example-2: Payment Gateway (like Stripe)
 * > Businesses want to integrate payments. They need clear instructions.
 * > Without OpenAPI: 
 *   - Developers struggle, 
 *   - Integration takes weeks.
 * > With OpenAPI: 
 *   - Developers get SDKs in their language, 
 *   - Integration takes hours.
*/

/**
 * How it actually works?
 * 1. You write code for your API endpoints
 * 2. Tools scan your code and create an OpenAPI document
 * 3. Magic Happens:
 *    > Documentation website is generated
 *    > Interactive playground is created
 *    > Client libraries are built (Python, JavaScript, Java, etc.)
 * 
 *     ┌─────────────────────────────────────────────┐
 *     │           Your Backend Code                 │
 *     │          (Node.js/Express, etc.)            │
 *     └────────────────────┬────────────────────────┘
 *                          │
 *                 [Scanned by tools]
 *                          │
 *                          ▼
 *     ┌─────────────────────────────────────────────┐
 *     │        OpenAPI Specification File           │
 *     │     (machine-readable API description)      │
 *     └────────┬──────────────┬──────────────┬──────┘
 *              │              │              │
 *              ▼              ▼              ▼
 *       ┌───────────┐    ┌────────────┐   ┌───────────┐
 *       │   Auto    │    │  Swagger   │   │   Auto    │
 *       │ Generated │    │    UI      │   │ Generated │
 *       │   Docs    │    │(Playground)│   │  Clients  │
 *       └───────────┘    └────────────┘   └───────────┘
*/

