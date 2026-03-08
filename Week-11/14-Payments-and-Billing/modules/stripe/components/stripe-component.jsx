/**
 * 5.c. Stripe-based Pro Subscription
 * > Authentication
 * > Stripe Checkout
 * > Database Sync
 * > Feature Gating (Free vs Pro)
 * > Clean UI Feedback
 *   (This is real SaaS billing architecture, not a demo.)
 * 
 * A logged-in user clicks “Upgrade”, we securely create a Stripe 
 * subscription on the server, redirect them to Stripe Checkout, and 
 * later treat them as a Pro user in the UI. 
*/

/** Flow:
 * > Client          (StripeComponent)
 * > Server Action   (createCheckoutSession)
 * > Auth            (validate user)
 * > Database        (get user & plan)
 * > Stripe          (create customer + checkout session)
 * > Client redirect (stripe checkout)
 * 
 * Explanation:
 * 1. User Page Open karta hai (Initial Load)
 *    > Page load hota hai
 *    > StripeComponent render hota hai
 *    > const { data, isPending } = authClient.useSession();
 *      - Browser auth system se session poochta hai
 *      - Ye check ho rha hota hai: "User logged in hai ya nhi?"
 * 
 *    > Agar session abhi aa nhi rha (Pending), to loader dikhao:
 *      - <Loader2 className="animate-spin" />
 *      - Means: "Ruko, pehle confirm kar loon kaun user hai"
 * 
 *    > Session aa gya (User logged in)
 *      - data.user = {
 *           name,
 *           email
 *        }
 *      - Aur server se prop me: plan = FREE ya PREMIUM
 * 
 * 2. UI decide karta hai - FREE ya PRO?
 *    > const isPro = plan === stripe_plan.PREMIUM;
 *    > Agar FREE user hai to UI pe dikhega:
 *      - Name + Email
 *      - Badge: FREE PLAN
 *      - Button: Try Pro Feature
 *      - Button: Upgrade to Pro
 *    > Agar PRO user hai to UI pe dikhega:
 *      - Name + Email
 *      - Badge: PRO MEMBER
 *      - Button: Access Pro Features
 *      - (Upgrade button nhi dikhega)
 *      - Yahin pe feature gating ho rhi hai
 * 
 * 3. User "Try Pro Feature" Button dabata hai
 *    - <Button onClick={onProAction}>
 *    - Button dabate hi kya hota hai?
 *      const onProAction = () => {
 *        if (isPro) {
 *          toast.success("Pro feature activated");
 *        } else {
 *          toast.info("Upgrade to Pro");
 *        }
 *      }
 *    - Logic:
 *      > Free user -> sirf message dikhao
 *      > Pro user  -> actual feature allow karo
 *    - Abhi ye demo hai, real feature baad m aaega
 * 
 * 4. User "Upgrade to Pro" Button dabata hai
 *    - <Button onClick={onUpgrade}>
 *    - onUpgrade() Client Side pe chalta hai:
 *      setIsUpgrading(true)
 *    - UI pe kya hota hai:
 *      > Button disable
 *      > Loader dikhne lgta hai
 *      > User dobara click nhi kar skta
 * 
 *    - Client -> Server Action call
 *      const { url } = await createCheckoutSession()
 *    - Important baat:
 *      > Yahan fetch/API route/axios kuch nhi nhi
 *      > Direct server fn call ho rhi hai
 * 
 * 5. Server Action start hota hai (createCheckoutSession)
 *    - Ab control server ke paas chala gya hai
 *    
 *    - Server Check karta hai - User Logged In hai?
 *      auth.api.getSession({ headers })
 *    - Agar user loggin in nhi:
 *      > Error: Unauthorized
 *      > Stripe ko koi kaam nhi hota
 *    - Security checkpoint
 * 
 *    - Server DB se User nikalta hai
 *      db.user.findUnique({ id })
 *    - Kyu:
 *      > Stripe ID
 *      > Plan
 *      > Email
 *      > Sb DB me hai
 *    - DB is source of truth
 * 
 *    - Server Check karta hai - Already PRO?
 *      if(user.plan === "PREMIUM") throw Error
 *    - Means: "Jab already Pro hai, usse paise mat lo"
 * 
 *    - Stripe Customer hai ya nahi?
 *      > Agar pehli baar payment: stripe.customers.create()
 *      > Phir: db.user.update({ stripeCustomerId })
 *    - Relation ban gya:
 *      > App User <--> Stripe Customer
 * 
 *    - Stripe Checkout Session Create hota hai:
 *      stripe.checkout.sessions.create({
 *        mode: "subscription",
 *        price: $9.99/month
 *      })
 *    - Stripe kya krta hai:
 *      > Product banata hai
 *      > Subscription mode set karta hai
 *      > Ek secure URL deta hai
 * 
 *    - Server URL Client ko wapas deta hai
 *      return { url }
 *    - Server ka kaam khatm
 * 
 * 6. Client Browser Redirect karta hai:
 *    - window.location.url = url;
 *    - UI pe kya hota hai:
 *      > App se bahar jaate hai
 *      > Stripe ka payment page khulta hai
 *      > Card details Stripe handle karta hai
 *    - Tmhra app kabhi card nahi dekhta
 * 
 * 7. Payment Successful
 *    - Stripe:
 *      > Payment leta hai
 *      > Subscription create karta hai
 *      > (Next Step) webhook bhejta hai
 *    - WebHook DB me: user.plan = PREMIUM
 * 
 * 8. User Wapas App me aata hai:
 *    - Page reload hota hai: plan === PREMIUM
 *    - UI m kya change?
 *      > Badge: PRO MEMBER
 *      > Upgrade button gayab
 *      > Pro features unlocked
 * 
 * 9. Final Flow
 *    - Page open →
 *    - Session load →
 *    - FREE user →
 *    - Upgrade click →
 *    - Server validates →
 *    - Stripe checkout →
 *    - Payment →
 *    - DB update →
 *    - User becomes PRO
 * 
 * 10. Final Mental Model
 *     - Client        : Sirf Buttons & UI
 *     - Server Action : Saari Security + Stripe
 *     - DB            : Final truth
 *     - Stripe        : Payment Expert
*/

"use client";

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
/* UI Components (shadcn) */ 
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
/* Icons */ 
import { Crown, Zap, Loader2 } from 'lucide-react';
/* Enum from Prisma for plan comparison (Plan from DB) */ 
import { stripe_plan } from '@prisma/client';
/* Toast Notification */ 
import { toast } from 'sonner';
/* Server Action that creates Stripe Checkout Session */ 
import { createCheckoutSession } from '../action';


const StripeComponent = ({ plan }) => {
  const { data, isPending } = authClient.useSession();
  const [isUpgrading, setIsUpgrading] = useState(false);


  const getInitials = (name) => {
    if (!name) return '??';

    const names = name.trim().split(' ');

    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();

    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };


  const onUpgrade = async () => {
    try {
      setIsUpgrading(true); 

      const { url } = await createCheckoutSession();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      /* Show error toast */ 
      toast.error(error.message || 'Failed to start checkout');
      setIsUpgrading(false);
    }
  };

  const onProAction = () => {
    if (isPro) {
      toast.success('Pro feature activated! 🎉');
    } else {
      toast.info('Upgrade to Pro to unlock this feature');
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const user = data?.user;
  const isPro = plan === stripe_plan.PREMIUM;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="overflow-hidden">

        {/* HEADER: User Profile */}
        <CardHeader className="pb-4 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">

              {/* User Avatar */}
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-indigo-500">
                <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl font-semibold">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  {user?.name || 'User'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email || 'user@example.com'}
                </p>

                {/* Plan Badge */}
                <Badge
                  variant={isPro ? "default" : "secondary"}
                  className="mt-2"
                >
                  {isPro ? (
                    <span className="flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      PRO MEMBER
                    </span>
                  ) : (
                    <span>FREE PLAN</span>
                  )}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* CONTENT: Actions */}
        <CardContent className="pt-6 border-t bg-secondary/5">
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Pro Feature Button */}
            <Button
              onClick={onProAction}
              className="flex-1 gap-2"
              variant={isPro ? "outline" : "secondary"}
              size="lg"
              disabled={isUpgrading}
            >
              <Zap className="w-5 h-5" />
              {isPro ? 'Access Pro Features' : 'Try Pro Feature'}
            </Button>

            {/* Upgrade Button (Only for FREE users) */}
            {!isPro && (
              <Button
                onClick={onUpgrade}
                className="flex-1 gap-2 bg-indigo-500 hover:bg-indigo-600"
                size="lg"
                disabled={isUpgrading}
              >
                {isUpgrading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5" />
                    Upgrade to Pro
                  </>
                )}
              </Button>
            )}
          </div>

          {/* FREE Plan Message */}
          {!isPro && (
            <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                Upgrade to Pro for just $9.99/month to unlock premium features
              </p>
            </div>
          )}

          {/* PRO Plan Message */}
          {isPro && (
            <div className="mt-6 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <p className="text-sm text-center text-indigo-600 dark:text-indigo-400 font-medium">
                🎉 You have full access to all premium features!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StripeComponent;
