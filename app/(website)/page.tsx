import Image from "next/image";

export default function page() {
  return (
    <div>
      {/*  HERO */}
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
                  src="https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=327&auto=format&fit=crop"
                  alt="Delicious Pizza"
                  width={320}
                  height={320}
                  className="relative w-50 sm:w-70 lg:w-100 h-50 sm:h-70 lg:h-100 object-cover rounded-full shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  POPULAR PICKS */}
      <section className="bg-[#fafafa] py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-bold">
              Customer Favorites
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mt-3">
              Our Most Loved Pizzas
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Tried, tested, and loved by pizza lovers. These are the pizzas
              our customers keep coming back for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Pizza 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=900&auto=format&fit=crop"
                  alt="Margherita Pizza"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#1a1a1a]">
                    Margherita Classic
                  </h3>

                  <span className="text-[#dc2626] font-bold">
                    Rs. 899
                  </span>
                </div>

                <p className="text-gray-500 mt-3 text-sm">
                  Fresh tomato sauce, mozzarella, basil and our signature
                  crust.
                </p>

                <a
                  href="/menu"
                  className="inline-flex items-center gap-2 mt-5 text-[#dc2626] font-semibold hover:gap-3 transition-all"
                >
                  Order Now
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Pizza 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=900&auto=format&fit=crop"
                  alt="Pepperoni Pizza"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#1a1a1a]">
                    Pepperoni Feast
                  </h3>

                  <span className="text-[#dc2626] font-bold">
                    Rs. 1199
                  </span>
                </div>

                <p className="text-gray-500 mt-3 text-sm">
                  Loaded with spicy pepperoni, mozzarella and rich tomato
                  sauce.
                </p>

                <a
                  href="/menu"
                  className="inline-flex items-center gap-2 mt-5 text-[#dc2626] font-semibold hover:gap-3 transition-all"
                >
                  Order Now
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Pizza 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=900&auto=format&fit=crop"
                  alt="BBQ Chicken Pizza"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#1a1a1a]">
                    BBQ Chicken
                  </h3>

                  <span className="text-[#dc2626] font-bold">
                    Rs. 1299
                  </span>
                </div>

                <p className="text-gray-500 mt-3 text-sm">
                  Smoky BBQ chicken, onions, mozzarella and our special BBQ
                  sauce.
                </p>

                <a
                  href="/menu"
                  className="inline-flex items-center gap-2 mt-5 text-[#dc2626] font-semibold hover:gap-3 transition-all"
                >
                  Order Now
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <a
              href="/menu"
              className="inline-block bg-[#1a1a1a] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#dc2626] transition duration-300"
            >
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      {/*  WHY US  */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-bold">
              Why Choose Us
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mt-3">
              Pizza Made The Right Way
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="text-center p-8 rounded-3xl bg-[#fafafa] hover:shadow-lg transition">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center text-3xl text-[#dc2626]">
                <i className="ri-plant-fill"></i>
              </div>

              <h3 className="font-bold text-xl mt-5">
                Fresh Ingredients
              </h3>

              <p className="text-gray-500 text-sm mt-3">
                Quality ingredients selected to give you the best possible
                flavor.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-[#fafafa] hover:shadow-lg transition">
              <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-3xl text-[#f59e0b]">
                <i className="ri-fire-fill"></i>
              </div>

              <h3 className="font-bold text-xl mt-5">
                Baked Fresh
              </h3>

              <p className="text-gray-500 text-sm mt-3">
                Every pizza is freshly prepared and baked when you order.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-[#fafafa] hover:shadow-lg transition">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-600">
                <i className="ri-e-bike-2-fill"></i>
              </div>

              <h3 className="font-bold text-xl mt-5">
                Fast Delivery
              </h3>

              <p className="text-gray-500 text-sm mt-3">
                Hot and fresh pizza delivered straight to your doorstep.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-[#fafafa] hover:shadow-lg transition">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600">
                <i className="ri-heart-3-fill"></i>
              </div>

              <h3 className="font-bold text-xl mt-5">
                Made With Love
              </h3>

              <p className="text-gray-500 text-sm mt-3">
                Great taste, careful preparation and a whole lot of passion.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/*  SPECIAL OFFER  */}
      <section className="py-24 px-6 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">

          <div className="rounded-3xl bg-[#dc2626] px-8 py-14 sm:px-14 lg:px-20 text-center relative overflow-hidden">

            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-white/10"></div>

            <div className="relative z-10">
              <p className="text-white/80 uppercase tracking-widest text-sm font-bold">
                Limited Time Offer
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4">
                Get 20% Off Your First Order
              </h2>

              <p className="text-white/90 mt-5 max-w-2xl mx-auto">
                Your first pizza deserves better than sitting in your
                browser tab while you scroll endlessly. Order fresh,
                delicious pizza today.
              </p>

              <a
                href="/menu"
                className="inline-block mt-8 bg-white text-[#dc2626] px-8 py-3.5 rounded-full font-bold hover:bg-[#1a1a1a] hover:text-white transition duration-300"
              >
                Order Your Pizza
              </a>
            </div>

          </div>
        </div>
      </section>

     
      {/* FINAL CTA */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-[#dc2626] font-bold uppercase tracking-widest text-sm">
            Hungry Yet?
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] mt-4">
            Your Perfect Pizza Is
            <span className="text-[#dc2626]"> One Click Away.</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
            Choose your favorite pizza, customize your order, and enjoy
            freshly baked goodness delivered to your door.
          </p>

          <div className="mt-8">
            <a
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-9 py-4 rounded-full font-bold hover:bg-[#b91c1c] transition duration-300 shadow-lg"
            >
              Start Your Order
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}