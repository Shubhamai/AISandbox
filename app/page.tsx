import Link from "next/link";
import { Button } from "./components/ui/button";
import Image from "next/image";
import Header from "./components/home/header";
import Footer from "./components/home/footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import LandingCard from "./components/landing/Card";
import RandomChart from "./components/home/chart";
import ExampleCodes from "./components/home/ExampleCodes";

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

  const getTimeDescription = () => {
    const now = new Date();

    const hours = now.getHours();
    const dayOfWeek = now.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return "this weekend";
    }

    if (hours >= 0 && hours < 12) {
      return "this morning";
    } else if (hours >= 12 && hours < 17) {
      return "this Afternoon";
    } else if (hours >= 17 && hours < 21) {
      return "this evening";
    } else {
      return "tonight";
    }
  };

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
        <h1 className="flex flex-col gap-2 items-center font-black text-6xl">
          Build AI Tools
        </h1>
        <h4 className="font-bold text-2xl text-foreground/50 text-center">
          Prototyping AI architectures in a node based editor.
        </h4>
        <div className="flex flex-row gap-5">
          <Link href={session ? "/dashboard" : "/signup"}>
            <Button
              className="flex gap-2 w-fit rounded-3xl border-2 pl-6 pr-4 border-foreground font-bold hover:shadow-xl transition-transform transition-shadow"
              size="lg"
              // variant={'ghost'}
            >
              Get Started
              <ChevronRight />
            </Button>
          </Link>

          <Link href="/docs">
            <Button
              className="flex gap-2 w-fit rounded-3xl border-2 px-4 border-foreground font-bold hover:shadow-xl transition-transform transition-shadow"
              size="lg"
              variant={"outline"}
            >
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

        <div className="grid grid-cols-2 grid-flow-rows gap-4 w-[1400px] mt-20">
          <div className="col-span-1 flex flex-col gap-4 bg-gray-100 border border-slate-300 p-4 rounded-lg hover:drop-shadow-lg hover:-translate-y-3 transition-transform">
            <div className="font-semibold text-2xl">API Integration</div>
            <div className="text-slate-600">
              AI Sandbox provides an REST API endpoint to integrate the AI
              architectures to any application. Currently supported languages
              include Python, Javascript, and Rust.
            </div>
            <div>
              <ExampleCodes />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4 bg-gray-100 border border-slate-300 p-4 rounded-lg hover:drop-shadow-lg hover:-translate-y-3 transition-transform">
            <div className="font-semibold text-2xl ">Moniter Usage</div>
            <div className="text-slate-600">
              All your API usage is monitered and displayed in the dashboard.
              You can also view the logs of the API calls and usage limit per
              month based on cost.
            </div>
            <RandomChart />
          </div>
        </div>
        <div className="flex flex-col gap-16 my-[200px] items-center justify-between w-[1000px]">
          <div className="text-left font-bold text-5xl">
            Start building AI architectures{" "}
            <span className="underline">{getTimeDescription()}</span>.
          </div>
          <Link href={session ? "/dashboard" : "/signup"} className="">
            <Button
              className="flex gap-2 w-fit rounded-3xl border-2 pl-6 pr-4 border-foreground font-bold hover:shadow-xl transition-transform transition-shadow"
              size="lg"
              // variant={'ghost'}
            >
              Get Started
              <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-t w-[800px] flex flex-row items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}
