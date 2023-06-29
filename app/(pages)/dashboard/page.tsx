"use client";

import { useAuthContext } from "@/app/context/Auth";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuthContext();

  // TODO : Middleware would be better for this
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  //   console.log(user);
  // }, [user]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Image
            className="rounded-xl"
            src={"/image.jpg"}
            alt="black image"
            width={300}
            height={170}
          />
        </CardContent>
        <CardFooter  className="flex flex-col gap-1 items-start p-2">
          <p>Untitled</p>
          <p className="text-xs text-foreground/50">Edited 4 hours ago</p>
        </CardFooter>
      </Card>
    </div>
  );
}
