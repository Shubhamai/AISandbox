"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/app/components/ui/use-toast";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const onSignOutClick = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      router.push("/");
    }
  };
  return (
    <Button
      variant={"link"}
      onClick={onSignOutClick}
      className="flex flex-row justify-start px-5 py-4 items-start gap-4"
    >
      <LogOut className="w-4 h-4" /> <span>Logout</span>
    </Button>
  );
};

export default SignOut;
