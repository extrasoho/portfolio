import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlasmaBackground from "@/components/PlasmaBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alejandro Portfolio",
  description: "Alejandro Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scrollbar-hide">
        <PlasmaBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
