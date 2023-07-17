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
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import CreateProjectButton from "@/app/components/dashboard/createProject";

dayjs.extend(relativeTime);

export default function Profile() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [projects, setProjects] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getProjects = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        console.log("no session");
      } else {
        let { data: projects, error } = await supabase
          .from("projects")
          .select("*");
        if (!projects) {
          console.log(error);
        } else {
          for (let project of projects) {
            project.image = await getImageUrl(session, project);
          }
          setProjects(projects);
          setLoading(false);
        }
      }
    };

    getProjects();
  }, []);

  const getImageUrl = async (session: Session, project: any) => {
    const { data } = await supabase.storage
      .from("projects")
      .createSignedUrl(`${session.user.id}/${project.id}.jpeg`, 60);

    return data?.signedUrl || "";
  };

  return (
    <div className="w-full h-full flex flex-col p-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center m-auto">
          <p className="flex flex-row items-center gap-1 text-foreground/50">
            <span>Loading</span>
            <Loader className="w-4 h-4 ml-2 animate-spin" />
          </p>
        </div>
      ) : projects ? (
        <div className="grid grid-cols-4 gap-4">
          {projects.map((project: any) => (
            <Card
              key={project.id}
              className="border-none shadow-none"
              onDoubleClick={() => router.push(`/project/${project.id}`)}
            >
              <CardContent className="p-0">
                <Image
                  className="rounded-xl border"
                  unoptimized
                  priority
                  src={project.image}
                  alt="Project Image"
                  width={1024 / 2}
                  height={768 / 2}
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
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 justify-center m-auto">
          <p className="flex flex-row items-center gap-1 text-foreground/50">
            <span>No project(s) found</span>
          </p>
          <CreateProjectButton />
        </div>
      )}
    </div>
  );
}
