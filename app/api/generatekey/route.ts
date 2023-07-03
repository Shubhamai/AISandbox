import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/app/lib/supabase/server";
import { Response } from "@/app/utils/response";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const apiKeyValues = crypto.getRandomValues(new Uint8Array(16));
  const apiKey = "ais-" + Buffer.from(apiKeyValues).toString("hex");

  const hashedApiKey = await hashApiKey(apiKey);

  const public_key = apiKey.slice(0, 4) + "..." + apiKey.slice(-4, -1);

  const { data, error } = await supabaseService
    .from("apikeys")
    .insert({
      hash: hashedApiKey,
      key: public_key,
      user_id: reqBody.user_id,
      name : reqBody.name
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
