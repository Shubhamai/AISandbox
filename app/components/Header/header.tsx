import { Panel } from "reactflow";

import { WorkflowIcon } from "lucide-react";
import useAppState from "@/app/state/appState";
import { WaitlistDialogForm } from "./waitlist";
import DropDown from "./DropDown";
import { FeedbackDialogForm } from "./feedback";
import { Profile } from "./profile";
import { useUuid } from "@/app/hooks/useUuid";

const Header = () => {
  const { zenMode } = useAppState();

  useUuid();

  return (
    <Panel
      position="top-center"
      className={`flex flex-row items-center justify-between w-screen pr-10 pl-4 ${
        zenMode ? "hidden" : ""
      }`}
      style={{ top: 0 }}
    >
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 bg-background pr-4 pl-2 py-2 items-center rounded-full shadow-lg select-none">
          <WorkflowIcon />
          <h1 className="text-md font-bold text-foreground italic underline decoration-1 underline-offset-4 decoration-wavy decoration-foreground/50">
            AI Sandbox
          </h1>
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <FeedbackDialogForm />
        <WaitlistDialogForm />
        <Profile />

        <DropDown />
      </div>
    </Panel>
  );
};

export default Header;
