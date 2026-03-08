"use server";
import { headers } from "next/headers";
import db from "@/lib/db";
import { auth } from "@/lib/auth";
import { stripe } from "../config/stripe";

export async function createCheckoutSession() {
  try {
    /* 1. Get authenticated user */
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    /* 2. Get user from database */
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    /* 3. Check if already premium */
    if (user.plan === "PREMIUM") {
      throw new Error("Already a premium member");
    }

    /* 4. Create or get Stripe customer */
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });

      customerId = customer.id;

      /* 5. Save customer ID to database */
      await db.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    /* 6. Create Checkout Session */
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro Plan",
              description: "Unlock all premium features",
            },
            unit_amount: 999, // $9.99
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}?canceled=true`,
      metadata: {
        userId: user.id,
      },
    });

    return { url: checkoutSession.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error(error.message || "Failed to create checkout session");
  }
}
