import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HookPilot",
  description: "Create viral hooks for content and ads in seconds.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  )
}
