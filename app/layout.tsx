import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Browse the original 151 Pokemon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100">
        <header className="bg-red-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-8 py-3.5">
              {/* Logo and Title */}
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border border-red-600"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/" className="text-2xl font-bold tracking-tight hover:text-red-100 transition-colors">
                    Pokédex
                  </Link>
                  <span className="text-red-200 text-sm">Original 151</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex items-center gap-1 bg-black/20 rounded-lg p-1">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-black/30 text-white hover:bg-black/40 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Pokédex
                </Link>
                <Link
                  href="/extra"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Extra
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
