import { MoveUpRight } from "lucide-react";

const LandingCard = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}
) => {

  return (
    <div className="flex flex-col gap-3 border-1 shadow-lg p-4 rounded-3xl hover:shadow-xl hover:-translate-y-1 hover:scale-[1.005] transition ease-in-out delay-40">
      <div className="flex flex-row justify-between">
        <h1 className="font-medium text-2xl">{title}</h1>
        {/* <div className="p-1 border-2 rounded-full">
          <MoveUpRight />
        </div> */}
      </div>
      <h4 className="font-medium text-lg text-foreground/50 text-left">
        {children}
      </h4>
    </div>
  );
};

export default LandingCard;
