import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { Response } from "@/app/utils/response";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  if (!cookies) return NextResponse.json(Response.Error("No cookies found"));

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json(Response.Error("No user found"));

  const reqBody = await request.json();

  const apiKey = "ais-" + crypto.randomUUID();

  const hashedApiKey = await hashApiKey(apiKey);

  const public_key = apiKey.slice(0, 4) + "..." + apiKey.slice(-4, -1);

  const { data, error } = await supabaseAdmin
    .from("apikeys")
    .insert({
      hash: hashedApiKey,
      key: public_key,
      user_id: user.id,
      name: reqBody.name,
    })
    .select();

  if (error) {
    return NextResponse.json(Response.Error(error.message));
  } else {
    return NextResponse.json(Response.Success(apiKey));
  }
}

const hashApiKey = async (apiKey: string) => {
  const hashedApiKey = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(apiKey)
  );

  return Buffer.from(hashedApiKey).toString("hex");
};
