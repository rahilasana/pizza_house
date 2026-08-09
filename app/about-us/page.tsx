import React from "react";
import Image from "next/image";


export default function page() {
  return (
    <div>
      <section id="about" className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* Image */}
            <div className="relative">
              <img
                src="/images/image.png"
                alt="Freshly baked pizza"
                className="w-full h-[300px] md:h-[400px] object-cover rounded-3xl shadow-xl"
              />

              <div className="absolute -bottom-6 -right-4 md:-right-6 bg-[#dc2626] text-white px-6 py-4 rounded-2xl shadow-lg">
                <p className="font-bold text-lg">
                  Made With Love <i className="ri-heart-3-fill"></i>
                </p>
                <p className="text-sm text-white/80">Fresh & Delicious</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
                About Us
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
                We Make Pizza
                <span className="text-[#dc2626]"> With Passion</span>
              </h2>

              <p className="text-gray-600 leading-relaxed mt-6">
                At Pizza House, we believe that great pizza starts with great
                ingredients. Our dough is freshly prepared, our sauces are made
                with care, and every pizza is topped with quality ingredients.
              </p>

              <p className="text-gray-600 leading-relaxed mt-4">
                From classic favorites to bold new flavors, every pizza is baked
                fresh and served hot. Our goal is simple: to bring delicious
                food and happy moments to every table.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full text-xl">
                    <i className="ri-leaf-fill"></i>
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a]">
                      Fresh Ingredients
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quality in every bite
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full text-xl">
                    <i className="ri-fire-fill"></i>
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a]">Freshly Baked</h3>
                    <p className="text-sm text-gray-500">Hot and crispy</p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <a
                href="/menu"
                className="inline-block mt-8 bg-[#dc2626] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition duration-300"
              >
                Explore Our Menu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
