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
import ProjectContext from "./projectContext";

dayjs.extend(relativeTime);

const ProjectCard = ({
  project,
  deleteProject,
  changeDashboardProjectState,
}: {
  project: any;
  deleteProject: (id: string) => void;
  changeDashboardProjectState: (id: string, state: any) => void;
}) => {
  const router = useRouter();
  const [projectState, setProjectState] = useState<any>(project);

  return (
    <ProjectContext
      projectState={projectState}
      setProjectState={setProjectState}
      deleteProject={deleteProject}
      changeDashboardProjectState={changeDashboardProjectState}
    >
      <Card
        key={projectState.id}
        className="border-none shadow-none"
        onDoubleClick={() => router.push(`/project/${projectState.id}`)}
      >
        <CardContent className="p-0 relative">
          {/* Same aspect ratio as when saving image */}
          <div className="className='focus:outline-none focus:ring focus:ring-violet-300'">
            <AspectRatio ratio={1024 / 768}>
              <Image
                className="rounded-xl border hover:shadow-xl transition-shadow"
                src={project.image}
                alt="Project Image"
                fill
              />
            </AspectRatio>
            {projectState.favorite ? (
              <Star className="absolute top-2 right-2 stroke-foreground/30 fill-foreground/20" />
            ) : (
              <></>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1 items-start p-2">
          <input
            className="bg-transparent"
            value={projectState.name}
            onChange={(e) => {
              setProjectState({ ...projectState, name: e.target.value });
              changeDashboardProjectState(project.id, { name: e.target.value });
            }}
          />
          <p className="text-xs text-foreground/50">
            {dayjs(projectState.updated_at).fromNow()}
          </p>
        </CardFooter>
      </Card>
    </ProjectContext>
  );
};

export default ProjectCard;
