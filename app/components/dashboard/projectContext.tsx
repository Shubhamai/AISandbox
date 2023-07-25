import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { Star } from "lucide-react";
import { AspectRatio } from "@/app/components/ui/aspect-ratio";

dayjs.extend(relativeTime);

const ProjectContext = ({
  children,
  //   project,
  projectState,
  setProjectState,
  deleteProject,
  changeDashboardProjectState,
}: {
  children: any;
  projectState: any;
  setProjectState: any;
  deleteProject: (id: string) => void;
  changeDashboardProjectState: (id: string, state: any) => void;
}) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
//   const [projectState, setProjectState] = useState<any>(project);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger className="">
          
            {/* <CardContent className="p-0 relative">{children}</CardContent> */}
            {children}
          {/* </Card> */}
        </ContextMenuTrigger>
        <ContextMenuContent
          className="w-50"
          onFocusOutside={(e) => {
            e.preventDefault();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <ContextMenuItem
            onClick={() => {
              router.push(`/project/${projectState.id}`);
            }}
            inset
          >
            Open
          </ContextMenuItem>
          <ContextMenuItem inset>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={`/project/${projectState.id}`}
            >
              Open in New Tab
            </Link>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            onClick={async () => {
              const { data, error } = await supabase
                .from("projects")
                .update({ favorite: !projectState.favorite })
                .eq("id", projectState.id);
              if (error) {
                toast({
                  title: "Error",
                  description: error.message,
                });
              } else {
                setProjectState({
                  ...projectState,
                  favorite: !projectState.favorite,
                });
                changeDashboardProjectState(projectState.id, {
                  favorite: !projectState.favorite,
                });
              }
            }}
            checked={projectState.favorite}
          >
            Add to your Favorites
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={async () => {
              // TODO : Generate link more dynamically
              await navigator.clipboard.writeText(
                `https://aisandbox.com/project/${projectState.id}`
              );
            }}
            inset
          >
            Copy Link
          </ContextMenuItem>
          <ContextMenuItem
            inset
            onClick={async () => {
              const {
                data: { session },
              } = await supabase.auth.getSession();
              if (!session) {
                toast({
                  title: "Unauthorized",
                  description:
                    "You need to be logged in to duplicate a project",
                });
                return;
              }

              // TODO : Generate duplicate more dynamically
              const { data, error } = await supabase
                .from("projects")
                .insert([
                  {
                    data: projectState.data,
                    user_id: projectState.user_id,
                    name: `${projectState.name} (Copy)`,
                  },
                ])
                .select();

              if (error) {
                toast({
                  title: "Error",
                  description: error.message,
                });
              } else {
                await supabase.storage
                  .from("projects")
                  .copy(
                    `${session?.user.id}/${projectState.id}.jpeg`,
                    `${session?.user.id}/${data[0].id}.jpeg`
                  );

                toast({
                  title: "Success",
                  description: "Project duplicated successfully",
                });
                router.push(`/project/${data[0].id}`);
              }
            }}
          >
            Duplicate
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            inset
            onClick={async () => {
              console.log("rename");
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            Rename
          </ContextMenuItem>
          <DialogTrigger asChild>
            <ContextMenuItem inset>Delete</ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-4">
            Are you sure absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this project?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form
            action={async () => {
              await deleteProject(projectState.id);
            }}
            className="flex flex-col gap-5"
          >
            <DialogClose asChild>
              <Button type="submit">Confirm</Button>
            </DialogClose>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectContext;
