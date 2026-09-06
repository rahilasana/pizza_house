"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Pizza = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category?: string;
};

export default function DashboardMenu() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    const savedPizzas = localStorage.getItem("pizza-menu");

    if (!savedPizzas) return;

    try {
      const pizzas: Pizza[] = JSON.parse(savedPizzas);

      const pizzasWithData = pizzas.map(
        (pizza, index) => ({
          ...pizza,

          // Old items ko ID dena
          id:
            pizza.id ||
            `pizza-${Date.now()}-${index}`,

          // Old items ko Pizza category dena
          category:
            pizza.category || "Pizza",
        })
      );

      setPizzas(pizzasWithData);

      // Updated data localStorage mein save
      localStorage.setItem(
        "pizza-menu",
        JSON.stringify(pizzasWithData)
      );
    } catch (error) {
      console.error(
        "Failed to load menu:",
        error
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Menu
            </h1>

            <p className="mt-2 text-gray-600">
              Select a menu item to manage it.
            </p>
          </div>

          <Link
            href="/dashboard/menu/new"
            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
          >
            + Add Item
          </Link>

        </div>

        {/* Menu Items */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">

          {pizzas.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              No menu items found.
            </div>

          ) : (

            pizzas.map((pizza) => (

              <Link
                key={pizza.id}
                href={`/dashboard/menu/${pizza.id}`}
                className="flex items-center justify-between border-b px-6 py-5 transition last:border-b-0 hover:bg-gray-50"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div>

                    <h2 className="font-semibold text-gray-900">
                      {pizza.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {pizza.price}
                    </p>

                    <p className="text-xs text-gray-400">
                      {pizza.category}
                    </p>

                  </div>

                </div>

                <span className="text-gray-400">
                  →
                </span>

              </Link>

            ))

          )}

        </div>

      </div>

    </div>
  );
}