import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import Link from "next/link";

import "./globals.css";

import "remixicon/fonts/remixicon.css";

import { CartProvider } from "./context/CartContext";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza House",
  description: "Order your favorite pizza online",
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
      <body className="min-h-full flex flex-col">

        <CartProvider>

          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          {children}

          {/* Footer */}
          <footer className="w-full bg-[#111111] border-t border-white/10 text-white py-6">

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

              <h2 className="text-xl font-bold text-[#c89b6d]">
                  Pizza House
              </h2>

              <div className="flex gap-5 text-sm text-gray-400">

                <Link
                  href="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>

                <Link
                  href="/menu"
                  className="hover:text-white transition"
                >
                  Menu
                </Link>

                <Link
                  href="/about-us"
                  className="hover:text-white transition"
                >
                  About
                </Link>

                <Link
                  href="/contact-us"
                  className="hover:text-white transition"
                >
                  Contact
                </Link>

              </div>

              <p className="text-sm text-gray-500">
                © 2026 Pizza House
              </p>

            </div>

          </footer>

        </CartProvider>

      </body>
    </html>
  );
}