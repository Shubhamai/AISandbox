import Header from "@/app/components/home/header";
import { Database } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const NavBarLayout = async ({ children }: { children: React.ReactNode }) => {
  // This is currently short-circuited per [this issue](https://github.com/vercel/next.js/issues/45371)
  // const supabase = createServerComponentClient<Database>({
  //   headers: () => new Headers(),
  //   cookies: () => new RequestCookies(new Headers()),
  // });

  const supabase = createServerComponentClient({ cookies });


  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header user={session ? session.user : null} />
      {children}
    </div>
  );
};

export default NavBarLayout;
