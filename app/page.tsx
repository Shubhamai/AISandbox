import Link from "next/link";
import { Button } from "./components/ui/button";
import Image from "next/image";
import Header from "./components/home/header";
import Footer from "./components/home/footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import LandingCard from "./components/landing/Card";
import { Database } from "@/types_db";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export const runtime = "edge";

export default async function Home() {
  // This is currently short-circuited per [this issue](https://github.com/vercel/next.js/issues/45371)
  // const supabase = createServerComponentClient<Database>({
  //   headers: () => new Headers(),
  //   cookies: () => new RequestCookies(new Headers()),
  // });

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header user={session ? session.user : null} />

      <div className="flex flex-col items-center gap-10 mt-[300px]">
        <Link
          className="border px-4 min-w-max py-2 w-36 text-center rounded-full bg-yellow-300/10 border-yellow-300 text-yellow-900 flex flex-row gap-2"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/shubhamai/aisandbox"
        >
          <ArrowUpRight /> Currently In Development
        </Link>
        <h1 className="flex flex-col gap-2 items-center font-extrabold text-6xl">
          Build AI Tools
        </h1>
        <h4 className="font-medium text-xl text-foreground/50 text-center">
          Prototyping AI architectures in a node based editor.
        </h4>
        <div className="flex flex-row gap-5">
          <Link href={session ? "/dashboard" : "/signup"}>
            <Button className="rounded-full">Get Started</Button>
          </Link>
          <Link href="/docs">
            <Button className="rounded-full" variant="outline">
              Documentation
            </Button>
          </Link>
        </div>

        <Image
          className="mt-32 border-2 shadow- rounded-xl transition-all hover:shadow-md hover:-translate-y-1 hover:scale-[1.005]"
          src="/assets/editor.svg"
          width={1400}
          height={1400}
          alt="Editor"
        />

        <div className="flex flex-row mt-36 items-center gap-16">
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/shubhamai/aisandbox"
          >
            <LandingCard title="Open Source">
              AI Sandbox is an open source project. <br />
              You can contribute to the project on Github.
            </LandingCard>
          </Link>
          <Link rel="noopener noreferrer" target="_blank" href="/docs">
            <LandingCard title="AI Models">
              The editor provides a wide range of AI models <br />
              to build your AI architectures.
            </LandingCard>
          </Link>

          <Link rel="noopener noreferrer" target="_blank" href="/api">
            <LandingCard title="API Integration">
              Integrated the architectures to any application <br />
              by serving as an API endpoint.
            </LandingCard>
          </Link>
        </div>
      </div>

      <div className="border-t w-full flex flex-row items-center justify-center mt-[200px]">
        <Footer />
      </div>
    </div>
  );
}
