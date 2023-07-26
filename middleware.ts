import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseService } from "./app/lib/supabase/server";
// import { Ratelimit } from "@upstash/ratelimit";
import redis from "./app/lib/redis/client";

// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(2, "10 s"),
//   prefix: "@upstash/ratelimit",
// });

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
// TODO : Need rate limiting for /api/v1/execute, /api/v1/models
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

      // Cached user id from redis
      // TODO : Ratelimting + caching seems to slow middleware from ~20ms to ~200-300ms, need to diagnose the latency
      const cacheUserId = await redis.get(hash);
      // const cacheUserId = "abc";

      if (!cacheUserId) {
        const { data, error } = await supabaseService
          .from("apikeys")
          .select("*")
          .eq("hash", hash)
          .single();

        if (error) {
          return NextResponse.json(
            { error: "Invalid API Key" },
            { status: 401 }
          );
        }

        if (data) {
          // 1 day expiry
          // TODO : Need to set expiry based on the user's plan or failed to pay stripe invoice
          await redis.set(hash, data.user_id, {
            ex: 60 * 60 * 24,
          });

          // const { success, pending, limit, reset, remaining } =
          //   await ratelimit.limit(data.user_id);
          const success = true;

          return success
            // ? NextResponse.json(
            //     { error: "data found, set cache" },
            //     { status: 200 }
            //   )
            ? res
            : NextResponse.json(
                { error: "Too many requests, please try again in few seconds" },
                { status: 429 }
              );
        }
      } else {
        // const { success, pending, limit, reset, remaining } =
        //   await ratelimit.limit(cacheUserId as string);
        const success = true;
        
        return success
          // ? NextResponse.json({ error: "cache found" }, { status: 200 })
          ? res
          : NextResponse.json(
              { error: "Too many requests, please try again in few seconds" },
              { status: 429 }
            );
      }
    }
  }

  // Checking if the user is logged in in ui for /api/v1/[models] route.
  else if (req.nextUrl.pathname.startsWith("/api/v1/models")) {
    if (session) {
      // console.log("session user: ", session?.user);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Dashboard
  } else if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));

    // / , /login , /signup and other pages
  } else {
    return res;
  }
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
