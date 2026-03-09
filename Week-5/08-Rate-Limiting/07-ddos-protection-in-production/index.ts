/**
 * DDoS Protection in Production:
 * Turnstile is effective at stopping bots by running a series of in-browser
 * tests, checking browser characteristics, and utilizing lightweight 
 * proof-of-work or proof-of-space tests.
 * 
 * 1. Move your domain in Cloudflare:
 *    > Sign up for a Cloudflare account if you haven't already.
 *    > Add your domain to Cloudflare by following the instructions provided 
 *      during the onboarding process.
 * 
 * 2. Proxy All Records via Cloudflare:
 *    > Once your domain is added to Cloudflare, navigate to the DNS settings.
 *    > Ensure that all your DNS records (A, AAAA, CNAME, etc.) are proxied 
 *      through Cloudflare. This is typically done by changing the record type
 *      to "Cloudflare DNS" or enabling the "Proxy" option for each record.
 * 
 * By proxying all your records through Cloudflare, your website or 
 * application traffic will be routed through Cloudflare's global network, 
 * which provides DDoS protection and other security features.
 * 
 * Note: This is usually more than good enough, but if you'd like to dive
 *       further, you can add IP based rate limits, override DDoS in the
 *       security section to the cloudflare.
 * 
 *       AWS/GCP also provide you with the same.
*/