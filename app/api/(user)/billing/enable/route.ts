import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/app/utils/response";
import Stripe from "stripe";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import dayjs from "dayjs";

export const runtime = "edge";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

export async function POST(request: NextRequest) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json(Response.Error("No user found"));

  let { data: initialBillingData, error: getInitialBillingDataError } =
    await supabaseAdmin
      .from("users")
      .select("stripe_customer_id,active")
      .eq("user_id", user?.id)
      .single();

  // If there's an error, and it's not because there's no rows returned, then return an error
  if (
    getInitialBillingDataError &&
    getInitialBillingDataError?.code !== "PGRST116"
  ) {
    // code PGRST116 means no rows returned, if it's not that, then it's an database error
    return NextResponse.json(
      Response.Error(getInitialBillingDataError?.message as string)
    );
  }

  // If it's not null, and it's active, then return an error
  if (initialBillingData?.active === true) {
    return NextResponse.json(
      Response.Error("You already have an active subscription")
    );
  }

  if (initialBillingData?.active === false) {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: initialBillingData?.stripe_customer_id,
      billing_address_collection: "auto",
      line_items: [
        {
          price: "price_1NeFiZSCfWy5XgBjlDll8cB0", // TODO : Probably is better to get this from the database, or environment variable
        },
      ],
      // subscription_data: {
      //   billing_cycle_anchor: dayjs().add(1, "month").unix(),
      // },
      success_url:
        "http://localhost:3000/dashboard/billing?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/dashboard/billing",
    });

    return NextResponse.json(Response.Success(session.url));
  }

  // If it's null, then create a new customer and subscription
  if (initialBillingData === null) {
    const customer = await stripe.customers.create({
      email: user?.email,
      metadata: {
        user_id: user?.id,
      },
    });

    const { data: supabaseCustomer, error: supabaseError } = await supabaseAdmin
      .from("users")
      .insert([
        {
          user_id: user?.id,
          stripe_customer_id: customer.id,
        },
      ])
      .select();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customer.id,
      billing_address_collection: "auto",
      line_items: [
        {
          price: "price_1NeFiZSCfWy5XgBjlDll8cB0", // TODO : Probably is better to get this from the database, or environment variable
        },
      ],
      // subscription_data: {
      //   billing_cycle_anchor: dayjs().add(1, "month").unix(),
      // },
      success_url:
        "http://localhost:3000/dashboard/billing?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/dashboard/billing",
    });

    return NextResponse.json(Response.Success(session.url));
  }
}
