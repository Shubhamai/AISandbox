"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { DeleteIcon, LeafIcon, SortDesc, Trash } from "lucide-react";
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast, useToast } from "@/app/components/ui/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type APIKey = {
  id: string;
  name: string;
  key: string;
  created: string;
  //   last_used: string
};

export const columns: ColumnDef<APIKey>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => <div>{row.getValue("key")}</div>,
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("created")).format("D MMMM, YYYY")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const apikeyId = row.original;
      const { toast } = useToast();

      return (
        <Button
          variant={"outline"}
          onClick={async () => {
            const supabase = createClientComponentClient();
            const {
              data: { session },
              error,
            } = await supabase.auth.getSession();

            if (session) {
              const { error } = await supabase
                .from("apikeys")
                .delete()
                .eq("id", apikeyId.id);

              if (!error) {
              toast({
                title: "API Key deleted",
                description: "Your API Key has been deleted.",
              });
            }
            }
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      );
    },
  },
];
