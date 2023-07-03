"use client";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export default function Profile() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    const getProjects = async () => {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("*");

      setProjects(projects);
    };

    getProjects();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {projects.map((project: any) => (
        <Card
          key={project.id}
          className="border-none shadow-none"
          onDoubleClick={() => router.push(`/project/${project.id}`)}
        >
          <CardContent className="p-0">
            <Image
              className="rounded-xl"
              src={"/assets/image.jpg"}
              alt="black image"
              width={300}
              height={170}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-1 items-start p-2">
            <p>{project.name}</p>
            <p className="text-xs text-foreground/50">
              {dayjs(project.updated_at).fromNow()}
            </p>
          </CardFooter>
        </Card>
      ))}
      {/*<Card className="border-none shadow-none">
         <CardContent className="p-0">
          <Image
            className="rounded-xl"
            src={"/assets/image.jpg"}
            alt="black image"
            width={300}
            height={170}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-1 items-start p-2">
          <p>Untitled</p>
          <p className="text-xs text-foreground/50">Edited 4 hours ago</p>
        </CardFooter>
      </Card> */}
    </div>
  );
}
