import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "./context/Auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Sandbox",
  description:
    "AI Sandbox enables rapid prototyping of AI architectures through integrating AI models in a node base editor.",
  openGraph: {
    title: "AI Sandbox",
    description:
      "AI Sandbox enables rapid prototyping of AI architectures through integrating AI models in a node base editor.",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  }, // TODO : Add twitter card image
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} light`}>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
