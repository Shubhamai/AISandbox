"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Copy } from "lucide-react";
import { useToast, toast } from "@/app/components/ui/use-toast";
import { set } from "lodash";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { columns } from "./columns";

export function DataTable<TData, TValue>() {
  const supabase = createClientComponentClient();

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      let { data, error } = await supabase
        .from("apikeys")
        .select("id,key,name,created");

      if (error) {
        console.error(error);
      }

      if (!data) {
        data = [];
      }
      setData(data);
    };
    fetch();
  }, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiKeyName, setApiKeyName] = useState("My Test Key");
  const [apiKey, setApiKey] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const getAPIKey = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (session) {
      const response = await fetch("/api/generatekey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: apiKeyName, user_id: session.user.id }),
      });

      const responseJson = await response.json();

      if (responseJson.type === "success") {
        setNameSubmitted(true);
        setApiKey(responseJson.data);

        // Render the row to the table
        data.push({
          id: responseJson.id,
          name: apiKeyName,
          key:
            responseJson.data.slice(0, 4) +
            "..." +
            responseJson.data.slice(-4, -1),
          created: new Date().toISOString(),
        });
        setData([...data]);
      } else {
        toast({
          title: "Error",
          description: responseJson.message,
        });
      }
    } else {
      toast({
        title: "Unauthorized",
        description: "You need to be logged in to create a project",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <Dialog
          open={dialogOpen}
          onOpenChange={(e) => {
            setDialogOpen(e);
            if (dialogOpen && nameSubmitted) {
              setNameSubmitted(false);
              setApiKey("");
            }
          }}
        >
          <DialogTrigger asChild className="ml-auto">
            <Button variant="outline">Generate API Key</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create new API Key</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
            </DialogHeader>
            {!nameSubmitted ? (
              <div className="flex flex-col gap-2 mt-7 mb-4">
                <Label htmlFor="name" className="text-left">
                  Name (optional)
                </Label>
                <Input
                  id="name"
                  value={apiKeyName}
                  onChange={(event) => setApiKeyName(event.target.value)}
                  className="col-span-3"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-5 mt-3 mb-4">
                Copy this API Key and store it in a secure place. You will not
                be able to see it again.
                <div className="flex flex-row items-center justify-between gap-4">
                  <Input
                    className="select-none"
                    type="text"
                    spellCheck={false}
                    value={apiKey}
                    readOnly
                  />
                  <Button
                    size={"icon"}
                    type="submit"
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      toast({
                        title: "Copied!",
                        description: "API Key copied to clipboard",
                      });
                    }}
                  >
                    <Copy />
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              {!nameSubmitted ? (
                <Button size={"sm"} type="submit" onClick={getAPIKey}>
                  Create API Key
                </Button>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => {
                    setDialogOpen(false);
                    setNameSubmitted(false);
                    setApiKey("");
                  }}
                >
                  Done
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
