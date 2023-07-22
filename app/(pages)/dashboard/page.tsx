"use client";

import { Button } from "@/app/components/ui/button";
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
import ProjectCard from "@/app/components/dashboard/projectCard";

dayjs.extend(relativeTime);

export default function Profile() {
  const supabase = createClientComponentClient();
  const [projects, setProjects] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [session, setSession] = useState<any>(null);

  const deleteProjectOnUI = async (id: string) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) {
        projects.splice(i, 1);
        setProjects([...projects]);
        break;
      }
    }
  };

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
            <ProjectCard
              key={project.id}
              project={project}
              deleteProjectOnUI={deleteProjectOnUI}
            />
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
