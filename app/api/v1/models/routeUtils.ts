import { supabaseService } from "@/app/lib/supabase/server";

export const preProcess = (req: Request) => {
  const preOut = {
    startTimestamp: Date.now(),
  };

  return preOut;
};

export const postProcess = async (
  req: Request,
  result: any,
  preOut: {
    startTimestamp: number;
  }
) => {
  const endTimestamp = Date.now();

  const diff = endTimestamp - preOut.startTimestamp;

  // NOTE: No await set to avoid blocking the request
  const { data: usageData, error: usageError } = await supabaseService
    .from("apiusage")
    .insert([
      {
        project_id: req.headers.get("ProjectId"),
        user_id: req.headers.get("UserId"),
        // api_key: null;
        cost: 0.02,
        execution_time: diff,
        source: "Web",
        description: `Executed ${req.url.split("/api/")[1]}`,
      },
    ])
    .select();

  result.executionTime = diff;
  return result;
};
