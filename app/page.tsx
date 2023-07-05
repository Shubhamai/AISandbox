import Link from "next/link";
import { Button } from "./components/ui/button";
import Image from "next/image";
import Header from "./components/home/header";
import Footer from "./components/home/footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { MoveUpRight } from "lucide-react";

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

        <div className="flex flex-row mt-36 items-center gap-10">
          <Link href="https://github.com/shubhamai/aisandbox">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between">
                <h1 className="font-medium text-2xl">Open Source</h1>
                <div className="p-1 border-2 rounded-full">
                  <MoveUpRight />
                </div>
              </div>
              <h4 className="font-medium text-lg text-foreground/50 text-left">
                AI Sandbox is an open source project. <br />
                You can contribute to the project on Github
              </h4>
            </div>
          </Link>
          <Link href="https://github.com/shubhamai/aisandbox">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between">
                <h1 className="font-medium text-2xl">Open Source</h1>
                <MoveUpRight className="border-2 rounded-full" />
              </div>
              <h4 className="font-medium text-lg text-foreground/50 text-left">
                AI Sandbox is an open source project. <br />
                You can contribute to the project on Github
              </h4>
            </div>
          </Link>
          <Link href="https://github.com/shubhamai/aisandbox">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between">
                <h1 className="font-medium text-2xl">Open Source</h1>
                <MoveUpRight className="border-2 rounded-full" />
              </div>
              <h4 className="font-medium text-lg text-foreground/50 text-left">
                AI Sandbox is an open source project. <br />
                You can contribute to the project on Github
              </h4>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
