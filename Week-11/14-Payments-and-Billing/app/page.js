/**
 * 4. Home Page - redirected after Login 
 *    - requireAuth     : to authenticate each route
 *    - getCurrentDbUser: to fetch user data from database
*/ 

import { requireAuth } from "@/lib/auth-utils";
import LogoutButton from "@/modules/auth/components/logout-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StripeComponent from "@/modules/stripe/components/stripe-component";
import { getCurrentDbUser } from "@/modules/auth/actions";
import { SuccessToast } from "@/modules/stripe/components/success-toast";
import { authClient } from "@/lib/auth-client";
import PolarComponent from "@/modules/polar/components/polar-component";
import { polarClient } from "@/modules/polar/config/polar";
import RazorpayComponent from "@/modules/razorpay/components/razorpay-component";
import { getCurrentRazorpayStatus } from "@/modules/razorpay/action";


export default async function Home({ searchParams }) {
  const { success, canceled } = await searchParams
  
  /**
   * 1. requireAuth: to authenticate each route
   * 2. getCurrentDbUser: to fetch user data from dn
  */ 
  await requireAuth();
  const user = await getCurrentDbUser();

  /* Polar */ 
  const customer = await polarClient.customers.getStateExternal({
    externalId: user.id
  })
  const hasActivePolarSubscription = customer?.activeSubscriptions && customer.activeSubscriptions.length > 0
  console.log({ hasActivePolarSubscription, customer })

  /* RazorPay */ 
  const razorpayPlan = await getCurrentRazorpayStatus();
  console.log({ razorpayPlan })


  return (
    <main className="flex flex-col items-center justify-center px-4 py-12">
      <SuccessToast
        success={success === 'true'}
        canceled={canceled === 'true'}
      />

      {/* Payment Gateway Options: */}
      <Tabs defaultValue="stripe">
        <TabsList>
          <TabsTrigger value="stripe">Stripe🟣</TabsTrigger>
          <TabsTrigger value="polar">Polar🟢</TabsTrigger>
          <TabsTrigger value="razorpay">Razorpay🔵</TabsTrigger>
        </TabsList>
        <TabsContent value="stripe">
          <StripeComponent plan={user?.plan} />
        </TabsContent>
        <TabsContent value="polar">
          <PolarComponent isPro={hasActivePolarSubscription} />

        </TabsContent>
        <TabsContent value="razorpay">
          <RazorpayComponent currentPlan={razorpayPlan} />
        </TabsContent>
      </Tabs>
      <LogoutButton />
    </main>
  );
}
