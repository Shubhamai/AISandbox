import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/app/components/ui/toaster";
import { ThemeProvider } from "@/app/components/ui/theme-provider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Sandbox",
  metadataBase: new URL("https://aisandbox.app"),
  icons: {
    icon: "https://raw.githubusercontent.com/Shubhamai/AISandbox/main/public/icon.svg",
    shortcut:
      "https://raw.githubusercontent.com/Shubhamai/AISandbox/main/public/icon.svg",
  },
  description: "Prototyping AI architectures in a node based editor.",
  openGraph: {
    title: "AI Sandbox",
    description: "Prototyping AI architectures in a node based editor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AISandbox",
    description: "Prototyping AI architectures in a node based editor.",
    images: [
      "https://raw.githubusercontent.com/Shubhamai/AISandbox/main/public/icon.svg",
    ],
  },
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
          <div id="root" className="w-screen h-screen">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
