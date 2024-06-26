"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { User } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { Container } from "lucide-react";

const Header = ({ user }: { user: User | null }) => {
  return (
    <div className="fixed top-3 flex flex-row items-center justify-between w-[800px] backdrop-blur-sm bg-background/70 rounded-full py-2 pl-4 pr-2 z-20 shadow-md">
      <Link
        href="/"
        className="flex flex-row gap-2 items-center text-2xl font-bold"
      >
        <Container /> AISandbox
      </Link>

     
      <div>
        {user ? (
          <Link href="/dashboard">
            <Button className="rounded-full">Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant={"ghost"} className="rounded-full">
                Log In
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
