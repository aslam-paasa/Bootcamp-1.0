/**
 * Stripe Component into Stripe tab:
 * > Till now we have already setup a basic NextJS Project with:
 *   - BetterAuth: for authentication
 *   - Prisma    : for database handling
 *   - ShadCn    : to build clean & reusable UI
 * > Users can now signup, login and stay authenticated, and now we
 *   are going to make that userful by allowing them to upgrade,
 *   subscribe, purchase something inside our application.
 * 
 * 1. Why do we need billing?
 *    > Every successful product reaches a point where free users are
 *      not enough.
 *    > We need to convert those users into paying customer. And that's
 *      where billing system comes in.
 *    > We need billing:
 *      - to manage subscriptions, either yearly or monthly basis,
 *      - to handle payments securely,
 *      - to track customer usage and invoices.
 *    > This is the most important part of Full-Stack SASS Application.
 * 
 * 2. What we'll cover?
 *    > We'll cover 3 powerful payment providers:
 *      a. Stripe
 *      b. Polar
 *      c. RazorPay 
*/

/**
 * Integrating Billing inside our application:
*/