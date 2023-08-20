"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import {
  createServerComponentClient,
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { toast, useToast } from "@/app/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export const runtime = "edge";

export default function Profile() {
  // TODO : Export Data

  const [user, setUser] = useState<User | null>(null);
  const [deletionInProgress, setDeletionInProgress] = useState(false);

  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        router.push("/login");
      }
    };
    getUser();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Account Information</h1>
        <h4 className="text-foreground/50 text-sm">
          Manage your account information.
        </h4>
      </div>
      <div className="w-[800px]">
        <div className="flex flex-row justify-between gap-28 items-center">
          Email
          <Input value={user?.email} readOnly />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-40 mt-10">Delete Account</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="submit"
                onClick={async () => {
                  setDeletionInProgress(true);

                  const response = await fetch("/api/deleteAccount", {
                    method: "DELETE",
                  });

                  const responseJson = await response.json();

                  if (responseJson.type === "success") {
                    toast({
                      title: "Success",
                      description: "Account deleted successfully",
                    });
                    router.push("/");
                  } else {
                    toast({
                      title: "Error",
                      description: responseJson.message,
                    });
                  }
                }}
              >
                {!deletionInProgress ? (
                  "Delete Account"
                ) : (
                  <Loader className="animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
