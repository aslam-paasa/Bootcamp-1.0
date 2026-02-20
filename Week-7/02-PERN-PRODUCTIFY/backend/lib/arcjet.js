import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import "dotenv/config";


/* Initialize Arcjet: */ 
export const aj = arcjet({
    key: process.env.ARCJET_KEY,

    /* Track requests by real client IP */
    characteristics: ["ip.src"],

    rules: [
        /* Protect against common attacks (SQLi, XSS, etc.) */
        shield({ mode: "LIVE" }),

        /* Block bots except trusted search engines */
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE", /* Google, Bing, etc */
            ],
        }),

        /* Token bucket rate limiting */
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, /* Refill 5 tokens per interval */
            interval: 10,  /* Refill every 10 seconds      */
            capacity: 10,  /* Bucket capacity of 10 tokens */
        }),
    ],
});

