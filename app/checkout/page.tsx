import React from "react";

export default function page() {
  return (
    <div>
      <section id="checkout" className="min-h-screen bg-[#fff7ed] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
              Checkout
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Complete Your Order
            </h1>

            <p className="text-gray-600 mt-4">
              Enter your details and choose your preferred payment method.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-7 md:p-10 shadow-lg">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-7">
                Customer Information
              </h2>

              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Delivery Address
                  </label>

                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your delivery address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>

                {/* City + Postal Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      City
                    </label>

                    <input
                      type="text"
                      id="city"
                      placeholder="Enter your city"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postal"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Postal Code
                    </label>

                    <input
                      type="text"
                      id="postal"
                      placeholder="Enter postal code"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                    />
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Order Notes
                  </label>

                  <textarea
                    id="notes"
                    rows={4}
                    placeholder="Any special instructions?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Cash */}
                    <label className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#dc2626] transition">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        className="mr-2 accent-[#dc2626]"
                      />
                      <i className="ri-money-dollar-circle-line mr-2"></i>
                      Cash
                    </label>

                    {/* Card */}
                    <label className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#dc2626] transition">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        className="mr-2 accent-[#dc2626]"
                      />
                      <i className="ri-bank-card-line mr-2"></i>
                      Card
                    </label>

                    {/* Online */}
                    <label className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#dc2626] transition">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        className="mr-2 accent-[#dc2626]"
                      />
                      <i className="ri-smartphone-line mr-2"></i>
                      Online
                    </label>
                  </div>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="w-full bg-[#dc2626] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#b91c1c] transition duration-300"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-[#1a1a1a] text-white rounded-3xl p-7 h-fit shadow-xl">
              <h2 className="text-2xl font-bold mb-7">Order Summary</h2>

              {/* Product 1 */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="/images/margherita.jpg"
                  alt="Margherita Pizza"
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">Margherita Pizza</h3>

                  <p className="text-gray-400 text-sm">Qty: 1</p>
                </div>

                <span className="font-semibold">$12.99</span>
              </div>

              {/* Product 2 */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/pepperoni.jpg"
                  alt="Pepperoni Pizza"
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">Pepperoni Pizza</h3>

                  <p className="text-gray-400 text-sm">Qty: 2</p>
                </div>

                <span className="font-semibold">$29.98</span>
              </div>

              <div className="border-t border-gray-700 pt-5 space-y-4">
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

              <div className="border-t border-gray-700 my-5"></div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>

                <span className="text-2xl font-bold text-[#f59e0b]">
                  $48.12
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                <i className="ri-shield-check-line text-[#f59e0b]"></i>
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
