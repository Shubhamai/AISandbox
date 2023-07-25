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
import {
  ChevronDown,
  GanttChart,
  LayoutGrid,
  List,
  Loader,
} from "lucide-react";
import CreateProjectButton from "@/app/components/dashboard/createProject";
import ProjectCard from "@/app/components/dashboard/projectCard";
import { toast } from "@/app/components/ui/use-toast";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import ListLayout from "@/app/components/dashboard/listLayout";
dayjs.extend(relativeTime);

export default function Profile() {
  const supabase = createClientComponentClient();
  const [projects, setProjects] = useState<any>(null);
  const [sectionProjects, setSectionProjects] = useState<any>(null); // recent | favorites

  const [loading, setLoading] = useState<boolean>(true);
  const [layout, setLayout] = useState<string>("grid"); // grid | list
  const [section, setSection] = useState<string>("recent"); // recent | favorites
  const [sort, setSort] = useState<string>("Last Modified"); // Alphabetical | Last Modified | Created At
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

  const changeDashboardProjectState = async (id: string, value: object) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) {
        projects[i] = { ...projects[i], ...value };
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
          setSectionProjects(projects);
          setProjectLayout(section, sort, projects, projects);
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

  // Function to change the project sorting and filtering per section
  const setProjectLayout = (
    sectionType: string,
    sortType: string,
    projectsList: any,
    sectionProjectsList: any
  ) => {
    setSection(sectionType);
    setSort(sortType);

    let filteredSectionProjects: any[] = [];
    if (sectionType === "recent") {
      filteredSectionProjects = [...projectsList];
    }
    if (sectionType === "favorites") {
      let onlyFavorites = projectsList.filter(
        (project: any) => project.favorite
      );
      filteredSectionProjects = [...onlyFavorites];
    }

    if (sortType === "Alphabetical") {
      filteredSectionProjects = [...filteredSectionProjects].sort(
        (a: any, b: any) => a.name.localeCompare(b.name)
      );
    }
    if (sortType === "Last Modified") {
      filteredSectionProjects = [...filteredSectionProjects].sort(
        (a: any, b: any) => dayjs(b.updated_at).diff(dayjs(a.updated_at))
      );
    }
    if (sortType === "Created At") {
      filteredSectionProjects = [...filteredSectionProjects].sort(
        (a: any, b: any) => dayjs(b.created_at).diff(dayjs(a.created_at))
      );
    }

    setSectionProjects([...filteredSectionProjects]);
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
              <ToggleGroup.Root
                className="flex flex-row gap-3"
                type="single"
                value={section}
                onValueChange={(value) => {
                  setProjectLayout(value, sort, projects, sectionProjects);
                }}
              >
                <ToggleGroup.Item
                  className="data-[state=on]:bg-foreground/10 rounded-sm"
                  value="recent"
                >
                  <h4 className="text-xs text-foreground/60 border-[1px] rounded-md p-[4px] select-none">
                    Recently Viewed
                  </h4>
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="data-[state=on]:bg-foreground/10 rounded-sm"
                  value="favorites"
                >
                  <h4 className="text-xs text-foreground/60 border-[1px] rounded-md p-[4px] select-none">
                    Favorites
                  </h4>
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-xs flex flex-row gap-1 items-center outline-none">
                  {sort}
                  <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="text-foreground/60">
                    Sort By
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(value) => {
                      setProjectLayout(
                        section,
                        value,
                        projects,
                        sectionProjects
                      );
                    }}
                  >
                    <DropdownMenuRadioItem value="Alphabetical">
                      Alphabetical
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Last Modified">
                      Last Modified
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Created At">
                      Created At
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <ToggleGroup.Root
                className="flex flex-row gap-2"
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
              {sectionProjects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  deleteProject={deleteProject}
                  changeDashboardProjectState={changeDashboardProjectState}
                />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Name</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionProjects.map((project: any) => (
                  <ListLayout
                    key={project.id}
                    project={project}
                    deleteProject={deleteProject}
                    changeDashboardProjectState={changeDashboardProjectState}
                  />
                ))}
              </TableBody>
            </Table>
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
