"use client";

import { useAuthContext } from "@/app/context/Auth";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-10 w-[600px]">
      <section>Account Information</section>
      <div className="flex flex-row justify-between gap-28 items-center">
        Email
        <Input value={user?.email} className="" />
      </div>
    </div>
  );
}
