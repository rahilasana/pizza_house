"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Pizza = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export default function MenuItemPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [pizza, setPizza] = useState<Pizza | null>(null);

  useEffect(() => {
    const savedPizzas = localStorage.getItem("pizza-menu");

    if (!savedPizzas) return;

    try {
      const pizzas: Pizza[] = JSON.parse(savedPizzas);

      const selectedPizza = pizzas.find(
        (pizza) => pizza.id === id
      );

      if (selectedPizza) {
        setPizza(selectedPizza);
      }
    } catch (error) {
      console.error("Failed to load pizza:", error);
    }
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    const savedPizzas = localStorage.getItem("pizza-menu");

    if (!savedPizzas) return;

    const pizzas: Pizza[] = JSON.parse(savedPizzas);

    const updatedPizzas = pizzas.filter(
      (pizza) => pizza.id !== id
    );

    localStorage.setItem(
      "pizza-menu",
      JSON.stringify(updatedPizzas)
    );

    router.push("/dashboard/menu");
  };

  if (!pizza) {
    return (
      <div className="p-8">
        <p className="text-gray-600">
          Menu item not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/menu")}
          className="mb-6 text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to Menu
        </button>

        {/* Pizza Details */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">

          <img
            src={pizza.image}
            alt={pizza.name}
            className="h-80 w-full object-cover"
          />

          <div className="p-8">

            <div className="mb-6 flex items-center justify-between">

              <h1 className="text-3xl font-bold text-gray-900">
                {pizza.name}
              </h1>

              <span className="text-2xl font-bold text-red-600">
                {pizza.price}
              </span>

            </div>

            <p className="mb-8 leading-7 text-gray-600">
              {pizza.description}
            </p>

            {/* Actions */}
            <div className="flex gap-3">

              <button
                onClick={() =>
                  router.push(
                    `/dashboard/menu/${id}/edit`
                  )
                }
                className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-700"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}