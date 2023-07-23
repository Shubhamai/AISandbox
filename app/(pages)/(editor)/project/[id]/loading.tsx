import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center mx-auto min-h-screen w-[400px]">
      <p className="flex flex-row items-center gap-1 text-foreground/50">
        <span>Loading</span>
        <Loader className="w-4 h-4 ml-2 animate-spin" />
      </p>
    </div>
  );
}
