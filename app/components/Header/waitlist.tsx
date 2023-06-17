import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader, MailsIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export const WaitlistDialogForm = () => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isWaitlisted, setIsWaitlisted] = useLocalStorage("isWaitlisted", "");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { email } = e.target.elements;

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value }),
      });

      const resBody = await res.json();

      if (resBody.type === "success") {
        toast({
          title: "Success!",
          description: "You have been added to the waitlist.",
        });

        setOpen(false);
        setIsWaitlisted("true");
      } else {
        toast({
          title: "Error!",
          description: resBody.error,
        });
      }
    } catch (err) {
      toast({
        title: "Error!",
        description: "Failed to add you to the waitlist :(",
      });
    }

    setLoading(false);
  };

  if (isWaitlisted === "true") {
    return (
      <Button
        variant="secondary"
        className="rounded-full shadow-lg bg-background p-3 gap-1"
      >
        <MailsIcon className="w-4 h-4" />
        Waitlisted
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg p-3 gap-1">
          <MailsIcon className="w-4 h-4" />
          Join the Waitlist
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-5">
            <DialogTitle className="text-center text-3xl ">
              Join the Waitist
            </DialogTitle>
            <DialogDescription className="text-center">
              Be the first to know when we release beta <br />
              and get an early access
            </DialogDescription>
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
                Join
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
