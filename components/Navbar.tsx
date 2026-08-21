"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <nav className="bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-3xl md:rounded-full px-5 md:px-8 py-4 shadow-lg">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white"
          >
            <i className="ri-restaurant-2-line text-[#f59e0b] text-3xl"></i>

            <span>Pizza House</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-base font-medium text-gray-200">

            <Link
              href="/"
              className="hover:text-[#f59e0b] transition duration-300"
            >
              Home
            </Link>

            <Link
              href="/menu"
              className="hover:text-[#f59e0b] transition duration-300"
            >
              Menu
            </Link>

            <Link
              href="/about-us"
              className="hover:text-[#f59e0b] transition duration-300"
            >
              About
            </Link>

            <Link
              href="/offers"
              className="hover:text-[#f59e0b] transition duration-300"
            >
              Offers
            </Link>

            <Link
              href="/contact-us"
              className="hover:text-[#f59e0b] transition duration-300"
            >
              Contact
            </Link>

            {/* <Link
              href="/practice"
              className="hover:text-[#f59e0b] transition duration-300"
            >
              Practice
            </Link> */}

            {/* Search + Cart */}
            <div className="flex items-center gap-2 ml-1">

              {/* Search */}
              <Link
                href="/menu?focus=search"
                className="w-10 h-10 flex items-center justify-center rounded-full text-white text-xl hover:bg-white/10 hover:text-[#f59e0b] transition duration-300"
                aria-label="Search Pizza"
              >
                <i className="ri-search-line"></i>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 hover:text-[#f59e0b] transition duration-300"
                aria-label="Cart"
              >
                <i className="ri-shopping-cart-fill text-2xl"></i>
              </Link>

            </div>
          </div>

          {/* Desktop Order Button */}
          <Link
            href="/menu"
            className="hidden md:block bg-[#f59e0b] text-black font-semibold text-sm px-5 py-3 rounded-full hover:bg-[#fbbf24] transition duration-300"
          >
            Order Now
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <i
              className={`${
                isOpen ? "ri-close-line" : "ri-menu-line"
              } text-2xl`}
            ></i>
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">

            <div className="flex flex-col gap-2 text-base font-medium text-gray-300">

              <Link
                href="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                Home
              </Link>

              <Link
                href="/menu"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                Menu
              </Link>

              <Link
                href="/about-us"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                About
              </Link>

              <Link
                href="/offers"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                Offers
              </Link>

              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                Contact
              </Link>

              {/* <Link
                href="/practice"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                Practice
              </Link> */}

              {/* Mobile Search */}
              <Link
                href="/menu?focus=search"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                <i className="ri-search-line text-xl"></i>
                Search Pizza
              </Link>

              {/* Mobile Cart */}
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 hover:text-[#f59e0b] transition"
              >
                <i className="ri-shopping-cart-fill text-xl"></i>
                Cart
              </Link>

              {/* Mobile Order Button */}
              <Link
                href="/menu"
                onClick={closeMenu}
                className="mt-2 bg-[#f59e0b] text-black text-center font-semibold px-5 py-3 rounded-full hover:bg-[#fbbf24] transition"
              >
                Order Now
              </Link>

            </div>
          </div>
        )}

      </nav>
    </header>
  );
}