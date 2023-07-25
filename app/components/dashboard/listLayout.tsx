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

  return (

    <ProjectContext
      projectState={projectState}
      setProjectState={setProjectState}
      deleteProject={deleteProject}
      changeDashboardProjectState={changeDashboardProjectState}
    >
      <TableRow>
        <TableCell className="text-left">
          <div className="flex flex-row items-center gap-6">
            <Image
              className="rounded-xl border"
              unoptimized
              priority
              src={projectState.image}
              alt="Project Image"
              width={102}
              height={76}
            />
            {projectState.name}
          </div>
        </TableCell>
        <TableCell>{dayjs(projectState.updated_at).fromNow()}</TableCell>
        <TableCell>{dayjs(projectState.created_at).fromNow()}</TableCell>
      </TableRow>
    </ProjectContext>
  );
};

export default ListLayout;
