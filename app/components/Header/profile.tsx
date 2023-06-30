import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { User as UserIcon, WorkflowIcon } from "lucide-react";
import supabase from "@/lib/supabaseClient";

import { User } from "@supabase/supabase-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader, LogInIcon, MailsIcon } from "lucide-react";
import { useAuthContext } from "@/app/context/Auth";
import Link from "next/link";

export const Profile = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <MagicLinkLogin />;
  }

  return (
    <Link
      href={"/dashboard"}
      className="flex gap-1 p-2 items-center rounded-full shadow-lg select-none bg-background text-foreground hover:text-background hover:bg-foreground border border-foreground/20"
    >
      <WorkflowIcon />
    </Link>
  );
};

const MagicLinkLogin = () => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordNull, setIsPasswordNull] = useState(true);
  const { user } = useAuthContext();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { email } = e.target.elements;

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value }),
      });

      const resBody = await res.json();

      if (resBody.type === "success") {
        toast({
          title: "Check you email!",
          description: "We have sent an email for sign in :)",
        });

        setOpen(false);
      } else {
        toast({
          title: "Error!",
          description: resBody.error,
        });
      }
    } catch (err) {
      console.log("err", err);

      toast({
        title: "Error!",
        description: "Failed to login :(",
      });
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-1 p-2 items-center rounded-full shadow-lg select-none bg-background text-foreground hover:text-background hover:bg-foreground border border-foreground/20">
          <WorkflowIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-3xl">
          Let&apos;s make something amazing
        </DialogTitle>
        <DialogDescription className="mb-6">
          Enter your email below to {
            isPasswordNull ? "receive a magic link" : "sign up"
          }!
        </DialogDescription>

        <DialogHeader>
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
                  {loading ? <Loader className="animate-spin" /> : null}
                  {isPasswordNull ? "Send magic link" : "Sign up"}
                </Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
