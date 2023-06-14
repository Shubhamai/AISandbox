import {
  Panel,
  getRectOfNodes,
  getTransformForBounds,
  useOnSelectionChange,
  useReactFlow,
} from "reactflow";
import { toPng } from "html-to-image";

import { WorkflowIcon } from "lucide-react";
import graphState from "@/app/state/graphState";
import useAppState from "@/app/state/appState";
import { Button } from "@/components/ui/button";
import { WaitlistDialogForm } from "./waitlist";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DropDown from "./DropDown";

const Header = () => {
  const { zenMode } = useAppState();

  return (
    <Panel
      position="top-center"
      className={`flex flex-row items-center justify-between w-screen pr-10 pl-4 ${
        zenMode ? "hidden" : ""
      }`}
      style={{ top: 0 }}
    >
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 bg-background pr-4 pl-2 py-2 items-center rounded-full shadow-lg">
          <WorkflowIcon />
          <h1 className="text-md font-bold text-foreground italic underline decoration-1 underline-offset-4 decoration-wavy decoration-foreground/50">
            AI Sandbox
          </h1>
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full shadow-lg bg-background p-3"
            >
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
                <WaitlistDialogForm />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <DropDown />
      </div>
    </Panel>
  );
};

export default Header;
