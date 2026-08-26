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
      <body>
        <header className="site-header">
          <span className="brand">🍁 Alberta PAT Prep</span>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/practice">Practice Questions</Link>
            <Link href="/writing">Writing Coach</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
