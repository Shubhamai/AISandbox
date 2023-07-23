import { DataTable } from "./data-table";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ApiKeys() {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("apikeys")
    .select("id,key,name,created");

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">API Keys</h1>
        <h4 className="text-foreground/50 text-sm">
          You can run your AISandbox projects with REST API. Please note that
          the keys will not be shown again after you generate them.
        </h4>
      </div>
      <div className="w-[800px]">
        <DataTable initialData={data ? data : []} />
      </div>
    </div>
  );
}
