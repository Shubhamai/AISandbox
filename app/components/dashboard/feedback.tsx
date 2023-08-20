import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { MessageSquarePlus } from "lucide-react";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const FeedbackDialogForm = () => {
  const onSubmit = async (formData: FormData) => {
    "use server";

    const feedback = formData.get("feedback");
    // const email = formData.get("email");

    const supabase = createServerActionClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }
    const { data, error } = await supabase
      .from("feedback")
      .insert([{ feedback: feedback, user_id: user.id, email: user.email }]);

    if (error) {
      return "error";
    } else {
      return "success";
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className="rounded-lg gap-2 bg-background"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Send Feedback
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-5">
            <DialogTitle className="text-center text-3xl ">
              Feedback
            </DialogTitle>
            <DialogDescription className="text-center">
              Want to give us feedback or feature request? Let us know!
            </DialogDescription>
            <form action={onSubmit} className="flex flex-col gap-5">
              {/* onSubmit={onSubmit} */}
              <div className="flex flex-col gap-2">
                <Label>Feedback</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Hi! I would like to see..."
                  required
                />
              </div>
              {/* <div className="flex flex-col gap-2">
                <Label> Email Address (optional)</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div> */}
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
