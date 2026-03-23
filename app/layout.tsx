import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "HookPilot",
  description: "AI content and landing page toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#08111f] text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
