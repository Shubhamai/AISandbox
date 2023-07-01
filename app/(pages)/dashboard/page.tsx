"use client";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Image from "next/image";

export default function Profile() {


  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Image
            className="rounded-xl"
            src={"/assets/image.jpg"}
            alt="black image"
            width={300}
            height={170}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-1 items-start p-2">
          <p>Untitled</p>
          <p className="text-xs text-foreground/50">Edited 4 hours ago</p>
        </CardFooter>
      </Card>
    </div>
  );
}