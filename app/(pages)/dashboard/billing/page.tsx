"use client";

import { Button } from "@/app/components/ui/button";
import stripe from "@/app/lib/stripe/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InvoicesDataTable } from "./data-table";

const Billing = () => {
  const router = useRouter();
  const [isBillingActive, setIsBillingActive] = useState<boolean | null>(null);
  // const [userDetails, setUserDetails] = useState<null | any>(null);
  const [invoices, setInvoices] = useState<null | any>(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    (async () => {
      let { data: users, error } = await supabase
        .from("users")
        .select("user_id,active")
        .single();

      if (users?.active === false) {
        setIsBillingActive(false);
        // setUserDetails(users);

        const response = await fetch("/api/billing/invoices", {
          method: "POST",
        });

        const data = await response.json();

        setInvoices(data.data);
      }
      if (users?.active) {
        setIsBillingActive(true);
        // setUserDetails(users);

        const response = await fetch("/api/billing/invoices", {
          method: "POST",
        });

        const data = await response.json();

        setInvoices(data.data);
      }
    })();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Billing</h1>
        <h4 className="text-foreground/50 text-sm">
          Manage your billing information. You will be charged at the end of the
          calendar month according to your usage.
        </h4>
      </div>
      <div className="w-[800px]">
        {isBillingActive === null ? (
          <Button
            onClick={async () => {
              const response = await fetch("/api/billing/enable", {
                method: "POST",
              });

              const data = await response.json();

              if (data.type === "error") {
                console.log(data.message);
              } else {
                // console.log(data.data);
                router.push(data.data);
              }
            }}
          >
            <div>Enter Billing Information</div>
          </Button>
        ) : (
          <Button
            onClick={async () => {
              const response = await fetch("/api/billing/manage", {
                method: "POST",
              });

              const data = await response.json();

              if (data.type === "error") {
                console.log(data.message);
              } else {
                // console.log(data.data);
                router.push(data.data);
              }
            }}
          >
            {/* TODO : Maybe a bad code */}
            {isBillingActive === false ? <div>Re-enable Billing</div> : <></>}
            {isBillingActive === true ? <div>Manage Billing</div> : <></>}
          </Button>
        )}
        {invoices ? <InvoicesDataTable data={invoices} /> : <></>}
      </div>
    </div>
  );
};

export default Billing;
