"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeName, setStoreName] = useState("Pizza House");

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem("pizza-settings");

      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);

          if (settings.storeName) {
            setStoreName(settings.storeName);
          }
        } catch (error) {
          console.error("Failed to load store settings:", error);
        }
      }
    };

    loadSettings();

    // Settings change hone par website ko update karne ke liye
    window.addEventListener("storage", loadSettings);

    return () => {
      window.removeEventListener("storage", loadSettings);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#111111] border-t border-white/10 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <h2 className="text-xl font-bold text-[#c89b6d]">
            {storeName}
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
              href="/offers"
              className="hover:text-white transition"
            >
              Offers
            </Link>
            <Link
              href="/reviews"
              className="hover:text-white transition"
            >
              Reviews
            </Link>

            <Link
              href="/contact-us"
              className="hover:text-white transition"
            >
              Contact
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 {storeName}
          </p>
        </div>
      </footer>
    </div>
  );
}