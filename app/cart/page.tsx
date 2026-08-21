"use client";

import React from "react";
import { useCart } from "../context/CartContext";

export default function Page() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((total, pizza) => {
    const price = parseFloat(pizza.price.replace("$", ""));

    return total + price * pizza.quantity;
  }, 0);

  // Delivery charges
  const delivery = cart.length > 0 ? 3 : 0;

  // 5% tax
  const tax = subtotal * 0.05;

  // Final total
  const total = subtotal + delivery + tax;

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

          {/* Empty Cart */}
          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md p-12 text-center">

              <div className="text-6xl mb-5">
                🍕
              </div>

              <h2 className="text-2xl font-bold text-[#1a1a1a]">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mt-3">
                Add some delicious pizzas to your cart first.
              </p>

              <a
                href="/menu"
                className="inline-flex mt-6 bg-[#dc2626] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition"
              >
                Browse Menu
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-5">

                {cart.map((pizza) => (
                  <div
                    key={pizza.name}
                    className="bg-white rounded-3xl p-5 shadow-md flex flex-col sm:flex-row items-center gap-5"
                  >

                    {/* Pizza Image */}
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-28 h-28 rounded-2xl object-cover"
                    />

                    {/* Pizza Information */}
                    <div className="flex-1 text-center sm:text-left">

                      <h2 className="text-xl font-bold text-[#1a1a1a]">
                        {pizza.name}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        {pizza.description}
                      </p>

                      <p className="text-[#dc2626] font-bold text-lg mt-3">
                        {pizza.price}
                      </p>

                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border-2 border-gray-200 rounded-full">

                      {/* Minus */}
                      <button
                        onClick={() =>
                          decreaseQuantity(pizza.name)
                        }
                        className="w-9 h-9 text-lg font-bold hover:text-[#dc2626] transition"
                      >
                        -
                      </button>

                      {/* Quantity */}
                      <span className="w-8 text-center font-semibold">
                        {pizza.quantity}
                      </span>

                      {/* Plus */}
                      <button
                        onClick={() =>
                          increaseQuantity(pizza.name)
                        }
                        className="w-9 h-9 text-lg font-bold hover:text-[#dc2626] transition"
                      >
                        +
                      </button>

                    </div>

                    {/* Item Total */}
                    <div className="text-center min-w-[80px]">
                      <p className="text-xs text-gray-400">
                        Item Total
                      </p>

                      <p className="font-bold text-[#1a1a1a]">
                        $
                        {(
                          parseFloat(
                            pizza.price.replace("$", "")
                          ) * pizza.quantity
                        ).toFixed(2)}
                      </p>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        removeFromCart(pizza.name)
                      }
                      className="text-gray-400 hover:text-red-600 transition"
                      title="Remove item"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>

                  </div>
                ))}

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

                <h2 className="text-2xl font-bold mb-7">
                  Order Summary
                </h2>

                <div className="space-y-4">

                  {/* Subtotal */}
                  <div className="flex justify-between text-gray-300">

                    <span>
                      Subtotal
                    </span>

                    <span>
                      ${subtotal.toFixed(2)}
                    </span>

                  </div>

                  {/* Delivery */}
                  <div className="flex justify-between text-gray-300">

                    <span>
                      Delivery
                    </span>

                    <span>
                      ${delivery.toFixed(2)}
                    </span>

                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-gray-300">

                    <span>
                      Tax
                    </span>

                    <span>
                      ${tax.toFixed(2)}
                    </span>

                  </div>

                </div>

                <div className="border-t border-gray-700 my-6"></div>

                {/* Total */}
                <div className="flex justify-between items-center">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#f59e0b]">
                    ${total.toFixed(2)}
                  </span>

                </div>

                {/* Checkout */}
                <a
                  href="/checkout"
                  className="mt-7 w-full bg-[#dc2626] text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#b91c1c] transition duration-300"
                >
                  Proceed to Checkout

                  <i className="ri-arrow-right-line"></i>
                </a>

              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}