"use client";

import React from "react";

type DealItem = {
  name: string;
  quantity: number;
};

type Deal = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string;
  badge: string;
  dealItems: DealItem[];
  available?: boolean;
};

type DealCardProps = {
  deal: Deal;
};

export default function DealCard({ deal }: DealCardProps) {
  const dealPrice = Number(
    String(deal.price || "$0").replace("$", "")
  );

  const originalPrice = Number(
    String(deal.originalPrice || deal.price || "$0").replace("$", "")
  );

  const saving = Math.max(originalPrice - dealPrice, 0);

  const addDealToCart = () => {
    const savedCart = localStorage.getItem("pizza-cart");

    const cart = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cart.find(
      (item: any) => item.id === deal.id
    );

    if (existingItem) {
      existingItem.quantity =
        (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        id: deal.id,
        name: deal.name,
        price: deal.price,
        description: deal.description,
        image: deal.image,
        quantity: 1,
        type: "deal",
        dealItems: deal.dealItems,
      });
    }

    localStorage.setItem(
      "pizza-cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${deal.name} added to cart`);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Main Deal Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={deal.image}
          alt={deal.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
          {deal.badge}
        </div>

        {saving > 0 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-lg">
            Save ${saving.toFixed(2)}
          </div>
        )}
      </div>

      {/* Deal Details */}
      <div className="p-6">

        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-extrabold text-gray-900">
            {deal.name}
          </h2>

          <i className="ri-price-tag-3-fill text-2xl text-red-600"></i>
        </div>

        <p className="mb-6 text-sm leading-6 text-gray-500">
          {deal.description}
        </p>

        {/* What's Included */}
        <div className="mb-6">

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-700">
            What's Included
          </h3>

          <div className="space-y-2">

            {deal.dealItems.map((item, index) => (
              <div
                key={`${deal.id}-${index}`}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
              >

                <div className="flex items-center gap-3">

                  <i className="ri-checkbox-circle-fill text-lg text-red-600"></i>

                  <span className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </span>

                </div>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                  x{item.quantity}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Price */}
        <div className="mb-5 flex items-end justify-between">

          <div>

            <p className="text-sm text-gray-400 line-through">
              Regular ${originalPrice.toFixed(2)}
            </p>

            <p className="text-3xl font-extrabold text-gray-900">
              ${dealPrice.toFixed(2)}
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs text-gray-500">
              You save
            </p>

            <p className="text-lg font-bold text-green-600">
              ${saving.toFixed(2)}
            </p>

          </div>

        </div>

        {/* Add Deal */}
        <button
          onClick={addDealToCart}
          disabled={deal.available === false}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >

          <i className="ri-shopping-cart-2-line text-lg"></i>

          {deal.available === false
            ? "Currently Unavailable"
            : "Add Deal"}

        </button>

      </div>

    </div>
  );
}