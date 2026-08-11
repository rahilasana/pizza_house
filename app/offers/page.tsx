import React from "react";

export default function page() {
  return (
    <div>
      <section id="offers" className="w-full bg-white py-25 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
              Special Offers
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-black">
              Delicious Deals For You
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mt-4">
              Enjoy our special pizza deals made to give you more flavor without
              spending more.
            </p>
          </div>

          {/* Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Offer 1 */}
            <div className="bg-[#1a1a1a]/60 rounded-3xl p-8 text-center shadow-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-5 text-white"><i className="ri-group-fill"></i></div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Family Feast
              </h3>

              <p className="text-white/80 leading-relaxed mb-6">
                Get 2 large pizzas with garlic bread and a bottle of soft drink.
              </p>

              <div className="mb-6">
                <span className="text-black line-through text-lg">
                  $39.99
                </span>

                <span className="text-[#dc2626] text-3xl font-bold ml-3">
                  $29.99
                </span>
              </div>

              <a
                href="#menu"
                className="inline-block bg-[#dc2626] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition"
              >
                Order Deal
              </a>
            </div>

            {/* Offer 2 */}
            <div className="bg-[#dc2626] rounded-3xl p-8 text-center shadow-xl hover:-translate-y-2 transition duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#f59e0b] text-black text-xs font-bold px-4 py-2 rounded-full">
                POPULAR
              </div>

              <div className="text-5xl mb-5 text-white"><i className="ri-price-tag-3-fill"></i></div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Weekend Special
              </h3>

              <p className="text-white/80 leading-relaxed mb-6">
                Buy one large pizza and get your second pizza at 50% off.
              </p>

              <div className="mb-6">
                <span className="text-white text-3xl font-bold">50% OFF</span>
              </div>

              <a
                href="#menu"
                className="inline-block bg-white text-[#dc2626] px-7 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Grab The Deal
              </a>
            </div>

            {/* Offer 3 */}
            <div className="bg-[#1a1a1a]/60 rounded-3xl p-8 text-center shadow-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-5 text-white"><i className="ri-truck-fill"></i></div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Free Delivery
              </h3>

              <p className="text-white/80 leading-relaxed mb-6">
                Enjoy free delivery on all orders above $25. Hot pizza,
                delivered right to your door.
              </p>

              <div className="mb-6">
                <span className="text-[#dc2626] text-3xl font-bold">FREE</span>

                <span className="text-black text-lg ml-2">Delivery</span>
              </div>

              <a
                href="/menu"
                className="inline-block bg-[#dc2626] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
