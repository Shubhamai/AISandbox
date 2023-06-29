"use client";

import { useAuthContext } from "@/app/context/Auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <div className="grid grid-cols-4 gap-4">
      <section>Account Information</section>
    </div>
  );
}
