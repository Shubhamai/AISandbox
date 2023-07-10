import { Panel } from "reactflow";

import { Container, WorkflowIcon } from "lucide-react";
import useAppState from "@/app/state/appState";
import DropDown from "./DropDown";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Header = ({
  projectName,
  projectId,
}: {
  projectName: string;
  projectId: string;
}) => {
  const { zenMode } = useAppState();
  const supabase = createClientComponentClient();

  return (
    <Panel
      position="top-center"
      className={`flex flex-row items-center justify-between w-screen pr-10 pl-1 ${
        zenMode ? "hidden" : ""
      }`}
      style={{ top: 0 }}
    >
      <div className="flex gap-2 items-center">
        <Link
          href={"/dashboard"}
          className="flex gap-1 p-2 items-center rounded-full shadow-lg select-none bg-background text-foreground hover:text-background hover:bg-foreground border border-foreground/20"
        >
          <Container />
        </Link>
        <div className="flex flex-col w-fit">
          <input
            className="text-md font-bold text-foreground italic !outline-none"
            defaultValue={projectName}
            onBlur={async (e) => {
              const { data, error } = await supabase
                .from("projects")
                .update({ name: e.target.value })
                .eq("id", projectId)
                .select();
            }}
          />
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <DropDown />
      </div>
    </Panel>
  );
};

export default Header;
