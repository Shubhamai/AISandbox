import Link from "next/link";
import { cva } from "class-variance-authority";
import { Container } from "lucide-react";

const footerNavigationMenuTriggerStyle = cva(
  "group inline-flex w-max items-center justify-center rounded-md text-sm  transition-colors hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

const footerData: Record<string, Record<string, string>[]> = {
  Documentation: [
    {
      "Getting Started": "/signup",
      "API Reference": "/api",
      Examples: "/docs#examples",
    },
  ],
  Resources: [
    {
      Pricing: "/pricing",
      Support: "mailto:hello@aisandbox.app",
    },
  ],
  Project: [
    {
      Contact: "mailto:hello@aisandbox.app",
      Github: "/github",
    },
  ],
};

const Footer = async () => {
  const checkStatus = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/Shubhamai/AISandbox-Status/master/history/summary.json"
    );
    const out = await response.json();

    let totalUp = 0;
    for (let i = 0; i < out.length; i++) {
      if (out[i].status === "up") {
        totalUp++;
      }
    }

    if (totalUp === out.length) {
      return "All systems operational";
    } else if (totalUp === 0) {
      return "Major outage";
    } else {
      return "Partial outage";
    }
  };

  const status = await checkStatus();

  return (
    <div className="flex flex-row justify-between items-start w-[800px] mt-[40px] mb-[30px]">
      <div className="flex flex-col gap-10">
        <Link
          href="https://aisandbox.app"
          className="flex flex-row items-center gap-2 font-semibold"
        >
          <Container /> AISandbox
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://status.aisandbox.app"
          className="text-sm flex flex-row items-center gap-3 rounded-lg py-[2px] px-[7px] border"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              // All systems operational, Partial outage, Major outage
              backgroundColor:
                status === "All systems operational"
                  ? "#10B981"
                  : status === "Partial outage"
                  ? "#FBBF24"
                  : "#EF4444",
            }}
          ></div>
          {status}
        </Link>
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
