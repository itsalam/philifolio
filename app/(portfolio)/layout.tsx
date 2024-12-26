import { Layout } from "@/src/components/Layout";
import { MenuButton } from "@/src/components/MenuButton";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import type { Metadata } from "next";
import { Link } from "next-transition-router";
import { Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-instrument",
});

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Philip Nguyen",
  description:
    "John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          // "relative", // basicStyles
          "flex h-screen overflow-hidden overflow-y-auto", // sizing, overflowControl
          "antialiased", // textStyles
          instrumentSerif.variable,
          poppins.variable
        )}
      >
        <nav className="fixed mt-4 w-min px-4 md:px-12 xl:px-20 z-20">
          <div className="h-auto flex w-full relative justify-between">
            <Badge className="font-display h-min rounded-full italic text-xl z-30">
              <Link href="/">Philip.Digital</Link>
            </Badge>
          </div>
        </nav>
        <nav className="fixed bottom-4 right-0 w-min px-4 md:px-12 xl:px-20 z-20">
          <div className="h-auto flex w-full relative justify-end">
            <div className="aspect-square relative z-30">
              <MenuButton>{"Menu"}</MenuButton>
            </div>
          </div>
        </nav>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
