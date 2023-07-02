"use client";

import Link from "next/link";
import { Button } from "./components/ui/button";
import Image from "next/image";
import Header from "./components/home/header";
import Footer from "./components/home/footer";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header />

      <div className="flex flex-col items-center gap-10 mt-[300px]">
        <h1 className="font-extrabold text-6xl">Build AI Tools</h1>
        <h4 className="font-medium text-xl text-foreground/50 text-center">
          AI Sandbox enables rapid prototyping of AI architectures <br />
          through integrating AI models in a node base editor.
        </h4>
        <div className="flex flex-row gap-5">
          <Link href="/signup">
            <Button className="rounded-full">Get Started</Button>
          </Link>
          <Link href="/docs">
            <Button className="rounded-full" variant="outline">
              Documentation
            </Button>
          </Link>
        </div>

        <Image
          className="mt-32"
          src="/assets/image.jpg"
          width={1000}
          height={1000}
          alt="Picture of the author"
        />
      </div>

      <Footer />
    </div>
  );
}
