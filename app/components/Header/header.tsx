import { Panel } from "reactflow";

import { WorkflowIcon } from "lucide-react";
import useAppState from "@/app/state/appState";
import { WaitlistDialogForm } from "./waitlist";
import DropDown from "./DropDown";
import { FeedbackDialogForm } from "./feedback";
import { Profile } from "./profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  const { zenMode } = useAppState();

  return (
    <Panel
      position="top-center"
      className={`flex flex-row items-center justify-between w-screen pr-10 pl-1 ${
        zenMode ? "hidden" : ""
      }`}
      style={{ top: 0 }}
    >
      <div className="flex gap-2 items-center">
        <Button className="flex gap-1 p-2 items-center rounded-full shadow-lg select-none bg-background text-foreground hover:text-background hover:bg-foreground border border-foreground/20">
          <Link href="/dashboard">
            <WorkflowIcon />
          </Link>
        </Button>
        <h1 className="text-md font-bold text-foreground italic underline decoration-1 underline-offset-4 decoration-wavy decoration-foreground/50 select-text">
          Untitled
        </h1>
      </div>
      <div className="flex flex-row items-center gap-5">
        {/* <WaitlistDialogForm /> */}

        <DropDown />
      </div>
    </Panel>
  );
};

export default Header;
