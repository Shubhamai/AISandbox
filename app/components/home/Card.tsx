import { ArrowUpRight } from "lucide-react";

const LandingCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3 border border-b-2 border-foreground/10 shadow-sm p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 hover:scale-[1.005] transition ease-in-out delay-40">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <div className="rounded-full">
          <ArrowUpRight strokeWidth={2} size={16} />
        </div>
      </div>
      <h4 className="font-semibold text-md text-foreground/50 text-left">
        {children}
      </h4>
    </div>
  );
};

export default LandingCard;
