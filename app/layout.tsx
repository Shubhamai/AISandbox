import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/app/components/ui/toaster";
import { ThemeProvider } from "@/app/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Sandbox",
  metadataBase: new URL("https://aisandbox.app"),
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
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
