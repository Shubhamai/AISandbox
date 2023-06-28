import { supabaseService } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  const email = reqData?.email;
  if (!email) {
    return NextResponse.json({
      type: "error",
      error: "No email provided",
    });
  }

  // check if the user has been whitelisted
  const { data: user, error: userError } = await supabaseService
    .from("waitlist")
    .select()
    .eq("email", email)
    .single();

  if (userError || !user || !user?.whitelisted) {
    return NextResponse.json({
      type: "error",
      error:
        userError?.message ||
        "The provided email do not have access to the app :(",
    });
  }

  // send magic link
  const { data, error } = await supabaseService.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://aisandbox.app",
    },
  });

  if (error) {
    return NextResponse.json({
      type: "error",
      error: error.message,
    });
  }

  if (!data) {
    return NextResponse.json({
      type: "error",
      error: "No data found with given Id",
    });
  }

  return NextResponse.json({
    type: "success",
    data: {},
  });
}
