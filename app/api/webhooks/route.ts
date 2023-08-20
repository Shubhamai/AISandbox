import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "customer.subscription.created":
          const subscriptionCreatedData = event.data
            .object as Stripe.Subscription;

          const stripeCustomer = await stripe.customers.retrieve(
            subscriptionCreatedData.customer as string
          );

          const { data: activatCustomer, error: activatCustomerError } =
            await supabaseAdmin
              .from("users")
              .update({
                active: true,
                itemId: subscriptionCreatedData.items.data[0].id,
              })
              .eq(
                "stripe_customer_id",
                subscriptionCreatedData.customer as string
              )
              .select();

          break;
        case "customer.subscription.updated":
          const subscriptionUpdatedData = event.data
            .object as Stripe.Subscription;
          console.log(subscriptionUpdatedData.status);
          // set active to true if the subscription is renewed
          if (subscriptionUpdatedData.status === "active") {
            const { data: activatCustomer, error: activatCustomerError } =
              await supabaseAdmin
                .from("users")
                .update({ active: true })
                .eq(
                  "stripe_customer_id",
                  subscriptionUpdatedData.customer as string
                )
                .select();
          } else if (
            subscriptionUpdatedData.cancel_at
            // ||
            // subscriptionUpdatedData.status === "past_due" ||
            // subscriptionUpdatedData.status === "unpaid" ||
            // subscriptionUpdatedData.status === "incomplete" ||
            // subscriptionUpdatedData.status === "incomplete_expired"
          ) {
            // TODO : Perhaps an email or status in dashboard to notify the user that their subscription is not active
            const { data: deactivatCustomer, error: deactivatCustomerError } =
              await supabaseAdmin
                .from("users")
                .update({ active: false })
                .eq(
                  "stripe_customer_id",
                  subscriptionUpdatedData.customer as string
                )
                .select();
          }

        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription;

          const { data: deactivatCustomer, error: deactivatCustomerError } =
            await supabaseAdmin
              .from("users")
              .update({ active: false })
              .eq("stripe_customer_id", subscription.customer as string)
              .select();

          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            // await manageSubscriptionStatusChange(
            //   subscriptionId as string,
            //   checkoutSession.customer as string,
            //   true
            // );
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response(
        "Webhook handler failed. View your nextjs function logs.",
        {
          status: 400,
        }
      );
    }
  }
  return new Response(JSON.stringify({ received: true }));
}
