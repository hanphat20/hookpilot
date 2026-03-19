import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
})

export const metadata = {
  title: "HookPilot",
  description: "AI Hook Generator for content, ads, and creators",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
