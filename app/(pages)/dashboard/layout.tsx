import { Button } from "@/app/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { FeedbackDialogForm } from "@/app/components/dashboard/feedback";
import {
  createClientComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateProjectButton from "@/app/components/dashboard/createProject";
import { Separator } from "@/app/components/ui/separator";

export const runtime = "edge";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const onSignOutClick = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <div className="grid grid-cols-[220px_1fr] grid-rows-[50px_1fr] p-4 h-full w-full border border-background">
      <Link href={"/"} className="p-1 font-extrabold text-xl border-b">
        AISandbox
      </Link>
      <div className="flex flex-col items-end border-b">
        {/* <FeedbackDialogForm /> */}
        <CreateProjectButton />
      </div>
      <div className="p-2 flex flex-col items-start gap-3 border-r">
        <section className="flex flex-col gap-2">
          <h4 className="text-foreground/50 text-sm">Dashboard</h4>
          <Link className="text-base" href="/dashboard">
            Projects
          </Link>
        </section>
        <Separator className="" />
        <section className="flex flex-col gap-2">
          <h4 className="text-foreground/50 text-sm">Account</h4>
          <Link className="text-base" href="/dashboard/profile">
            Profile
          </Link>
          <Link className="text-base" href="/dashboard/apikeys">
            API Keys
          </Link>
        </section>
        <Button
          variant={"link"}
          onClick={onSignOutClick}
          className="flex flex-row gap-4 p-0"
        >
          <LogOut className="w-4 h-4" /> <span>Logout</span>
        </Button>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
