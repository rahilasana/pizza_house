import React from "react";

export default function page() {
  return (
    <div>
      <section id="contact" className="w-full bg-[#fff7ed] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
              Contact Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Get In Touch
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Have a question, want to place an order, or just craving pizza? We
              would love to hear from you.
            </p>
          </div>

          {/* Contact Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-10 text-white">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                Let's Talk Pizza
                <i className="ri-restaurant-line text-[#f59e0b] text-3xl"></i>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Visit us, give us a call, or send us a message. Our team is
                always ready to serve you fresh and delicious pizza.
              </p>

              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#dc2626] rounded-full text-xl">
                  <i className="ri-map-pin-line text-xl"></i>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Our Location</h4>

                  <p className="text-gray-400 mt-1">
                    123 Main Street, Lahore, Pakistan
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#dc2626] rounded-full text-xl">
                  <i className="ri-phone-line text-xl"></i>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>

                  <p className="text-gray-400 mt-1">+92 300 1234567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#dc2626] rounded-full text-xl">
                  <i className="ri-mail-line text-xl"></i>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Email</h4>

                  <p className="text-gray-400 mt-1">hello@pizzahouse.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
              <h3 className="text-3xl font-bold text-[#1a1a1a] mb-6">
                Send Us a Message
              </h3>

              <form className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>

                {/* Email */}
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

                {/* Phone */}
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

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#dc2626] text-white py-3.5 rounded-xl font-semibold hover:bg-[#b91c1c] transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
