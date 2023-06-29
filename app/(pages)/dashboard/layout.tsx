"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import supabase from "@/lib/supabaseClient";
import { LogOut } from "lucide-react";
import { FeedbackDialogForm } from "@/app/components/Header/feedback";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const onSignOutClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="grid grid-cols-[220px_1fr] grid-rows-[50px_1fr] p-4 h-full w-full border border-background">
      <Link href={"/dashboard"} className="p-1 font-extrabold text-xl border-b">
        Dashboard
      </Link>
      <div className="flex flex-col items-end border-b">
        <FeedbackDialogForm />
      </div>
      <div className="p-2 flex flex-col items-start gap-8 border-r">
        <section className="flex flex-col gap-3">
          <h4 className="text-foreground/50 text-sm">Account</h4>
          <Link href="/dashboard/profile">Profile</Link>
        </section>
        <Button
          variant={"link"}
          onClick={onSignOutClick}
          className="flex flex-row gap-4"
        >
          <LogOut className="w-4 h-4" /> <span>Logout</span>
        </Button>
      </div>
      <div className="p-4">{children}</div>

    </div>
  );
}
