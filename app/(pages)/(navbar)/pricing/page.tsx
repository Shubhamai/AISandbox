import Footer from "@/app/components/home/footer";
import Link from "next/link";

export const runtime = "edge";

const Pricing = () => {
  return (
    <div className="flex flex-col gap-10 justify-start mx-auto min-h-screen pt-[200px] w-[800px]">
      <h1 className="text-6xl font-semibold text-left">Pricing</h1>
      <h4>
        Since all the models are hosted on the cloud, a small fee is charged for
        each prediction request. <br />
        <br />
        <span className="font-bold">
          $0.02 per each prediction request per model
        </span>
        , in both editor and via API. ( Note that this is expected to change in
        future ).
      </h4>
      <div className="flex flex-col gap-5">
        <h3 className="text-3xl font-semibold text-left">Billing</h3>
        <h4>
          Billing is done on a monthly basis. <br />
          <br /> You will be charged at the end of each month for the total
          number of requests made in that month.{" "}
          <Link
            href="/dashboard/usage"
            className="underline decoration-foreground/50 hover:decoration-foreground hover:decoration-2"
          >
            You can find your current usage on your account page.
          </Link>
        </h4>
      </div>
      {/* <div className="border-t w-full flex flex-row items-center justify-center mt-[200px]">
        <Footer />
      </div> */}
    </div>
  );
};

export default Pricing;
