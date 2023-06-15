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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const FeedbackDialogForm = () => {
  const { toast } = useToast();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const { feedback, email } = e.target.elements;

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback: feedback.value, email : email.value }),
    });

    const resBody = await res.json();

    if (resBody.type === "success") {
      toast({
        title: "Success!",
        description: "Your feedback has been received. Thank you :)",
      });
    } else {
      toast({
        title: "Error!",
        description: resBody.error,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full shadow-lg bg-background p-3"
        >
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
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label>Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Hi! I would like to see..."
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label> Email Address (optional)</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
