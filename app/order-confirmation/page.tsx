"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  name: string;
  price: string;
  description: string;
  image: string;
  quantity: number;
};

type OrderData = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal: string;
    notes: string;
  };

  paymentMethod: string;

  items: CartItem[];

  summary: {
    subtotal: number;
    delivery: number;
    tax: number;
    total: number;
  };

  orderDate: string;
};

export default function OrderConfirmation() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("pizza-order");

    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (error) {
        console.error("Failed to load order:", error);
      }
    }
  }, []);

  // If no order exists
  if (!order) {
    return (
      <section className="min-h-screen bg-[#fff7ed] flex items-center justify-center px-6 py-28">

        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">

          <div className="text-6xl mb-5">
            🍕
          </div>

          <h1 className="text-3xl font-bold text-[#1a1a1a]">
            No Order Found
          </h1>

          <p className="text-gray-500 mt-3">
            We couldn't find a recent order.
          </p>

          <Link
            href="/menu"
            className="inline-flex mt-7 bg-[#dc2626] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition"
          >
            Browse Menu
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff7ed] py-28 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Success Message */}
        <div className="text-center mb-10">

          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <i className="ri-check-line text-4xl text-green-600"></i>
          </div>

          <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
            Order Confirmed
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
            Thank You, {order.customer.name}! 🎉
          </h1>

          <p className="text-gray-600 mt-4">
            Your pizza order has been successfully placed.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Order Details */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-7 md:p-10">

            <div className="flex items-center justify-between mb-7">

              <h2 className="text-2xl font-bold text-[#1a1a1a]">
                Your Order
              </h2>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                Confirmed
              </span>

            </div>

            {/* Cart Items */}
            <div className="space-y-5">

              {order.items.map((pizza) => {

                const price = parseFloat(
                  pizza.price.replace("$", "")
                );

                const itemTotal =
                  price * pizza.quantity;

                return (
                  <div
                    key={pizza.name}
                    className="flex flex-col sm:flex-row items-center gap-5 border-b border-gray-100 pb-5"
                  >

                    {/* Image */}
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />

                    {/* Information */}
                    <div className="flex-1 text-center sm:text-left">

                      <h3 className="text-xl font-bold text-[#1a1a1a]">
                        {pizza.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {pizza.description}
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">

                        <span className="text-gray-500 text-sm">
                          Price: {pizza.price}
                        </span>

                        <span className="text-gray-500 text-sm">
                          Qty: {pizza.quantity}
                        </span>

                      </div>

                    </div>

                    {/* Item Total */}
                    <div className="text-center">

                      <p className="text-xs text-gray-400">
                        Item Total
                      </p>

                      <p className="text-lg font-bold text-[#dc2626]">
                        ${itemTotal.toFixed(2)}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Customer Information */}
            <div className="mt-8 pt-7 border-t border-gray-200">

              <h3 className="text-xl font-bold text-[#1a1a1a] mb-5">
                Delivery Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <p className="text-sm text-gray-400">
                    Full Name
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {order.customer.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Phone
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {order.customer.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {order.customer.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Payment
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {order.paymentMethod}
                  </p>
                </div>

                <div className="md:col-span-2">

                  <p className="text-sm text-gray-400">
                    Delivery Address
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {order.customer.address},{" "}
                    {order.customer.city},{" "}
                    {order.customer.postal}
                  </p>

                </div>

                {order.customer.notes && (
                  <div className="md:col-span-2">

                    <p className="text-sm text-gray-400">
                      Order Notes
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {order.customer.notes}
                    </p>

                  </div>
                )}

              </div>

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
                  ${order.summary.subtotal.toFixed(2)}
                </span>

              </div>

              {/* Delivery */}
              <div className="flex justify-between text-gray-300">

                <span>
                  Delivery
                </span>

                <span>
                  ${order.summary.delivery.toFixed(2)}
                </span>

              </div>

              {/* Tax */}
              <div className="flex justify-between text-gray-300">

                <span>
                  Tax
                </span>

                <span>
                  ${order.summary.tax.toFixed(2)}
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
                ${order.summary.total.toFixed(2)}
              </span>

            </div>

            {/* Payment */}
            <div className="mt-7 bg-white/5 rounded-2xl p-4">

              <p className="text-gray-400 text-sm">
                Payment Method
              </p>

              <p className="font-semibold mt-1">
                {order.paymentMethod}
              </p>

            </div>

            {/* Order Date */}
            <div className="mt-4 bg-white/5 rounded-2xl p-4">

              <p className="text-gray-400 text-sm">
                Order Date
              </p>

              <p className="font-semibold mt-1">
                {new Date(order.orderDate).toLocaleString()}
              </p>

            </div>

            {/* Secure */}
            <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">

              <i className="ri-shield-check-line text-[#f59e0b]"></i>

              Your order has been securely placed.

            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link
            href="/menu"
            className="bg-[#dc2626] text-white px-8 py-3 rounded-full font-semibold text-center hover:bg-[#b91c1c] transition"
          >
            Order More Pizza
          </Link>

          <Link
            href="/"
            className="bg-white text-[#1a1a1a] px-8 py-3 rounded-full font-semibold text-center border border-gray-200 hover:border-[#dc2626] transition"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </section>
  );
}