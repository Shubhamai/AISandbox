import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseService } from "./app/lib/supabase/server";

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/api/v1/execute")) {
    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return NextResponse.json(
        { error: "API Key not provided in the `Authorization` header." },
        { status: 401 }
      );
    } else {
      const hashedApiKey = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(authorization)
      );

      const hash = Buffer.from(hashedApiKey).toString("hex");

      // Is supabaseService safe to use here?
      const { data, error } = await supabaseService
        .from("apikeys")
        .select("*")
        .eq("hash", hash)
        .single();

      if (error) {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
      }

      if (data) {
        return res;
      }
    }
  }

  // Checking if the user is logged in in ui for /api/v1/[models] route.
  if (req.nextUrl.pathname.startsWith("/api/v1/models")) {
    if (session) {
      // console.log("session user: ", session?.user);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
