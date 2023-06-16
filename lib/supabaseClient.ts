import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ezzdqcnnmhmzytbcjxqd.supabase.co";
const supabaseKey = (process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6emRxY25ubWhtenl0YmNqeHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjY1OTQsImV4cCI6MjAwMjM0MjU5NH0.PKs7qMPQRz1AKk1qUjISzKDzlLyLiHG1sfSPA5-TG9s") as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
