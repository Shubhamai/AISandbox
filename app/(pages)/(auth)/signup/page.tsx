"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast, useToast } from "@/app/components/ui/use-toast";
import { Loader } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isPasswordNull, setIsPasswordNull] = useState(true);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    // setLoading(true);

    // const email = e.target.email.value;
    // const name = e.target.name.value;

    // await supabase.auth.signInWithOtp({
    //   email,
    //   options: {
    //     emailRedirectTo: `${location.origin}/auth/callback`,
    //   },
    // });

    // setLoading(false);

    // router.push("/dashboard");
    // router.refresh();
  };
  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-6">
          <div>
            <Label>Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              type="text"
              required
            />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>
          <div>
            <Label>Password (optional)</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => {
                setIsPasswordNull(e.target.value === "");
              }}
            />
          </div>
          <Button type={"submit"} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : <></>}
            {isPasswordNull ? "Send magic link" : "Sign up"}
          </Button>
        </div>
      </form>
    </div>
  );
}
