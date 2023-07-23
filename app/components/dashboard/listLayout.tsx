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

dayjs.extend(relativeTime);

const ListLayout = ({ projects }: { projects: any }) => {
  // TODO : Dialog and ContextMenu just like in projectCard.tsx
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead>Last Modified</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project: any) => (
          <TableRow>
            <TableCell className="text-left">
              <div className="flex flex-row items-center gap-6">
                {/* <AspectRatio ratio={1024 / 768} className="w-20 h-24"> */}
                <Image
                  className="rounded-xl border"
                  unoptimized
                  priority
                  src={project.image}
                  alt="Project Image"
                  // fill
                  width={102}
                  height={76}
                />
                {/* </AspectRatio> */}
                {project.name}
              </div>
            </TableCell>
            <TableCell>{dayjs(project.updated_at).fromNow()}</TableCell>
            <TableCell>{dayjs(project.created_at).fromNow()}</TableCell>
            {/* <TableCell className="text-right">$250.00</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListLayout;
