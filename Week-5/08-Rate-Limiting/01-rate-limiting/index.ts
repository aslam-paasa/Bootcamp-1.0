/**
 * Rate Limiting:
 * - It means limiting the rate at which a single user can send a request to
 *   our backend.
 * - If my backend is written in any language like Node.js, Golang, etc., 
 *   it doesn't matter, a client can send a large number of requests, either
 *   manually, bots, or by using loops.
 * 
 *   for(i = 0; i < 1000000; i++) {
 *     axios.get('https://api.example.com/data')
 *   }
 * 
 * - So, there is nothing stopping a client from sending a large number of 
 *   requests to our backend. And many people will do this, intentionally or
 *   unintentionally for different reasons:
 *   a. Run bots on website like concert ticket websites to get tickets.
 *      They continuously send a large number of requests until they get
 *      the tickets, and they sell them on the black market at a higher price.
 *   b. Sneaker Drops, when a new product is released, people will send a 
 *      large number of requests to the website to get the product. For
 *      Example: Nike, Adidas, etc.
 * 
 * - Rate Limiting is a way to prevent this from happening. It limits the
 *   number of requests at a certain time period. For example, if a user sends
 *   5 requests in 1 second, then the user will be blocked for 1 minute. So,
 *   we are setting a certain rate at which a user can send requests to our
 *   backend.
*/

/**
 * Why Rate Limiting?
 * 1. Preventing Overload:
 *    Rate Limiting controls how often a user or system can make requests
 *    to a service. This helps prevent overuse of resources, ensuring that
 *    the system remains available and responsive for all users. For example,
 *    rate limiting can stop a single user from making thousands of login
 *    attempts in a minute, which could otherwise degrade service for others.
 * 
 * 2. Mitigating Abuse:
 *    Without rate limiting, on application could be more susceptible to
 *    abuse such as brute force attacks on passwords or spamming behavior.
 *    By limiting how often someone can perform an action, it reduces the
 *    feasibility of such attacks.
 * 
 * 3. Managing Traffic:
 *    In high-traffic scenarios, like ticket sales for a popular event, rate
 *    limiting can help manage the load on a server, preventing crashes and
 *    ensuring a fairer distribution of service like bandwidth or access to
 *    the purchasing system.
 * 
 * 4. DDoS Protection:
 *    A DDoS attack involves overwhelming a site with a flood of traffic from
 *    multiple sources, which can make the website unavailable. DDoS protection
 *    mechanisms detect unusual traffic flaws and can filter out malicious
 *    traffic, helping to keep the service operational despite the attack.
 * 
 * 5. Cost Optimization:
 *    - In cloud computing environments, where resources are billed based on
 *      usage, rate limiting can help optimize costs by preventing excessive
 *      resource consumption.
 *    - By limiting the rate at which requests are processed, you can avoid
 *      unnecessary scaling and associated costs.
 * 
 *      Overall, rate limiting is a crucial technique for ensuring the 
 *      availability, securing, and scalability of web applications and
 *      APIs. It helps to maintain a balance between serving legitimate 
 *      traffic and protecting against abuse or overload scenarios.
*/

/**
 * Common Use Cases for Applying Rate Limiting:
 * 1. Password Reset Endpoints:
 *    When allowing users to reset their passwords using an OTP (One-Time
 *    Password) send to their email, the endpoint that handles the submission
 *    of the OTP for password reset should be heavily rate limited. Failing
 *    to implement rate limiting on this endpoint can make the application
 *    vulnerable to brute-force attacks, where an attacker can repeatedly
 *    guess the OTP by sending a large number of requests until they find 
 *    the correct one, potentially gaining unauthorized access to user
 *    accounts.
 * 
 * 2. Login Endpoints:
 *    Login endpoints should be rate limited to prevent brute-force attacks
 *    or user credentials. Attackers may attempt to gain access to accounts
 *    by trying numerous username and password combinations, which can be
 *    mitigated by limiting the number of failed login attempts from a
 *    single IP address, user ID, or other relevant identifier.
 * 
 * 3. Signup/Registration Endpoints:
 *    Rate limiting should be applied to sign-up or registration endpoints 
 *    to prevent abuse and automated account creation. Without rate limiting,
 *    malicious actors could create a large number of fake accounts for 
 *    various purposes, such as spamming, credential stuffing, or other 
 *    malicious activities.
 * 
 * 4. API Endpoints:
 *    Public-facing API endpoints should be rate limited to prevent excessive
 *    usage and potential Distributed Denial of Service (DDoS) attacks. Rate
 *    limiting can help ensure that no single client or user can monopolize
 *    the API resources, maintaining availability for all legitimate users.
 * 
 * 5. Sensitive Operations:
 *    Endpoints that handle sensitive operations, such as changing email
 *    addresses, passwords, or two-factor authentication settings, should be
 *    rate limited to prevent abuse and unauthorized access attempts.
 * 
 * 6. High-Traffic Endpoints:
 *    In scenarios with high traffic, such as ticket purchases or e-commerce
 *    checkout processes, rate limiting should be implemented to manage the 
 *    influx of requests and ensure fair distribution of resources among users.
 * 
 * General Considerations:
 * Rate limiting should be applied based on various factors like IP address,
 * user ID, email address, or any other relevant identifier, depending on 
 * the application's requirements. The rate limits should be set to reasonable
 * values that allow legitimate usage while preventing abuse or excessive 
 * load on the system.
*/