import "./globals.css"

export const metadata = {
  title: "HookPilot",
  description: "AI Hook Generator for content, ads, and creators",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
