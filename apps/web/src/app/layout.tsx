import type { Metadata } from "next"
import { AppFooter } from "../components/AppFooter"
import { AppHeader } from "../components/AppHeader"
import "./globals.css"

export const metadata: Metadata = {
  title: "Contact Us Demo",
  description: "Contact form and contacts list demo application"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className="flex min-h-screen min-w-80 flex-col bg-slate-100 font-sans text-slate-800"
        suppressHydrationWarning
      >
        <a
          className="absolute left-4 -top-12 z-10 rounded-lg bg-slate-800 px-3.5 py-2.5 text-white focus:top-4"
          href="#main"
        >
          Skip to content
        </a>
        <AppHeader />
        <main className="w-full flex-1" id="main">
          {children}
        </main>
        <AppFooter />
      </body>
    </html>
  )
}
