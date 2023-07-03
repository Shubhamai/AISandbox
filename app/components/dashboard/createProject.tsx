"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast, useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const CreateProjectButton = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const createNewProject = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (session) {
      const emptyData = { nodes: [], edges: [] };

      const { data, error } = await supabase
        .from("projects")
        .insert([
          { data: emptyData, user_id: session.user.id, name: "Untitled" },
        ])
        .select();

      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        router.push(`/project/${data[0].id}`);
      }
    } else {
      toast({
        title: "Unauthorized",
        description: "You need to be logged in to create a project",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size={"sm"}
      onClick={createNewProject}
      className="rounded-lg gap-2 bg-background"
    >
      <Plus className="w-4 h-4" />
      Create Project
    </Button>
  );
};

export default CreateProjectButton;
