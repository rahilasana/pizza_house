
import Image from "next/image";

export default function page() {
  return (
    <div>
      <section
        id="home"
        className="min-h-screen bg-white flex items-center pt-28 pb-16"
      >
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <p className="text-[#f59e0b] font-semibold uppercase tracking-widest text-sm mb-4">
                Fresh • Hot • Delicious
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#1a1a1a] leading-tight">
                Taste the
                <span className="text-[#dc2626]"> Perfect Pizza</span>
              </h1>

              <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Handcrafted with fresh ingredients, rich cheese, and our
                signature sauce. Every slice is made with love and baked to
                crispy perfection.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mt-8">
                <a
                  href="/menu"
                  className="w-full sm:w-auto bg-[#dc2626] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#b91c1c] transition duration-300"
                >
                  Order Now <i className="ri-restaurant-fill"></i>
                </a>

                <a
                  href="/menu"
                  className="w-full sm:w-auto border-2 border-[#1a1a1a] text-[#1a1a1a] px-7 py-3 rounded-full font-semibold hover:bg-[#1a1a1a] hover:text-white transition duration-300"
                >
                  Explore Menu
                </a>
             
              </div>

              {/* Small Highlights */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    <i className="ri-fire-fill"></i>
                  </span>
                  <span>Freshly Baked</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    <i className="ri-cake-3-fill"></i>
                  </span>
                  <span>Premium Cheese</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    <i className="ri-e-bike-2-fill"></i>
                  </span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-[#f59e0b] rounded-full blur-3xl opacity-30 scale-90"></div>

                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80"
                  alt="Delicious Pizza"
                  width={320}
                  height={320}
                  className="relative w-50 sm:w-70 lg:w-100 h-50 sm:h-70  lg:h-100 object-cover rounded-full shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
