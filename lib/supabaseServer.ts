import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ezzdqcnnmhmzytbcjxqd.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY as string;
export const supabaseService = createClient(supabaseUrl, supabaseKey);
