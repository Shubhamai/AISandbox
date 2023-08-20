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
      .select("stripe_customer_id")
      .eq("user_id", user?.id)
      .single();

  if (
    getInitialBillingDataError &&
    getInitialBillingDataError?.code !== "PGRST116"
  ) {
    // code PGRST116 means no rows returned, if it's not that, then it's an database error
    return NextResponse.json(
      Response.Error(getInitialBillingDataError?.message as string)
    );
  }

  if (initialBillingData?.stripe_customer_id) {
    const invoices = await stripe.invoices.list({
      customer: initialBillingData.stripe_customer_id,
    });

    const processedInvoices = invoices.data.map((invoice) => {
      return {
        id: invoice.id,
        url: invoice.hosted_invoice_url,
        status: invoice.status,
        amount: invoice.total,
        billing_period: `${dayjs
          .unix(invoice.period_start)
          .format("MMM DD, YYYY")} - ${dayjs
          .unix(invoice.period_end)
          .format("MMM DD, YYYY")}`,
      };
    });

    console.log(processedInvoices);

    return NextResponse.json(Response.Success(processedInvoices));
  } else {
    return NextResponse.json(Response.Error("No customer found"));
  }
}
