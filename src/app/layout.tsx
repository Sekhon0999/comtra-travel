import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen text-white">
        <nav className="bg-black/30 border-b border-white/10 sticky top-0 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex gap-6">
            <Link href="/" className="font-semibold">Home</Link>
            <Link href="/explore" className="font-semibold">Explore</Link>
          </div>
        </nav>
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}