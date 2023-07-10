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
  description:
    "AI Sandbox enables rapid prototyping of AI architectures through integrating AI models in a node base editor.",
  openGraph: {
    title: "AI Sandbox",
    description:
      "AI Sandbox enables rapid prototyping of AI architectures through integrating AI models in a node base editor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AISandbox",
    description:
      'AI Sandbox enables rapid prototyping of AI architectures through integrating AI models in a node base editor."',
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
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
