"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast, useToast } from "@/app/components/ui/use-toast";
import { ChevronLeft, Loader } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isPasswordNull, setIsPasswordNull] = useState(true);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    if (isPasswordNull) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Magic Link Sent",
          description: "Your magic link has been sent to your email",
        });
      }

      // router.push("/dashboard");
      // router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please confirm your email to continue",
        });

        router.push("/login");
        router.refresh();
      }
    }

    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-10 items-center justify-center mx-auto min-h-screen w-[400px]">
      <Link
        href={"/"}
        className="absolute left-8 top-12 rounded-full flex flex-row text-sm text-foreground/80 items-center gap-1"
      >
        <ChevronLeft size={16} /> <div>Home</div>
      </Link>
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-2xl font-bold text-left w-full">Get started</h1>
        <h4 className="text-left">
          Already have an account ?{" "}
          <Link className="font-semibold underline" href="/login">
            Log In
          </Link>
        </h4>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-6">
            {/* <div className="flex flex-col gap-2">
              <Label className="text-foreground/70">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                type="text"
                required
              />
            </div> */}
            <div className="flex flex-col gap-2">
              <Label className="text-foreground/70">Email Address</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground/70">Password (optional)</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => {
                  setIsPasswordNull(e.target.value === "");
                }}
              />
            </div>
            <Button
              type={"submit"}
              disabled={loading}
              className="flex flex-row items-center justify-center gap-3"
            >
              <div>{loading ? <Loader className="animate-spin" /> : <></>}</div>
              <div>{isPasswordNull ? "Send magic link" : "Sign up"}</div>
              <div>{<></>}</div>
            </Button>
          </div>
        </form>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          {/* <Button variant={"secondary"} className="rounded-md w-full">
          Continue with Google
        </Button> */}
          <div className="flex flex-row items-center gap-2 w-full">
            <Separator className="flex-1" />
            <div className="text-xs">OR</div>
            <Separator className="flex-1" />
          </div>
          <Button
            variant={"secondary"}
            className="flex flex-row items-center gap-3 rounded-md w-full"
          >
            <Image
              src="/assets/github-mark.png"
              width={20}
              height={20}
              alt="GitHub Logo"
            />{" "}
            <div>Continue with GitHub</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
