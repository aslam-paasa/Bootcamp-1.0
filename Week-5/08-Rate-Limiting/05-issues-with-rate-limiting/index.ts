/**
 * Issues with Rate Limiting:
 * While rate limiting is an effective technique to mitigate brute-force 
 * attacks and prevent abuse of specific endpoints, it does not provide 
 * complete protection against Distributed Denial of Service (DDoS) attacks.
*/


/**
 * Problem:
 * - Rate Limiting is not foolproof against DDoS. Your server is still 
 *   vulnerable to DDoS.
 * - If we are rate limiting by email then our previous approach is fine.
 * +-----+
 * | IP1 |
 * +-----+
 * | IP2 | 
 * +-----+              +----------------+
 * | IP3 | -----------> | Backend Server |
 * +-----+              +----------------+
 * | IP4 |
 * +-----+
 *   ...
 *   ...
 * +-----+
 * | IPn |
 * +-----+
 * - Though DDoS is rarely used for password reset, it is usually used to
 *   choke the server.
*/

/**
 * DDoS: Distributed Denial of Service
 * Most websites limits based on IP to restrict bots from abusing the server.
 * a. If we start from one machine and do a brute force, that's a distributed
 *    denial of service.
 * b. Now hacker can get multiple machines all around the world and start to
 *    hit the server from multiple machines in parallel from different IPs,
 *    that's also a distributed denial of service.
 * 
 * They main purpose is to get down the service and make it vulnerable.
*/

/**
 * Why do attackers do DDoS?
 * 1. To charge random because the service remains down until DDoS is lifted.
 * 2. On sneaker drop events/NFT mints where the faster the request reaches
 *    the server the better.
*/

/**
 * How can you save the reset password endpoint from DDoS?
 * 1. You can implement logic that only 3 resets are allowed per email sent
 *    out.
 * 2. You can implement captcha logic.
*/