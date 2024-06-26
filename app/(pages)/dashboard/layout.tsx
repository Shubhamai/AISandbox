import { ArrowUpRight, LogOut } from "lucide-react";
import Link from "next/link";
import {
  createClientComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateProjectButton from "@/app/components/dashboard/createProject";
import { Separator } from "@/app/components/ui/separator";
import SignOut from "@/app/components/dashboard/signout";

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
    <div className="grid grid-cols-[220px_1fr] grid-rows-[50px_1fr] h-full w-full border border-background py-4">
      <Link href={"/"} className="px-4 font-extrabold text-xl border-b">
        AISandbox
      </Link>
      <div className="pr-4 flex flex-col items-end border-b">
        {/* <FeedbackDialogForm /> */}
        <CreateProjectButton />
      </div>
      <div className="flex flex-col items-stretch border-r">
        <section className="pl-4 py-2 flex flex-col gap-2">
          <h4 className="text-foreground/50 text-sm">Dashboard</h4>
          <Link className="px-2 text-base" href="/dashboard">
            Projects
          </Link>
          <Link className="px-2 text-base" href="/dashboard/usage">
            Usage
          </Link>
        </section>
        <Separator className="" />
        <section className="pl-4 py-2 flex flex-col gap-2">
          <h4 className="text-foreground/50 text-sm">Account</h4>
          <Link className="px-2 text-base" href="/dashboard/profile">
            Profile
          </Link>
          <Link className="px-2 text-base" href="/dashboard/apikeys">
            API Keys
          </Link>
        </section>
        <Separator className="" />
        <section className="pl-4 py-2 flex flex-col gap-2">
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="text-base flex flex-row items-center gap-2"
            href="https://github.com/shubhamai/aisandbox"
          >
            <ArrowUpRight className="text-foreground/50" size={21} />{" "}
            GitHub
          </Link>
        
        </section>
        <Separator className="" />
        <SignOut />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
