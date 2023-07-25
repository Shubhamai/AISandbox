import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import Image from "next/image";
import { useState } from "react";
import ProjectContext from "./projectContext";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

dayjs.extend(relativeTime);

const ListLayout = ({
  project,
  deleteProject,
  changeDashboardProjectState,
}: {
  project: any;
  deleteProject: (id: string) => void;
  changeDashboardProjectState: (id: string, state: any) => void;
}) => {
  const [projectState, setProjectState] = useState<any>(project);
  const router = useRouter();

  return (
    <ProjectContext
      projectState={projectState}
      setProjectState={setProjectState}
      deleteProject={deleteProject}
      changeDashboardProjectState={changeDashboardProjectState}
    >
      <div
        onDoubleClick={() => router.push(`/project/${projectState.id}`)}
        className="grid grid-cols-[1fr_auto_150px] gap-x-1 hover:bg-foreground/5 rounded-xl"
      >
        <div className="my-2 flex flex-row items-center gap-6 text-left ">
          {projectState.favorite ? (
            <Star className="stroke-foreground/30 fill-foreground/20 ml-4" />
          ) : (
            <div className='ml-10'></div>
          )}
          <Image
            className="rounded-xl border"
            unoptimized
            priority
            src={projectState.image}
            alt="Project Image"
            width={102}
            height={76}
          />
          <input
            className="bg-transparent"
            value={projectState.name}
            onChange={(e) => {
              setProjectState({ ...projectState, name: e.target.value });
              changeDashboardProjectState(projectState.id, {
                name: e.target.value,
              });
            }}
          />
        </div>

        <p className="mt-8 text-left mr-16 overflow-visible">
          {dayjs(projectState.updated_at).fromNow()}
        </p>
        <p className="mt-8 text-left">
          {dayjs(projectState.created_at).fromNow()}
        </p>
      </div>
    </ProjectContext>
  );
};

export default ListLayout;
