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

const ProjectCard = ({
  project,
  deleteProject,
}: {
  project: any;
  deleteProject: (id: string) => void;
}) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const [name, setName] = useState<string>(project.name);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      {/* open={dialogOpen} */}
      <ContextMenu>
        <ContextMenuTrigger>
          <Card
            key={project.id}
            className="border-none shadow-none"
            onDoubleClick={() => router.push(`/project/${project.id}`)}
          >
            <CardContent className="p-0 relative">
              {project.favorite ? (
                <Star className="absolute top-2 right-2 stroke-foreground/20 fill-foreground/20" />
              ) : (
                <></>
              )}
              {/* Same aspect ratio as when saving image */}
              <div className="className='focus:outline-none focus:ring focus:ring-violet-300'">
                <AspectRatio ratio={1024 / 768}>
                  <Image
                    className="rounded-xl border hover:shadow-xl transition-shadow"
                    // unoptimized
                    // priority
                    // "https://vmtqbrqycbywyeaocjan.supabase.co/storage/v1/object/sign/projects/b270c68b-5ae0-484c-bb3d-8e6297ed26e7/5e9434fe-8c36-4bae-90cb-5f2df13496c7.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0cy9iMjcwYzY4Yi01YWUwLTQ4NGMtYmIzZC04ZTYyOTdlZDI2ZTcvNWU5NDM0ZmUtOGMzNi00YmFlLTkwY2ItNWYyZGYxMzQ5NmM3LmpwZWciLCJpYXQiOjE2OTAwODc1NjEsImV4cCI6MTY5MDY5MjM2MX0.2-l7yvKFcUAQK7eg8cAi4bh9j1vXKj-bpw8M9Kj-_nE&t=2023-07-23T04%3A46%3A01.908Z"
                    src={project.image}
                    alt="Project Image"
                    fill
                    // width={1024 / 2}
                    // height={768 / 2}
                  />
                </AspectRatio>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-1 items-start p-2">
              <input
                ref={inputRef}
                className="bg-transparent"
                // focus:outline-none
                value={name}
                // onFocus={() => {
                //   console.log("focus");
                // }}

                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <p className="text-xs text-foreground/50">
                {dayjs(project.updated_at).fromNow()}
              </p>
            </CardFooter>
          </Card>
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
              router.push(`/project/${project.id}`);
            }}
            inset
          >
            Open
          </ContextMenuItem>
          <ContextMenuItem inset>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={`/project/${project.id}`}
            >
              Open in New Tab
            </Link>
          </ContextMenuItem>
          <ContextMenuSeparator />
          {/* TODO : Add to favorites */}
          <ContextMenuCheckboxItem
            onClick={async () => {
              const { data, error } = await supabase
                .from("projects")
                .update({ favorite: !project.favorite })
                .eq("id", project.id);
              if (error) {
                toast({
                  title: "Error",
                  description: error.message,
                });
              } else {
                project.favorite = !project.favorite;
              }
            }}
            checked={project.favorite}
          >
            Add to your Favorites
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={async () => {
              // TODO : Generate link more dynamically
              await navigator.clipboard.writeText(
                `https://aisandbox.com/project/${project.id}`
              );
            }}
            inset
          >
            Copy Link
          </ContextMenuItem>
          {/* <ContextMenuItem inset> TODO : [Share functionality] Share</ContextMenuItem> */}
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
                    data: project.data,
                    user_id: project.user_id,
                    name: `${project.name} (Copy)`,
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
                    `${session?.user.id}/${project.id}.jpeg`,
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
              await deleteProject(project.id);
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

export default ProjectCard;
