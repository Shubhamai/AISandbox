import { Input } from "@/app/components/ui/input";

import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>No User Found</div>;
  }

  return (
    <div className="flex flex-col gap-10 w-[600px]">
      <section>Account Information</section>
      <div className="flex flex-row justify-between gap-28 items-center">
        Email
        <Input value={user?.email} readOnly />
      </div>
    </div>
  );
}
