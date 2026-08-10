import React from "react";

export default function page() {
  return (
    <div>
      <section
        id="order-confirmation"
        className="min-h-screen bg-[#fff7ed] py-28 px-6 flex items-center"
      >
        <div className="max-w-3xl mx-auto w-full">
          {/* Confirmation Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100 border-2 border-green-500 mb-6">
              <i className="ri-check-line text-4xl text-green-600"></i>
            </div>

            {/* Heading */}
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
              Order Confirmed
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Thank You For Your Order!
            </h1>

            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Your delicious pizza is being prepared and will be on its way to
              you shortly.
            </p>

            {/* Order Number */}
            <div className="mt-8 bg-[#fff7ed] rounded-2xl p-5">
              <p className="text-sm text-gray-500">Order Number</p>

              <p className="text-xl font-bold text-[#dc2626] mt-1">#PH-1024</p>
            </div>

            {/* Order Details */}
            <div className="text-left mt-8 border-t border-gray-200 pt-7">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-5">
                Order Details
              </h2>

              {/* Item 1 */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="/images/margherita.jpg"
                  alt="Margherita Pizza"
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-[#1a1a1a]">
                    Margherita Pizza
                  </h3>

                  <p className="text-sm text-gray-500">Quantity: 1</p>
                </div>

                <span className="font-semibold text-[#1a1a1a]">$12.99</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-4">
                <img
                  src="/images/pepperoni.jpg"
                  alt="Pepperoni Pizza"
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-[#1a1a1a]">
                    Pepperoni Pizza
                  </h3>

                  <p className="text-sm text-gray-500">Quantity: 2</p>
                </div>

                <span className="font-semibold text-[#1a1a1a]">$29.98</span>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              <div className="bg-gray-50 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-time-line text-xl text-[#dc2626]"></i>

                  <h3 className="font-bold text-[#1a1a1a]">
                    Estimated Delivery
                  </h3>
                </div>

                <p className="text-gray-500 text-sm">30–40 minutes</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-map-pin-line text-xl text-[#dc2626]"></i>

                  <h3 className="font-bold text-[#1a1a1a]">Delivery Address</h3>
                </div>

                <p className="text-gray-500 text-sm">123 Main Street, Lahore</p>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center">
              <span className="text-xl font-bold text-[#1a1a1a]">
                Total Paid
              </span>

              <span className="text-2xl font-bold text-[#dc2626]">$48.12</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a
                href="/"
                className="px-7 py-3 rounded-full bg-[#dc2626] text-white font-semibold hover:bg-[#b91c1c] transition"
              >
                Back to Home
              </a>

              <a
                href="/menu"
                className="px-7 py-3 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] font-semibold hover:bg-[#1a1a1a] hover:text-white transition"
              >
                Order More Pizza
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
