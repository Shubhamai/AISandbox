import Link from "next/link";
import { cva } from "class-variance-authority";

const footerNavigationMenuTriggerStyle = cva(
  "group inline-flex w-max items-center justify-center rounded-md text-sm  transition-colors hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

const footerData: Record<string, Record<string, string>[]> = {
  Documentation: [
    {
      "Getting Started": "/signup",
      "API Reference": "/status",
      Examples: "/docs#examples",
    },
  ],
  Resources: [
    {
      Pricing: "/pricing",
      Support: "/contact",
    },
  ],
  Project: [
    {
      Contact: "/contact",
      Github: "/github",
    },
  ],
};

const Footer = () => {
  return (
    <div className="flex flex-row justify-between items-start w-[800px] mt-[200px] mb-[30px]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row items-center justify-between font-semibold">
          AISandbox
        </div>
        <div className="text-sm flex flex-row items-center gap-3 rounded-sm py-[2px] px-[5px] bg-foreground/10">
          <div className="w-2 h-2 rounded-full bg-green-600">{"  "}</div> All
          Systems nominal
        </div>
      </div>
      <div className="flex flex-row gap-20">
        {Object.keys(footerData).map((key: any) => (
          <div key={key} className="flex flex-col gap-4">
            <h6
              className={`${footerNavigationMenuTriggerStyle()} font-semibold select-none`}
            >
              {key}
            </h6>
            {Object.keys(footerData[key][0]).map((subKey) => (
              <Link
                key={subKey}
                href={footerData[key][0][subKey]}
                className={`${footerNavigationMenuTriggerStyle()} hover:text-foreground font-normal`}
              >
                {subKey}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
