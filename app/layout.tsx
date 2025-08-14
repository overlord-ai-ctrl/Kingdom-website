import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "The Network",
  description: "AI & Development Kingdom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <header className="border-b border-neutral-800/60 bg-brand-surface/80 backdrop-blur-sm">
            <div className="container-page flex items-center justify-between py-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-brand-primary/20 border border-brand-primary/30 grid place-items-center">
                  <span className="text-brand-primary font-bold text-lg">
                    N
                  </span>
                </div>
                <div className="text-brand-text font-semibold tracking-tight">
                  The Network
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href="/challenges"
                  className="text-sm text-brand-muted hover:text-white transition"
                >
                  Challenges
                </Link>
                <Link
                  href="/leaderboards"
                  className="text-sm text-brand-muted hover:text-white transition"
                >
                  Leaderboards
                </Link>
              </div>
            </div>
          </header>

          <main className="container-page py-6 md:py-10 space-y-6">
            {children}
          </main>
          <footer className="container-page py-10 text-sm text-brand-muted">
            © {new Date().getFullYear()} The Network
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
