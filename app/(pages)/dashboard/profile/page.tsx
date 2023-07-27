import { Input } from "@/app/components/ui/input";

import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = "edge";

export default async function Profile() {

  // TODO : Delete account

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session) {
    return <div>No User Found</div>;
  }

  return (
    <div className="flex flex-col gap-10 w-[600px] p-6">
      <section className="text-lg font-semibold">Account Information</section>
      <div className="flex flex-row justify-between gap-28 items-center">
        Email
        <Input value={session.user.email} readOnly />
      </div>
    </div>
  );
}
