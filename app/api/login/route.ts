import { supabaseService } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  console.log(reqData);

  const email = reqData?.email;
  if (!email) {
    return NextResponse.json({
      type: "error",
      error: "No email provided",
    });
  }

  // check if the user has access
  // const { data: user, error: userError } = await supabase
  //   .from("waitlist")
  //   .select()
  //   .eq("email", email)
  //   .single();

  // console.log("U", user);

  // if (userError || !user || !user.email) {
  //   return NextResponse.json({
  //     type: "error",
  //     error:
  //       userError?.message ||
  //       "The provided email do not have access to the app :(",
  //   });
  // }

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

  console.log("auth", data, error);

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

  //   const nodesData = data[0];

  return NextResponse.json({
    type: "success",
    data: {},
  });
}
