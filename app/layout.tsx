import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "HookPilot",
  description: "AI content and landing tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#06101d] text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
