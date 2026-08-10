import React from "react";

export default function page() {
  return (
    <div>
      <section className="min-h-screen bg-[#fff7ed] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
              Your Cart
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Your Pizza Cart
            </h1>

            <p className="text-gray-600 mt-4">
              Review your delicious choices before placing your order.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">
              {/* Item 1 */}
              <div className="bg-white rounded-3xl p-5 shadow-md flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/images/margherita.jpg"
                  alt="Margherita Pizza"
                  className="w-28 h-28 rounded-2xl object-cover"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-[#1a1a1a]">
                    Margherita Pizza
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Fresh mozzarella, tomato sauce and basil
                  </p>

                  <p className="text-[#dc2626] font-bold text-lg mt-3">
                    $12.99
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <button className="w-9 h-9 text-lg font-bold hover:text-[#dc2626]">
                    -
                  </button>

                  <span className="w-8 text-center font-semibold">1</span>

                  <button className="w-9 h-9 text-lg font-bold hover:text-[#dc2626]">
                    +
                  </button>
                </div>

                <button className="text-gray-400 hover:text-red-600 transition">
                  <i className="ri-delete-bin-line text-xl"></i>
                </button>
              </div>

              {/* Item 2 */}
              <div className="bg-white rounded-3xl p-5 shadow-md flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/images/pepperoni.jpg"
                  alt="Pepperoni Pizza"
                  className="w-28 h-28 rounded-2xl object-cover"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-[#1a1a1a]">
                    Pepperoni Pizza
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Crispy pepperoni, mozzarella and tomato sauce
                  </p>

                  <p className="text-[#dc2626] font-bold text-lg mt-3">
                    $14.99
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <button className="w-9 h-9 text-lg font-bold hover:text-[#dc2626]">
                    -
                  </button>

                  <span className="w-8 text-center font-semibold">2</span>

                  <button className="w-9 h-9 text-lg font-bold hover:text-[#dc2626]">
                    +
                  </button>
                </div>

                <button className="text-gray-400 hover:text-red-600 transition">
                  <i className="ri-delete-bin-line text-xl"></i>
                </button>
              </div>

              {/* Continue Shopping */}
              <div className="pt-4">
                <a
                  href="/menu"
                  className="inline-flex items-center gap-2 text-[#dc2626] font-semibold hover:text-[#b91c1c] transition"
                >
                  <i className="ri-arrow-left-line"></i>
                  Continue Shopping
                </a>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#1a1a1a] text-white rounded-3xl p-7 h-fit shadow-xl">
              <h2 className="text-2xl font-bold mb-7">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>$42.97</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Delivery</span>
                  <span>$3.00</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>$2.15</span>
                </div>
              </div>

              <div className="border-t border-gray-700 my-6"></div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>

                <span className="text-2xl font-bold text-[#f59e0b]">
                  $48.12
                </span>
              </div>

              <a
                href="/checkout"
                className="mt-7 w-full bg-[#dc2626] text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#b91c1c] transition duration-300"
              >
                Proceed to Checkout
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
