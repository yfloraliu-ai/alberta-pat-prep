import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alberta PAT Prep",
  description:
    "AI-powered practice platform for Alberta Grade 6 Provincial Achievement Tests",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bitter:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=Caveat:wght@600&display=swap"
        />
      </head>
      <body>
        <header className="site-header">
          <span className="brand">Alberta PAT Prep</span>
          <span className="tagline">Grade 6 · Study binder</span>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/writing">Writing</Link>
            <Link href="/mistakes">Mistakes</Link>
            <Link href="/progress">Progress</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
