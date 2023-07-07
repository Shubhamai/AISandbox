import Link from "next/link";
import { Button } from "./components/ui/button";
import Image from "next/image";
import Header from "./components/home/header";
import Footer from "./components/home/footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { MoveUpRight } from "lucide-react";
import LandingCard from "./components/landing/Card";

export const runtime = "edge";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header user={session ? session.user : null} />

      <div className="flex flex-col items-center gap-10 mt-[300px]">
        <h1 className="font-extrabold text-6xl">Build AI Tools</h1>
        <h4 className="font-medium text-xl text-foreground/50 text-center">
          AI Sandbox enables rapid prototyping of AI architectures <br />
          through integrating AI models in a node base editor.
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

          <Link rel="noopener noreferrer" target="_blank" href="/docs">
            <LandingCard title="API Integration">
              Integrated the architectures to any application <br />
              by serving as an API endpoint.
            </LandingCard>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
