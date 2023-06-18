import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";
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
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export const Profile = () => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase.auth.getUser();
    setProfile(data.user);
  };

  if (!profile) {
    return <MagicLinkLogin />;
  }

  return (
    <Button
      variant="secondary"
      className="rounded-full bg-background shadow-lg p-3 gap-1"
    >
      <UserIcon className="w-5 h-5" />
    </Button>
  );
};

export const MagicLinkLogin = () => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isSignedIn, setIsSignedIn] = useLocalStorage("isSignedIn", "");

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
        // setIsSignedIn("true");
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

  const onSignoutClick = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();
    console.log("error", error);

    if (error) {
      toast({
        title: "Error!",
        description: "Failed to sign out :(",
      });
    } else {
      setIsSignedIn("false");
      window.location.reload();
    }

    setLoading(false);
  };

  if (isSignedIn === "true") {
    return (
      <Button
        variant="secondary"
        className="rounded-full shadow-lg bg-background p-3 gap-1"
        onClick={onSignoutClick}
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <MailsIcon className="w-4 h-4" />
        )}
        Sign Out
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg p-3 gap-1">
          <LogInIcon className="w-4 h-4" />
          Login
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-3xl">
          Let&apos;s make something amazing
        </DialogTitle>
        <DialogDescription className="mb-6">
          Enter your email below to receive a magic sign-in link.
        </DialogDescription>

        <DialogHeader>
          <div className="flex flex-col gap-5">
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Email Address</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>

              <Button type={"submit"} disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : null}
                Continue
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
