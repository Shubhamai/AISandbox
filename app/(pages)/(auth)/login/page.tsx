"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast, useToast } from "@/app/components/ui/use-toast";
import { ChevronLeft, Cross, Loader } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/app/components/ui/separator";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isPasswordNull, setIsPasswordNull] = useState(true);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (isPasswordNull) {
      const { data, error } = await supabase.auth.signInWithOtp({
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
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        router.push("/dashboard");
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
        <h1 className="text-2xl font-bold text-left w-full">Welcome back</h1>
        <h4 className="text-left">
          Don&apos;t have an account?{" "}
          <Link className="font-semibold underline" href="/signup">
            Sign Up
          </Link>
        </h4>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-6">
            {/* <div className="flex flex-col gap-2">
            <Label>Name</Label>
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
              <div className="flex flex-row justify-between">
                <Label className="text-foreground/70">
                  Password (optional)
                </Label>
                <Label>Forgot Password</Label>
              </div>
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
