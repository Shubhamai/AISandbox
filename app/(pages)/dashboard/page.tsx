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
import { GanttChart, LayoutGrid, List, Loader } from "lucide-react";
import CreateProjectButton from "@/app/components/dashboard/createProject";
import ProjectCard from "@/app/components/dashboard/projectCard";
import { toast } from "@/app/components/ui/use-toast";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import ListLayout from "@/app/components/dashboard/listLayout";
dayjs.extend(relativeTime);

export default function Profile() {
  const supabase = createClientComponentClient();
  const [projects, setProjects] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [layout, setLayout] = useState<string>("grid");
  // const [session, setSession] = useState<any>(null);

  const deleteProject = async (id: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      toast({
        title: "Unauthorized",
        description: "You need to be logged in to delete a project",
      });
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } else {
      const { data, error } = await supabase.storage
        .from("projects")
        .remove([`${session.user.id}/${id}.jpeg`]);

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      // Remove project from UI
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === id) {
          projects.splice(i, 1);
          setProjects([...projects]);
          break;
        }
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
        // let projects = [
        //   {
        //     id: "1",
        //     name: "Project 1",
        //     created_at: "2021-10-10T00:00:00.000Z",
        //     image: "",
        //   },
        // ];
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
        <div className="flex flex-col gap-10">
          <div className="flex flex-row gap-4 items-center justify-between">
            <div className="flex flex-row gap-4 items-center">
              {/* <h4 className="text-xs text-foreground/60 border-[1px] rounded-md px-2 py-[1px]">
                Recently Viewed
              </h4>
              <h4 className="text-xs text-foreground/60 border-[1px] rounded-md px-2 py-[1px]">
                Shared Projects
              </h4> */}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <ToggleGroup.Root
                className="flex flex-row gap-3"
                type="single"
                value={layout}
                onValueChange={(value) => {
                  if (value) setLayout(value);
                }}
              >
                <ToggleGroup.Item
                  className="data-[state=on]:bg-foreground/10 rounded-sm p-[2px]"
                  value="grid"
                >
                  <LayoutGrid
                    className="stroke-foreground/60 stroke-[1px]"
                    size={18}
                  />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="data-[state=on]:bg-foreground/10 rounded-sm p-[2px]"
                  value="list"
                >
                  <GanttChart
                    className="stroke-foreground/60 stroke-[1px]"
                    size={18}
                  />
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
          </div>
          {layout === "grid" ? (
            <div className="grid grid-cols-4 gap-4">
              {projects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  deleteProject={deleteProject}
                />
              ))}
            </div>
          ) : (
            <ListLayout projects={projects} />
          )}
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
